-- ==============================================================================
-- SUPABASE MODULAR NORMALIZED SCHEMA (100% ENGLISH - ZERO ARABIC)
-- WITH COMPLETE SEED DATA & STORAGE BUCKETS
-- ==============================================================================
-- Instructions:
-- 1. Open your Supabase Project: Dashboard > SQL Editor > New Query
-- 2. Paste this entire file and click "Run"
-- 3. Drops old tables and creates small, cleanly-linked normalized relational tables.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CLEAN WIPE OF PREVIOUS TABLES & VIEWS
DROP VIEW IF EXISTS public.v_projects CASCADE;
DROP VIEW IF EXISTS public.v_designer_profile CASCADE;
DROP VIEW IF EXISTS public.designer_profile CASCADE;

DROP TABLE IF EXISTS public.client_inquiries CASCADE;
DROP TABLE IF EXISTS public.project_palettes CASCADE;
DROP TABLE IF EXISTS public.project_materials CASCADE;
DROP TABLE IF EXISTS public.project_features CASCADE;
DROP TABLE IF EXISTS public.project_angles CASCADE;
DROP TABLE IF EXISTS public.project_gallery CASCADE;
DROP TABLE IF EXISTS public.project_specs CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.project_categories CASCADE;
DROP TABLE IF EXISTS public.project_category CASCADE;
DROP TABLE IF EXISTS public.experience_skills CASCADE;
DROP TABLE IF EXISTS public.experience CASCADE;
DROP TABLE IF EXISTS public.experince CASCADE;
DROP TABLE IF EXISTS public.education CASCADE;
DROP TABLE IF EXISTS public.software_skills CASCADE;
DROP TABLE IF EXISTS public.basic_info CASCADE;
DROP TABLE IF EXISTS public.profile_metrics CASCADE;
DROP TABLE IF EXISTS public.profile_ethos CASCADE;
DROP TABLE IF EXISTS public.profile_images CASCADE;
DROP TABLE IF EXISTS public.contact CASCADE;
DROP TABLE IF EXISTS public.links CASCADE;
DROP TABLE IF EXISTS public.designer_profile CASCADE;

-- ==============================================================================
-- 3. SMALL NORMALIZED TABLES (GROUP 1: IDENTITY & CONTACT)
-- ==============================================================================

-- 3.1 Social & Portfolio Web Links
CREATE TABLE public.links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  linkedin TEXT,
  instagram TEXT,
  behance TEXT,
  pinterest TEXT,
  website TEXT
);

-- 3.2 Contact Coordinates
CREATE TABLE public.contact (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  links_id BIGINT REFERENCES public.links(id) ON DELETE SET NULL
);

-- 3.3 Profile Images (Dedicated Distinct Images for Hero vs About vs CV)
CREATE TABLE public.profile_images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  hero_image_url TEXT NOT NULL DEFAULT '/images/alaa.webp',
  about_image_url TEXT NOT NULL DEFAULT '/images/alaa2.webp',
  avatar_image_url TEXT NOT NULL DEFAULT '/images/alaa.webp'
);

-- 3.4 Profile Ethos, Narrative & Philosophy
CREATE TABLE public.profile_ethos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  intro_summary TEXT NOT NULL,
  practice_narrative TEXT NOT NULL,
  philosophy_statement TEXT NOT NULL
);

-- 3.5 Credibility Metrics
CREATE TABLE public.profile_metrics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  built_works_offset INTEGER NOT NULL DEFAULT 80,
  cad_fidelity INTEGER NOT NULL DEFAULT 100
);

-- 3.6 Basic Info (Core Identity Linking Small Tables)
CREATE TABLE public.basic_info (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL DEFAULT 'Alaa Essa',
  title TEXT NOT NULL DEFAULT 'Interior Architecture & Spatial Design',
  subtitle TEXT DEFAULT 'Selected Works | 2026-2027',
  location TEXT DEFAULT 'Alexandria, Egypt',
  date_of_birth DATE,
  contact_id BIGINT REFERENCES public.contact(id) ON DELETE SET NULL,
  images_id BIGINT REFERENCES public.profile_images(id) ON DELETE SET NULL,
  ethos_id BIGINT REFERENCES public.profile_ethos(id) ON DELETE SET NULL,
  metrics_id BIGINT REFERENCES public.profile_metrics(id) ON DELETE SET NULL
);

-- ==============================================================================
-- 4. SMALL NORMALIZED TABLES (GROUP 2: ARCHITECTURAL PROJECTS)
-- ==============================================================================

-- 4.1 Project Typology / Category
CREATE TABLE public.project_categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- 4.2 Core Project
CREATE TABLE public.projects (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  category_id BIGINT REFERENCES public.project_categories(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  firm TEXT NOT NULL DEFAULT 'Alaa Essa Atelier',
  location TEXT NOT NULL,
  year TEXT NOT NULL DEFAULT '2026',
  area TEXT NOT NULL,
  style TEXT NOT NULL,
  description TEXT NOT NULL,
  concept TEXT,
  challenge TEXT,
  solution TEXT,
  cover_image TEXT NOT NULL,
  before_image TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  include_in_cv BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  gallery TEXT[] DEFAULT '{}',
  palette TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}'::jsonb,
  angles JSONB DEFAULT '[]'::jsonb,
  material_swatches JSONB DEFAULT '[]'::jsonb
);

-- 4.3 Normalized Project Technical Specifications
CREATE TABLE public.project_specs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  scope TEXT,
  duration TEXT,
  lighting TEXT,
  flooring TEXT,
  joinery TEXT,
  firm_ref TEXT DEFAULT 'Alaa Essa Atelier'
);

-- 4.4 Normalized Project Multi-Image Gallery
CREATE TABLE public.project_gallery (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0
);

-- 4.5 Normalized Project 3D Visual Angles & Perspectives
CREATE TABLE public.project_angles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 4.6 Normalized Project Architectural Features
CREATE TABLE public.project_features (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 4.7 Normalized Project Material Swatches
CREATE TABLE public.project_materials (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  finish TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- 4.8 Normalized Project Color Palettes
CREATE TABLE public.project_palettes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  color_hex TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- ==============================================================================
-- 5. SMALL NORMALIZED TABLES (GROUP 3: CAREER, EDUCATION & LEADS)
-- ==============================================================================

-- 5.1 Professional Experience
CREATE TABLE public.experience (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  job_title TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT DEFAULT 'Alexandria, Egypt',
  period TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_present BOOLEAN NOT NULL DEFAULT true,
  work_type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0
);

-- 5.2 Education & Academic Qualifications
CREATE TABLE public.education (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  grade TEXT DEFAULT 'Very Good',
  year TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- 5.3 Software & Visualization Tools
CREATE TABLE public.software_skills (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Rendering & 3D',
  role TEXT DEFAULT '3D Modeling & Visualization',
  badge TEXT DEFAULT '3MAX',
  color TEXT DEFAULT 'bg-blue-600 text-white',
  engine TEXT DEFAULT 'Autodesk',
  deliverable TEXT DEFAULT 'High-Poly 3D Spatial Modeling',
  display_order INTEGER DEFAULT 0
);

-- 5.4 Client Inquiries (Bookings & Leads)
CREATE TABLE public.client_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  client_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  service_type TEXT,
  area_size TEXT,
  budget_range TEXT,
  message TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'archived'))
);

-- ==============================================================================
-- 6. VIEWS FOR SEAMLESS 1-QUERY APPLICATION CONSUMPTION
-- ==============================================================================

-- 6.1 Unified Designer Profile View (Pure English)
CREATE OR REPLACE VIEW public.designer_profile AS
SELECT 
  'main'::text AS id,
  b.name,
  b.name AS name_en,
  b.title,
  b.title AS title_en,
  b.subtitle,
  b.subtitle AS subtitle_en,
  b.location,
  b.location AS location_en,
  c.email,
  c.phone_number AS phone,
  c.whatsapp_number,
  l.linkedin,
  l.instagram,
  l.behance,
  l.pinterest,
  l.website,
  img.hero_image_url,
  img.about_image_url,
  img.avatar_image_url AS avatar_url,
  eth.intro_summary AS about_intro_en,
  eth.practice_narrative AS about_experience_en,
  eth.philosophy_statement AS statement_en,
  met.built_works_offset,
  met.cad_fidelity,
  b.updated_at
FROM public.basic_info b
LEFT JOIN public.contact c ON b.contact_id = c.id
LEFT JOIN public.links l ON c.links_id = l.id
LEFT JOIN public.profile_images img ON b.images_id = img.id
LEFT JOIN public.profile_ethos eth ON b.ethos_id = eth.id
LEFT JOIN public.profile_metrics met ON b.metrics_id = met.id
LIMIT 1;

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_ethos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.basic_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_angles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.software_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

-- Public READ for portfolio data
CREATE POLICY "Public can view links" ON public.links FOR SELECT USING (true);
CREATE POLICY "Public can view contact" ON public.contact FOR SELECT USING (true);
CREATE POLICY "Public can view profile_images" ON public.profile_images FOR SELECT USING (true);
CREATE POLICY "Public can view profile_ethos" ON public.profile_ethos FOR SELECT USING (true);
CREATE POLICY "Public can view profile_metrics" ON public.profile_metrics FOR SELECT USING (true);
CREATE POLICY "Public can view basic_info" ON public.basic_info FOR SELECT USING (true);
CREATE POLICY "Public can view project_categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can view project_specs" ON public.project_specs FOR SELECT USING (true);
CREATE POLICY "Public can view project_gallery" ON public.project_gallery FOR SELECT USING (true);
CREATE POLICY "Public can view project_angles" ON public.project_angles FOR SELECT USING (true);
CREATE POLICY "Public can view project_features" ON public.project_features FOR SELECT USING (true);
CREATE POLICY "Public can view project_materials" ON public.project_materials FOR SELECT USING (true);
CREATE POLICY "Public can view project_palettes" ON public.project_palettes FOR SELECT USING (true);
CREATE POLICY "Public can view experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public can view software_skills" ON public.software_skills FOR SELECT USING (true);

-- Public INSERT for inquiries
CREATE POLICY "Public can submit inquiries" ON public.client_inquiries FOR INSERT WITH CHECK (true);

-- Authenticated (Admin) FULL ACCESS
CREATE POLICY "Admin can manage links" ON public.links FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage contact" ON public.contact FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage profile_images" ON public.profile_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage profile_ethos" ON public.profile_ethos FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage profile_metrics" ON public.profile_metrics FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage basic_info" ON public.basic_info FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_categories" ON public.project_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_specs" ON public.project_specs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_gallery" ON public.project_gallery FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_angles" ON public.project_angles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_features" ON public.project_features FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_materials" ON public.project_materials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage project_palettes" ON public.project_palettes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage experience" ON public.experience FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage education" ON public.education FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage software_skills" ON public.software_skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin can manage inquiries" ON public.client_inquiries FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 8. STORAGE BUCKETS (profile-media & project-media)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('profile-media', 'profile-media', true),
  ('project-media', 'project-media', true),
  ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Profile Media
DROP POLICY IF EXISTS "Public can read profile media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can manage profile media" ON storage.objects;

CREATE POLICY "Public can read profile media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'profile-media');

CREATE POLICY "Admin can manage profile media" ON storage.objects 
  FOR ALL TO authenticated USING (bucket_id = 'profile-media') WITH CHECK (bucket_id = 'profile-media');

-- Storage policies: Project Media
DROP POLICY IF EXISTS "Public can read project media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can manage project media" ON storage.objects;

CREATE POLICY "Public can read project media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'project-media');

CREATE POLICY "Admin can manage project media" ON storage.objects 
  FOR ALL TO authenticated USING (bucket_id = 'project-media') WITH CHECK (bucket_id = 'project-media');

-- Storage policies: Legacy Portfolio Media
DROP POLICY IF EXISTS "Public can read portfolio media" ON storage.objects;
DROP POLICY IF EXISTS "Admin can manage portfolio media" ON storage.objects;

CREATE POLICY "Public can read portfolio media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can manage portfolio media" ON storage.objects 
  FOR ALL TO authenticated USING (bucket_id = 'portfolio-media') WITH CHECK (bucket_id = 'portfolio-media');

-- ==============================================================================
-- 9. COMPLETE SEED DATA (100% ENGLISH)
-- ==============================================================================

-- 9.1 Seed Links
INSERT INTO public.links (id, linkedin, instagram, behance, pinterest, website)
OVERRIDING SYSTEM VALUE
VALUES (
  1,
  'Alaa Essa',
  '@alaaissa.interiors',
  'https://behance.net/alaaessa',
  'https://pinterest.com/alaaessa',
  'https://alaa-essa.vercel.app/'
);

-- 9.2 Seed Contact
INSERT INTO public.contact (id, email, phone_number, whatsapp_number, links_id)
OVERRIDING SYSTEM VALUE
VALUES (
  1,
  'alaaesssaa@gmail.com',
  '+20 1032494616',
  '201032494616',
  1
);

-- 9.3 Seed Profile Images (Hero != About)
INSERT INTO public.profile_images (id, hero_image_url, about_image_url, avatar_image_url)
OVERRIDING SYSTEM VALUE
VALUES (
  1,
  '/images/alaa.webp',   -- Independent Hero Portrait
  '/images/alaa2.webp',  -- Independent About Section Portrait
  '/images/alaa.webp'    -- Navbar Avatar
);

-- 9.4 Seed Profile Ethos & Narrative
INSERT INTO public.profile_ethos (id, intro_summary, practice_narrative, philosophy_statement)
OVERRIDING SYSTEM VALUE
VALUES (
  1,
  'Detail-oriented Interior Designer & 3D Visualization Specialist with a strong academic background from Alexandria University. Highly skilled in translating complex spatial concepts into photorealistic 3D renderings using 3ds Max and Corona Renderer. Passionate about biophilic design, warm earthy aesthetics, organic forms, custom parametric installations, and comprehensive lighting design.',
  'My professional practice has allowed me to work on a variety of residential and commercial design projects, strengthening my ability to approach each space with creativity, attention to detail, and problem-solving skills. I am eager to continue growing and creating meaningful spaces that leave a lasting impact.',
  'As a designer, I stand out for my ability to combine advanced techniques with innate creativity to bring to life spaces that are both aesthetic and functional. My keen sense of detail and my capacity to anticipate users'' needs allow me to transform abstract ideas into innovative and coherent concepts. Always in search of the latest trends and technologies, I fully invest myself in each project, prioritizing close and transparent collaboration with my clients to ensure a final result that exceeds expectations.'
);

-- 9.5 Seed Profile Metrics
INSERT INTO public.profile_metrics (id, built_works_offset, cad_fidelity)
OVERRIDING SYSTEM VALUE
VALUES (1, 80, 100);

-- 9.6 Seed Basic Info
INSERT INTO public.basic_info (id, name, title, subtitle, location, contact_id, images_id, ethos_id, metrics_id)
OVERRIDING SYSTEM VALUE
VALUES (
  1,
  'Alaa Essa',
  'Interior Architecture & Spatial Design',
  'Selected Works | 2026-2027',
  'Alexandria, Egypt',
  1,
  1,
  1,
  1
);

-- 9.7 Seed Project Categories
INSERT INTO public.project_categories (id, slug, name, description, display_order)
OVERRIDING SYSTEM VALUE
VALUES
  (1, 'living', 'Living & Lounges', 'Bespoke residential lounges and living salons.', 1),
  (2, 'bedroom', 'Master Bedrooms', 'Quiet luxury master bedrooms and dressing suites.', 2),
  (3, 'kitchen', 'Kitchens & Baths', 'Minimalist architectural culinary environments.', 3),
  (4, 'commercial', 'Commercial & Retail', 'Boutique lounges, restaurants, and retail spaces.', 4),
  (5, 'villas', 'Luxury Villas', 'Private residences and bespoke villas.', 5);

-- 9.8 Seed Experience
INSERT INTO public.experience (id, job_title, organization, location, period, is_present, work_type, description, skills, display_order)
OVERRIDING SYSTEM VALUE
VALUES
  (
    1,
    'Interior Design Intern',
    'Architecture & Interior Design Office',
    'Alexandria, Egypt',
    'Aug 2026',
    true,
    'Full-time',
    'Produced high-resolution photorealistic 3D interior renderings using 3ds Max & Corona Renderer to support project presentations. Curated material sample boards and color palettes aligned with modern minimalist and organic trends.',
    ARRAY['3ds Max', 'Corona Renderer', 'AutoCAD 2D', 'Material Curation'],
    1
  ),
  (
    2,
    'Lead Interior Architect & Design Consultant',
    'Alaa Essa Atelier & Architectural Practice',
    'Alexandria & Cairo, Egypt',
    '2024 - Present',
    true,
    'Practice',
    'Directing bespoke residential retreats, luxury penthouses, and boutique commercial interiors. Leading space planning, 3D visualization, detailed millwork shop drawings, and turnkey site quality supervision.',
    ARRAY['Space Planning', 'Custom Millwork Detailing', 'Circadian Lighting', 'Turnkey Supervision'],
    2
  ),
  (
    3,
    'Interior Design Architect',
    'Atelier Arch & Spatial Design',
    'New Cairo, Egypt',
    '2022 - 2024',
    false,
    'Full-time',
    'Developed comprehensive interior architectural schemes for private residences. Engineered custom millwork details, calculated architectural lux distributions, and produced working drawings.',
    ARRAY['Corona Renderer', 'CAD Working Drawings', 'Natural Stone Curation', 'BOQ Oversight'],
    3
  );

-- 9.9 Seed Education
INSERT INTO public.education (id, institution, degree, grade, year, description, display_order)
OVERRIDING SYSTEM VALUE
VALUES
  (
    1,
    'Alexandria University -- Faculty of Fine Arts',
    'Bachelor''s Degree in Interior Architecture & Decor',
    'Grade: Very Good',
    'Graduated 2026',
    'Specialized in spatial ergonomics, sustainable interior architecture, and photorealistic 3D rendering.',
    1
  ),
  (
    2,
    'Alexandria University -- Faculty of Fine Arts',
    'Graduation Project: "Wahaj" Cultural & Arts Center Interior Design',
    'Grade: Excellent with Honors',
    '2026',
    'Designed a comprehensive cultural center incorporating warm terracotta tones, organic curved geometry, and biophilic interior landscape zones. Created seamless transitions between reception counter, lounge areas, art exhibition space, and workshop ateliers.',
    2
  );

-- 9.10 Seed Software Skills
INSERT INTO public.software_skills (id, name, category, role, badge, color, engine, deliverable, display_order)
OVERRIDING SYSTEM VALUE
VALUES
  (1, '3ds Max', '3D & Modeling', '3D Modeling & Spatial Volume', '3MAX', 'bg-blue-600 text-white', 'Autodesk', 'High-Poly Architectural Geometries', 1),
  (2, 'Corona Renderer', 'Rendering Engines', 'Photorealistic Lighting & Materials', 'CRN', 'bg-amber-600 text-white', 'Chaos Group', 'Physically-Based PBR & LightMix CCT', 2),
  (3, 'AutoCAD', 'Technical Drafting', '2D Plans & Working Drawings', 'CAD', 'bg-red-600 text-white', 'Autodesk', '1:10 Joinery Details & Blueprints', 3),
  (4, 'Adobe Photoshop', 'Post-Production', 'Texture Mapping & Visual Grading', 'PS', 'bg-sky-700 text-white', 'Adobe CC', 'Atmospheric Balance & Swatch Boards', 4),
  (5, 'Revit BIM', 'Architectural BIM', 'Coordinated Documentation', 'BIM', 'bg-teal-700 text-white', 'Autodesk', 'BIM Level 2 Coordination & Schedules', 5);

-- 9.11 Seed Projects (Core Table with Cached Arrays & JSONB)
INSERT INTO public.projects (
  id, title, title_en, category_id, category, category_label, firm,
  location, year, area, style, description, concept, challenge, solution,
  cover_image, before_image, featured, include_in_cv, display_order,
  gallery, palette, features, specs, angles, material_swatches
) VALUES
  (
    'luxury-japandi-residence',
    'Tagamoa Residence - Warm Japandi Living Suite',
    'Tagamoa Residence - Warm Japandi Living Suite',
    1,
    'living',
    'Living & Lounges',
    'Alaa Essa Atelier',
    'New Cairo, 5th Settlement',
    '2026',
    '75 SQM',
    'Japandi Warm Minimalist',
    'A complete living room & lounge space embodying contemporary Japandi aesthetic. Warm earth tones meet dark walnut wood panels, vertical fluting, and 3000K concealed warm LED lighting for supreme visual tranquility.',
    'Space organization is centered around the concept of a seamless modern agora. In classical architecture, circulation was continuous and filled with natural daylight. The interior circulation here recreates this organic activity, with all functional zones radiating from the central living lounge bathed in balanced 3000K warm illumination.',
    'A raw concrete shell with an obstructive structural column right in the primary sightline and low natural daylight levels in the rear circulation passage.',
    'Absorbed the column into an integrated fluted walnut media feature wall with hidden acoustic dampening. Layered 3000K indirect ceiling coves cast a warm, continuous zenith wash simulating natural morning sunlight.',
    '/images/projects/project-1.jpg',
    '/images/projects/project-1-orig.jpg',
    true,
    true,
    1,
    ARRAY['/images/projects/project-1.jpg', '/images/projects/project-2.jpg', '/images/projects/project-3.jpg', '/images/projects/project-4.jpg'],
    ARRAY['#E7E3DC', '#4A3A2C', '#A2907D', '#1C1B1F', '#D0BA98'],
    ARRAY['Custom vertical fluted wall cladding with acoustic backing', 'Concealed architectural linear lighting with smart scene control', 'Bespoke modular sofa in textured boucle upholstery', 'Floating minimalist media unit with integrated display niche'],
    '{"scope": "Turnkey Interior Architecture, 3D Visualization, Shop Drawings & Site Supervision", "duration": "6 Weeks Design • 14 Weeks Turnkey Execution", "lighting": "3000K Warm Circadian Linear LED with Smart Dimming Scenes", "flooring": "Natural Botticino Marble Slabs & Acoustic Underlayment", "joinery": "Bespoke Walnut Vertical Fluting with Concealed Storage"}'::jsonb,
    '[{"title": "Panoramic Lounge View", "image": "/images/projects/project-1.jpg"}, {"title": "Symmetry & Perspective", "image": "/images/projects/project-2.jpg"}, {"title": "Media Unit & Wall Fluting", "image": "/images/projects/project-3.jpg"}, {"title": "Corner Lounge & Bouclé", "image": "/images/projects/project-4.jpg"}]'::jsonb,
    '[{"color": "#E7E3DC", "name": "Travertine Navona", "finish": "Honed & Unfilled Natural Slab"}, {"color": "#4A3A2C", "name": "Smoked American Walnut", "finish": "Matte Fluted Wall Millwork"}, {"color": "#A2907D", "name": "Textured Bouclé", "finish": "Custom Curved Sectional Upholstery"}, {"color": "#D0BA98", "name": "Circadian Linear LED", "finish": "3000K Architectural 95+ CRI"}]'::jsonb
  ),
  (
    'dunes-master-suite',
    'Dunes Minimalist Master Bedroom Suite',
    'Dunes Minimalist Master Bedroom Suite',
    2,
    'bedroom',
    'Master Bedrooms',
    'Alaa Essa Atelier',
    'Palm Hills, Sheikh Zayed',
    '2026',
    '45 SQM',
    'Minimalist Organic Luxury',
    'A serene master suite prioritizing tactile intimacy and circadian rhythms through low-level floor lighting, acoustic fabric wall panels, and bespoke floating cabinetry.',
    'Restorative architecture oriented around sound dampening and tactile surfaces to lower cognitive fatigue at the end of the day.',
    'Asymmetrical window placement creating uneven glare across the bed headboard.',
    'Engineered an architectural recessed curtain pocket with integrated dual sheer/blackout automation and soft side-fluted timber return.',
    '/images/projects/project-2.jpg',
    '/images/projects/project-2.jpg',
    true,
    true,
    2,
    ARRAY['/images/projects/project-2.jpg', '/images/projects/project-1.jpg', '/images/projects/project-3.jpg', '/images/projects/project-4.jpg'],
    ARRAY['#F4F1EA', '#8C8275', '#3A352F', '#C5A880'],
    ARRAY['Bespoke headboard paneling with integrated warm grazing LED', 'Engineered natural oak herringbone flooring', 'Walk-in bronze glass closet with smart sensor illumination'],
    '{"scope": "Master Suite Architecture, Custom Headboard Millwork & Lighting Engineering", "duration": "4 Weeks Concept • 8 Weeks Fit-Out", "lighting": "2700K Ultra-Warm Dimmable Grazing Strips", "flooring": "Smoked Oak Engineered Herringbone", "joinery": "Natural White Oak Veneer with Bronze Inlays"}'::jsonb,
    '[{"title": "Headboard Zenith Wash", "image": "/images/projects/project-2.jpg"}, {"title": "Dressing Corridor Perspective", "image": "/images/projects/project-3.jpg"}, {"title": "Nightstand & Switchcraft Detail", "image": "/images/projects/project-4.jpg"}]'::jsonb,
    '[{"color": "#F4F1EA", "name": "Limewash Plaster", "finish": "Hand-Troweled Velvet Matte"}, {"color": "#8C8275", "name": "Belgian Raw Linen", "finish": "Pre-Washed Headboard Wrap"}, {"color": "#C5A880", "name": "Brushed Champagne Brass", "finish": "Hardware Trim"}]'::jsonb
  ),
  (
    'skyline-penthouse-kitchen',
    'Skyline Minimalist Gourmet Kitchen',
    'Skyline Minimalist Gourmet Kitchen',
    3,
    'kitchen',
    'Kitchens & Baths',
    'Alaa Essa Atelier',
    'Katameya Heights, Cairo',
    '2026',
    '38 SQM',
    'Architectural Monolithic',
    'A high-performance monolithic kitchen marrying sintered porcelain worktops, anti-fingerprint matte cabinetry, and concealed professional-grade ventilation.',
    'Culinary precision balanced with social connectivity for private entertaining.',
    'Demanding plumbing stack relocation requirements in a high-rise concrete slab.',
    'Engineered a raised floating plinth with perimeter LED wash concealing MEP runs without compromising ceiling headroom.',
    '/images/projects/project-3.jpg',
    '/images/projects/project-3.jpg',
    true,
    true,
    3,
    ARRAY['/images/projects/project-3.jpg', '/images/projects/project-4.jpg', '/images/projects/project-1.jpg', '/images/projects/project-2.jpg'],
    ARRAY['#2B2B2A', '#D9D5CE', '#8E857B', '#44403C'],
    ARRAY['Monolithic sintered stone island with seamless under-mount prep sink', 'Floor-to-ceiling handle-less pocket doors concealing pantry', 'Dual-mode task lighting (4000K CRI 98) and ambient evening coves (3000K)'],
    '{"scope": "Kitchen Architecture, MEP Engineering & Turnkey Joinery Execution", "duration": "5 Weeks Design • 10 Weeks Fabrication", "lighting": "Dual Circadian Task/Lounge Downlights", "flooring": "Large-Format 120x240cm Porcelain Tile", "joinery": "Fenix Anti-Fingerprint Matte Carbon Millwork"}'::jsonb,
    '[{"title": "Monolithic Island Front View", "image": "/images/projects/project-3.jpg"}, {"title": "Appliance Wall & Concealed Pocket Doors", "image": "/images/projects/project-4.jpg"}, {"title": "Breakfast Counter Detail", "image": "/images/projects/project-1.jpg"}]'::jsonb,
    '[{"color": "#2B2B2A", "name": "Fenix NTM Carbon", "finish": "Nano-Tech Matte Anti-Fingerprint"}, {"color": "#D9D5CE", "name": "Pietra Grey Porcelain", "finish": "12mm Silk Honed Worktop"}, {"color": "#8E857B", "name": "Smoked Glass", "finish": "Anodized Black Frame Cabinets"}]'::jsonb
  ),
  (
    'lumiere-lounge-cafe',
    'Lumière Boutique Lounge & Café',
    'Lumière Boutique Lounge & Café',
    4,
    'commercial',
    'Commercial & Retail',
    'Alaa Essa Atelier',
    'Waterway, New Cairo',
    '2026',
    '190 SQM',
    'Biophilic Contemporary',
    'Hospitality interior blending micro-cement finishes, soft architectural arches, living green walls, and moody warm lighting tailored for social moments.',
    'Biophilic social agora designed to encourage community connection while maintaining intimate private conversational pockets.',
    'Excessive acoustic reverberation due to high ceilings and extensive glass facades.',
    'Introduced continuous slatted acoustic timber ceilings and fluted plaster arches that dramatically lowered reverberation time under 0.6 seconds.',
    '/images/projects/project-4.jpg',
    '/images/projects/project-4.jpg',
    true,
    true,
    4,
    ARRAY['/images/projects/project-4.jpg', '/images/projects/project-1.jpg', '/images/projects/project-2.jpg', '/images/projects/project-3.jpg'],
    ARRAY['#CFC7BC', '#5E5245', '#1E2320', '#C29B38'],
    ARRAY['Handcrafted curved terrazzo espresso bar counter', 'Automated living green wall with calibrated horticultural lighting', 'Zoned seating offering collaborative high tables and plush banquettes'],
    '{"scope": "Commercial Hospitality Architecture, Acoustical Engineering & Turnkey Fit-Out", "duration": "8 Weeks Concept • 16 Weeks Turnkey Execution", "lighting": "Architectural Track Spotlights with Scene Automation", "flooring": "Seamless Polished Micro-cement with Brass Inlay Dividers", "joinery": "Custom Curved Terrazzo Bar Counter & Floating Oak Banquettes"}'::jsonb,
    '[{"title": "Espresso Bar & Fluted Arches", "image": "/images/projects/project-4.jpg"}, {"title": "Living Wall & Banquette Seating", "image": "/images/projects/project-2.jpg"}, {"title": "Acoustic Slatted Ceiling & Lighting Track", "image": "/images/projects/project-3.jpg"}]'::jsonb,
    '[{"color": "#CFC7BC", "name": "Polished Micro-cement", "finish": "Seamless Warm Grey Satin"}, {"color": "#5E5245", "name": "Curved Italian Terrazzo", "finish": "Custom Aggregate Cast In-Situ"}, {"color": "#1E2320", "name": "Living Moss Wall", "finish": "Stabilized Architectural Foliage"}]'::jsonb
  );

-- 9.12 Seed Normalized Specs (1:1 with Projects)
INSERT INTO public.project_specs (project_id, scope, duration, lighting, flooring, joinery, firm_ref)
VALUES
  ('luxury-japandi-residence', 'Turnkey Interior Architecture, 3D Visualization, Shop Drawings & Site Supervision', '6 Weeks Design • 14 Weeks Turnkey Execution', '3000K Warm Circadian Linear LED with Smart Dimming Scenes', 'Natural Botticino Marble Slabs & Acoustic Underlayment', 'Bespoke Walnut Vertical Fluting with Concealed Storage', 'Alaa Essa Atelier'),
  ('dunes-master-suite', 'Master Suite Architecture, Custom Headboard Millwork & Lighting Engineering', '4 Weeks Concept • 8 Weeks Fit-Out', '2700K Ultra-Warm Dimmable Grazing Strips', 'Smoked Oak Engineered Herringbone', 'Natural White Oak Veneer with Bronze Inlays', 'Alaa Essa Atelier'),
  ('skyline-penthouse-kitchen', 'Kitchen Architecture, MEP Engineering & Turnkey Joinery Execution', '5 Weeks Design • 10 Weeks Fabrication', 'Dual Circadian Task/Lounge Downlights', 'Large-Format 120x240cm Porcelain Tile', 'Fenix Anti-Fingerprint Matte Carbon Millwork', 'Alaa Essa Atelier'),
  ('lumiere-lounge-cafe', 'Commercial Hospitality Architecture, Acoustical Engineering & Turnkey Fit-Out', '8 Weeks Concept • 16 Weeks Turnkey Execution', 'Architectural Track Spotlights with Scene Automation', 'Seamless Polished Micro-cement with Brass Inlay Dividers', 'Custom Curved Terrazzo Bar Counter & Floating Oak Banquettes', 'Alaa Essa Atelier');

-- 9.13 Seed Normalized Project Gallery (1:N)
INSERT INTO public.project_gallery (project_id, image_url, caption, display_order)
VALUES
  ('luxury-japandi-residence', '/images/projects/project-1.jpg', 'Principal Spatial Perspective', 1),
  ('luxury-japandi-residence', '/images/projects/project-2.jpg', 'Symmetry & Perspective', 2),
  ('luxury-japandi-residence', '/images/projects/project-3.jpg', 'Media Unit & Fluted Timber', 3),
  ('luxury-japandi-residence', '/images/projects/project-4.jpg', 'Corner Lounge Detail', 4),
  ('dunes-master-suite', '/images/projects/project-2.jpg', 'Master Suite Headboard Zenith Wash', 1),
  ('dunes-master-suite', '/images/projects/project-3.jpg', 'Dressing Corridor Perspective', 2),
  ('skyline-penthouse-kitchen', '/images/projects/project-3.jpg', 'Monolithic Sintered Stone Island', 1),
  ('skyline-penthouse-kitchen', '/images/projects/project-4.jpg', 'Pocket Doors & Appliance Wall', 2),
  ('lumiere-lounge-cafe', '/images/projects/project-4.jpg', 'Curved Terrazzo Espresso Bar', 1),
  ('lumiere-lounge-cafe', '/images/projects/project-2.jpg', 'Automated Living Green Wall', 2);

-- 9.14 Seed Normalized Project Features (1:N)
INSERT INTO public.project_features (project_id, feature, display_order)
VALUES
  ('luxury-japandi-residence', 'Custom vertical fluted wall cladding with acoustic backing', 1),
  ('luxury-japandi-residence', 'Concealed architectural linear lighting with smart scene control', 2),
  ('luxury-japandi-residence', 'Bespoke modular sofa in textured boucle upholstery', 3),
  ('dunes-master-suite', 'Bespoke headboard paneling with integrated warm grazing LED', 1),
  ('dunes-master-suite', 'Engineered natural oak herringbone flooring', 2),
  ('skyline-penthouse-kitchen', 'Monolithic sintered stone island with seamless under-mount prep sink', 1),
  ('skyline-penthouse-kitchen', 'Floor-to-ceiling handle-less pocket doors concealing pantry', 2),
  ('lumiere-lounge-cafe', 'Handcrafted curved terrazzo espresso bar counter', 1),
  ('lumiere-lounge-cafe', 'Automated living green wall with calibrated horticultural lighting', 2);

-- Done!
