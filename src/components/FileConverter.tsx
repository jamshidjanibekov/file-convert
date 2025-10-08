'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Download, Loader2, ArrowRight, X } from 'lucide-react';

type ConversionType = 'pdf-to-word' | 'word-to-pdf';

export default function FileConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [conversionType, setConversionType] = useState<ConversionType>('pdf-to-word');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSetFile = useCallback((selectedFile: File) => {
    const validTypes = conversionType === 'pdf-to-word' 
      ? ['application/pdf']
      : [
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword'
        ];

    if (validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setConvertedFile(null);
    } else {
      alert('Iltimos, to\'g\'ri fayl turini tanlang!');
    }
  }, [conversionType]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, [validateAndSetFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversionType', conversionType);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) throw new Error('Konvertatsiya muvaffaqiyatsiz');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedFile(url);
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Konvertatsiya jarayonida xatolik yuz berdi');
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertedFile(null);
    setProgress(0);
  };

  const getFileExtension = () => {
    return conversionType === 'pdf-to-word' ? 'docx' : 'pdf';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Conversion Type Selector */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 className="text-2xl font-bold mb-6 text-center">Konvertatsiya turini tanlang</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setConversionType('pdf-to-word');
              setFile(null);
              setConvertedFile(null);
            }}
            className={`p-6 rounded-lg border-2 transition-all ${
              conversionType === 'pdf-to-word'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-red-600" />
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-lg">PDF to Word</h4>
            <p className="text-sm text-gray-600 mt-1">{"PDF faylni Word ga o'tkazing"}</p>
          </button>

          <button
            onClick={() => {
              setConversionType('word-to-pdf');
              setFile(null);
              setConvertedFile(null);
            }}
            className={`p-6 rounded-lg border-2 transition-all ${
              conversionType === 'word-to-pdf'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="font-semibold text-lg">Word to PDF</h4>
            <p className="text-sm text-gray-600 mt-1">{"Word faylni PDF ga o'tkazing"}</p>
          </button>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">
              Faylni bu yerga tashlang yoki tanlang
            </h3>
            <p className="text-gray-600 mb-6">
              {conversionType === 'pdf-to-word' ? 'PDF fayl' : 'Word fayl (DOCX)'} tanlang
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept={conversionType === 'pdf-to-word' ? '.pdf' : '.docx,.doc'}
                onChange={handleFileSelect}
                className="hidden"
              />
              <span className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition inline-block">
                Faylni tanlash
              </span>
            </label>
          </div>
        ) : (
          <div>
            {/* Selected File Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-semibold">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-gray-200 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {isConverting && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Konvertatsiya jarayoni...</span>
                  <span className="text-sm text-gray-600">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Convert Button */}
            {!convertedFile && (
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Konvertatsiya qilinmoqda...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    Konvertatsiya qilish
                  </>
                )}
              </button>
            )}

            {/* Download Button */}
            {convertedFile && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-center">
                    ✅ Konvertatsiya muvaffaqiyatli yakunlandi!
                  </p>
                </div>
                <a
                  href={convertedFile}
                  download={`converted.${getFileExtension()}`}
                  className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Faylni yuklab olish
                </a>
                <button
                  onClick={handleReset}
                  className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Yana konvertatsiya qilish
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">📌 Eslatma:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Maksimal fayl hajmi: 10 MB</li>
          <li>{"• Fayllaringiz xavfsiz va 1 soatdan keyin avtomatik o'chiriladi"}</li>
          <li>• Biz sizning fayllaringizni saqlamaymiz va uchinchi shaxslarga bermaymiz</li>
        </ul>
      </div>
    </div>
  );
}

