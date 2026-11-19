export interface ProjectSpecs {
  scopeEn?: string;
  durationEn?: string;
  lightingEn?: string;
  flooringEn?: string;
  joineryEn?: string;
  firmEn?: string;
}

export interface ProjectAngle {
  titleEn: string;
  image: string;
}

export interface MaterialSwatch {
  color: string;
  nameEn: string;
  finishEn: string;
}

export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryLabel: string;
  categoryLabelEn: string;
  firmEn?: string;
  coverImage: string;
  gallery: string[];
  beforeImage?: string;
  location: string;
  locationEn: string;
  year: string;
  area: string;
  style: string;
  styleEn: string;
  description: string;
  descriptionEn: string;
  palette: string[];
  features: string[];
  featuresEn: string[];
  featured?: boolean;
  conceptEn?: string;
  materialsDescriptionEn?: string;
  angles?: ProjectAngle[];
  specs?: ProjectSpecs;
  materialSwatches?: MaterialSwatch[];
  challengeEn?: string;
  solutionEn?: string;
}

export const DESIGNER_INFO = {
  nameAr: "م. آلاء عيسى",
  nameEn: "ALAA ISSA",
  titleAr: "مهندسة تصميم داخلي وديكور معماري",
  titleEn: "INTERIOR ARCHITECTURE & DESIGN",
  subtitleAr: "أعمال مختارة | 2026-2027",
  subtitleEn: "SELECTED WORKS | 2026-2027",
  locationAr: "القاهرة | مصر",
  locationEn: "CAIRO | EGYPT",
  email: "alaa.issa.design@gmail.com",
  phone: "+20 100 000 0000",
  whatsappNumber: "201000000000",
  linkedin: "Alaa Issa",
  instagram: "@alaaissa.interiors",
  avatarUrl: "/images/alaa.webp",
  builtWorksOffset: 80,
  cadFidelity: 100,
  
  aboutIntroAr:
    "كمهندسة تصميم داخلي ومعماري، يلهمني ابتكار مساحات تجمع بين الوظيفة، الإبداع، والقيمة الجمالية الخالدة. على مدار مسيرتي المهنية، طورت أساساً متيناً في التخطيط المكاني، اختيار الخامات، الإضاءة المعمارية، تصميم الأثاث المخصص، والنمذجة ثنائية وثلاثية الأبعاد (2D/3D). أستمتع بتحويل الأفكار إلى تصاميم مدروسة تعكس احتياجات العميل وهويته، وتبرز الطابع المعماري الفريد للفراغ.",
  aboutIntroEn:
    "As an Interior Architect and Designer, I am passionate about creating spaces that combine functionality, creativity, and aesthetic value. Throughout my professional journey, I have developed a strong foundation in space planning, material selection, lighting, bespoke furniture design, and 2D/3D visualization. I enjoy transforming ideas into thoughtful designs that reflect both the needs of the user and the character of the space.",
  
  aboutExperienceAr:
    "ممارسة مهنية مكرسة لتصميم الملاذات السكنية الراقية والمساحات التجارية المميزة، من خلال وضوح التخطيط المكاني، تفصيل الأثاث المخصص، والإشراف الدقيق على التنفيذ وتحويل المخططات إلى واقع حي.",
  aboutExperienceEn:
    "Dedicated to bespoke residential retreats and boutique commercial interiors, approaching each project through spatial clarity, tailored material palettes, and attentive turnkey execution.",

  statementAr:
    "دمج الدقة الهندسية المعمارية مع الحس الفني الفطري لابتكار فراغات هادئة، أصيلة، وخالدة تتجاوز الصيحات العابرة.",
  statementEn:
    "Merging structural engineering discipline with innate aesthetic poetry to craft serene, high-fidelity spaces that endure beyond fleeting trends.",

  experience: [
    {
      period: "2024 – PRESENT",
      role: "Lead Interior Architect & Design Consultant",
      company: "Alaa Issa Studio & Architectural Practice",
      location: "Cairo, Egypt",
      description:
        "Directing bespoke residential retreats, luxury penthouses, and boutique commercial interiors. Leading space planning, 3D visualization, detailed millwork shop drawings, and turnkey site quality supervision.",
      skills: ["Space Planning", "Custom Joinery Detailing", "Circadian Lighting", "Turnkey Supervision"],
    },
    {
      period: "2022 – 2024",
      role: "Interior Design Architect",
      company: "Atelier Arch & Spatial Design",
      location: "New Cairo, Egypt",
      description:
        "Developed comprehensive interior architectural schemes for private villas. Engineered custom millwork details, calculated architectural lux distributions, and produced contractor working drawings.",
      skills: ["3ds Max / Corona", "CAD Working Drawings", "BOQ Oversight", "Natural Stone Curation"],
    },
    {
      period: "2020 – 2022",
      role: "Architectural Visualizer & Junior Designer",
      company: "Blueprint Architectural Consultancy",
      location: "Giza, Egypt",
      description:
        "Created photorealistic 3D spatial renders, VR walkthroughs, and municipal drawings. Conducted physical site surveys and coordinated material finish palettes.",
      skills: ["3D Photorealism", "AutoCAD 2D", "Revit BIM", "Physical Site Surveying"],
    },
  ],

  education: [
    {
      year: "2020 – 2024",
      titleEn: "Bachelor's Degree in Architectural Engineering & Interior Architecture",
      titleAr: "بكالوريوس الهندسة المعمارية والتصميم الداخلي",
      institutionEn: "Faculty of Fine Arts & Architecture",
      institutionAr: "كلية الفنون الجميلة والعمارة",
      descEn: "Graduated with honors, focusing on sustainable residential spaces and spatial ergonomics.",
      descAr: "تخرج مع مرتبة الشرف مع التركيز على التصميم السكني المستدام والارغونوميكس المكاني.",
    },
    {
      year: "2024 – 2025",
      titleEn: "Advanced Certification in Lighting Architecture & Joinery Detailing",
      titleAr: "دبلوم متقدم في هندسة الإضاءة المعمارية وتفاصيل النجارة",
      institutionEn: "Institute of Interior Detailing",
      institutionAr: "معهد التفاصيل المعمارية المتقدمة",
      descEn: "Specialized in 3000K warm circadian lighting systems and custom joinery production.",
      descAr: "تخصص في أنظمة الإضاءة الإيقاعية الدافئة وتصنيع الأثاث المخصص.",
    },
  ],

  software: [
    { name: "3ds Max", role: "3D Modeling & Rendering", badge: "3MAX", color: "bg-blue-600 text-white" },
    { name: "V-Ray / Corona", role: "Photorealistic Engines", badge: "VR", color: "bg-amber-600 text-white" },
    { name: "AutoCAD", role: "2D Plans & Working Drawings", badge: "CAD", color: "bg-red-600 text-white" },
    { name: "SketchUp", role: "Concept Massing & Quick 3D", badge: "SKP", color: "bg-blue-500 text-white" },
    { name: "Photoshop", role: "Post-Production & Moodboards", badge: "Ps", color: "bg-sky-800 text-white" },
    { name: "Revit", role: "BIM & Construction Documents", badge: "RVT", color: "bg-indigo-700 text-white" },
  ],

  skills: {
    technicalEn: [
      "Space Planning & Circulation Diagrams",
      "Architectural Lighting Design & Lux Calculations",
      "Material Boards & Tactile Curation",
      "Executive Shop Drawings & Joinery Detailing",
      "Turnkey Site Supervision & Quality Control",
      "Bill of Quantities (BOQ) & Budget Oversight",
    ],
    technicalAr: [
      "توزيع الفراغات ودراسة مسارات الحركة (Circulation)",
      "هندسة الإضاءة وحسابات شدة الإنارة وتوزيع اللوكس",
      "إعداد لوحات الخامات واختيار عينات الأخشاب والرخام",
      "المخططات التنفيذية وتفريد وحدات النجارة (Shop Drawings)",
      "الإشراف الموقعي المباشر وضمان الجودة",
      "إعداد جداول الكميات (BOQ) وضبط الميزانيات",
    ],
    hobbiesEn: [
      "Artistic Creation: Spatial sketching, oil painting, and tactile material experiments.",
      "Architectural Exploration: Immersive travels studying regional building traditions and classical proportions.",
      "Photography & Framing: Capturing shadows, natural light shifts, and micro-textures in built environments.",
    ],
    hobbiesAr: [
      "الإبداع الفني: الرسم اليدوي، استكشاف ملامس الخامات الطبيعية، وتجارب الألوان.",
      "الاستكشاف المعماري: السفر لدراسة المدارس المعمارية العالمية وتفاصيل العمارة التاريخية والحديثة.",
      "التصوير المعماري: توثيق حركة الضوء الطبيعي والظلال والملامس الدقيقة في الفراغات.",
    ],
    languages: [
      { nameEn: "ARABIC", nameAr: "العربية", levelEn: "Native", levelAr: "اللغة الأم" },
      { nameEn: "ENGLISH", nameAr: "الإنجليزية", levelEn: "Fluent / Professional", levelAr: "إتقان مهني كامل" },
      { nameEn: "FRENCH", nameAr: "الفرنسية", levelEn: "Working Proficiency", levelAr: "مستوى عملي" },
    ],
  },
};

export const PROJECTS: Project[] = [
  {
    id: "luxury-japandi-residence",
    title: "ريزيدنس التجمع - صالون مودرن جاباندي دافئ",
    titleEn: "Tagamoa Residence - Warm Japandi Living Suite",
    category: "living",
    categoryLabel: "صالونات ومعيشة",
    categoryLabelEn: "Living & Lounges",
    firmEn: "Alaa Issa Studio",
    coverImage: "/images/projects/project-1.jpg",
    gallery: [
      "/images/projects/project-1.jpg",
      "/images/projects/project-2.jpg",
      "/images/projects/project-3.jpg",
      "/images/projects/project-4.jpg",
    ],
    beforeImage: "/images/projects/project-1-orig.jpg",
    location: "القاهرة الجديدة، التجمع الخامس",
    locationEn: "New Cairo, 5th Settlement",
    year: "2026",
    area: "75 m²",
    style: "Japandi Warm Minimalist",
    styleEn: "Japandi Warm Minimalist",
    description:
      "تصميم صالون واستقبال نفذته برؤية جاباندي معاصرة؛ ركزت على تناغم درجات البيج والرمادي الدافئ مع خشب الجوز الداكن والبانوهات المخططة رأسياً، مدعومة بإضاءات مخفية 3000K لمنح الفراغ سكينة بصرية وشعوراً بالاتساع والهدوء.",
    descriptionEn:
      "A complete living room & lounge space embodying contemporary Japandi aesthetic. Warm earth tones meet dark walnut wood panels, vertical fluting, and 3000K concealed warm LED lighting for supreme visual tranquility.",
    palette: ["#E7E3DC", "#4A3A2C", "#A2907D", "#1C1B1F", "#D0BA98"],
    features: [
      "تكسيات خشبية رأسية مدمجة مع بانوهات عازلة للصوت",
      "إضاءة خطية مخفية مدروسة مع سيناريوهات إضاءة ذكية",
      "طقم جلوس زاوية مخصص من قماش البوكليه الفاخر",
      "وحدة تلفزيون عائمة مع أرفف ديكورية مدمجة",
      "سجادة منسوجة يدوياً بتدرجات طبيعية رخامية",
    ],
    featuresEn: [
      "Custom vertical fluted wall cladding with acoustic backing",
      "Concealed architectural linear lighting with smart scene control",
      "Bespoke modular sofa in textured boucle upholstery",
      "Floating minimalist media unit with integrated display niche",
      "Handmade textured wool rug with subtle organic veins",
    ],
    conceptEn:
      "Space organization is centered around the concept of a seamless modern agora. In classical architecture, circulation was continuous and filled with natural daylight. The interior circulation here recreates this organic activity, with all functional zones radiating from the central living lounge bathed in balanced 3000K warm illumination.",
    materialsDescriptionEn:
      "Centered around richly veined natural marble, warm walnut wood, and textured wall fluting. Soft ambient lighting enhances the natural textures while adding warmth and visual depth. A palette of earthy tones, deep browns, and warm cream accents evokes comfort, relaxation, and intimate quiet luxury.",
    angles: [
      { titleEn: "Panoramic Lounge View", image: "/images/projects/project-1.jpg" },
      { titleEn: "Symmetry & Perspective", image: "/images/projects/project-2.jpg" },
      { titleEn: "Media Unit & Wall Fluting", image: "/images/projects/project-3.jpg" },
      { titleEn: "Corner Lounge & Bouclé", image: "/images/projects/project-4.jpg" },
    ],
    specs: {
      scopeEn: "Turnkey Interior Architecture, 3D Visualization, Shop Drawings & Site Supervision",
      durationEn: "6 Weeks Design • 14 Weeks Turnkey Execution",
      lightingEn: "3000K Warm Circadian Linear LED with Smart Dimming Scenes",
      flooringEn: "Natural Botticino Marble Slabs & Acoustic Underlayment",
      joineryEn: "Bespoke Walnut Vertical Fluting with Concealed Storage",
    },
    challengeEn:
      "A raw concrete shell with an obstructive structural column right in the primary sightline and low natural daylight levels in the rear circulation passage.",
    solutionEn:
      "Absorbed the column into an integrated fluted walnut media feature wall with hidden acoustic dampening. Layered 3000K indirect ceiling coves cast a warm, continuous zenith wash simulating natural morning sunlight.",
    materialSwatches: [
      { color: "#E7E3DC", nameEn: "Travertine Navona", finishEn: "Honed & Unfilled Natural Slab" },
      { color: "#4A3A2C", nameEn: "Smoked American Walnut", finishEn: "Matte Fluted Wall Millwork" },
      { color: "#A2907D", nameEn: "Textured Bouclé", finishEn: "Custom Curved Sectional Upholstery" },
      { color: "#1C1B1F", nameEn: "Anodized Gunmetal", finishEn: "Hairline Shadow Gap Reveals" },
      { color: "#D0BA98", nameEn: "Circadian Linear LED", finishEn: "3000K Architectural 95+ CRI" },
    ],
    featured: true,
  },
  {
    id: "dunes-master-suite",
    title: "فيلا ديونز - جناح النوم الرئيسي الفاخر",
    titleEn: "Dunes Villa - Master Bedroom Suite",
    category: "bedroom",
    categoryLabel: "أجنحة النوم",
    categoryLabelEn: "Master Bedrooms",
    firmEn: "Atelier Arch",
    coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    beforeImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    location: "الشيخ زايد، بيفرلي هيلز",
    locationEn: "Sheikh Zayed, Beverly Hills",
    year: "2026",
    area: "58 m²",
    style: "نيو كلاسيك مودرن هادئ",
    styleEn: "Quiet Luxury Neoclassical",
    description:
      "ملاذ هادئ يجمع بين البساطة والرفاهية، صُمم السرير بظهر جلدي مبطن وألواح خشبية دافئة مع غرفة ملابس مفتوحة وحمام رخامي متصل.",
    descriptionEn:
      "A serene retreat marrying minimalist tranquility with refined luxury. Features custom upholstered headboard, integrated walk-in dressing suite, and master ensuite bathroom.",
    palette: ["#F2EDE4", "#3D3A36", "#B8A38E", "#E2D3BE"],
    features: [
      "لوح سرير ممتد بعرض الجدار مع إضاءة قراءة مدمجة",
      "خزائن ملابس مخصصة بزجاج عاكس وإضاءة داخلية",
      "أرضيات خشب باركيه صلب بتصميم هيرنجبون الفرنسي",
      "ستائر كهربائية ذكية مع تحكم مركزي",
    ],
    featuresEn: [
      "Wall-to-wall integrated headboard with recessed reading lights",
      "Smoked glass walk-in wardrobe with auto-sensor lighting",
      "French herringbone natural engineered hardwood flooring",
      "Smart motorized blackout drapery system",
    ],
    conceptEn:
      "Conceived as an acoustic sanctuary for restorative rest. The bedroom balances tactile warmth with architectural serenity. The spatial hierarchy smoothly leads from the sleeping chamber through a smoked-glass portal into an organized walk-in dressing suite and private ensuite marble bath.",
    materialsDescriptionEn:
      "Subtle plaster wall coatings in oatmeal tones, natural French oak herringbone flooring, and brushed champagne bronze fittings. Hidden perimeter cove lighting frames the bespoke headboard without harsh glare.",
    angles: [
      { titleEn: "Master Suite Horizon", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Reading Alcove & Bench", image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Dressing Portal & Texture", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80" },
    ],
    specs: {
      scopeEn: "Master Suite Architecture, Joinery Detailing & Furnishing Curation",
      durationEn: "4 Weeks Design • 8 Weeks Execution",
      lightingEn: "2700K-3000K Tunable Warm Glare-Free Ambient & Bedside Optics",
      flooringEn: "French Herringbone Natural Engineered Hardwood",
      joineryEn: "Floor-to-Ceiling Smoked Glass Wardrobes with Integrated LED Rails",
    },
    challengeEn:
      "Creating an acoustic sleep sanctuary shielded from exterior noise while unifying a wide, awkward bedroom footprint with the dressing corridor without heavy compartmentalizing walls.",
    solutionEn:
      "Engineered a full-width acoustic upholstered headboard that buffers vibrations, and integrated a transparent smoked-glass portal into the walk-in dressing suite, preserving visual depth while granting distinct functional privacy.",
    materialSwatches: [
      { color: "#F2EDE4", nameEn: "Oatmeal Lime Plaster", finishEn: "Hand-Troweled Matte Finish" },
      { color: "#3D3A36", nameEn: "Smoked Fluted Glass", finishEn: "Dark Bronze Anodized Framing" },
      { color: "#B8A38E", nameEn: "French White Oak", finishEn: "Herringbone Engineered Parquet" },
      { color: "#E2D3BE", nameEn: "Italian Nubuck Suede", finishEn: "Padded Acoustic Headboard" },
    ],
    featured: true,
  },
  {
    id: "skyline-penthouse-kitchen",
    title: "بنتهاوس الأفق - المطبخ الإيطالي المفتوح",
    titleEn: "Skyline Penthouse - Open Italian Kitchen",
    category: "kitchen",
    categoryLabel: "مطابخ وحمامات",
    categoryLabelEn: "Kitchens & Baths",
    firmEn: "Freelance Practice",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    ],
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    location: "المعادي، كورنيش النيل",
    locationEn: "Maadi, Nile Corniche",
    year: "2025",
    area: "48 m²",
    style: "مودرن ألترا مينيمال",
    styleEn: "Ultra-Minimalist Modern",
    description:
      "مطبخ جزيرة مفتوح يتصل بغرفة الطعام، مستوحى من خطوط المطابخ الإيطالية المعاصرة؛ أسطح من حجر الكلكتا الطبيعي وأبواب بدون مقابض بتقنية الفتح باللمس.",
    descriptionEn:
      "Open-concept island kitchen seamlessly connecting with the grand dining area. Calacatta marble surfaces and matte handle-less cabinetry with integrated appliances.",
    palette: ["#1D1D20", "#FFFFFF", "#C5A880", "#8E8880"],
    features: [
      "جزيرة مطبخ شلالية من رخام كلكتا طبيعي مقاوم للحرارة",
      "أجهزة كهربائية ألمانية مدمجة كلياً داخل التجاليد",
      "إضاءة تحت الخزائن مع حساسات حركة خفية",
      "ركن قهوة وبوفيه مدمج بأبواب قابلة للطي والاختفاء",
    ],
    featuresEn: [
      "Calacatta waterfall island with under-counter ambient glow",
      "Concealed high-end German integrated kitchen appliances",
      "Hidden motion-activated under-cabinet lighting",
      "Pocket-door breakfast and barista station",
    ],
    conceptEn:
      "An architectural culinary centerpiece conceived as an open social monolith. The massive Calacatta marble island defines circulation, connecting high-efficiency culinary workstations with open-plan formal dining overlooking panoramic skyline views.",
    materialsDescriptionEn:
      "Bookmatched Calacatta marble with gold veining, matte anti-fingerprint thermal laminate cabinetry in graphite, and satin brass reveals. Under-counter recessed channels yield clean, shadow-line aesthetics.",
    angles: [
      { titleEn: "Waterfall Island Monolith", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Dining & Culinary Flow", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Concealed Barista Station", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80" },
    ],
    specs: {
      scopeEn: "Full Kitchen Architecture, MEP Layouts, Custom Cabinetry & Appliance Integration",
      durationEn: "5 Weeks Design • 10 Weeks Execution",
      lightingEn: "High CRI 95+ Task Lighting (4000K) with 2700K Accent Mood Channels",
      flooringEn: "Large-Format 120x120cm Honed Porcelain Slabs",
      joineryEn: "Custom German Blum Servo-Drive Motorized Pocket Doors",
    },
    challengeEn:
      "Integrating intensive culinary prep equipment within an open-plan luxury living space without grease dispersion, visible kitchen clutter, or loud mechanical equipment.",
    solutionEn:
      "Engineered a sculptural 4.2-meter Calacatta marble island with silent flush downdraft extraction, and flanked the back-wall with motorized pocket doors that effortlessly conceal small appliances and the barista station when entertaining.",
    materialSwatches: [
      { color: "#1D1D20", nameEn: "Graphite Fenix NTM", finishEn: "Thermal Anti-Fingerprint Matte" },
      { color: "#FFFFFF", nameEn: "Calacatta Gold Marble", finishEn: "Bookmatched 20mm Honed Slab" },
      { color: "#C5A880", nameEn: "Satin Champagne Brass", finishEn: "Recessed Continuous J-Pull Channels" },
      { color: "#8E8880", nameEn: "Italian Porcelain Slab", finishEn: "120x120cm Seamless Honed Tiles" },
    ],
    featured: true,
  },
  {
    id: "lumiere-lounge-cafe",
    title: "كافيه واستراحة لوميير - تجربة ضيافة استثنائية",
    titleEn: "Lumière Boutique Lounge & Café",
    category: "commercial",
    categoryLabel: "تجاري وإداري",
    categoryLabelEn: "Commercial & Retail",
    firmEn: "Blueprint Architectural Consultancy",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    ],
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    location: "ووترواي، التجمع الخامس",
    locationEn: "Waterway, New Cairo",
    year: "2026",
    area: "190 m²",
    style: "بيوفيليك مودرن (Biophilic Contemporary)",
    styleEn: "Biophilic Contemporary",
    description:
      "تصميم مساحة ضيافة معمارية تمزج بين الخرسانة الممسوسة، الأقواس الناعمة، والمسطحات النباتية الحية مع إنارة سينمائية جذابة تناسب جلسات العمل واللقاءات.",
    descriptionEn:
      "Hospitality interior blending micro-cement finishes, soft architectural arches, living green walls, and moody warm lighting tailored for social moments.",
    palette: ["#2B2A27", "#76806C", "#DFBE95", "#E8E2D7"],
    features: [
      "جدار نباتي حي مزود بنظام ري وإضاءة نمو ذكية",
      "بار قهوة مقوس مكسو بقطع التيرازو المصنوعة يدوياً",
      "جلسات متباينة تجمع بين الطاولات المرتفعة والأرائك الوثيرة",
      "توزيع صوتي محيطي ومواد ماصة للصدى لراحة الرواد",
    ],
    featuresEn: [
      "Living green wall with automated smart irrigation and grow lights",
      "Curved handcrafted terrazzo espresso bar",
      "Zoned seating offering collaborative high tables and plush banquettes",
      "Architectural acoustic ceiling treatments for intimate ambience",
    ],
    conceptEn:
      "Biophilic hospitality experience that invites urbanites into a sculpted, earthy oasis. Curving architectural arches guide guests through varying intimacy zones—from sunlit espresso bars to cozy velvet dining nooks framed by organic foliage.",
    materialsDescriptionEn:
      "Poured terrazzo counters embedded with river pebbles, micro-cement walls in sage and travertine hues, fluted glass partitions, and lush preserved vertical plant arrays.",
    angles: [
      { titleEn: "Espresso Bar & Arches", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Collaborative Lounge Banquettes", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
      { titleEn: "Living Green Wall Alcove", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80" },
    ],
    specs: {
      scopeEn: "Commercial Hospitality Architecture, Acoustical Engineering & Turnkey Fit-Out",
      durationEn: "8 Weeks Design • 16 Weeks Fast-Track Fit-Out",
      lightingEn: "Architectural Track Spotlights with Scene Automation (Morning / Dusk / Night)",
      flooringEn: "Seamless Polished Micro-cement with Brass Inlay Dividers",
      joineryEn: "Custom Curved Terrazzo Bar Counter & Floating Oak Banquettes",
    },
    challengeEn:
      "A high-traffic concrete commercial shell with reverberant acoustic echo, demanding both high table turnover for morning espresso and intimate plush seating for evening lounge patrons.",
    solutionEn:
      "Introduced continuous slatted acoustic timber ceilings and fluted arches that dramatically lower reverberation time. Structured spatial flow into two micro-climates: a dynamic terrazzo espresso bar at the front and secluded velvet alcoves at the rear.",
    materialSwatches: [
      { color: "#2B2A27", nameEn: "Charcoal Slatted Oak", finishEn: "Acoustic Backed Fluted Wall" },
      { color: "#76806C", nameEn: "Sage Green Micro-cement", finishEn: "Hand-Applied Mineral Stucco" },
      { color: "#DFBE95", nameEn: "Handmade Terrazzo", finishEn: "Polished River Pebble Aggregates" },
      { color: "#E8E2D7", nameEn: "Antiqued Architectural Brass", finishEn: "Custom Arch Trim & Lighting Stems" },
    ],
    featured: true,
  },
];


export const FAQS = [
  {
    q: "كيف يتم العمل مع م. آلاء عيسى؟",
    qEn: "How does the design collaboration process work?",
    a: "تبدأ الرحلة بجلسة تعارف واستشارة أولية لمناقشة أفكارك والمساحة المتاحة، ثم أقوم بإعداد دراسة توزيع الفراغات والتصميم ثلاثي الأبعاد 3D. بعد اعتمادك للتصميم، أزودك بالمخططات التنفيذية أو أتولى الإشراف المباشر على التنفيذ حتى تسليم المفتاح.",
    aEn: "The process begins with an initial discovery consultation to explore your vision and functional requirements. I then develop spatial layouts and photorealistic 3D concepts. Following concept approval, comprehensive shop drawings are prepared, alongside turnkey site supervision through final handover.",
  },
  {
    q: "هل يمكنني طلب التصميم 3D والمخططات فقط؟",
    qEn: "Can I request 3D design concepts and blueprints only?",
    a: "نعم بالتأكيد؛ أقدم باقة 'التصميم والمخططات التنفيذية الشاملة' (Shop Drawings) والتي تمنحك دليلاً هندسياً كاملاً بالمقاسات وأكواد الدهانات وتفاصيل النجارة لتتمكن من تنفيذه بسهولة مع مقاولك المفضل.",
    aEn: "Yes, absolutely. The Complete Design & Shop Drawings package provides an exhaustive architectural blueprint with precise millimeter dimensions, paint codes, material schedules, and bespoke joinery details for seamless execution with your preferred contractor.",
  },
  {
    q: "هل تشرف م. آلاء عيسى على موقع التنفيذ شخصياً؟",
    qEn: "Does Eng. Alaa Issa personally supervise the site execution?",
    a: "نعم، في باقات الإشراف والتنفيذ الكامل أقوم بزيارات ميدانية دورية لمتابعة أدق التفاصيل من تأسيسات السباكة والكهرباء وحتى تركيب الأخشاب والرخام لضمان مطابقة الواقع للتصميم المعتمد.",
    aEn: "Yes. Under supervision and turnkey execution contracts, I conduct scheduled and milestone site inspections overseeing electromechanical rough-ins, finishings, marble installations, and custom joinery to guarantee 100% fidelity to the design.",
  },
  {
    q: "ما هو الطراز الذي تتميز به تصاميم م. آلاء؟",
    qEn: "What architectural style does Eng. Alaa specialize in?",
    a: "أتميز بطراز المودرن جاباندي الدافئ (Warm Japandi)، النيو كلاسيك المعاصر، والمينيماليزم الهادئ (Quiet Luxury) الذي يركز على الخامات الطبيعية، البانوهات الخشبية، ودرجات الإضاءة الدافئة والمريحة للأعصاب.",
    aEn: "My signature philosophy combines Warm Japandi minimalism, contemporary neo-classic elegance, and Quiet Luxury—centered around natural stone, tailored timber paneling, and circadian 3000K ambient illumination.",
  },
];


export interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  features: string[];
  featuresEn: string[];
}

export const SERVICES: Service[] = [
  {
    id: "interior-design-3d",
    title: "التصميم الداخلي 3D والواقع الافتراضي",
    titleEn: "3D Interior Design & VR Walkthrough",
    description:
      "أترجم رؤيتك واحتياجاتك إلى مجسمات ثلاثية الأبعاد فائقة الدقة قبل البدء بالتنفيذ، لتشاهدي كل خامة، إضاءة، وقطعة أثاث كما ستكون تماماً في الواقع.",
    descriptionEn:
      "I transform your lifestyle and ideas into ultra-photorealistic 3D visuals and virtual tours, allowing you to see every texture and lighting scheme before breaking ground.",
    iconName: "Cuboid",
    features: [
      "مخططات توزيع الفراغات والأثاث والمسارات (2D Layouts)",
      "رندرات واقعية ثلاثية الأبعاد بدقة تصويرية سينمائية",
      "لوحات الإلهام وتنسيق الألوان والخامات (Moodboards)",
      "جولة تفاعلية افتراضية بزاوية 360 درجة",
    ],
    featuresEn: [
      "Detailed 2D space planning & furniture layouts",
      "Ultra-photorealistic multi-angle 3D renders",
      "Curated material & color palette moodboards",
      "Interactive 360° virtual reality walkthroughs",
    ],
  },
  {
    id: "turnkey-fitout",
    title: "الإشراف والتنفيذ المتكامل (تسليم مفتاح)",
    titleEn: "Turnkey Contracting & Fit-Out Supervision",
    description:
      "أشرف شخصياً على تنفيذ المخططات خطوة بخطوة بالتعاون مع أمهر الفنيين، مع الالتزام الصارم بالمقايسة المعتمدة والجدول الزمني المحدد.",
    descriptionEn:
      "I personally supervise on-site execution step-by-step alongside vetted master craftsmen, ensuring strict adherence to blueprints, budgets, and milestones.",
    iconName: "Hammer",
    features: [
      "متابعة أعمال التأسيسات الإنشائية والكهرباء والسباكة الدفينة",
      "توريد وتركيب الرخام الطبيعي والباركيه الخشبي الفاخر",
      "تنفيذ الديكورات الجدارية والجبس بورد المعلق بدقة",
      "تقارير متابعة دورية بالصور والفيديو أولاً بأول",
    ],
    featuresEn: [
      "Concealed MEP (plumbing, electrical & HVAC) infrastructure supervision",
      "Luxury natural marble & engineered hardwood flooring installation",
      "Artisan wall finishes & dropped gypsum ceiling execution",
      "Regular photo & video milestone updates for homeowners",
    ],
  },
  {
    id: "custom-furniture",
    title: "تصميم وتفصيل الأثاث المودرن المخصص",
    titleEn: "Bespoke Modern Furniture & Joinery",
    description:
      "أصمم قطع أثاث حصرية ومدروسة بمقاسات فراغك الخاصة، مع الإشراف على تصنيعها في ورش نجارة متخصصة لاختيار أجود الأخشاب وأفخم الأقمشة.",
    descriptionEn:
      "I design one-of-a-kind statement furniture scaled precisely to your space, crafted in specialized workshops with selected solid woods and premium textiles.",
    iconName: "Armchair",
    features: [
      "تفصيل غرف النوم والخزائن المدمجة الذكية (Dressing Rooms)",
      "أطقم الصالونات والمجالس بأقمشة مستوردة مقاومة للبقع",
      "طاولات قهوة وطعام من خشب الجوز والرخام الطبيعي",
      "وحدات التلفزيون والأرفف الديكورية العائمة",
    ],
    featuresEn: [
      "Tailor-made bedroom suites and integrated walk-in closets",
      "Bespoke living sofas in premium stain-resistant upholstery",
      "Custom dining and coffee tables in solid wood and stone",
      "Wall-mounted floating media consoles and display joinery",
    ],
  },
];


export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  comment: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "د. هاني الشناوي",
    role: "مالك فيلا في التجمع الخامس",
    project: "تصميم وإشراف صالون ومنطقة استقبال 120 م²",
    comment:
      "المهندسة آلاء عيسى تتمتع بذوق رفيع ودقة متناهية في التفاصيل. النتيجة التي شاهدتها في الرندر ثلاثي الأبعاد كانت مطابقة للواقع بنسبة 100%، وخاصة تناسق الأخشاب والإضاءة المخفية التي جعلت بيتنا دافئاً وراقياً جداً.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-2",
    name: "أ. ميار القاضي",
    role: "مالكة شقة في الشيخ زايد",
    project: "تصميم شقة سكنية متكاملة 185 م²",
    comment:
      "أكثر ما يميز م. آلاء هو إنصاتها الحقيقي لاحتياجاتنا كعائلة. استطاعت استغلال كل متر في الشقة وتنسيق ألوان وخامات هادئة مريحة للأعصاب. أسلوبها في التعامل راقٍ ومواعيدها كانت في قمة الالتزام.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-3",
    name: "أ. شريف الباز",
    role: "شريك مؤسس - كافيه لوميير",
    project: "تصميم وتنفيذ استراحة ووترواي",
    comment:
      "لمست في المهندسة آلاء احترافية معمارية متميزة، أفكارها في اختيار الخامات الطبيعية والإنارة السينمائية جعلت الكافيه مكاناً مفضلاً لكل زواره. فخور بالتعاون معها وأنصح بها لكل من يبحث عن التميز.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "جلستي الاستشارية معك",
    titleEn: "Personal Discovery Session",
    desc: "أجتمع معك لنستمع بعناية لذوقك الخاص، روتين يومك، واحتياجات أسرتك، ونحدد الميزانية المستهدفة ونرفع مقاسات الفراغ بدقة.",
  },
  {
    step: "02",
    title: "التصميم 3D وتوزيع الفراغات",
    titleEn: "Spatial Layout & 3D Renders",
    desc: "أصمم المخططات ثنائية الأبعاد (2D) ورندرات واقعية ثلاثية الأبعاد (3D) لتشاهدي كيف سيبدو منزلك بكل زاوية ولون وملمس قبل أي خطوة.",
  },
  {
    step: "03",
    title: "اعتماد الخامات والمقايسة التفصيلية",
    titleEn: "Material Palette & BOQ",
    desc: "نختار سوياً عينات الأقمشة، الرخام، والأخشاب، وأقدم لك مقايسة واضحة ومحددة تضمن الشفافية الكاملة وضبط الميزانية.",
  },
  {
    step: "04",
    title: "إشرافي على التنفيذ والتسليم",
    titleEn: "Supervision & Handover",
    desc: "أتابع سير العمل في الموقع مع الحرفيين خطوة بخطوة حتى تتسلمي مساحتك جاهزة تماماً للحياة بأعلى درجات الإتقان والجمال.",
  },
];
