import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { getProjects, getDesignerProfile } from '@/lib/dataRepository';
import { DESIGNER_INFO } from '@/data/portfolioData';

// Helper: Word wrap text to fit within a given maximum width (in points)
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
      // In case of any character encoding quirk, sanitize testLine
      const sanitized = testLine.replace(/[^\x20-\x7E]/g, '');
      const width = font.widthOfTextAtSize(sanitized, fontSize);
      if (width <= maxWidth) {
        currentLine = sanitized;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word.replace(/[^\x20-\x7E]/g, '');
      }
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Clean and transliterate text for standard PDF fonts (retaining Latin accents as base ASCII)
function sanitizeText(str: string | undefined, fallback: string = ''): string {
  if (!str) return fallback;
  const s = str
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
    .trim();
  return s || fallback;
}

// Safely load and convert ANY image format (WebP, PNG, JPEG, AVIF, remote URL or local path) into an embedded PDFImage
async function embedImageSafely(
  pdfDoc: PDFDocument,
  primaryPathOrUrl: string | undefined,
  fallbackPaths: string[] = []
): Promise<{ image: any; width: number; height: number; src: string } | null> {
  const candidates = [primaryPathOrUrl, ...fallbackPaths].filter(Boolean) as string[];

  for (const src of candidates) {
    try {
      let rawBuffer: Buffer | null = null;

      if (src.startsWith('http://') || src.startsWith('https://')) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        try {
          const res = await fetch(src, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (res.ok) {
            const ab = await res.arrayBuffer();
            rawBuffer = Buffer.from(ab);
          }
        } catch {
          clearTimeout(timeoutId);
        }
      } else {
        const relative = src.startsWith('/') ? src.slice(1) : src;
        const fullPath = path.join(process.cwd(), 'public', relative);
        try {
          rawBuffer = await fs.readFile(fullPath);
        } catch {}
      }

      if (!rawBuffer || rawBuffer.length === 0) continue;

      // Use sharp to normalize and convert into a standard high-quality progressive JPEG for pdf-lib
      const sharpInstance = sharp(rawBuffer);
      const meta = await sharpInstance.metadata();
      const jpegBuffer = await sharpInstance
        .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
        .toBuffer();

      const embedded = await pdfDoc.embedJpg(jpegBuffer);
      return {
        image: embedded,
        width: meta.width || embedded.width,
        height: meta.height || embedded.height,
        src,
      };
    } catch (err) {
      console.warn(`Failed to process/embed image from candidate: ${src}`, err);
    }
  }

  return null;
}

export async function GET() {
  try {
    // 1. Fetch live data from Supabase / cache with full fallbacks
    const [profile, projects] = await Promise.all([
      getDesignerProfile(),
      getProjects(),
    ]);

    const designerName = sanitizeText(profile?.nameEn, 'ALAA ISSA');
    const designerTitle = sanitizeText(profile?.titleEn, 'INTERIOR ARCHITECTURE & SPATIAL DESIGN');
    const location = sanitizeText(profile?.locationEn, 'CAIRO, EGYPT');
    const email = sanitizeText(profile?.email, 'alaa.issa.design@gmail.com');
    const whatsapp = sanitizeText(profile?.whatsappNumber, '+20 100 000 0000');
    const statement = sanitizeText(
      profile?.statementEn,
      'Merging structural engineering discipline with innate aesthetic poetry to craft serene, high-fidelity spaces that endure beyond fleeting trends.'
    );

    const experienceList = (profile?.experience && profile.experience.length > 0)
      ? profile.experience
      : DESIGNER_INFO.experience;

    const educationList = (profile?.education && profile.education.length > 0)
      ? profile.education
      : DESIGNER_INFO.education;

    const softwareList = DESIGNER_INFO.software || [];

    // 2. Create PDF Document in A4 Landscape (841.89 x 595.28 pt)
    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(`${designerName} - Architectural Monograph Portfolio 2026`);
    pdfDoc.setAuthor(designerName);
    pdfDoc.setSubject('Interior Architecture & Spatial Design Comprehensive Monograph');
    pdfDoc.setKeywords(['Architecture', 'Interior Design', 'Monograph', 'Cairo', 'Selected Works', 'Technical Specifications']);
    pdfDoc.setProducer('Alaa Issa Atelier Engine');
    pdfDoc.setCreator('Alaa Issa Architectural Practice');

    const pageWidth = 841.89;
    const pageHeight = 595.28;
    const margin = 36;

    // Standard High-Grade Fonts
    const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontSerif = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const fontSansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSans = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

    // Architectural Color Palette
    const colBlack = rgb(0.08, 0.08, 0.08);
    const colCharcoal = rgb(0.20, 0.20, 0.20);
    const colMuted = rgb(0.50, 0.50, 0.50);
    const colLightBg = rgb(0.97, 0.97, 0.96);
    const colCardBg = rgb(0.95, 0.95, 0.94);
    const colBorder = rgb(0.85, 0.85, 0.84);
    const colEmerald = rgb(0.24, 0.65, 0.53); // #7AD1B8 adapted for print readability

    // Helper: Draw standard architectural framing with crosshairs (+)
    const drawDraftingFrame = (page: any) => {
      page.drawRectangle({
        x: margin,
        y: margin,
        width: pageWidth - margin * 2,
        height: pageHeight - margin * 2,
        borderColor: colBlack,
        borderWidth: 1.2,
      });

      const drawCrosshair = (x: number, y: number) => {
        page.drawLine({ start: { x: x - 6, y }, end: { x: x + 6, y }, color: colMuted, thickness: 0.8 });
        page.drawLine({ start: { x, y: y - 6 }, end: { x, y: y + 6 }, color: colMuted, thickness: 0.8 });
      };

      drawCrosshair(margin, margin);
      drawCrosshair(pageWidth - margin, margin);
      drawCrosshair(margin, pageHeight - margin);
      drawCrosshair(pageWidth - margin, pageHeight - margin);
    };

    // Helper: Draw top running header
    const drawRunningHeader = (page: any, leftTag: string, rightTag: string) => {
      page.drawText(leftTag, {
        x: margin + 20,
        y: pageHeight - margin - 22,
        size: 8.5,
        font: fontMono,
        color: colMuted,
      });
      page.drawText(rightTag, {
        x: pageWidth - margin - 230,
        y: pageHeight - margin - 22,
        size: 8.5,
        font: fontMono,
        color: colMuted,
      });
      page.drawLine({
        start: { x: margin + 20, y: pageHeight - margin - 32 },
        end: { x: pageWidth - margin - 20, y: pageHeight - margin - 32 },
        color: colBorder,
        thickness: 0.8,
      });
    };

    // -------------------------------------------------------------
    // PAGE 1: COVER SPREAD (MONOGRAPH TITLE BLOCK & PRINCIPAL PORTRAIT)
    // -------------------------------------------------------------
    const coverPage = pdfDoc.addPage([pageWidth, pageHeight]);
    coverPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
    drawDraftingFrame(coverPage);
    drawRunningHeader(coverPage, 'DOC REF: MONO-2026 // ATELIER EDITION 01', `SCALE 1:50 // ENG. ${designerName}`);

    // Embed Principal Portrait
    const avatarFallbackCandidates = [
      '/images/alaa.jpeg',
      '/images/alaa.webp',
      '/images/alaa2.png',
      '/images/alaa2.webp',
      '/images/alaa-opt.webp',
    ];

    const avatarResult = await embedImageSafely(
      pdfDoc,
      profile?.avatarUrl,
      avatarFallbackCandidates
    );

    if (avatarResult) {
      const { image: coverImg, width: natW, height: natH } = avatarResult;
      const boxW = 280;
      const boxH = 340;
      const boxX = pageWidth - margin - 20 - boxW;
      const boxY = 120;

      const aspect = natW / natH;
      let drawW = boxW;
      let drawH = boxW / aspect;
      if (drawH > boxH) {
        drawH = boxH;
        drawW = boxH * aspect;
      }
      const drawX = boxX + (boxW - drawW) / 2;
      const drawY = boxY + (boxH - drawH) / 2;

      coverPage.drawRectangle({
        x: boxX - 6,
        y: boxY - 6,
        width: boxW + 12,
        height: boxH + 12,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 1,
      });

      coverPage.drawImage(coverImg, {
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
      });

      coverPage.drawRectangle({
        x: drawX,
        y: drawY,
        width: drawW,
        height: drawH,
        borderColor: colBorder,
        borderWidth: 0.5,
      });

      coverPage.drawText(`FIG 0.1 // PRINCIPAL ARCHITECT: ENG. ${designerName}`, {
        x: boxX,
        y: boxY - 18,
        size: 7.5,
        font: fontMono,
        color: colMuted,
      });
      coverPage.drawText('ATELIER ARCHITECTURAL ARCHIVE // CAIRO', {
        x: boxX,
        y: boxY - 30,
        size: 7,
        font: fontMono,
        color: colMuted,
      });
    }

    // Left Column Cover Typography
    coverPage.drawText('ARCHITECTURAL PORTFOLIO', {
      x: margin + 24,
      y: 400,
      size: 11,
      font: fontSansBold,
      color: colCharcoal,
    });

    coverPage.drawText(designerName.toUpperCase(), {
      x: margin + 24,
      y: 340,
      size: 50,
      font: fontSerifBold,
      color: colBlack,
    });

    coverPage.drawText(designerTitle.toUpperCase(), {
      x: margin + 26,
      y: 310,
      size: 11,
      font: fontSans,
      color: colMuted,
    });

    coverPage.drawRectangle({
      x: margin + 26,
      y: 285,
      width: 72,
      height: 3,
      color: colBlack,
    });

    const coverDescLines = wrapText(statement, 380, fontSerifItalic, 11.5);
    let coverTextY = 250;
    for (const line of coverDescLines.slice(0, 5)) {
      coverPage.drawText(line, {
        x: margin + 26,
        y: coverTextY,
        size: 11,
        font: fontSerifItalic,
        color: colCharcoal,
      });
      coverTextY -= 17;
    }

    // Cartouche / Metadata Strip at Bottom
    const cartoucheY = 75;
    coverPage.drawRectangle({
      x: margin + 24,
      y: cartoucheY,
      width: 380,
      height: 60,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 1,
    });

    coverPage.drawText('PRACTICE LOCATION:', { x: margin + 34, y: cartoucheY + 42, size: 7.5, font: fontSansBold, color: colMuted });
    coverPage.drawText(location, { x: margin + 34, y: cartoucheY + 28, size: 9, font: fontSansBold, color: colBlack });

    coverPage.drawText('COMMISSIONS:', { x: margin + 170, y: cartoucheY + 42, size: 7.5, font: fontSansBold, color: colMuted });
    coverPage.drawText('RESIDENTIAL & RETAIL', { x: margin + 170, y: cartoucheY + 28, size: 9, font: fontSansBold, color: colBlack });

    coverPage.drawText('DIRECT CONTACT:', { x: margin + 300, y: cartoucheY + 42, size: 7.5, font: fontSansBold, color: colMuted });
    coverPage.drawText(whatsapp, { x: margin + 300, y: cartoucheY + 28, size: 9, font: fontMono, color: colBlack });

    // -------------------------------------------------------------
    // PAGE 2: ATELIER MANIFESTO & FOUNDATIONAL PRINCIPLES
    // -------------------------------------------------------------
    const profilePage = pdfDoc.addPage([pageWidth, pageHeight]);
    profilePage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
    drawDraftingFrame(profilePage);
    drawRunningHeader(profilePage, '01 // ATELIER MANIFESTO & SPATIAL FOUNDATIONS', `PRACTICE ETHOS // ENG. ${designerName}`);

    // Left Column: The Philosophy & Bio
    profilePage.drawText('CRAFTING LIVING ENVIRONMENTS', {
      x: margin + 24,
      y: pageHeight - 95,
      size: 22,
      font: fontSerifBold,
      color: colBlack,
    });
    profilePage.drawText('Where structural discipline yields to tactile poetry.', {
      x: margin + 24,
      y: pageHeight - 116,
      size: 10.5,
      font: fontSerifItalic,
      color: colMuted,
    });

    const bioIntro = sanitizeText(
      profile?.aboutExperienceEn || DESIGNER_INFO.aboutExperienceEn,
      'Dedicated to bespoke residential retreats and boutique commercial interiors, approaching each project through spatial clarity, tailored material palettes, and attentive turnkey execution.'
    );
    const introLines = wrapText(bioIntro, 350, fontSans, 9.5);
    let bioY = pageHeight - 145;
    for (const line of introLines.slice(0, 6)) {
      profilePage.drawText(line, {
        x: margin + 24,
        y: bioY,
        size: 9,
        font: fontSans,
        color: colCharcoal,
      });
      bioY -= 14;
    }

    // Architectural Quote Card
    bioY -= 12;
    profilePage.drawRectangle({
      x: margin + 24,
      y: bioY - 55,
      width: 350,
      height: 56,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 0.8,
    });
    const quoteLines = wrapText(`"${statement}"`, 330, fontSerifItalic, 8.5);
    let qY = bioY - 18;
    for (const ql of quoteLines.slice(0, 3)) {
      profilePage.drawText(ql, { x: margin + 34, y: qY, size: 8.5, font: fontSerifItalic, color: colBlack });
      qY -= 12;
    }

    // Practice Metrics Strip
    const metricsY = 65;
    const metricsBoxW = 350;
    profilePage.drawRectangle({
      x: margin + 24,
      y: metricsY,
      width: metricsBoxW,
      height: 55,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 1,
    });
    const stats = [
      { num: '05+', label: 'YRS PRACTICE' },
      { num: '35+', label: 'BUILT WORKS' },
      { num: '100%', label: 'TURNKEY FIDELITY' },
      { num: '1:50', label: 'CAD PRECISION' },
    ];
    stats.forEach((st, i) => {
      const sx = margin + 34 + i * 85;
      profilePage.drawText(st.num, { x: sx, y: metricsY + 30, size: 14, font: fontSerifBold, color: colBlack });
      profilePage.drawText(st.label, { x: sx, y: metricsY + 16, size: 6.5, font: fontMono, color: colMuted });
    });

    // Right Column: 4 Core Principles
    const rightColX = pageWidth / 2 + 10;
    profilePage.drawText('FOUR FOUNDATIONAL PRINCIPLES', {
      x: rightColX,
      y: pageHeight - 95,
      size: 11,
      font: fontSansBold,
      color: colBlack,
    });

    const pillars = [
      {
        tag: '01 / CIRCULATION',
        title: 'Spatial Ergonomics',
        desc: 'Rigorous movement flow analysis ensuring every square meter is functional, serene, and naturally flowing.',
      },
      {
        tag: '02 / LUMEN DYNAMICS',
        title: 'Circadian Warm Lighting',
        desc: 'Layered 3000K warm architectural lighting schemes engineered to elevate texture and promote calm.',
      },
      {
        tag: '03 / JOINERY ART',
        title: 'Bespoke Millwork',
        desc: 'Tailored joinery detailing, acoustic wall fluting, and floating cabinetry executed with zero-gap precision.',
      },
      {
        tag: '04 / REALIZATION',
        title: 'Turnkey Execution',
        desc: 'Millimeter-accurate executive shop drawings and attentive direct on-site supervision ensuring real-world fidelity.',
      },
    ];

    let pillarY = pageHeight - 125;
    for (const p of pillars) {
      profilePage.drawRectangle({
        x: rightColX,
        y: pillarY - 50,
        width: 345,
        height: 52,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 0.8,
      });

      profilePage.drawText(p.tag, {
        x: rightColX + 12,
        y: pillarY - 14,
        size: 7,
        font: fontMono,
        color: colEmerald,
      });

      profilePage.drawText(p.title.toUpperCase(), {
        x: rightColX + 100,
        y: pillarY - 14,
        size: 8.5,
        font: fontSansBold,
        color: colBlack,
      });

      const pDescLines = wrapText(p.desc, 320, fontSans, 7.5);
      let pdy = pillarY - 28;
      for (const line of pDescLines.slice(0, 2)) {
        profilePage.drawText(line, {
          x: rightColX + 12,
          y: pdy,
          size: 7.5,
          font: fontSans,
          color: colCharcoal,
        });
        pdy -= 10;
      }

      pillarY -= 60;
    }

    // -------------------------------------------------------------
    // PAGE 3: PROFESSIONAL TRAJECTORY & EXPERIENCE (THE EXPERIENCE SECTION!)
    // -------------------------------------------------------------
    const expPage = pdfDoc.addPage([pageWidth, pageHeight]);
    expPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
    drawDraftingFrame(expPage);
    drawRunningHeader(expPage, '02 // PROFESSIONAL TRAJECTORY & PRACTICE CHRONOLOGY', `RESUME & CREDENTIALS // ENG. ${designerName}`);

    // Main Header
    expPage.drawText('PROFESSIONAL TRAJECTORY', {
      x: margin + 20,
      y: pageHeight - 95,
      size: 22,
      font: fontSerifBold,
      color: colBlack,
    });
    expPage.drawText('Documented practice chronology, accredited degrees, and architectural software mastery.', {
      x: margin + 20,
      y: pageHeight - 116,
      size: 10,
      font: fontSerifItalic,
      color: colMuted,
    });

    // Left Column: Practice Chronology (Career Roles)
    const expColW = 410;
    expPage.drawText('CAREER CHRONOLOGY (2020 - 2026)', {
      x: margin + 20,
      y: pageHeight - 145,
      size: 9,
      font: fontSansBold,
      color: colBlack,
    });

    let roleY = pageHeight - 170;
    for (const exp of experienceList.slice(0, 3)) {
      const isCurrent = (exp.period || '').toUpperCase().includes('PRESENT') || (exp.period || '').includes('2026');

      // Card container
      expPage.drawRectangle({
        x: margin + 20,
        y: roleY - 82,
        width: expColW,
        height: 84,
        color: rgb(1, 1, 1),
        borderColor: isCurrent ? colBlack : colBorder,
        borderWidth: isCurrent ? 1 : 0.8,
      });

      // Period Pill
      const periodText = sanitizeText(exp.period, '2024 - PRESENT');
      expPage.drawRectangle({
        x: margin + 30,
        y: roleY - 18,
        width: 105,
        height: 14,
        color: isCurrent ? colBlack : colCardBg,
      });
      expPage.drawText(periodText, {
        x: margin + 36,
        y: roleY - 14,
        size: 7,
        font: fontMono,
        color: isCurrent ? rgb(1, 1, 1) : colBlack,
      });

      // Location
      expPage.drawText(sanitizeText(exp.location, 'Cairo, Egypt'), {
        x: margin + 145,
        y: roleY - 14,
        size: 7.5,
        font: fontSans,
        color: colMuted,
      });

      // Role & Firm
      expPage.drawText(sanitizeText(exp.role, 'Lead Interior Architect'), {
        x: margin + 30,
        y: roleY - 33,
        size: 9.5,
        font: fontSansBold,
        color: colBlack,
      });

      expPage.drawText(sanitizeText(exp.company, 'Studio Alaa Issa'), {
        x: margin + 30,
        y: roleY - 45,
        size: 8,
        font: fontSans,
        color: colMuted,
      });

      // Description (wrapped)
      const rDescLines = wrapText(sanitizeText(exp.description, ''), expColW - 20, fontSans, 7.5);
      let rdy = roleY - 57;
      for (const line of rDescLines.slice(0, 2)) {
        expPage.drawText(line, {
          x: margin + 30,
          y: rdy,
          size: 7.5,
          font: fontSans,
          color: colCharcoal,
        });
        rdy -= 9.5;
      }

      // Skills tags
      const skillsArray = Array.isArray(exp.skills) ? exp.skills : (exp.skills ? [String(exp.skills)] : []);
      if (skillsArray.length > 0) {
        const skillsString = skillsArray.slice(0, 4).map((s: any) => sanitizeText(String(s))).join('  -  ');
        expPage.drawText(skillsString, {
          x: margin + 30,
          y: roleY - 77,
          size: 6.5,
          font: fontMono,
          color: colEmerald,
        });
      }

      roleY -= 92;
    }

    // Right Column: Education & Software Stack
    const expRightX = margin + 20 + expColW + 20;
    const expRightW = pageWidth - margin - 20 - expRightX;

    // 1. Education Credentials
    expPage.drawText('ACCREDITED DEGREES & CERTIFICATIONS', {
      x: expRightX,
      y: pageHeight - 145,
      size: 9,
      font: fontSansBold,
      color: colBlack,
    });

    let eduY = pageHeight - 170;
    for (const edu of educationList.slice(0, 2)) {
      expPage.drawRectangle({
        x: expRightX,
        y: eduY - 54,
        width: expRightW,
        height: 56,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 0.8,
      });

      expPage.drawText(sanitizeText(edu.year, '2020 - 2024'), {
        x: expRightX + 10,
        y: eduY - 14,
        size: 7,
        font: fontMono,
        color: colEmerald,
      });

      const eduTitleLines = wrapText(sanitizeText(edu.titleEn, 'Bachelor of Architectural Engineering'), expRightW - 20, fontSansBold, 8);
      let ety = eduY - 26;
      for (const tl of eduTitleLines.slice(0, 2)) {
        expPage.drawText(tl, { x: expRightX + 10, y: ety, size: 8, font: fontSansBold, color: colBlack });
        ety -= 10;
      }

      expPage.drawText(sanitizeText(edu.institutionEn, 'Faculty of Fine Arts & Architecture'), {
        x: expRightX + 10,
        y: ety,
        size: 7,
        font: fontSans,
        color: colMuted,
      });

      eduY -= 64;
    }

    // 2. Technical Software Stack Grid
    eduY -= 10;
    expPage.drawText('TECHNICAL SOFTWARE STACK & CAD ENGINES', {
      x: expRightX,
      y: eduY,
      size: 9,
      font: fontSansBold,
      color: colBlack,
    });

    eduY -= 20;
    const swBoxW = (expRightW - 10) / 2;
    const swBoxH = 36;

    softwareList.slice(0, 6).forEach((sw, idx) => {
      const colIdx = idx % 2;
      const rowIdx = Math.floor(idx / 2);
      const bx = expRightX + colIdx * (swBoxW + 10);
      const by = eduY - rowIdx * (swBoxH + 8);

      expPage.drawRectangle({
        x: bx,
        y: by - swBoxH,
        width: swBoxW,
        height: swBoxH,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 0.8,
      });

      // Badge
      expPage.drawRectangle({
        x: bx + 8,
        y: by - 24,
        width: 32,
        height: 16,
        color: colBlack,
      });
      expPage.drawText(sanitizeText(sw.badge, 'CAD'), {
        x: bx + 12,
        y: by - 19,
        size: 7,
        font: fontMono,
        color: rgb(1, 1, 1),
      });

      // Name & Role
      expPage.drawText(sanitizeText(sw.name, 'Software'), {
        x: bx + 46,
        y: by - 17,
        size: 8,
        font: fontSansBold,
        color: colBlack,
      });
      expPage.drawText(sanitizeText(sw.role, 'Design Tool'), {
        x: bx + 46,
        y: by - 28,
        size: 6.5,
        font: fontSans,
        color: colMuted,
      });
    });

    // -------------------------------------------------------------
    // PAGES 4+: COMPREHENSIVE PROJECT CASE STUDIES (2-PAGE SPREAD PER PROJECT)
    // -------------------------------------------------------------
    for (let idx = 0; idx < projects.length; idx++) {
      const proj = projects[idx];
      const projNum = String(idx + 1).padStart(2, '0');
      const cleanTitle = sanitizeText(proj.titleEn, proj.title || 'Project');
      const cleanCategory = sanitizeText(proj.categoryLabelEn || proj.category, 'RESIDENTIAL RETREAT').toUpperCase();

      // =============================================================
      // PROJECT SPREAD PAGE A: SPATIAL PHOTOGRAPHY & MULTI-ANGLE GALLERY
      // =============================================================
      const galleryPage = pdfDoc.addPage([pageWidth, pageHeight]);
      galleryPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
      drawDraftingFrame(galleryPage);
      drawRunningHeader(
        galleryPage,
        `CASE STUDY ${projNum} // SPATIAL PERSPECTIVES`,
        `${cleanCategory} // ${cleanTitle}`
      );

      // Hero Primary Render (Large Format Left Widescreen)
      const heroW = 460;
      const heroH = 340;
      const heroX = margin + 20;
      const heroY = 150;

      // Local fallback image list for project
      const fallbackLocalProject = [
        `/images/projects/project-${idx + 1}.jpg`,
        '/images/projects/project-1.jpg',
        '/images/projects/project-2.jpg',
        '/images/projects/project-3.jpg',
        '/images/projects/project-4.jpg',
      ];

      const heroImgResult = await embedImageSafely(pdfDoc, proj.coverImage, fallbackLocalProject);

      if (heroImgResult) {
        const { image: heroEmbed, width: nw, height: nh } = heroImgResult;
        const aspect = nw / nh;
        let dw = heroW;
        let dh = heroW / aspect;
        if (dh > heroH) {
          dh = heroH;
          dw = heroH * aspect;
        }
        const dx = heroX + (heroW - dw) / 2;
        const dy = heroY + (heroH - dh) / 2;

        galleryPage.drawRectangle({
          x: heroX,
          y: heroY,
          width: heroW,
          height: heroH,
          color: rgb(1, 1, 1),
          borderColor: colBorder,
          borderWidth: 1,
        });

        galleryPage.drawImage(heroEmbed, {
          x: dx,
          y: dy,
          width: dw,
          height: dh,
        });

        galleryPage.drawRectangle({
          x: dx,
          y: dy,
          width: dw,
          height: dh,
          borderColor: colBorder,
          borderWidth: 0.5,
        });

        galleryPage.drawText(`FIG ${projNum}.1 // PRINCIPAL SPATIAL PERSPECTIVE`, {
          x: heroX,
          y: heroY - 14,
          size: 7.5,
          font: fontMono,
          color: colMuted,
        });
      }

      // Secondary Multi-Angle Perspectives (Right Column Gallery Grid)
      const subGalleryX = heroX + heroW + 18;
      const subGalleryW = pageWidth - margin - 20 - subGalleryX;
      const subBoxH = 155;

      // Image Angle 1
      const angle1Url = proj.angles?.[1]?.image || proj.gallery?.[1] || proj.gallery?.[0];
      const angle1Title = sanitizeText(proj.angles?.[1]?.titleEn, 'SECONDARY SPATIAL ANGLE');
      const angle1Result = await embedImageSafely(pdfDoc, angle1Url, [
        `/images/projects/project-${((idx + 1) % 4) + 1}.jpg`,
        '/images/projects/project-2.jpg',
        '/images/projects/project-3.jpg',
      ]);

      const sub1Y = heroY + heroH - subBoxH;
      if (angle1Result) {
        const { image: a1Img, width: nw, height: nh } = angle1Result;
        const aspect = nw / nh;
        let dw = subGalleryW;
        let dh = subGalleryW / aspect;
        if (dh > subBoxH) {
          dh = subBoxH;
          dw = subBoxH * aspect;
        }
        const dx = subGalleryX + (subGalleryW - dw) / 2;
        const dy = sub1Y + (subBoxH - dh) / 2;

        galleryPage.drawRectangle({
          x: subGalleryX,
          y: sub1Y,
          width: subGalleryW,
          height: subBoxH,
          color: rgb(1, 1, 1),
          borderColor: colBorder,
          borderWidth: 1,
        });

        galleryPage.drawImage(a1Img, {
          x: dx,
          y: dy,
          width: dw,
          height: dh,
        });

        galleryPage.drawText(`FIG ${projNum}.2 // ${angle1Title.toUpperCase()}`, {
          x: subGalleryX,
          y: sub1Y - 13,
          size: 7,
          font: fontMono,
          color: colMuted,
        });
      }

      // Image Angle 2 / Before Renovation Image
      const angle2Url = proj.beforeImage || proj.angles?.[2]?.image || proj.gallery?.[2] || proj.gallery?.[1];
      const angle2Title = proj.beforeImage
        ? 'PRE-CONSTRUCTION ARCHITECTURAL CONDITION'
        : sanitizeText(proj.angles?.[2]?.titleEn, 'BESPOKE JOINERY & MATERIAL DETAIL');
      const angle2Result = await embedImageSafely(pdfDoc, angle2Url, [
        `/images/projects/project-${((idx + 2) % 4) + 1}.jpg`,
        '/images/projects/project-1-orig.jpg',
        '/images/projects/project-4.jpg',
      ]);

      const sub2Y = heroY;
      if (angle2Result) {
        const { image: a2Img, width: nw, height: nh } = angle2Result;
        const aspect = nw / nh;
        let dw = subGalleryW;
        let dh = subGalleryW / aspect;
        if (dh > subBoxH) {
          dh = subBoxH;
          dw = subBoxH * aspect;
        }
        const dx = subGalleryX + (subGalleryW - dw) / 2;
        const dy = sub2Y + (subBoxH - dh) / 2;

        galleryPage.drawRectangle({
          x: subGalleryX,
          y: sub2Y,
          width: subGalleryW,
          height: subBoxH,
          color: rgb(1, 1, 1),
          borderColor: colBorder,
          borderWidth: 1,
        });

        galleryPage.drawImage(a2Img, {
          x: dx,
          y: dy,
          width: dw,
          height: dh,
        });

        galleryPage.drawText(`FIG ${projNum}.3 // ${angle2Title.toUpperCase()}`, {
          x: subGalleryX,
          y: sub2Y - 13,
          size: 7,
          font: fontMono,
          color: colMuted,
        });
      }

      // Bottom Widescreen Metric Strip (Zero overflow with proportional widths)
      const stripY = 70;
      const stripW = pageWidth - margin * 2 - 40;
      galleryPage.drawRectangle({
        x: heroX,
        y: stripY,
        width: stripW,
        height: 50,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 1,
      });

      const metricsCols = [
        { label: 'SPATIAL AREA', val: sanitizeText(proj.area, 'N/A'), width: 120 },
        { label: 'LOCATION', val: sanitizeText(proj.locationEn, 'Cairo, Egypt'), width: 220 },
        { label: 'COMPLETION', val: sanitizeText(proj.year, '2026'), width: 120 },
        { label: 'TYPOLOGY & STYLE', val: sanitizeText(proj.styleEn, 'Modern Japandi'), width: 250 },
      ];

      let curMetricX = heroX + 16;
      metricsCols.forEach((mc) => {
        galleryPage.drawText(mc.label, { x: curMetricX, y: stripY + 32, size: 7, font: fontMono, color: colMuted });
        const valLines = wrapText(mc.val, mc.width - 10, fontSansBold, 8.5);
        galleryPage.drawText(valLines[0] || mc.val, { x: curMetricX, y: stripY + 16, size: 8.5, font: fontSansBold, color: colBlack });
        curMetricX += mc.width;
      });

      // =============================================================
      // PROJECT SPREAD PAGE B: ARCHITECTURAL DOSSIER, SPECS & MATERIALS
      // =============================================================
      const dossierPage = pdfDoc.addPage([pageWidth, pageHeight]);
      dossierPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
      drawDraftingFrame(dossierPage);
      drawRunningHeader(
        dossierPage,
        `CASE STUDY ${projNum} // TECHNICAL DOSSIER & SPECIFICATIONS`,
        `${cleanCategory} // ${cleanTitle}`
      );

      const dColW = 355;
      const dLeftX = margin + 20;

      // Left Column: Narrative, Strategy & Delivered Assets
      dossierPage.drawText(cleanCategory, {
        x: dLeftX,
        y: pageHeight - 90,
        size: 9,
        font: fontSansBold,
        color: colEmerald,
      });

      // Wrapped Title (Zero overflow)
      const projTitleLines = wrapText(cleanTitle, dColW, fontSerifBold, 22);
      let dTitleY = pageHeight - 118;
      for (const ptl of projTitleLines) {
        dossierPage.drawText(ptl, {
          x: dLeftX,
          y: dTitleY,
          size: 20,
          font: fontSerifBold,
          color: colBlack,
        });
        dTitleY -= 24;
      }

      // Concept / Narrative Paragraph
      const conceptText = sanitizeText(
        proj.descriptionEn || proj.conceptEn,
        'A masterfully planned interior celebrating spatial clarity, refined materiality, and quiet restorative elegance.'
      );
      const conceptLines = wrapText(conceptText, dColW, fontSans, 8.5);
      let dDescY = dTitleY - 8;
      for (const cl of conceptLines.slice(0, 5)) {
        dossierPage.drawText(cl, {
          x: dLeftX,
          y: dDescY,
          size: 8.5,
          font: fontSans,
          color: colCharcoal,
        });
        dDescY -= 13;
      }

      // Spatial Challenge & Strategic Intervention Box (Ample height, full multi-line wrap with zero truncation)
      dDescY -= 12;
      const challengeStrategyBoxH = 88;
      dossierPage.drawRectangle({
        x: dLeftX,
        y: dDescY - challengeStrategyBoxH,
        width: dColW,
        height: challengeStrategyBoxH,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 1,
      });

      dossierPage.drawText('SPATIAL CHALLENGE & STRATEGIC INTERVENTION:', {
        x: dLeftX + 12,
        y: dDescY - 16,
        size: 8,
        font: fontSansBold,
        color: colBlack,
      });

      const fullStrategyText = sanitizeText(
        `${proj.challengeEn ? `CHALLENGE: ${proj.challengeEn} ` : ''}${proj.solutionEn ? `INTERVENTION: ${proj.solutionEn}` : ''}`,
        'Engineered bespoke acoustic millwork and circadian lighting to transform circulation constraints into refined architectural features.'
      );

      const stratLines = wrapText(fullStrategyText, dColW - 24, fontSans, 7.5);
      let sLineY = dDescY - 30;
      for (const sl of stratLines.slice(0, 5)) {
        dossierPage.drawText(sl, {
          x: dLeftX + 12,
          y: sLineY,
          size: 7.5,
          font: fontSans,
          color: colCharcoal,
        });
        sLineY -= 10.5;
      }

      // Delivered Architectural Assets
      dDescY -= (challengeStrategyBoxH + 16);
      dossierPage.drawText('DELIVERED ARCHITECTURAL ASSETS', {
        x: dLeftX,
        y: dDescY,
        size: 9,
        font: fontSansBold,
        color: colBlack,
      });

      let assetY = dDescY - 16;
      const featuresList = (proj.featuresEn && proj.featuresEn.length > 0)
        ? proj.featuresEn
        : ['Custom millwork shop drawings', 'Circadian lighting engineering', 'Turnkey site supervision'];

      for (const feat of featuresList.slice(0, 4)) {
        const featLines = wrapText(`- ${sanitizeText(feat)}`, dColW - 10, fontSans, 8);
        for (const fl of featLines.slice(0, 2)) {
          dossierPage.drawText(fl, {
            x: dLeftX,
            y: assetY,
            size: 8,
            font: fontSans,
            color: colCharcoal,
          });
          assetY -= 11.5;
        }
      }

      // Right Column: Technical Specifications Matrix & Material Swatches
      const dRightX = dLeftX + dColW + 24;
      const dRightW = pageWidth - margin - 20 - dRightX;

      // 1. Technical Specifications Matrix (Strictly word-wrapped, IMPOSSIBLE to overflow)
      dossierPage.drawText('TECHNICAL SPECIFICATIONS MATRIX', {
        x: dRightX,
        y: pageHeight - 90,
        size: 9.5,
        font: fontSansBold,
        color: colBlack,
      });

      dossierPage.drawLine({
        start: { x: dRightX, y: pageHeight - 98 },
        end: { x: dRightX + dRightW, y: pageHeight - 98 },
        color: colBorder,
        thickness: 0.8,
      });

      const specs = proj.specs || {};
      const specItems = [
        { label: 'SCOPE:', val: sanitizeText(specs.scopeEn, 'Turnkey Fit-Out, 3D Visualization & Shop Drawings') },
        { label: 'TIMELINE:', val: sanitizeText(specs.durationEn, '6 Weeks Concept • 12 Weeks Turnkey Execution') },
        { label: 'LIGHTING:', val: sanitizeText(specs.lightingEn, '3000K Warm Indirect Architectural LED Schemes') },
        { label: 'FLOORING:', val: sanitizeText(specs.flooringEn, 'Natural Botticino Marble Slabs / Engineered Hardwood') },
        { label: 'JOINERY:', val: sanitizeText(specs.joineryEn, 'Bespoke Walnut Millwork with Fluted Acoustic Backing') },
        { label: 'FIRM REF:', val: sanitizeText(proj.firmEn, 'Alaa Issa Atelier & Architectural Practice') },
      ];

      let spY = pageHeight - 116;
      const labelW = 68;
      const valW = dRightW - labelW;

      for (const sp of specItems) {
        dossierPage.drawText(sp.label, {
          x: dRightX,
          y: spY,
          size: 7.5,
          font: fontMono,
          color: colMuted,
        });

        // Strictly wrap every value within its exact allocated column width
        const valLines = wrapText(sp.val, valW, fontSansBold, 7.8);
        let vy = spY;
        for (const vl of valLines) {
          dossierPage.drawText(vl, {
            x: dRightX + labelW,
            y: vy,
            size: 7.8,
            font: fontSansBold,
            color: colBlack,
          });
          vy -= 10.5;
        }

        spY = vy - 4;
      }

      // 2. Tactile Material Curation & Swatches
      spY -= 12;
      dossierPage.drawText('TACTILE MATERIAL CURATION & PALETTE', {
        x: dRightX,
        y: spY,
        size: 9.5,
        font: fontSansBold,
        color: colBlack,
      });

      dossierPage.drawLine({
        start: { x: dRightX, y: spY - 8 },
        end: { x: dRightX + dRightW, y: spY - 8 },
        color: colBorder,
        thickness: 0.8,
      });

      spY -= 20;
      const swatches = (proj.materialSwatches && proj.materialSwatches.length > 0)
        ? proj.materialSwatches
        : [
            { color: '#E7E3DC', nameEn: 'Natural Travertine Slab', finishEn: 'Honed Matte Surface' },
            { color: '#4A3A2C', nameEn: 'Smoked American Walnut', finishEn: 'Bespoke Fluted Millwork' },
            { color: '#A2907D', nameEn: 'Textured Boucle Upholstery', finishEn: 'Tactile Organic Weave' },
            { color: '#1C1B1F', nameEn: 'Hairline Anodized Gunmetal', finishEn: 'Concealed Shadow Gaps' },
          ];

      for (const sw of swatches.slice(0, 4)) {
        // Draw Color Swatch Box
        dossierPage.drawRectangle({
          x: dRightX,
          y: spY - 18,
          width: 22,
          height: 22,
          color: rgb(0.92, 0.90, 0.88),
          borderColor: colBorder,
          borderWidth: 1,
        });

        // Swatch Name & Finish
        dossierPage.drawText(sanitizeText(sw.nameEn, 'Curated Architectural Material'), {
          x: dRightX + 32,
          y: spY - 8,
          size: 8,
          font: fontSansBold,
          color: colBlack,
        });

        dossierPage.drawText(sanitizeText(sw.finishEn, 'Architectural Executive Grade'), {
          x: dRightX + 32,
          y: spY - 18,
          size: 7,
          font: fontSans,
          color: colMuted,
        });

        spY -= 28;
      }

      // Architectural Verification Block
      dossierPage.drawRectangle({
        x: dRightX,
        y: 65,
        width: dRightW,
        height: 38,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 0.8,
      });

      dossierPage.drawText(`DWG REF: ATELIER-2026-${projNum} // CAD FIDELITY 100%`, {
        x: dRightX + 12,
        y: 86,
        size: 7,
        font: fontMono,
        color: colMuted,
      });
      dossierPage.drawText('EXECUTIVE TURNKEY CERTIFICATION // ALAA ISSA ATELIER', {
        x: dRightX + 12,
        y: 74,
        size: 7,
        font: fontMono,
        color: colBlack,
      });
    }

    // -------------------------------------------------------------
    // FINAL PAGE: INQUIRY DIRECTORY & PRACTICE ENDORSEMENT
    // -------------------------------------------------------------
    const endPage = pdfDoc.addPage([pageWidth, pageHeight]);
    endPage.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: colLightBg });
    drawDraftingFrame(endPage);
    drawRunningHeader(endPage, '03 // COMMISSION DIRECTORY & STUDIO REACH', `WORLDWIDE COMMISSIONS // ENG. ${designerName}`);

    endPage.drawText('COMMISSION AN ARCHITECTURAL MONOGRAPH', {
      x: margin + 30,
      y: pageHeight - 110,
      size: 11,
      font: fontMono,
      color: colMuted,
    });

    endPage.drawText('READY TO CONCEIVE A TIMELESS SPACE?', {
      x: margin + 30,
      y: pageHeight - 150,
      size: 28,
      font: fontSerifBold,
      color: colBlack,
    });

    const calloutLines = wrapText(
      'Every space is an exploration of restraint, proportion, and bespoke engineering. Contact Eng. Alaa Issa directly to schedule a project brief session and blueprint review.',
      480,
      fontSans,
      11
    );
    let endDescY = pageHeight - 185;
    for (const el of calloutLines) {
      endPage.drawText(el, { x: margin + 30, y: endDescY, size: 10.5, font: fontSans, color: colCharcoal });
      endDescY -= 16;
    }

    // Studio Principal Seal with Portrait on Final Page
    if (avatarResult) {
      const sealSize = 100;
      const sealX = pageWidth - margin - 30 - sealSize;
      const sealY = pageHeight - 215;

      endPage.drawRectangle({
        x: sealX - 6,
        y: sealY - 6,
        width: sealSize + 12,
        height: sealSize + 12,
        color: rgb(1, 1, 1),
        borderColor: colBorder,
        borderWidth: 1,
      });

      endPage.drawImage(avatarResult.image, {
        x: sealX,
        y: sealY,
        width: sealSize,
        height: sealSize,
      });

      endPage.drawRectangle({
        x: sealX,
        y: sealY,
        width: sealSize,
        height: sealSize,
        borderColor: colBorder,
        borderWidth: 0.5,
      });

      endPage.drawText(`ENG. ${designerName}`, {
        x: sealX,
        y: sealY - 16,
        size: 8.5,
        font: fontSansBold,
        color: colBlack,
      });
      endPage.drawText('PRINCIPAL ARCHITECT // ATELIER', {
        x: sealX,
        y: sealY - 26,
        size: 7,
        font: fontMono,
        color: colMuted,
      });
    }

    // Contact Cards Grid (3 cards across width)
    const contactBoxY = 145;
    const cWidth = (pageWidth - margin * 2 - 60 - 36) / 3;

    // Email Box
    endPage.drawRectangle({
      x: margin + 30,
      y: contactBoxY,
      width: cWidth,
      height: 90,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 1,
    });
    endPage.drawText('ELECTRONIC INQUIRY', { x: margin + 42, y: contactBoxY + 68, size: 7.5, font: fontMono, color: colMuted });
    endPage.drawText(email, { x: margin + 42, y: contactBoxY + 44, size: 9.5, font: fontSansBold, color: colBlack });
    endPage.drawText('Formal Project Briefs & Tenders', { x: margin + 42, y: contactBoxY + 24, size: 7.5, font: fontSans, color: colMuted });

    // WhatsApp Box
    endPage.drawRectangle({
      x: margin + 30 + cWidth + 18,
      y: contactBoxY,
      width: cWidth,
      height: 90,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 1,
    });
    endPage.drawText('DIRECT WHATSAPP CONSULTATION', { x: margin + 42 + cWidth + 18, y: contactBoxY + 68, size: 7.5, font: fontMono, color: colEmerald });
    endPage.drawText(whatsapp, { x: margin + 42 + cWidth + 18, y: contactBoxY + 44, size: 10.5, font: fontMono, color: colBlack });
    endPage.drawText('Immediate Response // Mon-Thu', { x: margin + 42 + cWidth + 18, y: contactBoxY + 24, size: 7.5, font: fontSans, color: colMuted });

    // Studio Location Box
    endPage.drawRectangle({
      x: margin + 30 + (cWidth + 18) * 2,
      y: contactBoxY,
      width: cWidth,
      height: 90,
      color: rgb(1, 1, 1),
      borderColor: colBorder,
      borderWidth: 1,
    });
    endPage.drawText('STUDIO HEADQUARTERS', { x: margin + 42 + (cWidth + 18) * 2, y: contactBoxY + 68, size: 7.5, font: fontMono, color: colMuted });
    endPage.drawText(location, { x: margin + 42 + (cWidth + 18) * 2, y: contactBoxY + 44, size: 9.5, font: fontSansBold, color: colBlack });
    endPage.drawText('Worldwide Architectural Commissions', { x: margin + 42 + (cWidth + 18) * 2, y: contactBoxY + 24, size: 7.5, font: fontSans, color: colMuted });

    // Final Copyright Strip
    endPage.drawLine({
      start: { x: margin + 30, y: 95 },
      end: { x: pageWidth - margin - 30, y: 95 },
      color: colBorder,
      thickness: 1,
    });

    endPage.drawText(`(C) ${new Date().getFullYear()} ENG. ${designerName}. ALL RIGHTS RESERVED.`, {
      x: margin + 30,
      y: 75,
      size: 7.5,
      font: fontMono,
      color: colMuted,
    });

    endPage.drawText('ARCHITECTURAL INTERIOR MONOGRAPH // EDITION 2026', {
      x: pageWidth - margin - 290,
      y: 75,
      size: 7.5,
      font: fontMono,
      color: colMuted,
    });

    // 3. Serialize to PDF bytes
    const pdfBytes = await pdfDoc.save();

    // 4. Return as attachment stream with download headers
    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Alaa-Issa-Architectural-Portfolio-2026.pdf"`,
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    console.error('Error generating portfolio PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate architectural portfolio PDF', details: error?.message },
      { status: 500 }
    );
  }
}
