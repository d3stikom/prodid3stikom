'use client';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MahasiswaPage() {
  const [mahasiswaData, setMahasiswaData] = useState({
    total: 245,
    angkatan_2024: 85,
    angkatan_2023: 82,
    angkatan_2022: 78,
    laki_laki: 145,
    perempuan: 100,
    alumni: 156
  });
  
  const [prestasiData, setPrestasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data sebagai fallback
  const dummyPrestasiData = [
    {
      id: 1,
      judul: "Juara 1 Lomba Programming Nasional",
      nama_mahasiswa: "Ahmad Rizki Pratama",
      nim: "2024001",
      tingkat: "Nasional",
      tahun: 2024,
      penyelenggara: "DIKTI",
      kategori: "Programming",
      foto: "/prestasi/programming-1.jpg"
    },
    {
      id: 2,
      judul: "Juara 2 Web Design Competition",
      nama_mahasiswa: "Siti Nurhaliza",
      nim: "2023015",
      tingkat: "Regional",
      tahun: 2024,
      penyelenggara: "APTIKOM Jawa Timur",
      kategori: "Web Design",
      foto: "/prestasi/webdesign-1.jpg"
    },
    {
      id: 3,
      judul: "Best Innovation Award",
      nama_mahasiswa: "Budi Santoso",
      nim: "2022030",
      tingkat: "Nasional",
      tahun: 2024,
      penyelenggara: "Kemenristekdikti",
      kategori: "Innovation",
      foto: "/prestasi/innovation-1.jpg"
    },
    {
      id: 4,
      judul: "Juara 3 Mobile App Development",
      nama_mahasiswa: "Rina Kartika",
      nim: "2023025",
      tingkat: "Regional",
      tahun: 2023,
      penyelenggara: "Google Developer Student Club",
      kategori: "Mobile Development",
      foto: "/prestasi/mobile-1.jpg"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data mahasiswa dan prestasi dari Supabase
        const [mahasiswaResponse, prestasiResponse] = await Promise.all([
          db.getMahasiswa(),
          db.getPrestasi(10)
        ]);

        // Transform data mahasiswa untuk statistik
        if (mahasiswaResponse && mahasiswaResponse.length > 0) {
          const stats = {
            total: mahasiswaResponse.length,
            angkatan_2024: mahasiswaResponse.filter(m => m.angkatan === 2024).length,
            angkatan_2023: mahasiswaResponse.filter(m => m.angkatan === 2023).length,
            angkatan_2022: mahasiswaResponse.filter(m => m.angkatan === 2022).length,
            laki_laki: mahasiswaResponse.filter(m => m.jenis_kelamin === 'L').length,
            perempuan: mahasiswaResponse.filter(m => m.jenis_kelamin === 'P').length,
            alumni: 156 // Data alumni tetap static untuk sementara
          };
          setMahasiswaData(stats);
        }

        // Transform data prestasi
        if (prestasiResponse && prestasiResponse.length > 0) {
          const transformedPrestasi = prestasiResponse.map(prestasi => ({
            id: prestasi.id,
            judul: prestasi.judul,
            nama_mahasiswa: prestasi.mahasiswa?.nama || 'Nama tidak tersedia',
            nim: prestasi.mahasiswa?.nim || 'NIM tidak tersedia',
            tingkat: prestasi.tingkat,
            tahun: prestasi.tahun,
            penyelenggara: prestasi.deskripsi || 'Penyelenggara tidak tersedia',
            kategori: prestasi.kategori || 'Kategori tidak tersedia',
            foto: prestasi.gambar_url || '/prestasi/default.jpg'
          }));
          setPrestasiData(transformedPrestasi);
        } else {
          // Gunakan dummy data jika tidak ada data dari Supabase
          setPrestasiData(dummyPrestasiData);
        }
        
      } catch (error) {
        console.log("Error fetching data, using fallback:", error);
        setError(error.message);
        // Gunakan dummy data sebagai fallback
        setPrestasiData(dummyPrestasiData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="mahasiswa" />

      {/* Loading State */}
      {loading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data mahasiswa...</p>
          </div>
        </section>
      )}

      {/* Hero Section */}
      {!loading && (
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mahasiswa Berprestasi
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8">
            Generasi muda yang siap menghadapi tantangan era digital
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">{mahasiswaData.total}</div>
              <div className="text-green-200">Total Mahasiswa</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mahasiswaData.angkatan_2024}</div>
              <div className="text-green-200">Angkatan 2024</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{prestasiData.length}+</div>
              <div className="text-green-200">Prestasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{mahasiswaData.alumni}</div>
              <div className="text-green-200">Alumni</div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Statistik Mahasiswa */}
      {!loading && (
        <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Data Mahasiswa
            </h2>
            <p className="text-lg text-gray-600">
              Statistik dan sebaran mahasiswa Program Studi D3 Manajemen Informatika
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sebaran per Angkatan */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sebaran per Angkatan</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Angkatan 2024</span>
                  <span className="font-bold text-blue-600">{mahasiswaData.angkatan_2024} orang</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Angkatan 2023</span>
                  <span className="font-bold text-green-600">{mahasiswaData.angkatan_2023} orang</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Angkatan 2022</span>
                  <span className="font-bold text-purple-600">{mahasiswaData.angkatan_2022} orang</span>
                </div>
              </div>
            </div>

            {/* Sebaran Gender */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sebaran Gender</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Laki-laki</span>
                  <span className="font-bold text-blue-600">{mahasiswaData.laki_laki} orang</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Perempuan</span>
                  <span className="font-bold text-pink-600">{mahasiswaData.perempuan} orang</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="font-bold text-gray-900">{mahasiswaData.total} orang</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alumni */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alumni</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{mahasiswaData.alumni}</div>
                <div className="text-gray-600 mb-4">Lulusan Sukses</div>
                <div className="text-sm text-gray-500">
                  Tersebar di berbagai perusahaan teknologi dan startup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Prestasi Mahasiswa */}
      {!loading && (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prestasi Mahasiswa
            </h2>
            <p className="text-lg text-gray-600">
              Pencapaian membanggakan mahasiswa di berbagai kompetisi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {prestasiData.map((prestasi) => (
              <div key={prestasi.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-6xl">🏆</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prestasi.tingkat === 'Nasional' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {prestasi.tingkat}
                    </span>
                    <span className="text-sm text-gray-500">{prestasi.tahun}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {prestasi.judul}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Mahasiswa:</span> {prestasi.nama_mahasiswa}
                    </div>
                    <div>
                      <span className="font-medium">NIM:</span> {prestasi.nim}
                    </div>
                    <div>
                      <span className="font-medium">Penyelenggara:</span> {prestasi.penyelenggara}
                    </div>
                    <div>
                      <span className="font-medium">Kategori:</span> {prestasi.kategori}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Organisasi Mahasiswa */}
      {!loading && (
        <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Organisasi Mahasiswa
            </h2>
            <p className="text-lg text-gray-600">
              Wadah pengembangan soft skill dan leadership mahasiswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HIMA MI</h3>
              <p className="text-gray-600 mb-4">
                Himpunan Mahasiswa Manajemen Informatika
              </p>
              <div className="text-sm text-gray-500">
                Organisasi resmi mahasiswa program studi
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coding Club</h3>
              <p className="text-gray-600 mb-4">
                Komunitas pengembang dan programmer
              </p>
              <div className="text-sm text-gray-500">
                Fokus pada pengembangan skill programming
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design Club</h3>
              <p className="text-gray-600 mb-4">
                Komunitas desainer UI/UX dan grafis
              </p>
              <div className="text-sm text-gray-500">
                Mengembangkan kreativitas dalam desain
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Call to Action */}
      {!loading && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bergabunglah dengan Kami!
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Wujudkan impian kariermu di bidang teknologi informasi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pendaftaran"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/info-pendaftaran"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              Info Pendaftaran
            </Link>
          </div>
        </div>
      </section>
      )}

      <Footer />
    </div>
  );
}