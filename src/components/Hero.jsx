import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSupercars } from '../data/supercars';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideoRef = useRef(null);
  const currentCar = heroSupercars[activeIndex];

  const handlePrev = useCallback(() => {
    if (activeVideoRef.current) {
      try {
        activeVideoRef.current.pause();
      } catch {}
    }
    setActiveIndex((prev) => (prev === 0 ? heroSupercars.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    if (activeVideoRef.current) {
      try {
        activeVideoRef.current.pause();
      } catch {}
    }
    setActiveIndex((prev) => (prev === heroSupercars.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance safety fallback: only advances if video stalls or fails to play
  useEffect(() => {
    const expectedDuration = heroSupercars[activeIndex]?.videoDuration || 10;
    const timeoutMs = Math.max(15000, Math.ceil((expectedDuration + 5) * 1000));
    let timer = null;

    const scheduleTimer = (delay = timeoutMs) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.hidden) {
          scheduleTimer(3000);
          return;
        }
        if (activeVideoRef.current && !activeVideoRef.current.paused && !activeVideoRef.current.ended) {
          scheduleTimer(3000);
          return;
        }
        handleNext();
      }, delay);
    };

    scheduleTimer();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeIndex, handleNext]);

  // Resume video playback when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && activeVideoRef.current && activeVideoRef.current.paused && !activeVideoRef.current.ended) {
        activeVideoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleVideoEnded = useCallback((e) => {
    if (e.currentTarget === activeVideoRef.current) {
      handleNext();
    }
  }, [handleNext]);

  const handleVideoError = useCallback((e) => {
    if (e.currentTarget === activeVideoRef.current) {
      handleNext();
    }
  }, [handleNext]);

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0A0A0C] flex flex-col justify-between">
      {/* 1. FULL-BLEED CINEMATIC SUPERCAR VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0C]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCar.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              key={currentCar.id}
              ref={(el) => {
                if (el) {
                  activeVideoRef.current = el;
                  if (el.paused) {
                    el.play().catch(() => {});
                  }
                }
              }}
              src={currentCar.videoUrl}
              poster={currentCar.posterUrl}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              className="w-full h-full object-cover"
            />
            {/* Atmospheric gradient keeping video balanced for optical exclusion */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. NAVIGATION ARROWS */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Siêu xe trước"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/80 bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Siêu xe kế tiếp"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/80 bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
        </svg>
      </button>

      {/* 3. SIGNATURE DIAGONAL ASYMMETRICAL TYPOGRAPHY WITH ULTRA-SMOOTH CHOREOGRAPHY */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-28 sm:pb-32 lg:pb-36 px-6 sm:px-12 lg:px-20 select-none">
        
        {/* TOP-LEFT ANCHOR */}
        <div className="text-left max-w-4xl">
          {/* Main Tagline: Luxurious Slow & Smooth Drift */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${currentCar.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.28, ease: 'easeInOut' } }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
                  y: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                <h1 className="mix-blend-exclusion text-white font-sans font-[200] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] tracking-[-0.055em] leading-[0.88]">
                  {currentCar.tagline}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM-RIGHT ANCHOR */}
        <div className="text-right ml-auto max-w-4xl flex flex-col items-end">
          {/* Sub Tagline: Luxurious Slow & Smooth Drift */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`subtagline-${currentCar.id}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.28, ease: 'easeInOut' } }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.18,
                  opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.18 },
                  y: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.18 },
                }}
              >
                <h1 className="mix-blend-exclusion text-white font-sans font-[200] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9.5rem] tracking-[-0.055em] leading-[0.88] text-right">
                  {currentCar.taglineSub}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Model Name Badge (Clean fade without exclusion blending) */}
          <div className="mt-2 sm:mt-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`model-${currentCar.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeInOut' } }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.32 }}
                className="px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 font-mono text-[10px] sm:text-xs tracking-wider uppercase"
              >
                {currentCar.modelName}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM-LEFT: Down Arrow SVG & Carousel Ticker Dots */}
      <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-12 lg:left-20 z-30 pointer-events-auto flex items-center gap-6">
        <a
          href="#commissions"
          aria-label="Cuộn xuống để khám phá các kiệt tác"
          className="text-white/80 hover:text-white transition-all duration-300 hover:translate-y-1.5 block cursor-pointer"
        >
          <svg viewBox="0 0 78 77" className="w-8 h-8 sm:w-10 sm:h-10 fill-current drop-shadow-md">
            <path d="M43.5 0v59.244l27.34-26.955 6.319 6.408-35 34.507L39 76.319l-3.16-3.115-35-34.507 6.319-6.408L34.5 59.244V0h9z" />
          </svg>
        </a>

        {/* Carousel indicator dots */}
        <div className="flex items-center gap-2">
          {heroSupercars.map((car, idx) => (
            <button
              key={car.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Chuyển đến siêu xe ${car.modelName}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-[#FF424D]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
