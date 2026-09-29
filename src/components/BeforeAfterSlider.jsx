import React, { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfterComparison } from '../data/supercars';
import { ArrowLeftRight, Sliders } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const rectRef = useRef(null);
  const rafIdRef = useRef(null);

  // Position calculation with requestAnimationFrame & cached rect during drag
  const updatePosition = useCallback((clientX) => {
    const rect = rectRef.current || containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      setSliderPosition(percent);
    });
  }, []);

  // Cleanup requestAnimationFrame on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    if (!containerRef.current) return;
    rectRef.current = containerRef.current.getBoundingClientRect();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
      rectRef.current = null;
    }
  };

  const handlePresetClick = (targetPercent) => {
    setIsDragging(false);
    setSliderPosition(targetPercent);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsDragging(false);
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsDragging(false);
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIsDragging(false);
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIsDragging(false);
      setSliderPosition(100);
    }
  };

  // Dynamic CSS transition: smooth when clicking presets, instantaneous (0ms) when dragging
  const smoothTransition = isDragging
    ? 'none'
    : 'clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1), left 0.45s cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <section id="transformation" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-[#F7F6F2] scroll-mt-16 sm:scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#7A7873] block mb-2 sm:mb-3">
          {beforeAfterComparison.title}
        </span>
        <h2 className="font-display font-[250] text-3xl sm:text-5xl lg:text-6xl text-[#0A0A0C] tracking-tight leading-[1.08] max-w-4xl mx-auto">
          Từ tiêu chuẩn xuất xưởng đến <span className="font-medium italic">kiệt tác độc bản.</span>
        </h2>
        <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-[#505050] font-normal leading-relaxed">
          {beforeAfterComparison.subtext}
        </p>

        {/* QUICK PRESET CONTROLS (Touch-friendly & wrap smoothly on mobile) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center flex-wrap gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={() => handlePresetClick(100)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer min-h-[38px] touch-manipulation ${
              sliderPosition >= 98
                ? 'bg-[#0A0A0C] text-white shadow-md scale-102 sm:scale-105'
                : 'bg-white/90 hover:bg-white text-[#505050] hover:text-[#0A0A0C] border border-black/10'
            }`}
          >
            100% Nguyên bản OEM
          </button>
          <button
            type="button"
            onClick={() => handlePresetClick(50)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 min-h-[38px] touch-manipulation ${
              Math.abs(sliderPosition - 50) < 3
                ? 'bg-[#0A0A0C] text-white shadow-md scale-102 sm:scale-105'
                : 'bg-white/90 hover:bg-white text-[#505050] hover:text-[#0A0A0C] border border-black/10'
            }`}
          >
            <Sliders size={13} className="text-[#FF424D]" />
            50 : 50 So sánh
          </button>
          <button
            type="button"
            onClick={() => handlePresetClick(0)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer min-h-[38px] touch-manipulation ${
              sliderPosition <= 2
                ? 'bg-[#0A0A0C] text-white shadow-md scale-102 sm:scale-105'
                : 'bg-white/90 hover:bg-white text-[#505050] hover:text-[#0A0A0C] border border-black/10'
            }`}
          >
            100% Bản độ Track-Pack
          </button>
        </div>
      </div>

      {/* COMPARISON SLIDER STAGE */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-black/15 bg-[#0A0A0C]">
          
          {/* THE DRAGGABLE SLIDER CANVAS */}
          <div
            ref={containerRef}
            role="slider"
            aria-label="So sánh xe Porsche 911 GT3 trước và sau khi độ"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden select-none cursor-ew-resize touch-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF424D]"
            style={{ touchAction: 'none' }}
          >
            {/* 1. AFTER IMAGE (Bespoke Tuned Version - Base Layer) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img
                src={beforeAfterComparison.after.image}
                alt="Bản độ Bespoke Track-Pack"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* 2. BEFORE IMAGE (Stock OEM Version - Top Clipped Layer) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                transition: smoothTransition,
              }}
            >
              <img
                src={beforeAfterComparison.before.image}
                alt="Xe nguyên bản xuất xưởng OEM"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* PRECISION LASER DIVIDER LINE & GRIP HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(255,66,77,0.6),0_0_2px_rgba(255,255,255,1)] pointer-events-none"
              style={{
                left: `${sliderPosition}%`,
                transition: smoothTransition,
              }}
            >
              {/* Central Glowing Grip Pill */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white text-[#0A0A0C] shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex items-center justify-center border-2 border-[#0A0A0C] transition-transform duration-150 ${
                  isDragging ? 'scale-115 ring-4 ring-[#FF424D]/50' : 'hover:scale-105'
                }`}
              >
                <ArrowLeftRight size={16} className="text-[#0A0A0C]" />
              </div>
            </div>

            {/* Subtle Hint Overlay at Bottom */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-full max-w-[90%] flex justify-center">
              <span className="px-3.5 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white/90 text-[10px] sm:text-[11px] font-medium tracking-wide shadow-md border border-white/10 truncate max-w-full">
                ← Kéo thanh trượt để so sánh trực quan Trước / Sau →
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
