import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { convertPdfToWord } from '../lib/pdfToWord';
import { convertWordToPdf } from '../lib/wordToPdf';

export const convertFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Fayl topilmadi' });
    }

    const { conversionType } = req.body;
    const inputPath = req.file.path;
    const outputFilename = `converted-${Date.now()}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    let outputPath: string;
    let outputExtension: string;

    try {
      if (conversionType === 'pdf-to-word') {
        outputExtension = '.docx';
        outputPath = path.join(uploadDir, outputFilename + outputExtension);
        await convertPdfToWord(inputPath, outputPath);
      } else if (conversionType === 'word-to-pdf') {
        outputExtension = '.pdf';
        outputPath = path.join(uploadDir, outputFilename + outputExtension);
        await convertWordToPdf(inputPath, outputPath);
      } else {
        // Input faylni o'chirish
        fs.unlinkSync(inputPath);
        return res.status(400).json({ error: 'Noto\'g\'ri konvertatsiya turi' });
      }

      // Konvertatsiya qilingan faylni yuborish
      res.download(outputPath, `converted${outputExtension}`, (err) => {
        // Fayllarni tozalash
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (cleanupError) {
          console.error('Fayllarni tozalashda xatolik:', cleanupError);
        }

        if (err) {
          console.error('Faylni yuborishda xatolik:', err);
          return res.status(500).json({ error: 'Faylni yuklab olishda xatolik' });
        }
      });
    } catch (conversionError) {
      // Konvertatsiya xatolik bo'lsa, input faylni o'chirish
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      throw conversionError;
    }
  } catch (error) {
    console.error('Konvertatsiya xatolik:', error);
    res.status(500).json({ 
      error: 'Konvertatsiya jarayonida xatolik yuz berdi',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Eski fayllarni tozalash (1 soatdan eski)
export const cleanupOldFiles = () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const oneHourAgo = Date.now() - 60 * 60 * 1000;

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Fayllarni o\'qishda xatolik:', err);
      return;
    }

    files.forEach((file) => {
      if (file === '.gitkeep') return;

      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;

        if (stats.mtimeMs < oneHourAgo) {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Faylni o\'chirishda xatolik:', err);
            else console.log('Eski fayl o\'chirildi:', file);
          });
        }
      });
    });
  });
};

// Har 30 daqiqada eski fayllarni tozalash
setInterval(cleanupOldFiles, 30 * 60 * 1000);

