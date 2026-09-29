import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Menu, X, ArrowUpRight, Sparkles, Bell } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatesOpen, setUpdatesOpen] = useState(false);

  const navLinks = [
    { id: 'commissions', label: 'Dự án Độc bản', href: '#commissions' },
    { id: 'transformation', label: 'Trước & Sau', href: '#transformation' },
    { id: 'engineering', label: 'Kỹ thuật Xưởng', href: '#engineering' },
    { id: 'programs', label: 'Gói Chế tác', href: '#programs' },
  ];

  const recentUpdates = [
    {
      date: 'Hôm nay • 14:30',
      title: 'Dyno Calibration Porsche 911 GT3 (992)',
      desc: 'Hoàn thiện map đường đua kép +38 HP dyno proven, lắp đặt ống xả Inconel 625 mạ vàng cách nhiệt.',
      tag: 'DYNO LAB',
    },
    {
      date: 'Hôm qua • 18:00',
      title: 'Bàn giao Ferrari F8 Tributo N-Largo Widebody',
      desc: 'Chủ nhân tại TP.HCM tiếp nhận kiệt tác sau 12 tuần hoàn thiện full carbon pre-preg.',
      tag: 'BÀN GIAO',
    },
    {
      date: '2 ngày trước',
      title: 'Khai trương phòng Dyno 4WD 1500HP tại Atelier Q.7',
      desc: 'Phục vụ các siêu xe dẫn động 4 bánh: Huracán STO, 911 Turbo S, G63 AMG.',
      tag: 'CƠ SỞ VẬT CHẤT',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu or modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen || updatesOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchOpen, updatesOpen]);

  // Keyboard accessibility: Close active modals or drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setUpdatesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* FLOATING RESPONSIVE NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 sm:py-3 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-4 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* DESKTOP: 3-COLUMN BALANCED GRID (1fr auto 1fr) */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* LEFT COLUMN: Clean Text Links + Updates Pill */}
            <nav className="flex items-center space-x-3 xl:space-x-5 justify-self-start">
              <ul className="flex items-center space-x-3 xl:space-x-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-flip-btn text-white/90 hover:text-white text-xs xl:text-[13px] font-medium tracking-tight py-1 group"
                    >
                      <span className="label-wrapper" data-label={link.label}>
                        <span className="label-placeholder">{link.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Updates Pill Border Button */}
              <button
                type="button"
                onClick={() => setUpdatesOpen(true)}
                className="border border-white/40 hover:border-white rounded-full px-2.5 xl:px-3 py-1.5 text-xs text-white font-medium transition-colors backdrop-blur-xs cursor-pointer flex items-center gap-1.5 group text-flip-btn"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF424D] animate-ping" />
                <span className="label-wrapper" data-label="Cập nhật">
                  <span className="label-placeholder">Cập nhật</span>
                </span>
              </button>
            </nav>

            {/* CENTER COLUMN: Centered Geometric Sans Wordmark */}
            <div className="justify-self-center">
              <a
                href="#"
                className="font-display font-black text-xl xl:text-2xl tracking-[-0.045em] text-white uppercase select-none hover:opacity-90 transition-opacity"
              >
                APEX STUDIO
              </a>
            </div>

            {/* RIGHT COLUMN: Search Pill, Hotline Pill, & Solid White Pill Button */}
            <div className="flex items-center space-x-2 xl:space-x-3 justify-self-end">
              {/* Pill border button with search icon: "Tìm dòng xe" */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="border border-white/40 hover:border-white rounded-full px-3 xl:px-4 py-1.5 xl:py-2 text-xs text-white font-medium flex items-center gap-1.5 xl:gap-2 backdrop-blur-xs transition-colors cursor-pointer"
                title="Tìm kiếm dự án hoặc dòng xe"
              >
                <Search size={13} />
                <span className="hidden xl:inline">Tìm dòng xe</span>
              </button>

              {/* Pill border button: "Hotline" */}
              <a
                href="tel:0908888911"
                className="border border-white/40 hover:border-white rounded-full px-3 xl:px-4 py-1.5 xl:py-2 text-xs text-white font-medium flex items-center gap-1.5 xl:gap-2 backdrop-blur-xs transition-colors"
                title="Hotline tư vấn VIP 24/7"
              >
                <Phone size={13} className="text-[#FF424D]" />
                <span className="hidden xl:inline">Hotline 24/7</span>
              </a>

              {/* Solid White Pill Button with Black Text: "Đặt lịch VIP" */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-flip-btn bg-white hover:bg-white/90 text-black font-semibold rounded-full px-4 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm tracking-tight transition-all duration-200 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="label-wrapper" data-label="Đặt lịch VIP">
                  <span className="label-placeholder">Đặt lịch VIP</span>
                </span>
              </button>
            </div>
          </div>

          {/* MOBILE / TABLET HEADER (< lg) */}
          <div className="flex lg:hidden items-center justify-between">
            <a
              href="#"
              className="font-display font-black text-lg sm:text-xl tracking-[-0.04em] text-white uppercase select-none"
            >
              APEX STUDIO
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-white text-black px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold shadow-sm cursor-pointer min-h-[38px] active:scale-95 transition-transform"
              >
                Đặt lịch VIP
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full border border-white/35 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer min-h-[44px] min-w-[44px] touch-manipulation active:bg-white/10"
                aria-label="Mở menu điều hướng"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Touch-optimized, safe scrollable container) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[56px] sm:top-[68px] z-40 bg-[#0A0A0C]/98 backdrop-blur-2xl border-b border-white/10 p-5 sm:p-6 shadow-2xl lg:hidden text-white max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col space-y-2 mb-5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-base font-semibold text-white/90 hover:text-white py-2.5 border-b border-white/10 flex items-center justify-between min-h-[44px] touch-manipulation"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={17} className="text-white/40" />
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setUpdatesOpen(true);
                }}
                className="text-base font-semibold text-white/90 hover:text-white py-2.5 border-b border-white/10 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF424D]" />
                  <span>Bản tin Xưởng Chế tác</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">Mới</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/30 text-sm font-semibold text-white bg-white/5 min-h-[44px] touch-manipulation cursor-pointer"
              >
                <Search size={15} />
                <span>Tìm Kiếm Dòng Xe</span>
              </button>
              <a
                href="tel:0908888911"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/30 text-sm font-semibold text-white bg-white/5 min-h-[44px] touch-manipulation"
              >
                <Phone size={15} className="text-[#FF424D]" />
                <span>Hotline VIP: 0908 888 911</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-white text-black rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg min-h-[44px] touch-manipulation cursor-pointer"
              >
                <Sparkles size={16} className="text-[#FF424D]" />
                <span>Đặt Lịch Thẩm Định VIP 1-1</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Tìm kiếm dòng xe"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSearchOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#FAF9F6] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 text-[#0A0A0C] my-auto cursor-default"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E5E0]">
                <div className="flex items-center gap-2.5 w-full">
                  <Search size={17} className="text-[#7A7873] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm: Porsche GT3, Ferrari F8, G63..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-sm font-medium focus:outline-none placeholder:text-[#A09E96] bg-transparent"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EAE8E2] text-[#7A7873] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A09E96] block mb-2">
                  Dự án phổ biến được tìm kiếm
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Porsche 911 GT3', 'Ferrari F8 N-Largo', 'G63 Forged Carbon', 'Inconel Exhaust', 'Brembo Carbon Ceramic'].map(
                    (tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(tag);
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#EAE8E2] text-[#0A0A0C] font-medium border border-[#E7E5E0] transition-colors cursor-pointer touch-manipulation"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E5E0] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#7A7873]">
                <span>Nhấn ESC để đóng</span>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onOpenBooking();
                  }}
                  className="text-[#0A0A0C] font-semibold underline underline-offset-2 cursor-pointer"
                >
                  Tư vấn trực tiếp cùng Kỹ sư trưởng →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Atelier Updates Modal */}
      <AnimatePresence>
        {updatesOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Nhật Ký Xưởng Chế Tác"
            onClick={(e) => {
              if (e.target === e.currentTarget) setUpdatesOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#FAF9F6] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/60 text-[#0A0A0C] my-auto max-h-[calc(100dvh-2rem)] flex flex-col cursor-default"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E5E0] flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0C] text-white flex items-center justify-center flex-shrink-0">
                    <Bell size={15} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#0A0A0C]">
                      Nhật Ký Xưởng Chế Tác
                    </h4>
                    <span className="text-[11px] text-[#7A7873] hidden sm:block">
                      Cập nhật tiến độ kỹ thuật & bàn giao siêu xe độc bản
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setUpdatesOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EAE8E2] text-[#7A7873] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-3 sm:py-4 space-y-3 sm:space-y-4 overflow-y-auto overscroll-contain pr-1">
                {recentUpdates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#E7E5E0] shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF424D] bg-[#FF424D]/10 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#7A7873]">{item.date}</span>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#0A0A0C] mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#505050] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 border-t border-[#E7E5E0] flex items-center justify-between flex-shrink-0">
                <span className="text-[11px] text-[#7A7873] truncate max-w-[180px] sm:max-w-none">
                  Cập nhật liên tục 24/7 từ Saigon & Hanoi
                </span>
                <button
                  onClick={() => {
                    setUpdatesOpen(false);
                    onOpenBooking();
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-full bg-[#0A0A0C] text-white text-xs font-semibold hover:bg-[#202024] transition-all cursor-pointer min-h-[38px]"
                >
                  Đặt lịch VIP →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
