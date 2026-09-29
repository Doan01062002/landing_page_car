import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { heroSupercars } from '../data/supercars';
import { engineAudio } from '../utils/engineAudio';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const activeVideoRef = useRef(null);
  const currentCar = heroSupercars[activeIndex];
  const prevCarIdRef = useRef(currentCar.id);

  const getAudioTypeForCar = (carId) => {
    if (carId === 'ferrari-f8' || carId === 'g63-amg') return 'v8';
    return 'flat6';
  };

  const handlePrev = useCallback(() => {
    if (activeVideoRef.current) {
      try {
        activeVideoRef.current.pause();
      } catch {}
    }
    setActiveIndex((prev) => {
      const nextIdx = prev === 0 ? heroSupercars.length - 1 : prev - 1;
      return nextIdx;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (activeVideoRef.current) {
      try {
        activeVideoRef.current.pause();
      } catch {}
    }
    setActiveIndex((prev) => {
      const nextIdx = prev === heroSupercars.length - 1 ? 0 : prev + 1;
      return nextIdx;
    });
  }, []);

  // Update engine audio when car changes IF audio is playing (without double-start churn)
  useEffect(() => {
    if (prevCarIdRef.current !== currentCar.id) {
      prevCarIdRef.current = currentCar.id;
      if (isPlayingAudio) {
        const type = getAudioTypeForCar(currentCar.id);
        engineAudio.start(type);
      }
    }
  }, [currentCar.id, isPlayingAudio]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      engineAudio.stop(true);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlayingAudio) {
      engineAudio.stop();
      setIsPlayingAudio(false);
    } else {
      const type = getAudioTypeForCar(currentCar.id);
      engineAudio.start(type);
      setIsPlayingAudio(true);
    }
  };

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
    <section className="relative w-full h-[100dvh] min-h-[min(100dvh,600px)] overflow-hidden bg-[#0A0A0C] flex flex-col justify-between">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. NAVIGATION ARROWS (Touch-friendly & responsive positioning) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Siêu xe trước"
        className="absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/80 bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer touch-manipulation"
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Siêu xe kế tiếp"
        className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/20 hover:border-white/80 bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer touch-manipulation"
      >
        <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
        </svg>
      </button>

      {/* 3. SIGNATURE DIAGONAL ASYMMETRICAL TYPOGRAPHY */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-14 sm:pt-20 lg:pt-32 pb-14 sm:pb-20 lg:pb-30 px-4 sm:px-10 lg:px-16 select-none">
        
        {/* TOP-LEFT ANCHOR */}
        <div className="text-left max-w-4xl">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${currentCar.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.28, ease: 'easeInOut' } }}
                transition={{
                  duration: 1.3,
                  ease: [0.25, 0.1, 0.25, 1],
                  opacity: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
                  y: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                <h1 className="mix-blend-exclusion text-white font-sans font-[200] text-2xl sm:text-5xl md:text-6xl lg:text-[7.5rem] xl:text-[9rem] tracking-[-0.05em] leading-[0.92] break-words">
                  {currentCar.tagline}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM-RIGHT ANCHOR */}
        <div className="text-right ml-auto max-w-4xl flex flex-col items-end">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`subtagline-${currentCar.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.28, ease: 'easeInOut' } }}
                transition={{
                  duration: 1.3,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.15,
                  opacity: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
                  y: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
                }}
              >
                <h1 className="mix-blend-exclusion text-white font-sans font-[200] text-2xl sm:text-5xl md:text-6xl lg:text-[7.5rem] xl:text-[9rem] tracking-[-0.05em] leading-[0.92] text-right break-words">
                  {currentCar.taglineSub}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Model Name Badge */}
          <div className="mt-2 sm:mt-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`model-${currentCar.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeInOut' } }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
                className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 font-mono text-[10px] sm:text-xs tracking-wider uppercase shadow-md"
              >
                {currentCar.modelName}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* 4. RESPONSIVE BOTTOM TOOLBAR (Down Arrow + Carousel Indicators + Engine Audio Controls) */}
      <div className="relative z-30 pointer-events-auto mt-auto px-4 sm:px-10 lg:px-16 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        
        {/* Left: Scroll Down Arrow & Carousel Ticker Dots */}
        <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-center">
          <a
            href="#commissions"
            aria-label="Cuộn xuống để khám phá các kiệt tác"
            className="text-white/80 hover:text-white transition-all duration-300 hover:translate-y-1 block cursor-pointer p-1"
          >
            <svg viewBox="0 0 78 77" className="w-6 h-6 sm:w-8 sm:h-8 fill-current drop-shadow-md">
              <path d="M43.5 0v59.244l27.34-26.955 6.319 6.408-35 34.507L39 76.319l-3.16-3.115-35-34.507 6.319-6.408L34.5 59.244V0h9z" />
            </svg>
          </a>

          {/* Carousel indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {heroSupercars.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Chuyển đến siêu xe ${car.modelName}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 sm:w-9 bg-[#FF424D]'
                    : 'w-2 bg-white/35 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Interactive Engine Acoustic Audio Controls (R2 Requirement) */}
        <div className="self-end sm:self-center">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isPlayingAudio ? 'Tắt âm thanh động cơ' : 'Bật âm thanh động cơ'}
            className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer text-xs font-medium shadow-lg min-h-[40px] touch-manipulation ${
              isPlayingAudio
                ? 'bg-[#FF424D]/90 border-[#FF424D] text-white shadow-[#FF424D]/30 ring-2 ring-[#FF424D]/50'
                : 'bg-black/50 hover:bg-black/75 border-white/20 text-white/80 hover:text-white'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 size={15} className="animate-pulse flex-shrink-0" />
                {/* Dynamic animated equalizer bars */}
                <span className="flex items-end gap-0.5 h-3.5 px-0.5">
                  <span className="w-0.5 h-full bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-0.5 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-0.5 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.45s]" />
                  <span className="w-0.5 h-1.5 bg-white rounded-full animate-bounce" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-tight">
                  Âm thanh {currentCar.id === 'porsche-gt3' ? 'Boxer 6' : 'Twin-Turbo V8'}
                </span>
              </>
            ) : (
              <>
                <VolumeX size={15} className="text-[#FF424D] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs tracking-tight">
                  Bật âm thanh động cơ
                </span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
