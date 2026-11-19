import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getProjects, getDesignerProfile } from '@/lib/dataRepository';
import { DESIGNER_INFO } from '@/data/portfolioData';

// Helper: Word wrap text within maxWidth using given font and size
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  if (!text) return [];
  const words = text.replace(/[\r\n]+/g, ' ').split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    try {
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    } catch {
      const sanitized = testLine.replace(/[^\x20-\x7E]/g, ' ');
      const width = font.widthOfTextAtSize(sanitized, fontSize);
      if (width <= maxWidth) {
        currentLine = sanitized;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word.replace(/[^\x20-\x7E]/g, ' ');
      }
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Clean and normalize text for standard PDF fonts (retaining Latin accents as base ASCII)
function cleanText(str: string | undefined, fallback: string = ''): string {
  if (!str) return fallback;
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/m\s*[²³]/gi, 'SQM')
    .replace(/[²³]/g, ' SQM')
    .replace(/[–—]/g, '-')
    .replace(/[“”„«»]/g, '"')
    .replace(/[‘’‚]/g, "'")
    .replace(/°/g, ' deg ')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || fallback;
}

export async function GET() {
  try {
    const [profile, allProjects] = await Promise.all([
      getDesignerProfile(),
      getProjects(),
    ]);

    const pdfDoc = await PDFDocument.create();
    
    // Page dimensions: A4 (595.28 x 841.89 pt)
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    
    // Exact LaTeX Geometry: left=1.2cm (34pt), right=1.2cm, top=1.0cm (28.3pt), bottom=1.0cm
    const marginX = 34.02;
    const marginTop = 28.35;
    const marginBottom = 28.35;
    const contentWidth = pageWidth - marginX * 2;

    // Standard Serif Fonts matching LaTeX Charter / Latin Modern
    const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSerif = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const fontSans = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Color definitions
    const colBlack = rgb(0.05, 0.05, 0.05);
    const colCharcoal = rgb(0.20, 0.20, 0.20);
    const colMuted = rgb(0.40, 0.40, 0.40);
    const colRule = rgb(0.12, 0.12, 0.12);

    // Metadata
    const designerName = cleanText(profile?.nameEn, 'Alaa Essa');
    pdfDoc.setTitle(`${designerName} - Curriculum Vitae`);
    pdfDoc.setAuthor(designerName);
    pdfDoc.setSubject('Interior Architecture & 3D Visualization Professional CV');

    let pageNumber = 1;
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let curY = pageHeight - marginTop;

    // Helper: Check space and add page if needed
    const ensureSpace = (neededHeight: number) => {
      if (curY - neededHeight < marginBottom + 20) {
        pageNumber++;
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        curY = pageHeight - marginTop;

        // Running header for subsequent pages
        page.drawText(`${designerName.toUpperCase()}  //  CURRICULUM VITAE`, {
          x: marginX,
          y: curY - 10,
          size: 7.5,
          font: fontSerifBold,
          color: colMuted,
        });

        page.drawText(`Page ${pageNumber}`, {
          x: marginX + contentWidth - 30,
          y: curY - 10,
          size: 7.5,
          font: fontSerifItalic,
          color: colMuted,
        });

        page.drawLine({
          start: { x: marginX, y: curY - 16 },
          end: { x: marginX + contentWidth, y: curY - 16 },
          color: rgb(0.8, 0.8, 0.8),
          thickness: 0.5,
        });

        curY -= 32;
      }
    };

    // Helper: Draw Section with LaTeX \titlerule
    const drawSection = (title: string) => {
      ensureSpace(35);
      curY -= 10;
      page.drawText(title, {
        x: marginX,
        y: curY,
        size: 11.5,
        font: fontSerifBold,
        color: colBlack,
      });

      curY -= 4;
      page.drawLine({
        start: { x: marginX, y: curY },
        end: { x: marginX + contentWidth, y: curY },
        color: colRule,
        thickness: 0.6,
      });

      curY -= 8;
    };

    // Helper: Draw Row with Right-Aligned \hfill text
    const drawRowWithHFill = (leftText: string, rightText: string, leftBold: boolean = true, rightItalic: boolean = true) => {
      ensureSpace(16);
      page.drawText(leftText, {
        x: marginX,
        y: curY,
        size: 9.5,
        font: leftBold ? fontSerifBold : fontSerif,
        color: colBlack,
      });

      if (rightText) {
        const rightFont = rightItalic ? fontSerifItalic : fontSerif;
        const rWidth = rightFont.widthOfTextAtSize(rightText, 9);
        page.drawText(rightText, {
          x: marginX + contentWidth - rWidth,
          y: curY,
          size: 9,
          font: rightFont,
          color: colCharcoal,
        });
      }
      curY -= 12.5;
    };

    // Helper: Draw Bullet Highlight (leftmargin=12pt)
    const drawBullet = (text: string) => {
      const indent = 12;
      const bulletX = marginX + 4;
      const textX = marginX + indent;
      const maxTextW = contentWidth - indent;

      const lines = wrapText(text, maxTextW, fontSerif, 8.8);
      ensureSpace(lines.length * 11.5 + 4);

      // Draw small bullet dot on the first line
      page.drawCircle({
        x: bulletX,
        y: curY + 2.5,
        size: 1.4,
        color: colBlack,
      });

      lines.forEach((line, idx) => {
        page.drawText(line, {
          x: textX,
          y: curY,
          size: 8.8,
          font: fontSerif,
          color: colCharcoal,
        });
        curY -= 11.5;
      });
      curY -= 1.5;
    };

    // =============================================================
    // 1. HEADER (Centered LaTeX \begin{header})
    // =============================================================
    curY -= 4;

    // Name (23pt Bold)
    const nameWidth = fontSerifBold.widthOfTextAtSize(designerName, 23);
    page.drawText(designerName, {
      x: marginX + (contentWidth - nameWidth) / 2,
      y: curY,
      size: 23,
      font: fontSerifBold,
      color: colBlack,
    });
    curY -= 19;

    // Title (10pt Bold)
    const titleText = cleanText(profile?.titleEn, 'Interior Designer | 3D Visualization Specialist');
    const titleWidth = fontSerifBold.widthOfTextAtSize(titleText, 10);
    page.drawText(titleText, {
      x: marginX + (contentWidth - titleWidth) / 2,
      y: curY,
      size: 10,
      font: fontSerifBold,
      color: colBlack,
    });
    curY -= 14;

    // Contact Bar 1: Location | Phone | Email
    const location = cleanText(profile?.locationEn, 'Alexandria, Egypt');
    const phone = cleanText(profile?.phone, '+20 1032494616');
    const email = cleanText(profile?.email, 'alaaesssaa@gmail.com');
    const contactRow1 = `${location}   |   ${phone}   |   ${email}`;
    const c1Width = fontSerif.widthOfTextAtSize(contactRow1, 8.5);
    page.drawText(contactRow1, {
      x: marginX + (contentWidth - c1Width) / 2,
      y: curY,
      size: 8.5,
      font: fontSerif,
      color: colCharcoal,
    });
    curY -= 12;

    // Contact Bar 2: Behance | Portfolio
    const contactRow2 = 'behance.net/alaaessa   |   Portfolio: alaa-essa.vercel.app';
    const c2Width = fontSerif.widthOfTextAtSize(contactRow2, 8.5);
    page.drawText(contactRow2, {
      x: marginX + (contentWidth - c2Width) / 2,
      y: curY,
      size: 8.5,
      font: fontSerif,
      color: colCharcoal,
    });
    curY -= 10;

    // =============================================================
    // 2. SUMMARY
    // =============================================================
    drawSection('Summary');
    const summaryText = cleanText(
      profile?.aboutIntroEn,
      'Detail-oriented Interior Designer & 3D Visualization Specialist with a strong academic background from Alexandria University. Highly skilled in translating complex spatial concepts into photorealistic 3D renderings using 3ds Max and Corona Renderer. Passionate about biophilic design, warm earthy aesthetics, organic forms, custom parametric installations, and comprehensive lighting design.'
    );
    const summaryLines = wrapText(summaryText, contentWidth, fontSerif, 8.8);
    ensureSpace(summaryLines.length * 11.5 + 4);
    summaryLines.forEach((line) => {
      page.drawText(line, {
        x: marginX,
        y: curY,
        size: 8.8,
        font: fontSerif,
        color: colCharcoal,
      });
      curY -= 11.5;
    });

    // =============================================================
    // 3. EDUCATION
    // =============================================================
    drawSection('Education');
    drawRowWithHFill('Alexandria University', 'Graduated 2026', true, true);
    drawRowWithHFill("Bachelor's Degree in Interior Architecture & Decor -- Faculty of Fine Arts", 'Grade: Very Good', false, true);

    // =============================================================
    // 4. GRADUATION PROJECT
    // =============================================================
    drawSection('Graduation Project');
    drawRowWithHFill('"Wahaj" Cultural & Arts Center Interior Design', '2026', true, true);
    drawBullet('Concept & Identity: Designed a comprehensive cultural center incorporating warm terracotta tones, organic curved geometry, and biophilic interior landscape zones.');
    drawBullet('Spatial Zones: Created seamless functional transitions between reception counter, lounge areas, art exhibition space, and workshop ateliers.');
    drawBullet('Materiality & Lighting: Applied natural stone cladding, warm textured plasters, rattan pendant lighting, and parametric suspended ceiling art pieces with ambient LED backlight integration.');

    // =============================================================
    // 5. EXPERIENCE
    // =============================================================
    drawSection('Experience');
    const experiences = (profile?.experience && profile.experience.length > 0)
      ? profile.experience
      : [
          {
            role: 'Interior Design Intern',
            period: 'Aug 2026',
            company: 'Architecture & Interior Design Office',
            location: 'Alexandria, Egypt',
            description: 'Produced high-resolution photorealistic 3D interior renderings using 3ds Max & Corona Renderer to support project presentations.',
            skills: ['Sample boards & palettes', 'AutoCAD 2D technical drawings'],
          },
        ];

    experiences.forEach((exp: any) => {
      drawRowWithHFill(cleanText(exp.role, 'Interior Design Architect'), cleanText(exp.period, '2024 - Present'), true, true);
      const subLine = `${cleanText(exp.company, 'Interior Architecture Studio')} -- ${cleanText(exp.location, 'Alexandria, Egypt')}`;
      ensureSpace(12);
      page.drawText(subLine, {
        x: marginX,
        y: curY,
        size: 8.8,
        font: fontSerifItalic,
        color: colCharcoal,
      });
      curY -= 11.5;

      if (exp.description) {
        drawBullet(cleanText(exp.description));
      }
      if (exp.skills && Array.isArray(exp.skills)) {
        drawBullet(`Key Competencies: ${exp.skills.map((s: string) => cleanText(s)).join(', ')}.`);
      }
      curY -= 4;
    });

    // =============================================================
    // 6. FEATURED PROJECTS (Curated Max 4 with includeInCv flag)
    // =============================================================
    drawSection('Featured Projects');
    const cvProjects = allProjects
      .filter((p) => p.includeInCv !== false)
      .slice(0, 4);

    // Fallback if none flagged
    const projectsToRender = cvProjects.length > 0 ? cvProjects : allProjects.slice(0, 2);

    projectsToRender.forEach((proj) => {
      const pTitle = cleanText(proj.titleEn, proj.title || 'Architectural Space');
      const pCategory = cleanText(proj.categoryLabelEn, '3D Render & Concept');
      drawRowWithHFill(pTitle, pCategory, true, true);

      // Features or description bullets
      if (proj.featuresEn && proj.featuresEn.length > 0) {
        proj.featuresEn.slice(0, 2).forEach((feat) => {
          drawBullet(cleanText(feat));
        });
      } else if (proj.descriptionEn) {
        drawBullet(cleanText(proj.descriptionEn));
      }
      curY -= 3;
    });

    // =============================================================
    // 7. SKILLS
    // =============================================================
    drawSection('Skills');
    const skillLines = [
      {
        label: 'Software & Rendering: ',
        val: '3ds Max, Corona Renderer, AutoCAD, Adobe Photoshop',
      },
      {
        label: 'Interior Design: ',
        val: 'Space Planning, Biophilic Design, 3D Visualization, Material Selection, Lighting Design, Mood Boarding',
      },
      {
        label: 'Professional Skills: ',
        val: 'Concept Presentation, Attention to Detail, Client Requirement Analysis, Deadline Commitment',
      },
    ];

    skillLines.forEach((sk) => {
      const fullText = `${sk.label}${sk.val}`;
      const lines = wrapText(fullText, contentWidth, fontSerif, 8.8);
      ensureSpace(lines.length * 11.5 + 3);

      lines.forEach((line, idx) => {
        if (idx === 0) {
          // Draw bold label then value
          page.drawText(sk.label, {
            x: marginX,
            y: curY,
            size: 8.8,
            font: fontSerifBold,
            color: colBlack,
          });
          const lblW = fontSerifBold.widthOfTextAtSize(sk.label, 8.8);
          const remainder = line.slice(sk.label.length);
          page.drawText(remainder, {
            x: marginX + lblW,
            y: curY,
            size: 8.8,
            font: fontSerif,
            color: colCharcoal,
          });
        } else {
          page.drawText(line, {
            x: marginX,
            y: curY,
            size: 8.8,
            font: fontSerif,
            color: colCharcoal,
          });
        }
        curY -= 11.5;
      });
      curY -= 2;
    });

    // =============================================================
    // 8. LANGUAGES
    // =============================================================
    drawSection('Languages');
    ensureSpace(14);
    page.drawText('Arabic: ', { x: marginX, y: curY, size: 8.8, font: fontSerifBold, color: colBlack });
    const arW = fontSerifBold.widthOfTextAtSize('Arabic: ', 8.8);
    page.drawText('Native   |   ', { x: marginX + arW, y: curY, size: 8.8, font: fontSerif, color: colCharcoal });
    const natW = fontSerif.widthOfTextAtSize('Native   |   ', 8.8);
    page.drawText('English: ', { x: marginX + arW + natW, y: curY, size: 8.8, font: fontSerifBold, color: colBlack });
    const enW = fontSerifBold.widthOfTextAtSize('English: ', 8.8);
    page.drawText('Professional Working Proficiency', { x: marginX + arW + natW + enW, y: curY, size: 8.8, font: fontSerif, color: colCharcoal });

    // Save and return PDF
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Alaa-Essa-CV.pdf"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error generating CV PDF:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate CV PDF' }, { status: 500 });
  }
}
