import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Menu, X, ArrowUpRight, Sparkles, Bell, ArrowRight, Gauge } from 'lucide-react';
import { heroSupercars, commissionsList } from '../data/supercars';

export default function Navbar({ onOpenBooking, onModalStateChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const searchModalRef = useRef(null);
  const updatesModalRef = useRef(null);

  // Dynamic search results across master supercar catalogue
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    
    const heroes = heroSupercars.map((car) => ({
      id: car.id,
      title: car.modelName,
      subtitle: car.discipline,
      specs: `${car.hp} • ${car.zeroHundred}`,
      tag: 'SIÊU XE ATELIER',
      image: car.posterUrl,
      brand: car.modelName.split(' ')[0],
    }));

    const commissions = commissionsList.map((comm) => ({
      id: comm.id,
      title: comm.projectName,
      subtitle: comm.carModel,
      specs: comm.specs,
      tag: comm.stage,
      image: comm.image,
      brand: comm.carModel.split(' ')[0],
    }));

    return [...heroes, ...commissions].filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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

  // Prevent background scroll and notify parent to pause Lenis when mobile menu or modal is open
  useEffect(() => {
    const isAnyOpen = mobileMenuOpen || searchOpen || updatesOpen;
    onModalStateChange?.(isAnyOpen);
    if (isAnyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchOpen, updatesOpen, onModalStateChange]);

  // Keyboard accessibility: Close active modals or drawer on Escape, strictly trap focus inside modals
  useEffect(() => {
    // Auto-focus first interactive element for updates modal
    let focusTimer = null;
    if (updatesOpen && updatesModalRef.current) {
      focusTimer = setTimeout(() => {
        const firstBtn = updatesModalRef.current?.querySelector('button');
        firstBtn?.focus();
      }, 50);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setUpdatesOpen(false);
        setMobileMenuOpen(false);
      } else if (e.key === 'Tab') {
        const activeModalRef = searchOpen ? searchModalRef : updatesOpen ? updatesModalRef : null;
        if (activeModalRef?.current) {
          const focusables = Array.from(
            activeModalRef.current.querySelectorAll(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          );
          if (focusables.length > 0) {
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (!activeModalRef.current.contains(document.activeElement)) {
              e.preventDefault();
              first.focus();
            } else if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (focusTimer) clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen, updatesOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleSelectSearchResult = (item) => {
    setSearchOpen(false);
    const normalizedBrand = ['Porsche', 'Ferrari', 'Lamborghini'].includes(item.brand)
      ? item.brand
      : item.brand?.includes('Mercedes') || item.brand?.includes('AMG') || item.brand?.includes('G63')
      ? 'Mercedes-AMG'
      : 'Khác';

    onOpenBooking?.({
      brand: normalizedBrand,
      model: item.title,
      tier: item.tag?.includes('Stage III') || item.tag?.includes('Bespoke') ? 'STAGE III' : 'STAGE II',
    });
  };

  return (
    <>
      {/* FLOATING RESPONSIVE NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'py-2.5 sm:py-3 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
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

      {/* Mobile Drawer Menu (Touch-optimized, safe scrollable container anchored cleanly below header) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            data-lenis-prevent
            className="fixed inset-x-0 top-[65px] sm:top-[73px] z-40 bg-[#0A0A0C]/98 backdrop-blur-2xl border-b border-white/10 p-5 sm:p-6 shadow-2xl lg:hidden text-white max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain"
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
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === e.currentTarget) setSearchOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
          >
            <motion.div
              ref={searchModalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              data-lenis-prevent
              className="w-full max-w-lg bg-[#FAF9F6] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 text-[#0A0A0C] my-auto cursor-default flex flex-col max-h-[calc(100dvh-5rem)]"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7E5E0] flex-shrink-0">
                <div className="flex items-center gap-2.5 w-full">
                  <Search size={17} className="text-[#7A7873] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm: Porsche GT3, Ferrari F8, G63..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchResults.length > 0) {
                          handleSelectSearchResult(searchResults[0]);
                        }
                      }
                    }}
                    autoFocus
                    className="w-full text-sm font-medium focus:outline-none placeholder:text-[#A09E96] bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-xs text-[#7A7873] hover:text-[#0A0A0C] cursor-pointer"
                      title="Xóa tìm kiếm"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EAE8E2] text-[#7A7873] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center flex-shrink-0 ml-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* SEARCH RESULTS OR POPULAR TAGS */}
              {searchQuery.trim() ? (
                <div className="py-3 overflow-y-auto overscroll-contain flex-1" data-lenis-prevent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A09E96]">
                      Kết quả tìm kiếm ({searchResults.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#FF424D] hover:underline cursor-pointer"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="space-y-2 pr-1">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSearchResult(item)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-[#F0EEEA] border border-[#E7E5E0] transition-colors cursor-pointer group text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#0A0A0C]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF424D] bg-[#FF424D]/10 px-1.5 py-0.5 rounded">
                                {item.tag}
                              </span>
                              <span className="text-[10px] text-[#7A7873] truncate">{item.subtitle}</span>
                            </div>
                            <h5 className="font-bold text-xs sm:text-sm text-[#0A0A0C] truncate group-hover:text-[#FF424D] transition-colors">
                              {item.title}
                            </h5>
                            <span className="text-[10px] sm:text-[11px] text-[#505050] font-mono block truncate">
                              {item.specs}
                            </span>
                          </div>
                          <div className="flex-shrink-0 text-[#7A7873] group-hover:text-[#FF424D] transition-colors">
                            <ArrowRight size={15} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-[#7A7873]">
                      <p className="text-xs mb-1.5">
                        Không tìm thấy dòng xe phù hợp với <strong className="text-[#0A0A0C]">"{searchQuery}"</strong>.
                      </p>
                      <p className="text-[11px] text-[#A09E96] max-w-xs mx-auto">
                        APEX Studio nhận chế tác độc bản mọi dòng siêu xe theo yêu cầu riêng của chủ xe.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4 flex-shrink-0">
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
              )}

              <div className="pt-3 border-t border-[#E7E5E0] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#7A7873] flex-shrink-0">
                <span>Nhấn ESC để đóng</span>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onOpenBooking?.({ tier: 'STAGE II' });
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
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === e.currentTarget) setUpdatesOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto cursor-pointer"
          >
            <motion.div
              ref={updatesModalRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              data-lenis-prevent
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
                    onOpenBooking?.({ tier: 'STAGE II' });
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
