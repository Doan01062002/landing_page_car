# 🏎️ APEX ONE-OF-ONE STUDIO — LUXURY CAR BESPOKE ATELIER
## BẢN KẾ HOẠCH & ĐẶC TẢ THIẾT KẾ TOÀN DIỆN (PATREON-INSPIRED LANDING PAGE)

---

### 1. TỔNG QUAN DỰ ÁN & ĐỊNH VỊ THƯƠNG HIỆU
* **Tên thương hiệu:** **APEX One-of-One Studio**
* **Lĩnh vực hoạt động:** Xưởng độ, chế tác cơ khí chính xác và cá nhân hóa siêu xe / xe sang độc bản (Bespoke Automotive Atelier & High-Performance Engineering).
* **Cảm hứng thiết kế:** Thừa hưởng 100% tinh hoa bố cục, thẩm mỹ tạp chí cao cấp (Editorial Minimalism) và chuyển động mượt mà của **[Patreon.com](https://www.patreon.com/)**:
  - Tiêu đề Typography quy mô lớn (Giant Display Type `H1: 17-25rem`) với nét chữ siêu mảnh (`font-weight: 250`).
  - Nền chuyển sắc ấm cúng Canvas Warm White (`#F7F6F2` / `#FAF9F6`) tôn vinh vẻ đẹp cơ khí và chất liệu Carbon/Sơn bóng của siêu xe.
  - Hiệu ứng quang học đảo màu **`mix-blend-mode: exclusion`** khi chữ lướt đè qua video/hình ảnh.
  - Cuộn trang bằng quán tính mượt mà **Lenis Smooth Scroll** kết hợp chuyển động **Framer Motion & GSAP**.
  - Hiệu ứng lộn nhào chữ (Text Vertical Flip Ticker) trên các nút bấm khi rê chuột.

---

### 2. BẢNG MÀU & THIẾT KẾ ĐẶC TẢ (DESIGN TOKENS)
* **Canvas Background:** `#F7F6F2` (Warm Sand / Pearl Canvas) kết hợp `linear-gradient(150deg, #FCFCFD 15%, #F7F3F5 80%)`.
* **Deep Contrast Primary:** `#0A0A0C` (Onyx Black - Dành cho văn bản chính, nút Dark CTA, card tương phản).
* **Pure Surface:** `#FFFFFF` (Card nổi, menu điều hướng, popup khảo sát).
* **Neutral Palette (Grayscale):**
  - Muted Text: `#696969` / `#505050`
  - Subtle Borders: `#E6E6E6` / `#E7E5E0` (Đường viền thanh mảnh 1px)
* **Accent Colors:**
  - Racing Amber / Coral: `#FF424D` (Điểm nhấn cùm phanh, chi tiết chế tác)
  - Hyper Electric Blue: `#0E87EB` (Hiệu ứng hover link và trạng thái active)
* **Hydra Mesh Gradients (Aurora Effect):**
  - Tổ hợp chuyển sắc mềm: `#71A0FF`, `#94BBFF`, `#B4D7FF`, `#D4F3FF` làm nền cho các khối linh kiện bay (Floating components).

---

### 3. KIẾN TRÚC BỐ CỤC SECTION-BY-SECTION (CHUYỂN HÓA TỪ PATREON)

#### 🔹 1. Header & Navigation (Thanh điều hướng nổi)
* **Trạng thái:** `fixed top-0` với `backdrop-blur(12px) bg-[#F7F6F2]/80`.
* **Bên trái:** Menu điều hướng với **Sliding Indicator Pill** trượt êm theo tab active:
  - *Commissions (Dự án độ)*
  - *Engineering (Cơ khí & Hiệu năng)*
  - *Atelier (Xưởng chế tác)*
  - *Philosophy (Triết lý)*
* **Ở giữa:** Biểu tượng & Wordmark **APEX One-of-One**.
* **Bên phải:**
  - Ô tìm kiếm mở rộng (Find Project / Model).
  - Nút "Hotline 24/7" dạng text link.
  - Nút **"Book VIP Inspection"** bo tròn viên thuốc (`rounded-full`) kèm hiệu ứng text flip rollover.

#### 🔹 2. Hero Section (Cinematic Supercar Switcher)
* **Trải nghiệm:** Tương tự Hero đa Creator của Patreon, phần này trình diễn 3 kiệt tác độ xe tiêu biểu qua video 4K autoplay loop:
  1. *Porsche 911 (992) GT3 Touring — Lightweight Carbon & Inconel Exhaust (540 HP)*
  2. *Ferrari F8 Tributo N-Largo — Twin-Turbo Stage II & Aero Sculpting (818 HP)*
  3. *Mercedes-AMG G63 Bespoke — One-of-One Forged Starlight Interior (850 HP)*
* **Typography:** Tiêu đề lớn hiển thị dạng:
  - `Where engineering`
  - `becomes art.`
* **Tương tác:** Chip bấm chuyển đổi mượt mà giữa các dòng xe, hiển thị thông số mã lực (HP), mô-men xoắn (Nm), thời gian hoàn thiện dự án.

#### 🔹 3. Completed Commissions Ticker (Marquee So Le 3 Tầng)
* **Cấu trúc:** Tương tự creator marquee của Patreon, các thẻ dự án di chuyển ngang vô tận (infinite marquee) với bố cục so le:
  - Thẻ 1: Lệch lên `-50px`
  - Thẻ 2: Lệch xuống `+50px`
  - Thẻ 3: Lệch nhẹ `-30px`
* **Nội dung thẻ:** Ảnh chụp 4K xe sau khi độ, tên dự án (VD: *Project Titan — McLaren 720S Spider*), icon mũi tên trượt khi hover.

#### 🔹 4. Fullscreen Editorial Manifesto (Tuyên Ngôn Kỹ Sư Trưởng)
* **Visual:** Ảnh chụp khổ lớn toàn màn hình chân dung Kỹ sư trưởng trong phòng thí nghiệm cơ khí với hiệu ứng Parallax nhẹ.
* **Typography:** Áp dụng `mix-blend-mode: exclusion`:
  > *"Chúng tôi không đơn thuần nâng cấp một cỗ máy. Chúng tôi giải phóng linh hồn cơ khí và điêu khắc từng rung động thành tác phẩm độc bản trường tồn."*
  > — **Markus Vance**, Chief Master Engineer at APEX.

#### 🔹 5. Signature Interactive Studio: Before & After Slider
* **Tính năng:** Trình so sánh Trước/Sau (Before & After Slider) mượt mà kéo thả bằng chuột/cảm ứng:
  - **Bên trái (Before):** Xe nguyên bản xuất xưởng (Stock OEM).
  - **Bên phải (After):** Bản độ Full Dry-Carbon, mâm Forged nguyên khối, hạ gầm phuộc thể thao và bodykit khí động học.
* **Component Cards:** Các linh kiện nổi bật (Mâm đa chấu, Ống xả Inconel titan, Cánh gió carbon) bay lơ lửng xung quanh canvas nền Hydra Aurora.

#### 🔹 6. Engineering Deep-Dive (Z-Pattern Split Layout)
* **Bố cục:** Hai cột bất đối xứng kiểu Patreon:
  - Cột trái: Khung video giả lập cận cảnh quá trình tiện CNC chi tiết nhôm máy bay và phòng sơn nhiệt công nghệ sấy hồng ngoại.
  - Cột phải: Thông điệp triết lý: *"Direct Engineer Collaboration — Không có trung gian tư vấn sale. Khách hàng làm việc trực tiếp 1-1 cùng Kỹ sư trưởng phụ trách dự án."*

#### 🔹 7. Bespoke Programs & Tiers (3 Cấp Độ Dịch Vụ)
Tương ứng với các gói dịch vụ cao cấp:
1. **Tier 1: Performance & Dyno Optimization** (ECU Remap, Exhaust, Brake & Suspension Tuning)
2. **Tier 2: Aerodynamics & Carbon Sculpting** (Full Bodykit Pre-preg Dry Carbon, Forged Wheels, Paint Protection Film)
3. **Tier 3: One-of-One Atelier Commission** (Tái thiết kế toàn diện theo đơn đặt hàng độc bản, bọc da Alcantara/Hermes nội thất, chứng chỉ lưu kho độc quyền)

#### 🔹 8. High-Conversion CTA & VIP Booking Modal
* **Giao diện:** Thẻ Card màu trắng ngọc trai bo góc tròn mềm mại (`rounded-[40px]`) đặt nổi bật trên nền video xưởng sẫm màu.
* **Nội dung:**
  - Biểu tượng animated monogram APEX.
  - Tiêu đề: *"Ready to transcend your driving experience?"*
  - Nút bấm chính mở **VIP Consultation Modal** (cho phép chọn dòng xe, nhu cầu độ, ngày hẹn thẩm định kín).
  - Hotline trực tiếp & liên kết Zalo/WhatsApp riêng tư.

#### 🔹 9. Modular Atelier Footer
* **Cột liên kết:** Commissions, Engineering Specs, Workshop Facilities, Press & Journal, Legal & Privacy.
* **Tiện ích:** Bộ chuyển đổi đơn vị đo lường (HP/kW, Nm/lb-ft), chuyển ngôn ngữ (EN/VI).
* **Địa chỉ xưởng:** Showroom & Xưởng kỹ thuật cao cấp tại TP. Hồ Chí Minh & Hà Nội.

---

### 4. BỘ CÔNG NGHỆ (TECH STACK)
* **Frontend Framework:** React 19 + Vite (Khởi động tức thì, HMR siêu tốc, tối ưu hóa bundle).
* **Styling:** Tailwind CSS v4 + CSS Custom Properties (Tokens chuẩn trích xuất từ Patreon).
* **Motion & Animation Engine:**
  - **GSAP & ScrollTrigger** cho hiệu ứng cuộn Parallax, Pinning, Text rollover.
  - **Framer Motion** cho tương tác Before/After Slider, Modal, Tab switching.
  - **Lenis Scroll** (`lenis`) cho trải nghiệm lướt web quán tính 60fps mượt mà không khựng.
* **Iconography:** Lucide-React & Custom Automotive SVG Vectors.
* **Media Assets:** Tuyển chọn video 4K/60fps (Pexels / Unsplash Supercar CDN trực tiếp, không làm nặng source code cục bộ).

---

### 5. LỘ TRÌNH THỰC HIỆN DỰ KIẾN (EXECUTION ROADMAP)
1. **Giai đoạn 1: Khởi tạo kiến trúc dự án**
   - Cài đặt Vite React, Tailwind CSS, GSAP, Framer Motion, Lenis, Lucide.
   - Cấu hình file `index.html` với font `Plus Jakarta Sans` / `Oracle style`, CSS custom tokens.
2. **Giai đoạn 2: Xây dựng Media Assets Hub & Data Module**
   - Tập hợp danh sách video 4K, ảnh 4K siêu xe, thông số kỹ thuật (HP, Nm, dyno).
3. **Giai đoạn 3: Phát triển từng Component theo phong cách Patreon**
   - Navbar với sliding indicator & text flip button.
   - Hero video carousel với đa dòng xe.
   - Staggered Commissions Marquee.
   - Fullscreen Exclusion Manifesto.
   - Interactive Before/After Comparison Slider.
   - Engineering Z-Split & Bespoke Programs.
   - VIP Consultation Modal & Footer.
4. **Giai đoạn 4: Hoàn thiện Micro-interactions & Kiểm thử toàn diện**
   - Tinh chỉnh Lenis inertia scroll, GSAP trigger, kiểm tra hiển thị responsive từ iPhone đến màn hình 4K desktop.
