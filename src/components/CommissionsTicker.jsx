import React from 'react';
import { commissionsList } from '../data/supercars';
import { ArrowUpRight, CheckCircle2, Gauge } from 'lucide-react';

export default function CommissionsTicker({ onSelectProject }) {
  // Duplicate list to ensure smooth infinite loop
  const tickerItems = [...commissionsList, ...commissionsList];

  return (
    <section id="commissions" className="py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#F7F6F2] scroll-mt-16 sm:scroll-mt-24">
      {/* SECTION INTRO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#7A7873] block mb-2 sm:mb-3">
              BỘ SƯU TẬP • CÁC KIỆT TÁC ĐỘC BẢN
            </span>
            <h2 className="font-display font-[250] text-3xl sm:text-5xl lg:text-6xl text-[#0A0A0C] tracking-tight leading-[1.08]">
              Kiệt tác cơ khí <span className="font-medium italic">đang lăn bánh.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[#505050] font-normal leading-relaxed">
            Hơn 120+ siêu xe đã được nâng cấp cơ khí chính xác và cá nhân hóa độc bản tại APEX Studio, được kiểm chứng thực tế trên đường đua và máy Dyno chuyên dụng.
          </p>
        </div>
      </div>

      {/* 3-TIER STAGGERED INFINITE MARQUEE */}
      <div className="relative w-full overflow-hidden py-10 sm:py-12">
        {/* Soft edge gradient masks (adaptive width so cards aren't covered on mobile) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-[#F7F6F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-[#F7F6F2] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex gap-4 sm:gap-6 md:gap-8 items-center cursor-grab active:cursor-grabbing">
          {tickerItems.map((item, index) => {
            // Signature 3-tier staggered offset
            const staggerClass =
              index % 3 === 0
                ? '-translate-y-5 sm:-translate-y-7'
                : index % 3 === 1
                ? 'translate-y-5 sm:translate-y-7'
                : '-translate-y-2 sm:-translate-y-3';

            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onSelectProject && onSelectProject(item)}
                className={`flex-shrink-0 w-[260px] sm:w-80 group transition-transform duration-500 ease-out hover:scale-[1.03] active:scale-[0.98] cursor-pointer touch-manipulation ${staggerClass}`}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E7E5E0] shadow-md hover:shadow-2xl transition-all duration-300">
                  {/* Supercar Photo */}
                  <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-[#0A0A0C]">
                    <img
                      src={item.image}
                      alt={item.projectName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-95 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Stage Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                        <CheckCircle2 size={12} className="text-[#FF424D] flex-shrink-0" />
                        <span>{item.stage}</span>
                      </span>
                    </div>

                    {/* Specs overlay on image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-white/70 block truncate">
                        {item.carModel}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white truncate drop-shadow-sm flex items-center justify-between">
                        <span className="truncate">{item.projectName}</span>
                        <ArrowUpRight
                          size={17}
                          className="text-[#FF424D] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0"
                        />
                      </h4>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-3.5 sm:p-4 bg-white flex items-center justify-between text-xs border-t border-[#F0EEEA]">
                    <div className="flex items-center gap-1.5 text-[#0A0A0C] font-semibold truncate mr-2">
                      <Gauge size={14} className="text-[#FF424D] flex-shrink-0" />
                      <span className="truncate">{item.specs}</span>
                    </div>
                    <span className="text-[#7A7873] font-medium flex-shrink-0">{item.ownerCity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
