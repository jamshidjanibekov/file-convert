import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: "PDF to Word - Bepul PDF ni Word ga o'tkazish",
  description: "PDF fayllaringizni Word (DOCX) formatiga bepul va tez konvertatsiya qiling. Ro'yxatdan o'tishsiz, cheklovsiz.",
};

export default function PdfToWordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Bosh sahifaga qaytish
        </Link>

        <h1 className="text-4xl font-bold mb-4">PDF to Word Konverter</h1>
        <p className="text-lg text-gray-600 mb-8">
          PDF fayllaringizni Word formatiga oson konvertatsiya qiling
        </p>

        {/* FileConverter component bu yerda */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 text-center">
            {"Tez orada bu sahifa to'liq ishlaydi..."}
          </p>
        </div>
      </div>
    </div>
  );
}

