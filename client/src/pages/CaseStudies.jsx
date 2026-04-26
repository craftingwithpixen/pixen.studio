import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import CTA from '../components/CTA';
import api from '../utils/api';

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

  const filteredProjects = projects.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-10">
        {/* ── Hero ── */}
        <section className="mt-20 md:mt-24 mb-16 md:mb-20">
          <div className="flex flex-col items-center text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
              </span>
              Our Creative Portfolio
            </motion.div>

            {/* H1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.95] tracking-tighter text-black mb-8">
                Transforming <span className="text-brand-purple italic">Inspiration</span> <br />
                into Innovation
              </h1>
            </motion.div>

            {/* Sub copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg lg:text-xl text-black/60 max-w-xl mx-auto font-sans font-medium"
            >
              Every project starts with strategy and ends with measurable outcomes. 
              We blend clean design, strong engineering, and practical business thinking.
            </motion.p>
          </div>
        </section>

        {/* ── Showcase rows ── */}
        <section className="pb-32 md:pb-48">
          {/* Category Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-16 md:mb-28">
            {['All', 'MVP', 'Products', 'Clients'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === 'Products' ? 'Our Products' : cat === 'Clients' ? 'Client Project' : cat)}
                className={`px-4 py-2 md:px-8 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all relative ${
                  activeCategory === (cat === 'Products' ? 'Our Products' : cat === 'Clients' ? 'Client Project' : cat)
                  ? 'text-white' 
                  : 'text-black/40 hover:text-black hover:bg-gray-50'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="active-cat"
                    className="absolute inset-0 bg-brand-purple rounded-full -z-10 shadow-[0_10px_20px_-5px_rgba(106,29,181,0.3)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-20 md:gap-32">
            {loading ? (
              <div className="text-center py-20 text-gray-500 font-medium">Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-black/30 font-display text-2xl font-bold italic">No {activeCategory.toLowerCase()} found yet.</p>
              </motion.div>
            ) : (
              filteredProjects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 md:gap-16"
                >
                  {/* Text side */}
                  <Link to={`/our-work/case-study/${project.slug}`} className="lg:col-span-4 block group">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xl md:text-2xl font-display font-bold text-black/10">0{idx + 1}</span>
                      <div className="h-px w-8 bg-black/10" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-purple font-bold">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3
                      className="font-display font-bold leading-[0.95] tracking-tighter mb-6 group-hover:text-brand-purple transition-colors duration-300 flex items-center gap-4"
                      style={{ fontSize: 'clamp(32px, 4.5vw, 64px)' }}
                    >
                      {project.title}
                      <FiArrowUpRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-purple" size={40} />
                    </h3>
                    
                    <p className="text-base md:text-lg text-black/50 font-sans font-medium max-w-sm leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-full bg-brand-light text-[10px] font-bold uppercase tracking-widest text-black/40 border border-black/[0.03]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>

                  {/* Pill card */}
                  <Link to={`/our-work/case-study/${project.slug}`} className="lg:col-span-8 block group/pill">
                    <div className="relative h-[300px] md:h-[450px] w-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover/pill:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700">
                      <div className="relative h-full w-full overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/pill:scale-110"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-green/10 opacity-10 group-hover/pill:opacity-20 transition-opacity duration-700`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/pill:opacity-80 transition-opacity duration-700" />
                        <div className="absolute inset-0 border border-black/5 rounded-[40px] md:rounded-[60px] pointer-events-none" />
                        <div className="absolute inset-0 flex items-end justify-between p-8 md:p-12 lg:p-16">
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-3">
                              {project.category}
                            </p>
                            <h4
                              className="font-display font-bold tracking-tight leading-[1] text-white"
                              style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
                            >
                              {project.title}
                            </h4>
                          </motion.div>
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 translate-y-10 group-hover/pill:opacity-100 group-hover/pill:translate-y-0 group-hover/pill:bg-brand-purple group-hover/pill:border-brand-purple transition-all duration-500 shrink-0">
                            <FiArrowUpRight size={32} strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </section>

      </div>
      <CTA />
    </div>
  );
}
