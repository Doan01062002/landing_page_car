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
  const [selectedTier, setSelectedTier] = useState('STAGE II');
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
      if (bookingModalOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [bookingModalOpen]);

  const handleOpenBookingWithTier = (tierName) => {
    setSelectedTier(tierName || 'STAGE II');
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] text-[#0A0A0C] flex flex-col selection:bg-[#0A0A0C] selection:text-white">
      {/* STICKY NAVBAR */}
      <Navbar onOpenBooking={() => handleOpenBookingWithTier('STAGE II')} />

      {/* MAIN CONTENT LANDING SECTIONS */}
      <main className="flex-1 w-full">
        {/* 1. HERO 4K VIDEO CAROUSEL & EXCLUSION TYPOGRAPHY */}
        <Hero />

        {/* 2. STAGGERED 3-TIER COMMISSIONS TICKER */}
        <CommissionsTicker onSelectProject={() => handleOpenBookingWithTier('STAGE III')} />

        {/* 3. FULLSCREEN EDITORIAL MANIFESTO QUOTE */}
        <EngineerManifesto />

        {/* 4. SIGNATURE BEFORE & AFTER DRAG SLIDER */}
        <BeforeAfterSlider />

        {/* 5. Z-PATTERN ENGINEERING CRAFTSMANSHIP & VIDEO */}
        <EngineeringZSplit onOpenBooking={() => handleOpenBookingWithTier('STAGE II')} />

        {/* 6. BESPOKE SERVICE TIERS & COMMISSIONS */}
        <BespokePrograms onSelectTier={handleOpenBookingWithTier} />

        {/* 7. HIGH-CONVERSION CTA WHITE PILL CARD */}
        <CTASection onOpenBooking={() => handleOpenBookingWithTier('STAGE III')} />
      </main>

      {/* 8. MODULAR ATELIER FOOTER & WORKSHOPS */}
      <Footer onOpenBooking={() => handleOpenBookingWithTier('STAGE II')} />

      {/* VIP BOOKING & INSPECTION MODAL */}
      <VIPBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTier={selectedTier}
      />
    </div>
  );
}
