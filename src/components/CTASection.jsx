import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';

export default function CTASection({ onOpenBooking }) {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#0A0A0C] flex items-center justify-center">
      {/* 1. ATMOSPHERIC TUNNEL VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="https://assets.mixkit.co/videos/47629/47629-720.mp4"
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 filter brightness-90 contrast-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/30 to-[#0A0A0C]" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-[#0A0A0C]/85 pointer-events-none" />
      </div>

      {/* 2. REFINED OBSIDIAN MONOLITHIC PAVILION */}
      <div className="relative z-10 max-w-2xl w-full mx-3 sm:mx-6 lg:mx-auto">
        <div className="bg-[#0A0C10]/85 backdrop-blur-2xl text-white rounded-2xl sm:rounded-[40px] p-6 sm:p-10 lg:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/20 relative overflow-hidden">
          
          {/* Subtle Ambient Aura */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(384px,100vw)] h-48 bg-[#FF424D]/20 blur-3xl pointer-events-none rounded-full" />
          
          {/* Luxury Editorial Heading */}
          <h3 className="font-display font-[250] text-2xl sm:text-4xl lg:text-[3.25rem] text-white tracking-tight leading-[1.1] mb-3 sm:mb-4">
            Khởi đầu kiệt tác <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#FF424D]">
              của riêng bạn.
            </span>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
            Mỗi siêu phẩm bắt đầu bằng buổi khảo sát hiện trạng và trao đổi trực tiếp 1-1 với Kỹ sư trưởng tại phòng VIP Lounge riêng tư hoặc tận tư gia của chủ xe.
          </p>

          {/* Primary CTA & Direct Hotline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto text-flip-btn bg-white hover:bg-white/90 text-[#0A0A0C] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-tight shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <span className="label-wrapper" data-label="Đặt lịch khảo sát & thẩm định xe">
                <span className="label-placeholder">Đặt lịch khảo sát & thẩm định xe</span>
              </span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href="tel:0908888911"
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
            >
              <Phone size={14} className="text-[#FF424D]" />
              <span>Hotline 24/7: 0908 888 911</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
