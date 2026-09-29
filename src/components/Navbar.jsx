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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* FLOATING COMPLETELY TRANSPARENT PATREON NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? 'py-3.5 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-5 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* DESKTOP: PATREON 3-COLUMN BALANCED GRID (1fr auto 1fr) */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center">
            {/* LEFT COLUMN: Clean White Text Links with Text-Flip + Updates Pill Button */}
            <nav className="flex items-center space-x-6 justify-self-start">
              <ul className="flex items-center space-x-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-flip-btn text-white/90 hover:text-white text-xs lg:text-[13px] font-medium tracking-tight py-1 group"
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
                className="border border-white/50 hover:border-white rounded-full px-3.5 py-1.5 text-xs text-white font-medium transition-colors backdrop-blur-xs cursor-pointer flex items-center gap-1.5 group text-flip-btn"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF424D] animate-ping" />
                <span className="label-wrapper" data-label="Cập nhật">
                  <span className="label-placeholder">Cập nhật</span>
                </span>
              </button>
            </nav>

            {/* CENTER COLUMN: Perfectly Centered Bold Geometric Sans Wordmark */}
            <div className="justify-self-center">
              <a
                href="#"
                className="font-display font-black text-2xl tracking-[-0.045em] text-white uppercase select-none hover:opacity-90 transition-opacity"
              >
                APEX STUDIO
              </a>
            </div>

            {/* RIGHT COLUMN: Search Pill, Hotline Pill, & Solid White Pill Button */}
            <div className="flex items-center space-x-3 justify-self-end">
              {/* Pill border button with search icon: "Tìm dòng xe" */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="border border-white/50 hover:border-white rounded-full px-4 py-2 text-xs text-white font-medium flex items-center gap-2 backdrop-blur-xs transition-colors cursor-pointer"
                title="Tìm kiếm dự án hoặc dòng xe"
              >
                <Search size={14} />
                <span>Tìm dòng xe</span>
              </button>

              {/* Pill border button: "Hotline" */}
              <a
                href="tel:0908888911"
                className="border border-white/50 hover:border-white rounded-full px-4 py-2 text-xs text-white font-medium flex items-center gap-2 backdrop-blur-xs transition-colors"
                title="Hotline tư vấn VIP 24/7"
              >
                <Phone size={13} className="text-[#FF424D]" />
                <span>Hotline 24/7</span>
              </a>

              {/* Solid White Pill Button with Black Text: "Đặt lịch VIP" with Text Flip */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-flip-btn bg-white hover:bg-white/90 text-black font-semibold rounded-full px-5 py-2.5 text-xs sm:text-sm tracking-tight transition-all duration-200 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
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
              className="font-display font-black text-xl tracking-[-0.04em] text-white uppercase select-none"
            >
              APEX STUDIO
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold shadow-sm"
              >
                Đặt lịch VIP
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center backdrop-blur-xs"
                aria-label="Mở menu điều hướng"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[76px] z-40 bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl lg:hidden text-white"
          >
            <div className="flex flex-col space-y-3 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-white/90 hover:text-white py-2 border-b border-white/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={16} className="text-white/50" />
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setUpdatesOpen(true);
                }}
                className="text-base font-semibold text-white/90 hover:text-white py-2 border-b border-white/10 flex items-center justify-between text-left"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF424D]" />
                  <span>Bản tin Xưởng Chế tác</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">Mới</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/30 text-sm font-semibold text-white bg-white/5"
              >
                <Search size={15} />
                <span>Tìm Kiếm Dòng Xe</span>
              </button>
              <a
                href="tel:0908888911"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/30 text-sm font-semibold text-white bg-white/5"
              >
                <Phone size={15} className="text-[#FF424D]" />
                <span>Hotline VIP: 0908 888 911</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 bg-white text-black rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
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
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#FAF9F6] rounded-3xl p-6 shadow-2xl border border-white/60 text-[#0A0A0C]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E0]">
                <div className="flex items-center gap-3 w-full">
                  <Search size={18} className="text-[#7A7873]" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm: Porsche GT3, Ferrari F8, G63, Stage III..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-sm font-medium focus:outline-none placeholder:text-[#A09E96] bg-transparent"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EAE8E2] text-[#7A7873] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A09E96] block mb-2">
                  Dự án phổ biến được tìm kiếm
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Porsche 911 GT3', 'Ferrari F8 N-Largo', 'G63 Forged Carbon', 'Inconel Exhaust', 'Brembo Carbon Ceramic'].map(
                    (tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(tag);
                        }}
                        className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-[#EAE8E2] text-[#0A0A0C] font-medium border border-[#E7E5E0] transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E5E0] flex justify-between items-center text-xs text-[#7A7873]">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 text-[#0A0A0C]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0C] text-white flex items-center justify-center">
                    <Bell size={15} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[#0A0A0C]">
                      Nhật Ký Xưởng Chế Tác
                    </h4>
                    <span className="text-[11px] text-[#7A7873]">
                      Cập nhật tiến độ kỹ thuật & bàn giao siêu xe độc bản
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setUpdatesOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#EAE8E2] text-[#7A7873] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {recentUpdates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#E7E5E0] shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF424D] bg-[#FF424D]/10 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                      <span className="text-[11px] text-[#7A7873]">{item.date}</span>
                    </div>
                    <h5 className="font-bold text-sm text-[#0A0A0C] mb-1">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#505050] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E7E5E0] flex items-center justify-between">
                <span className="text-xs text-[#7A7873]">
                  Cập nhật liên tục 24/7 từ Saigon & Hanoi
                </span>
                <button
                  onClick={() => {
                    setUpdatesOpen(false);
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-full bg-[#0A0A0C] text-white text-xs font-semibold hover:bg-[#202024] transition-all cursor-pointer"
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
