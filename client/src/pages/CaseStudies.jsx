import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import api from '../utils/api';

const categoryOrder = ['All', 'MVP', 'Our Products', 'Client Project'];
const fallbackGradients = [
  'from-[#C8F139] to-[#6A1DB5]',
  'from-[#A178FA] to-[#38E8FF]',
  'from-[#FF8A65] to-[#A178FA]',
  'from-[#6A1DB5] to-[#C8F139]'
];

export default function CaseStudies() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => (
    activeCategory === 'All' || project.category === activeCategory
  ));

  return (
    <div className="min-h-screen bg-white text-black font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-8%] right-[-6%] w-[420px] h-[420px] bg-brand-purple/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-[18%] left-[-8%] w-[520px] h-[520px] bg-brand-green/5 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
       
        <section className="pt-24 sm:pt-32 md:pt-40 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
           

              <h1
                className="font-sans font-normal leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                Transforming{' '}
                <span className="font-semibold text-[#6A1DB5]">Inspiration</span>
                <br />
                into Innovation
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 text-[14px] sm:text-[15px] leading-[1.7] text-black/50 font-sans font-light lg:pt-3 max-w-[420px] lg:justify-self-end"
            >
              Every project starts with strategy and ends with measurable outcomes. We blend clean design, strong engineering, and practical business thinking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 lg:row-start-2"
            >
              <h3 className="font-sans font-semibold text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.03em]">
                Unleash Your Creativity
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-black/50 font-sans font-normal max-w-[240px]">
                We turn abstract ideas into polished interfaces and products that feel clear, modern, and memorable.
              </p>
              <div className="mt-5">
                <Link
                  to="/our-work"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6A1DB5] hover:gap-2.5 transition-all duration-200 font-sans"
                >
                  View case collection
                  <FiArrowUpRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 lg:row-start-2"
            >
              <div className="rounded-[20px] overflow-hidden bg-[#efefef] border border-black/5">
                <svg viewBox="0 0 860 440" className="w-full h-[240px] sm:h-[290px] md:h-[330px]">
                  <rect x="0" y="0" width="860" height="440" fill="#ececec" />
                  <g fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.45">
                    <path d="M0 40 L860 360" />
                    <path d="M0 180 L760 0" />
                    <path d="M90 440 L860 80" />
                  </g>
                  <g transform="translate(110,70)">
                    <path d="M130,260 C40,160 20,80 110,50 C180,30 220,70 230,140 C240,190 300,220 340,170 C390,100 500,80 560,150 C620,220 550,290 470,280 C380,270 310,320 230,330 C180,336 156,300 130,260 Z" fill="#C8F139" />
                    <path d="M210,230 C190,190 200,150 245,145 C285,141 308,168 300,200 C293,229 258,246 230,246 C221,246 215,241 210,230 Z" fill="#A178FA" />
                    <path d="M230,210 C220,190 228,172 248,170 C267,168 279,182 276,200 C272,218 258,228 242,228 C236,228 232,222 230,210 Z" fill="#6A1DB5" />
                  </g>
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 lg:row-start-2"
            >
              <div className="rounded-[16px] overflow-hidden bg-[#1b1b1b]">
                <svg viewBox="0 0 260 180" className="w-full h-[170px] sm:h-[190px]">
                  <defs>
                    <linearGradient id="stackGlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C8F139" />
                      <stop offset="100%" stopColor="#6A1DB5" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="260" height="180" fill="#151515" />
                  <ellipse cx="125" cy="52" rx="74" ry="24" fill="url(#stackGlow)" />
                  <ellipse cx="130" cy="86" rx="74" ry="24" fill="url(#stackGlow)" opacity="0.85" />
                  <ellipse cx="133" cy="120" rx="74" ry="24" fill="url(#stackGlow)" opacity="0.65" />
                </svg>
              </div>
              <h4
                className="mt-4 font-sans font-light leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
              >
                Your Innovative<br />
                Solutions
              </h4>
            </motion.div>
          </div>
        </section>

        <section className="pb-32 sm:pb-48">
          {/* ── CATEGORY FILTERS ────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-20 sm:mb-28">
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-8 py-3.5 md:px-11 md:py-4.5 rounded-full text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeCategory === category 
                    ? 'text-white' 
                    : 'text-black/30 hover:text-black border border-black/[0.03] hover:border-black/10 hover:bg-black/[0.01]'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="active-cat"
                    className="absolute inset-0 bg-brand-purple rounded-full -z-10 shadow-[0_15px_40px_-10px_rgba(106,29,181,0.5)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {category === 'All' ? 'All' : category.replace('Client Project', 'Clients').replace('Our Products', 'Products')}
                </span>
              </button>
            ))}
          </div>

          {/* ── STUDIO GALLERY GRID ──────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 sm:gap-y-32">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-40">
                 <div className="w-12 h-12 border-2 border-brand-purple/10 border-t-brand-purple rounded-full animate-spin" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-40"
              >
                <p className="text-black/20 font-sans text-5xl font-semibold italic tracking-tight">
                  No {activeCategory.toLowerCase()} works to show.
                </p>
              </motion.div>
            ) : (
              filteredProjects.map((project, idx) => {
                // Staggered effect: every second item is shifted down on desktop
                const isEven = idx % 2 === 1;

                return (
                  <motion.div
                    key={project._id || project.slug || idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: (idx % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`group ${isEven ? 'md:mt-32' : ''}`}
                  >
                    <Link
                      to={`/our-work/case-study/${project.slug}`}
                      className="group block rounded-[30px] border border-black/5 bg-white p-4 sm:p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_64px_rgba(0,0,0,0.1)] hover:border-black/10"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-[26px] bg-black/5 aspect-[4/5] sm:aspect-[16/11] ring-1 ring-black/5">
                        <img
                          src={project.thumbnail || project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                        />

                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,rgba(0,0,0,0.68)_100%)] opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C8F139]" />
                          Project {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
                          <FiArrowUpRight size={22} strokeWidth={2.2} />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <div className="max-w-[88%] space-y-3">
                            <span className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                              {project.category}
                            </span>
                            <h3 className="font-sans text-[28px] sm:text-[34px] font-semibold leading-[0.94] tracking-[-0.05em] text-white transition-transform duration-500 group-hover:translate-y-[-2px]">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="px-1 pt-7 sm:pt-8">
                        <div className="mb-5 flex items-center gap-3 text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-black/35">
                          <span>Case Study</span>
                          <span className="h-px flex-1 bg-black/10" />
                        </div>

                        <p className="max-w-[92%] text-[15px] sm:text-[16px] leading-[1.9] tracking-[-0.01em] text-black/58 font-sans font-normal line-clamp-3">
                          {project.shortDescription || project.description}
                        </p>

                        <div className="mt-7 flex items-center gap-3 text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-brand-purple">
                          <span className="h-px w-8 bg-brand-purple/30" />
                          Explore case <FiArrowUpRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
