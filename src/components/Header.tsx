import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Menu, X, Shield, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    storefrontSection, 
    setStorefrontSection,
    cart
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', value: 'home', href: '#home' },
    { label: 'Menu', value: 'menu', href: '#menu' },
    { label: 'Contact', value: 'contact', href: '#contact' }
  ];

  const handleNavClick = (sectionValue: string) => {
    setMobileMenuOpen(false);
    
    // Switch to storefront view if currently in admin
    if (currentView !== 'storefront') {
      setCurrentView('storefront');
    }
    
    setStorefrontSection(sectionValue);
    
    // Smooth scroll to element
    setTimeout(() => {
      const element = document.getElementById(sectionValue);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAdminToggle = () => {
    setMobileMenuOpen(false);
    setCurrentView(currentView === 'storefront' ? 'admin' : 'storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCart = () => {
    // Dispatch cart open click event for CartDrawer to handle
    const event = new CustomEvent('open-cart');
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={() => handleNavClick('home')}>
          <Logo className="h-10 w-10 sm:h-12 sm:w-12" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentView === 'storefront' && storefrontSection === link.value;
            return (
              <button
                key={link.value}
                onClick={() => handleNavClick(link.value)}
                className={`relative font-sans text-sm font-semibold tracking-wide uppercase transition-colors duration-200 cursor-pointer py-1.5 ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-primary" 
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Quick Storefront Cart (Non-floating desktop header) */}
          {currentView === 'storefront' && cartItemsCount > 0 && (
            <button
              onClick={handleOpenCart}
              className="relative flex items-center justify-center p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-pulse">
                {cartItemsCount}
              </span>
            </button>
          )}

          {/* Admin Dashboard Switcher */}
          <button
            onClick={handleAdminToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              currentView === 'admin'
                ? 'bg-primary border-primary text-white hover:bg-primary-hover'
                : 'border-white/10 text-text-secondary hover:text-white hover:border-white/30 hover:bg-white/5'
            }`}
          >
            <Shield size={14} />
            {currentView === 'admin' ? 'Customer App' : 'Admin Panel'}
          </button>
        </div>

        {/* Mobile menu toggle & Cart Icon */}
        <div className="flex md:hidden items-center gap-3">
          {currentView === 'storefront' && cartItemsCount > 0 && (
            <button
              onClick={handleOpenCart}
              className="relative flex items-center justify-center p-2 rounded-full bg-white/5 text-white cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartItemsCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-72 max-w-xs p-6 shadow-2xl border-l border-white/5 flex flex-col justify-between"
              style={{ backgroundColor: '#1A1A1A' }}
            >
              <div className="flex flex-col gap-8">
                {/* Close Button & Brand */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <Logo className="h-8 w-8" />
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = currentView === 'storefront' && storefrontSection === link.value;
                    return (
                      <button
                        key={link.value}
                        onClick={() => handleNavClick(link.value)}
                        className={`text-left text-lg font-bold tracking-wide uppercase py-2 cursor-pointer transition-colors ${
                          isActive ? 'text-primary' : 'text-text-secondary hover:text-white'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Admin Button in Drawer */}
              <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
                <button
                  onClick={handleAdminToggle}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold tracking-wider uppercase text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Shield size={16} />
                  {currentView === 'admin' ? 'Customer App' : 'Admin Panel'}
                </button>
                <div className="text-center text-[10px] text-text-secondary">
                  © 2026 Legendary Burgers
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
