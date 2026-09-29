import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export default function EngineerManifesto() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0C] py-12 sm:py-16 lg:py-20">
      {/* BACKGROUND IMAGE WITH CINEMATIC LIGHTING */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2400&auto=format&fit=crop"
          alt="APEX Master Engineer Workshop"
          className="w-full h-full object-cover opacity-45 filter contrast-115"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-[#0A0A0C]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col justify-between">
          {/* Top Label */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#FF424D]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#FF424D]">
              TUYÊN NGÔN APEX ATELIER
            </span>
          </div>

          {/* EDITORIAL QUOTE */}
          <div className="my-6 sm:my-8 lg:my-10">
            <blockquote className="mix-blend-exclusion text-white font-sans font-[200] text-xl sm:text-3xl md:text-4xl lg:text-[2.6rem] tracking-[-0.03em] leading-[1.2] sm:leading-[1.18]">
              &ldquo;Không đơn thuần độ xe. Chúng tôi <span className="font-normal italic text-white/95">đánh thức linh hồn cơ khí</span> thành kiệt tác độc bản.&rdquo;
            </blockquote>
          </div>

          {/* Bottom Attribution & Engineering Credentials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-5 border-t border-white/15 pt-5 sm:pt-6">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wider uppercase">
                MARKUS VANCE
              </h3>
              <p className="text-xs text-[#A09E96] font-medium tracking-wide mt-0.5">
                Kỹ Sư Cơ Khí Trưởng • Nhà Sáng Lập APEX Atelier
              </p>
            </div>

            {/* Credibility badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-[#FF424D] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">18+ Năm Kinh nghiệm Stuttgart & Modena</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">Chứng nhận TÜV Rheinland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
