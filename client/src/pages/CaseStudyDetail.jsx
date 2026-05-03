import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiCheckCircle, FiCpu, FiLayers, FiTrendingUp, FiZap, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../utils/api';

function getFallbackCopy(project) {
  return {
    title: project?.title || 'Case Study',
    subtitle:
      project?.category === 'MVP'
        ? 'A focused product experience designed to move from idea to launch.'
        : project?.category === 'Our Products'
          ? 'A polished product story with a premium visual language.'
          : 'A client-focused digital experience with strong structure and clarity.',
  };
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

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

  const handleNext = (e) => {
    e.stopPropagation();
    if (project?.images) {
        setActiveIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (project?.images) {
        setActiveIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const content = useMemo(() => getFallbackCopy(project), [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6A1DB5]/20 border-t-[#6A1DB5] rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] flex flex-col items-center justify-center text-black px-6 text-center">
        <h2 className="text-4xl font-semibold mb-4 tracking-[-0.03em]">Project not found</h2>
        <Link to="/our-work" className="text-[#6A1DB5] font-semibold hover:opacity-70 transition-opacity">
          Back to work
        </Link>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] pt-28 sm:pt-36 md:pt-44 pb-10 sm:pb-14 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-[1000px] mx-auto bg-white rounded-[24px] border border-[#6A1DB5]/15 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(106,29,181,0.06)]"
      >
        {/* Header Navigation */}
        <div className="flex items-center justify-end mb-10">
          <Link to="/our-work" className="flex items-center gap-2 text-[#6A1DB5] font-sans font-bold text-[13px] uppercase tracking-widest hover:gap-3 transition-all">
            <FiArrowLeft /> Back to Work
          </Link>
        </div>

        <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A1DB5]/5 border border-[#6A1DB5]/10 text-[#6A1DB5] text-[10px] font-bold uppercase tracking-wider mb-4">
                {project.category} • {project.status}
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="text-[40px] sm:text-[64px] md:text-[76px] font-sans font-semibold tracking-[-0.03em] leading-[1.05] text-[#0D0D0D] max-w-[900px]"
                >
                    {project.title}
                </motion.h1>
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 py-3 px-8 bg-[#6A1DB5] text-white rounded-[12px] text-[14px] font-bold hover:bg-[#6A1DB5]/90 transition-all self-start md:mb-2">
                        <FiExternalLink size={16} /> Visit Website
                    </a>
                )}
            </div>
            <p className="text-[18px] sm:text-[22px] text-black/60 leading-relaxed font-light max-w-[700px] mt-6">
                {project.shortDescription}
            </p>
        </div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-[16px] overflow-hidden border border-[#6A1DB5]/10 bg-[#F5F3FF] mb-12 shadow-xl"
        >
          {project.showcaseImage || project.thumbnail || project.image ? (
            <img
              src={project.showcaseImage || project.thumbnail || project.image}
              alt={project.title}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          ) : (
             <div className="aspect-video bg-gradient-to-br from-[#6A1DB5] to-[#A178FA] flex items-center justify-center text-white/20 font-bold text-6xl">PIXEN</div>
          )}
        </motion.div>

        {/* Project Overview */}
        <div className="space-y-6 mb-16">
            <h2 className="text-[28px] font-semibold tracking-tight text-black flex items-center gap-3">
                <span className="w-1 h-8 bg-[#6A1DB5] rounded-full"></span>
                Project Overview
            </h2>
            <div className="text-[16px] text-black/70 leading-[1.8] space-y-4">
                {project.detailedDescription?.split('\n').map((p, i) => <p key={i}>{p}</p>) || <p>{project.description}</p>}
            </div>
        </div>

        {/* Tech Stack & Core Features - Stacked Clean Layout */}
        <div className="space-y-16 mb-16">
            {/* Tech Stack */}
            <div className="space-y-6">
                <h3 className="text-[20px] font-bold text-black uppercase tracking-widest">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                    {project.techStack?.map(tech => (
                        <span key={tech} className="px-4 py-2.5 bg-black text-white rounded-full text-[13px] font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Core Features */}
            <div className="space-y-6">
                <h3 className="text-[20px] font-bold text-black uppercase tracking-widest">Core Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {project.features?.map(feature => (
                        <li key={feature} className="text-[15px] text-black/70 flex items-start gap-3 pb-4 border-b border-black/10 md:border-0">
                            <div className="w-2 h-2 rounded-full bg-[#6A1DB5] mt-2.5 shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>


        {/* Case Study Content (if exists) */}
        {cs && (
            <div className="space-y-24 mt-20 pt-20 border-t border-[#6A1DB5]/10">
                {/* Problem & Objectives — The Studio Brief */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20">
                    {/* Left Column: The Narrative Challenge */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="text-brand-purple font-sans font-bold text-xl">01</span>
                                <div className="h-px w-12 bg-brand-purple/20" />
                                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-black/40">The Challenge</span>
                            </div>
                            <h3 className="text-4xl sm:text-5xl font-sans font-bold text-black leading-[1.05] tracking-tight">
                                Solving complex problems with <span className="text-brand-purple italic">simple solutions.</span>
                            </h3>
                            <p className="text-[18px] sm:text-[20px] text-black/70 leading-relaxed font-sans font-light italic border-l-2 border-brand-purple/10 pl-8 py-2">
                                "{cs.problemStatement}"
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {cs.challenges?.map((item, i) => (
                                <div key={i} className="group p-7 rounded-[32px] bg-black/[0.01] border border-black/[0.03] hover:border-brand-purple/20 transition-all duration-500">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-purple mb-5 group-hover:scale-110 transition-transform duration-500">
                                        <FiCheckCircle size={14} />
                                    </div>
                                    <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed font-sans font-normal">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Strategic Roadmap */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 p-8 sm:p-10 rounded-[40px] bg-white border border-black/[0.05] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-3xl rounded-full" />
                            <h3 className="text-[22px] font-sans font-bold text-black mb-10 tracking-tight">Strategic Roadmap</h3>
                            <div className="space-y-6">
                                {cs.objectives?.map((obj, i) => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-7 h-7 rounded-full border-2 border-brand-purple/20 flex items-center justify-center text-[10px] font-bold text-brand-purple group-hover:bg-brand-purple group-hover:border-brand-purple group-hover:text-white transition-all duration-300">
                                                {i+1}
                                            </div>
                                            {i < cs.objectives.length - 1 && (
                                                <div className="w-px flex-1 bg-black/[0.06] my-2" />
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-[15px] font-sans font-medium text-black/80 leading-snug">
                                                {obj}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solutions */}
                <div className="space-y-10">
                    <div className="text-center max-w-[600px] mx-auto space-y-3">
                         <h3 className="text-[32px] font-bold text-black">Proposed Solutions</h3>
                         <p className="text-black/50 text-[15px]">We implemented a multi-faceted approach to address the core challenges.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cs.solutions?.map((sol, i) => (
                            <div key={i} className="p-8 bg-white border border-[#6A1DB5]/10 rounded-[24px] hover:border-[#6A1DB5]/30 transition-all shadow-sm hover:shadow-md">
                                <h4 className="text-[18px] font-bold text-[#6A1DB5] mb-3">{sol.title}</h4>
                                <p className="text-[15px] text-black/60 leading-relaxed">{sol.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Architecture & Workflow */}
                {cs.architecture?.diagram && (
                    <div className="space-y-10">
                        <h3 className="text-[28px] font-bold text-black flex items-center gap-3">
                            <FiCpu className="text-[#6A1DB5]" />
                            System Architecture
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                            <div className="md:col-span-4 space-y-4">
                                <p className="text-[16px] text-black/70 leading-relaxed">
                                    {cs.architecture.description}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <img src={cs.architecture.diagram} alt="Architecture" className="w-full rounded-[16px] border border-[#6A1DB5]/10 shadow-lg" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Workflow */}
                <div className="space-y-10">
                    <h3 className="text-[28px] font-bold text-black">Product Workflow</h3>
                    <div className="flex flex-col gap-6">
                        {cs.workflow?.map((step, i) => (
                            <div key={i} className="flex gap-6 items-start relative group">
                                {i < cs.workflow.length - 1 && (
                                    <div className="absolute left-[24px] top-12 bottom-[-1.5rem] w-0.5 bg-gradient-to-b from-[#6A1DB5]/20 to-transparent" />
                                )}
                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-bold z-10 group-hover:bg-[#6A1DB5] transition-colors">
                                    {i+1}
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-[18px] font-bold text-black mb-1">{step.step}</h4>
                                    <p className="text-[15px] text-black/50 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results & Metrics — The Impact Canvas */}
                <div className="relative overflow-hidden rounded-[40px] bg-[#0A0A0A] border border-white/5 p-8 sm:p-14 lg:p-20 text-white shadow-2xl">
                    {/* Ambient Background Glows */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                        <header className="max-w-3xl mb-16 sm:mb-20">
                           <div className="flex items-center gap-3 mb-6">
                              <span className="w-8 h-px bg-brand-purple" />
                              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-brand-purple">
                                Outcomes & Impact
                              </span>
                           </div>
                           <h3 className="text-4xl sm:text-5xl font-sans font-bold text-white leading-[1.0] tracking-tight mb-8">
                              Results that define <span className="text-brand-purple">success.</span>
                           </h3>
                           <p className="text-[16px] sm:text-[18px] text-white/50 leading-relaxed font-sans max-w-xl font-normal">
                             {cs.results?.summary || "We delivered measurable outcomes that transformed the product's performance and user engagement metrics across the board."}
                           </p>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 sm:gap-x-16">
                           {cs.results?.metrics?.map((m, i) => (
                             <div key={i} className="flex flex-col group">
                                <div className="flex items-center justify-between mb-5">
                                   <div className="text-[9px] font-sans font-bold text-brand-purple uppercase tracking-[0.3em]">
                                      Key Metric 0{i+1}
                                   </div>
                                   <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-brand-purple/30 group-hover:text-brand-purple transition-all duration-500">
                                      <FiTrendingUp size={12} />
                                   </div>
                                </div>
                                <div className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mb-2">
                                   {m.value}
                                </div>
                                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-white/30 max-w-[20ch] leading-relaxed">
                                   {m.label}
                                </div>
                                <div className="mt-6 w-10 h-[1px] bg-brand-purple/20 rounded-full group-hover:w-16 group-hover:bg-brand-purple transition-all duration-500" />
                             </div>
                           ))}
                        </div>
                    </div>
                </div>

                {/* Learnings & Future */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-10">
                    <div className="space-y-6">
                        <h4 className="text-[20px] font-bold text-black">Key Learnings</h4>
                        <div className="flex flex-wrap gap-3">
                            {cs.learnings?.map((l, i) => (
                                <div key={i} className="px-4 py-3 bg-[#F8F7FF] border border-[#6A1DB5]/5 rounded-[16px] text-[14px] text-black/70 font-medium">
                                    {l}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[20px] font-bold text-black">Future Scope</h4>
                        <ul className="space-y-3">
                            {cs.futureScope?.map((f, i) => (
                                <li key={i} className="text-[14px] text-black/60 flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}

        {/* Gallery / Images */}
        {project.images?.length > 0 && (
            <div className="mt-20 space-y-10">
                <h3 className="text-[24px] font-bold text-black">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActiveIndex(i)}
                            className="rounded-[12px] overflow-hidden border border-black/5 cursor-zoom-in"
                        >
                            <img src={img} alt={`Gallery ${i}`} className="w-full h-auto" />
                        </motion.div>
                    ))}
                </div>
            </div>
        )}

        {/* Footer info — High-End Studio Metadata */}
        <div className="mt-32 pt-16 border-t border-black/[0.08]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-end">
                <div className="space-y-8">
                    
                    <div className="flex flex-wrap gap-x-16 gap-y-8">
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold">Studio</span>
                            <span className="text-[15px] font-sans font-bold text-black">Pixen Studio</span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold">Updated</span>
                            <span className="text-[15px] font-sans font-bold text-black">{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 font-bold">Author</span>
                            <span className="text-[15px] font-sans font-bold text-black italic">Crafting With Pixen</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap lg:justify-end gap-3 sm:gap-4">
                    {project.tags?.map(tag => (
                        <span key={tag} className="px-5 py-2.5 rounded-2xl bg-brand-purple text-white font-sans text-[11px] font-bold shadow-[0_12px_24px_-8px_rgba(106,29,181,0.35)] hover:scale-105 transition-all duration-300">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeIndex !== null && project.images[activeIndex] && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveIndex(null)}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto flex justify-center py-6 sm:py-20 px-2 sm:px-4 cursor-zoom-out"
            >
                {/* Navigation Controls */}
                <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-10 pointer-events-none z-[120]">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handlePrev}
                        className="p-2 sm:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 pointer-events-auto group"
                    >
                        <FiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleNext}
                        className="p-2 sm:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 pointer-events-auto group"
                    >
                        <FiChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[130] backdrop-blur-md border border-white/10"
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(null);
                    }}
                >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
                
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="w-full max-w-[1100px] h-fit relative mt-12 sm:mt-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={project.images[activeIndex]}
                        alt="Zoomed view"
                        className="w-full h-auto rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
                    />
                    
                    {/* Counter */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-bold text-white/70 uppercase tracking-widest border border-white/5">
                        {activeIndex + 1} / {project.images.length}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}