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

export const DESIGNER_INFO = {
  nameAr: "م. آلاء عيسى",
  nameEn: "Eng. Alaa Issa",
  titleAr: "مهندسة تصميم داخلي وديكور معماري",
  titleEn: "Interior Architect & Decor Designer",
  bioAr:
    "مهندسة ديكور وتصميم داخلي شغوفة بتحويل الفراغات الصامتة إلى بيئات حية تنبض بالدفء والرقي. أؤمن أن التصميم الناجح لا يقتصر على الجماليات فقط، بل يبدأ من فهم أسلوب حياة العميل وتطويع المساحات لتحقيق التوازن المثالي بين الوظيفة والراحة النفسية والأناقة المعمارية.",
  bioEn:
    "An interior architect passionate about transforming blank spaces into warm, sophisticated living sanctuaries. I believe that true design begins with understanding your unique lifestyle, harmonizing spatial functionality, tactile textures, and ambient lighting to craft a home that feels distinctly yours.",
  experienceYears: "+7",
  projectsCount: "+85",
  rating: "4.98",
  whatsappNumber: "201000000000",
  email: "alaa.issa.design@gmail.com",
};

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
      "تصميم صالون واستقبال نفذته برؤية جاباندي معاصرة؛ ركزت على تناغم درجات البيج والرمادي الدافئ مع خشب الجوز الداكن والبانوهات المخططة رأسياً، مدعومة بإضاءات مخفية 3000K لمنح الفراغ سكينة بصرية وشعوراً بالاتساع والهدوء.",
    descriptionEn:
      "A living salon & reception crafted with a warm Japandi design philosophy. Blending warm taupe undertones with dark walnut accents, vertical fluted panels, and recessed 3000K warm lighting for acoustic and visual serenity.",
    palette: ["#E7E3DC", "#4A3A2C", "#A2907D", "#1C1B1F", "#D0BA98"],
    features: [
      "تكسيات خشبية رأسية صممتها ونفذتها خصيصاً مع خلفيات عازلة للصدى",
      "سيناريوهات إضاءة خطية مخفية موزعة بدقة هندسية",
      "تصميم أريكة ركنية مخصصة بمقاسات الفراغ بقماش البوكليه العاجي",
      "وحدة تلفزيون جدارية عائمة مع مكتبة ديكورية مدمجة",
      "سجادة منسوجة يدوياً تم اختيار خاماتها ونقوشها بعناية",
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
    title: "فيلا ديونز - جناح النوم الرئيسي المعاصر",
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
      "تصميم جناح نوم رئيسي مستوحى من طراز الفنادق العالمية الفاخرة؛ صممت السرير بظهر مبطن وألواح خشبية دافئة تتصل بغرفة ملابس مدمجة وحمام رخامي خاص.",
    descriptionEn:
      "A boutique hotel-inspired master retreat with a custom upholstered headboard, seamless walk-in dressing wardrobe, and private marble ensuite.",
    palette: ["#F2EDE4", "#3D3A36", "#B8A38E", "#E2D3BE"],
    features: [
      "تصميم لوح سرير ممتد بعرض الجدار مع إضاءة قراءة مدمجة",
      "خزائن ملابس مخصصة بزجاج عاكس وإضاءة داخلية ذكية",
      "أرضيات خشب باركيه هيرنجبون عالي المقاومة",
      "ستائر كهربائية مخفية بنظام تحكم ذكي",
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
      "مطبخ مفتوح يتناغم مع غرفة الطعام بأسلوب المينيماليزم الإيطالي، يتميز بجزيرة من رخام الكلكتا الطبيعي وخزائن مطفية مقاومة للبصمات مع ركن قهوة مخفي.",
    descriptionEn:
      "An open-plan Italian minimalist kitchen with waterfall Calacatta marble island, anti-fingerprint matte cabinetry, and concealed barista station.",
    palette: ["#1D1D20", "#FFFFFF", "#C5A880", "#8E8880"],
    features: [
      "جزيرة مطبخ رخام كلكتا طبيعي مع إضاءة محيطية سفلية",
      "أجهزة مطبخ ألمانية مدمجة مخفية بالكامل",
      "إضاءة حساسة للحركة تحت الخزائن العلوية",
      "ركن قهوة وبوفيه بأبواب تنزلق وتختفي جانبياً (Pocket Doors)",
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
    title: "كافيه واستراحة لوميير - تجربة ضيافة حيوية",
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
      "تصميم تجاري لمشروع ضيافة يدمج بين خرسانة المايكروسيمنت، الأقواس الناعمة، والنباتات الطبيعية لتوفير بيئة اجتماعية مرحبة ومريحة بصرياً.",
    descriptionEn:
      "A commercial café concept designed with micro-cement textures, soft architectural arches, and indoor flora for an uplifting social atmosphere.",
    palette: ["#2B2A27", "#76806C", "#DFBE95", "#E8E2D7"],
    features: [
      "جدار نباتي طبيعي بنظام ري وإضاءة نمو مدمجة",
      "بار قهوة مقوس مكسو بقطع التيرازو المصنوعة يدوياً",
      "جلسات متباينة تجمع بين الطاولات المرتفعة والأرائك الوثيرة",
      "معالجات صوتية معمارية للأسقف للحد من الصدى والضوضاء",
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
      "استقبال رئيسي ممتد بارتفاع سقف 6 أمتار؛ استثمرت الارتفاع المزدوج بجدارية حجرية منحوتة ومدفأة بيوإيثانول عصرية مع إطلالة بانورامية على الحديقة.",
    descriptionEn:
      "A grand double-height reception featuring a 6-meter ceiling, bookmatched stone feature wall, modern linear bioethanol fireplace, and garden vistas.",
    palette: ["#161619", "#B89B72", "#EBE5D8", "#635D55"],
    features: [
      "جدارية رخام أونيكس طبيعي بإضاءة خلفية دافئة",
      "مدفأة بيوإيثانول خطية أنيقة صديقة للبيئة",
      "تكييف مركزي خفي بشبكات تدفق خطية معمارية",
      "ثريا معاصرة مخصصة بارتفاع 4 أمتار",
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
    title: "مقر شركة فالكون - قاعة الاجتماعات والمكاتب التنفيذية",
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
    style: "مودرن كوربوريت تنفيذي",
    styleEn: "Modern Executive Corporate",
    description:
      "تصميم مساحات عمل تنفيذية تعزز الإلهام والإنتاجية؛ صممت قاعة الاجتماعات الذكية بتجاليد جلدية وخشبية عازلة للصوت مع حلول إضاءة تتكيف مع فترات اليوم.",
    descriptionEn:
      "Executive corporate workspace designed with acoustic leather panels, walnut joinery, and circadian lighting systems tailored for focus and prestige.",
    palette: ["#111317", "#2D3748", "#C5A880", "#CBD5E0"],
    features: [
      "طاولة اجتماعات مخصصة تتسع لـ 18 شخصاً مع منافذ ذكية مدمجة",
      "قواطع زجاجية ذكية (Smart Glass) للخصوصية بضغطة زر",
      "إضاءة بيوديناميكية تتغير حسب ساعات العمل",
      "كابينات عازلة للصوت للمكالمات الهاتفية الفردية",
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
  {
    id: "lighting-automation",
    title: "هندسة الإضاءة المعمارية والأجواء الدافئة",
    titleEn: "Architectural Lighting & Atmosphere",
    description:
      "الإضاءة هي توقيعي الخاص؛ أدرس زوايا سقوط الضوء وتوزيع درجات الحرارة الدافئة 3000K والإنارة المخفية لتحويل منزلك إلى ملاذ هادئ ومريح.",
    descriptionEn:
      "Lighting is my signature touch. I calculate lux levels, 3000K warm color temperatures, and concealed linear LEDs to make your space genuinely soothing.",
    iconName: "Sparkles",
    features: [
      "توزيع وحدات التراك لايت المغناطيسي الحديث (Magnetic Track)",
      "تصميم سيناريوهات الإضاءة المسائية والصباحية الهادئة",
      "إضاءات خفية للأرفف والبانوهات الجدارية والأرضيات",
      "تكامل مع أنظمة التحكم الذكي (Smart Lighting Control)",
    ],
    featuresEn: [
      "Modern recessed magnetic track light systems",
      "Morning, evening, and relaxed warm ambient presets",
      "Concealed backlights for wall fluting, niches, and joinery",
      "Seamless integration with smart lighting controllers",
    ],
  },
  {
    id: "site-supervision",
    title: "المخططات التنفيذية وجداول الكميات (Shop Drawings)",
    titleEn: "Executive Blueprints & BOQ Specifications",
    description:
      "أقدم لك ملفاً هندسياً متكاملاً يتضمن المقاسات الدقيقة، تفريد الأخشاب، ومواصفات الخامات لتكون لديك خريطة طريق واضحة وقابلة للتنفيذ بكل ثقة.",
    descriptionEn:
      "A complete technical execution package including exact dimensions, joinery details, and material specifications for total execution confidence.",
    iconName: "Compass",
    features: [
      "مخططات الكهرباء والإنارة والمفاتيح (Lighting & Power)",
      "رسومات تفصيلية لتجاليد الجدران ووحدات الأثاث",
      "جدول كميات ومواصفات المواد وأكواد الدهانات المعتمدة",
      "مطابقة الأعمال الموقعية للأصول الهندسية المعتمدة",
    ],
    featuresEn: [
      "Complete electrical, switching, and plumbing layouts",
      "Detailed shop drawings for wall cladding and joinery",
      "Bill of quantities with exact paint codes and material specs",
      "On-site technical inspection ensuring construction integrity",
    ],
  },
  {
    id: "consultation-styling",
    title: "استشارات الديكور والتنسيق النهائي (Interior Styling)",
    titleEn: "Interior Styling & Decor Consultation",
    description:
      "جلسات استشارية فردية أساعدك فيها على اختيار الألوان، السجاد، اللوحات الفنية، والإكسسوارات لخلق تناغم جمالي مفعم بالحياة في منزلك القائم أو الجديد.",
    descriptionEn:
      "One-on-one styling sessions where I curate accessories, curated artwork, rugs, and drapery to breathe character and harmony into your space.",
    iconName: "Palette",
    features: [
      "اختيار اللوحات الجدارية والمنحوتات الفنية المتناسقة",
      "تنسيق السجاد والستائر والوسائد والأقمشة التكميلية",
      "انتقاء وتوزيع النباتات الطبيعية الملائمة لإضاءة المكان",
      "زيارات ميدانية مشتركة لمعارض الأثاث والخامات لاختيار الأنسب",
    ],
    featuresEn: [
      "Curation of original contemporary wall art and sculptures",
      "Harmonious rug, curtain, and soft textile coordination",
      "Selection of interior greenery matching natural light levels",
      "Personal accompanied showroom visits for material selection",
    ],
  },
];

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

export const STATS = [
  { value: "+85", label: "مشروع صممته وأشرفت عليه", labelEn: "Completed Designs" },
  { value: "+7", label: "سنوات خبرة في التصميم", labelEn: "Years of Experience" },
  { value: "100%", label: "تطابق الرندر مع التنفيذ", labelEn: "Design Fidelity" },
  { value: "4.98", label: "تقييم رضا العملاء", labelEn: "Client Satisfaction ★" },
];

export const FAQS = [
  {
    q: "كيف يتم العمل مع م. آلاء عيسى؟",
    qEn: "How does working with Eng. Alaa Issa work?",
    a: "تبدأ الرحلة بجلسة تعارف واستشارة أولية لمناقشة أفكارك والمساحة المتاحة، ثم أقوم بإعداد دراسة توزيع الفراغات والتصميم ثلاثي الأبعاد 3D. بعد اعتمادك للتصميم، أزودك بالمخططات التنفيذية أو أتولى الإشراف المباشر على التنفيذ حتى تسليم المفتاح.",
  },
  {
    q: "هل يمكنني طلب التصميم 3D والمخططات فقط؟",
    qEn: "Can I request 3D design and blueprints only?",
    a: "نعم بالتأكيد؛ أقدم باقة 'التصميم والمخططات التنفيذية الشاملة' (Shop Drawings) والتي تمنحك دليلاً هندسياً كاملاً بالمقاسات وأكواد الدهانات وتفاصيل النجارة لتتمكن من تنفيذه بسهولة مع فريقك المفضل.",
  },
  {
    q: "هل تشرف م. آلاء عيسى على موقع التنفيذ شخصياً؟",
    qEn: "Does Eng. Alaa Issa personally supervise the site?",
    a: "نعم، في باقات الإشراف والتنفيذ الكامل أقوم بزيارات ميدانية دورية لمتابعة أدق التفاصيل من تأسيسات السباكة والكهرباء وحتى تركيب الأخشاب والرخام لضمان مطابقة الواقع للتصميم المعتمد.",
  },
  {
    q: "ما هو الطراز الذي تتميز به تصاميم م. آلاء؟",
    qEn: "What design style does Eng. Alaa specialize in?",
    a: "أتميز بطراز المودرن جاباندي الدافئ (Warm Japandi)، النيو كلاسيك المعاصر، والمينيماليزم الهادئ (Quiet Luxury) الذي يركز على الخامات الطبيعية، البانوهات الخشبية، ودرجات الإضاءة الدافئة والمريحة للأعصاب.",
  },
];
