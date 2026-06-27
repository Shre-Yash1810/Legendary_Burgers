import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-12 w-12', showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg 
        viewBox="0 0 400 400" 
        className={`${className} transition-transform duration-300 hover:scale-105`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions for Text Paths */}
        <defs>
          {/* Path for "GRILL • GLORY" (Top Arch) */}
          <path 
            id="topArchPath" 
            d="M 60,200 A 140,140 0 0,1 340,200" 
            fill="none"
          />
          {/* Path for "GREATNESS" (Bottom Arch) */}
          <path 
            id="bottomArchPath" 
            d="M 340,200 A 140,140 0 0,1 60,200" 
            fill="none"
          />
          {/* Drop shadow filter for ribbon */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Circular border accent */}
        <circle cx="200" cy="200" r="150" stroke="#FFB000" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />

        {/* Orange Burger Bun / Sun Background */}
        <circle cx="200" cy="200" r="125" fill="#FF6B00" />
        <circle cx="200" cy="200" r="115" fill="#FFA500" opacity="0.8" />

        {/* Little green dot separator */}
        <circle cx="200" cy="80" r="7" fill="#2E7D32" />

        {/* Arched Text Top: GRILL • GLORY */}
        <text fill="#2E7D32" className="font-sans text-[26px] font-black tracking-[4px]" dy="-10">
          <textPath href="#topArchPath" startOffset="50%" textAnchor="middle">
            GRILL  •  GLORY
          </textPath>
        </text>

        {/* Arched Text Bottom: GREATNESS */}
        <text fill="#2E7D32" className="font-sans text-[26px] font-black tracking-[5px]" dy="30">
          <textPath href="#bottomArchPath" startOffset="50%" textAnchor="middle">
            GREATNESS
          </textPath>
        </text>

        {/* Red Ribbon Background (Behind Ribbon text) */}
        <g filter="url(#shadow)">
          {/* Ribbon Tails Left */}
          <path d="M 50,170 L 90,140 L 90,200 L 50,225 Z" fill="#990000" />
          <path d="M 50,225 L 90,200 L 90,230 Z" fill="#660000" />
          
          {/* Ribbon Tails Right */}
          <path d="M 350,170 L 310,140 L 310,200 L 350,225 Z" fill="#990000" />
          <path d="M 350,225 L 310,200 L 310,230 Z" fill="#660000" />

          {/* Main Ribbon Body */}
          <path 
            d="M 75,150 L 325,150 L 340,215 L 60,215 Z" 
            fill="#D32F2F" 
            stroke="#FFB000" 
            strokeWidth="5" 
          />
          {/* Main Ribbon Inner Line Detail */}
          <path 
            d="M 83,158 L 317,158 L 329,207 L 71,207 Z" 
            fill="none" 
            stroke="#FFD54F" 
            strokeWidth="1.5" 
          />

          {/* Gold Diamonds on Ribbon Corners */}
          <polygon points="90,182.5 97.5,190 90,197.5 82.5,190" fill="#FFD54F" />
          <polygon points="310,182.5 317.5,190 310,197.5 302.5,190" fill="#FFD54F" />

          {/* Ribbon Text: LEGENDARY BURGER */}
          <text 
            x="200" 
            y="180" 
            fill="#FFFFFF" 
            textAnchor="middle" 
            className="font-display text-[27px] font-black tracking-[1.5px]"
            style={{ textShadow: '2px 2px 0px #990000' }}
          >
            LEGENDARY
          </text>
          <text 
            x="200" 
            y="204" 
            fill="#FFD54F" 
            textAnchor="middle" 
            className="font-display text-[26px] font-black tracking-[3px]"
            style={{ textShadow: '2px 2px 0px #990000' }}
          >
            ♦ BURGER ♦
          </text>
        </g>
        
        {/* Trademark TM sign */}
        <text x="325" y="145" fill="#1A1A1A" className="font-sans text-[16px] font-black">TM</text>
      </svg>
      {showText && (
        <div className="flex flex-col select-none">
          <span className="font-display text-xl font-black tracking-tight leading-none text-white">
            LEGENDARY
          </span>
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-primary leading-none">
            BURGERS
          </span>
        </div>
      )}
    </div>
  );
};
