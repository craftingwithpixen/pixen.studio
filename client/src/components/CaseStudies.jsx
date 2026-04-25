import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import imgReferme   from '../assets/referme.png';
import imgCollex    from '../assets/collex.png';
import imgCodeOrbit from '../assets/codeorbit.png';
import imgDabbaWala from '../assets/dabbawala.png';
import imgFitFind   from '../assets/fitfind.png';

const CASES = [
  {
    project: 'Referme',
    title: 'Connecting Students with Better Study Resources',
    tag: 'EdTech · Platform',
    desc: 'An educational platform delivering high-quality engineering notes and study materials to thousands of students.',
    img: imgReferme,
    link: 'https://referme.tech/',
    bg: '#F5F3FF',
    accent: '#6A1DB5',
    textColor: '#000',
  },
  {
    project: 'Collex',
    title: 'A Campus Marketplace for Students',
    tag: 'Marketplace · MERN',
    desc: 'A campus-focused peer-to-peer marketplace where students list, discover, and trade second-hand goods securely.',
    img: imgCollex,
    link: 'https://www.collex.app/',
    bg: '#F5F3FF',
    accent: '#6A1DB5',
    textColor: '#000',
  },
  {
    project: 'Code Orbit',
    title: 'Simplifying Final-Year Engineering Projects',
    tag: 'EdTech · Platform',
    desc: 'A curated hub for final-year engineering projects, bridging the gap between academic theory and implementation.',
    img: imgCodeOrbit,
    link: 'https://codeorbit.info/',
    bg: '#6A1DB5',
    accent: '#C8F139',
    textColor: '#fff',
  },
  {
    project: 'Dabba Wala',
    title: 'Home-Style Tiffin Services, Digitized',
    tag: 'Food Tech · Next.js',
    desc: 'An online tiffin subscription platform connecting home cooks with hungry customers.',
    img: imgDabbaWala,
    link: 'https://online-dabba-service-8see.vercel.app/',
    bg: '#C8F139',
    accent: '#000',
    textColor: '#000',
  },
  {
    project: 'FitFind',
    title: 'Fitness Discovery Made Effortless',
    tag: 'HealthTech · MERN',
    desc: 'A fitness discovery platform helping users find, book, and manage gym memberships effortlessly.',
    img: imgFitFind,
    link: 'https://gym-two-olive.vercel.app/',
    bg: '#0D0D0D',
    accent: '#C8F139',
    textColor: '#fff',
  },
];

/* ── scroll-reveal wrapper ─────────────────────────────────── */
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function CaseStudies() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const featured = CASES[0];
  const smallCards = CASES.slice(1);

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white overflow-hidden border-t border-black/5">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 lg:px-6">

        {/* ── SECTION HEADER ──────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-10 mb-14 sm:mb-16 lg:mb-20">
          {/* Left: label + heading */}
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black/30 mb-4">
              <span className="w-4 h-px bg-black/30" />
              Our Work
            </span>
            <h2 className="section-heading text-black">
              Explore Our{' '}
              <span className="font-semibold text-[#6A1DB5]">Work</span>
            </h2>
          </div>

          {/* Right: tagline — pushed to far right */}
          <p className="text-[15px] sm:text-[16px] text-black/50 leading-[1.7] font-sans sm:max-w-[340px] sm:text-right">
            From edtech to marketplaces — every product we ship is built to perform, scale, and leave a lasting impression.
          </p>
        </Reveal>

        {/* ── DESKTOP LAYOUT ──────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-12 gap-x-10 gap-y-14">

          {/* Left: featured card + controls */}
          <div className="col-span-5 flex flex-col gap-8">
            <Reveal>
              <div
                className="rounded-[32px] p-8 relative flex flex-col overflow-hidden min-h-[460px] border"
                style={{ background: featured.bg, borderColor: `${featured.accent}20` }}
              >
                <div className="flex items-center justify-between mb-5 z-10 relative">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: featured.accent }}
                  >
                    {featured.tag}
                  </span>
                  <a href={featured.link} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/8 transition-colors hover:bg-white/90">
                    <FiArrowUpRight className="text-[#6A1DB5]" size={15} strokeWidth={2} />
                  </a>
                </div>
                <div className="z-10 relative">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 mb-2">{featured.project}</p>
                  <h3 className="font-sans font-semibold text-black leading-[1.1] tracking-tight mb-3" style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>
                    {featured.title}
                  </h3>
                  <p className="text-[14px] text-black/55 leading-[1.65] font-sans max-w-[80%]">{featured.desc}</p>
                </div>
                <div className="absolute -bottom-10 -right-8 w-[58%] origin-bottom-right rotate-[-5deg] z-0 pointer-events-none">
                  <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="featGrad" x1="0" x2="1">
                        <stop offset="0%" stopColor={featured.accent} stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="30" width="500" height="340" rx="28" fill="url(#featGrad)" opacity="0.95" />
                    <g opacity="0.12" fill="#fff">
                      <circle cx="420" cy="320" r="90" />
                      <circle cx="80" cy="60" r="48" />
                    </g>
                    <path d="M40,320 C140,220 260,380 420,300 L460,320 L460,380 L40,380 Z" fill="#ffffff08" />
                  </svg>
                </div>
              </div>
            </Reveal>

            {/* Scroll controls */}
            <Reveal delay={0.1} className="flex items-center gap-3">
              <button onClick={() => scroll('left')} className="w-11 h-11 rounded-full bg-[#F5F3FF] hover:bg-[#EDE8FF] transition-colors flex items-center justify-center text-[#6A1DB5] border border-[#6A1DB5]/15">
                <FiArrowLeft size={17} strokeWidth={1.8} />
              </button>
              <button onClick={() => scroll('right')} className="w-11 h-11 rounded-full bg-[#6A1DB5] hover:bg-[#5512A0] transition-colors flex items-center justify-center text-white" style={{ boxShadow: '0 4px 14px rgba(106,29,181,0.3)' }}>
                <FiArrowRight size={17} strokeWidth={1.8} />
              </button>
             
            </Reveal>
          </div>

          {/* Right: scrollable small cards + CTA */}
          <div className="col-span-7 flex flex-col gap-8 pl-4">
            {/* Small cards */}
            <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {smallCards.map((sc, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className="rounded-[28px] p-6 min-w-[252px] max-w-[252px] min-h-[280px] relative overflow-hidden flex flex-col justify-between group shrink-0"
                    style={{ background: sc.bg }}
                  >
                    <div className="z-10 relative">
                      <span
                        className="inline-block text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4 border"
                        style={{
                          backgroundColor: `${sc.accent}18`,
                          color: sc.accent,
                          borderColor: `${sc.accent}35`,
                        }}
                      >
                        {sc.tag}
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1.5 opacity-50" style={{ color: sc.textColor }}>{sc.project}</p>
                      <h4 className="font-sans font-semibold leading-[1.2] tracking-tight text-[17px]" style={{ color: sc.textColor }}>{sc.title}</h4>
                    </div>
                    <a href={sc.link} target="_blank" rel="noreferrer"
                      className="z-10 relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold"
                      style={{ color: sc.accent }}>
                      View project <FiArrowUpRight size={13} strokeWidth={2.5} />
                    </a>
                    <div className="absolute bottom-0 right-0 w-[52%] h-[52%] opacity-25 mix-blend-multiply rounded-tl-[28px] overflow-hidden z-0 pointer-events-none">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                          <linearGradient id={`g-small-${i}`} x1="0" x2="1">
                            <stop offset="0%" stopColor={sc.accent} stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
                          </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="200" height="200" fill={`url(#g-small-${i})`} />
                        <g transform="translate(20,20) rotate(-12)">
                          <ellipse cx="80" cy="80" rx="70" ry="40" fill="#ffffff10" />
                          <circle cx="150" cy="40" r="28" fill="#ffffff06" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bottom CTA */}
            <Reveal delay={0.15} className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
              <p className="text-[14px] text-black/45 leading-[1.7] font-sans max-w-[360px]">
                Discover how we turn real-world problems into polished, high-impact digital products — on time, every time.
              </p>
              <Link to="/our-work"
                className="inline-flex items-center gap-2 bg-[#6A1DB5] hover:bg-[#5512A0] text-white text-[13px] font-bold px-7 py-4 rounded-full transition-all whitespace-nowrap shrink-0"
                style={{ boxShadow: '0 6px 20px rgba(106,29,181,0.25)' }}>
                All case studies <FiArrowUpRight size={14} strokeWidth={2.2} />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ── MOBILE / TABLET LAYOUT ──────────────────────── */}
        <div className="lg:hidden flex flex-col gap-10">

          {/* Featured card */}
          <Reveal>
            <div
              className="rounded-[28px] p-6 sm:p-8 relative flex flex-col overflow-hidden min-h-[360px] sm:min-h-[420px] border"
              style={{ background: featured.bg, borderColor: `${featured.accent}20` }}
            >
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: featured.accent }}>
                  {featured.tag}
                </span>
                <a href={featured.link} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/8">
                  <FiArrowUpRight className="text-[#6A1DB5]" size={14} strokeWidth={2} />
                </a>
              </div>
              <div className="z-10 relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 mb-1.5">{featured.project}</p>
                <h3 className="font-sans font-semibold text-black leading-[1.1] tracking-tight mb-3 text-[22px] sm:text-[26px]">{featured.title}</h3>
                <p className="text-[14px] text-black/55 leading-[1.65] font-sans max-w-[75%] sm:max-w-[60%]">{featured.desc}</p>
              </div>
              <div className="absolute -bottom-8 -right-6 w-[48%] sm:w-[44%] origin-bottom-right rotate-[-5deg] z-0">
                <div className="rounded-[18px] overflow-hidden shadow-2xl border-[4px] border-white/60">
                  <img src={featured.img} alt={featured.project} className="w-full h-auto object-cover object-top aspect-[4/5]" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile small cards — vertical stacked 2-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smallCards.map((sc, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  className="rounded-[24px] p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between group min-h-[220px]"
                  style={{ background: sc.bg }}
                >
                  <div className="z-10 relative">
                    <span
                      className="inline-block text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3 border"
                      style={{ backgroundColor: `${sc.accent}18`, color: sc.accent, borderColor: `${sc.accent}35` }}
                    >
                      {sc.tag}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1 opacity-50" style={{ color: sc.textColor }}>{sc.project}</p>
                    <h4 className="font-sans font-semibold leading-[1.2] tracking-tight text-[16px]" style={{ color: sc.textColor }}>{sc.title}</h4>
                  </div>
                  <a href={sc.link} target="_blank" rel="noreferrer"
                    className="z-10 relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold"
                    style={{ color: sc.accent }}>
                    View project <FiArrowUpRight size={12} strokeWidth={2.5} />
                  </a>
                  <div className="absolute bottom-0 right-0 w-[50%] h-[50%] opacity-20 mix-blend-multiply rounded-tl-[24px] overflow-hidden z-0">
                    <img src={sc.img} className="w-full h-full object-cover object-top" alt={sc.project} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile CTA */}
          <Reveal className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <p className="text-[14px] text-black/45 leading-[1.7] font-sans">
              Discover how we turn real-world problems into polished digital products.
            </p>
            <Link to="/our-work"
              className="inline-flex items-center justify-center gap-2 bg-[#6A1DB5] hover:bg-[#5512A0] text-white text-[13px] font-bold px-7 py-4 rounded-full transition-all whitespace-nowrap"
              style={{ boxShadow: '0 6px 20px rgba(106,29,181,0.25)' }}>
              All case studies <FiArrowUpRight size={14} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
