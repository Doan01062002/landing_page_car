import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CommissionsTicker from './components/CommissionsTicker';
import EngineerManifesto from './components/EngineerManifesto';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import EngineeringZSplit from './components/EngineeringZSplit';
import BespokePrograms from './components/BespokePrograms';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import VIPBookingModal from './components/VIPBookingModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [navbarModalOpen, setNavbarModalOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState({
    tier: 'STAGE II',
    brand: 'Porsche',
    model: '',
  });
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Inertia Scroll (Patreon standard)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId = null;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronize Lenis with modal state to prevent background wheel scroll
  useEffect(() => {
    if (lenisRef.current) {
      if (bookingModalOpen || navbarModalOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [bookingModalOpen, navbarModalOpen]);

  const handleOpenBooking = (options = {}) => {
    if (typeof options === 'string') {
      setBookingOptions({ tier: options, brand: 'Porsche', model: '' });
    } else {
      setBookingOptions({
        tier: options.tier || 'STAGE II',
        brand: options.brand || 'Porsche',
        model: options.model || '',
      });
    }
    setBookingModalOpen(true);
  };

  const handleSelectCommissionProject = (project) => {
    const rawBrand = project.carModel ? project.carModel.split(' ')[0] : 'Khác';
    const normalizedBrand = ['Porsche', 'Ferrari', 'Lamborghini'].includes(rawBrand)
      ? rawBrand
      : rawBrand.includes('Mercedes') || rawBrand.includes('AMG') || rawBrand.includes('G63')
      ? 'Mercedes-AMG'
      : 'Khác';
    handleOpenBooking({
      brand: normalizedBrand,
      model: `${project.carModel} (${project.projectName})`,
      tier: 'STAGE III',
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#0A0A0C] flex flex-col selection:bg-[#0A0A0C] selection:text-white">
      {/* STICKY NAVBAR */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onModalStateChange={setNavbarModalOpen}
      />

      {/* MAIN CONTENT LANDING SECTIONS */}
      <main className="flex-1 w-full">
        {/* 1. HERO 4K VIDEO CAROUSEL & EXCLUSION TYPOGRAPHY */}
        <Hero />

        {/* 2. STAGGERED 3-TIER COMMISSIONS TICKER */}
        <CommissionsTicker onSelectProject={handleSelectCommissionProject} />

        {/* 3. FULLSCREEN EDITORIAL MANIFESTO QUOTE */}
        <EngineerManifesto />

        {/* 4. SIGNATURE BEFORE & AFTER DRAG SLIDER */}
        <BeforeAfterSlider />

        {/* 5. Z-PATTERN ENGINEERING CRAFTSMANSHIP & VIDEO */}
        <EngineeringZSplit onOpenBooking={() => handleOpenBooking({ tier: 'STAGE II' })} />

        {/* 6. BESPOKE SERVICE TIERS & COMMISSIONS */}
        <BespokePrograms onSelectTier={(tier) => handleOpenBooking({ tier })} />

        {/* 7. HIGH-CONVERSION CTA WHITE PILL CARD */}
        <CTASection onOpenBooking={() => handleOpenBooking({ tier: 'STAGE III' })} />
      </main>

      {/* 8. MODULAR ATELIER FOOTER & WORKSHOPS */}
      <Footer onOpenBooking={() => handleOpenBooking({ tier: 'STAGE II' })} />

      {/* VIP BOOKING & INSPECTION MODAL */}
      <VIPBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTier={bookingOptions.tier}
        initialBrand={bookingOptions.brand}
        initialModel={bookingOptions.model}
      />
    </div>
  );
}
