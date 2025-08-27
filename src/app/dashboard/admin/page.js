'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../lib/supabase';
import DashboardLayout from '../../../components/DashboardLayout';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState({});

  // Definisi semua tabel berdasarkan schema database
  const tables = {
    overview: { name: 'Overview', icon: '📊', color: 'bg-blue-500' },
    program_studi: { name: 'Program Studi', icon: '🎓', color: 'bg-purple-500' },
    dosen: { name: 'Dosen', icon: '👨‍🏫', color: 'bg-green-500' },
    mahasiswa: { name: 'Mahasiswa', icon: '👨‍🎓', color: 'bg-blue-500' },
    mata_kuliah: { name: 'Mata Kuliah', icon: '📚', color: 'bg-yellow-500' },
    kurikulum: { name: 'Kurikulum', icon: '📋', color: 'bg-indigo-500' },
    berita: { name: 'Berita', icon: '📰', color: 'bg-red-500' },
    galeri: { name: 'Galeri', icon: '🖼️', color: 'bg-pink-500' },
    prestasi: { name: 'Prestasi', icon: '🏆', color: 'bg-orange-500' },
    fasilitas: { name: 'Fasilitas', icon: '🏢', color: 'bg-teal-500' },
    kontak_info: { name: 'Kontak Info', icon: '📞', color: 'bg-gray-500' },
    alumni: { name: 'Alumni', icon: '🎓', color: 'bg-emerald-500' },
    portofolio: { name: 'Portofolio', icon: '💼', color: 'bg-violet-500' },
    skills: { name: 'Skills', icon: '🛠️', color: 'bg-cyan-500' }
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }
    if (activeTab === 'overview') {
      fetchStats();
    } else {
      fetchData();
    }
  }, [activeTab, user]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const statsData = {};
      for (const [key] of Object.entries(tables)) {
        if (key !== 'overview') {
          const result = await db.getAllData(key);
          statsData[key] = result?.length || 0;
        }
      }
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await db.getAllData(activeTab);
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    
    try {
      await db.deleteData(activeTab, id);
      fetchData();
    } catch (error) {
      alert('Error menghapus item: ' + error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingItem) {
        await db.updateData(activeTab, editingItem.id, formData);
      } else {
        await db.insertData(activeTab, formData);
      }
      setShowModal(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      alert('Error menyimpan data: ' + error.message);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} title="Admin Dashboard">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              {Object.entries(tables).map(([key, table]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === key
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-lg">{table.icon}</span>
                  <span className="font-medium">{table.name}</span>
                  {key !== 'overview' && stats[key] && (
                    <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {stats[key]}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tables[activeTab]?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Kelola data {tables[activeTab]?.name.toLowerCase()}
                </p>
              </div>
              {activeTab !== 'overview' && (
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <span className="mr-2">+</span>
                  Tambah {tables[activeTab]?.name}
                </button>
              )}
            </div>

            {/* Content Area */}
            {activeTab === 'overview' ? (
              <OverviewContent stats={stats} tables={tables} loading={loading} />
            ) : (
              <DataTableContent 
                activeTab={activeTab}
                data={data}
                loading={loading}
                onEdit={(item) => {
                  setEditingItem(item);
                  setShowModal(true);
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal untuk Add/Edit */}
      {showModal && (
        <DataModal
          activeTab={activeTab}
          editingItem={editingItem}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </DashboardLayout>
  );
}

// Komponen Overview
function OverviewContent({ stats, tables, loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Object.entries(tables).map(([key, table]) => {
        if (key === 'overview') return null;
        return (
          <div key={key} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${table.color} p-3 rounded-lg text-white text-2xl mr-4`}>
                {table.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
                <p className="text-3xl font-bold text-gray-700">{stats[key] || 0}</p>
                <p className="text-sm text-gray-500">Total data</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Komponen Data Table
function DataTableContent({ activeTab, data, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 text-lg">Belum ada data tersedia</p>
        <p className="text-gray-400 mt-2">Klik tombol "Tambah" untuk menambahkan data baru</p>
      </div>
    );
  }

  // Render tabel berdasarkan jenis data
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {getTableHeaders(activeTab).map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {renderTableRow(activeTab, item)}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper functions untuk tabel headers
function getTableHeaders(activeTab) {
  const headers = {
    program_studi: ['Nama', 'Akreditasi', 'Tahun Berdiri', 'Status'],
    dosen: ['NIDN', 'Nama', 'Email', 'Jabatan', 'Status'],
    mahasiswa: ['NIM', 'Nama', 'Email', 'Angkatan', 'Status'],
    mata_kuliah: ['Kode MK', 'Nama', 'SKS', 'Semester'],
    kurikulum: ['Tahun', 'Nama', 'Status'],
    berita: ['Judul', 'Kategori', 'Status', 'Tanggal Publish'],
    galeri: ['Judul', 'Kategori', 'Tanggal Foto'],
    prestasi: ['Judul', 'Kategori', 'Tingkat', 'Tahun'],
    fasilitas: ['Nama', 'Kategori', 'Kapasitas', 'Status'],
    kontak_info: ['Jenis', 'Nilai', 'Label', 'Status'],
    alumni: ['Nama', 'NIM', 'Tahun Lulus', 'Pekerjaan'],
    portofolio: ['Judul', 'Kategori', 'Mahasiswa', 'Status'],
    skills: ['Nama Skill', 'Kategori', 'Level', 'Status']
  };
  return headers[activeTab] || ['ID', 'Nama', 'Status'];
}

// Helper function untuk render table row
function renderTableRow(activeTab, item) {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  const rowRenderers = {
    program_studi: (item) => (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.akreditasi}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tahun_berdiri}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Aktif
          </span>
        </td>
      </>
    ),
    dosen: (item) => (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nidn}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jabatan}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {item.status}
          </span>
        </td>
      </>
    ),
    mahasiswa: (item) => (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nim}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.angkatan}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {item.status}
          </span>
        </td>
      </>
    )
    // Tambahkan renderer untuk tabel lainnya...
  };

  const renderer = rowRenderers[activeTab];
  if (renderer) {
    return renderer(item);
  }

  // Default renderer
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama || item.judul || 'N/A'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status || 'aktif'}</td>
    </>
  );
}

// Komponen Modal untuk Add/Edit
function DataModal({ activeTab, editingItem, onSave, onClose }) {
  const [formData, setFormData] = useState(editingItem || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editingItem ? 'Edit' : 'Tambah'} {activeTab.replace('_', ' ')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields(activeTab, formData, handleChange)}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper function untuk render form fields
function renderFormFields(activeTab, formData, handleChange) {
  const commonFields = {
    program_studi: [
      { name: 'nama', label: 'Nama Program Studi', type: 'text', required: true },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'visi', label: 'Visi', type: 'textarea' },
      { name: 'misi', label: 'Misi', type: 'textarea' },
      { name: 'tujuan', label: 'Tujuan', type: 'textarea' },
      { name: 'akreditasi', label: 'Akreditasi', type: 'select', options: ['A', 'B', 'C', 'Baik Sekali', 'Baik'] },
      { name: 'tahun_berdiri', label: 'Tahun Berdiri', type: 'number' }
    ],
    dosen: [
      { name: 'nidn', label: 'NIDN', type: 'text', required: true },
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telepon', label: 'Telepon', type: 'text' },
      { name: 'jabatan', label: 'Jabatan', type: 'text' },
      { name: 'pendidikan_terakhir', label: 'Pendidikan Terakhir', type: 'text' },
      { name: 'foto_url', label: 'URL Foto', type: 'url' },
      { name: 'status', label: 'Status', type: 'select', options: ['aktif', 'non-aktif'] }
    ],
    mahasiswa: [
      { name: 'nim', label: 'NIM', type: 'text', required: true },
      { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telepon', label: 'Telepon', type: 'text' },
      { name: 'alamat', label: 'Alamat', type: 'textarea' },
      { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date' },
      { name: 'jenis_kelamin', label: 'Jenis Kelamin', type: 'select', options: ['L', 'P'] },
      { name: 'angkatan', label: 'Angkatan', type: 'number' },
      { name: 'foto_url', label: 'URL Foto', type: 'url' },
      { name: 'status', label: 'Status', type: 'select', options: ['aktif', 'lulus', 'cuti', 'drop-out'] }
    ]
    // Tambahkan field untuk tabel lainnya...
  };

  const fields = commonFields[activeTab] || [
    { name: 'nama', label: 'Nama', type: 'text', required: true }
  ];

  return fields.map((field) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          required={field.required}
        />
      ) : field.type === 'select' ? (
        <select
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={field.required}
        >
          <option value="">Pilih {field.label}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={field.required}
        />
      )}
    </div>
  ));
}