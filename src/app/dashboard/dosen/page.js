'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../lib/supabase';
import DashboardLayout from '../../../components/DashboardLayout';

export default function DosenDashboard() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'dosen') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [portfolioData, mahasiswaData] = await Promise.all([
        db.getPortofolio(),
        db.getAllData('mahasiswa')
      ]);
      setPortfolios(portfolioData || []);
      setMahasiswa(mahasiswaData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'dosen') {
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
    <DashboardLayout user={user} title="Dosen Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🎓</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mahasiswa</p>
                <p className="text-2xl font-bold text-gray-900">{mahasiswa.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📁</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">{portfolios.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⭐</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Featured Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolios.filter(p => p.featured).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Portfolios */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Portfolio Submissions</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {portfolios.slice(0, 5).map((portfolio) => (
                  <div key={portfolio.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{portfolio.judul}</h3>
                      <p className="text-sm text-gray-600">
                        by {portfolio.mahasiswa?.nama} - {portfolio.kategori}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Review
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}