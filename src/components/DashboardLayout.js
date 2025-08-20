'use client';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({ children, user, title }) {
  const { signOut } = useAuth();

  const navigation = {
    admin: [
      { name: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
      { name: 'Users', href: '/dashboard/admin/users', icon: '👥' },
      { name: 'Reports', href: '/dashboard/admin/reports', icon: '📈' }
    ],
    dosen: [
      { name: 'Dashboard', href: '/dashboard/dosen', icon: '📊' },
      { name: 'Mahasiswa', href: '/dashboard/dosen/mahasiswa', icon: '🎓' },
      { name: 'Portfolio Review', href: '/dashboard/dosen/portfolio', icon: '📁' }
    ],
    mahasiswa: [
      { name: 'Dashboard', href: '/dashboard/mahasiswa', icon: '📊' },
      { name: 'My Portfolio', href: '/dashboard/mahasiswa/portfolio', icon: '📁' },
      { name: 'My Skills', href: '/dashboard/mahasiswa/skills', icon: '🛠️' }
    ]
  };

  const userNavigation = navigation[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.email} ({user?.role})
              </span>
              <button
                onClick={signOut}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}