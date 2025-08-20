'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../lib/supabase';
import DashboardLayout from '../../../components/DashboardLayout';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const tables = {
    users: { name: 'Users', icon: '👥' },
    mahasiswa: { name: 'Mahasiswa', icon: '🎓' },
    dosen: { name: 'Dosen', icon: '👨‍🏫' },
    portofolio: { name: 'Portfolio', icon: '📁' },
    skills: { name: 'Skills', icon: '🛠️' },
    berita: { name: 'Berita', icon: '📰' },
    prestasi: { name: 'Prestasi', icon: '🏆' }
  };

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }
    fetchData();
  }, [activeTab, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result;
      if (activeTab === 'users') {
        result = await db.getAllUsers();
      } else {
        result = await db.getAllData(activeTab);
      }
      setData(result || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (activeTab === 'users') {
        await db.deleteUser(id);
      } else {
        await db.deleteData(activeTab, id);
      }
      fetchData();
    } catch (error) {
      alert('Error deleting item: ' + error.message);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(tables).map(([key, table]) => (
            <div key={key} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{table.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{table.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {key === activeTab ? data.length : '...'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {Object.entries(tables).map(([key, table]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {table.icon} {table.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Data Table */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Manage {tables[activeTab].name}
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add New
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name/Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.nama || item.judul || item.email || item.nama_skill || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            (item.status === 'aktif' || item.is_active) 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status || (item.is_active ? 'Active' : 'Inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}