"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { db } from "@/lib/supabase";

export default function KurikulumPage() {
  const [mataKuliahData, setMataKuliahData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data mata kuliah dari Supabase
  useEffect(() => {
    async function fetchMataKuliah() {
      try {
        setLoading(true);
        const data = await db.getMataKuliah();
        setMataKuliahData(data || []);
      } catch (err) {
        console.error('Error fetching mata kuliah:', err);
        setError(err.message);
        // Fallback ke data dummy jika gagal
        setMataKuliahData(dummyKurikulum);
      } finally {
        setLoading(false);
      }
    }

    fetchMataKuliah();
  }, []);

  // Fungsi untuk mengelompokkan mata kuliah berdasarkan semester
  const groupBySemester = (mataKuliah) => {
    const grouped = {};
    mataKuliah.forEach(mk => {
      const semester = mk.semester;
      if (!grouped[semester]) {
        grouped[semester] = [];
      }
      grouped[semester].push({
        kode: mk.kode_mk,
        nama: mk.nama,
        sks: mk.sks,
        jenis: mk.kode_mk.includes('Pilihan') ? 'Pilihan' : 'Wajib'
      });
    });
    return grouped;
  };

  // Data fallback jika Supabase tidak tersedia
  const dummyKurikulum = [
    // Semester 1
    { kode_mk: 'MK001', nama: 'Matematika Dasar', sks: 3, semester: 1 },
    { kode_mk: 'MK002', nama: 'Algoritma dan Pemrograman', sks: 4, semester: 1 },
    { kode_mk: 'MK003', nama: 'Pengantar Teknologi Informasi', sks: 3, semester: 1 },
    { kode_mk: 'MK004', nama: 'Bahasa Inggris I', sks: 2, semester: 1 },
    { kode_mk: 'MK005', nama: 'Pancasila', sks: 2, semester: 1 },
    { kode_mk: 'MK006', nama: 'Agama', sks: 2, semester: 1 },
    // Semester 2
    { kode_mk: 'MK007', nama: 'Statistika', sks: 3, semester: 2 },
    { kode_mk: 'MK008', nama: 'Pemrograman Web I', sks: 4, semester: 2 },
    { kode_mk: 'MK009', nama: 'Basis Data I', sks: 4, semester: 2 },
    { kode_mk: 'MK010', nama: 'Sistem Operasi', sks: 3, semester: 2 },
    { kode_mk: 'MK011', nama: 'Bahasa Inggris II', sks: 2, semester: 2 },
    { kode_mk: 'MK012', nama: 'Kewarganegaraan', sks: 2, semester: 2 },
    // Semester 3
    { kode_mk: 'MK013', nama: 'Analisis dan Perancangan Sistem', sks: 4, semester: 3 },
    { kode_mk: 'MK014', nama: 'Pemrograman Web II', sks: 4, semester: 3 },
    { kode_mk: 'MK015', nama: 'Basis Data II', sks: 4, semester: 3 },
    { kode_mk: 'MK016', nama: 'Jaringan Komputer', sks: 3, semester: 3 },
    { kode_mk: 'MK017', nama: 'Manajemen Proyek TI', sks: 3, semester: 3 },
    // Semester 4
    { kode_mk: 'MK018', nama: 'Pemrograman Mobile', sks: 4, semester: 4 },
    { kode_mk: 'MK019', nama: 'Sistem Informasi Manajemen', sks: 3, semester: 4 },
    { kode_mk: 'MK020', nama: 'Keamanan Sistem Informasi', sks: 3, semester: 4 },
    { kode_mk: 'MK021', nama: 'E-Business', sks: 3, semester: 4 },
    { kode_mk: 'MK022', nama: 'Metodologi Penelitian', sks: 2, semester: 4 },
    { kode_mk: 'MK023', nama: 'Mata Kuliah Pilihan I', sks: 3, semester: 4 },
    // Semester 5
    { kode_mk: 'MK024', nama: 'Framework Programming', sks: 4, semester: 5 },
    { kode_mk: 'MK025', nama: 'Business Intelligence', sks: 3, semester: 5 },
    { kode_mk: 'MK026', nama: 'Audit Sistem Informasi', sks: 3, semester: 5 },
    { kode_mk: 'MK027', nama: 'Kewirausahaan', sks: 2, semester: 5 },
    { kode_mk: 'MK028', nama: 'Mata Kuliah Pilihan II', sks: 3, semester: 5 },
    { kode_mk: 'MK029', nama: 'Mata Kuliah Pilihan III', sks: 3, semester: 5 },
    // Semester 6
    { kode_mk: 'MK030', nama: 'Kerja Praktik', sks: 4, semester: 6 },
    { kode_mk: 'MK031', nama: 'Tugas Akhir', sks: 6, semester: 6 },
    { kode_mk: 'MK032', nama: 'Seminar', sks: 2, semester: 6 }
  ];

  // Kelompokkan mata kuliah berdasarkan semester
  const kurikulum = groupBySemester(mataKuliahData);
  
  // Data mata kuliah yang sudah dikelompokkan (fallback)
  const fallbackKurikulum = {
    semester1: [
      { kode: "MK001", nama: "Matematika Dasar", sks: 3, jenis: "Wajib" },
      { kode: "MK002", nama: "Algoritma dan Pemrograman", sks: 4, jenis: "Wajib" },
      { kode: "MK003", nama: "Pengantar Teknologi Informasi", sks: 3, jenis: "Wajib" },
      { kode: "MK004", nama: "Bahasa Inggris I", sks: 2, jenis: "Wajib" },
      { kode: "MK005", nama: "Pancasila", sks: 2, jenis: "Wajib" },
      { kode: "MK006", nama: "Agama", sks: 2, jenis: "Wajib" }
    ],
    semester2: [
      { kode: "MK007", nama: "Statistika", sks: 3, jenis: "Wajib" },
      { kode: "MK008", nama: "Pemrograman Web I", sks: 4, jenis: "Wajib" },
      { kode: "MK009", nama: "Basis Data I", sks: 4, jenis: "Wajib" },
      { kode: "MK010", nama: "Sistem Operasi", sks: 3, jenis: "Wajib" },
      { kode: "MK011", nama: "Bahasa Inggris II", sks: 2, jenis: "Wajib" },
      { kode: "MK012", nama: "Kewarganegaraan", sks: 2, jenis: "Wajib" }
    ],
    semester3: [
      { kode: "MK013", nama: "Analisis dan Perancangan Sistem", sks: 4, jenis: "Wajib" },
      { kode: "MK014", nama: "Pemrograman Web II", sks: 4, jenis: "Wajib" },
      { kode: "MK015", nama: "Basis Data II", sks: 4, jenis: "Wajib" },
      { kode: "MK016", nama: "Jaringan Komputer", sks: 3, jenis: "Wajib" },
      { kode: "MK017", nama: "Manajemen Proyek TI", sks: 3, jenis: "Wajib" }
    ],
    semester4: [
      { kode: "MK018", nama: "Pemrograman Mobile", sks: 4, jenis: "Wajib" },
      { kode: "MK019", nama: "Sistem Informasi Manajemen", sks: 3, jenis: "Wajib" },
      { kode: "MK020", nama: "Keamanan Sistem Informasi", sks: 3, jenis: "Wajib" },
      { kode: "MK021", nama: "E-Business", sks: 3, jenis: "Wajib" },
      { kode: "MK022", nama: "Metodologi Penelitian", sks: 2, jenis: "Wajib" },
      { kode: "MK023", nama: "Mata Kuliah Pilihan I", sks: 3, jenis: "Pilihan" }
    ],
    semester5: [
      { kode: "MK024", nama: "Framework Programming", sks: 4, jenis: "Wajib" },
      { kode: "MK025", nama: "Business Intelligence", sks: 3, jenis: "Wajib" },
      { kode: "MK026", nama: "Audit Sistem Informasi", sks: 3, jenis: "Wajib" },
      { kode: "MK027", nama: "Kewirausahaan", sks: 2, jenis: "Wajib" },
      { kode: "MK028", nama: "Mata Kuliah Pilihan II", sks: 3, jenis: "Pilihan" },
      { kode: "MK029", nama: "Mata Kuliah Pilihan III", sks: 3, jenis: "Pilihan" }
    ],
    semester6: [
      { kode: "MK030", nama: "Kerja Praktik", sks: 4, jenis: "Wajib" },
      { kode: "MK031", nama: "Tugas Akhir", sks: 6, jenis: "Wajib" },
      { kode: "MK032", nama: "Seminar", sks: 2, jenis: "Wajib" }
    ]
  };

  const mataKuliahPilihan = [
    "Cloud Computing",
    "Data Mining",
    "Internet of Things (IoT)",
    "Artificial Intelligence",
    "Digital Marketing",
    "UI/UX Design",
    "Cyber Security",
    "Game Development"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Kurikulum Program Studi
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Struktur kurikulum yang dirancang sesuai kebutuhan industri dan perkembangan teknologi terkini
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data kurikulum...</p>
          </div>
        </section>
      )}

      {/* Overview Kurikulum */}
      {!loading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview Kurikulum</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Program studi D3 Manajemen Informatika menerapkan kurikulum berbasis kompetensi dengan total {mataKuliahData.reduce((total, mk) => total + mk.sks, 0)} SKS 
                yang dapat diselesaikan dalam 6 semester (3 tahun).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{mataKuliahData.reduce((total, mk) => total + mk.sks, 0)}</div>
                <div className="text-gray-700 font-semibold">Total SKS</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{Math.max(...mataKuliahData.map(mk => mk.semester), 6)}</div>
                <div className="text-gray-700 font-semibold">Semester</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{mataKuliahData.length}</div>
                <div className="text-gray-700 font-semibold">Mata Kuliah</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{mataKuliahData.filter(mk => mk.nama.includes('Pilihan')).length}</div>
                <div className="text-gray-700 font-semibold">MK Pilihan</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Struktur Kurikulum per Semester */}
      {!loading && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Struktur Kurikulum per Semester</h2>
              <p className="text-lg text-gray-600">Distribusi mata kuliah dari semester 1 hingga semester 6</p>
            </div>
            
            <div className="space-y-8">
              {[1, 2, 3, 4, 5, 6].map((semesterNum) => {
                const mataKuliahSemester = kurikulum[semesterNum] || fallbackKurikulum[`semester${semesterNum}`] || [];
                const colors = [
                  'bg-blue-600 text-blue-100',
                  'bg-green-600 text-green-100', 
                  'bg-purple-600 text-purple-100',
                  'bg-yellow-600 text-yellow-100',
                  'bg-red-600 text-red-100',
                  'bg-indigo-600 text-indigo-100'
                ];
                const colorClass = colors[semesterNum - 1];
                
                return (
                  <div key={semesterNum} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className={`${colorClass} px-6 py-4`}>
                      <h3 className="text-xl font-bold">Semester {semesterNum}</h3>
                      <p className={`${colorClass.split(' ')[1]}`}>Total: {mataKuliahSemester.reduce((total, mk) => total + mk.sks, 0)} SKS</p>
                    </div>
                    <div className="p-6">
                      {mataKuliahSemester.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {mataKuliahSemester.map((mk, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{mk.nama}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  mk.jenis === 'Wajib' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}>
                                  {mk.jenis}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{mk.kode}</p>
                              <p className="text-sm font-semibold text-gray-700">{mk.sks} SKS</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-8">Tidak ada mata kuliah untuk semester ini</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}



      {/* Mata Kuliah Pilihan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mata Kuliah Pilihan</h2>
            <p className="text-lg text-gray-600">
              Mahasiswa dapat memilih mata kuliah sesuai minat dan kebutuhan karir
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mataKuliahPilihan.map((mk, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{mk}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kompetensi Lulusan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kompetensi Lulusan</h2>
            <p className="text-lg text-gray-600">
              Kemampuan yang akan dimiliki lulusan setelah menyelesaikan program studi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Kompetensi Utama</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Mampu menganalisis dan merancang sistem informasi</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Menguasai pemrograman web dan mobile</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Mampu mengelola basis data dan sistem informasi</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Memahami manajemen proyek teknologi informasi</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Kompetensi Pendukung</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Kemampuan komunikasi dan presentasi</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Kerjasama tim dan kepemimpinan</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Kemampuan berpikir kritis dan analitis</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Jiwa kewirausahaan dan inovasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}