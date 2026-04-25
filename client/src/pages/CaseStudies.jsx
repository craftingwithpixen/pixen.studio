import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const showcaseSteps = [
  {
    id: '01',
    title: 'Create',
    projectName: 'Pixen Studio',
    category: 'Web Platform',
    desc: 'Welcome Studio gives you all the tools you need to create and host virtual productions that boost engagement and put your brand centre‑stage.',
    pill: 'from-[#C8F139] to-[#6A1DB5]',
    // image: '/images/projects/pixen-studio.jpg',  ← drop your image path here
    image: null,
    slug: 'create',
  },
  {
    id: '02',
    title: 'Engage',
    projectName: 'UnitedV',
    category: 'SaaS Product',
    desc: 'Our cutting‑edge technology gives your attendees immersive and fun experiences that increase active participation.',
    pill: 'from-[#A178FA] to-[#38E8FF]',
    // image: '/images/projects/unitedv.jpg',
    image: null,
    slug: 'engage',
  },
  {
    id: '03',
    title: 'Analyze',
    projectName: 'The Social Barista',
    category: 'Brand & Web',
    desc: 'Track the success of your events with deep insights and analytics measured across live and attendee experiences.',
    pill: 'from-[#FF8A65] to-[#A178FA]',
    // image: '/images/projects/social-barista.jpg',
    image: null,
    slug: 'analyze',
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-[1340px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Navbar */}
        <div className="py-6">
          <Navbar />
        </div>

        {/* ── Hero ── */}
        <section className="mt-4 mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">

            {/* H1 */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <h1
                className="font-sans font-light leading-[1.02] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                Transforming{' '}
                <span className="font-medium text-[#6A1DB5]">Inspiration</span>
                <br />
                into Innovation
              </h1>
            </motion.div>

            {/* Sub copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 text-[14px] sm:text-[15px] leading-[1.7] text-black/50 font-sans font-light lg:pt-3 max-w-[420px] lg:justify-self-end"
            >
              Every project starts with strategy and ends with measurable outcomes. We blend clean design, strong engineering, and practical business thinking.
            </motion.p>

            {/* Left blurb */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 lg:row-start-2"
            >
              <h3 className="font-sans font-medium text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.02em]">
                Unleash Your Creativity
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-black/50 font-light max-w-[240px]">
                We turn abstract ideas into polished interfaces and products that feel clear, modern, and memorable.
              </p>
              <div className="mt-5">
                <Link
                  to="/our-work"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6A1DB5] hover:gap-2.5 transition-all duration-200"
                >
                  View case collection
                  <FiArrowUpRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

            {/* Hero visual card */}
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

            {/* Stack card */}
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

        {/* ── Showcase rows ── */}
        <section className="pb-20 sm:pb-28">
          <div className="flex flex-col gap-8 sm:gap-10">
            {showcaseSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 items-center gap-5 sm:gap-6"
              >
                {/* Text side */}
                <Link to={`/our-work/case-study/${step.slug}`} className="lg:col-span-3 block group">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-black/30 font-sans mb-1.5 font-medium">
                    Step {step.id}
                  </p>
                  <h3
                    className="font-sans font-light leading-[0.95] tracking-[-0.03em] inline-flex items-center gap-2 group-hover:opacity-70 transition-opacity duration-200"
                    style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                  >
                    {step.title}
                    <span className="text-[#6A1DB5] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <FiArrowUpRight size={28} strokeWidth={1.5} />
                    </span>
                  </h3>
                  <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.7] text-black/45 font-light max-w-[280px]">
                    {step.desc}
                  </p>
                </Link>

                {/* Pill card */}
                <Link to={`/our-work/case-study/${step.slug}`} className="lg:col-span-9 block group/pill">
                  {/* gradient border ring */}
                  <div className={`h-[200px] sm:h-[220px] md:h-[240px] w-full rounded-[999px] bg-gradient-to-r ${step.pill} p-[3px] overflow-hidden`}>
                    {/* inner pill */}
                    <div className="relative h-full w-full rounded-[999px] overflow-hidden group-hover/pill:scale-[1.008] transition-transform duration-500">

                      {/* ── Image OR gradient fallback ── */}
                      {step.image ? (
                        <img
                          src={step.image}
                          alt={step.projectName}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.pill} opacity-20`} />
                      )}

                      {/* dark scrim for readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/10" />

                      {/* ── Project name overlay ── */}
                      <div className="absolute inset-0 flex items-center justify-between px-8 sm:px-10 md:px-14">
                        {/* left — name + category */}
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-sans font-medium mb-1">
                            {step.category}
                          </p>
                          <h4
                            className="font-sans font-light tracking-[-0.03em] leading-[1.05] text-white"
                            style={{ fontSize: 'clamp(22px, 3vw, 40px)' }}
                          >
                            {step.projectName}
                          </h4>
                        </div>

                        {/* right — arrow */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/pill:opacity-100 group-hover/pill:bg-white/20 transition-all duration-300 shrink-0">
                          <FiArrowUpRight size={18} strokeWidth={1.8} />
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
