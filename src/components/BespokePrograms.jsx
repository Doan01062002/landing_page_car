import React from 'react';
import { bespokeTiers } from '../data/supercars';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function BespokePrograms({ onSelectTier }) {
  return (
    <section id="programs" className="py-24 sm:py-32 bg-[#F7F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7A7873] block mb-3">
            CÁC GÓI DỊCH VỤ • CHƯƠNG TRÌNH ĐỘC BẢN
          </span>
          <h2 className="font-display font-[250] text-4xl sm:text-6xl text-[#0A0A0C] tracking-tight leading-[1.05]">
            Ba cấp độ chế tác <span className="font-medium italic">cơ khí đỉnh cao.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#505050] font-normal leading-relaxed">
            Từ tinh chỉnh hiệu năng trên đường đua đến những bản chế tác One-of-One độc bản hoàn toàn thủ công. Mỗi chương trình đều được cam kết bảo hành chất lượng cơ khí trọn đời.
          </p>
        </div>

        {/* 3 TIERS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {bespokeTiers.map((tier, idx) => {
            const isRec = tier.recommended;
            return (
              <div
                key={idx}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 ${
                  isRec
                    ? 'bg-[#0A0A0C] text-white shadow-2xl scale-[1.03] border-2 border-[#FF424D]'
                    : 'bg-white text-[#0A0A0C] shadow-md hover:shadow-xl border border-[#E7E5E0]'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-[#FF424D] text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Sparkles size={11} /> GÓI ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Subhead & Name */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-extrabold tracking-widest uppercase ${
                        isRec ? 'text-[#FF424D]' : 'text-[#7A7873]'
                      }`}
                    >
                      {tier.tier}
                    </span>
                    <span
                      className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full ${
                        isRec ? 'bg-white/10 text-white/80' : 'bg-[#F7F6F2] text-[#505050]'
                      }`}
                    >
                      <Clock size={13} /> {tier.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl tracking-tight mb-3">
                    {tier.name}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm font-normal leading-relaxed mb-6 ${
                      isRec ? 'text-white/80' : 'text-[#505050]'
                    }`}
                  >
                    {tier.lead}
                  </p>

                  <hr className={`mb-6 ${isRec ? 'border-white/15' : 'border-[#E7E5E0]'}`} />

                  {/* Feature Inclusions */}
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm leading-snug">
                        <Check
                          size={16}
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
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.tier)}
                    className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
