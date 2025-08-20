'use client';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DosenPage() {
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDosen() {
      try {
        // Ambil data dosen dari Supabase
        const data = await db.getDosen();
        
        // Transform data untuk kompatibilitas dengan UI
        const transformedData = data.map(dosen => ({
          id: dosen.id,
          nama: dosen.nama,
          nip: dosen.nidn, // NIDN dari database
          jabatan: dosen.jabatan,
          pendidikan: dosen.pendidikan_terakhir,
          bidang_keahlian: Array.isArray(dosen.bidang_keahlian) 
            ? dosen.bidang_keahlian.join(', ') 
            : dosen.bidang_keahlian,
          email: dosen.email,
          foto: dosen.foto_url,
          status: dosen.status,
          telepon: dosen.telepon
        }));
        
        setDosenList(transformedData);
      } catch (error) {
        console.log("Error fetching from Supabase, using fallback data:", error);
        
        // Data dummy sebagai fallback jika Supabase belum dikonfigurasi
        const fallbackData = [
          {
            id: 1,
            nama: "Dr. Ahmad Fauzi, M.Kom",
            nip: "0015058501",
            jabatan: "Ketua Program Studi",
            pendidikan: "S3 Ilmu Komputer - Universitas Indonesia",
            bidang_keahlian: "Database Management, Data Mining",
            email: "ahmad.fauzi@stikompgri-bwi.ac.id",
            foto: "/dosen/ahmad-fauzi.jpg",
            status: "aktif",
            telepon: "081234567890"
          },
          {
            id: 2,
            nama: "Siti Nurhaliza, M.T",
            nip: "0015037003",
            jabatan: "Sekretaris Program Studi",
            pendidikan: "S2 Teknik Informatika - Institut Teknologi Sepuluh Nopember",
            bidang_keahlian: "Web Development, Mobile Programming",
            email: "siti.nurhaliza@stikompgri-bwi.ac.id",
            foto: "/dosen/siti-nurhaliza.jpg",
            status: "aktif",
            telepon: "081234567891"
          },
          {
            id: 3,
            nama: "Budi Santoso, M.Kom",
            nip: "0015056010",
            jabatan: "Dosen",
            pendidikan: "S2 Ilmu Komputer - Universitas Gadjah Mada",
            bidang_keahlian: "Network Security, System Administration",
            email: "budi.santoso@stikompgri-bwi.ac.id",
            foto: "/dosen/budi-santoso.jpg",
            status: "aktif",
            telepon: "081234567892"
          },
          {
            id: 4,
            nama: "Rina Kartika, M.T",
            nip: "0015029020",
            jabatan: "Dosen",
            pendidikan: "S2 Teknik Informatika - Universitas Brawijaya",
            bidang_keahlian: "Artificial Intelligence, Machine Learning",
            email: "rina.kartika@stikompgri-bwi.ac.id",
            foto: "/dosen/rina-kartika.jpg",
            status: "aktif",
            telepon: "081234567893"
          },
          {
            id: 5,
            nama: "Dedi Kurniawan, M.Kom",
            nip: "0015048015",
            jabatan: "Dosen",
            pendidikan: "S2 Ilmu Komputer - Universitas Airlangga",
            bidang_keahlian: "Software Engineering, Project Management",
            email: "dedi.kurniawan@stikompgri-bwi.ac.id",
            foto: "/dosen/dedi-kurniawan.jpg",
            status: "aktif",
            telepon: "081234567894"
          },
          {
            id: 6,
            nama: "Maya Sari, M.T",
            nip: "0015010110",
            jabatan: "Dosen",
            pendidikan: "S2 Teknik Informatika - Institut Teknologi Bandung",
            bidang_keahlian: "Human Computer Interaction, UI/UX Design",
            email: "maya.sari@stikompgri-bwi.ac.id",
            foto: "/dosen/maya-sari.jpg",
            status: "aktif",
            telepon: "081234567895"
          }
        ];
        
        setDosenList(fallbackData);
      }
      
      setLoading(false);
    }
    
    fetchDosen();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data dosen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="dosen" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dosen Program Studi
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Tim pengajar berkualitas dengan keahlian di bidang teknologi informasi
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold">{dosenList.length}</div>
              <div className="text-blue-200">Dosen Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-blue-200">Bergelar Magister</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-blue-200">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dosen Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tim Pengajar Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dosen-dosen berpengalaman dengan latar belakang pendidikan dan keahlian yang beragam
              di bidang teknologi informasi dan manajemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dosenList.map((dosen) => (
              <div key={dosen.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
                  {/* Placeholder untuk foto dosen */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-700">
                        {dosen.nama.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dosen.nama}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {dosen.jabatan}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">NIDN:</span> {dosen.nip}
                    </div>
                    <div>
                      <span className="font-medium">Pendidikan:</span> {dosen.pendidikan}
                    </div>
                    <div>
                      <span className="font-medium">Keahlian:</span> {dosen.bidang_keahlian}
                    </div>
                    {dosen.telepon && (
                      <div>
                        <span className="font-medium">Telepon:</span> {dosen.telepon}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <a 
                      href={`mailto:${dosen.email}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      Email
                    </a>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dosen.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Struktur Organisasi
            </h2>
            <p className="text-lg text-gray-600">
              Struktur kepemimpinan Program Studi D3 Manajemen Informatika
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Ketua Program Studi */}
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ketua Program Studi</h3>
                <p className="text-blue-600 font-medium">
                  {dosenList.find(d => d.jabatan === 'Ketua Program Studi')?.nama || 'Dr. Ahmad Fauzi, M.Kom'}
                </p>
              </div>
            </div>

            {/* Sekretaris */}
            <div className="text-center mb-8">
              <div className="inline-block bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sekretaris Program Studi</h3>
                <p className="text-green-600 font-medium">
                  {dosenList.find(d => d.jabatan === 'Sekretaris Program Studi')?.nama || 'Siti Nurhaliza, M.T'}
                </p>
              </div>
            </div>

            {/* Dosen */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tim Dosen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dosenList.filter(d => d.jabatan === 'Dosen').map((dosen) => (
                    <div key={dosen.id} className="text-gray-600">
                      {dosen.nama}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tertarik Bergabung dengan Tim Kami?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Kami selalu mencari talenta terbaik untuk bergabung sebagai dosen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@stikompgri-bwi.ac.id"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Hubungi Kami
            </a>
            <Link
              href="/karir"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Lihat Lowongan
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}