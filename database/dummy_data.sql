-- Data dummy untuk tabel dosen
INSERT INTO dosen (nidn, nama, email, telepon, jabatan, pendidikan_terakhir, bidang_keahlian, foto_url, status) VALUES
('0015058501', 'Dr. Ahmad Fauzi, M.Kom', 'ahmad.fauzi@stikompgri-bwi.ac.id', '081234567890', 'Ketua Program Studi', 'S3 Ilmu Komputer - Universitas Indonesia', '{"Database Management", "Data Mining"}', '/dosen/ahmad-fauzi.jpg', 'aktif'),
('0015037003', 'Siti Nurhaliza, M.T', 'siti.nurhaliza@stikompgri-bwi.ac.id', '081234567891', 'Sekretaris Program Studi', 'S2 Teknik Informatika - Institut Teknologi Sepuluh Nopember', '{"Web Development", "Mobile Programming"}', '/dosen/siti-nurhaliza.jpg', 'aktif'),
('0015056010', 'Budi Santoso, M.Kom', 'budi.santoso@stikompgri-bwi.ac.id', '081234567892', 'Dosen', 'S2 Ilmu Komputer - Universitas Gadjah Mada', '{"Network Security", "System Administration"}', '/dosen/budi-santoso.jpg', 'aktif'),
('0015029020', 'Rina Kartika, M.T', 'rina.kartika@stikompgri-bwi.ac.id', '081234567893', 'Dosen', 'S2 Teknik Informatika - Universitas Brawijaya', '{"Artificial Intelligence", "Machine Learning"}', '/dosen/rina-kartika.jpg', 'aktif'),
('0015048015', 'Dedi Kurniawan, M.Kom', 'dedi.kurniawan@stikompgri-bwi.ac.id', '081234567894', 'Dosen', 'S2 Ilmu Komputer - Universitas Airlangga', '{"Software Engineering", "Project Management"}', '/dosen/dedi-kurniawan.jpg', 'aktif'),
('0015010110', 'Maya Sari, M.T', 'maya.sari@stikompgri-bwi.ac.id', '081234567895', 'Dosen', 'S2 Teknik Informatika - Institut Teknologi Bandung', '{"Human Computer Interaction", "UI/UX Design"}', '/dosen/maya-sari.jpg', 'aktif');

-- Data dummy untuk tabel program_studi
INSERT INTO program_studi (nama, deskripsi, visi, misi, tujuan, akreditasi, tahun_berdiri) VALUES
('D3 Manajemen Informatika', 
 'Program studi yang menghasilkan lulusan kompeten di bidang manajemen teknologi informasi dengan kemampuan teknis dan manajerial yang seimbang.',
 'Menjadi program studi unggulan dalam bidang manajemen informatika yang menghasilkan lulusan berkualitas dan berdaya saing tinggi.',
 'Menyelenggarakan pendidikan berkualitas di bidang manajemen informatika; Mengembangkan penelitian dan pengabdian masyarakat; Menjalin kerjasama dengan berbagai pihak.',
 'Menghasilkan lulusan yang kompeten di bidang manajemen informatika; Mengembangkan ilmu pengetahuan dan teknologi; Memberikan kontribusi kepada masyarakat.',
 'B',
 2010);

-- Data dummy untuk tabel mata_kuliah
INSERT INTO mata_kuliah (kode_mk, nama, sks, semester, deskripsi, prasyarat) VALUES
-- Semester 1
('MK001', 'Matematika Dasar', 3, 1, 'Mata kuliah matematika dasar untuk program informatika', '{}'),
('MK002', 'Algoritma dan Pemrograman', 4, 1, 'Mata kuliah dasar algoritma dan pemrograman komputer', '{}'),
('MK003', 'Pengantar Teknologi Informasi', 3, 1, 'Mata kuliah pengenalan dasar teknologi informasi dan komputer', '{}'),
('MK004', 'Bahasa Inggris I', 2, 1, 'Mata kuliah bahasa Inggris tingkat dasar', '{}'),
('MK005', 'Pancasila', 2, 1, 'Mata kuliah pendidikan Pancasila', '{}'),
('MK006', 'Agama', 2, 1, 'Mata kuliah pendidikan agama', '{}'),

-- Semester 2
('MK007', 'Statistika', 3, 2, 'Mata kuliah statistika untuk analisis data', '{"MK001"}'),
('MK008', 'Pemrograman Web I', 4, 2, 'Mata kuliah dasar pengembangan aplikasi web', '{"MK002"}'),
('MK009', 'Basis Data I', 4, 2, 'Mata kuliah konsep dan implementasi basis data', '{"MK003"}'),
('MK010', 'Sistem Operasi', 3, 2, 'Mata kuliah tentang sistem operasi komputer', '{"MK003"}'),
('MK011', 'Bahasa Inggris II', 2, 2, 'Mata kuliah bahasa Inggris tingkat menengah', '{"MK004"}'),
('MK012', 'Kewarganegaraan', 2, 2, 'Mata kuliah pendidikan kewarganegaraan', '{}'),

-- Semester 3
('MK013', 'Analisis dan Perancangan Sistem', 4, 3, 'Mata kuliah analisis dan perancangan sistem informasi', '{"MK009"}'),
('MK014', 'Pemrograman Web II', 4, 3, 'Mata kuliah lanjutan pengembangan aplikasi web', '{"MK008"}'),
('MK015', 'Basis Data II', 4, 3, 'Mata kuliah lanjutan basis data dan administrasi', '{"MK009"}'),
('MK016', 'Jaringan Komputer', 3, 3, 'Mata kuliah tentang jaringan komputer dan komunikasi data', '{"MK010"}'),
('MK017', 'Manajemen Proyek TI', 3, 3, 'Mata kuliah manajemen proyek teknologi informasi', '{"MK013"}'),

-- Semester 4
('MK018', 'Pemrograman Mobile', 4, 4, 'Mata kuliah pengembangan aplikasi mobile', '{"MK014"}'),
('MK019', 'Sistem Informasi Manajemen', 3, 4, 'Mata kuliah sistem informasi untuk manajemen', '{"MK015"}'),
('MK020', 'Keamanan Sistem Informasi', 3, 4, 'Mata kuliah keamanan dalam sistem informasi', '{"MK015", "MK016"}'),
('MK021', 'E-Business', 3, 4, 'Mata kuliah tentang bisnis elektronik', '{"MK014"}'),
('MK022', 'Metodologi Penelitian', 2, 4, 'Mata kuliah metodologi penelitian', '{}'),
('MK023', 'Mata Kuliah Pilihan I', 3, 4, 'Mata kuliah pilihan sesuai minat mahasiswa', '{}'),

-- Semester 5
('MK024', 'Framework Programming', 4, 5, 'Mata kuliah penggunaan framework dalam pemrograman', '{"MK018"}'),
('MK025', 'Business Intelligence', 3, 5, 'Mata kuliah tentang business intelligence dan data warehouse', '{"MK019"}'),
('MK026', 'Audit Sistem Informasi', 3, 5, 'Mata kuliah audit dan evaluasi sistem informasi', '{"MK020"}'),
('MK027', 'Kewirausahaan', 2, 5, 'Mata kuliah pengembangan jiwa kewirausahaan', '{}'),
('MK028', 'Mata Kuliah Pilihan II', 3, 5, 'Mata kuliah pilihan lanjutan', '{}'),
('MK029', 'Mata Kuliah Pilihan III', 3, 5, 'Mata kuliah pilihan spesialisasi', '{}'),

-- Semester 6
('MK030', 'Kerja Praktik', 4, 6, 'Kerja praktik di industri atau instansi', '{"MK024", "MK025"}'),
('MK031', 'Tugas Akhir', 6, 6, 'Tugas akhir mahasiswa', '{"MK022", "MK026"}'),
('MK032', 'Seminar', 2, 6, 'Seminar hasil tugas akhir', '{"MK031"}')

-- Mata kuliah pilihan
ON CONFLICT (kode_mk) DO UPDATE SET
  nama = EXCLUDED.nama,
  sks = EXCLUDED.sks,
  semester = EXCLUDED.semester,
  deskripsi = EXCLUDED.deskripsi,
  prasyarat = EXCLUDED.prasyarat;

-- Data dummy untuk tabel mahasiswa
INSERT INTO mahasiswa (nim, nama, email, telepon, alamat, tanggal_lahir, jenis_kelamin, angkatan, status, foto_url) VALUES
('2024001', 'Ahmad Rizki Pratama', 'ahmad.rizki@student.stikompgri-bwi.ac.id', '081234567801', 'Jl. Mawar No. 10, Malang', '2005-03-15', 'L', 2024, 'aktif', '/mahasiswa/ahmad-rizki.jpg'),
('2024002', 'Siti Nurhaliza', 'siti.nurhaliza@student.stikompgri-bwi.ac.id', '081234567802', 'Jl. Melati No. 5, Malang', '2005-07-22', 'P', 2024, 'aktif', '/mahasiswa/siti-nurhaliza.jpg'),
('2023015', 'Budi Santoso', 'budi.santoso@student.stikompgri-bwi.ac.id', '081234567815', 'Jl. Anggrek No. 8, Malang', '2004-11-10', 'L', 2023, 'aktif', '/mahasiswa/budi-santoso.jpg'),
('2023025', 'Rina Kartika', 'rina.kartika@student.stikompgri-bwi.ac.id', '081234567825', 'Jl. Dahlia No. 12, Malang', '2004-09-18', 'P', 2023, 'aktif', '/mahasiswa/rina-kartika.jpg'),
('2022030', 'Dedi Kurniawan', 'dedi.kurniawan@student.stikompgri-bwi.ac.id', '081234567830', 'Jl. Kenanga No. 7, Malang', '2003-12-05', 'L', 2022, 'aktif', '/mahasiswa/dedi-kurniawan.jpg'),
('2022035', 'Maya Sari', 'maya.sari@student.stikompgri-bwi.ac.id', '081234567835', 'Jl. Tulip No. 15, Malang', '2003-08-28', 'P', 2022, 'aktif', '/mahasiswa/maya-sari.jpg');

-- Data dummy untuk tabel prestasi
INSERT INTO prestasi (judul, deskripsi, kategori, tingkat, tahun, penerima_id, penerima_type, gambar_url) VALUES
('Juara 1 Lomba Programming Nasional', 'Meraih juara pertama dalam lomba programming tingkat nasional yang diselenggarakan oleh DIKTI', 'mahasiswa', 'Nasional', 2024, (SELECT id FROM mahasiswa WHERE nim = '2024001'), 'mahasiswa', '/prestasi/programming-1.jpg'),
('Juara 2 Web Design Competition', 'Meraih juara kedua dalam kompetisi desain web tingkat regional Jawa Timur', 'mahasiswa', 'Regional', 2024, (SELECT id FROM mahasiswa WHERE nim = '2023015'), 'mahasiswa', '/prestasi/webdesign-1.jpg'),
('Best Innovation Award', 'Mendapat penghargaan inovasi terbaik dalam kompetisi teknologi tingkat nasional', 'mahasiswa', 'Nasional', 2024, (SELECT id FROM mahasiswa WHERE nim = '2022030'), 'mahasiswa', '/prestasi/innovation-1.jpg'),
('Juara 3 Mobile App Development', 'Meraih juara ketiga dalam lomba pengembangan aplikasi mobile', 'mahasiswa', 'Regional', 2023, (SELECT id FROM mahasiswa WHERE nim = '2023025'), 'mahasiswa', '/prestasi/mobile-1.jpg');

-- Data dummy untuk tabel kurikulum
INSERT INTO kurikulum (tahun_kurikulum, nama, deskripsi, status) VALUES
(2023, 'Kurikulum 2023', 'Kurikulum terbaru yang disesuaikan dengan kebutuhan industri 4.0', 'aktif');

-- Data dummy untuk tabel berita
INSERT INTO berita (judul, slug, konten, excerpt, gambar_url, kategori, status, published_at) VALUES
('Penerimaan Mahasiswa Baru 2024', 'penerimaan-mahasiswa-baru-2024', 'Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka...', 'Pendaftaran mahasiswa baru telah dibuka', '/berita/pmb-2024.jpg', 'akademik', 'published', NOW()),
('Workshop Teknologi Terbaru', 'workshop-teknologi-terbaru', 'Program studi mengadakan workshop tentang teknologi terbaru...', 'Workshop teknologi untuk mahasiswa', '/berita/workshop.jpg', 'kegiatan', 'published', NOW() - INTERVAL '1 day'),
('Prestasi Mahasiswa di Kompetisi Nasional', 'prestasi-mahasiswa-kompetisi-nasional', 'Mahasiswa D3 Manajemen Informatika meraih juara dalam kompetisi...', 'Mahasiswa meraih prestasi gemilang', '/berita/prestasi.jpg', 'prestasi', 'published', NOW() - INTERVAL '2 days');

-- Data dummy untuk tabel fasilitas
INSERT INTO fasilitas (nama, deskripsi, kategori, kapasitas, lokasi, gambar_url, status) VALUES
('Laboratorium Komputer 1', 'Laboratorium dengan 40 unit komputer untuk praktikum', 'laboratorium', 40, 'Gedung A Lantai 2', '/fasilitas/lab-komputer-1.jpg', 'aktif'),
('Laboratorium Jaringan', 'Laboratorium khusus untuk praktikum jaringan komputer', 'laboratorium', 30, 'Gedung A Lantai 3', '/fasilitas/lab-jaringan.jpg', 'aktif'),
('Ruang Kelas Multimedia', 'Ruang kelas dengan fasilitas multimedia lengkap', 'ruang_kelas', 50, 'Gedung B Lantai 1', '/fasilitas/ruang-multimedia.jpg', 'aktif'),
('Perpustakaan Digital', 'Perpustakaan dengan koleksi buku digital dan cetak', 'perpustakaan', 100, 'Gedung C Lantai 1', '/fasilitas/perpustakaan.jpg', 'aktif');

-- Data dummy untuk tabel kontak_info
INSERT INTO kontak_info (jenis, nilai, label, urutan, aktif) VALUES
('alamat', 'Jl. Ikan Tongkol No. 22, Banyuwangi, Jawa Timur 68416', 'Alamat Kampus', 1, true),
('telepon', '(0333) 421593', 'Telepon', 2, true),
('email', 'info@stikompgri-bwi.ac.id', 'Email', 3, true),
('website', 'https://stikompgri-bwi.ac.id', 'Website', 4, true),
('facebook', 'https://facebook.com/stikompgribanyuwangi', 'Facebook', 5, true),
('instagram', 'https://instagram.com/stikompgribwi', 'Instagram', 6, true);

-- Data dummy untuk tabel portofolio
INSERT INTO portofolio (judul, deskripsi, mahasiswa_id, kategori, teknologi, demo_url, github_url, tahun, featured, status) VALUES
('Sistem Informasi Perpustakaan', 'Aplikasi web untuk manajemen perpustakaan dengan fitur peminjaman, pengembalian, dan katalog buku digital.', (SELECT id FROM mahasiswa WHERE nim = '2021001'), 'web', ARRAY['React', 'Node.js', 'MySQL', 'Bootstrap'], '#', '#', 2023, true, 'aktif'),
('Aplikasi Mobile E-Commerce', 'Aplikasi mobile untuk toko online dengan fitur keranjang belanja, pembayaran, dan tracking pesanan.', (SELECT id FROM mahasiswa WHERE nim = '2021002'), 'mobile', ARRAY['React Native', 'Firebase', 'Redux', 'Stripe API'], '#', '#', 2023, true, 'aktif'),
('Dashboard Analytics', 'Dashboard untuk visualisasi data penjualan dengan grafik interaktif dan laporan real-time.', (SELECT id FROM mahasiswa WHERE nim = '2021003'), 'web', ARRAY['Vue.js', 'Chart.js', 'Laravel', 'PostgreSQL'], '#', '#', 2023, false, 'aktif'),
('Game Edukasi Matematika', 'Game edukasi untuk anak-anak belajar matematika dengan konsep gamifikasi yang menyenangkan.', (SELECT id FROM mahasiswa WHERE nim = '2021004'), 'game', ARRAY['Unity', 'C#', 'SQLite', 'Adobe Illustrator'], '#', '#', 2023, true, 'aktif'),
('IoT Smart Home System', 'Sistem rumah pintar dengan kontrol lampu, AC, dan keamanan melalui aplikasi mobile.', (SELECT id FROM mahasiswa WHERE nim = '2021005'), 'iot', ARRAY['Arduino', 'ESP32', 'Flutter', 'MQTT', 'Firebase'], '#', '#', 2023, false, 'aktif'),
('Aplikasi Manajemen Keuangan', 'Aplikasi untuk mencatat dan menganalisis pengeluaran pribadi dengan fitur budgeting dan reminder.', (SELECT id FROM mahasiswa WHERE nim = '2021006'), 'mobile', ARRAY['Flutter', 'Dart', 'SQLite', 'Provider'], '#', '#', 2023, false, 'aktif');

-- Dummy data untuk skills
INSERT INTO skills (mahasiswa_id, nama_skill, kategori, level, tahun_diperoleh, status) VALUES
-- Programming Skills
((SELECT id FROM mahasiswa WHERE nim = '2021001'), 'JavaScript', 'programming', 'advanced', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021001'), 'Python', 'programming', 'intermediate', 2022, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021002'), 'React Native', 'framework', 'advanced', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021002'), 'Firebase', 'database', 'intermediate', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021003'), 'Vue.js', 'framework', 'advanced', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021003'), 'Laravel', 'framework', 'intermediate', 2022, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021004'), 'Unity', 'tools', 'advanced', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021004'), 'C#', 'programming', 'intermediate', 2022, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021005'), 'Arduino', 'tools', 'expert', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021005'), 'Flutter', 'framework', 'intermediate', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021006'), 'Dart', 'programming', 'intermediate', 2023, 'aktif'),
((SELECT id FROM mahasiswa WHERE nim = '2021006'), 'SQLite', 'database', 'intermediate', 2022, 'aktif');

-- Insert dummy users
INSERT INTO users (email, password_hash, role, profile_id, is_active) VALUES
('admin@stikom.ac.id', '$2b$10$example_hash_admin', 'admin', NULL, true),
('dosen@stikom.ac.id', '$2b$10$example_hash_dosen', 'dosen', (SELECT id FROM dosen LIMIT 1), true),
('mahasiswa@stikom.ac.id', '$2b$10$example_hash_mahasiswa', 'mahasiswa', (SELECT id FROM mahasiswa LIMIT 1), true);

