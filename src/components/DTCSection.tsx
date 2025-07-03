import React from 'react';

interface DTCSectionProps {
  urlParams: URLSearchParams | null;
  onOfferClick: (baseUrl: string, offerName: string) => void;
}

const DTCSection: React.FC<DTCSectionProps> = ({ urlParams, onOfferClick }) => {
  return (
    <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Limited Offer
          </span>
        </h2>
        <p className="text-white/70 text-sm">Choose your exclusive offer</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center p-2 scale-115">
        {/* First Image - With Glow Effect and Hover Animation */}
        <div className="group cursor-pointer relative flex-shrink-0 transform transition-all duration-300 hover:scale-110 active:scale-105">
          <div 
            onClick={() => onOfferClick('https://pagamento.paybluedrops.com/checkout/176849703:1', 'DTC Offer 1')}
            className="relative transition-all duration-300"
          >
            <img 
              src="https://i.imgur.com/hMTPTsw.png" 
              alt="DTC Offer 1"
              className="w-full h-auto object-cover transition-all duration-300 image-glow-effect max-w-xs rounded-lg"
            />
          </div>
        </div>

        {/* Increased spacing between first and second image */}
        <div className="w-12 md:w-16 h-6 md:h-0 flex-shrink-0"></div>

        {/* Container for second and third images with smaller gap */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
          {/* Second Image - With Hover Animation */}
          <div className="group cursor-pointer transform transition-all duration-300 hover:scale-110 active:scale-105">
            <div 
              onClick={() => onOfferClick('https://pagamento.paybluedrops.com/checkout/176845818:1', 'DTC Offer 2')}
              className="relative transition-all duration-300"
            >
              <img 
                src="https://i.imgur.com/gTcOoJ7.png" 
                alt="DTC Offer 2"
                className="w-full h-auto object-cover transition-transform duration-300 max-w-xs rounded-lg"
              />
            </div>
          </div>

          {/* Third Image - With Hover Animation */}
          <div className="group cursor-pointer transform transition-all duration-300 hover:scale-110 active:scale-105">
            <div 
              onClick={() => onOfferClick('https://pagamento.paybluedrops.com/checkout/176654642:1', 'DTC Offer 3')}
              className="relative transition-all duration-300"
            >
              <img 
                src="https://i.imgur.com/ojDbZ0n.png" 
                alt="DTC Offer 3"
                className="w-full h-auto object-cover transition-transform duration-300 max-w-xs rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="text-center mt-6">
        <p className="text-white/60 text-sm font-light tracking-wide">
          Click on any image to access your exclusive offer
        </p>
      </div>
    </div>
  );
};

export default DTCSection;