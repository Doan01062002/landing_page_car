import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Car, User, Phone, CheckCircle2, Shield, Sparkles } from 'lucide-react';

const BRANDS = ['Porsche', 'Ferrari', 'Lamborghini', 'Mercedes-AMG', 'Khác'];

const PACKAGES = [
  { id: 'STAGE I', label: 'Stage I • Hiệu Năng', desc: 'ECU, Pô thể thao, Dyno' },
  { id: 'STAGE II', label: 'Stage II • Carbon Kit', desc: 'Dry Carbon, Mâm CNC, Phuộc' },
  { id: 'STAGE III', label: 'Stage III • Độc Bản', desc: 'Bespoke 1-of-1 toàn diện' },
];

export default function VIPBookingModal({ isOpen, onClose, initialTier = 'STAGE II' }) {
  const [selectedBrand, setSelectedBrand] = useState('Porsche');
  const [modelName, setModelName] = useState('');
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setSelectedTier(initialTier);
    }
  }, [initialTier]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientPhone.trim()) return;
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vip-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain"
    >
      {/* Translucent cinematic dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-[4px] pointer-events-auto"
      />

      {/* Luxury Editorial Porcelain / Alabaster Light Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#FCFCFA] text-[#0A0A0C] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-[#E5E5DE] my-auto z-10 max-h-[calc(100dvh-1.5rem)] flex flex-col"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#F0EFEA] hover:bg-[#E4E3DC] border border-[#E0DFD8] flex items-center justify-center transition-colors text-[#555A64] hover:text-[#0A0A0C] cursor-pointer z-20"
        >
          <X size={16} />
        </button>

        {/* Scrollable Container Inside Card */}
        <div className="overflow-y-auto overscroll-contain pr-1 -mr-1">
          {!isSuccess ? (
            <div>
              {/* Header: Short, Direct & Premium */}
              <div className="mb-3 sm:mb-4 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0EFEA] border border-[#E0DFD8] text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#555A64] mb-1 sm:mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5383B]" />
                  <span>APEX BESPOKE VIP</span>
                </div>
                <h3 id="vip-modal-title" className="font-display font-[350] text-lg sm:text-2xl text-[#0A0A0C] tracking-tight">
                  Đặt lịch Khảo sát 1–1
                </h3>
                <p className="text-[11px] sm:text-xs text-[#6B7280] mt-0.5">
                  Kỹ sư trưởng Markus Vance sẽ liên hệ bảo mật trong 15 phút.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5">
                {/* 1. Hãng Xe & Tên Xe */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                    <Car size={12} className="text-[#E5383B]" /> Dòng xe của bạn
                  </label>

                  {/* Quick Brand Pills */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-1.5">
                    {BRANDS.map((brand) => {
                      const isSelected = selectedBrand === brand;
                      return (
                        <button
                          type="button"
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A0A0C] text-white border-[#0A0A0C] font-semibold shadow-xs'
                              : 'bg-[#F0EFEA] text-[#4A4D55] border-[#E0DFD8] hover:text-[#0A0A0C] hover:bg-[#E8E7E0]'
                          }`}
                        >
                          {brand}
                        </button>
                      );
                    })}
                  </div>

                  {/* Model Input */}
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder={`Model xe (VD: ${
                      selectedBrand === 'Porsche'
                        ? '911 GT3 RS, 911 Turbo S'
                        : selectedBrand === 'Ferrari'
                        ? 'F8 Tributo, 296 GTB'
                        : selectedBrand === 'Lamborghini'
                        ? 'Huracán STO, Urus'
                        : 'G63 AMG, M4 CSL...'
                    })`}
                    className="w-full px-3 py-1.5 sm:py-2 rounded-xl bg-[#F4F4F0] border border-[#DFDFD6] text-xs sm:text-sm text-[#0A0A0C] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#0A0A0C] focus:bg-white transition-colors"
                  />
                </div>

                {/* 2. Gói Nâng Cấp Quan Tâm */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#E5383B]" /> Hạng mục quan tâm
                  </label>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {PACKAGES.map((pkg) => {
                      const isSelected = selectedTier === pkg.id;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => setSelectedTier(pkg.id)}
                          className={`p-2 sm:p-2.5 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#0A0A0C] ring-1 ring-[#0A0A0C] shadow-xs'
                              : 'bg-[#F4F4F0] border-[#DFDFD6] hover:border-[#C8C8BE]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-0.5">
                            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-[#0A0A0C] truncate">
                              {pkg.id}
                            </span>
                            {isSelected && <Check size={11} className="text-[#E5383B] flex-shrink-0" strokeWidth={3} />}
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-[#0A0A0C] block truncate">
                            {pkg.label.split(' • ')[1]}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-[#6B7280] hidden sm:block truncate mt-0.5">
                            {pkg.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Thông Tin Liên Hệ */}
                <div>
                  <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6B7280] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                    <User size={12} className="text-[#E5383B]" /> Thông tin liên hệ
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Họ và tên / Đại diện"
                        className="w-full px-3 py-1.5 sm:py-2 pl-8 sm:pl-9 rounded-xl bg-[#F4F4F0] border border-[#DFDFD6] text-xs sm:text-sm text-[#0A0A0C] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#0A0A0C] focus:bg-white transition-colors"
                      />
                      <User size={13} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Số điện thoại / Zalo *"
                        className="w-full px-3 py-1.5 sm:py-2 pl-8 sm:pl-9 rounded-xl bg-[#F4F4F0] border border-[#DFDFD6] text-xs sm:text-sm text-[#0A0A0C] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#0A0A0C] focus:bg-white transition-colors"
                      />
                      <Phone size={13} className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3.5 rounded-full bg-[#E5383B] hover:bg-[#c92f32] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md shadow-[#E5383B]/25 hover:shadow-lg hover:shadow-[#E5383B]/35 min-h-[42px]"
                  >
                    Xác nhận Đặt lịch Khảo sát
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] text-[#71717A] mt-1.5 sm:mt-2 font-mono">
                    <Shield size={11} className="text-[#71717A] flex-shrink-0" />
                    <span className="truncate">Bảo mật danh tính 100% theo tiêu chuẩn VIP NDA</span>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            /* Sleek Minimalist Light Success Confirmation */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={26} />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-emerald-600 block mb-1">
                TIẾP NHẬN THÀNH CÔNG
              </span>
              <h3 className="font-display font-[350] text-xl sm:text-2xl text-[#0A0A0C] mb-1.5">
                Hồ sơ đã được gửi tới Kỹ sư trưởng
              </h3>
              <p className="text-xs text-[#6B7280] max-w-xs mx-auto mb-5 leading-relaxed">
                Cảm ơn <strong className="text-[#0A0A0C]">{clientName || 'Quý khách'}</strong>. Chúng tôi sẽ liên hệ bảo mật qua số <strong className="text-[#0A0A0C]">{clientPhone}</strong> trong vòng 15 phút.
              </p>

              <div className="bg-[#F4F4F0] p-3.5 rounded-xl border border-[#DFDFD6] max-w-xs mx-auto text-left text-xs space-y-1.5 mb-5 font-mono text-[#4A4D55]">
                <div className="flex justify-between">
                  <span className="text-[#8C909A]">DÒNG XE:</span>
                  <span className="font-bold text-[#0A0A0C] truncate max-w-[160px]">{selectedBrand} {modelName || 'Chưa điền'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C909A]">GÓI QUAN TÂM:</span>
                  <span className="font-bold text-[#E5383B]">{selectedTier}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#0A0A0C] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer min-h-[44px]"
              >
                Đóng cửa sổ
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
