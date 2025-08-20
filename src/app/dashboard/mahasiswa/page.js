'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../lib/supabase';
import DashboardLayout from '../../../components/DashboardLayout';

export default function MahasiswaDashboard() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);

  useEffect(() => {
    if (user?.role === 'mahasiswa') {
      fetchMyData();
    }
  }, [user]);

  const fetchMyData = async () => {
    try {
      // Fetch user's own portfolios and skills
      const [portfolioData, skillData] = await Promise.all([
        db.getPortofolio(), // Filter by user ID in real implementation
        db.getSkills() // Filter by user ID in real implementation
      ]);
      setPortfolios(portfolioData || []);
      setSkills(skillData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'mahasiswa') {
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
    <DashboardLayout user={user} title="Mahasiswa Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📁</div>
              <div>
                <p className="text-sm font-medium text-gray-600">My Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">{portfolios.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🛠️</div>
              <div>
                <p className="text-sm font-medium text-gray-600">My Skills</p>
                <p className="text-2xl font-bold text-gray-900">{skills.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⭐</div>
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolios.filter(p => p.featured).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
            <p className="text-gray-600 mb-4">Manage your project portfolio</p>
            <button
              onClick={() => setShowPortfolioForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Portfolio
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <p className="text-gray-600 mb-4">Update your skills and competencies</p>
            <button
              onClick={() => setShowSkillForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add New Skill
            </button>
          </div>
        </div>

        {/* Recent Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Portfolios */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Portfolio</h2>
            </div>
            <div className="p-6">
              {portfolios.slice(0, 3).map((portfolio) => (
                <div key={portfolio.id} className="mb-4 p-3 border rounded">
                  <h4 className="font-medium">{portfolio.judul}</h4>
                  <p className="text-sm text-gray-600">{portfolio.kategori}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Skills */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Skills</h2>
            </div>
            <div className="p-6">
              {skills.slice(0, 3).map((skill) => (
                <div key={skill.id} className="mb-4 p-3 border rounded">
                  <h4 className="font-medium">{skill.nama_skill}</h4>
                  <p className="text-sm text-gray-600">{skill.kategori} - {skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}