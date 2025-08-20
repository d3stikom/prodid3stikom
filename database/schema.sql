-- Database Schema untuk Website Prodi D3 Manajemen Informatika

-- Tabel untuk informasi program studi
CREATE TABLE program_studi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    visi TEXT,
    misi TEXT,
    tujuan TEXT,
    akreditasi VARCHAR(10),
    tahun_berdiri INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk dosen
CREATE TABLE dosen (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nidn VARCHAR(20) UNIQUE,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telepon VARCHAR(20),
    jabatan VARCHAR(100),
    pendidikan_terakhir VARCHAR(100),
    bidang_keahlian TEXT[],
    foto_url TEXT,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk mahasiswa
CREATE TABLE mahasiswa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nim VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telepon VARCHAR(20),
    alamat TEXT,
    tanggal_lahir DATE,
    jenis_kelamin VARCHAR(10),
    angkatan INTEGER,
    status VARCHAR(20) DEFAULT 'aktif',
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk mata kuliah
CREATE TABLE mata_kuliah (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kode_mk VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(255) NOT NULL,
    sks INTEGER NOT NULL,
    semester INTEGER,
    deskripsi TEXT,
    prasyarat TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk kurikulum
CREATE TABLE kurikulum (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tahun_kurikulum INTEGER NOT NULL,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel relasi kurikulum dan mata kuliah
CREATE TABLE kurikulum_mata_kuliah (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kurikulum_id UUID REFERENCES kurikulum(id) ON DELETE CASCADE,
    mata_kuliah_id UUID REFERENCES mata_kuliah(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    wajib BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk berita dan pengumuman
CREATE TABLE berita (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    konten TEXT NOT NULL,
    excerpt TEXT,
    gambar_url TEXT,
    kategori VARCHAR(50),
    status VARCHAR(20) DEFAULT 'draft',
    author_id UUID REFERENCES dosen(id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk galeri
CREATE TABLE galeri (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    gambar_url TEXT NOT NULL,
    kategori VARCHAR(50),
    tanggal_foto DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk prestasi
CREATE TABLE prestasi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    kategori VARCHAR(50), -- mahasiswa, dosen, institusi
    tingkat VARCHAR(50), -- lokal, nasional, internasional
    tahun INTEGER,
    penerima_id UUID, -- bisa mahasiswa_id atau dosen_id
    penerima_type VARCHAR(20), -- 'mahasiswa' atau 'dosen'
    gambar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk fasilitas
CREATE TABLE fasilitas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    kategori VARCHAR(50), -- laboratorium, ruang_kelas, perpustakaan, dll
    kapasitas INTEGER,
    lokasi VARCHAR(255),
    gambar_url TEXT,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk kontak dan informasi
CREATE TABLE kontak_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    jenis VARCHAR(50) NOT NULL, -- alamat, telepon, email, website, dll
    nilai TEXT NOT NULL,
    label VARCHAR(100),
    urutan INTEGER DEFAULT 0,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk alumni
CREATE TABLE alumni (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    nim VARCHAR(20),
    tahun_lulus INTEGER,
    pekerjaan_saat_ini VARCHAR(255),
    perusahaan VARCHAR(255),
    email VARCHAR(255),
    telepon VARCHAR(20),
    linkedin_url TEXT,
    foto_url TEXT,
    testimoni TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk portofolio mahasiswa
CREATE TABLE portofolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    mahasiswa_id UUID REFERENCES mahasiswa(id),
    kategori VARCHAR(50), -- web, mobile, game, iot
    teknologi TEXT[], -- array teknologi yang digunakan
    gambar_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    tahun INTEGER,
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX idx_berita_status ON berita(status);
CREATE INDEX idx_berita_kategori ON berita(kategori);
CREATE INDEX idx_berita_published_at ON berita(published_at);
CREATE INDEX idx_mahasiswa_angkatan ON mahasiswa(angkatan);
CREATE INDEX idx_mata_kuliah_semester ON mata_kuliah(semester);
CREATE INDEX idx_prestasi_kategori ON prestasi(kategori);
CREATE INDEX idx_prestasi_tahun ON prestasi(tahun);

-- Row Level Security (RLS)
ALTER TABLE program_studi ENABLE ROW LEVEL SECURITY;
ALTER TABLE dosen ENABLE ROW LEVEL SECURITY;
ALTER TABLE mahasiswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE mata_kuliah ENABLE ROW LEVEL SECURITY;
ALTER TABLE kurikulum ENABLE ROW LEVEL SECURITY;
ALTER TABLE kurikulum_mata_kuliah ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasilitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontak_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE portofolio ENABLE ROW LEVEL SECURITY;

-- Policies untuk public read access
CREATE POLICY "Public can read program_studi" ON program_studi FOR SELECT USING (true);
CREATE POLICY "Public can read dosen" ON dosen FOR SELECT USING (status = 'aktif');
CREATE POLICY "Public can read published berita" ON berita FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read galeri" ON galeri FOR SELECT USING (true);
CREATE POLICY "Public can read prestasi" ON prestasi FOR SELECT USING (true);
CREATE POLICY "Public can read fasilitas" ON fasilitas FOR SELECT USING (status = 'aktif');
CREATE POLICY "Public can read kontak_info" ON kontak_info FOR SELECT USING (aktif = true);
CREATE POLICY "Public can read alumni" ON alumni FOR SELECT USING (true);
CREATE POLICY "Public can read mata_kuliah" ON mata_kuliah FOR SELECT USING (true);
CREATE POLICY "Public can read kurikulum" ON kurikulum FOR SELECT USING (status = 'aktif');
CREATE POLICY "Public can read kurikulum_mata_kuliah" ON kurikulum_mata_kuliah FOR SELECT USING (true);
CREATE POLICY "Public can read portofolio" ON portofolio FOR SELECT USING (status = 'aktif');

-- Tabel untuk skills/keahlian mahasiswa
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mahasiswa_id UUID REFERENCES mahasiswa(id),
    nama_skill VARCHAR(255) NOT NULL,
    kategori VARCHAR(50), -- programming, design, database, framework, tools
    level VARCHAR(20), -- beginner, intermediate, advanced, expert
    sertifikat_url TEXT,
    deskripsi TEXT,
    tahun_diperoleh INTEGER,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index dan RLS untuk skills
CREATE INDEX idx_skills_kategori ON skills(kategori);
CREATE INDEX idx_skills_level ON skills(level);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (status = 'aktif');
ALTER TABLE portofolio ENABLE ROW LEVEL SECURITY;

-- 🏗️ **Struktur Dashboard Multi-Level**

### 1. **Update Database Schema untuk Authentication**

Tambahkan ke <mcfile name="schema.sql" path="e:\Web\database\schema.sql"></mcfile>:
```sql
-- Tabel untuk autentikasi dan role management
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'dosen', 'mahasiswa')),
    profile_id UUID, -- referensi ke tabel dosen atau mahasiswa
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_profile_id ON users(profile_id);

-- RLS untuk users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy untuk users - hanya admin yang bisa melihat semua user
CREATE POLICY "Admin can manage all users" ON users 
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view own profile" ON users 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users 
    FOR UPDATE USING (auth.uid() = id);
```