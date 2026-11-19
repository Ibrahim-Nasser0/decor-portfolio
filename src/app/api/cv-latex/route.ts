import { NextResponse } from 'next/server';
import { getProjects, getDesignerProfile } from '@/lib/dataRepository';
import { DESIGNER_INFO } from '@/data/portfolioData';

// Helper: Escape special LaTeX characters
function escapeLatex(text: string | undefined, fallback: string = ''): string {
  if (!text) return fallback;
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&]/g, '\\&')
    .replace(/[%]/g, '\\%')
    .replace(/[$]/g, '\\$')
    .replace(/[#]/g, '\\#')
    .replace(/[_]/g, '\\_')
    .replace(/[{]/g, '\\{')
    .replace(/[}]/g, '\\}')
    .replace(/[~]/g, '\\textasciitilde{}')
    .replace(/[\^]/g, '\\textasciicircum{}')
    .replace(/["“”]/g, "''")
    .trim();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get('download') === '1';

    const [profile, allProjects] = await Promise.all([
      getDesignerProfile(),
      getProjects(),
    ]);

    // Name & Title
    const name = escapeLatex(profile?.nameEn || 'Alaa Essa');
    const title = escapeLatex(profile?.titleEn || 'Interior Designer | 3D Visualization Specialist');
    const location = escapeLatex(profile?.locationEn || 'Alexandria, Egypt');
    const phone = escapeLatex(profile?.phone || '+20 1032494616');
    const email = escapeLatex(profile?.email || 'alaaesssaa@gmail.com');
    const behance = 'behance.net/alaaessa';
    const portfolioUrl = 'https://alaa-essa.vercel.app';

    // Summary
    const summary = escapeLatex(
      profile?.aboutIntroEn ||
      'Detail-oriented Interior Designer & 3D Visualization Specialist with a strong academic background from Alexandria University. Highly skilled in translating complex spatial concepts into photorealistic 3D renderings using 3ds Max and Corona Renderer. Passionate about biophilic design, warm earthy aesthetics, organic forms, custom parametric installations, and comprehensive lighting design.'
    );

    // Education
    const educationList = (profile?.education && profile.education.length > 0)
      ? profile.education
      : DESIGNER_INFO.education;

    // Experience
    const experienceList = (profile?.experience && profile.experience.length > 0)
      ? profile.experience
      : DESIGNER_INFO.experience;

    // Featured Projects (Max 4 projects flagged for CV)
    const cvProjects = allProjects
      .filter((p) => p.includeInCv !== false)
      .slice(0, 4);

    // Build LaTeX Experience Blocks
    const experienceBlocks = experienceList.map((exp: any) => {
      const role = escapeLatex(exp.role || 'Interior Design Architect');
      const period = escapeLatex(exp.period || '2024 - Present');
      const company = escapeLatex(exp.company || 'Interior Architecture Studio');
      const loc = escapeLatex(exp.location || 'Alexandria, Egypt');
      const desc = escapeLatex(exp.description || '');

      return `\\begin{onecolentry}
\\textbf{${role}} \\hfill \\textit{${period}} \\\\
\\textit{${company} -- ${loc}}
\\end{onecolentry}
\\begin{onecolentry}
\\begin{highlights}
    \\item ${desc || 'Produced high-resolution photorealistic 3D interior renderings using 3ds Max \\& Corona Renderer to support project presentations.'}
${exp.skills && Array.isArray(exp.skills) ? `    \\item Specialized in: ${exp.skills.map((s: string) => escapeLatex(s)).join(', ')}.` : ''}
\\end{highlights}
\\end{onecolentry}`;
    }).join('\n\n\\vspace{0.10cm}\n\n');

    // Build LaTeX Projects Blocks (Curated max 4)
    const projectBlocks = cvProjects.map((p) => {
      const projTitle = escapeLatex(p.titleEn || p.title || 'Architectural Project');
      const category = escapeLatex(p.categoryLabelEn || p.category || '3D Render & Concept');
      const features = (p.featuresEn && p.featuresEn.length > 0)
        ? p.featuresEn.slice(0, 3)
        : [p.descriptionEn || 'Custom spatial layout and photorealistic rendering using Corona Renderer.'];

      const bulletItems = features
        .map((f: string) => `    \\item ${escapeLatex(f)}`)
        .join('\n');

      return `\\begin{onecolentry}
\\textbf{${projTitle}} \\hfill \\textit{${category}}
\\end{onecolentry}
\\begin{onecolentry}
\\begin{highlights}
${bulletItems}
\\end{highlights}
\\end{onecolentry}`;
    }).join('\n\n\\vspace{0.08cm}\n\n');

    // Generate full LaTeX code matching user's exact template
    const latexCode = `\\documentclass[10pt, a4paper]{article}

% ===================== Packages =====================
\\usepackage[
    ignoreheadfoot,
    top=1.0cm,
    bottom=1.0cm,
    left=1.2cm,
    right=1.2cm,
    footskip=0.8cm,
]{geometry}

\\usepackage{titlesec}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage[dvipsnames]{xcolor}
\\usepackage{enumitem}
\\usepackage{fontawesome5}
\\usepackage{amsmath}
\\usepackage[
    pdftitle={${name} CV},
    pdfauthor={${name}},
    colorlinks=true,
    urlcolor=black
]{hyperref}
\\usepackage{charter}
\\urlstyle{same}

% ===================== General Settings =====================
\\raggedright
\\pagestyle{empty}
\\setcounter{secnumdepth}{0}
\\setlength{\\parindent}{0pt}
\\setlength{\\topskip}{0pt}
\\pagenumbering{gobble}

% ===================== Section Formatting =====================
\\titleformat{\\section}
{\\bfseries\\large}
{}
{0pt}
{}
[\\vspace{1pt}\\titlerule]

\\titlespacing{\\section}{-1pt}{0.20cm}{0.10cm}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$}

% ===================== Custom Environments =====================
\\newenvironment{highlights}{
    \\begin{itemize}[
        topsep=0.03cm,
        parsep=0.02cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=12pt
    ]
}{
    \\end{itemize}
}

\\newenvironment{onecolentry}{
    \\begin{adjustwidth}{0cm}{0cm}
}{
    \\end{adjustwidth}
}

\\newenvironment{header}{
    \\setlength{\\topsep}{0pt}
    \\par\\kern\\topsep
    \\centering
    \\linespread{1.1}
}{
    \\par\\kern\\topsep
}

% ===================== Document =====================
\\begin{document}

% ===================== Header =====================
\\begin{header}
{\\fontsize{24pt}{24pt}\\selectfont \\textbf{${name}}}

\\vspace{4pt}

\\normalsize
\\textbf{${title}} \\\\

\\vspace{4pt}

\\mbox{\\faMapMarker* \\, ${location}}
\\quad|\\quad
\\mbox{\\faPhone \\, ${phone}}
\\quad|\\quad
\\mbox{\\faEnvelope \\, \\href{mailto:${email}}{${email}}}

\\vspace{3pt}

\\mbox{\\faBehance \\, \\href{https://${behance}}{${behance}}}
\\quad|\\quad
\\mbox{\\faGlobe \\, \\href{${portfolioUrl}}{alaa-essa.vercel.app}}
\\end{header}

\\vspace{-0.15cm}

% ===================== Summary =====================
\\section{Summary}
\\begin{onecolentry}
${summary}
\\end{onecolentry}

% ===================== Education =====================
\\section{Education}
\\begin{onecolentry}
\\textbf{Alexandria University} \\hfill \\textit{Graduated 2026} \\\\
Bachelor's Degree in Interior Architecture \\& Decor -- Faculty of Fine Arts \\hfill \\textit{Grade: Very Good}
\\end{onecolentry}

% ===================== Graduation Project =====================
\\section{Graduation Project}

\\begin{onecolentry}
\\textbf{"Wahaj" Cultural \\& Arts Center Interior Design} \\hfill \\textit{2026}
\\end{onecolentry}
\\begin{onecolentry}
\\begin{highlights}
    \\item \\textbf{Concept \\& Identity:} Designed a comprehensive cultural center incorporating warm terracotta tones, organic curved geometry, and biophilic interior landscape zones.
    \\item \\textbf{Spatial Zones:} Created seamless functional transitions between reception counter, lounge areas, art exhibition space, and workshop ateliers.
    \\item \\textbf{Materiality \\& Lighting:} Applied natural stone cladding, warm textured plasters, rattan pendant lighting, and parametric suspended ceiling art pieces with ambient LED backlight integration.
\\end{highlights}
\\end{onecolentry}

% ===================== Experience =====================
\\section{Experience}

${experienceBlocks}

% ===================== Featured Projects (Max 4) =====================
\\section{Featured Projects}

${projectBlocks}

% ===================== Technical \\& Design Skills =====================
\\section{Skills}
\\begin{onecolentry}

\\textbf{Software \\& Rendering:} 3ds Max, Corona Renderer, AutoCAD, Adobe Photoshop \\\\
\\textbf{Interior Design:} Space Planning, Biophilic Design, 3D Visualization, Material Selection, Lighting Design, Mood Boarding \\\\
\\textbf{Professional Skills:} Concept Presentation, Attention to Detail, Client Requirement Analysis, Deadline Commitment

\\end{onecolentry}

% ===================== Languages =====================
\\section{Languages}
\\begin{onecolentry}
\\textbf{Arabic:} Native \\quad|\\quad \\textbf{English:} Professional Working Proficiency
\\end{onecolentry}

\\end{document}
`;

    return new NextResponse(latexCode, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...(isDownload
          ? { 'Content-Disposition': 'attachment; filename="Alaa-Essa-CV.tex"' }
          : {}),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error generating LaTeX CV:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate LaTeX CV' }, { status: 500 });
  }
}
