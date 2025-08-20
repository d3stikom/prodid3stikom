'use client';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilPage() {
  const [programStudi, setProgramStudi] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Data dummy untuk fallback
  const dummyProgramStudi = {
    id: 1,
    nama: 'D3 Manajemen Informatika',
    deskripsi: 'Program studi yang menghasilkan lulusan kompeten di bidang manajemen teknologi informasi dengan kemampuan teknis dan manajerial yang seimbang.',
    visi: 'Menjadi program studi unggulan dalam menghasilkan tenaga ahli madya di bidang manajemen informatika yang kompeten, berkarakter, dan mampu bersaing di era digital pada tahun 2030.',
    misi: 'Menyelenggarakan pendidikan vokasi yang berkualitas di bidang manajemen informatika; Mengembangkan penelitian terapan yang mendukung kemajuan teknologi informasi; Melaksanakan pengabdian kepada masyarakat melalui penerapan teknologi informasi; Membangun kemitraan strategis dengan industri dan institusi pendidikan',
    tujuan: 'Menghasilkan lulusan yang memiliki kompetensi akademik dan praktis di bidang manajemen informatika; Mempersiapkan lulusan yang siap bekerja dan mampu beradaptasi dengan perkembangan teknologi; Mengembangkan kemampuan inovasi dan kreativitas dalam memecahkan masalah teknologi informasi; Membangun kemampuan kerjasama tim dan komunikasi yang efektif dalam lingkungan kerja; Menanamkan nilai-nilai etika profesi dan tanggung jawab sosial dalam bidang teknologi informasi; Mengembangkan jiwa kewirausahaan dan kemampuan menciptakan peluang bisnis di bidang teknologi',
    akreditasi: 'B',
    tahun_berdiri: 2010
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await db.getProgramStudi();
        if (data) {
          setProgramStudi(data);
        } else {
          setProgramStudi(dummyProgramStudi);
        }
      } catch (error) {
        console.log('Menggunakan data dummy karena:', error);
        setProgramStudi(dummyProgramStudi);
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat profil program studi...</p>
        </div>
      </div>
    );
  }
  
  // Parse misi dan tujuan dari string menjadi array
  const misiArray = programStudi?.misi ? programStudi.misi.split(';').map(item => item.trim()) : [];
  const tujuanArray = programStudi?.tujuan ? programStudi.tujuan.split(';').map(item => item.trim()) : [];
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Profil {programStudi?.nama || 'Program Studi'}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {programStudi?.deskripsi || 'Mengenal lebih dekat Program Studi D3 Manajemen Informatika STIKOM PGRI Banyuwangi'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">{programStudi?.tahun_berdiri || '2010'}</div>
                <div className="text-blue-200">Tahun Berdiri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{programStudi?.akreditasi || 'B'}</div>
                <div className="text-blue-200">Akreditasi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-200">Alumni</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">6</div>
                <div className="text-blue-200">Semester</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sejarah Program Studi</h2>
              <p className="text-lg text-gray-600 mb-6">
                {programStudi?.nama || 'Program Studi D3 Manajemen Informatika'} STIKOM PGRI Banyuwangi didirikan pada tahun {programStudi?.tahun_berdiri || '2010'} 
                sebagai respons terhadap kebutuhan industri akan tenaga ahli madya di bidang teknologi informasi.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Dengan fokus pada pengembangan kompetensi praktis dan aplikatif, program studi ini telah 
                menghasilkan lebih dari 500 lulusan yang tersebar di berbagai perusahaan teknologi, 
                instansi pemerintah, dan wirausaha mandiri.
              </p>
              <p className="text-lg text-gray-600">
                Saat ini, program studi telah terakreditasi {programStudi?.akreditasi || 'B'} dari BAN-PT dan terus berkomitmen untuk 
                meningkatkan kualitas pendidikan sesuai dengan perkembangan teknologi terkini.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg p-8 flex items-center justify-center">
                <span className="text-8xl">🏫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
            <p className="text-lg text-gray-600">Landasan filosofis dan arah pengembangan program studi</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Visi */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {programStudi?.visi || 'Menjadi program studi unggulan dalam menghasilkan tenaga ahli madya di bidang manajemen informatika yang kompeten, berkarakter, dan mampu bersaing di era digital pada tahun 2030.'}
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
              </div>
              <ul className="space-y-4 text-lg text-gray-700">
                {misiArray.length > 0 ? misiArray.map((misi, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                    {misi}
                  </li>
                )) : (
                  <>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      Menyelenggarakan pendidikan vokasi yang berkualitas di bidang manajemen informatika
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      Mengembangkan penelitian terapan yang mendukung kemajuan teknologi informasi
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      Melaksanakan pengabdian kepada masyarakat melalui penerapan teknologi informasi
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                      Membangun kemitraan strategis dengan industri dan institusi pendidikan
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tujuan Program Studi</h2>
            <p className="text-lg text-gray-600">Target pencapaian yang ingin diwujudkan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tujuanArray.length > 0 ? (
              tujuanArray.map((tujuan, index) => {
                const colors = [
                  { bg: 'from-blue-50 to-blue-100', icon: 'bg-blue-600' },
                  { bg: 'from-green-50 to-green-100', icon: 'bg-green-600' },
                  { bg: 'from-purple-50 to-purple-100', icon: 'bg-purple-600' },
                  { bg: 'from-yellow-50 to-yellow-100', icon: 'bg-yellow-600' },
                  { bg: 'from-red-50 to-red-100', icon: 'bg-red-600' },
                  { bg: 'from-indigo-50 to-indigo-100', icon: 'bg-indigo-600' }
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div key={index} className={`bg-gradient-to-br ${colorScheme.bg} p-6 rounded-xl`}>
                    <div className={`w-12 h-12 ${colorScheme.icon} rounded-lg flex items-center justify-center mb-4`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Tujuan {index + 1}</h3>
                    <p className="text-gray-600">
                      {tujuan}
                    </p>
                  </div>
                );
              })
            ) : (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Kompetensi Akademik</h3>
                  <p className="text-gray-600">
                    Menghasilkan lulusan yang memiliki kompetensi akademik dan praktis di bidang manajemen informatika
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Kesiapan Kerja</h3>
                  <p className="text-gray-600">
                    Mempersiapkan lulusan yang siap bekerja dan mampu beradaptasi dengan perkembangan teknologi
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Inovasi & Kreativitas</h3>
                  <p className="text-gray-600">
                    Mengembangkan kemampuan inovasi dan kreativitas dalam memecahkan masalah teknologi informasi
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Akreditasi */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Akreditasi & Sertifikasi</h2>
            <p className="text-lg text-gray-600">Pengakuan kualitas program studi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Akreditasi BAN-PT</h3>
              <p className="text-gray-600 mb-4">Terakreditasi B dari Badan Akreditasi Nasional Perguruan Tinggi</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">Berlaku s.d 2027</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ISO 9001:2015</h3>
              <p className="text-gray-600 mb-4">Sertifikasi sistem manajemen mutu internasional</p>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Tersertifikasi</span>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm6 2a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kemitraan Industri</h3>
              <p className="text-gray-600 mb-4">Kerjasama dengan 25+ perusahaan teknologi</p>
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Aktif</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}