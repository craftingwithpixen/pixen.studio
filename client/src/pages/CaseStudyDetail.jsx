import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CASE_MAP = {
  create: {
    title: 'Morning Coworking',
    subtitle: 'Custom fabrication for a premium coworking space',
  },
  engage: {
    title: 'Interactive Event Hub',
    subtitle: 'A social-first event format with live attendee participation',
  },
  analyze: {
    title: 'Analytics Dashboard',
    subtitle: 'Actionable insights and performance metrics for every launch',
  },
};

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const content = CASE_MAP[slug] || CASE_MAP.create;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5F3FF_0%,_#FFFFFF_45%,_#ECFFFA_100%)] py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-[860px] mx-auto bg-white rounded-[14px] border border-[#6A1DB5]/15 p-4 sm:p-6 md:p-8 shadow-[0_12px_40px_rgba(106,29,181,0.08)]">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-black/50 mb-8 sm:mb-10">
          <div className="font-semibold normal-case tracking-normal text-[26px] sm:text-[30px] leading-none text-[#6A1DB5]">pixen</div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Showcase</span>
            <span>Studio</span>
            <span>Research</span>
            <span>Journal</span>
          </div>
          <Link to="/our-work" className="text-[#6A1DB5] font-semibold hover:opacity-70 transition-opacity">Close</Link>
        </div>

        <h1 className="text-[42px] sm:text-[64px] md:text-[74px] font-semibold tracking-[-0.03em] leading-[0.92] text-[#0D0D0D] mb-5 sm:mb-6 uppercase">
          {content.title}
        </h1>

        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-[#6A1DB5]/80 mb-3">
          Category: Branded Coworking<br />
          Plan label: Experience
        </div>

        <div className="rounded-[6px] overflow-hidden border border-[#6A1DB5]/20 bg-[#F5F3FF]">
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
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#6A1DB5]/75">
          <div>Artisan brief</div>
          <div className="text-right">Client x Pixen Studio</div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <h2 className="text-[30px] sm:text-[38px] leading-[1.05] tracking-[-0.02em] text-black font-medium">
            {content.subtitle}
          </h2>
          <div className="space-y-4 text-[14px] text-black/70 leading-[1.7]">
            <p>
              This concept explores a modern coworking experience built around warmth, clarity, and flow.
            </p>
            <p>
              We combined refined typography, editorial spacing, and functional layout to create a page that feels premium and readable.
            </p>
            <p>
              The result is a clean presentation that helps users focus on the story, visuals, and business outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
