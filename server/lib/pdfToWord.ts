import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';

// PDF.js worker sozlash
// @ts-ignore - Worker file has no type definitions
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function convertPdfToWord(
  pdfPath: string,
  outputPath: string
): Promise<string> {
  try {
    // PDF faylni o'qish
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    const paragraphs: Paragraph[] = [];

    // Har bir sahifani o'qish
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Textni ajratib olish
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      // Agar text bo'sh bo'lmasa, paragraf qo'shish
      if (pageText.trim()) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: pageText,
                size: 24, // 12pt (24 half-points)
              }),
            ],
            spacing: {
              after: 200,
            },
          })
        );
      }

      // Sahifa ajratgich
      if (pageNum < pdf.numPages) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: '', break: 1 })],
          })
        );
      }
    }

    // Word hujjat yaratish
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs.length > 0 
            ? paragraphs 
            : [new Paragraph({ text: 'No text content found in PDF' })],
        },
      ],
    });

    // Faylni saqlash
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  } catch (error) {
    console.error('PDF to Word konvertatsiya xatolik:', error);
    throw new Error('PDF faylni Word ga o\'tkaza olmadik');
  }
}

