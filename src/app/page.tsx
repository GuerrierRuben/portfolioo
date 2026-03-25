'use client';
import { useState, useEffect, useRef } from 'react';

import { ArrowRight, Mail, Download, ArrowDown, Linkedin, Github, Twitter, Instagram, ExternalLink, Monitor, Smartphone, GitBranch, Zap, Folder, BookOpen, Puzzle, Code, Database, Layout, Settings, Wrench, Rocket, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── Data ──────────────────────────────────────────────────────────────────────
const skillTags = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'SQL', 'MongoDB'];

const getProjects = (lang: string) => [
  {
    name: 'The Ledger App',
    category: 'Mobile App',
    desc: lang === 'fr' 
      ? 'Une application mobile développée avec Flutter permettant de suivre et de lire des actualités.' 
      : 'A mobile application developed with Flutter for tracking and reading news.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    liveUrl: '#',
    githubUrl: 'https://github.com/GuerrierRuben/theledger',
    color: '#0ea5e9',
  },
  {
    name: 'Église de Dieu Salut Pour Tous',
    category: 'Full-Stack',
    desc: lang === 'fr' 
      ? 'Site web complet pour une église, avec gestion front-end et back-end. Base de données hébergée sur Supabase.' 
      : 'Full-featured church website with front-end and back-end management. Database hosted on Supabase.',
    tags: ['Next.js', 'React', 'Supabase', 'Full Stack'],
    liveUrl: 'https://eglisededieusalutpourtous.vercel.app/',
    githubUrl: 'https://github.com/GuerrierRuben/edpst',
    color: '#0f172a',
  },
  {
    name: 'Kolosal',
    category: 'UI/UX',
    desc: lang === 'fr' 
      ? 'Site web vitrine développé avec React pour une entreprise de vente de sandwichs.' 
      : 'Showcase website developed with React for a sandwich selling company.',
    tags: ['React', 'CSS', 'Netlify', 'UI/UX'],
    liveUrl: 'https://kolosal.netlify.app',
    githubUrl: '#',
    color: '#7c3aed',
  },
  {
    name: 'ScanOtaku',
    category: 'Frontend',
    desc: lang === 'fr' 
      ? 'Un site web vitrine dédié aux mangas, développé exclusivement en front-end.' 
      : 'A showcase website dedicated to mangas, developed exclusively in front-end.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://scanotakuu.netlify.app',
    githubUrl: 'https://github.com/GuerrierRuben/ScanOtaku',
    color: '#0369a1',
  },
  {
    name: 'Etoolkit',
    category: 'Frontend',
    desc: lang === 'fr' 
      ? 'Un site e-commerce développé exclusivement en front-end (HTML, CSS, JS).' 
      : 'An e-commerce website developed exclusively in front-end (HTML, CSS, JS).',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://etoolkit.netlify.app',
    githubUrl: 'https://github.com/GuerrierRuben/Etoolkit',
    color: '#7f1d1d',
  },
  {
    name: 'VR-ZONE',
    category: 'Frontend',
    desc: lang === 'fr' 
      ? 'Une expérience web immersive en réalité virtuelle développée avec les technologies du web.' 
      : 'An immersive virtual reality web experience developed with web technologies.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/GuerrierRuben/VR-ZONE',
    color: '#1e1b4b',
  },
];

const getCategories = (lang: string) => [lang === 'fr' ? 'Tous les projets' : 'All Projects', 'Full-Stack', 'UI/UX', 'Featured Apps', 'Backend'];

const getSkills = (lang: string) => ({
  [lang === 'fr' ? 'Développement Web & Prog' : 'Web Dev & Prog']: ['JavaScript (Node.js)', 'C++', 'Python', 'PHP', 'React', 'Next.js'],
  [lang === 'fr' ? 'Administration Système' : 'System Administration']: ['Linux (Debian)', 'Windows Server', 'AD DS', 'DHCP', 'DNS'],
  [lang === 'fr' ? 'Data & Visualisation' : 'Data & Visualization']: ['Python (NumPy, Pandas)', 'Power BI', 'Excel avancé'],
  [lang === 'fr' ? 'Réseaux & Bureautique' : 'Network & Office']: ['Réseaux locaux (LAN)', 'MS Office'],
});

const getToolsAndTech = (lang: string) => ({
  [lang === 'fr' ? 'Compétences Interpersonnelles' : 'Interpersonal Skills']: ['Leadership', lang === 'fr' ? 'Esprit analytique' : 'Analytical Mind', lang === 'fr' ? 'Travail d\'équipe' : 'Teamwork', 'Autonomie', 'Communication'],
  [lang === 'fr' ? 'Langues' : 'Languages']: [lang === 'fr' ? 'Français (bilingue)' : 'French (Bilingual)', lang === 'fr' ? 'Créole (maternel)' : 'Creole (Native)', lang === 'fr' ? 'Anglais (intermédiaire)' : 'English (Intermediate)'],
});

const getDevStats = (lang: string) => [
  { label: lang === 'fr' ? 'Lignes de Code' : 'Lines of Code', value: '50K+' },
  { label: lang === 'fr' ? 'Projets Créés' : 'Projects Built', value: '15+' },
  { label: lang === 'fr' ? 'Cafés Consommés' : 'Coffee Consumed', value: '∞' },
];

const proficiencies = [
  { label: 'JavaScript', pct: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { label: 'React.js', pct: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { label: 'Node.js', pct: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { label: 'MongoDB', pct: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { label: 'CSS/Tailwind', pct: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { label: 'Next.js', pct: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
];

const getExperiences = (lang: string) => [
  {
    title: lang === 'fr' ? 'Développeur Web (Freelance)' : 'Web Developer (Freelance)',
    company: lang === 'fr' ? 'Indépendant' : 'Independent',
    period: lang === 'fr' ? '2023 - Présent' : '2023 - Present',
    desc: lang === 'fr' ? 'Création de sites web personnalisés, conception d\'interfaces utilisateur responsives et optimisation des performances front-end et back-end.' : 'Creation of custom websites, design of responsive user interfaces, and optimization of front-end and back-end performance.',
  },
  {
    title: lang === 'fr' ? 'Technicien Informatique (Stage)' : 'IT Technician (Internship)',
    company: 'Haiti Rehab Care',
    period: lang === 'fr' ? 'Juillet 2024 - Septembre 2024' : 'July 2024 - September 2024',
    desc: lang === 'fr' ? 'Gestion et entretien du parc informatique, assistance technique aux utilisateurs et gestion rigoureuse des sauvegardes de données.' : 'Management and maintenance of IT equipment, technical assistance to users, and rigorous management of data backups.',
  },
  {
    title: lang === 'fr' ? 'Membre Organisateur' : 'Organizing Member',
    company: 'Club Numédia - ESIH',
    period: lang === 'fr' ? 'Janvier 2025 - Présent' : 'January 2025 - Present',
    desc: lang === 'fr' ? 'Planification et coordination technique des activités du club, installation de systèmes de surveillance caméra, et organisation de workshops.' : 'Planning and technical coordination of club activities, installation of camera surveillance systems, and organization of workshops.',
  },
];

const getEducation = (lang: string) => [
  {
    title: lang === 'fr' ? 'Licence en Informatique' : 'Bachelor in Computer Science',
    company: 'ESIH',
    period: lang === 'fr' ? '2022 - 2026 (En cours)' : '2022 - 2026 (Ongoing)',
    desc: lang === 'fr' ? 'Administration des réseaux, Administration Linux, Windows Server, Analyse de données avec Python, Développement web.' : 'Network administration, Linux Administration, Windows Server, Data analysis with Python, Web development.',
  },
  {
    title: lang === 'fr' ? 'Certificat en Data Engineering' : 'Certificate in Data Engineering',
    company: 'FDS-UEH',
    period: lang === 'fr' ? 'Décembre 2025 - Juin 2026' : 'December 2025 - June 2026',
    desc: lang === 'fr' ? 'Formation financée par la Banque de la République d\'Haïti (BRH).' : 'Training funded by the Bank of the Republic of Haiti (BRH).',
  },
];

const getServices = (lang: string) => [
  { icon: <Monitor size={32} strokeWidth={1.5} />, title: lang === 'fr' ? 'Développement Web' : 'Web Development', desc: lang === 'fr' ? 'Applications web Full-stack avec frameworks modernes' : 'Full-stack web applications with modern frameworks' },
  { icon: <Smartphone size={32} strokeWidth={1.5} />, title: lang === 'fr' ? 'Design Responsive' : 'Responsive Design', desc: lang === 'fr' ? 'Approche mobile-first pour tous les appareils' : 'Mobile-first approach for all devices' },
  { icon: <GitBranch size={32} strokeWidth={1.5} />, title: lang === 'fr' ? 'Contrôle de Version' : 'Version Control', desc: lang === 'fr' ? 'Workflow Git et développement collaboratif' : 'Git workflow and collaborative development' },
  { icon: <Zap size={32} strokeWidth={1.5} />, title: lang === 'fr' ? 'Performance' : 'Performance', desc: lang === 'fr' ? 'Applications optimisées pour la vitesse et l\'efficacité' : 'Optimized applications for speed and efficiency' },
];

// ─── Animated Counter ──────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

// ─── Reveal on Scroll ──────────────────────────────────────────────────────────
function Reveal({ children, width = "100%", delay = 0 }: { children: React.ReactNode, width?: "100%" | "fit-content", delay?: number }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`reveal ${isVisible ? 'active' : ''}`} 
      style={{ width, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Image placeholder */}
      <div style={{ height: 180, background: project.color, borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
        <Folder size={48} color="#ffffff" strokeWidth={1.5} style={{ opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#fff', fontWeight: 600 }}>
          {project.category}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--foreground)' }}>{project.name}</h3>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--nav-hover-bg)', borderRadius: 4, padding: '2px 8px' }}>{project.category}</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, flex: 1, lineHeight: 1.6 }}>{project.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
        {project.tags.map(t => (
          <span key={t} className="skill-tag" style={{ fontSize: 11, padding: '3px 8px', margin: 0 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--card-border)', paddingTop: 12 }}>
        <a href={project.liveUrl} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: 13 }}>
          <ExternalLink size={14} /> Live Demo
        </a>
        <a href={project.githubUrl} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '8px 12px', fontSize: 13 }}>
          <Github size={14} /> GitHub
        </a>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { lang } = useLanguage();
  const projects = getProjects(lang);
  const categories = getCategories(lang);
  const skills = getSkills(lang);
  const toolsAndTech = getToolsAndTech(lang);
  const devStats = getDevStats(lang);
  const experiences = getExperiences(lang);
  const education = getEducation(lang);
  const services = getServices(lang);

  const [activeFilter, setActiveFilter] = useState(lang === 'fr' ? 'Tous les projets' : 'All Projects');
  const [statsVisible, setStatsVisible] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset active filter when language changes
    setActiveFilter(lang === 'fr' ? 'Tous les projets' : 'All Projects');
  }, [lang]);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBarsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs1.observe(statsRef.current);
    if (barsRef.current) obs2.observe(barsRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  const filtered = (activeFilter === 'All Projects' || activeFilter === 'Tous les projets') ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, width: '100%', margin: '0 auto' }}>
          <div className="badge animate-fade-in-up" style={{ marginBottom: 28, animationDelay: '0.1s', opacity: 0 }}>
            <span className="dot" />
            {lang === 'fr' ? 'Disponible pour travailler' : 'Available for work'}
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em', color: 'var(--foreground)', animationDelay: '0.2s', opacity: 0 }}>
            {lang === 'fr' ? 'Salut, je suis Ruben Dave Jusner GUERRIER' : 'Hi, I\'m Ruben Dave Jusner GUERRIER'}
          </h1>
          <p className="animate-fade-in-up" style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 16, fontWeight: 400, animationDelay: '0.3s', opacity: 0 }}>
            {lang === 'fr' ? 'Étudiant en fin de cycle - Sciences Informatiques | Développeur Web' : 'Senior Year Student - Computer Science | Web Developer'}
          </p>
          <p className="animate-fade-in-up" style={{ fontSize: 15, color: 'var(--text-dim)', marginBottom: 28, maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7, animationDelay: '0.4s', opacity: 0 }}>
            {lang === 'fr' 
              ? 'Étudiant en fin de cycle à l\'ESIH, je suis un futur ingénieur passionné par l\'innovation technologique et la transformation numérique. Leader naturel, j\'allie des compétences techniques en développement web et analyse de données à une vision stratégique pour résoudre des problèmes complexes. Mon objectif est de concevoir des systèmes intelligents à fort impact social et technologique.'
              : 'Senior year student at ESIH, I am a future engineer passionate about technological innovation and digital transformation. A natural leader, I combine technical skills in web development and data analysis with a strategic vision to solve complex problems. My goal is to design intelligent systems with strong social and technological impact.'}
          </p>
          <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginBottom: 32, animationDelay: '0.5s', opacity: 0 }}>
            {skillTags.map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
          </div>
          <div className="animate-fade-in-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 40, animationDelay: '0.6s', opacity: 0 }}>
            <a href="#projects" className="btn-primary"><ArrowRight size={16} /> {lang === 'fr' ? 'Voir mes projets' : 'View My Work'}</a>
            <a href="#contact" className="btn-outline"><Mail size={16} /> {lang === 'fr' ? 'Me Contacter' : 'Get In Touch'}</a>
            <a href="/GuerrierRuben_CV.pdf" download className="btn-blue"><Download size={16} /> {lang === 'fr' ? 'Télécharger CV' : 'Download Resume'}</a>
          </div>
          {/* Social Links */}
          <div className="animate-fade-in-up" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, animationDelay: '0.7s', opacity: 0 }}>
            <a href="https://linkedin.com/in/ruben-guerrier-dev" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn" title="GitHub"><Github size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" title="Twitter"><Twitter size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" title="Instagram"><Instagram size={18} /></a>
          </div>
          {/* Scroll indicator */}
          <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-dim)', fontSize: 13, gap: 6, animation: 'bounce 2s infinite', animationDelay: '1s', opacity: 0 }}>
            <span>{lang === 'fr' ? 'Défilez pour explorer' : 'Scroll to explore'}</span>
            <ArrowDown size={16} />
          </div>
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="section-badge">{lang === 'fr' ? 'À propos de moi' : 'About Me'}</span>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Mieux me connaître' : 'Get to know me better'}</h2>
              <p style={{ color: 'var(--text-dim)' }}>{lang === 'fr' ? 'Passionné par la création d\'expériences numériques qui font la différence' : 'Passionate about creating digital experiences that make a difference'}</p>
            </div>
          </Reveal>
          <div className="responsive-grid-2">
            {/* Left */}
            <Reveal delay={0.2}>
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--foreground)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {lang === 'fr' ? 'Mon Histoire' : 'My Story'}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.8 }}>
                  {lang === 'fr'
                    ? 'Étudiant en fin de cycle à l\'ESIH, je suis un futur ingénieur passionné par l\'innovation technologique et la transformation numérique. Leader naturel, j\'allie des compétences techniques en développement web et analyse de données à une vision stratégique pour résoudre des problèmes complexes.'
                    : 'Senior year student at ESIH, I am a future engineer passionate about technological innovation and digital transformation. A natural leader, I combine technical skills in web development and data analysis with a strategic vision to solve complex problems.'}
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.8 }}>
                  {lang === 'fr'
                    ? 'Mon objectif est de concevoir des systèmes intelligents à fort impact social et technologique. J\'aime collaborer dans des environnements multiculturels, apporter des solutions constructives et relever de nouveaux défis techniques.'
                    : 'My goal is to design intelligent systems with strong social and technological impact. I enjoy collaborating in multicultural environments, providing constructive solutions, and tackling new technical challenges.'}
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.8 }}>
                  {lang === 'fr'
                    ? 'Je m\'implique aussi activement dans la communauté, notamment à travers le Club Numédia, où j\'organise des projets numériques et des formations pour les membres.'
                    : 'I am also actively involved in the community, notably through Club Numédia, where I organize digital projects and training sessions for members.'}
                </p>
                {/* Trait cards */}
                {[
                  { icon: <Zap size={20} />, title: lang === 'fr' ? 'Expertise Full Stack' : 'Full Stack Expertise', desc: lang === 'fr' ? 'Maîtrise du développement web moderne backend et frontend.' : 'Proficiency in modern backend and frontend web development.' },
                  { icon: <Puzzle size={20} />, title: lang === 'fr' ? 'Solveur de problèmes' : 'Problem Solver', desc: lang === 'fr' ? 'Focus sur la création de solutions efficaces et extensibles qui résolvent les problèmes réels.' : 'Focus on creating efficient and scalable solutions that solve real-world problems.' },
                  { icon: <BookOpen size={20} />, title: lang === 'fr' ? 'Apprentissage continu' : 'Continuous Learner', desc: lang === 'fr' ? 'Toujours à l\'affût des nouvelles technologies et des meilleures pratiques pour rester au niveau.' : 'Always on the lookout for new technologies and best practices to stay ahead.' },
                ].map((t, idx) => (
                  <Reveal key={t.title} delay={0.1 * idx}>
                    <div className="card" style={{ marginBottom: 12, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>{t.icon}</div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: 'var(--foreground)' }}>{t.title}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{t.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            {/* Right — Experience */}
            <Reveal delay={0.4}>
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 24, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Expériences' : 'Experience'}</h3>
                {experiences.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="timeline-dot" />
                      {i < experiences.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--nav-border)', marginTop: 8 }} />}
                    </div>
                    <div style={{ flex: 1, paddingBottom: i < experiences.length - 1 ? 0 : 0 }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>{exp.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{exp.company}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>{exp.period}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
                
                <h3 style={{ fontWeight: 700, marginBottom: 24, marginTop: 40, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Formations' : 'Education'}</h3>
                {education.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="timeline-dot" />
                      {i < education.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--nav-border)', marginTop: 8 }} />}
                    </div>
                    <div style={{ flex: 1, paddingBottom: i < education.length - 1 ? 0 : 0 }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--foreground)' }}>{exp.title}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{exp.company}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>{exp.period}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
                {/* Stats */}
                <div ref={statsRef} style={{ background: 'var(--btn-primary-bg)', borderRadius: 12, padding: 24, marginTop: 8 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {[
                      { label: 'Projects Completed', num: 15, suffix: '+' },
                      { label: 'Years Experience', num: 1, suffix: '+' },
                      { label: 'Technologies', num: 20, suffix: '+' },
                      { label: 'Client Satisfaction', num: 100, suffix: '%' },
                    ].map((s) => {
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      const count = useCounter(s.num, statsVisible);
                      return (
                        <div key={s.label} style={{ textAlign: 'center', color: 'var(--btn-primary-text)' }}>
                          <p style={{ fontSize: 28, fontWeight: 800 }}>{count}{s.suffix}</p>
                          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: '80px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="section-badge">{lang === 'fr' ? 'Portfolio' : 'Portfolio'}</span>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 12, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Projets Récents' : 'Featured Projects'}</h2>
              <p style={{ color: 'var(--text-dim)' }}>{lang === 'fr' ? 'Un aperçu de mon travail récent et de mon expertise technique' : 'A showcase of my recent work and technical expertise'}</p>
            </div>
          </Reveal>
          {/* Filters */}
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {categories.map(cat => (
                <button key={cat} className={`filter-btn ${activeFilter === cat ? 'active' : ''}`} onClick={() => setActiveFilter(cat)}>{cat}</button>
              ))}
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <Reveal key={`${p.name}-${activeFilter}`} delay={0.1 * (i % 3)}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 12 }}>{lang === 'fr' ? 'Compétences & Expertise' : 'Skills & Expertise'}</p>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, marginBottom: 12, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Compétences Techniques' : 'Technical Proficiency'}</h2>
              <p style={{ color: 'var(--text-dim)', marginBottom: 24 }}>{lang === 'fr' ? 'Technologies et outils que j\'utilise pour donner vie aux idées' : 'Technologies and tools I use to bring ideas to life'}</p>
            </div>
          </Reveal>
          <div className="responsive-grid-2" style={{ gap: 32 }}>
            {/* Skill grids */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {Object.entries(skills).map(([category, tags], idx) => (
                <Reveal key={category} delay={0.1 * idx}>
                  <div className="card" style={{ height: '100%' }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--foreground)' }}>
                      <span style={{ color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
                        {category === 'Languages' ? <Code size={18} /> : category === 'Database & Storage' ? <Database size={18} /> : category === 'Frontend Development' ? <Layout size={18} /> : <Settings size={18} />}
                      </span>
                      {category}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {tags.map(t => <span key={t} className="skill-tag" style={{ fontSize: 11, padding: '3px 8px', margin: 0 }}>{t}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Proficiency bars */}
            <Reveal delay={0.3}>
              <div ref={barsRef} className="card">
                <p style={{ fontWeight: 700, marginBottom: 20 }}>{lang === 'fr' ? 'Niveaux de Maîtrise' : 'Proficiency Levels'}</p>
                {proficiencies.map(p => (
                  <div key={p.label} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img src={p.icon} alt={p.label} style={{ width: 20, height: 20, objectFit: 'contain' }} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>{p.label}</span>
                      </div>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: barsVisible ? `${p.pct}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TOOLS & SERVICES ── */}
      <section id="tools" style={{ padding: '80px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Tools & Deployment + Dev Stats */}
          <div className="responsive-grid-tools" style={{ gap: 24, marginBottom: 60 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {Object.entries(toolsAndTech).map(([cat, tools], idx) => (
                <Reveal key={cat} delay={0.1 * idx}>
                  <div className="card" style={{ height: '100%' }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--foreground)' }}>
                      <span style={{ color: '#4f46e5', display: 'flex', alignItems: 'center' }}>{cat === 'Tools & Technologies' ? <Wrench size={18} /> : <Rocket size={18} />}</span> {cat}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {tools.map(t => <span key={t} className="skill-tag" style={{ fontSize: 11, padding: '3px 8px', margin: 0 }}>{t}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Dev Stats card */}
            <Reveal delay={0.3}>
              <div style={{ background: 'var(--btn-primary-bg)', borderRadius: 12, padding: 24, minWidth: '100%', maxWidth: 400, color: 'var(--btn-primary-text)', margin: '0 auto' }}>
                <p style={{ fontWeight: 700, marginBottom: 20, fontSize: 15 }}>{lang === 'fr' ? 'Statistiques de Développement' : 'Development Stats'}</p>
                {devStats.map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--nav-border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{s.label}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#4f46e5' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Services */}
          <section id="services">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {services.map((s, idx) => (
                <Reveal key={s.title} delay={0.1 * idx}>
                  <div className="card" style={{ textAlign: 'center', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div style={{ marginBottom: 16, color: '#4f46e5' }}>{s.icon}</div>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--foreground)' }}>{s.title}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="section-badge">{lang === 'fr' ? 'Me Contacter' : 'Get In Touch'}</span>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,2.5rem)', fontWeight: 800, marginBottom: 12, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Travaillons Ensemble' : 'Let\'s Work Together'}</h2>
              <p style={{ color: 'var(--text-dim)' }}>{lang === 'fr' ? 'Vous avez un projet en tête ou souhaitez discuter d\'opportunités ? N\'hésitez pas à me contacter.' : 'Have a project in mind or want to discuss opportunities? I\'d love to hear from you.'}</p>
            </div>
          </Reveal>
          <div className="responsive-grid-2" style={{ gap: 40, marginBottom: 40 }}>
            {/* Contact Info */}
            <Reveal delay={0.2}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Coordonnées' : 'Contact Information'}</h3>
                {[
                   { icon: <Mail size={20} strokeWidth={1.5} />, label: 'Email', val: 'rubendave.guerrier@esih.edu' },
                   { icon: <Phone size={20} strokeWidth={1.5} />, label: 'Mobile', val: '(+509) 48095613' },
                   { icon: <MapPin size={20} strokeWidth={1.5} />, label: 'Location', val: 'Delmas 71, Haïti' },
                   { icon: <Clock size={20} strokeWidth={1.5} />, label: 'Response Time', val: 'Within 24 Hours' },
                 ].map((c, idx) => (
                   <Reveal key={c.label} delay={0.1 * idx}>
                     <div className="card" style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                       <div style={{ color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
                      <div>
                        <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{c.label}</p>
                        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>{c.val}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            {/* Connect + Quick Response */}
            <Reveal delay={0.4}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: 'var(--foreground)' }}>{lang === 'fr' ? 'Me Retrouver' : 'Connect With Me'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {[
                    { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com' },
                    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com' },
                    { icon: <Twitter size={18} />, label: 'Twitter', href: 'https://twitter.com' },
                    { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://instagram.com' },
                  ].map((s, idx) => (
                    <Reveal key={s.label} delay={0.1 * idx}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--foreground)', height: '100%' }}>
                        {s.icon}
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{s.label}</span>
                      </a>
                    </Reveal>
                  ))}
                </div>
                {/* Quick Response */}
                <div style={{ background: 'var(--btn-primary-bg)', borderRadius: 12, padding: 20, color: 'var(--btn-primary-text)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                   <div style={{ color: '#4f46e5', background: 'white', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <MessageCircle size={28} strokeWidth={1.5} />
                   </div>
                  <div>
                    <p style={{ fontWeight: 700, marginBottom: 6 }}>{lang === 'fr' ? 'Réponse Rapide' : 'Quick Response'}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                      {lang === 'fr' 
                        ? 'Je réponds généralement à toutes les demandes sous 24 heures. Pour les urgences, n\'hésitez pas à me contacter par e-mail directement.' 
                        : 'I typically respond to all inquiries within 24 hours. For urgent matters, feel free to reach out via email directly.'}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          {/* Contact Form */}
          <Reveal delay={0.6}>
            <div className="card">
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block', color: 'var(--foreground)' }}>{lang === 'fr' ? 'Nom' : 'Name'}</label>
                  <input className="form-input" placeholder={lang === 'fr' ? 'Votre Nom' : 'Your Name'} />
                </div>
                <div className="responsive-grid-2" style={{ gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block', color: 'var(--foreground)' }}>{lang === 'fr' ? 'Téléphone (optionnel)' : 'Contact Number (optional)'}</label>
                    <input className="form-input" placeholder="+1 (234) 567-890" />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block', color: 'var(--foreground)' }}>{lang === 'fr' ? 'E-mail' : 'Email'}</label>
                    <input className="form-input" type="email" placeholder="vous@exemple.com" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block', color: 'var(--foreground)' }}>{lang === 'fr' ? 'Message' : 'Message'}</label>
                  <textarea className="form-input" placeholder={lang === 'fr' ? 'Écrivez votre message...' : 'Write your message...'} rows={5} />
                </div>
                <button type="submit" className="btn-blue" style={{ alignSelf: 'stretch', justifyContent: 'center', padding: '14px' }}>
                  {lang === 'fr' ? 'Envoyer' : 'Send Message'}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .responsive-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
        }
        .responsive-grid-tools {
          display: grid;
          grid-template-columns: 1fr auto;
        }
        @media (max-width: 1024px) {
          .responsive-grid-2 {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .responsive-grid-tools {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
           section {
             padding-left: 16px !important;
             padding-right: 16px !important;
           }
        }
      `}</style>
    </div>
  );
}
