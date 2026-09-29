import React from 'react';
import { bespokeTiers } from '../data/supercars';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function BespokePrograms({ onSelectTier }) {
  return (
    <section id="programs" className="py-16 sm:py-24 lg:py-32 bg-[#F7F6F2] relative scroll-mt-16 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#7A7873] block mb-2 sm:mb-3">
            CÁC GÓI DỊCH VỤ • CHƯƠNG TRÌNH ĐỘC BẢN
          </span>
          <h2 className="font-display font-[250] text-3xl sm:text-5xl lg:text-6xl text-[#0A0A0C] tracking-tight leading-[1.08]">
            Ba cấp độ chế tác <span className="font-medium italic">cơ khí đỉnh cao.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#505050] font-normal leading-relaxed">
            Từ tinh chỉnh hiệu năng trên đường đua đến những bản chế tác One-of-One độc bản hoàn toàn thủ công. Mỗi chương trình đều được cam kết bảo hành chất lượng cơ khí trọn đời.
          </p>
        </div>

        {/* 3 TIERS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {bespokeTiers.map((tier, idx) => {
            const isRec = tier.recommended;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'bg-[#0A0A0C] text-white shadow-2xl lg:scale-[1.03] border-2 border-[#FF424D]'
                    : 'bg-white text-[#0A0A0C] shadow-md hover:shadow-xl border border-[#E7E5E0]'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 max-w-[92%]">
                    <span className="px-3 sm:px-4 py-1 rounded-full bg-[#FF424D] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider sm:tracking-widest flex items-center gap-1 shadow-md whitespace-nowrap truncate">
                      <Sparkles size={11} className="flex-shrink-0" /> GÓI ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Subhead & Name */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span
                      className={`text-xs font-extrabold tracking-widest uppercase ${
                        isRec ? 'text-[#FF424D]' : 'text-[#7A7873]'
                      }`}
                    >
                      {tier.tier}
                    </span>
                    <span
                      className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full ${
                        isRec ? 'bg-white/10 text-white/80' : 'bg-[#F7F6F2] text-[#505050]'
                      }`}
                    >
                      <Clock size={13} className="flex-shrink-0" /> {tier.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-2 sm:mb-3">
                    {tier.name}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm font-normal leading-relaxed mb-5 sm:mb-6 ${
                      isRec ? 'text-white/80' : 'text-[#505050]'
                    }`}
                  >
                    {tier.lead}
                  </p>

                  <hr className={`mb-5 sm:mb-6 ${isRec ? 'border-white/15' : 'border-[#E7E5E0]'}`} />

                  {/* Feature Inclusions */}
                  <ul className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-snug">
                        <Check
                          size={15}
                          className={`flex-shrink-0 mt-0.5 ${
                            isRec ? 'text-[#FF424D]' : 'text-[#0A0A0C]'
                          }`}
                        />
                        <span className={isRec ? 'text-white/90' : 'text-[#303030]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.tier)}
                    className={`w-full py-3 sm:py-3.5 px-5 sm:px-6 rounded-full font-semibold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] touch-manipulation active:scale-[0.98] ${
                      isRec
                        ? 'bg-[#FF424D] hover:bg-[#E0313C] text-white shadow-lg hover:shadow-xl'
                        : 'bg-[#0A0A0C] hover:bg-[#1E1E22] text-white'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
