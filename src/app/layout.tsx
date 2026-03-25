import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Ruben Dave Jusner GUERRIER ',
  description: 'Portfolio de Ruben Dave Jusner GUERRIER, Étudiant en fin de cycle - Sciences Informatiques et Développeur Web.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main style={{ paddingTop: 60 }}>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
