'use client';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  // Data dummy untuk development
  const dummyBerita = [
      {
        id: 1,
        judul: "Mahasiswa D3 MI Raih Juara 1 Lomba Programming Nasional 2024",
        slug: "mahasiswa-d3-mi-raih-juara-1-lomba-programming-nasional-2024",
        konten: "Ahmad Rizki Pratama, mahasiswa angkatan 2022 berhasil meraih juara 1 dalam Lomba Programming Nasional yang diselenggarakan oleh DIKTI. Kompetisi ini diikuti oleh lebih dari 500 peserta dari seluruh Indonesia.",
        excerpt: "Ahmad Rizki Pratama berhasil meraih juara 1 dalam Lomba Programming Nasional DIKTI 2024.",
        featured_image: "/berita/programming-competition.jpg",
        kategori: "Prestasi",
        status: "published",
        published_at: "2024-12-15T10:00:00Z",
        author_id: 1,
        dosen: { nama: "Dr. Ahmad Fauzi, M.Kom" }
      },
      {
        id: 2,
        judul: "Kerjasama Program Studi dengan PT. Telkom Indonesia",
        slug: "kerjasama-program-studi-dengan-pt-telkom-indonesia",
        konten: "Program Studi D3 Manajemen Informatika menjalin kerjasama strategis dengan PT. Telkom Indonesia untuk program magang dan rekrutmen lulusan. Kerjasama ini akan memberikan kesempatan bagi mahasiswa untuk mendapatkan pengalaman kerja di perusahaan BUMN terkemuka.",
        excerpt: "Kerjasama strategis dengan PT. Telkom Indonesia untuk program magang dan rekrutmen lulusan.",
        featured_image: "/berita/telkom-partnership.jpg",
        kategori: "Kerjasama",
        status: "published",
        published_at: "2024-12-10T14:30:00Z",
        author_id: 2,
        dosen: { nama: "Siti Nurhaliza, M.T" }
      },
      {
        id: 3,
        judul: "Workshop UI/UX Design untuk Mahasiswa Semester 4",
        slug: "workshop-ui-ux-design-untuk-mahasiswa-semester-4",
        konten: "Program Studi mengadakan workshop UI/UX Design yang dikhususkan untuk mahasiswa semester 4. Workshop ini menghadirkan praktisi profesional dari industri kreatif digital untuk berbagi pengalaman dan best practices dalam desain antarmuka pengguna.",
        excerpt: "Workshop UI/UX Design dengan praktisi profesional industri kreatif digital.",
        featured_image: "/berita/uiux-workshop.jpg",
        kategori: "Kegiatan",
        status: "published",
        published_at: "2024-12-08T09:00:00Z",
        author_id: 3,
        dosen: { nama: "Maya Sari, M.T" }
      },
      {
        id: 4,
        judul: "Pengumuman Jadwal Ujian Akhir Semester Ganjil 2024/2025",
        slug: "pengumuman-jadwal-ujian-akhir-semester-ganjil-2024-2025",
        konten: "Jadwal Ujian Akhir Semester (UAS) Ganjil Tahun Akademik 2024/2025 telah ditetapkan. Ujian akan dilaksanakan mulai tanggal 20 Januari hingga 3 Februari 2025. Mahasiswa diharapkan mempersiapkan diri dengan baik.",
        excerpt: "Jadwal UAS Ganjil 2024/2025 telah ditetapkan, mulai 20 Januari - 3 Februari 2025.",
        featured_image: "/berita/uas-schedule.jpg",
        kategori: "Pengumuman",
        status: "published",
        published_at: "2024-12-05T16:00:00Z",
        author_id: 1,
        dosen: { nama: "Dr. Ahmad Fauzi, M.Kom" }
      },
      {
        id: 5,
        judul: "Seminar Nasional Teknologi Informasi dan Manajemen 2024",
        slug: "seminar-nasional-teknologi-informasi-dan-manajemen-2024",
        konten: "STIKOM PGRI Banyuwangi akan mengadakan Seminar Nasional Teknologi Informasi dan Manajemen pada tanggal 15 Februari 2025. Acara ini menghadirkan keynote speaker dari akademisi dan praktisi terkemuka di bidang TI.",
        excerpt: "Seminar Nasional TI dan Manajemen 2024 dengan keynote speaker terkemuka.",
        featured_image: "/berita/seminar-nasional.jpg",
        kategori: "Event",
        status: "published",
        published_at: "2024-12-03T11:00:00Z",
        author_id: 4,
        dosen: { nama: "Budi Santoso, M.Kom" }
      },
      {
        id: 6,
        judul: "Mahasiswa D3 MI Ikuti Bootcamp Full Stack Developer",
        slug: "mahasiswa-d3-mi-ikuti-bootcamp-full-stack-developer",
        konten: "Sebanyak 30 mahasiswa terpilih mengikuti Bootcamp Full Stack Developer yang diselenggarakan oleh program studi bekerjasama dengan industri. Bootcamp ini berlangsung selama 3 bulan dengan materi yang komprehensif.",
        excerpt: "30 mahasiswa terpilih mengikuti Bootcamp Full Stack Developer selama 3 bulan.",
        featured_image: "/berita/bootcamp-fullstack.jpg",
        kategori: "Kegiatan",
        status: "published",
        published_at: "2024-11-28T13:45:00Z",
        author_id: 5,
        dosen: { nama: "Dedi Kurniawan, M.Kom" }
      }
    ];
  
  useEffect(() => {
    // Fetch data berita dari Supabase
    const fetchData = async () => {
      try {
        const berita = await db.getBerita(20);
        if (berita && berita.length > 0) {
          // Transform data dari Supabase untuk kompatibilitas dengan UI
          const transformedBerita = berita.map(item => ({
            id: item.id,
            judul: item.judul,
            slug: item.slug,
            konten: item.konten,
            excerpt: item.excerpt,
            featured_image: item.featured_image,
            kategori: item.kategori,
            status: item.status,
            published_at: item.published_at,
            author_id: item.author_id,
            dosen: item.dosen || { nama: 'Admin' }
          }));
          setBeritaList(transformedBerita);
        } else {
          // Fallback ke dummy data jika tidak ada data dari Supabase
          setBeritaList(dummyBerita);
        }
      } catch (error) {
        console.log("Menggunakan data dummy karena:", error);
        setBeritaList(dummyBerita);
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  // Kategorikan berita
  const kategoriBeritas = [
    { nama: "Semua", count: beritaList.length },
    { nama: "Prestasi", count: beritaList.filter(b => b.kategori === "Prestasi").length },
    { nama: "Kegiatan", count: beritaList.filter(b => b.kategori === "Kegiatan").length },
    { nama: "Pengumuman", count: beritaList.filter(b => b.kategori === "Pengumuman").length },
    { nama: "Kerjasama", count: beritaList.filter(b => b.kategori === "Kerjasama").length },
    { nama: "Event", count: beritaList.filter(b => b.kategori === "Event").length }
  ];

  // Format tanggal
  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Berita & Pengumuman
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            Informasi terkini seputar kegiatan dan pencapaian program studi
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">{beritaList.length}</div>
              <div className="text-purple-200">Total Berita</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{kategoriBeritas.find(k => k.nama === "Prestasi")?.count || 0}</div>
              <div className="text-purple-200">Prestasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{kategoriBeritas.find(k => k.nama === "Kegiatan")?.count || 0}</div>
              <div className="text-purple-200">Kegiatan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{kategoriBeritas.find(k => k.nama === "Event")?.count || 0}</div>
              <div className="text-purple-200">Event</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Kategori */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {kategoriBeritas.map((kategori) => (
              <button
                key={kategori.nama}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
              >
                {kategori.nama} ({kategori.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Utama */}
      {beritaList.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita Utama</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Berita Featured */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-64 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {beritaList[0].kategori}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatTanggal(beritaList[0].published_at)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {beritaList[0].judul}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {beritaList[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Oleh: {beritaList[0].dosen?.nama}
                      </span>
                      <Link
                        href={`/berita/${beritaList[0].slug}`}
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Berita Terbaru Lainnya */}
              <div className="lg:col-span-1 space-y-6">
                {beritaList.slice(1, 4).map((berita) => (
                  <div key={berita.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {berita.kategori}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTanggal(berita.published_at)}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {berita.judul}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {berita.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {berita.dosen?.nama}
                      </span>
                      <Link
                        href={`/berita/${berita.slug}`}
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                      >
                        Baca →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Semua Berita */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Semua Berita</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <article key={berita.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl">
                    {berita.kategori === 'Prestasi' && '🏆'}
                    {berita.kategori === 'Kegiatan' && '🎯'}
                    {berita.kategori === 'Pengumuman' && '📢'}
                    {berita.kategori === 'Kerjasama' && '🤝'}
                    {berita.kategori === 'Event' && '🎪'}
                    {!['Prestasi', 'Kegiatan', 'Pengumuman', 'Kerjasama', 'Event'].includes(berita.kategori) && '📰'}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      berita.kategori === 'Prestasi' ? 'bg-yellow-100 text-yellow-800' :
                      berita.kategori === 'Kegiatan' ? 'bg-blue-100 text-blue-800' :
                      berita.kategori === 'Pengumuman' ? 'bg-red-100 text-red-800' :
                      berita.kategori === 'Kerjasama' ? 'bg-green-100 text-green-800' :
                      berita.kategori === 'Event' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {berita.kategori}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTanggal(berita.published_at)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {berita.judul}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {berita.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {berita.dosen?.nama}
                    </span>
                    <Link
                      href={`/berita/${berita.slug}`}
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center"
                    >
                      Baca Selengkapnya
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Dapatkan Update Terbaru
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Berlangganan newsletter untuk mendapatkan berita dan pengumuman terbaru
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}