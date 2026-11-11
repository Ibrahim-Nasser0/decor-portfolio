export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: "all" | "living" | "bedroom" | "kitchen" | "commercial" | "villas";
  categoryLabel: string;
  categoryLabelEn: string;
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
}

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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  comment: string;
  rating: number;
  avatar: string;
}

export const PROJECTS: Project[] = [
  {
    id: "luxury-japandi-residence",
    title: "ريزيدنس التجمع - صالون مودرن جاباندي دافئ",
    titleEn: "Tagamoa Residence - Warm Japandi Living Suite",
    category: "living",
    categoryLabel: "صالونات ومعيشة",
    categoryLabelEn: "Living & Lounges",
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
    area: "75 م²",
    style: "مودرن جاباندي (Japandi Warm Minimalist)",
    styleEn: "Japandi Warm Minimalist",
    description:
      "تصميم صالون ومنطقة معيشة متكاملة تجسد أسلوب الجاباندي المعاصر؛ مزجنا بين الدفء الترابي والخشب الجوزي الداكن مع بانوهات عمودية مخططة وإضاءات مخفية LED دافئة 3000K تمنح المكان راحة بصرية فائقة وأناقة راقية.",
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
    featured: true,
  },
  {
    id: "dunes-master-suite",
    title: "فيلا ديونز - جناح النوم الرئيسي الفاخر",
    titleEn: "Dunes Villa - Master Bedroom Suite",
    category: "bedroom",
    categoryLabel: "أجنحة النوم",
    categoryLabelEn: "Master Bedrooms",
    coverImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
    ],
    location: "الشيخ زايد، بيفرلي هيلز",
    locationEn: "Sheikh Zayed, Beverly Hills",
    year: "2026",
    area: "58 م²",
    style: "نيو كلاسيك مودرن هادئ",
    styleEn: "Quiet Luxury Neoclassical",
    description:
      "ملاذ هادئ يجمع بين البساطة والرفاهية، صُمم السرير بظهر جلدي مبطن وألواح خشبية دافئة مع غرفة ملابس مفتوحة (Walk-in Closet) وحمام رخامي متصل.",
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
    featured: true,
  },
  {
    id: "skyline-penthouse-kitchen",
    title: "بنتهاوس الأفق - المطبخ الإيطالي المفتوح",
    titleEn: "Skyline Penthouse - Open Italian Kitchen",
    category: "kitchen",
    categoryLabel: "مطابخ وحمامات",
    categoryLabelEn: "Kitchens & Baths",
    coverImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    location: "المعادي، كورنيش النيل",
    locationEn: "Maadi, Nile Corniche",
    year: "2025",
    area: "48 م²",
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
    featured: true,
  },
  {
    id: "lumiere-lounge-cafe",
    title: "كافيه واستراحة لوميير - تجربة ضيافة استثنائية",
    titleEn: "Lumière Boutique Lounge & Café",
    category: "commercial",
    categoryLabel: "تجاري وإداري",
    categoryLabelEn: "Commercial & Retail",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    ],
    location: "ووترواي، التجمع الخامس",
    locationEn: "Waterway, New Cairo",
    year: "2026",
    area: "190 م²",
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
    featured: true,
  },
  {
    id: "palm-hills-grand-salon",
    title: "فيلا بالم هيلز - الصالة الملكية وصالة الضيوف",
    titleEn: "Palm Hills Villa - Grand Reception & Living",
    category: "villas",
    categoryLabel: "فلل وقصور",
    categoryLabelEn: "Luxury Villas",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    ],
    location: "مدينة 6 أكتوبر، بالم هيلز",
    locationEn: "6th of October City, Palm Hills",
    year: "2025",
    area: "140 م²",
    style: "لاكشري مودرن بارتفاع مزدوج",
    styleEn: "Double-Height Luxury Modern",
    description:
      "استقبال رئيسي ممتد بارتفاع سقف 6 أمتار، يضم جدارية حجرية منحوتة ومدفأة بيوإيثانول عصرية تمتد بكامل الجدار مع واجهات زجاجية مطلة على الحديقة الخاصة.",
    descriptionEn:
      "Grand double-height reception featuring a 6-meter ceiling, bookmatched stone feature wall, modern linear bioethanol fireplace, and expansive garden views.",
    palette: ["#161619", "#B89B72", "#EBE5D8", "#635D55"],
    features: [
      "جدارية رخام أونيكس طبيعي بإضاءة خلفية ساحرة",
      "مدفأة بيوإيثانول خطية بطول 2.5 متر خالية من الدخان",
      "نظام تكييف مركزي خفي بشبكات تدفق هواء خطية سوداء",
      "ثريا زجاجية عصرية مخصصة بارتفاع 4 أمتار",
    ],
    featuresEn: [
      "Backlit bookmatched natural Onyx feature wall",
      "2.5m smokeless architectural bioethanol linear fireplace",
      "Concealed VRF HVAC system with linear architectural diffusers",
      "Custom 4-meter contemporary blown-glass chandelier",
    ],
    featured: false,
  },
  {
    id: "executive-falcon-hq",
    title: "مقر شركة فالكون - المكاتب وقاعة الاجتماعات التنفيذية",
    titleEn: "Falcon Capital - Executive Boardroom & Offices",
    category: "commercial",
    categoryLabel: "تجاري وإداري",
    categoryLabelEn: "Commercial & Retail",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    ],
    location: "العاصمة الإدارية الجديدة، حي المال والأعمال",
    locationEn: "New Administrative Capital, CBD",
    year: "2026",
    area: "320 م²",
    style: "كوربوريت فاخر معاصر",
    styleEn: "Modern Executive Corporate",
    description:
      "تصميم مساحات عمل راقية تعزز الإنتاجية وتبرز هوية الشركة؛ قاعة اجتماعات ذكية مزودة بشاشات تفاعلية وجدران عازلة للصوت بتشطيبات الجلد والخشب الفاخر.",
    descriptionEn:
      "High-end executive work environment designed to foster productivity and impress global partners. Smart boardroom with acoustic leather panels and walnut joinery.",
    palette: ["#111317", "#2D3748", "#C5A880", "#CBD5E0"],
    features: [
      "طاولة اجتماعات ذكية تتسع لـ 18 شخصاً مجهزة بأنظمة مؤتمرات متطورة",
      "قواطع زجاجية ذكية قابلة للتحول من شفاف إلى معتم بضغطة زر (Smart Glass)",
      "نظام إضاءة إيقاعي يتماشى مع ساعات العمل والنشاط الذهني",
      "كابينات عازلة للمكالمات الهاتفية الفردية (Phone Pods)",
    ],
    featuresEn: [
      "18-seater smart boardroom table with integrated video-conferencing",
      "Switchable privacy smart glass partitions with instant electrochromic tint",
      "Circadian biodynamic lighting synced with natural daily rhythms",
      "Individual soundproof acoustic focus and phone pods",
    ],
    featured: false,
  },
];

export const SERVICES: Service[] = [
  {
    id: "interior-design-3d",
    title: "التصميم الداخلي 3D والواقع الافتراضي",
    titleEn: "3D Interior Design & VR Walkthrough",
    description:
      "نحول خيالك إلى مجسمات ثلاثية الأبعاد فائقة الدقة قبل البدء بالتنفيذ، لتشاهد كل ملمس، إضاءة، وقطعة أثاث كما ستكون تماماً.",
    descriptionEn:
      "We turn visions into photorealistic 3D renders and interactive VR tours before construction begins, showing every texture, light, and piece exactly as built.",
    iconName: "Cuboid",
    features: [
      "مخططات توزيع الفراغات والأثاث (2D Layouts)",
      "رندرات واقعية فائقة الجودة بزوايا متعددة",
      "جولة افتراضية بزاوية 360 درجة",
      "لوحات المزاج واختيار الألوان (Moodboards)",
    ],
    featuresEn: [
      "Detailed 2D space planning & furniture layouts",
      "Ultra-photorealistic multi-angle 3D renders",
      "Interactive 360° virtual reality walkthroughs",
      "Curated material & color palette moodboards",
    ],
  },
  {
    id: "turnkey-fitout",
    title: "التنفيذ والتشطيبات الفاخرة (تسليم مفتاح)",
    titleEn: "Turnkey Contracting & Fit-Out",
    description:
      "إدارة تنفيذية كاملة بمطابقة دقيقة للمخططات المعتمدة، مع الالتزام الصارم بالجداول الزمنية وضمان شامل على كافة الأعمال.",
    descriptionEn:
      "End-to-end site execution strictly adhering to approved blueprints, uncompromising timeline control, and comprehensive warranty on all fit-out works.",
    iconName: "Hammer",
    features: [
      "أعمال السباكة والكهرباء والتكييف الدفينة (MEP)",
      "تركيب الأرضيات الرخامية والباركيه الفاخر",
      "أعمال الدهانات الديكورية والجبس بورد المعلق",
      "تجليد الحوائط بالأخشاب والبدائل والرخام",
    ],
    featuresEn: [
      "Concealed MEP (plumbing, electrical & HVAC) infrastructure",
      "Luxury natural marble & engineered hardwood flooring installation",
      "Specialty artisan wall finishes & dropped gypsum ceilings",
      "Custom wall cladding (natural veneers, fluted panels, stone slabs)",
    ],
  },
  {
    id: "custom-furniture",
    title: "تصنيع الأثاث المودرن والتفصيل المخصص",
    titleEn: "Bespoke Modern Furniture & Joinery",
    description:
      "نصمم ونصنّع قطع أثاث فريدة في ورش عملنا التخصصية لتلائم مقاسات فراغك وهويتك الشخصية بأعلى معايير الحرفية والنجارة الراقية.",
    descriptionEn:
      "We design and craft tailor-made statement furniture in our dedicated joinery workshops to perfectly match your space dimensions and aesthetic identity.",
    iconName: "Armchair",
    features: [
      "تفصيل غرف النوم والخزائن المدمجة الذكية",
      "أطقم الصالونات والمجالس بأقمشة مستوردة مقاومة للبقع",
      "طاولات طعام وقهوة من الأخشاب الصلبة والرخام الطبيعي",
      "وحدات التلفزيون والأرفف الديكورية المعلقة",
    ],
    featuresEn: [
      "Tailor-made bedroom suites and integrated walk-in closets",
      "Bespoke living sofas in premium stain-resistant upholstery",
      "Custom dining and coffee tables in solid wood and stone",
      "Wall-mounted floating media consoles and display joinery",
    ],
  },
  {
    id: "lighting-automation",
    title: "هندسة الإضاءة والأنظمة الذكية (Smart Home)",
    titleEn: "Architectural Lighting & Smart Automation",
    description:
      "الإضاءة هي روح المكان؛ نصمم سيناريوهات إضاءة متوازنة تجمع بين الإنارة الوظيفية والجمالية المحيطية وتكامل أنظمة المنازل الذكية.",
    descriptionEn:
      "Lighting is the soul of any space. We engineer layered lighting designs combining task, accent, and ambient light with seamless smart home integration.",
    iconName: "Sparkles",
    features: [
      "حساب درجات حرارة الإضاءة (Kelvin) وتوزيع اللوكس بدقة",
      "تأسيس وحدات المغناطيس المودرن (Magnetic Track Lights)",
      "برمجة سيناريوهات الإضاءة الصباحية والمسائية والسينمائية",
      "التحكم بالستائر والتكييف والصوتيات عبر الهاتف والمساعد الصوتي",
    ],
    featuresEn: [
      "Lux calculation and Kelvin color-temperature tuning",
      "Modern recessed magnetic track light systems",
      "Morning, evening, and cinema smart lighting presets",
      "Unified smartphone & voice control for curtains, AC, and audio",
    ],
  },
  {
    id: "site-supervision",
    title: "الإشراف الهندسي وإدارة المشاريع",
    titleEn: "Site Supervision & Project Management",
    description:
      "فريق هندسي متخصص يتابع كل خطوة في الموقع، مع تقارير دورية وجدول زمني محدد لضمان جودة الخامات والتنفيذ دون مفاجآت.",
    descriptionEn:
      "Dedicated senior site architects supervising daily operations with regular progress reports and rigorous quality control at every milestone.",
    iconName: "Compass",
    features: [
      "مراقبة مطابقة المواد الموردة للمواصفات الفنية",
      "تقارير تقدم دورية بالصور والفيديو للعميل",
      "إدارة ميزانية المشروع وتفادي الهدر والتكاليف غير المبررة",
      "استلام الأعمال بمحاضر تسليم هندسية معتمدة",
    ],
    featuresEn: [
      "Material inspection ensuring conformity with technical specs",
      "Periodic photo and video progress reports for owners",
      "Budget control preventing waste and unexpected cost spikes",
      "Formal engineering handover protocols for every milestone",
    ],
  },
  {
    id: "consultation-styling",
    title: "استشارات الديكور والتنسيق النهائي (Styling)",
    titleEn: "Decor Consultation & Final Staging",
    description:
      "لمساتنا الأخيرة تصنع الفارق؛ نساعدك في اختيار الإكسسوارات، اللوحات الفنية، النباتات، وتنسيق الألوان لخلق بيئة متجانسة تأسر الحواس.",
    descriptionEn:
      "The finishing touches make all the difference. We curate artwork, accessories, indoor botanicals, and soft accents to bring your interior to life.",
    iconName: "Palette",
    features: [
      "انتقاء اللوحات الجدارية والمنحوتات الفنية المعاصرة",
      "تنسيق السجاد والستائر والوسائد المتناسقة",
      "اختيار نباتات داخلية تلائم إضاءة الفراغ",
      "جلسات استشارية فردية لاختيار الألوان ومطابقة العينات",
    ],
    featuresEn: [
      "Curation of original contemporary wall art and sculptures",
      "Harmonious rug, curtain, and soft textile coordination",
      "Selection of interior greenery matching natural light levels",
      "One-on-one color consultation and tactile sample matching",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "د. هاني الشناوي",
    role: "مالك فيلا في التجمع الخامس",
    project: "تصميم وتنفيذ كامل لفيلا 450 م²",
    comment:
      "تعاملت مع العديد من مكاتب الديكور، لكن فريق Decor Portfolio أثبت كفاءة استثنائية. ما شاهدته في التصميم ثلاثي الأبعاد تم تنفيذه في الواقع بنسبة 100% وبدقة فائقة في التفاصيل الخشبية والإضاءة.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-2",
    name: "المهندسة نورا الفقي",
    role: "شريكة مؤسسة لسلسلة كافيهات لوميير",
    project: "تصميم وتنفيذ فرع ووترواي",
    comment:
      "المكان أصبح حديث رواد وسائل التواصل بفضل التصميم المبتكر والراحة البصرية التي وفرها التوزيع الذكي للإضاءة والنباتات. الالتزام بالوقت كان مبهراً وسلموا المشروع قبل الموعد بأسبوع.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "test-3",
    name: "أ. كريم عبد العزيز",
    role: "رئيس مجلس إدارة شركة استثمارية",
    project: "تشطيب وتجهيز مقر إداري 320 م²",
    comment:
      "احترافية عالية في إدارة الميزانية والشفافية في التعامل مع الموردين. قاعة الاجتماعات والمكاتب التنفيذية عكست هوية مؤسستنا بأسلوب فاخر وعصري يشهد له جميع ضيوفنا.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "جلسة التعارف ودراسة الاحتياج",
    titleEn: "Consultation & Vision Discovery",
    desc: "نستمع لتطلعاتك، نمط حياتك، واحتياجات أسرتك، ونقوم برفع المقاسات وتحديد الميزانية المناسبة لمشروعك.",
  },
  {
    step: "02",
    title: "المخططات والتصميم 3D",
    titleEn: "Concept & 3D Visualization",
    desc: "نطور مخططات توزيع الفراغات (2D) ورندرات واقعية ثلاثية الأبعاد (3D) مع تقديم خيارات الألوان والأثاث حتى نصل للرضا التام.",
  },
  {
    step: "03",
    title: "جداول الخامات والمقايسة التفصيلية",
    titleEn: "Bill of Quantities & Material Spec",
    desc: "نجهز مقايسة تسعير شفافة تشمل كل مسمار وبند وخامة، مع لوحة عينات ملموسة نختارها معاً من أفضل الموردين.",
  },
  {
    step: "04",
    title: "التنفيذ والإشراف وتسليم المفتاح",
    titleEn: "Precision Execution & Handover",
    desc: "ينطلق فريقنا الهندسي لتنفيذ المشروع على أرض الواقع مع متابعة أسبوعية دقيقة، حتى تتسلم مساحتك جاهزة تماماً للحياة.",
  },
];

export const STATS = [
  { value: "+180", label: "مشروع منجز", labelEn: "Completed Projects" },
  { value: "+12", label: "عاماً من الإبداع", labelEn: "Years of Experience" },
  { value: "100%", label: "تطابق التصميم مع الواقع", labelEn: "Design Fidelity" },
  { value: "4.95", label: "تقييم رضا العملاء", labelEn: "Client Rating ★" },
];

export const FAQS = [
  {
    q: "كم تستغرق مرحلة التصميم الداخلي 3D؟",
    qEn: "How long does the 3D interior design phase take?",
    a: "تستغرق مرحلة التصميم الداخلي للشقق والمساحات المتوسطة (من 100 إلى 250 م²) ما بين أسبوعين إلى 3 أسابيع، وتشمل دراسة المساحات، لوحات الألوان، الرندرات ثلاثية الأبعاد، وإجراء التعديلات المطلوبة حتى الوصول للشكل النهائي.",
  },
  {
    q: "هل يمكنني طلب التصميم فقط دون التنفيذ؟",
    qEn: "Can I request design only without execution?",
    a: "نعم بالتأكيد، نقدم باقة 'التصميم والمخططات التنفيذية المتكاملة' (Shop Drawings) والتي تمنحك ملفاً هندسياً شاملاً يحتوي على كافة القياسات، أكواد الألوان، أنواع الخامات، وتوزيع الإنارة والسباكة لتتمكن من تنفيذه مع أي مقاول بسهولة.",
  },
  {
    q: "كيف تضمنون عدم تجاوز الميزانية المتفق عليها أثناء التشطيب؟",
    qEn: "How do you guarantee staying within the agreed budget?",
    a: "نعتمد نظام 'المقايسة التفصيلية الملزمة' المسبقة؛ قبل وضع أي حجر أو بدء التكسير، تكون كل خامة وبند مسعراً ومحدداً بدقة في العقد، مما يحميك من أي تكاليف مفاجئة أو غير مدروسة.",
  },
  {
    q: "هل تقدمون ضماناً على أعمال التشطيب والتنفيذ؟",
    qEn: "Do you provide a warranty on fit-out and execution?",
    a: "نعم، نقدم ضماناً كتابياً شاملاً لمدة 10 سنوات على أعمال التأسيس الإنشائي والسباكة والكهرباء الدفينة، وضماناً لمدة 3 سنوات على كافة أعمال التشطيبات والديكورات والأثاث المصنع من خلالنا.",
  },
];

