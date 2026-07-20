import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { AtmosphereEffects } from './components/AtmosphereEffects';
import { MenuSection } from './components/MenuSection';
import { Reviews } from './components/Reviews';
import { ContactHours } from './components/ContactHours';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';

const AppContent: React.FC = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <AtmosphereEffects />

      <Header onOpenReservation={() => setIsReservationOpen(true)} />
      
      <Hero onOpenReservation={() => setIsReservationOpen(true)} />
      
      <GallerySection />
      
      <MenuSection />
      
      <Reviews />
      
      <ContactHours />
      
      <Footer />
      
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
      
      <CookieBanner />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
