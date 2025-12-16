


import React from 'react';
import HeroSection from './components/HeroSection';
import ServiciosSection from './components/ServiciosSection';
import GaleriaSection from './components/GaleriaSection';
import SobreNosotrosSection from './components/SobreNosotrosSection';
import TestimoniosSection from './components/TestimoniosSection';
import ContactoSection from './components/ContactoSection';
import PromoSection from './components/PromoSection';
import ScrollToTopButton from './components/ScrollToTopButton';

export default function Home() {
  return (
    <div className="home-vet bg-light" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <HeroSection />
      <ServiciosSection />
      <GaleriaSection />
      <SobreNosotrosSection />
      <TestimoniosSection />
      <ContactoSection />
      <PromoSection />
      <ScrollToTopButton />
    </div>
  );
}
