import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Radio,
  Gauge,
  Wrench,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const workshopFeeds = [
  {
    id: 'engine-lab',
    code: 'BAY 01',
    label: 'Phòng Động Cơ & Dyno Lab',
    badge: 'Hiệu Chuẩn Stage III',
    metric: 'Sai số: ±0.005mm',
    submetric: '1,500 HP 4WD Dyno Cell',
    videoUrl: 'https://assets.mixkit.co/videos/4716/4716-720.mp4',
    poster: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop',
    title: 'Cơ Khí Chính Xác & Thử Nghiệm Dyno',
    desc: 'Lắp ráp piston phôi rèn Billet, cân bằng động trục khuỷu và căn chỉnh khe hở nhiệt xupap theo tiêu chuẩn giải đua Le Mans 24H.',
    icon: Gauge,
    accentColor: '#FF424D',
    glowGradient: 'from-[#FF424D]/25 via-amber-500/10 to-transparent',
    telemetry: [
      { label: 'Công suất buồng thử', value: '1,500 HP' },
      { label: 'Dung sai trục khuỷu', value: '0.003 mm' },
      { label: 'Lưu lượng khí nạp', value: '850 CFM' },
    ]
  },
  {
    id: 'lift-underbody',
    code: 'BAY 02',
    label: 'Cầu Nâng Laser 3D & Khung Gầm',
    badge: 'Corner Weight 50:50',
    metric: 'Tỷ lệ trọng lượng: 50:50',
    submetric: 'Laser 3D Camber / Caster',
    videoUrl: 'https://assets.mixkit.co/videos/13260/13260-720.mp4',
    poster: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1200&auto=format&fit=crop',
    title: 'Khảo Sát Khí Động Học & Hạ Gầm',
    desc: 'Cân bằng tải trọng từng bánh xe trên 4 bàn cân điện tử độc lập, tinh chỉnh giảm chấn KW V4 đa van triệt tiêu văng đuôi.',
    icon: Wrench,
    accentColor: '#00E5FF',
    glowGradient: 'from-[#00E5FF]/25 via-blue-600/10 to-transparent',
    telemetry: [
      { label: 'Phân bổ trọng lượng', value: '50.2% : 49.8%' },
      { label: 'Góc Camber trước', value: '-2.5°' },
      { label: 'Hạ trọng tâm gầm', value: '-30 mm' },
    ]
  },
  {
    id: 'tig-welding',
    code: 'BAY 03',
    label: 'Hàn Cổ Xả Titanium Inconel',
    badge: 'Hàn TIG Thủ Công',
    metric: 'Nhiệt giới hạn: 1,200°C',
    submetric: 'Inconel 625 Formula 1',
    videoUrl: 'https://assets.mixkit.co/videos/47291/47291-720.mp4',
    poster: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=1200&auto=format&fit=crop',
    title: 'Điêu Khắc Hệ Thống Ống Xả F1',
    desc: 'Kỹ thuật hàn vảy cá thủ công trong phòng bảo vệ khí Argon tinh khiết 99.99%, giảm 14kg trọng lượng và tạo tiếng gầm thuần khiết.',
    icon: Sparkles,
    accentColor: '#FF9500',
    glowGradient: 'from-[#FF9500]/25 via-red-600/10 to-transparent',
    telemetry: [
      { label: 'Vật liệu hợp kim', value: 'Inconel 625' },
      { label: 'Độ tinh khiết khí Argon', value: '99.99%' },
      { label: 'Trọng lượng giảm', value: '-14.2 kg' },
    ]
  }
];

export default function EngineeringZSplit({ onOpenBooking }) {
  const [activeFeedIdx, setActiveFeedIdx] = useState(0);
  const feed = workshopFeeds[activeFeedIdx];

  return (
    <section id="engineering" className="py-16 sm:py-24 lg:py-32 bg-[#0A0A0C] text-white relative overflow-hidden scroll-mt-16 sm:scroll-mt-24">
      {/* ATMOSPHERIC DYNAMIC AMBIENT BACKLIGHT */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(900px,100vw)] h-[min(550px,60vh)] max-w-full bg-gradient-to-b ${feed.glowGradient} blur-[120px] rounded-full opacity-30 transition-all duration-700`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: EDITORIAL APEX STATEMENT */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90 mb-3 sm:mb-4 shadow-sm">
            <Radio size={12} className="text-[#FF424D] animate-pulse flex-shrink-0" />
            <span>XƯỞNG CHẾ TÁC APEX • WORKSHOP</span>
          </div>

          <h2 className="font-display font-[250] text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-4">
            Kỹ sư trưởng. Chủ xe. <br />
            <span className="font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#FF424D]">
              Không có người trung gian.
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-white/70 font-normal leading-relaxed">
            Chúng tôi xóa bỏ hoàn toàn nhân viên sales môi giới. Khách hàng làm việc trực tiếp 1-1 với Kỹ sư trưởng phụ trách dự án, theo dõi quá trình tháo lắp và thử nghiệm Dyno qua camera 4K truyền trực tiếp vào Owner Portal riêng tư.
          </p>
        </div>

        {/* ASYMMETRICAL CONSOLE STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto mb-10 sm:mb-12">
          
          {/* LEFT: 16:9 CINEMA MONITOR (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-full flex flex-col justify-between group">
              
              {/* VIDEO CONTAINER */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      key={feed.id}
                      ref={(el) => {
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                          if (el.paused) {
                            el.play().catch(() => {});
                          }
                        }
                      }}
                      src={feed.videoUrl}
                      poster={feed.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* INTEGRATED BOTTOM DESCRIPTION TAPE */}
              <div className="p-3.5 sm:p-5 bg-[#0E1015] border-t border-white/10 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: feed.accentColor }} />
                    <span className="truncate">{feed.title}</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 font-normal leading-relaxed line-clamp-2">
                    {feed.desc}
                  </p>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    OWNER PORTAL
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: 3-BAY INTERACTIVE COMMAND SELECTOR (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 sm:gap-3">
            {workshopFeeds.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeFeedIdx === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveFeedIdx(idx)}
                  className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex-1 flex flex-col justify-between touch-manipulation min-h-[54px] ${
                    isActive
                      ? 'bg-gradient-to-r from-white/15 to-white/5 border-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] translate-x-0 sm:translate-x-1'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    borderColor: isActive ? item.accentColor : undefined,
                  }}
                >
                  {/* Subtle active glow halo */}
                  {isActive && (
                    <div
                      className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full pointer-events-none opacity-20"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  )}

                  <div>
                    {/* Bay Top Row */}
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-md ${
                            isActive ? 'text-white' : 'bg-white/10 text-white/60'
                          }`}
                          style={{
                            backgroundColor: isActive ? item.accentColor : undefined,
                          }}
                        >
                          {item.code}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-white/50 tracking-wider uppercase truncate">
                          {item.badge}
                        </span>
                      </div>

                      <Icon
                        size={16}
                        className="flex-shrink-0"
                        style={{ color: isActive ? item.accentColor : 'rgba(255,255,255,0.4)' }}
                      />
                    </div>

                    {/* Bay Title */}
                    <h3 className="font-display font-bold text-xs sm:text-base text-white tracking-tight mb-1">
                      {item.label}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bay Bottom Spec Tag */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                    <span className="text-white/50 truncate max-w-[160px] sm:max-w-none">{item.submetric}</span>
                    <span className="font-bold flex-shrink-0" style={{ color: isActive ? item.accentColor : 'rgba(255,255,255,0.7)' }}>
                      {isActive ? '● ĐANG XEM' : 'CHỌN GÓC →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* ATELIER ASSURANCE PILLARS & VIP ACTION BAR */}
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Key Assurance Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 w-full lg:w-auto">
            {[
              'Không qua môi giới sales trung gian ăn hoa hồng',
              'Kiểm tra Dyno đo công suất bánh trước & sau nâng cấp',
              'Camera 4K truyền trực tiếp vào cổng thông tin chủ xe',
              'Xe cứu hộ sàn phẳng VIP đón tận tư gia kín đáo',
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                <CheckCircle2 size={15} className="text-[#FF424D] flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Booking Button */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full lg:w-auto text-flip-btn bg-white hover:bg-white/90 text-[#0A0A0C] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-tight shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px] touch-manipulation"
            >
              <span className="label-wrapper" data-label="Đặt lịch tham quan xưởng chế tác">
                <span className="label-placeholder">Đặt lịch tham quan xưởng chế tác</span>
              </span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
