# Website Program Studi D3 Manajemen Informatika

Website resmi Program Studi D3 Manajemen Informatika STIKOM PGRI Banyuwangi yang dibangun menggunakan Next.js dan Supabase.

## 🚀 Fitur Utama

- **Homepage Modern**: Tampilan homepage yang menarik dengan informasi program studi
- **Profil Program Studi**: Halaman lengkap tentang sejarah, visi, misi, dan tujuan
- **Kurikulum Interaktif**: Struktur kurikulum per semester dengan detail mata kuliah
- **Manajemen Berita**: Sistem berita dan pengumuman terintegrasi
- **Galeri**: Galeri foto kegiatan dan fasilitas
- **Database Terintegrasi**: Menggunakan Supabase untuk manajemen data
- **Responsive Design**: Tampilan yang optimal di semua perangkat
- **SEO Optimized**: Struktur yang ramah mesin pencari

## 🛠️ Teknologi yang Digunakan

- **Frontend**: Next.js 15.4.6 dengan React 19
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)
- **Language**: JavaScript/TypeScript

## 📋 Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstall:

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Git
- Akun Supabase (untuk database)

## 🔧 Instalasi dan Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd d3-manajemen-informatika
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root directory dan isi dengan konfigurasi Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Jalankan script SQL yang ada di `database/schema.sql` di SQL Editor Supabase
4. Copy URL project dan anon key ke file `.env.local`

### 5. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## 📁 Struktur Proyek

```
d3-manajemen-informatika/
├── src/
│   └── app/
│       ├── page.js              # Homepage
│       ├── profil/
│       │   └── page.js          # Halaman Profil
│       ├── kurikulum/
│       │   └── page.js          # Halaman Kurikulum
│       ├── layout.js            # Layout utama
│       └── globals.css          # Global styles
├── lib/
│   └── supabase.js              # Konfigurasi Supabase
├── public/
│   ├── logo-prodi.svg           # Logo program studi
│   └── hero-image.svg           # Hero image
├── database/
│   └── schema.sql               # Database schema
├── .env.local.example           # Template environment variables
└── README.md
```

## 🗄️ Database Schema

Database terdiri dari beberapa tabel utama:

- **program_studi**: Informasi program studi
- **dosen**: Data dosen dan staff
- **mahasiswa**: Data mahasiswa
- **mata_kuliah**: Mata kuliah dan kurikulum
- **berita**: Berita dan pengumuman
- **galeri**: Galeri foto
- **prestasi**: Prestasi mahasiswa dan dosen
- **fasilitas**: Fasilitas program studi
- **alumni**: Data alumni
- **kontak_info**: Informasi kontak

## 🚀 Deployment

### Deploy ke Vercel

1. Push code ke GitHub repository
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy!

### Deploy ke Platform Lain

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- Email: info@stikompgri-bwi.ac.id
- Website: [STIKOM PGRI Banyuwangi](https://stikompgri-bwi.ac.id)

---

**Dibuat dengan ❤️ untuk Program Studi D3 Manajemen Informatika STIKOM PGRI Banyuwangi**
