import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiClock, FiTag, FiUser, FiCheckCircle } from 'react-icons/fi';
import api from '../utils/api';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/slug/${slug}`);
        setProject(res.data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin" />
    </div>
  );
  
  if (!project) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black px-6 text-center">
      <h2 className="text-4xl font-display font-bold mb-4">Project not found</h2>
      <Link to="/our-work" className="text-brand-purple font-bold hover:underline">Back to work</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-20">
      {/* ── Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-purple z-[110] origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* ── Hero Section ── */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/our-work" className="inline-flex items-center gap-2 text-brand-purple font-bold text-sm group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to work
              </Link>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-purple font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1 bg-brand-purple/5 rounded-full border border-brand-purple/10"
            >
              {project.category}
            </motion.span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tighter mb-4"
              >
                {project.title.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 !== 0 ? 'text-brand-purple italic' : ''}>{word} </span>
                ))}
              </motion.h1>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[9px] font-bold uppercase tracking-widest text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Image ── */}
      <section className="px-6 mb-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl relative aspect-[16/9] md:aspect-[21/9]"
          >
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-purple/10 to-brand-green/10 flex items-center justify-center text-brand-purple font-display text-2xl">
                Case Study
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Case Study Content ── */}
      <section className="px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-100 mb-10">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                <FiUser size={12} /> Client
              </p>
              <p className="font-bold text-xs">{project.client?.name || 'Confidential'}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                <FiTag size={12} /> Category
              </p>
              <p className="font-bold text-xs">{project.category}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2">
                <FiClock size={12} /> Duration
              </p>
              <p className="font-bold text-xs">8-12 Weeks</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Live Site</p>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-bold text-xs text-brand-purple flex items-center gap-1 hover:underline">
                  Visit <FiExternalLink size={12} />
                </a>
              ) : (
                <p className="font-bold text-xs text-gray-300">Internal</p>
              )}
            </div>
          </div>

          <div className="space-y-12">
            {/* Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <h2 className="text-xl font-display font-bold">The <span className="text-brand-purple italic">Challenge.</span></h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans">
                  {project.challenge || project.description}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4">
                <h2 className="text-xl font-display font-bold">Our <span className="text-brand-purple italic">Solution.</span></h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans mb-6">
                  {project.solution || "We implemented a modern tech stack and focused on intuitive user experience to deliver a robust and scalable platform."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Custom Architecture', 'UI/UX Design', 'API Integration', 'Cloud Scaling'].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                      <FiCheckCircle className="text-brand-purple size-3.5" />
                      <span className="font-bold text-[10px] uppercase tracking-wider">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-brand-bg rounded-[24px] p-6 md:p-10 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 blur-[100px]" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight">Measurable <span className="text-brand-green italic">Results.</span></h2>
                  <p className="text-white/60 mt-3 text-xs leading-relaxed">
                    Through strategic design and development, we achieved significant improvements across all key performance indicators.
                  </p>
                </div>
                <div className="md:col-span-7 grid grid-cols-2 gap-4">
                   <div className="space-y-0.5">
                     <p className="text-3xl md:text-4xl font-display font-bold text-brand-green">+150%</p>
                     <p className="text-[8px] uppercase font-black tracking-widest text-white/40">Engagement</p>
                   </div>
                   <div className="space-y-0.5">
                     <p className="text-3xl md:text-4xl font-display font-bold text-brand-purple">40%</p>
                     <p className="text-[8px] uppercase font-black tracking-widest text-white/40">Efficiency</p>
                   </div>
                   <div className="col-span-2 text-white/80 italic font-medium leading-relaxed border-t border-white/10 pt-4 mt-1 text-xs">
                     "{project.client?.feedback || "Pixen exceeded our expectations. Their technical expertise is matched only by their design sensibility."}"
                     <p className="not-italic text-brand-green text-[10px] mt-2 font-bold">— {project.client?.name || 'Anonymous'}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mt-12 px-6">
        <div className="container mx-auto max-w-5xl text-center">
           <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-3.5 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-xl">
             START A PROJECT <FiArrowLeft className="rotate-180" />
           </Link>
        </div>
      </section>
    </div>
  );
}
