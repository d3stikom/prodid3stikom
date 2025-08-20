'use client';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [programStudi, setProgramStudi] = useState(null);

  useEffect(() => {
    // Fetch data dari Supabase
    const fetchData = async () => {
      try {
        // Uncomment setelah setup Supabase
        // const berita = await db.getBerita(3);
        // const prestasiData = await db.getPrestasi(4);
        // const prodi = await db.getProgramStudi();
        // setBeritaTerbaru(berita);
        // setPrestasi(prestasiData);
        // setProgramStudi(prodi);
      } catch (error) {
        console.log('Database belum tersedia:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                D3 Manajemen Informatika
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Program studi yang mempersiapkan tenaga ahli madya di bidang teknologi informasi
                dengan fokus pada manajemen sistem informasi dan pengembangan aplikasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://pmb.stikombanyuwangi.ac.id"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Daftar Sekarang
                </Link>
                <Link
                  href="/profil"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero-image.svg"
                alt="Mahasiswa D3 Manajemen Informatika"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Unggulan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Unggulan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kurikulum yang dirancang sesuai kebutuhan industri dengan fokus pada praktik dan aplikasi nyata
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sistem Informasi</h3>
              <p className="text-gray-600">
                Pembelajaran mendalam tentang analisis, perancangan, dan implementasi sistem informasi untuk berbagai kebutuhan bisnis.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pengembangan Aplikasi</h3>
              <p className="text-gray-600">
                Praktik langsung dalam mengembangkan aplikasi web dan mobile menggunakan teknologi terkini dan framework modern.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manajemen Data</h3>
              <p className="text-gray-600">
                Penguasaan dalam pengelolaan database, analisis data, dan implementasi business intelligence untuk pengambilan keputusan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Berita Terbaru</h2>
              <p className="text-lg text-gray-600">Informasi dan update terkini dari program studi</p>
            </div>
            <Link href="/berita" className="text-blue-600 hover:text-blue-800 font-semibold">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder untuk berita - akan diisi dari database */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">Pengumuman</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Judul Berita Placeholder {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Deskripsi singkat berita yang akan ditampilkan di halaman utama untuk memberikan gambaran kepada pengunjung.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">2 hari yang lalu</span>
                    <Link href={`/berita/placeholder-${item}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestasi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prestasi Terbaru</h2>
            <p className="text-lg text-gray-600">Pencapaian membanggakan dari mahasiswa dan dosen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Juara {item} Kompetisi</h3>
                <p className="text-sm text-gray-600">Kompetisi Programming Nasional 2024</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
