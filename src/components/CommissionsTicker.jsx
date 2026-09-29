import React from 'react';
import { commissionsList } from '../data/supercars';
import { ArrowUpRight, CheckCircle2, Gauge } from 'lucide-react';

export default function CommissionsTicker({ onSelectProject }) {
  // Duplicate list to ensure smooth infinite loop
  const tickerItems = [...commissionsList, ...commissionsList];

  return (
    <section id="commissions" className="py-20 sm:py-28 overflow-hidden bg-[#F7F6F2]">
      {/* SECTION INTRO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#7A7873] block mb-3">
              BỘ SƯU TẬP • CÁC KIỆT TÁC ĐỘC BẢN
            </span>
            <h2 className="font-display font-[250] text-4xl sm:text-6xl text-[#0A0A0C] tracking-tight leading-[1.05]">
              Kiệt tác cơ khí <span className="font-medium italic">đang lăn bánh.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#505050] font-normal leading-relaxed">
            Hơn 120+ siêu xe đã được nâng cấp cơ khí chính xác và cá nhân hóa độc bản tại APEX Studio, được kiểm chứng thực tế trên đường đua và máy Dyno chuyên dụng.
          </p>
        </div>
      </div>

      {/* PATREON-STYLE 3-TIER STAGGERED INFINITE MARQUEE */}
      <div className="relative w-full overflow-hidden py-8">
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#F7F6F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#F7F6F2] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-infinite flex gap-6 sm:gap-8 items-center cursor-grab active:cursor-grabbing">
          {tickerItems.map((item, index) => {
            // Patreon's signature 3-tier staggered offset
            const staggerClass =
              index % 3 === 0
                ? '-translate-y-8'
                : index % 3 === 1
                ? 'translate-y-8'
                : '-translate-y-3';

            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onSelectProject && onSelectProject(item)}
                className={`flex-shrink-0 w-72 sm:w-88 group transition-transform duration-500 ease-out hover:scale-[1.03] ${staggerClass}`}
              >
                <div className="bg-white rounded-3xl overflow-hidden border border-[#E7E5E0] shadow-md hover:shadow-2xl transition-all duration-300">
                  {/* Supercar Photo */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#0A0A0C]">
                    <img
                      src={item.image}
                      alt={item.projectName}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-95 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Stage Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase">
                        <CheckCircle2 size={12} className="text-[#FF424D]" />
                        {item.stage}
                      </span>
                    </div>

                    {/* Specs overlay on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-white/70 block">
                        {item.carModel}
                      </span>
                      <h4 className="font-display font-bold text-lg text-white truncate drop-shadow-sm flex items-center justify-between">
                        <span>{item.projectName}</span>
                        <ArrowUpRight
                          size={18}
                          className="text-[#FF424D] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </h4>
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-4 bg-white flex items-center justify-between text-xs border-t border-[#F0EEEA]">
                    <div className="flex items-center gap-1.5 text-[#0A0A0C] font-semibold">
                      <Gauge size={14} className="text-[#FF424D]" />
                      <span>{item.specs}</span>
                    </div>
                    <span className="text-[#7A7873] font-medium">{item.ownerCity}</span>
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
