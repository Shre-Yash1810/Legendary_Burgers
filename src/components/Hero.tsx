import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setStorefrontSection } = useApp();
  const [animationResetKey, setAnimationResetKey] = useState(0);

  // Trigger scroll to menu
  const handleOrderNow = () => {
    setStorefrontSection('menu');
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Restage the burger building animation every 12 seconds for visual interest, or let it stay floaty
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationResetKey((prev) => prev + 1);
    }, 15000); // Reset animation loop every 15s to let user watch it again
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-76px)] flex items-center justify-center overflow-hidden bg-bg-dark py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5"
    >
      {/* Background Subtle Glow and Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] glow-orange animate-pulse duration-5000" />
        
        {/* Floating Background Particles */}
        <div className="absolute inset-0 opacity-45">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Content Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Tag badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Flame size={14} className="text-secondary animate-bounce" />
            Voted Hyderabad's Finest Grill
          </motion.div>

          {/* Brand Titles */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white uppercase font-display"
          >
            LEGENDARY <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              BURGERS
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl font-medium text-text-secondary max-w-lg leading-relaxed italic"
          >
            "Every Bite Creates a Legend."
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 text-sm text-text-secondary max-w-md"
          >
            Experience premium fire-grilled artisanal patties, melting local cheddar, fresh hydro-lettuce, and our house signature golden sauce.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={handleOrderNow}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold tracking-wide uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] glow-orange shadow-lg shadow-primary/20 cursor-pointer"
            >
              Order Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={handleOrderNow}
              className="flex items-center justify-center px-8 py-4 rounded-xl border border-white/10 hover:border-white/30 text-white font-bold tracking-wide uppercase hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              Explore Menu
            </button>
          </motion.div>
        </div>

        {/* Hero Interactive Burger Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center relative min-h-[460px] select-none">
          
          {/* Ring Light Backdrop */}
          <div className="absolute w-[320px] h-[320px] rounded-full border border-white/5 bg-gradient-to-tr from-white/2 to-primary/5 animate-spin duration-30000 z-0 pointer-events-none" />

          {/* Master Animation Container */}
          <motion.div 
            key={animationResetKey}
            className="relative w-full max-w-[360px] h-[440px] z-10 flex flex-col items-center justify-between"
            initial="hidden"
            animate="visible"
          >
            
            {/* 8. TOP BUN */}
            <motion.div 
              className="absolute z-[18]"
              style={{ top: '10%' }}
              variants={{
                hidden: { y: -250, opacity: 0, scale: 0.9 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 4.4, duration: 0.7, bounce: 0.35 }
                }
              }}
            >
              {/* Premium Top Bun SVG */}
              <svg width="240" height="90" viewBox="0 0 240 90" fill="none">
                <defs>
                  <linearGradient id="topBunGrad" x1="120" y1="0" x2="120" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFA040" />
                    <stop offset="35%" stopColor="#E67A13" />
                    <stop offset="85%" stopColor="#AD4E00" />
                    <stop offset="100%" stopColor="#733200" />
                  </linearGradient>
                  <filter id="bunShadow" x="-10%" y="-10%" width="120%" height="125%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                </defs>
                <path d="M10 65 C10 20, 230 20, 230 65 C230 75, 210 82, 120 82 C30 82, 10 75, 10 65 Z" fill="url(#topBunGrad)" filter="url(#bunShadow)" />
                {/* Toasted Bread Edge */}
                <path d="M12 65 C20 72, 220 72, 228 65 C220 78, 20 78, 12 65 Z" fill="#602700" opacity="0.4" />
                
                {/* Shiny Highlight */}
                <path d="M 30,50 C 45,25, 195,25, 210,50 C 190,32, 50,32, 30,50 Z" fill="#FFF" opacity="0.15" />

                {/* Sesame Seeds */}
                <g fill="#FFF" opacity="0.85">
                  <path d="M 60,35 Q 62,32 60,30 Q 58,32 60,35 Z" transform="rotate(15 60 35)" />
                  <path d="M 90,28 Q 92,25 90,23 Q 88,25 90,28 Z" transform="rotate(-10 90 28)" />
                  <path d="M 120,25 Q 122,22 120,20 Q 118,22 120,25 Z" />
                  <path d="M 150,28 Q 152,25 150,23 Q 148,25 150,28 Z" transform="rotate(20 150 28)" />
                  <path d="M 180,35 Q 182,32 180,30 Q 178,32 180,35 Z" transform="rotate(-15 180 35)" />
                  <path d="M 75,52 Q 77,49 75,47 Q 73,49 75,52 Z" transform="rotate(-5 75 52)" />
                  <path d="M 105,42 Q 107,39 105,37 Q 103,39 105,42 Z" transform="rotate(30 105 42)" />
                  <path d="M 135,42 Q 137,39 135,37 Q 133,39 135,42 Z" transform="rotate(-25 135 42)" />
                  <path d="M 165,52 Q 167,49 165,47 Q 163,49 165,52 Z" transform="rotate(12 165 52)" />
                  <path d="M 120,55 Q 122,52 120,50 Q 118,52 120,55 Z" />
                </g>
              </svg>
            </motion.div>

            {/* 7. SAUCE DRIPS */}
            <motion.div 
              className="absolute z-[16]"
              style={{ top: '24%' }}
              variants={{
                hidden: { y: -180, opacity: 0, scale: 0.6 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 3.8, duration: 0.5 }
                }
              }}
            >
              {/* Premium Sauce SVG */}
              <svg width="220" height="50" viewBox="0 0 220 50" fill="none">
                <defs>
                  <linearGradient id="sauceGrad" x1="110" y1="0" x2="110" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFA000" />
                    <stop offset="60%" stopColor="#FF5500" />
                    <stop offset="100%" stopColor="#C41C00" />
                  </linearGradient>
                </defs>
                {/* Organic wavy dripping sauce */}
                <path d="M 15,10 C 25,12, 35,5, 45,15 C 50,20, 52,32, 57,32 C 62,32, 64,15, 70,12 C 85,6, 95,8, 105,18 C 110,23, 112,35, 117,35 C 122,35, 124,18, 132,15 C 145,10, 155,14, 165,22 C 170,27, 172,39, 177,39 C 182,39, 184,18, 192,12 C 200,6, 205,10, 210,12 C 210,12, 210,5, 190,5 C 150,5, 130,5, 100,5 C 70,5, 50,5, 15,5 Z" fill="url(#sauceGrad)" />
                {/* Shiny gloss highlights */}
                <path d="M 52,28 C 53,31, 55,31, 56,28 M 112,31 C 113,34, 115,34, 116,31 M 172,34 C 173,37, 175,37, 176,34" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </svg>
            </motion.div>

            {/* 6. ONION RINGS */}
            <motion.div 
              className="absolute z-[14]"
              style={{ top: '30%' }}
              variants={{
                hidden: { y: -200, opacity: 0, rotate: -45 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  rotate: 0,
                  transition: { type: 'spring', delay: 3.2, duration: 0.6, bounce: 0.2 }
                }
              }}
            >
              {/* Onion Rings SVG */}
              <svg width="220" height="40" viewBox="0 0 220 40" fill="none">
                {/* Left Onion Ring */}
                <ellipse cx="65" cy="20" rx="45" ry="12" stroke="#E0E0E0" strokeWidth="6" />
                <ellipse cx="65" cy="20" rx="45" ry="12" stroke="#8E24AA" strokeWidth="2" opacity="0.8" />
                <ellipse cx="63" cy="18" rx="41" ry="10" stroke="#FFF" strokeWidth="2" opacity="0.9" />

                {/* Right Onion Ring */}
                <ellipse cx="155" cy="20" rx="45" ry="12" stroke="#E0E0E0" strokeWidth="6" />
                <ellipse cx="155" cy="20" rx="45" ry="12" stroke="#8E24AA" strokeWidth="2" opacity="0.8" />
                <ellipse cx="153" cy="18" rx="41" ry="10" stroke="#FFF" strokeWidth="2" opacity="0.9" />

                {/* Center overlapping Onion Ring */}
                <ellipse cx="110" cy="22" rx="40" ry="10" stroke="#E0E0E0" strokeWidth="6" />
                <ellipse cx="110" cy="22" rx="40" ry="10" stroke="#8E24AA" strokeWidth="2" opacity="0.8" />
                <ellipse cx="108" cy="20" rx="36" ry="8" stroke="#FFF" strokeWidth="2" opacity="0.9" />
              </svg>
            </motion.div>

            {/* 5. TOMATO SLICES */}
            <motion.div 
              className="absolute z-[12]"
              style={{ top: '38%' }}
              variants={{
                hidden: { y: -220, opacity: 0, scale: 0.5 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 2.6, duration: 0.5 }
                }
              }}
            >
              {/* Tomato Slices SVG */}
              <svg width="230" height="40" viewBox="0 0 230 40" fill="none">
                {/* Left Tomato Slice */}
                <g filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.4))">
                  <ellipse cx="70" cy="20" rx="48" ry="15" fill="#E53935" />
                  <ellipse cx="70" cy="20" rx="42" ry="11" fill="#C62828" />
                  {/* Seeds Compartments */}
                  <ellipse cx="50" cy="20" rx="10" ry="4" fill="#FF5252" />
                  <circle cx="50" cy="20" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="90" cy="20" rx="10" ry="4" fill="#FF5252" />
                  <circle cx="90" cy="20" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="70" cy="14" rx="14" ry="4" fill="#FF5252" />
                  <circle cx="70" cy="14" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="70" cy="26" rx="14" ry="4" fill="#FF5252" />
                  <circle cx="70" cy="26" r="1.5" fill="#FFEB3B" />
                  {/* Gloss */}
                  <path d="M 32,15 C 38,11, 60,11, 70,14" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                </g>

                {/* Right Tomato Slice */}
                <g filter="drop-shadow(0px 3px 2px rgba(0,0,0,0.4))">
                  <ellipse cx="160" cy="20" rx="48" ry="15" fill="#E53935" />
                  <ellipse cx="160" cy="20" rx="42" ry="11" fill="#C62828" />
                  {/* Seeds Compartments */}
                  <ellipse cx="140" cy="20" rx="10" ry="4" fill="#FF5252" />
                  <circle cx="140" cy="20" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="180" cy="20" rx="10" ry="4" fill="#FF5252" />
                  <circle cx="180" cy="20" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="160" cy="14" rx="14" ry="4" fill="#FF5252" />
                  <circle cx="160" cy="14" r="1.5" fill="#FFEB3B" />
                  <ellipse cx="160" cy="26" rx="14" ry="4" fill="#FF5252" />
                  <circle cx="160" cy="26" r="1.5" fill="#FFEB3B" />
                  {/* Gloss */}
                  <path d="M 122,15 C 128,11, 150,11, 160,14" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                </g>
              </svg>
            </motion.div>

            {/* 4. LETTUCE LEAF */}
            <motion.div 
              className="absolute z-[10]"
              style={{ top: '44%' }}
              variants={{
                hidden: { y: -240, opacity: 0, scale: 0.8 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 2.0, duration: 0.6, damping: 12 }
                }
              }}
            >
              {/* Premium Lettuce SVG */}
              <svg width="250" height="50" viewBox="0 0 250 50" fill="none">
                <defs>
                  <linearGradient id="lettuceGrad" x1="125" y1="0" x2="125" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7CB342" />
                    <stop offset="50%" stopColor="#558B2F" />
                    <stop offset="100%" stopColor="#33691E" />
                  </linearGradient>
                  <filter id="lettuceShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
                  </filter>
                </defs>
                {/* Wavy rippled lettuce edge leaf */}
                <path d="M 12,20 C 5,10, 25,5, 35,18 C 45,8, 60,8, 70,22 C 78,12, 95,12, 105,25 C 112,12, 130,12, 138,24 C 148,10, 165,10, 175,22 C 185,12, 200,12, 210,25 C 220,15, 240,10, 238,24 C 235,38, 220,40, 200,38 C 170,42, 150,38, 125,38 C 100,38, 80,42, 50,38 C 30,40, 15,35, 12,20 Z" fill="url(#lettuceGrad)" filter="url(#lettuceShadow)" />
                {/* Light green vein lines */}
                <path d="M 35,18 C 45,30, 80,30, 125,30 M 105,25 C 115,32, 150,30, 175,22 M 210,25 C 200,30, 215,35, 200,38 M 70,22 C 75,32, 60,35, 50,38" stroke="#9CCC65" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" fill="none" />
              </svg>
            </motion.div>

            {/* 3. MELTING CHEESE */}
            <motion.div 
              className="absolute z-[8]"
              style={{ top: '51%' }}
              variants={{
                hidden: { y: -200, opacity: 0, scale: 0.7 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 1.4, duration: 0.5 }
                }
              }}
            >
              {/* Premium Melting Cheese SVG */}
              <svg width="240" height="60" viewBox="0 0 240 60" fill="none">
                <defs>
                  <linearGradient id="cheeseGrad" x1="120" y1="0" x2="120" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="40%" stopColor="#FFCA28" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                  <filter id="cheeseShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
                  </filter>
                </defs>
                {/* Cheese sheet with draping melted corners */}
                <path d="M 15,10 L 225,10 C 228,15, 232,25, 224,35 C 218,42, 205,38, 200,45 C 195,52, 192,58, 185,58 C 178,58, 176,42, 168,38 C 160,35, 140,32, 130,48 C 122,60, 115,60, 110,48 C 105,38, 90,35, 80,45 C 72,52, 60,58, 55,50 C 50,42, 45,35, 38,32 C 30,28, 20,40, 15,35 C 10,30, 12,18, 15,10 Z" fill="url(#cheeseGrad)" filter="url(#cheeseShadow)" />
                {/* Melt Highlight gloss */}
                <path d="M 188,48 C 187,55, 185,55, 184,48 M 113,48 C 112,54, 111,54, 110,48" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
              </svg>
            </motion.div>

            {/* 2. GRILLED PATTY */}
            <motion.div 
              className="absolute z-[6]"
              style={{ top: '56%' }}
              variants={{
                hidden: { y: -300, opacity: 0, scale: 0.9, rotate: 10 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0,
                  transition: { type: 'spring', delay: 0.8, duration: 0.6, bounce: 0.25 }
                }
              }}
            >
              {/* Premium Textured Burger Patty SVG */}
              <svg width="242" height="70" viewBox="0 0 242 70" fill="none">
                <defs>
                  <linearGradient id="pattyGrad" x1="121" y1="0" x2="121" y2="70" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#5D4037" />
                    <stop offset="25%" stopColor="#4E342E" />
                    <stop offset="75%" stopColor="#3E2723" />
                    <stop offset="100%" stopColor="#271510" />
                  </linearGradient>
                  <filter id="pattyShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
                  </filter>
                </defs>
                {/* Textured Patty Shape */}
                <path d="M 10,32 C 10,12, 232,12, 232,32 C 232,55, 218,65, 121,65 C 24,65, 10,55, 10,32 Z" fill="url(#pattyGrad)" filter="url(#pattyShadow)" />
                
                {/* Charcoal Grill Marks */}
                <g stroke="#1A0D0A" strokeWidth="4.5" opacity="0.65" strokeLinecap="round">
                  <line x1="50" y1="22" x2="80" y2="52" />
                  <line x1="85" y1="20" x2="115" y2="52" />
                  <line x1="120" y1="20" x2="150" y2="52" />
                  <line x1="155" y1="20" x2="185" y2="52" />
                  <line x1="190" y1="24" x2="210" y2="44" />
                </g>

                {/* Meat Texture & Highlight Speckles */}
                <g fill="#8D6E63" opacity="0.4">
                  <circle cx="45" cy="35" r="2" />
                  <circle cx="65" cy="45" r="1.5" />
                  <circle cx="95" cy="30" r="2.5" />
                  <circle cx="115" cy="40" r="1.8" />
                  <circle cx="140" cy="32" r="2" />
                  <circle cx="165" cy="48" r="1.5" />
                  <circle cx="195" cy="36" r="2.2" />
                  <circle cx="110" cy="52" r="2" />
                  <circle cx="150" cy="50" r="1.5" />
                </g>
                <g fill="#000000" opacity="0.3">
                  <circle cx="55" cy="30" r="1.5" />
                  <circle cx="75" cy="38" r="2.2" />
                  <circle cx="100" cy="45" r="1.8" />
                  <circle cx="130" cy="35" r="2.5" />
                  <circle cx="155" cy="42" r="2" />
                  <circle cx="180" cy="30" r="1.7" />
                  <circle cx="205" cy="40" r="2.1" />
                </g>
              </svg>
            </motion.div>

            {/* 1. BOTTOM BUN */}
            <motion.div 
              className="absolute z-[4]"
              style={{ top: '69%' }}
              variants={{
                hidden: { y: 150, opacity: 0, scale: 0.9 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: 'spring', delay: 0.2, duration: 0.6 }
                }
              }}
            >
              {/* Premium Bottom Bun SVG */}
              <svg width="240" height="60" viewBox="0 0 240 60" fill="none">
                <defs>
                  <linearGradient id="bottomBunGrad" x1="120" y1="0" x2="120" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFA040" />
                    <stop offset="25%" stopColor="#D9720D" />
                    <stop offset="85%" stopColor="#9E4600" />
                    <stop offset="100%" stopColor="#6E2F00" />
                  </linearGradient>
                  <filter id="bottomShadow" x="-10%" y="-10%" width="120%" height="135%">
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.7" />
                  </filter>
                </defs>
                <path d="M 12,18 C 12,18 20,48 120,48 C 220,48 228,18 228,18 C 228,18 232,28 226,38 C 220,48 190,54 120,54 C 50,54 20,48 14,38 C 8,28 12,18 12,18 Z" fill="url(#bottomBunGrad)" filter="url(#bottomShadow)" />
                {/* Toasted crumb top surface */}
                <ellipse cx="120" cy="18" rx="108" ry="12" fill="#E67A13" stroke="#8A4300" strokeWidth="2.5" />
                {/* Crumb detail */}
                <ellipse cx="120" cy="18" rx="96" ry="8" fill="#FAD7A0" opacity="0.35" />
              </svg>
            </motion.div>

          </motion.div>

          {/* Glowing pedestal shadow at base of burger */}
          <motion.div 
            className="absolute bottom-8 w-[190px] h-[16px] rounded-full bg-black/75 blur-[4px] z-0" 
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { 
                opacity: 0.9, 
                scale: 1,
                transition: { delay: 0.6, duration: 1.0 } 
              }
            }}
            initial="hidden"
            animate="visible"
          />

          {/* Slight floating animation overlay for the finished state */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5.2 // Start floating after burger lands
            }}
          >
            {/* Invisibly matches the positioning to create the unified hover floating effect */}
            <div className="w-full h-full" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
