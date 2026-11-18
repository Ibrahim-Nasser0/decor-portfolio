-- ==============================================================================
-- SUPABASE SCHEMA & INITIAL SEED FOR ENG. ALAA ISSA ARCHITECTURAL PORTFOLIO
-- Execute this entire file in your Supabase Project: Dashboard > SQL Editor > New Query > Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('living', 'bedroom', 'kitchen', 'commercial', 'villas')),
  category_label TEXT NOT NULL,
  category_label_en TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  before_image TEXT,
  location TEXT NOT NULL,
  location_en TEXT NOT NULL,
  year TEXT NOT NULL,
  area TEXT NOT NULL,
  style TEXT NOT NULL,
  style_en TEXT NOT NULL,
  description TEXT NOT NULL,
  description_en TEXT NOT NULL,
  concept_en TEXT,
  challenge_en TEXT,
  solution_en TEXT,
  materials_description_en TEXT,
  palette TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  specs JSONB,
  angles JSONB DEFAULT '[]',
  material_swatches JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DESIGNER PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.designer_profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  subtitle_ar TEXT,
  subtitle_en TEXT,
  location_ar TEXT,
  location_en TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  linkedin TEXT,
  instagram TEXT,
  about_intro_ar TEXT NOT NULL,
  about_intro_en TEXT NOT NULL,
  about_experience_ar TEXT NOT NULL,
  about_experience_en TEXT NOT NULL,
  statement_ar TEXT NOT NULL,
  statement_en TEXT NOT NULL,
  software JSONB DEFAULT '[]',
  skills JSONB DEFAULT '{}',
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLIENT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.client_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  service_type TEXT,
  area_size TEXT,
  budget_range TEXT,
  message TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designer_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
DROP POLICY IF EXISTS "Admin can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Public can view profile" ON public.designer_profile;
DROP POLICY IF EXISTS "Admin can manage profile" ON public.designer_profile;
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.client_inquiries;
DROP POLICY IF EXISTS "Admin can manage inquiries" ON public.client_inquiries;

-- Public READ for portfolio data
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view profile" ON public.designer_profile FOR SELECT USING (true);

-- Public INSERT for inquiries (visitors booking or inquiring)
CREATE POLICY "Public can submit inquiries" ON public.client_inquiries FOR INSERT WITH CHECK (true);

-- Authenticated (Admin) FULL ACCESS
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage profile" ON public.designer_profile FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage inquiries" ON public.client_inquiries FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 6. STORAGE BUCKET (portfolio-media)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public can read portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete portfolio media" ON storage.objects;

CREATE POLICY "Public can read portfolio media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can upload portfolio media" ON storage.objects 
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can update portfolio media" ON storage.objects 
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can delete portfolio media" ON storage.objects 
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');

-- ==============================================================================
-- 7. INITIAL DATA SEEDING (Eng. Alaa Issa Portfolio)
-- ==============================================================================

-- 7.1 Seed Designer Profile
INSERT INTO public.designer_profile (
  id, name_ar, name_en, title_ar, title_en, subtitle_ar, subtitle_en,
  location_ar, location_en, email, phone, whatsapp_number, linkedin, instagram,
  about_intro_ar, about_intro_en, about_experience_ar, about_experience_en,
  statement_ar, statement_en, software, skills, experience, education
) VALUES (
  'main',
  'م. آلاء عيسى',
  'ALAA ISSA',
  'مهندسة تصميم داخلي وديكور معماري',
  'INTERIOR ARCHITECTURE & DESIGN',
  'أعمال مختارة | 2026-2027',
  'SELECTED WORKS | 2026-2027',
  'القاهرة | مصر',
  'CAIRO | EGYPT',
  'alaa.issa.design@gmail.com',
  '+20 100 000 0000',
  '201000000000',
  'Alaa Issa',
  '@alaaissa.interiors',
  'كمهندسة تصميم داخلي ومعماري، يلهمني ابتكار مساحات تجمع بين الوظيفة، الإبداع، والقيمة الجمالية الخالدة. على مدار مسيرتي المهنية، طورت أساساً متيناً في التخطيط المكاني، اختيار الخامات، الإضاءة المعمارية، تصميم الأثاث المخصص، والنمذجة ثنائية وثلاثية الأبعاد (2D/3D). أستمتع بتحويل الأفكار إلى تصاميم مدروسة تعكس احتياجات العميل وهويته، وتبرز الطابع المعماري الفريد للفراغ.',
  'As an Interior Architect and Designer, I am passionate about creating spaces that combine functionality, creativity, and aesthetic value. Throughout my professional journey, I have developed a strong foundation in space planning, material selection, lighting, bespoke furniture design, and 2D/3D visualization. I enjoy transforming ideas into thoughtful designs that reflect both the needs of the user and the character of the space.',
  'أتاحت لي مسيرتي العمل على باقة متنوعة من المشاريع السكنية والتجارية الفاخرة، مما عزز قدرتي على مقاربة كل مشروع بحلول إبداعية مبتكرة، واهتمام دقيق بأدق التفاصيل، وإدارة للتنفيذ تحول المخططات إلى واقع حي يفوق التوقعات.',
  'My professional practice has allowed me to work on a variety of residential and commercial design projects, strengthening my ability to approach each space with creativity, attention to detail, and problem-solving skills. I am eager to continue growing and creating meaningful spaces that leave a lasting impact.',
  'كمهندسة تصميم داخلي، أتميز بقدرتي على دمج التقنيات الهندسية المتقدمة مع الإحساس الفني الفطري لخلق فراغات تتسم بالجمال والراحة الوظيفية العالية. يتيح لي إدراكي الدقيق للتفاصيل وقدرتي على استشعار احتياجات الساكنين تحويل الأفكار المجردة إلى مفاهيم مبتكرة ومتماسكة.',
  'As a designer, I stand out for my ability to combine advanced techniques with innate creativity to bring to life spaces that are both aesthetic and functional. My keen sense of detail and my capacity to anticipate users'' needs allow me to transform abstract ideas into innovative and coherent concepts. Always in search of the latest trends and technologies, I fully invest myself in each project, prioritizing close and transparent collaboration with my clients to ensure a final result that exceeds expectations.',
  '[
    {"name": "3ds Max", "role": "3D Modeling & Rendering", "badge": "3MAX", "color": "bg-blue-600 text-white"},
    {"name": "V-Ray / Corona", "role": "Photorealistic Engines", "badge": "VR", "color": "bg-amber-600 text-white"},
    {"name": "AutoCAD", "role": "2D Plans & Working Drawings", "badge": "CAD", "color": "bg-red-600 text-white"},
    {"name": "SketchUp", "role": "Concept Massing & Quick 3D", "badge": "SKP", "color": "bg-blue-500 text-white"},
    {"name": "Photoshop", "role": "Post-Production & Moodboards", "badge": "Ps", "color": "bg-sky-800 text-white"},
    {"name": "Revit", "role": "BIM & Construction Documents", "badge": "RVT", "color": "bg-indigo-700 text-white"}
  ]'::jsonb,
  '{
    "technicalEn": [
      "Space Planning & Circulation Diagrams",
      "Architectural Lighting Design & Lux Calculations",
      "Material Boards & Tactile Curation",
      "Executive Shop Drawings & Joinery Detailing",
      "Turnkey Site Supervision & Quality Control",
      "Bill of Quantities (BOQ) & Budget Oversight"
    ],
    "technicalAr": [
      "توزيع الفراغات ودراسة مسارات الحركة (Circulation)",
      "هندسة الإضاءة وحسابات شدة الإنارة وتوزيع اللوكس",
      "إعداد لوحات الخامات واختيار عينات الأخشاب والرخام",
      "المخططات التنفيذية وتفريد وحدات النجارة (Shop Drawings)",
      "الإشراف الموقعي المباشر وضمان الجودة",
      "إعداد جداول الكميات (BOQ) وضبط الميزانيات"
    ],
    "hobbiesEn": [
      "Artistic Creation: Spatial sketching, oil painting, and tactile material experiments.",
      "Architectural Exploration: Immersive travels studying regional building traditions and classical proportions.",
      "Photography & Framing: Capturing shadows, natural light shifts, and micro-textures in built environments."
    ],
    "hobbiesAr": [
      "الإبداع الفني: الرسم اليدوي، استكشاف ملامس الخامات الطبيعية، وتجارب الألوان.",
      "الاستكشاف المعماري: السفر لدراسة المدارس المعمارية العالمية وتفاصيل العمارة التاريخية والحديثة.",
      "التصوير المعماري: توثيق حركة الضوء الطبيعي والظلال والملامس الدقيقة في الفراغات."
    ],
    "languages": [
      {"nameEn": "ARABIC", "nameAr": "العربية", "levelEn": "Native", "levelAr": "اللغة الأم"},
      {"nameEn": "ENGLISH", "nameAr": "الإنجليزية", "levelEn": "Fluent / Professional", "levelAr": "إتقان مهني كامل"},
      {"nameEn": "FRENCH", "nameAr": "الفرنسية", "levelEn": "Working Proficiency", "levelAr": "مستوى عملي"}
    ]
  }'::jsonb,
  '[
    {
      "period": "2024 – PRESENT",
      "role": "Lead Interior Architect & Design Consultant",
      "company": "Alaa Issa Studio & Architectural Practice",
      "location": "Cairo, Egypt",
      "description": "Directing bespoke residential retreats, luxury penthouses, and boutique commercial interiors. Leading space planning, 3D visualization, detailed millwork shop drawings, and turnkey site quality supervision.",
      "skills": ["Space Planning", "Custom Joinery Detailing", "Circadian Lighting", "Turnkey Supervision"]
    },
    {
      "period": "2022 – 2024",
      "role": "Interior Design Architect",
      "company": "Atelier Arch & Spatial Design",
      "location": "New Cairo, Egypt",
      "description": "Developed comprehensive interior architectural schemes for private villas. Engineered custom millwork details, calculated architectural lux distributions, and produced contractor working drawings.",
      "skills": ["3ds Max / Corona", "CAD Working Drawings", "BOQ Oversight", "Natural Stone Curation"]
    },
    {
      "period": "2020 – 2022",
      "role": "Architectural Visualizer & Junior Designer",
      "company": "Blueprint Architectural Consultancy",
      "location": "Giza, Egypt",
      "description": "Created photorealistic 3D spatial renders, VR walkthroughs, and municipal drawings. Conducted physical site surveys and coordinated material finish palettes.",
      "skills": ["3D Photorealism", "AutoCAD 2D", "Revit BIM", "Physical Site Surveying"]
    }
  ]'::jsonb,
  '[
    {
      "year": "2020 – 2024",
      "titleEn": "Bachelor''s Degree in Architectural Engineering & Interior Architecture",
      "titleAr": "بكالوريوس الهندسة المعمارية والتصميم الداخلي",
      "institutionEn": "Faculty of Fine Arts & Architecture",
      "institutionAr": "كلية الفنون الجميلة والعمارة",
      "descEn": "Graduated with honors, focusing on sustainable residential spaces and spatial ergonomics.",
      "descAr": "تخرج مع مرتبة الشرف مع التركيز على التصميم السكني المستدام والارغونوميكس المكاني."
    },
    {
      "year": "2024 – 2025",
      "titleEn": "Advanced Certification in Lighting Architecture & Joinery Detailing",
      "titleAr": "دبلوم متقدم في هندسة الإضاءة المعمارية وتفاصيل النجارة",
      "institutionEn": "Institute of Interior Detailing",
      "institutionAr": "معهد التفاصيل المعمارية المتقدمة",
      "descEn": "Specialized in 3000K warm circadian lighting systems and custom joinery production.",
      "descAr": "تخصص في أنظمة الإضاءة الإيقاعية الدافئة وتصنيع الأثاث المخصص."
    }
  ]'::jsonb
) ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- 7.2 Seed Projects
INSERT INTO public.projects (
  id, title, title_en, category, category_label, category_label_en,
  cover_image, gallery, before_image, location, location_en, year, area,
  style, style_en, description, description_en, concept_en, challenge_en, solution_en,
  materials_description_en, palette, features, features_en, featured, display_order,
  specs, angles, material_swatches
) VALUES
(
  'luxury-japandi-residence',
  'ريزيدنس التجمع - صالون مودرن جاباندي دافئ',
  'Tagamoa Residence - Warm Japandi Living Suite',
  'living',
  'صالونات ومعيشة',
  'Living & Lounges',
  '/images/projects/project-1.jpg',
  ARRAY['/images/projects/project-1.jpg', '/images/projects/project-2.jpg', '/images/projects/project-3.jpg', '/images/projects/project-4.jpg'],
  '/images/projects/project-1-orig.jpg',
  'القاهرة الجديدة، التجمع الخامس',
  'New Cairo, 5th Settlement',
  '2026',
  '75 m²',
  'Japandi Warm Minimalist',
  'Japandi Warm Minimalist',
  'تصميم صالون واستقبال نفذته برؤية جاباندي معاصرة؛ ركزت على تناغم درجات البيج والرمادي الدافئ مع خشب الجوز الداكن والبانوهات المخططة رأسياً، مدعومة بإضاءات مخفية 3000K لمنح الفراغ سكينة بصرية وشعوراً بالاتساع والهدوء.',
  'A complete living room & lounge space embodying contemporary Japandi aesthetic. Warm earth tones meet dark walnut wood panels, vertical fluting, and 3000K concealed warm LED lighting for supreme visual tranquility.',
  'Space organization is centered around the concept of a seamless modern agora. In classical architecture, circulation was continuous and filled with natural daylight. The interior circulation here recreates this organic activity, with all functional zones radiating from the central living lounge bathed in balanced 3000K warm illumination.',
  'A raw concrete shell with an obstructive structural column right in the primary sightline and low natural daylight levels in the rear circulation passage.',
  'Absorbed the column into an integrated fluted walnut media feature wall with hidden acoustic dampening. Layered 3000K indirect ceiling coves cast a warm, continuous zenith wash simulating natural morning sunlight.',
  'Centered around richly veined natural marble, warm walnut wood, and textured wall fluting. Soft ambient lighting enhances the natural textures while adding warmth and visual depth. A palette of earthy tones, deep browns, and warm cream accents evokes comfort, relaxation, and intimate quiet luxury.',
  ARRAY['#E7E3DC', '#4A3A2C', '#A2907D', '#1C1B1F', '#D0BA98'],
  ARRAY[
    'تكسيات خشبية رأسية مدمجة مع بانوهات عازلة للصوت',
    'إضاءة خطية مخفية مدروسة مع سيناريوهات إضاءة ذكية',
    'طقم جلوس زاوية مخصص من قماش البوكليه الفاخر',
    'وحدة تلفزيون عائمة مع أرفف ديكورية مدمجة',
    'سجادة منسوجة يدوياً بتدرجات طبيعية رخامية'
  ],
  ARRAY[
    'Custom vertical fluted wall cladding with acoustic backing',
    'Concealed architectural linear lighting with smart scene control',
    'Bespoke modular sofa in textured boucle upholstery',
    'Floating minimalist media unit with integrated display niche',
    'Handmade textured wool rug with subtle organic veins'
  ],
  true,
  1,
  '{
    "scopeEn": "Turnkey Interior Architecture, 3D Visualization, Shop Drawings & Site Supervision",
    "durationEn": "6 Weeks Design • 14 Weeks Turnkey Execution",
    "lightingEn": "3000K Warm Circadian Linear LED with Smart Dimming Scenes",
    "flooringEn": "Natural Botticino Marble Slabs & Acoustic Underlayment",
    "joineryEn": "Bespoke Walnut Vertical Fluting with Concealed Storage"
  }'::jsonb,
  '[
    {"titleEn": "Panoramic Lounge View", "image": "/images/projects/project-1.jpg"},
    {"titleEn": "Symmetry & Perspective", "image": "/images/projects/project-2.jpg"},
    {"titleEn": "Media Unit & Wall Fluting", "image": "/images/projects/project-3.jpg"},
    {"titleEn": "Corner Lounge & Bouclé", "image": "/images/projects/project-4.jpg"}
  ]'::jsonb,
  '[
    {"color": "#E7E3DC", "nameEn": "Travertine Navona", "finishEn": "Honed & Unfilled Natural Slab"},
    {"color": "#4A3A2C", "nameEn": "Smoked American Walnut", "finishEn": "Matte Fluted Wall Millwork"},
    {"color": "#A2907D", "nameEn": "Textured Bouclé", "finishEn": "Custom Curved Sectional Upholstery"},
    {"color": "#1C1B1F", "nameEn": "Anodized Gunmetal", "finishEn": "Hairline Shadow Gap Reveals"},
    {"color": "#D0BA98", "nameEn": "Circadian Linear LED", "finishEn": "3000K Architectural 95+ CRI"}
  ]'::jsonb
),
(
  'dunes-master-suite',
  'فيلا ديونز - جناح النوم الرئيسي الفاخر',
  'Dunes Villa - Master Bedroom Suite',
  'bedroom',
  'أجنحة النوم',
  'Master Bedrooms',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'الشيخ زايد، بيفرلي هيلز',
  'Sheikh Zayed, Beverly Hills',
  '2026',
  '58 m²',
  'نيو كلاسيك مودرن هادئ',
  'Quiet Luxury Neoclassical',
  'ملاذ هادئ يجمع بين البساطة والرفاهية، صُمم السرير بظهر جلدي مبطن وألواح خشبية دافئة مع غرفة ملابس مفتوحة وحمام رخامي متصل.',
  'A serene retreat marrying minimalist tranquility with refined luxury. Features custom upholstered headboard, integrated walk-in dressing suite, and master ensuite bathroom.',
  'Conceived as an acoustic sanctuary for restorative rest. The bedroom balances tactile warmth with architectural serenity. The spatial hierarchy smoothly leads from the sleeping chamber through a smoked-glass portal into an organized walk-in dressing suite and private ensuite marble bath.',
  'Creating an acoustic sleep sanctuary shielded from exterior noise while unifying a wide, awkward bedroom footprint with the dressing corridor without heavy compartmentalizing walls.',
  'Engineered a full-width acoustic upholstered headboard that buffers vibrations, and integrated a transparent smoked-glass portal into the walk-in dressing suite, preserving visual depth while granting distinct functional privacy.',
  'Subtle plaster wall coatings in oatmeal tones, natural French oak herringbone flooring, and brushed champagne bronze fittings. Hidden perimeter cove lighting frames the bespoke headboard without harsh glare.',
  ARRAY['#F2EDE4', '#3D3A36', '#B8A38E', '#E2D3BE'],
  ARRAY[
    'لوح سرير ممتد بعرض الجدار مع إضاءة قراءة مدمجة',
    'خزائن ملابس مخصصة بزجاج عاكس وإضاءة داخلية',
    'أرضيات خشب باركيه صلب بتصميم هيرنجبون الفرنسي',
    'ستائر كهربائية ذكية مع تحكم مركزي'
  ],
  ARRAY[
    'Wall-to-wall integrated headboard with recessed reading lights',
    'Smoked glass walk-in wardrobe with auto-sensor lighting',
    'French herringbone natural engineered hardwood flooring',
    'Smart motorized blackout drapery system'
  ],
  true,
  2,
  '{
    "scopeEn": "Master Suite Architecture, Joinery Detailing & Furnishing Curation",
    "durationEn": "4 Weeks Design • 8 Weeks Execution",
    "lightingEn": "2700K-3000K Tunable Warm Glare-Free Ambient & Bedside Optics",
    "flooringEn": "French Herringbone Natural Engineered Hardwood",
    "joineryEn": "Floor-to-Ceiling Smoked Glass Wardrobes with Integrated LED Rails"
  }'::jsonb,
  '[
    {"titleEn": "Master Suite Horizon", "image": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Reading Alcove & Bench", "image": "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Dressing Portal & Texture", "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"}
  ]'::jsonb,
  '[
    {"color": "#F2EDE4", "nameEn": "Oatmeal Lime Plaster", "finishEn": "Hand-Troweled Matte Finish"},
    {"color": "#3D3A36", "nameEn": "Smoked Fluted Glass", "finishEn": "Dark Bronze Anodized Framing"},
    {"color": "#B8A38E", "nameEn": "French White Oak", "finishEn": "Herringbone Engineered Parquet"},
    {"color": "#E2D3BE", "nameEn": "Italian Nubuck Suede", "finishEn": "Padded Acoustic Headboard"}
  ]'::jsonb
),
(
  'skyline-penthouse-kitchen',
  'بنتهاوس الأفق - المطبخ الإيطالي المفتوح',
  'Skyline Penthouse - Open Italian Kitchen',
  'kitchen',
  'مطابخ وحمامات',
  'Kitchens & Baths',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'المعادي، كورنيش النيل',
  'Maadi, Nile Corniche',
  '2025',
  '48 m²',
  'مودرن ألترا مينيمال',
  'Ultra-Minimalist Modern',
  'مطبخ جزيرة مفتوح يتصل بغرفة الطعام، مستوحى من خطوط المطابخ الإيطالية المعاصرة؛ أسطح من حجر الكلكتا الطبيعي وأبواب بدون مقابض بتقنية الفتح باللمس.',
  'Open-concept island kitchen seamlessly connecting with the grand dining area. Calacatta marble surfaces and matte handle-less cabinetry with integrated appliances.',
  'An architectural culinary centerpiece conceived as an open social monolith. The massive Calacatta marble island defines circulation, connecting high-efficiency culinary workstations with open-plan formal dining overlooking panoramic skyline views.',
  'Integrating intensive culinary prep equipment within an open-plan luxury living space without grease dispersion, visible kitchen clutter, or loud mechanical equipment.',
  'Engineered a sculptural 4.2-meter Calacatta marble island with silent flush downdraft extraction, and flanked the back-wall with motorized pocket doors that effortlessly conceal small appliances and the barista station when entertaining.',
  'Bookmatched Calacatta marble with gold veining, matte anti-fingerprint thermal laminate cabinetry in graphite, and satin brass reveals. Under-counter recessed channels yield clean, shadow-line aesthetics.',
  ARRAY['#1D1D20', '#FFFFFF', '#C5A880', '#8E8880'],
  ARRAY[
    'جزيرة مطبخ شلالية من رخام كلكتا طبيعي مقاوم للحرارة',
    'أجهزة كهربائية ألمانية مدمجة كلياً داخل التجاليد',
    'إضاءة تحت الخزائن مع حساسات حركة خفية',
    'ركن قهوة وبوفيه مدمج بأبواب قابلة للطي والاختفاء'
  ],
  ARRAY[
    'Calacatta waterfall island with under-counter ambient glow',
    'Concealed high-end German integrated kitchen appliances',
    'Hidden motion-activated under-cabinet lighting',
    'Pocket-door breakfast and barista station'
  ],
  true,
  3,
  '{
    "scopeEn": "Full Kitchen Architecture, MEP Layouts, Custom Cabinetry & Appliance Integration",
    "durationEn": "5 Weeks Design • 10 Weeks Execution",
    "lightingEn": "High CRI 95+ Task Lighting (4000K) with 2700K Accent Mood Channels",
    "flooringEn": "Large-Format 120x120cm Honed Porcelain Slabs",
    "joineryEn": "Custom German Blum Servo-Drive Motorized Pocket Doors"
  }'::jsonb,
  '[
    {"titleEn": "Waterfall Island Monolith", "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Dining & Culinary Flow", "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Concealed Barista Station", "image": "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"}
  ]'::jsonb,
  '[
    {"color": "#1D1D20", "nameEn": "Graphite Fenix NTM", "finishEn": "Thermal Anti-Fingerprint Matte"},
    {"color": "#FFFFFF", "nameEn": "Calacatta Gold Marble", "finishEn": "Bookmatched 20mm Honed Slab"},
    {"color": "#C5A880", "nameEn": "Satin Champagne Brass", "finishEn": "Recessed Continuous J-Pull Channels"},
    {"color": "#8E8880", "nameEn": "Italian Porcelain Slab", "finishEn": "120x120cm Seamless Honed Tiles"}
  ]'::jsonb
),
(
  'lumiere-lounge-cafe',
  'كافيه واستراحة لوميير - تجربة ضيافة استثنائية',
  'Lumière Boutique Lounge & Café',
  'commercial',
  'تجاري وإداري',
  'Commercial & Retail',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  'ووترواي، التجمع الخامس',
  'Waterway, New Cairo',
  '2026',
  '190 m²',
  'بيوفيليك مودرن (Biophilic Contemporary)',
  'Biophilic Contemporary',
  'تصميم مساحة ضيافة معمارية تمزج بين الخرسانة الممسوسة، الأقواس الناعمة، والمسطحات النباتية الحية مع إنارة سينمائية جذابة تناسب جلسات العمل واللقاءات.',
  'Hospitality interior blending micro-cement finishes, soft architectural arches, living green walls, and moody warm lighting tailored for social moments.',
  'Biophilic hospitality experience that invites urbanites into a sculpted, earthy oasis. Curving architectural arches guide guests through varying intimacy zones—from sunlit espresso bars to cozy velvet dining nooks framed by organic foliage.',
  'A high-traffic concrete commercial shell with reverberant acoustic echo, demanding both high table turnover for morning espresso and intimate plush seating for evening lounge patrons.',
  'Introduced continuous slatted acoustic timber ceilings and fluted arches that dramatically lower reverberation time. Structured spatial flow into two micro-climates: a dynamic terrazzo espresso bar at the front and secluded velvet alcoves at the rear.',
  'Poured terrazzo counters embedded with river pebbles, micro-cement walls in sage and travertine hues, fluted glass partitions, and lush preserved vertical plant arrays.',
  ARRAY['#2B2A27', '#76806C', '#DFBE95', '#E8E2D7'],
  ARRAY[
    'جدار نباتي حي مزود بنظام ري وإضاءة نمو ذكية',
    'بار قهوة مقوس مكسو بقطع التيرازو المصنوعة يدوياً',
    'جلسات متباينة تجمع بين الطاولات المرتفعة والأرائك الوثيرة',
    'توزيع صوتي محيطي ومواد ماصة للصدى لراحة الرواد'
  ],
  ARRAY[
    'Living green wall with automated smart irrigation and grow lights',
    'Curved handcrafted terrazzo espresso bar',
    'Zoned seating offering collaborative high tables and plush banquettes',
    'Architectural acoustic ceiling treatments for intimate ambience'
  ],
  true,
  4,
  '{
    "scopeEn": "Commercial Hospitality Architecture, Acoustical Engineering & Turnkey Fit-Out",
    "durationEn": "8 Weeks Design • 16 Weeks Fast-Track Fit-Out",
    "lightingEn": "Architectural Track Spotlights with Scene Automation (Morning / Dusk / Night)",
    "flooringEn": "Seamless Polished Micro-cement with Brass Inlay Dividers",
    "joineryEn": "Custom Curved Terrazzo Bar Counter & Floating Oak Banquettes"
  }'::jsonb,
  '[
    {"titleEn": "Espresso Bar & Arches", "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Collaborative Lounge Banquettes", "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"},
    {"titleEn": "Living Green Wall Alcove", "image": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80"}
  ]'::jsonb,
  '[
    {"color": "#2B2A27", "nameEn": "Charcoal Slatted Oak", "finishEn": "Acoustic Backed Fluted Wall"},
    {"color": "#76806C", "nameEn": "Sage Green Micro-cement", "finishEn": "Hand-Applied Mineral Stucco"},
    {"color": "#DFBE95", "nameEn": "Handmade Terrazzo", "finishEn": "Polished River Pebble Aggregates"},
    {"color": "#E8E2D7", "nameEn": "Antiqued Architectural Brass", "finishEn": "Custom Arch Trim & Lighting Stems"}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- End of schema & seed
