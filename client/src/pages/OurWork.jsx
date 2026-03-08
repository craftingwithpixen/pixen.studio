import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiLayers, FiBox, FiUsers } from 'react-icons/fi';
import projectData from '../../Project_Information.json';

import imgReferme     from '../assets/referme.png';
import imgCollex      from '../assets/collex.png';
import imgCodeOrbit   from '../assets/codeorbit.png';
import imgDabbaWala   from '../assets/dabbawala.png';
import imgEggro       from '../assets/eggro.png';
import imgFitFind     from '../assets/fitfind.png';
import imgFashionC    from '../assets/fashionc.png';

const PROJECT_IMAGES = {
  'Referme':     imgReferme,
  'Collex':      imgCollex,
  'Code Orbit':  imgCodeOrbit,
  'Dabba Wala':  imgDabbaWala,
  'Eggro':       imgEggro,
  'FitFind':     imgFitFind,
  'Fashion C':   imgFashionC,
};

/* ── helpers ─────────────────────────────────────── */
// First sentence only for short description
function shortDesc(text) {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text.slice(0, 90) + '…';
}

const ACCENTS = [
  '#6B35D9', '#7B3FE4', '#059669', '#ea580c',
  '#d97706', '#db2777', '#0ea5e9', '#8b5cf6',
  '#10b981', '#f59e0b', '#ef4444', '#6366f1',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── ProjectCard ─────────────────────────────────── */
function ProjectCard({ project, accent, showClient, index, featured }) {
  const hasLink = project.link && project.link !== '#';
  const [imgError, setImgError] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  const imgSrc = PROJECT_IMAGES[project.title];

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${featured ? 'md:col-span-2' : ''}`}
      style={{ aspectRatio: featured ? '16/7' : '4/3' }}
    >
      {/* ── Screenshot image ── */}
      {imgSrc && !imgError ? (
        <img
          src={imgSrc}
          alt={project.title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        /* Placeholder grid pattern */
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${accent}22 0%, transparent 60%), #0e0e0e`,
            backgroundImage: `radial-gradient(ellipse at 30% 40%, ${accent}22 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-black text-[80px] md:text-[120px] leading-none select-none opacity-[0.06] tracking-tighter"
              style={{ color: accent }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to top, ${accent}60 0%, black/60 40%, transparent 100%)` }}
      />

      {/* ── Top row: index number + live badge ── */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
        <span
          className="font-display font-black text-[11px] tracking-widest opacity-50"
          style={{ color: accent }}
        >
          {num}
        </span>
        {hasLink && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Live</span>
          </span>
        )}
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 flex flex-col gap-1">
        {showClient && project.client_name && (
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1 translate-y-0 group-hover:-translate-y-1 transition-transform duration-400"
            style={{ color: accent }}
          >
            {project.client_name}
          </span>
        )}

        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display font-black text-white uppercase tracking-tight leading-tight text-xl md:text-2xl">
            {project.title}
          </h3>
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit ${project.title}`}
              className="shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              style={{ background: accent }}
            >
              <FiArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* Description — slides up on hover */}
        <p className="text-white/60 text-[13px] leading-relaxed max-w-md overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500 ease-out">
          {shortDesc(project.description)}
        </p>
      </div>

      {/* Accent border on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}50` }}
      />
    </motion.div>
  );
}

/* ── Tabs ────────────────────────────────────────── */
const TABS = [
  { key: 'products',        label: 'Products',     icon: FiLayers, accent: '#6B35D9' },
  { key: 'poc_projects',    label: 'POC',          icon: FiBox,    accent: '#059669' },
  { key: 'client_projects', label: 'Client Work',  icon: FiUsers,  accent: '#ea580c' },
];

export default function OurWork() {
  const [activeTab, setActiveTab] = useState('products');
  const tab = TABS.find((t) => t.key === activeTab);
  const projects = projectData[activeTab];
  const tabBarRef = useRef(null);
  const sentinelRef = useRef(null);

  function handleTabClick(key) {
    setActiveTab(key);
    if (sentinelRef.current) {
      const top = sentinelRef.current.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <div className="relative min-h-screen">

      {/* Ambient blobs */}
      <div className="fixed top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-brand-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 pt-32 pb-24 px-6 max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
            <span className="text-[10px] font-display uppercase tracking-widest font-semibold">Our Work</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-6 leading-none">
            Selected<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-brand-purple to-brand-violet animate-gradient-x">
              Projects
            </span>
          </h1>
          <p className="text-brand-muted text-lg max-w-xl leading-relaxed">
            A curated showcase of products, experiments, and client work that define what Pixen builds.
          </p>
        </motion.div>

        {/* Sentinel – scroll target for tab clicks */}
        <div ref={sentinelRef} />

        {/* ── Tabs (sticky) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          ref={tabBarRef}
          className="sticky top-[56px] z-40 -mx-6 px-6 py-3 mb-12"
          style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {TABS.map(({ key, label, icon: Icon, accent }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabClick(key)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0"
                  style={{
                    background: isActive ? `${accent}18` : 'transparent',
                    border: `1px solid ${isActive ? accent + '55' : 'rgba(255,255,255,0.07)'}`,
                    color: isActive ? accent : '#666',
                    boxShadow: isActive ? `0 0 24px ${accent}20` : 'none',
                  }}
                >
                  <Icon size={13} />
                  {label}
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      background: isActive ? `${accent}25` : 'rgba(255,255,255,0.06)',
                      color: isActive ? accent : '#444',
                    }}
                  >
                    {projectData[key].length}
                  </span>
                </button>
              );
            })}

            {/* Trailing line */}
            <div className="hidden sm:block flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${tab.accent}40, transparent)` }} />
          </div>
        </motion.div>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                accent={ACCENTS[i % ACCENTS.length]}
                showClient={activeTab === 'client_projects'}
                index={i}
                featured={i === 0 && projects.length > 2}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 rounded-3xl border border-white/[.06] bg-[#111] p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-violet/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-2">
              Have a project in mind?
            </h2>
            <p className="text-brand-muted text-sm max-w-md">
              Let's build something remarkable together. Tell us about your idea.
            </p>
          </div>
          <a
            href="#contact"
            className="relative z-10 shrink-0 flex items-center gap-2 bg-brand-purple hover:bg-brand-violet text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_#6B35D960]"
          >
            Start Your Project
            <FiArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
