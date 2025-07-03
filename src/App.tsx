import React, { useEffect, useState, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import DTCSection from './components/DTCSection';

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: any;
  }
}

function App() {
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);
  const [showDTC, setShowDTC] = useState(false);
  const [backgroundDarkened, setBackgroundDarkened] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const dtcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Capture URL parameters
    const params = new URLSearchParams(window.location.search);
    setUrlParams(params);

    // Set up back redirect functionality
    const setBackRedirect = (url: string) => {
      let urlBackRedirect = url;
      urlBackRedirect = urlBackRedirect.trim() +
        (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
        document.location.search.replace('?', '').toString();

      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);
      history.pushState({}, '', location.href);

      window.addEventListener('popstate', () => {
        console.log('onpopstate', urlBackRedirect);
        setTimeout(() => {
          location.href = urlBackRedirect;
        }, 1);
      });
    };

    // Initialize back redirect with bonus page
    setBackRedirect('https://bonus-phi.vercel.app/');

    // Load the new video player script
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
    script.setAttribute("data-id", "683ba3d1b87ae17c6e07e7db");
    script.async = true;
    document.head.appendChild(script);

    // Track video view event
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'video',
        content_name: 'Landing Page Video'
      });
    }

    // Show DTC block after 35 minutes and 55 seconds and scroll to it
    const dtcTimer = setTimeout(() => {
      setShowDTC(true);
      // Remove dark background when DTC opens
      setBackgroundDarkened(false);
      // Wait a bit for the element to render, then scroll to it
      setTimeout(() => {
        if (dtcRef.current) {
          dtcRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }, 2155000); // 35 minutes and 55 seconds in milliseconds (35*60 + 55 = 2155 seconds)

    // Auto-center video after 20 seconds if user hasn't scrolled
    let hasUserScrolled = false;
    
    const handleScroll = () => {
      hasUserScrolled = true;
    };

    window.addEventListener('scroll', handleScroll);

    const videoCenterTimer = setTimeout(() => {
      if (!hasUserScrolled && videoRef.current) {
        videoRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 20000);

    // Darken background after 25 seconds (only if DTC hasn't opened yet)
    const backgroundDarkenTimer = setTimeout(() => {
      if (!showDTC) {
        setBackgroundDarkened(true);
      }
    }, 25000); // 25 seconds

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[data-id="683ba3d1b87ae17c6e07e7db"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      clearTimeout(dtcTimer);
      clearTimeout(videoCenterTimer);
      clearTimeout(backgroundDarkenTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const buildOfferUrl = (baseUrl: string) => {
    if (!urlParams) return baseUrl;

    // Create new URLSearchParams to build the final URL
    const finalParams = new URLSearchParams();

    // Common parameters to pass through
    const paramsToPass = [
      'utm_source',
      'utm_medium', 
      'utm_campaign',
      'utm_content',
      'utm_term',
      'fbclid',
      'gclid',
      'ttclid',
      'ref',
      'affiliate',
      'source',
      'medium',
      'campaign',
      'ad_id',
      'adset_id',
      'campaign_id',
      'placement',
      'site_source_name',
      'external_id',
      'click_id',
      'transaction_id',
      'offer_id',
      'landing_page',
      'funnel_step',
      'traffic_source',
      'sub_id',
      'sub_id_2',
      'sub_id_3',
      'sub_id_4',
      'sub_id_5'
    ];

    // Pass through all relevant parameters
    paramsToPass.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        finalParams.set(param, value);
      }
    });

    // Also pass through any custom parameters that start with specific prefixes
    urlParams.forEach((value, key) => {
      if (key.startsWith('custom_') || key.startsWith('track_') || key.startsWith('pixel_')) {
        finalParams.set(key, value);
      }
    });

    // Add timestamp for tracking
    finalParams.set('video_watched', 'true');
    finalParams.set('timestamp', Date.now().toString());

    const queryString = finalParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const handleOfferClick = (baseUrl: string, offerName: string) => {
    const offerUrl = buildOfferUrl(baseUrl);
    
    // Track button click event - InitiateCheckout
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: offerName,
        value: 1,
        currency: 'USD'
      });
    }
    
    // Small delay to ensure pixel fires before redirect
    setTimeout(() => {
      window.location.href = offerUrl;
    }, 100);
  };

  // Get today's date formatted
  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dark overlay that appears after 25 seconds but disappears when DTC opens */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-5 transition-opacity duration-1000 ${
          backgroundDarkened && !showDTC ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Content container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl mx-auto">
            {/* Video container */}
            <div 
              ref={videoRef} 
              className={`bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 transition-all duration-1000 ease-out hover:shadow-blue-500/20 hover:border-white/20 p-6 relative ${
                backgroundDarkened && !showDTC ? 'z-20 shadow-2xl shadow-black/50' : 'z-10'
              }`}
            >
              
              {/* Main Headline */}
              <div className="text-center mb-8">
                {/* Primary Headline: Baking Soda cures Impotence */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
                    Baking Soda cures Impotence
                  </span>
                </h1>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-16 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent"></div>
                </div>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 leading-relaxed">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    This secret recipe can reverse Impotence in just{' '}
                  </span>
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent font-black animate-pulse">
                    7 Days
                  </span>
                </p>
                
                <div className="flex items-center justify-center gap-2 text-white/70 text-sm mt-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                  <span className="font-light tracking-wider">WATCH NOW</span>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/30"></div>
                </div>
              </div>

              {/* Video wrapper with new embed */}
              <div className="relative z-10 overflow-hidden rounded-xl shadow-lg">
                <div 
                  id="ifr_683ba3d1b87ae17c6e07e7db_wrapper" 
                  style={{ margin: '0 auto', width: '100%' }}
                  className="transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div 
                    style={{ padding: '177.77777777777777% 0 0 0', position: 'relative' }} 
                    id="ifr_683ba3d1b87ae17c6e07e7db_aspect"
                  >
                    <iframe 
                      frameBorder="0" 
                      allowFullScreen 
                      src="https://scripts.converteai.net/b792ccfe-b151-4538-84c6-42bb48a19ba4/players/683ba3d1b87ae17c6e07e7db/embed.html" 
                      id="ifr_683ba3d1b87ae17c6e07e7db" 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        borderRadius: '12px'
                      }} 
                      referrerPolicy="origin"
                    />
                  </div>
                </div>
              </div>

              {/* Video Info Text */}
              <div className="mt-6 space-y-3">
                {/* Sound Reminder */}
                <div className="flex items-center justify-center gap-2 text-white/80">
                  <Volume2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Please ensure your sound is on.</span>
                </div>

                {/* Offline Warning */}
                <div className="text-center">
                  <p className="text-white/70 text-sm">
                    This presentation will go offline today <span className="font-semibold text-yellow-300">{getTodayDate()}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Limited Offer Block - Only show after 35 minutes and 55 seconds */}
            {showDTC && (
              <div 
                ref={dtcRef}
                className="relative z-10 transition-all duration-1000"
              >
                <DTCSection 
                  urlParams={urlParams}
                  onOfferClick={handleOfferClick}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-12 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Footer Images */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              {/* Guarantee Image - Reduced by 20% */}
              <div className="w-4/5 md:w-2/5">
                <img 
                  src="https://i.postimg.cc/Y9vGrbfT/imagem-2025-05-13-030738814.png" 
                  alt="Guarantee"
                  className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* 18 Days Image - Full Width */}
              <div className="w-full md:flex-1">
                <img 
                  src="https://i.postimg.cc/Y2Jg9KPR/Group-48-1.png" 
                  alt="18 Days"
                  className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Logo Image - Increased by 70% */}
              <div className="flex-shrink-0">
                <img 
                  src="https://i.postimg.cc/MGNZDxVr/imagem-2025-05-13-030911725.png" 
                  alt="Blue Drops Logo"
                  className="h-28 md:h-36 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>

            {/* Copyright Text */}
            <div className="text-center space-y-4">
              <div className="text-white/70 text-sm">
                <p className="font-medium">Copyright ©2024 | Blue Drops</p>
                <p>All Rights Reserved</p>
              </div>
              
              <div className="text-white/50 text-xs leading-relaxed max-w-2xl mx-auto">
                <p>
                  These statements have not been evaluated by the Food and Drug Administration. 
                  This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default App;