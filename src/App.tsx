import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-bg-dark text-white flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Header Navigation */}
      <Header />

      {/* Main View Switcher */}
      {currentView === 'storefront' ? (
        <div className="flex-grow flex flex-col">
          <Hero />
          <MenuSection />
          <Footer />
          <CartDrawer />
        </div>
      ) : (
        <div className="flex-grow">
          <AdminDashboard />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
