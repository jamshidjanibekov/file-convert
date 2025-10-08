import { Metadata } from 'next';
import FileConverter from '@/components/FileConverter';
import { FileText, Download, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bosh Sahifa',
  description: 'PDF va Word hujjatlarni bepul va tez konvertatsiya qiling',
};

// Schema.org structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Word Konverter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Bepul onlayn PDF va Word hujjatlarni konvertatsiya qiling',
  featureList: [
    'PDF to Word konvertatsiya',
    'Word to PDF konvertatsiya',
    'Tez va xavfsiz',
    'Cheklovsiz',
  ],
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  FileConvert<span className="text-blue-600">.uz</span>
                </h1>
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition">
                  Xususiyatlar
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">
                  Qanday ishlaydi
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            PDF va Word hujjatlarni
            <br />
            <span className="text-blue-600">onlayn konvertatsiya</span> qiling
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {"Bepul, tez va xavfsiz. Ro'yxatdan o'tishsiz, yuklab olishsiz. Fayllaringiz xavfsiz saqlanadi va avtomatik o'chiriladi."}
          </p>
        </section>

        {/* Converter Component */}
        <section className="container mx-auto px-4 pb-16">
          <FileConverter />
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Nima uchun bizni tanlash kerak?
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Tez</h4>
                <p className="text-gray-600">
                  Soniyalar ichida konvertatsiya qiling
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Xavfsiz</h4>
                <p className="text-gray-600">
                  Fayllaringiz xavfsiz va maxfiy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Bepul</h4>
                <p className="text-gray-600">
                  Cheklovsiz, 100% bepul
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Sifatli</h4>
                <p className="text-gray-600">
                  Yuqori sifatli konvertatsiya
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Qanday ishlaydi?
            </h3>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Faylni tanlang</h4>
                  <p className="text-gray-600">
                    {"PDF yoki Word faylingizni yuklang (drag & drop yoki tanlash)"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Konvertatsiya turini tanlang</h4>
                  <p className="text-gray-600">
                    PDF to Word yoki Word to PDF ni tanlang
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Yuklab oling</h4>
                  <p className="text-gray-600">
                    Konvertatsiya tugagach, faylni darhol yuklab oling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6" />
                  <span className="text-xl font-bold">FileConvert.uz</span>
                </div>
                <p className="text-gray-400">
                  Bepul onlayn fayl konvertatsiya xizmati
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Xizmatlar</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/pdf-to-word" className="hover:text-white transition">PDF to Word</a></li>
                  <li><a href="/word-to-pdf" className="hover:text-white transition">Word to PDF</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">{"Ma'lumot"}</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-white transition">Biz haqimizda</a></li>
                  <li><a href="/privacy" className="hover:text-white transition">Maxfiylik</a></li>
                  <li><a href="/terms" className="hover:text-white transition">Foydalanish shartlari</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2025 FileConvert.uz. Barcha huquqlar himoyalangan.</p>
            </div>
        </div>
      </footer>
    </div>
    </>
  );
}
