'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { db } from '../../lib/supabase';

export default function ShowcasePage() {
  const [portfolios, setPortfolios] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  // Dummy data untuk portofolio
  const dummyPortfolios = [
    {
      id: 1,
      title: "Sistem Informasi Perpustakaan",
      student: "Ahmad Rizki Pratama",
      nim: "2021001",
      category: "web",
      description: "Aplikasi web untuk manajemen perpustakaan dengan fitur peminjaman, pengembalian, dan katalog buku digital.",
      technologies: ["React", "Node.js", "MySQL", "Bootstrap"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      githubUrl: "#",
      year: "2023",
      featured: true
    },
    {
      id: 2,
      title: "Aplikasi Mobile E-Commerce",
      student: "Siti Nurhaliza",
      nim: "2021002",
      category: "mobile",
      description: "Aplikasi mobile untuk toko online dengan fitur keranjang belanja, pembayaran, dan tracking pesanan.",
      technologies: ["React Native", "Firebase", "Redux", "Stripe API"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      githubUrl: "#",
      year: "2023",
      featured: true
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      student: "Budi Santoso",
      nim: "2021003",
      category: "web",
      description: "Dashboard untuk visualisasi data penjualan dengan grafik interaktif dan laporan real-time.",
      technologies: ["Vue.js", "Chart.js", "Laravel", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      demoUrl: "#",
      githubUrl: "#",
      year: "2023",
      featured: false
    }
  ];

  // Dummy data untuk skills
  const dummySkills = [
    { kategori: 'programming', nama_skill: 'JavaScript', level: 'advanced', count: 15 },
    { kategori: 'programming', nama_skill: 'Python', level: 'intermediate', count: 12 },
    { kategori: 'programming', nama_skill: 'Java', level: 'intermediate', count: 10 },
    { kategori: 'framework', nama_skill: 'React', level: 'advanced', count: 8 },
    { kategori: 'framework', nama_skill: 'Laravel', level: 'intermediate', count: 6 },
    { kategori: 'database', nama_skill: 'MySQL', level: 'advanced', count: 14 },
    { kategori: 'database', nama_skill: 'PostgreSQL', level: 'intermediate', count: 7 },
    { kategori: 'design', nama_skill: 'Figma', level: 'intermediate', count: 9 },
    { kategori: 'tools', nama_skill: 'Git', level: 'advanced', count: 16 }
  ];

  const categories = [
    { id: 'all', name: 'Semua', icon: '🎯' },
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile App', icon: '📱' },
    { id: 'game', name: 'Game Development', icon: '🎮' },
    { id: 'iot', name: 'IoT & Hardware', icon: '🔧' }
  ];

  const skillCategories = [
    { id: 'programming', name: 'Programming', icon: '💻', color: 'bg-blue-500' },
    { id: 'framework', name: 'Framework', icon: '⚛️', color: 'bg-green-500' },
    { id: 'database', name: 'Database', icon: '🗄️', color: 'bg-purple-500' },
    { id: 'design', name: 'Design', icon: '🎨', color: 'bg-pink-500' },
    { id: 'tools', name: 'Tools', icon: '🛠️', color: 'bg-orange-500' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch portfolio data
        const portfolioData = await db.getPortofolio();
        const transformedPortfolios = portfolioData.map(item => ({
          id: item.id,
          title: item.judul,
          student: item.mahasiswa?.nama || 'Unknown',
          nim: item.mahasiswa?.nim || 'Unknown',
          category: item.kategori,
          description: item.deskripsi,
          technologies: Array.isArray(item.teknologi) ? item.teknologi : [],
          image: item.gambar_url || "/api/placeholder/400/300",
          demoUrl: item.demo_url || "#",
          githubUrl: item.github_url || "#",
          year: item.tahun?.toString() || "2023",
          featured: item.featured || false
        }));
        
        // Fetch skills data
        const skillsData = await db.getSkills();
        const skillsGrouped = skillsData.reduce((acc, skill) => {
          const existing = acc.find(s => s.nama_skill === skill.nama_skill && s.kategori === skill.kategori);
          if (existing) {
            existing.count += 1;
          } else {
            acc.push({ ...skill, count: 1 });
          }
          return acc;
        }, []);
        
        setPortfolios(transformedPortfolios.length > 0 ? transformedPortfolios : dummyPortfolios);
        setSkills(skillsGrouped.length > 0 ? skillsGrouped : dummySkills);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setPortfolios(dummyPortfolios);
        setSkills(dummySkills);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPortfolios = selectedCategory === 'all' 
    ? portfolios 
    : portfolios.filter(portfolio => portfolio.category === selectedCategory);

  const featuredPortfolios = portfolios.filter(portfolio => portfolio.featured);

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.kategori === category);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'expert': return 'bg-red-500';
      case 'advanced': return 'bg-orange-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data showcase...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🎨 Showcase Mahasiswa
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Portofolio, Project, dan Keahlian Mahasiswa D3 Manajemen Informatika
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'portfolio'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              📁 Portfolio
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'skills'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🛠️ Skills
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold">{portfolios.length}+</div>
              <div className="text-lg">Total Proyek</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold">{featuredPortfolios.length}</div>
              <div className="text-lg">Proyek Unggulan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold">{skills.length}+</div>
              <div className="text-lg">Skills Dikuasai</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <>
          {/* Featured Projects */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">⭐ Proyek Unggulan</h2>
                <p className="text-lg text-gray-600">Karya terbaik yang telah dipilih sebagai showcase unggulan</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPortfolios.map((portfolio) => (
                  <div key={portfolio.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-6xl">🚀</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{portfolio.title}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{portfolio.student}</p>
                      <p className="text-gray-500 text-sm mb-3">NIM: {portfolio.nim} • {portfolio.year}</p>
                      <p className="text-gray-600 mb-4 line-clamp-3">{portfolio.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                            {tech}
                          </span>
                        ))}
                        {portfolio.technologies.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                            +{portfolio.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => setSelectedPortfolio(portfolio)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          👁️ Detail
                        </button>
                        <a href={portfolio.demoUrl} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                          🔗
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Projects */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">📂 Semua Proyek</h2>
                <p className="text-lg text-gray-600">Jelajahi portofolio berdasarkan kategori</p>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
              
              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolios.map((portfolio) => (
                  <div key={portfolio.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                    <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                      <span className="text-6xl">
                        {portfolio.category === 'web' ? '🌐' : 
                         portfolio.category === 'mobile' ? '📱' :
                         portfolio.category === 'game' ? '🎮' : '🔧'}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{portfolio.title}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{portfolio.student}</p>
                      <p className="text-gray-500 text-sm mb-3">NIM: {portfolio.nim} • {portfolio.year}</p>
                      <p className="text-gray-600 mb-4 line-clamp-2">{portfolio.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.technologies.slice(0, 2).map((tech, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                            {tech}
                          </span>
                        ))}
                        {portfolio.technologies.length > 2 && (
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm">
                            +{portfolio.technologies.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => setSelectedPortfolio(portfolio)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          👁️ Detail
                        </button>
                        <a href={portfolio.githubUrl} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                          💻
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🛠️ Skills & Keahlian</h2>
              <p className="text-lg text-gray-600">Teknologi dan tools yang dikuasai mahasiswa</p>
            </div>
            
            {/* Skills by Category */}
            <div className="space-y-12">
              {skillCategories.map((category) => {
                const categorySkills = getSkillsByCategory(category.id);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category.id} className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                        <p className="text-gray-600">{categorySkills.length} skills</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map((skill, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{skill.nama_skill}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs text-white ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{skill.count} mahasiswa menguasai</p>
                          
                          {/* Skill Level Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getLevelColor(skill.level)}`}
                              style={{ 
                                width: skill.level === 'expert' ? '100%' : 
                                       skill.level === 'advanced' ? '80%' : 
                                       skill.level === 'intermediate' ? '60%' : '40%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Skills Summary */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">📊 Ringkasan Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {skillCategories.map((category) => {
                    const count = getSkillsByCategory(category.id).length;
                    return (
                      <div key={category.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-xl font-bold">{count}</div>
                        <div className="text-sm">{category.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Ingin Menampilkan Karya & Skillmu?</h2>
          <p className="text-xl mb-8">
            Bergabunglah dengan mahasiswa lain dan showcase portofolio serta keahlianmu!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontak" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              📧 Hubungi Kami
            </a>
            <a href="/mahasiswa" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              👨‍🎓 Info Mahasiswa
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Detail Modal */}
      {selectedPortfolio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedPortfolio.title}</h3>
                <button 
                  onClick={() => setSelectedPortfolio(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <span className="text-8xl">🚀</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">👨‍🎓 Mahasiswa:</h4>
                  <p className="text-blue-600">{selectedPortfolio.student} (NIM: {selectedPortfolio.nim})</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">📝 Deskripsi:</h4>
                  <p className="text-gray-600">{selectedPortfolio.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">🛠️ Teknologi:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPortfolio.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">📅 Tahun:</h4>
                  <p className="text-gray-600">{selectedPortfolio.year}</p>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <a 
                    href={selectedPortfolio.demoUrl} 
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    🔗 Live Demo
                  </a>
                  <a 
                    href={selectedPortfolio.githubUrl} 
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
                  >
                    💻 Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="text-sm">⚠️ {error}</p>
        </div>
      )}

      <Footer />
    </div>
  );
}