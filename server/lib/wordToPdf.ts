import mammoth from 'mammoth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs';

export async function convertWordToPdf(
  wordPath: string,
  outputPath: string
): Promise<string> {
  try {
    // Word fayldan textni ajratib olish
    const result = await mammoth.extractRawText({ path: wordPath });
    const text = result.value;

    // Yangi PDF hujjat yaratish
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const margin = 50;
    const pageWidth = 595; // A4 width in points
    const pageHeight = 842; // A4 height in points
    const lineHeight = fontSize * 1.5;
    const maxWidth = pageWidth - 2 * margin;

    // Textni qatorlarga bo'lish
    const lines = wrapText(text, font, fontSize, maxWidth);

    let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    for (const line of lines) {
      // Agar sahifa tugasa, yangi sahifa qo'shish
      if (yPosition < margin) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      // Textni chizish
      currentPage.drawText(line, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      yPosition -= lineHeight;
    }

    // PDF faylni saqlash
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    return outputPath;
  } catch (error) {
    console.error('Word to PDF konvertatsiya xatolik:', error);
    throw new Error('Word faylni PDF ga o\'tkaza olmadik');
  }
}

// Text wrap helper function
function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

