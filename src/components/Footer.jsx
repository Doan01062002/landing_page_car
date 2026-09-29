import React, { useState } from 'react';
import { atelierLocations } from '../data/supercars';
import { MapPin, Phone, Globe, DollarSign } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const currencies = ['VND (₫)', 'USD ($)', 'EUR (€)'];
  const languages = ['Tiếng Việt (VI)', 'English (EN)'];
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);

  const toggleCurrency = () => setCurrencyIndex((prev) => (prev + 1) % currencies.length);
  const toggleLanguage = () => setLanguageIndex((prev) => (prev + 1) % languages.length);

  return (
    <footer id="atelier" className="bg-[#0A0A0C] text-white pt-16 sm:pt-20 pb-10 sm:pb-12 border-t border-white/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WORKSHOP LOCATIONS SHOWCASE (SAIGON & HANOI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-12 sm:pb-16 border-b border-white/15">
          {atelierLocations.map((loc, idx) => (
            <div
              key={idx}
              className="bg-white/5 hover:bg-white/8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#FF424D] flex items-center gap-1.5">
                  <MapPin size={13} className="flex-shrink-0" /> {loc.city}
                </span>
                <span className="text-[11px] sm:text-xs text-white/50">{loc.hours.split('(')[0]}</span>
              </div>

              <h4 className="font-display font-bold text-lg sm:text-2xl text-white mb-1.5 sm:mb-2">
                {loc.name}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4 leading-relaxed">
                {loc.address}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-white/60">
                <span className="truncate max-w-full sm:max-w-xs">{loc.specs}</span>
                <a
                  href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                  className="font-bold text-white hover:text-[#FF424D] transition-colors flex items-center gap-1 py-1 min-h-[36px] touch-manipulation"
                >
                  <Phone size={12} className="text-[#FF424D] flex-shrink-0" />
                  <span>{loc.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 5-COLUMN MODULAR NAVIGATION */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 py-12 sm:py-16 border-b border-white/10 text-xs">
          {/* Col 1 */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Dự Án Độc Bản
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-white/60">
              <li><a href="#commissions" className="hover:text-white transition-colors py-1 inline-block">Porsche Restomod</a></li>
              <li><a href="#commissions" className="hover:text-white transition-colors py-1 inline-block">Ferrari N-Largo</a></li>
              <li><a href="#commissions" className="hover:text-white transition-colors py-1 inline-block">McLaren Carbon</a></li>
              <li><a href="#commissions" className="hover:text-white transition-colors py-1 inline-block">Mercedes G63 AMG</a></li>
              <li><a href="#commissions" className="hover:text-white transition-colors py-1 inline-block">Đo Dyno Thực Tế</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Kỹ Thuật Xưởng
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-white/60">
              <li><a href="#engineering" className="hover:text-white transition-colors py-1 inline-block">Đo Dyno 4WD</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors py-1 inline-block">Gia Công CNC 5 Trục</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors py-1 inline-block">Buồng Carbon Autoclave</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors py-1 inline-block">Cổ Xả Inconel F1</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors py-1 inline-block">Cân Bằng Corner Weight</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Gói Chế Tác
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-white/60">
              <li><a href="#programs" className="hover:text-white transition-colors py-1 inline-block">Stage I: Hiệu Năng</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors py-1 inline-block">Stage II: Khí Động Học</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors py-1 inline-block">Stage III: Độc Bản</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors py-1 inline-block">Dán Phim PPF TPU</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors py-1 inline-block">Phanh Gốm Carbon</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Cơ Sở Vật Chất
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-white/60">
              <li><a href="#atelier" className="hover:text-white transition-colors py-1 inline-block">Xưởng Saigon (Q.7)</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors py-1 inline-block">Xưởng Hà Nội (Tây Hồ)</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors py-1 inline-block">VIP Lounge Tiếp Đón</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors py-1 inline-block">Cứu Hộ Sàn Phẳng 24/7</a></li>
              <li><a href="#atelier" className="hover:text-white transition-colors py-1 inline-block">Cổng Theo Dõi 4K</a></li>
            </ul>
          </div>

          {/* Col 5 */}
          <div className="col-span-2 sm:col-span-1">
            <h5 className="font-bold text-white uppercase tracking-wider mb-3 sm:mb-4">
              Bảo Mật & Pháp Lý
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors py-1 inline-block">Markus Vance</a></li>
              <li><a href="#" className="hover:text-white transition-colors py-1 inline-block">Tiêu Chuẩn TÜV</a></li>
              <li><a href="#" className="hover:text-white transition-colors py-1 inline-block">Bảo Hành Cơ Khí</a></li>
              <li><a href="#" className="hover:text-white transition-colors py-1 inline-block">Bảo Mật Danh Tính</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-[#FF424D] font-bold hover:underline cursor-pointer py-1 inline-block min-h-[36px] touch-manipulation text-left"
                >
                  Đặt lịch thẩm định →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM UTILITY BAR (CURRENCY, LANGUAGE, COPYRIGHT) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-white/50">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Currency Selector */}
            <button
              type="button"
              onClick={toggleCurrency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer min-h-[38px] touch-manipulation"
            >
              <DollarSign size={13} className="text-[#FF424D]" />
              <span>{currencies[currencyIndex]}</span>
            </button>

            {/* Language Selector */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer min-h-[38px] touch-manipulation"
            >
              <Globe size={13} className="text-blue-400" />
              <span>{languages[languageIndex]}</span>
            </button>
          </div>

          <div className="text-center sm:text-right">
            <span>© {new Date().getFullYear()} APEX One-of-One Studio. Bảo lưu mọi quyền.</span>
            <span className="block sm:inline sm:ml-2 text-white/30">Kiến tạo phong cách thượng lưu độc bản.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
