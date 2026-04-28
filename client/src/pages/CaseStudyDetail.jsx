import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-[860px] mx-auto bg-white rounded-[14px] border border-[#6A1DB5]/15 p-4 sm:p-6 md:p-8 shadow-[0_12px_40px_rgba(106,29,181,0.08)]"
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-black/50 mb-8 sm:mb-10 gap-4">
          <div className="font-semibold normal-case tracking-normal text-[26px] sm:text-[30px] leading-none text-[#6A1DB5]">
            pixen
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Showcase</span>
            <span>Studio</span>
            <span>Research</span>
            <span>Journal</span>
          </div>
          <Link to="/our-work" className="text-[#6A1DB5] font-semibold hover:opacity-70 transition-opacity">
            Close
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[42px] sm:text-[64px] md:text-[74px] font-semibold tracking-[-0.03em] leading-[0.92] text-[#0D0D0D] mb-5 sm:mb-6 uppercase"
        >
          {content.title}
        </motion.h1>

        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#6A1DB5]/80 mb-3">
          Category: {project.category || 'Project'}<br />
          Plan label: {project.type || 'Experience'}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="rounded-[6px] overflow-hidden border border-[#6A1DB5]/20 bg-[#F5F3FF]"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover"
            />
          ) : (
            <svg viewBox="0 0 1200 620" className="w-full h-[240px] sm:h-[320px] md:h-[420px]">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6A1DB5" />
                  <stop offset="55%" stopColor="#A178FA" />
                  <stop offset="100%" stopColor="#00C2A8" />
                </linearGradient>
              </defs>
              <rect width="1200" height="620" fill="url(#g1)" />
              <rect x="0" y="420" width="1200" height="200" fill="#F5F3FF" />
              <rect x="140" y="170" width="920" height="250" fill="#FFFFFF" opacity="0.26" />
              <rect x="270" y="270" width="680" height="26" fill="#C8F139" />
              <g fill="#F5F3FF">
                <ellipse cx="240" cy="500" rx="45" ry="24" />
                <ellipse cx="360" cy="500" rx="45" ry="24" />
                <ellipse cx="480" cy="500" rx="45" ry="24" />
                <ellipse cx="600" cy="500" rx="45" ry="24" />
                <ellipse cx="720" cy="500" rx="45" ry="24" />
                <ellipse cx="840" cy="500" rx="45" ry="24" />
              </g>
              <g fill="#6A1DB5" opacity="0.5">
                <rect x="170" y="170" width="30" height="250" />
                <rect x="1000" y="170" width="30" height="250" />
              </g>
              <g fill="#C8F139" opacity="0.95">
                <circle cx="210" cy="135" r="36" />
                <circle cx="1020" cy="140" r="36" />
                <circle cx="600" cy="130" r="30" />
              </g>
            </svg>
          )}
        </motion.div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#6A1DB5]/75">
          <div>Artisan brief</div>
          <div className="text-right">Client x Pixen Studio</div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <h2 className="text-[30px] sm:text-[38px] leading-[1.05] tracking-[-0.02em] text-black font-medium">
            {content.subtitle}
          </h2>
          <div className="space-y-4 text-[14px] text-black/70 leading-[1.7]">
            <p>{project.description || project.challenge || 'This project combines structure, clarity, and a premium visual language.'}</p>
            <p>{project.solution || 'The layout is designed to feel clean and editorial while still keeping the content easy to scan.'}</p>
            <p>{project.results || 'The final experience keeps the project story front and center while presenting the work in a refined format.'}</p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full bg-[#F5F3FF] border border-[#6A1DB5]/10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6A1DB5]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.12em] text-black/45">
          <span>{project.client?.name || 'Client x Pixen Studio'}</span>
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#6A1DB5] font-semibold hover:opacity-70 transition-opacity">
              View live site
            </a>
          ) : (
            <span>Private project</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}