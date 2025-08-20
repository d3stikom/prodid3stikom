import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'D3 Manajemen Informatika - STIKOM PGRI Banyuwangi',
  description: 'Website resmi Program Studi D3 Manajemen Informatika',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
