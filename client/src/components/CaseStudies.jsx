import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import api from '../utils/api';

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/projects?featured=true');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if (loading) return null;
  if (projects.length === 0) return null;

  const featured = projects[0];
  const smallCards = projects.slice(1);

  return (
    <section className="py-20 sm:py-28 md:py-36 bg-white overflow-hidden border-t border-black/5">
      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 lg:px-6">

        {/* ── SECTION HEADER ──────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-10 mb-14 sm:mb-16 lg:mb-20">
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
                className="rounded-[32px] p-8 relative flex flex-col overflow-hidden min-h-[460px] border group"
                style={{ backgroundColor: '#F5F3FF', borderColor: `#6A1DB520` }}
              >
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                   <img src={featured.image} alt={featured.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="flex items-center justify-between mb-5 z-10 relative">
                  <span
                    className="text-[11px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full text-white bg-brand-purple"
                  >
                    {featured.category}
                  </span>
                  <Link to={`/our-work/case-study/${featured.slug}`}
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/8 transition-colors hover:bg-brand-purple hover:text-white">
                    <FiArrowUpRight size={15} strokeWidth={2} />
                  </Link>
                </div>
                <div className="z-10 relative group-hover:text-white transition-colors duration-500">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 group-hover:text-white/60 mb-2">{featured.title}</p>
                  <h3 className="font-sans font-semibold leading-[1.1] tracking-tight mb-3 transition-colors" style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>
                    {featured.title}
                  </h3>
                  <p className="text-[14px] text-black/55 group-hover:text-white/70 leading-[1.65] font-sans max-w-[80%] line-clamp-3 transition-colors">{featured.description}</p>
                </div>
                <div className="absolute -bottom-10 -right-8 w-[58%] origin-bottom-right rotate-[-5deg] z-0 pointer-events-none group-hover:opacity-0 transition-opacity">
                  <svg viewBox="0 0 500 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="30" width="500" height="340" rx="28" fill="#6A1DB5" opacity="0.05" />
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
            <div ref={trackRef} className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {smallCards.map((sc, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <Link
                    to={`/our-work/case-study/${sc.slug}`}
                    className="rounded-[28px] p-6 min-w-[252px] max-w-[252px] min-h-[280px] relative overflow-hidden flex flex-col justify-between group shrink-0 border border-black/5 bg-[#F8F7FF] hover:border-brand-purple/20 transition-all"
                  >
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <img src={sc.image} alt={sc.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="z-10 relative group-hover:text-white transition-colors duration-300">
                      <span
                        className="inline-block text-[10px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-4 border bg-brand-purple/5 text-brand-purple border-brand-purple/10 group-hover:bg-white group-hover:text-brand-purple group-hover:border-white transition-all"
                      >
                        {sc.category}
                      </span>
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1.5 text-black/50 group-hover:text-white/60">{sc.title}</p>
                      <h4 className="font-sans font-semibold leading-[1.2] tracking-tight text-[17px]">{sc.title}</h4>
                    </div>
                    <div className="z-10 relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-purple group-hover:text-brand-green transition-colors">
                      View project <FiArrowUpRight size={13} strokeWidth={2.5} />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

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
          <Reveal>
            <Link
              to={`/our-work/case-study/${featured.slug}`}
              className="rounded-[28px] p-6 sm:p-8 relative flex flex-col overflow-hidden min-h-[360px] sm:min-h-[420px] border bg-[#F5F3FF]"
              style={{ borderColor: `#6A1DB520` }}
            >
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] px-3 py-1.5 rounded-full text-white bg-brand-purple">
                  {featured.category}
                </span>
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/8">
                  <FiArrowUpRight className="text-[#6A1DB5]" size={14} strokeWidth={2} />
                </div>
              </div>
              <div className="z-10 relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/40 mb-1.5">{featured.title}</p>
                <h3 className="font-sans font-semibold text-black leading-[1.1] tracking-tight mb-3 text-[22px] sm:text-[26px]">{featured.title}</h3>
                <p className="text-[14px] text-black/55 leading-[1.65] font-sans max-w-[75%] sm:max-w-[60%] line-clamp-4">{featured.description}</p>
              </div>
              <div className="absolute -bottom-8 -right-6 w-[48%] sm:w-[44%] origin-bottom-right rotate-[-5deg] z-0">
                <div className="rounded-[18px] overflow-hidden shadow-2xl border-[4px] border-white/60">
                  <img src={featured.image} alt={featured.title} className="w-full h-auto object-cover object-top aspect-[4/5]" />
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smallCards.map((sc, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <Link
                  to={`/our-work/case-study/${sc.slug}`}
                  className="rounded-[24px] p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between group min-h-[220px] border border-black/5 bg-[#F8F7FF]"
                >
                  <div className="z-10 relative">
                    <span
                      className="inline-block text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3 border bg-brand-purple/5 text-brand-purple border-brand-purple/10"
                    >
                      {sc.category}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1 opacity-50 text-black">{sc.title}</p>
                    <h4 className="font-sans font-semibold leading-[1.2] tracking-tight text-[16px] text-black">{sc.title}</h4>
                  </div>
                  <div className="z-10 relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-purple">
                    View project <FiArrowUpRight size={12} strokeWidth={2.5} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[50%] h-[50%] opacity-10 mix-blend-multiply rounded-tl-[24px] overflow-hidden z-0">
                    <img src={sc.image} className="w-full h-full object-cover object-top" alt={sc.title} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

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
