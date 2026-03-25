'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const SkillsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const getNavLinks = (lang: string) => [
  { id: 'home', label: lang === 'fr' ? 'Accueil' : 'Home', icon: <HomeIcon />, href: '#home' },
  { id: 'about', label: lang === 'fr' ? 'À propos' : 'About', icon: <UserIcon />, href: '#about' },
  { id: 'projects', label: lang === 'fr' ? 'Projets' : 'Projects', icon: <FolderIcon />, href: '#projects' },
  { id: 'skills', label: lang === 'fr' ? 'Compétences' : 'Skills', icon: <CodeIcon />, href: '#skills' },
  { id: 'contact', label: 'Contact', icon: <MailIcon />, href: '#contact' },
  { id: 'tools', label: lang === 'fr' ? 'Outils' : 'Tools', icon: <SkillsIcon />, href: '#tools' },
  { id: 'services', label: 'Services', icon: <GridIcon />, href: '#services' },
];

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = getNavLinks(lang);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: isMenuOpen ? 0 : 'auto', zIndex: 1000,
      background: scrolled || isMenuOpen ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
      backdropFilter: 'blur(12px)',
      borderBottom: isMenuOpen ? 'none' : '1px solid var(--nav-border)',
      transition: 'background 0.3s, height 0.3s'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1100 }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
          <Logo size={28} />
        </a>

        {/* Desktop Nav icons */}
        <div style={{ display: 'none', alignItems: 'center', gap: 2 }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-icon ${active === link.id ? 'active' : ''}`}
              onClick={() => setActive(link.id)}
              title={link.label}
              style={{ color: active === link.id ? 'var(--nav-text-active)' : 'var(--nav-text)' }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language toggle */}
          <button
            className="nav-icon"
            onClick={toggleLang}
            title="Toggle language"
            style={{ border: 'none', background: 'transparent', color: 'var(--nav-text)', fontSize: '14px', fontWeight: 'bold' }}
          >
            {lang.toUpperCase()}
          </button>

          {/* Dark mode toggle */}
          <button 
            className="nav-icon" 
            title="Toggle theme" 
            onClick={toggleTheme}
            style={{ border: 'none', background: 'transparent', color: 'var(--nav-text)' }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : <MoonIcon />}
          </button>

          {/* Hamburger Menu (Mobile Only) */}
          <button 
            className="nav-icon mobile-menu-btn"
            onClick={toggleMenu}
            style={{ border: 'none', background: 'transparent', color: 'var(--nav-text)' }}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMenuOpen(false);
        }}
      >
        {navLinks.map(link => (
          <a
            key={link.id}
            href={link.href}
            className={`mobile-nav-link ${active === link.id ? 'active' : ''}`}
            onClick={() => {
              setActive(link.id);
              setIsMenuOpen(false);
            }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu-overlay { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
