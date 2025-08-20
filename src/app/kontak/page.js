'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DOMPurify from 'dompurify';
import validator from 'validator';

export default function KontakPage() {
  // ... existing code ...

  // Fungsi sanitasi input
  const sanitizeInput = (input, type = 'text') => {
    if (!input || typeof input !== 'string') return '';

    // Trim whitespace
    let sanitized = input.trim();

    // Sanitasi berdasarkan tipe
    switch (type) {
      case 'email':
        // Validasi dan sanitasi email
        sanitized = validator.isEmail(sanitized) ? validator.normalizeEmail(sanitized) : '';
        break;
      case 'phone':
        // Hanya izinkan angka, +, -, (, ), dan spasi
        sanitized = sanitized.replace(/[^0-9+\-()\s]/g, '');
        break;
      case 'name':
        // Hanya izinkan huruf, spasi, dan beberapa karakter khusus
        sanitized = sanitized.replace(/[^a-zA-Z\s.,'-]/g, '');
        break;
      case 'text':
      case 'message':
        // Sanitasi HTML dan script injection
        sanitized = DOMPurify.sanitize(sanitized, {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
          KEEP_CONTENT: true
        });
        // Escape karakter khusus
        sanitized = sanitized
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
        break;
      default:
        sanitized = DOMPurify.sanitize(sanitized, {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
          KEEP_CONTENT: true
        });
    }

    return sanitized;
  };

  // Validasi input
  const validateInput = (name, value) => {
    const errors = {};

    switch (name) {
      case 'name':
        if (!value || value.length < 2) {
          errors.name = 'Nama harus minimal 2 karakter';
        } else if (value.length > 100) {
          errors.name = 'Nama maksimal 100 karakter';
        }
        break;
      case 'email':
        if (!value) {
          errors.email = 'Email wajib diisi';
        } else if (!validator.isEmail(value)) {
          errors.email = 'Format email tidak valid';
        }
        break;
      case 'phone':
        if (value && !validator.isMobilePhone(value, 'id-ID', { strictMode: false })) {
          errors.phone = 'Format nomor telepon tidak valid';
        }
        break;
      case 'message':
        if (!value || value.length < 10) {
          errors.message = 'Pesan harus minimal 10 karakter';
        } else if (value.length > 1000) {
          errors.message = 'Pesan maksimal 1000 karakter';
        }
        break;
    }

    return errors;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitasi input berdasarkan tipe field
    let sanitizedValue;
    switch (name) {
      case 'email':
        sanitizedValue = sanitizeInput(value, 'email');
        break;
      case 'phone':
        sanitizedValue = sanitizeInput(value, 'phone');
        break;
      case 'name':
        sanitizedValue = sanitizeInput(value, 'name');
        break;
      case 'message':
        sanitizedValue = sanitizeInput(value, 'message');
        break;
      default:
        sanitizedValue = sanitizeInput(value, 'text');
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Validasi real-time
    const errors = validateInput(name, sanitizedValue);
    setFormErrors(prev => ({
      ...prev,
      [name]: errors[name] || ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi semua field sebelum submit
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const errors = validateInput(key, formData[key]);
      if (errors[key]) {
        allErrors[key] = errors[key];
      }
    });

    // Cek apakah ada error
    if (Object.keys(allErrors).length > 0) {
      setFormErrors(allErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitasi ulang sebelum mengirim
      const sanitizedData = {
        name: sanitizeInput(formData.name, 'name'),
        email: sanitizeInput(formData.email, 'email'),
        phone: sanitizeInput(formData.phone, 'phone'),
        subject: sanitizeInput(formData.subject, 'text'),
        message: sanitizeInput(formData.message, 'message')
      };

      // Simulasi pengiriman form dengan data yang sudah disanitasi
      console.log('Data yang dikirim:', sanitizedData);

      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setFormErrors({});

        // Reset status setelah 3 detik
        setTimeout(() => setSubmitStatus(null), 3000);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat',
      details: [
        'STIKOM PGRI Banyuwangi',
        'Jl. Yos Sudarso No. 10',
        'Banyuwangi, Jawa Timur 68416'
      ]
    },
    {
      icon: '📞',
      title: 'Telepon',
      details: [
        '(0333) 421-718',
        '(0333) 421-719',
        'Fax: (0333) 421-720'
      ]
    },
    {
      icon: '📧',
      title: 'Email',
      details: [
        'd3mi@stikom-pgri-bwi.ac.id',
        'info@stikom-pgri-bwi.ac.id',
        'admin@stikom-pgri-bwi.ac.id'
      ]
    },
    {
      icon: '🌐',
      title: 'Website & Media Sosial',
      details: [
        'www.stikom-pgri-bwi.ac.id',
        '@stikompgribwi',
        'STIKOM PGRI Banyuwangi'
      ]
    }
  ];

  const operationalHours = [
    { day: 'Senin - Jumat', time: '07:00 - 16:00 WIB' },
    { day: 'Sabtu', time: '07:00 - 12:00 WIB' },
    { day: 'Minggu', time: 'Tutup' }
  ];

  const staffContacts = [
    {
      name: 'Dr. Ahmad Susanto, M.Kom',
      position: 'Ketua Program Studi',
      phone: '081234567890',
      email: 'kaprodi.d3mi@stikom-pgri-bwi.ac.id',
      photo: '👨‍💼'
    },
    {
      name: 'Siti Rahayu, S.Kom, M.T',
      position: 'Sekretaris Program Studi',
      phone: '081234567891',
      email: 'sekretaris.d3mi@stikom-pgri-bwi.ac.id',
      photo: '👩‍💼'
    },
    {
      name: 'Budi Hartono, S.Kom',
      position: 'Staff Administrasi',
      phone: '081234567892',
      email: 'admin.d3mi@stikom-pgri-bwi.ac.id',
      photo: '👨‍💻'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            📞 Hubungi Kami
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Kami siap membantu Anda dengan informasi Program Studi D3 Manajemen Informatika
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">🏢</div>
              <div className="text-lg font-semibold">Kampus Modern</div>
              <div className="text-sm">Fasilitas Lengkap</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-lg font-semibold">Tim Profesional</div>
              <div className="text-sm">Siap Melayani</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-lg font-semibold">Respon Cepat</div>
              <div className="text-sm">24/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">📋 Informasi Kontak</h2>
            <p className="text-lg text-gray-600">Berbagai cara untuk menghubungi kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">✉️ Kirim Pesan</h2>
              <p className="text-gray-600 mb-8">
                Punya pertanyaan? Jangan ragu untuk menghubungi kami. Tim kami akan merespon dalam 24 jam.
              </p>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-green-500 text-xl mr-3">✅</span>
                    <p className="text-green-700 font-semibold">Pesan berhasil dikirim! Kami akan segera merespon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-red-500 text-xl mr-3">❌</span>
                    <p className="text-red-700 font-semibold">Terjadi kesalahan. Silakan coba lagi.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      👤 Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${formErrors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="Masukkan nama lengkap"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      📧 Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${formErrors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="nama@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      📱 Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${formErrors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder="081234567890"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      📝 Subjek *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Pilih subjek</option>
                      <option value="informasi-pendaftaran">Informasi Pendaftaran</option>
                      <option value="kurikulum">Kurikulum & Mata Kuliah</option>
                      <option value="fasilitas">Fasilitas Kampus</option>
                      <option value="beasiswa">Beasiswa</option>
                      <option value="karir">Prospek Karir</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={1000}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${formErrors.message ? 'border-red-300' : 'border-gray-300'
                      }`}
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.message.length}/1000 karakter
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(formErrors).some(key => formErrors[key])}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${isSubmitting || Object.keys(formErrors).some(key => formErrors[key])
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:transform hover:scale-105'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Mengirim...
                    </span>
                  ) : (
                    '🚀 Kirim Pesan'
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🗺️ Lokasi Kampus</h2>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl h-64 flex items-center justify-center mb-8">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-xl font-semibold">Peta Lokasi Kampus</p>
                  <p className="text-sm opacity-90">STIKOM PGRI Banyuwangi</p>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🕒 Jam Operasional</h3>
                <div className="space-y-3">
                  {operationalHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-blue-600 font-semibold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                  <div className="text-2xl mb-2">🧭</div>
                  <div className="font-semibold">Petunjuk Arah</div>
                </a>
                <a
                  href="tel:+62333421718"
                  className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                >
                  <div className="text-2xl mb-2">📞</div>
                  <div className="font-semibold">Telepon Langsung</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Contacts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">👥 Kontak Staff</h2>
            <p className="text-lg text-gray-600">Tim yang siap membantu Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staffContacts.map((staff, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-6xl mb-4">{staff.photo}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{staff.position}</p>
                <div className="space-y-2">
                  <a href={`tel:${staff.phone}`} className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="mr-2">📱</span>
                    {staff.phone}
                  </a>
                  <a href={`mailto:${staff.email}`} className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="mr-2">📧</span>
                    <span className="text-sm">{staff.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">❓ Pertanyaan Umum</h2>
            <p className="text-lg text-gray-600">Jawaban untuk pertanyaan yang sering diajukan</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Bagaimana cara mendaftar di Program Studi D3 Manajemen Informatika?</h3>
              <p className="text-gray-600">
                Pendaftaran dapat dilakukan secara online melalui website resmi STIKOM PGRI Banyuwangi atau datang langsung ke kampus.
                Periode pendaftaran biasanya dibuka pada bulan Maret-Juli untuk tahun akademik berikutnya.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💰 Berapa biaya kuliah di Program Studi ini?</h3>
              <p className="text-gray-600">
                Informasi lengkap mengenai biaya kuliah dapat diperoleh dengan menghubungi bagian administrasi atau mengunjungi
                website resmi. Tersedia juga berbagai program beasiswa untuk mahasiswa berprestasi.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🎓 Apa prospek karir lulusan D3 Manajemen Informatika?</h3>
              <p className="text-gray-600">
                Lulusan dapat bekerja sebagai System Analyst, Database Administrator, Web Developer, IT Support,
                Network Administrator, atau melanjutkan ke jenjang S1 melalui program ekstensi.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🏢 Apakah ada program magang atau kerja sama industri?</h3>
              <p className="text-gray-600">
                Ya, program studi memiliki kerja sama dengan berbagai perusahaan IT dan instansi pemerintah untuk program magang
                dan penempatan kerja lulusan. Mahasiswa wajib mengikuti program magang di semester akhir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Siap Bergabung dengan Kami?</h2>
          <p className="text-xl mb-8">
            Jangan ragu untuk menghubungi kami jika ada pertanyaan lebih lanjut!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/profil" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              📋 Pelajari Program Studi
            </a>
            <a href="/showcase" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              🎨 Lihat Showcase Mahasiswa
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}