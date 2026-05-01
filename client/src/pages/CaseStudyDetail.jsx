import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle, FiCpu, FiLayers, FiTrendingUp } from 'react-icons/fi';
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-[1000px] mx-auto bg-white rounded-[24px] border border-[#6A1DB5]/15 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(106,29,181,0.06)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-black/50 mb-10 gap-4">
          <div className="font-semibold normal-case tracking-normal text-[26px] sm:text-[30px] leading-none text-[#6A1DB5]">
            pixen
          </div>
          <Link to="/our-work" className="flex items-center gap-2 text-[#6A1DB5] font-bold hover:opacity-70 transition-opacity">
            <FiArrowLeft /> Back to Work
          </Link>
        </div>

        <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6A1DB5]/5 border border-[#6A1DB5]/10 text-[#6A1DB5] text-[10px] font-bold uppercase tracking-wider mb-4">
                {project.category} • {project.status}
            </div>
            <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[48px] sm:text-[72px] md:text-[84px] font-semibold tracking-[-0.04em] leading-[0.9] text-[#0D0D0D] mb-6 uppercase"
            >
            {project.title}
            </motion.h1>
            <p className="text-[18px] sm:text-[22px] text-black/60 leading-relaxed font-light max-w-[700px]">
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
          {project.thumbnail || project.image ? (
            <img
              src={project.thumbnail || project.image}
              alt={project.title}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          ) : (
             <div className="aspect-video bg-gradient-to-br from-[#6A1DB5] to-[#A178FA] flex items-center justify-center text-white/20 font-bold text-6xl">PIXEN</div>
          )}
        </motion.div>

        {/* Project Overview / Detailed Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-[28px] font-semibold tracking-tight text-black flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#6A1DB5] rounded-full"></span>
                    Project Overview
                </h2>
                <div className="text-[16px] text-black/70 leading-[1.8] space-y-4">
                    {project.detailedDescription?.split('\n').map((p, i) => <p key={i}>{p}</p>) || <p>{project.description}</p>}
                </div>
            </div>
            <div className="space-y-8 bg-[#F8F7FF] p-8 rounded-[20px] border border-[#6A1DB5]/5 self-start">
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack?.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-white border border-[#6A1DB5]/10 rounded text-[11px] font-medium text-[#6A1DB5]">{tech}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Core Features</h4>
                    <ul className="space-y-2">
                        {project.features?.map(feature => (
                            <li key={feature} className="text-[13px] text-black/60 flex items-start gap-2">
                                <FiCheckCircle className="text-[#6A1DB5] mt-0.5 shrink-0" size={14} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-3">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-[#6A1DB5] text-white rounded-[12px] text-[13px] font-bold hover:bg-[#6A1DB5]/90 transition-all">
                            <FiExternalLink /> Live Preview
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-[12px] text-[13px] font-bold hover:bg-black/80 transition-all">
                            <FiGithub /> Source Code
                        </a>
                    )}
                </div>
            </div>
        </div>

        {/* Case Study Content (if exists) */}
        {cs && (
            <div className="space-y-24 mt-20 pt-20 border-t border-[#6A1DB5]/10">
                {/* Problem & Objectives */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h3 className="text-[24px] font-bold text-black flex items-center gap-3">
                            <FiLayers className="text-[#6A1DB5]" />
                            The Challenge
                        </h3>
                        <p className="text-black/70 leading-relaxed italic border-l-4 border-[#6A1DB5]/20 pl-6 py-2">
                            "{cs.problemStatement}"
                        </p>
                        <div className="mt-8">
                             <h4 className="text-[13px] font-bold uppercase tracking-widest text-black/40 mb-4">Key Challenges</h4>
                             <ul className="space-y-3">
                                {cs.challenges?.map((item, i) => (
                                    <li key={i} className="text-[15px] text-black/65 flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6A1DB5] mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                    <div className="space-y-6 bg-[#F5F3FF]/50 p-8 rounded-[24px] border border-[#6A1DB5]/5">
                        <h3 className="text-[24px] font-bold text-black">Strategic Objectives</h3>
                        <div className="space-y-4">
                            {cs.objectives?.map((obj, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-[16px] shadow-sm border border-[#6A1DB5]/5">
                                    <div className="w-8 h-8 rounded-full bg-[#6A1DB5]/10 flex items-center justify-center text-[#6A1DB5] font-bold text-[12px]">{i+1}</div>
                                    <span className="text-[14px] font-medium text-black/80">{obj}</span>
                                </div>
                            ))}
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

                {/* Results & Metrics */}
                <div className="bg-black text-white p-10 sm:p-16 rounded-[32px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6A1DB5]/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-[32px] font-bold leading-tight flex items-center gap-3">
                                <FiTrendingUp className="text-[#C8F139]" />
                                The Outcomes
                            </h3>
                            <p className="text-white/60 text-[16px] leading-relaxed">
                                {cs.results?.summary}
                            </p>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
                            {cs.results?.metrics?.map((m, i) => (
                                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[20px] backdrop-blur-sm text-center">
                                    <div className="text-[32px] sm:text-[42px] font-bold text-[#C8F139] mb-1">{m.value}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{m.label}</div>
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
                        <div key={i} className="rounded-[12px] overflow-hidden border border-black/5">
                            <img src={img} alt={`Gallery ${i}`} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Footer info */}
        <div className="mt-20 pt-10 border-t border-black/5 flex flex-wrap items-center justify-between gap-6 text-[11px] uppercase tracking-widest text-black/40 font-bold">
            <div className="flex items-center gap-2">
                <span>Created By:</span>
                <span className="text-black">Pixen Studio</span>
            </div>
            <div className="flex items-center gap-2">
                <span>Last Updated:</span>
                <span className="text-black">{new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-4">
                {project.tags?.map(tag => (
                    <span key={tag}>#{tag}</span>
                ))}
            </div>
        </div>
      </motion.div>
    </div>
  );
}