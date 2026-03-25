'use client';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();
  const quickLinks = [
    { label: lang === 'fr' ? 'À propos' : 'About', id: 'about' },
    { label: lang === 'fr' ? 'Projets' : 'Projects', id: 'projects' },
    { label: lang === 'fr' ? 'Compétences' : 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
    { label: lang === 'fr' ? 'Crédits' : 'Credits', id: 'credits' },
  ];
  return (
    <footer style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--footer-border)', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Logo size={32} />
              <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--foreground)' }}>Ruben Dave Jusner GUERRIER</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              {lang === 'fr' 
                ? "Développeur Web Full Stack passionné par la création d'expériences numériques qui font la différence. Construisons ensemble quelque chose de grand."
                : "Full Stack Web Developer passionate about creating digital experiences that make a difference. Let's build something amazing together."}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'GitHub', href: 'https://github.com', icon: <GithubIcon /> },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: <LinkedinIcon /> },
                { label: 'Twitter', href: 'https://twitter.com', icon: <TwitterIcon /> },
                { label: 'Instagram', href: 'https://instagram.com', icon: <InstagramIcon /> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-btn" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Liens Rapides' : 'Quick Links'}</p>
            {quickLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 10, textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {l.label}
              </a>
            ))}
          </div>
          {/* Get in Touch */}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Contact' : 'Get In Touch'}</p>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 14 }}>{lang === 'fr' ? 'Prêt à démarrer un projet ?' : 'Ready to start a project?'}</p>
            <a href="#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>📩 {lang === 'fr' ? 'Prendre rendez-vous' : 'Book Call'}</a>
            <p style={{ fontSize: 12, color: 'var(--text-dimmer)', marginTop: 8 }}>{lang === 'fr' ? 'Réponse sous 24 heures' : 'Response within 24 hours'}</p>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--footer-border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>© {year} Ruben Dave Jusner GUERRIER. {lang === 'fr' ? 'Fait avec ❤️ et beaucoup de café.' : 'Made with ❤️ and lots of coffee.'}</p>
          <p style={{ fontSize: 12, color: 'var(--text-dimmer)' }}>{lang === 'fr' ? 'Créé avec Next.js & Tailwind CSS' : 'Built with Next.js & Tailwind CSS'}</p>
        </div>
      </div>
    </footer>
  );
}
