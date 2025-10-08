# 📄 FileConvert.uz - PDF Word Konverter

Bepul onlayn PDF va Word hujjatlarni konvertatsiya qilish platformasi. SEO-optimized, tez va xavfsiz.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express](https://img.shields.io/badge/Express-5.1.0-green)

## 🌟 Xususiyatlar

- ✅ **PDF to Word** - PDF fayllarni DOCX formatiga konvertatsiya
- ✅ **Word to PDF** - Word hujjatlarni PDF ga konvertatsiya
- ✅ **SEO Optimized** - To'liq metadata, sitemap, robots.txt, Schema.org
- ✅ **Drag & Drop** - Oson fayl yuklash
- ✅ **Progress Bar** - Real-time konvertatsiya jarayoni
- ✅ **Auto Cleanup** - Fayllar 1 soatdan keyin avtomatik o'chiriladi
- ✅ **Mobile Responsive** - Barcha qurilmalarda ishlaydi
- ✅ **Cheklovsiz** - 100% bepul, cheklovsiz

## 🚀 Texnologiyalar

### Frontend
- **Next.js 15.5.4** - App Router, SSR/SSG
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

### Backend
- **Express.js 5.1.0** - API server
- **Multer** - File upload
- **pdf-lib** - PDF manipulation
- **pdfjs-dist** - PDF parsing
- **docx** - Word document creation
- **mammoth** - Word document parsing

## 📂 Loyiha Strukturasi

```
file-convert/
├── src/                    # Frontend (Next.js)
│   ├── app/               # App Router sahifalari
│   │   ├── page.tsx       # Asosiy sahifa
│   │   ├── layout.tsx     # Root layout + SEO metadata
│   │   ├── robots.ts      # robots.txt
│   │   ├── sitemap.ts     # sitemap.xml
│   │   ├── manifest.ts    # PWA manifest
│   │   ├── loading.tsx    # Loading UI
│   │   ├── not-found.tsx  # 404 page
│   │   ├── pdf-to-word/   # PDF to Word sahifa
│   │   └── word-to-pdf/   # Word to PDF sahifa
│   ├── components/        # React komponentlar
│   │   └── FileConverter.tsx
│   └── lib/              # Frontend utilities
│
├── server/                # Backend (Express)
│   ├── index.ts          # Server entry point
│   ├── routes/           # API routes
│   │   ├── index.ts
│   │   └── convert.ts    # Konvertatsiya route
│   ├── controllers/      # Business logic
│   │   └── convertController.ts
│   ├── middleware/       # Custom middleware
│   │   └── upload.ts     # Multer config
│   └── lib/             # Backend utilities
│       ├── pdfToWord.ts  # PDF → Word converter
│       └── wordToPdf.ts  # Word → PDF converter
│
├── public/              # Static fayllar
│   └── uploads/         # Yuklangan fayllar (temp)
│
├── package.json
├── tsconfig.json        # Frontend TypeScript config
├── tsconfig.server.json # Backend TypeScript config
└── next.config.ts       # Next.js konfiguratsiya
```

## ⚙️ O'rnatish va Ishga Tushirish

### 1. Repository ni klonlash
```bash
git clone <repository-url>
cd file-convert
```

### 2. Dependencies o'rnatish
```bash
npm install
```

### 3. Development rejimi

**Frontend + Backend birgalikda:**
```bash
npm run dev:all
```

**Faqat Frontend (Next.js):**
```bash
npm run dev
```
Frontend: http://localhost:3000

**Faqat Backend (Express):**
```bash
npm run dev:server
```
Backend API: http://localhost:5000

### 4. Production build

**Frontend:**
```bash
npm run build
npm start
```

**Backend:**
```bash
npm run build:server
npm run start:server
```

## 📡 API Endpoints

### Health Check
```http
GET http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### File Conversion
```http
POST http://localhost:5000/api/convert
Content-Type: multipart/form-data
```

**Body:**
- `file`: File (PDF yoki DOCX)
- `conversionType`: String (`pdf-to-word` yoki `word-to-pdf`)

**Response:** Konvertatsiya qilingan fayl (download)

## 🎯 SEO Optimizatsiya

### ✅ Implemented SEO Features

1. **Metadata**
   - Dynamic page titles
   - Meta descriptions
   - Keywords optimization
   - Open Graph tags
   - Twitter Card tags

2. **Structured Data**
   - Schema.org WebApplication markup
   - Rich snippets support

3. **Technical SEO**
   - Robots.txt
   - Sitemap.xml
   - PWA Manifest
   - Canonical URLs

4. **Performance**
   - Image optimization (AVIF, WebP)
   - Lazy loading
   - Code splitting
   - Compression enabled

## 🔐 Xavfsizlik

- ✅ File type validation
- ✅ File size limit (10 MB)
- ✅ Auto cleanup (1 soat)
- ✅ CORS configured
- ✅ Error handling

## 📱 Mobile Support

Loyiha to'liq responsive va barcha qurilmalarda ishlaydi:
- 📱 Mobile
- 💻 Tablet
- 🖥️ Desktop

## 🎨 UI/UX

- **Chiroyli dizayn** - Zamonaviy gradient va shadows
- **Intuitiv** - Foydalanuvchi darhol tushunadi
- **Drag & Drop** - Oson fayl yuklash
- **Progress bar** - Real-time feedback
- **Loading states** - Har qanday holatda UI

## 📊 Performance

Target metrics:
- ⚡ Lighthouse Score: 90+
- 🎯 FCP: < 1.5s
- 🎯 LCP: < 2.5s
- 🎯 TTI: < 3.0s

## 🔧 Environment Variables

`.env` faylida quyidagilar o'rnatilishi kerak:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_PATH=./server/database/app.db

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./public/uploads
```

## 📝 TODO

- [ ] Google Analytics integratsiya
- [ ] Multi-language support (UZ, RU, EN)
- [ ] Batch conversion (bir nechta fayl)
- [ ] Password protected PDF support
- [ ] Image to PDF conversion
- [ ] PDF merge/split

## 🤝 Contributing

Pull requestlar qabul qilinadi! Katta o'zgarishlar uchun oldin issue oching.

## 📄 License

MIT

## 👨‍💻 Author

**FileConvert.uz Team**

---

**Yaratilgan Next.js + Express.js bilan ❤️**
