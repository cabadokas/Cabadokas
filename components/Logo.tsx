import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-24 w-24', iconOnly = false }) => {
  const SvgIcon = (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9C2C2" />
          <stop offset="100%" stopColor="#A07AAC" />
        </linearGradient>
      </defs>
      
      {/* Outer Circle */}
      <circle cx="100" cy="100" r="95" stroke="url(#logoGradient)" strokeWidth="4" />
      
      <g transform="translate(15, 20) scale(1.1)">
        {/* Main Face/Hair Shape */}
        <path d="M78,125 C 105,145, 140,125, 150,95 C 160,65, 130,40, 100,50 C 70,60, 60,95, 78,125 Z" fill="url(#logoGradient)" fillOpacity="0.2"/>
        <path d="M82.2,24.3c-2,0-3.9,0.5-5.5,1.5c-4.9,2.9-6.9,8.9-4.8,14.3c1.1,2.8,3,5.1,4.7,7.7c2,3.1,3.8,6.4,3.8,10.2c0,3.5-1.3,6.7-3.8,9.5c-1.3,1.5-2.4,3-3.3,4.6c-2.3,4.2-1.9,9.4,1,13.2c5.6,7.5,15.7,9.1,23.3,3.5c7.5-5.6,9.1-15.7,3.5-23.3c-2.3-3.1-5.3-5.3-8.7-6.5c-3.1-1.1-6.4-1-9.5,0.3c-2.9,1.2-5.4,3.3-7.2,5.9" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Swirls */}
        <path d="M148,97c-7.3,12.1-21.8,17.9-35.1,14.2c-13.3-3.7-22.4-16-19.1-29.8c3.4-13.8,15.7-23.1,29.4-19.8C136.4,65,145.4,76.6,142.5,89.9" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
         <path d="M85,130 C 110,120, 120,95, 110,75" stroke="url(#logoGradient)" strokeWidth="6" fill="none" strokeLinecap="round"/>
         <path d="M90,125 C 120,110, 135,80, 125,55" stroke="url(#logoGradient)" strokeWidth="6" fill="none" strokeLinecap="round"/>

        {/* Icons */}
        {/* Lotus */}
        <path d="M95,60 q5,12 10,0 q-5,12 -10,0 m2,-2 q3,-5 6,0 q-3,-5 -6,0 m5,0 q-2.5,4 -5,0" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Brush */}
        <path d="M98,80 l10,10 m-1, -11 a2,2 0 1,1 4,0 l-5,5 a2,2 0 1,0 -4,0z" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Leaf */}
        <path d="M125,45 q5,5 0,10 q5,-5 0,-10 m-2,8 l5,-5" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Flask */}
        <path d="M135,78 a5,3 0 0,1 10,0 v5 h-10 Z m2,-5 h6 v-3 a3,3 0 0,0 -6,0 Z" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Tag */}
        <path d="M118,35 h8 v8 l-4,4 l-4,-4 Z m4,0 v-3 a2,2 0 1,1 4,0 v3 m-2,4 a1,1 0 1,1 0,2 a1,1 0 1,1 0,-2" stroke="url(#logoGradient)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );

  if (iconOnly) {
    return SvgIcon;
  }

  const primaryTextColor = 'text-gray-600';
  const secondaryTextColor = 'text-purple-500';

  return (
    <div className="flex flex-col items-center" aria-label="Cabadokas Home">
      {SvgIcon}
      <div className="text-center -mt-2">
        <h1 className="text-4xl font-serif font-bold tracking-wider bg-gradient-to-r from-[#E9C2C2] to-[#A07AAC] bg-clip-text text-transparent">
          CABADOKAS
        </h1>
        <p className="text-xs font-sans tracking-widest mt-1 bg-gradient-to-r from-[#E9C2C2] to-[#A07AAC] bg-clip-text text-transparent font-semibold">
          BEAUTY | HEALTH | WELLNESS
        </p>
        <p className={`text-sm ${primaryTextColor} font-serif italic -rotate-3 mt-2`}>
          Amazon Affiliate @ <span className={`font-semibold ${secondaryTextColor}`}>Digistore24</span>
        </p>
      </div>
    </div>
  );
};

export default Logo;
