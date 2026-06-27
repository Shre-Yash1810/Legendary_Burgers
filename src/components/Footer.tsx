import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Clock, MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { restaurantSettings, currentView, setCurrentView } = useApp();

  const handleAdminClick = () => {
    setCurrentView(currentView === 'storefront' ? 'admin' : 'storefront');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-surface/80 border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/5 pb-12 mb-8">
        
        {/* Brand details */}
        <div className="col-span-1 md:col-span-5 space-y-4">
          <Logo className="h-12 w-12" />
          <p className="text-sm text-text-secondary max-w-md leading-relaxed mt-4">
            Legendary Burgers is Hyderabad's premium burger destination. We smoke-grill each patty on fire and source ingredients locally to ensure a legendary bite every single time.
          </p>
          <div className="flex gap-4 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 text-text-secondary hover:text-primary hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Instagram"
            >
              <svg className="h-[18px] w-[18px] stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 text-text-secondary hover:text-primary hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Facebook"
            >
              <svg className="h-[18px] w-[18px] stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-white/5 text-text-secondary hover:text-primary hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <svg className="h-[18px] w-[18px] stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact details */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-primary shrink-0 mt-0.5" />
              <span>{restaurantSettings.phone}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-primary shrink-0 mt-0.5" />
              <a href={`mailto:${restaurantSettings.email}`} className="hover:text-white transition-colors">
                {restaurantSettings.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span className="leading-relaxed">{restaurantSettings.address}</span>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="col-span-1 md:col-span-4 space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Opening Hours</h4>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <Clock size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">Monday - Sunday</div>
                <div className="mt-1 text-xs">{restaurantSettings.hours}</div>
              </div>
            </li>
            <li className="p-4 rounded-2xl bg-white/2 border border-white/5 text-xs leading-relaxed max-w-sm">
              <span className="font-bold text-white block mb-1">Dine-in & Digital Kiosk</span>
              Select your table number, choose items, and place your order directly. Your food will be served right to your table!
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
        <div>
          © 2026 {restaurantSettings.name}. All Rights Reserved.
        </div>
        
        {/* Hidden Admin Login or System Portal Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleAdminClick}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldAlert size={12} />
            <span>Staff Dashboard</span>
          </button>
          <span>•</span>
          <span>Version 1.2.0</span>
        </div>
      </div>
    </footer>
  );
};
