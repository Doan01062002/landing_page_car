// APEX One-of-One Studio Master Data

export const heroSupercars = [
  {
    id: 'porsche-gt3',
    discipline: 'KHÍ ĐỘNG HỌC & ĐƯỜNG ĐUA',
    tagline: 'Nơi kỹ thuật',
    taglineSub: 'trở thành nghệ thuật.',
    modelName: 'Porsche 911 (992) GT3 Touring',
    subLabel: 'Gói Chế Tác Sợi Carbon Siêu Nhẹ & Hệ Thống Xả Inconel',
    hp: '540 Mã Lực',
    torque: '495 Nm',
    zeroHundred: '3.1 giây',
    topSpeed: '320 km/h',
    weight: '1,385 kg',
    exhaustNote: 'Âm thanh Boxer 6 xi-lanh 9,000 RPM',
    videoUrl: 'https://assets.mixkit.co/videos/52427/52427-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop',
    videoDuration: 7.4,
    creatorName: 'Markus Vance',
    creatorCraft: 'chế tác cổ xả titanium inconel cho Porsche 911 GT3',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    description: 'Tái định nghĩa tỷ lệ công suất/trọng lượng với nắp capo full Dry-Carbon, hệ thống xả Inconel 625 mạ vàng cách nhiệt F1 và phuộc KW V4 Clubsport tùy biến riêng.',
    commissionTime: '8 tuần chế tác',
    colorCode: '#E53E3E',
  },
  {
    id: 'ferrari-f8',
    discipline: 'HIỆU NĂNG TỐI THƯỢNG',
    tagline: 'Thanh âm cơ khí',
    taglineSub: 'đầy mê hoặc.',
    modelName: 'Ferrari F8 Tributo N-Largo',
    subLabel: 'Nâng Cấp Tăng Áp Kép Stage II & Thân Rộng Carbon',
    hp: '818 Mã Lực',
    torque: '898 Nm',
    zeroHundred: '2.6 giây',
    topSpeed: '345 km/h',
    weight: '1,320 kg',
    exhaustNote: 'Giao hưởng V8 Twin-Turbo Titanium',
    videoUrl: 'https://assets.mixkit.co/videos/65/65-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop',
    videoDuration: 8.3,
    creatorName: 'Enzo Marchetti',
    creatorCraft: 'hiệu chuẩn tăng áp kép stage II cho Ferrari F8',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    description: 'Nâng cấp tuabin kép phôi rèn Billet, remap ECU đường đua kép kết hợp bộ kit khí động học thân rộng tăng 38% lực nén mặt đường ở dải tốc độ cao.',
    commissionTime: '12 tuần chế tác',
    colorCode: '#D69E2E',
  },
  {
    id: 'g63-amg',
    discipline: 'THỦ CÔNG ĐỘC BẢN',
    tagline: 'Độc bản thủ công',
    taglineSub: 'đỉnh cao quyền lực.',
    modelName: 'Mercedes-AMG G63 Bespoke',
    subLabel: 'Vỏ Forged Carbon Vân Đá & Trần Sao 850 Mã Lực',
    hp: '850 Mã Lực',
    torque: '1,000 Nm',
    zeroHundred: '3.6 giây',
    topSpeed: '280 km/h',
    weight: '2,450 kg',
    exhaustNote: 'Tiếng gầm uy lực 4.0L Bi-Turbo V8',
    videoUrl: 'https://assets.mixkit.co/videos/35540/35540-720.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=2070&auto=format&fit=crop',
    videoDuration: 13.0,
    creatorName: 'Stefan Richter',
    creatorCraft: 'điêu khắc carbon vân đá cho Mercedes G63 AMG',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    description: 'Khoác lên mình bộ vỏ Forged Carbon vân đá tự nhiên độc bản, trần xe 1,200 sợi quang bầu trời sao Rolls-Royce style, nội thất da Nappa màu Cognac khâu tay hoàn toàn.',
    commissionTime: '10 tuần chế tác',
    colorCode: '#319795',
  }
];

// Staggered Marquee Commissions Data (Patreon style)
export const commissionsList = [
  {
    id: 'comm-1',
    projectName: 'Project Phantom Blade',
    carModel: 'McLaren 720S Spider',
    stage: 'Stage III Atelier',
    specs: '840 HP • 2.5s 0-100',
    ownerCity: 'TP. Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Full Visible Carbon MonoCage',
  },
  {
    id: 'comm-2',
    projectName: 'Project Velocity Nero',
    carModel: 'Lamborghini Huracán STO',
    stage: 'Stage II Performance',
    specs: '680 HP • Akrapovic Titanium',
    ownerCity: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Brembo CCM-R Plus Track Setup',
  },
  {
    id: 'comm-3',
    projectName: 'Project Carrera Heritage',
    carModel: 'Porsche 911 (993) Restomod',
    stage: 'One-of-One Bespoke',
    specs: '420 HP • Air-Cooled Flat-6',
    ownerCity: 'Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Singer Style Handcrafted Interior',
  },
  {
    id: 'comm-4',
    projectName: 'Project Shadowline Apex',
    carModel: 'BMW M4 Competition G82',
    stage: 'Stage II Track Pack',
    specs: '650 HP • KW V4 Coilovers',
    ownerCity: 'TP. Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    highlight: 'BBS FI-R Forged Monoblock',
  },
  {
    id: 'comm-5',
    projectName: 'Project Sovereign Gold',
    carModel: 'Aston Martin Vantage V8',
    stage: 'Aero Sculpting',
    specs: '600 HP • Capristo Valvetronic',
    ownerCity: 'Hà Nội',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
    highlight: '24K Gold Heat Shielding',
  },
  {
    id: 'comm-6',
    projectName: 'Project Nocturne',
    carModel: 'Audi RS6 Avant Quattro',
    stage: 'Stage III Hyper Wagon',
    specs: '800 HP • 1,050 Nm Torque',
    ownerCity: 'Hải Phòng',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Carbon Ceramic Brake Conversion',
  },
  {
    id: 'comm-7',
    projectName: 'Project Silver Arrow',
    carModel: 'Mercedes-AMG GT Black Series',
    stage: 'Track Master Bespoke',
    specs: '760 HP • Active Carbon Wing',
    ownerCity: 'Cần Thơ',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Dyno Verified +85 WHP Gains',
  },
  {
    id: 'comm-8',
    projectName: 'Project Rosso Corsa',
    carModel: 'Ferrari 488 Pista Atelier',
    stage: 'Stage II Light Weight',
    specs: '750 HP • Novitec Inconel Exhaust',
    ownerCity: 'TP. Hồ Chí Minh',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
    highlight: 'Titanium Wheel Studs & Hubs',
  }
];

// Before & After Interactive Data
export const beforeAfterComparison = {
  title: 'QUÁ TRÌNH LỘT XÁC CHI TIẾT',
  heading: 'Từ Tiêu Chuẩn Xuất Xưởng Đến Kiệt Tác Độc Bản',
  subtext: 'Kéo thanh trượt để so sánh trực quan giữa Porsche 911 GT3 nguyên bản xuất xưởng và bản độ Bespoke Track-Pack: cánh gió & canards sợi carbon Pre-preg, mâm rèn CNC Monoblock, hạ gầm khí động học.',
  before: {
    label: 'XE NGUYÊN BẢN (XUẤT XƯỞNG OEM)',
    image: '/images/porsche-gt3-oem.jpg',
    specs: [
      'Công suất: 502 Mã Lực (Tiêu chuẩn xuất xưởng)',
      'Hệ thống xả: Thép tiêu chuẩn OEM nặng nề',
      'Mâm xe: Hợp kim đúc thường 20/21 inch',
      'Thân vỏ: Hỗn hợp kim loại dập khuôn hàng loạt',
      'Hệ thống treo: PASM điện tử nguyên bản'
    ]
  },
  after: {
    label: 'BẢN ĐỘ BESPOKE TRACK-PACK (STAGE III)',
    image: '/images/porsche-gt3-tuned.jpg',
    specs: [
      'Công suất: 540 Mã Lực (+38 HP đo thực tế Dyno)',
      'Hệ thống xả: Inconel 625 F1 Valvetronic (Giảm -14kg)',
      'Mâm xe: Hợp kim Magnesium CNC nguyên khối siêu nhẹ',
      'Thân vỏ: Full Pre-preg Dry Carbon Fiber bóng sâu',
      'Hệ thống treo: KW V4 Clubsport tùy biến riêng biệt'
    ]
  },
  floatingParts: [
    {
      name: 'Hệ Thống Xả Titanium Inconel',
      badge: 'GIẢM -14.2 KG TRỌNG LƯỢNG',
      desc: 'Âm thanh F1 thuần khiết, van xả điều khiển không dây 3 chế độ âm học.',
    },
    {
      name: 'Cánh Gió Sợi Carbon Pre-preg',
      badge: 'TĂNG +120 KG LỰC NÉN',
      desc: 'Gia nhiệt trong buồng hấp Autoclave chịu lực chuẩn công nghệ hàng không.',
    },
    {
      name: 'Mâm Phôi Rèn Tiện CNC Monoblock',
      badge: 'NHÔM MÁY BAY 6061-T6',
      desc: 'Gia công CNC nguyên khối, giảm tối đa quán tính xoay trục bánh xe.',
    }
  ]
};

// 3 Bespoke Program Tiers
export const bespokeTiers = [
  {
    tier: 'STAGE I',
    name: 'Performance & Dyno Calibration',
    lead: 'Tối ưu hóa hiệu năng cơ học và giải phóng công suất ẩn của động cơ.',
    duration: '1 – 2 tuần',
    features: [
      'Dyno test trước và sau khi remap (Đo công suất thực tế tại bánh)',
      'Hiệu chỉnh ECU / TCU bản quyền từ các tuner hàng đầu Đức & Ý',
      'Nâng cấp hệ thống xả thể thao Titanium / Inconel có van pô thông minh',
      'Hệ thống lọc gió sợi carbon tăng lưu lượng nạp khí sạch',
      'Bảo hành phần mềm trọn đời xe & khôi phục map zin bất kỳ lúc nào'
    ],
    recommended: false,
    ctaText: 'Đăng ký Stage I'
  },
  {
    tier: 'STAGE II',
    name: 'Aero Dynamics & Carbon Sculpting',
    lead: 'Nâng tầm diện mạo và hiệu năng khí động học bằng vật liệu siêu nhẹ.',
    duration: '3 – 5 tuần',
    features: [
      'Trang bị bộ bodykit khí động học Pre-preg Dry Carbon cao cấp',
      'Mâm Forged đa chấu tiện CNC theo offset và thông số lốp yêu cầu',
      'Hạ trọng tâm với hệ thống phuộc thể thao KW V3/V4 hoặc Novitec',
      'Nâng cấp cùm phanh Carbon Ceramic & đĩa tản nhiệt hợp kim siêu bền',
      'Dán phim bảo vệ sơn tự phục hồi PPF TPU siêu bóng toàn thân xe'
    ],
    recommended: true,
    ctaText: 'Khám phá Stage II'
  },
  {
    tier: 'STAGE III',
    name: 'One-of-One Atelier Commission',
    lead: 'Dành riêng cho những chủ nhân tìm kiếm sự độc bản tuyệt đối không trùng lặp.',
    duration: '6 – 12 tuần',
    features: [
      'Thiết kế 3D CAD riêng biệt từng chi tiết bodykit theo ý tưởng chủ xe',
      'Nâng cấp động cơ chuyên sâu (Piston rèn, Turbo kép lớn hơn, Intercooler nước)',
      'Nội thất cá nhân hóa: Da Nappa cao cấp, sợi dệt Alcantara, thêu huy hiệu riêng',
      'Sơn đổi màu bespoke đa tầng hiệu ứng lấp lánh (Candy Paint / Liquid Metal)',
      'Cấp Giấy chứng nhận Chế tác Độc bản và sổ nhật ký cơ khí đóng bìa da'
    ],
    recommended: false,
    ctaText: 'Đặt lịch Thẩm định Độc bản'
  }
];

// Workshop Facilities & Locations
export const atelierLocations = [
  {
    city: 'TP. HỒ CHÍ MINH',
    name: 'APEX South Atelier & Dyno Lab',
    address: 'Khu Đô Thị Phú Mỹ Hưng, Đường Nguyễn Văn Linh, Quận 7, TP.HCM',
    phone: '+84 (0) 908 888 911',
    hours: 'Thứ 2 – Thứ 7: 08:30 – 18:30 (Chủ nhật nhận hẹn VIP kín)',
    specs: 'Phòng Dyno cách âm 4WD 1500HP • Phòng sơn nhiệt sấy hồng ngoại tiêu chuẩn Đức • Cầu nâng siêu xe gầm thấp',
  },
  {
    city: 'HÀ NỘI',
    name: 'APEX North Engineering Studio',
    address: 'Bán đảo Quảng An, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    phone: '+84 (0) 909 999 911',
    hours: 'Thứ 2 – Thứ 7: 09:00 – 19:00 (Tiếp đón phòng chờ VIP Lounge)',
    specs: 'Xưởng CNC 5 trục chi tiết nhôm máy bay • Khu vực chế tác da thủ công • Xe cứu hộ sàn phẳng chuyên dụng 24/7',
  }
];
