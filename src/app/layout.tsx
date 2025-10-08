import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fileconvert.uz'), // O'zingizning domeningizni qo'ying
  title: {
    default: 'PDF Word Konverter - Bepul Onlayn Fayl Konvertatsiya',
    template: '%s | PDF Word Konverter'
  },
  description: 'Bepul onlayn PDF va Word hujjatlarni konvertatsiya qiling. Tez, xavfsiz va oson. PDF ni Word ga, Word ni PDF ga o\'tkazing. Ro\'yxatdan o\'tishsiz, cheklovsiz.',
  keywords: [
    'PDF Word konverter',
    'PDF ga o\'tkazish',
    'Word ga o\'tkazish',
    'PDF to Word',
    'Word to PDF',
    'bepul konverter',
    'onlayn konverter',
    'fayl konvertatsiya',
    'hujjat konvertatsiya',
    'PDF converter',
    'DOCX converter'
  ],
  authors: [{ name: 'FileConvert.uz' }],
  creator: 'FileConvert.uz',
  publisher: 'FileConvert.uz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://fileconvert.uz',
    title: 'PDF Word Konverter - Bepul Onlayn Fayl Konvertatsiya',
    description: 'Bepul onlayn PDF va Word hujjatlarni konvertatsiya qiling. Tez, xavfsiz va oson.',
    siteName: 'FileConvert.uz',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'PDF Word Konverter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Word Konverter - Bepul Onlayn',
    description: 'PDF va Word hujjatlarni tez va oson konvertatsiya qiling',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification
    google: 'your-google-verification-code',
    // Yandex verification
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
