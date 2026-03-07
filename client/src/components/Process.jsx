import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiLayout, FiCode, FiShield, FiZap, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We dive deep into your business goals, target audience, and technical requirements to create a strategic roadmap.',
    icon: FiSearch,
    color: '#7B3FE4',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    desc: 'We craft the UX/UI and design the interface while our architects set up the database and server logic (MERN/Next.js).',
    icon: FiLayout,
    color: '#6B35D9',
  },
  {
    num: '03',
    title: 'Development & Testing',
    desc: 'We build your product using the MERN stack or Next.js, with daily stand-ups and rigorous QA testing along the way.',
    icon: FiCode,
    color: '#5a28c4',
  },
  {
    num: '04',
    title: 'Security Audit',
    desc: 'Before launch we run comprehensive security scans and penetration tests to lock down your application cold.',
    icon: FiShield,
    color: '#4a1fa8',
  },
  {
    num: '05',
    title: 'Deployment & Launch',
    desc: 'We deploy to production and monitor performance metrics in real time to ensure a buttery-smooth rollout.',
    icon: FiZap,
    color: '#6B35D9',
  },
  {
    num: '06',
    title: 'Maintenance & Growth',
    desc: 'Post-launch we continue to support, update, and optimize your product so it scales with your ambitions.',
    icon: FiTrendingUp,
    color: '#7B3FE4',
  },
];

export default function Process() {
  const [active, setActive] = useState(null);

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-brand-bg">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(155,107,255,0.15) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.4,
        }}
      />

      {/* Purple radial glow — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(107,53,217,0.07), transparent 65%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="badge mb-3 block">How We Work</span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="section-heading">
              From Idea to <span className="gradient-text">Launch.</span>
            </h2>
            <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
              A transparent, agile methodology built to deliver on time and exceed every expectation.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-purple/40 via-brand-light/20 to-transparent" />
        </motion.div>

        {/* ── STEP ROWS ── */}
        <div className="flex flex-col">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative group"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Divider */}
                {i > 0 && (
                  <div
                    className="h-px w-full transition-colors duration-300"
                    style={{ background: isActive ? 'rgba(107,53,217,0.4)' : 'rgba(255,255,255,0.06)' }}
                  />
                )}

                <div
                  className="relative flex items-center gap-6 md:gap-10 px-6 py-7 rounded-2xl cursor-default transition-all duration-300 overflow-hidden"
                  style={{
                    background: isActive ? 'rgba(107,53,217,0.07)' : 'transparent',
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? s.color : 'transparent',
                      boxShadow: isActive ? `0 0 12px ${s.color}` : 'none',
                    }}
                  />

                  {/* Step number — large watermark */}
                  <span
                    className="font-display font-black select-none flex-shrink-0 transition-all duration-300 w-14 text-right leading-none"
                    style={{
                      fontSize: 40,
                      color: isActive ? s.color : 'rgba(255,255,255,0.07)',
                      textShadow: isActive ? `0 0 30px ${s.color}66` : 'none',
                    }}
                  >
                    {s.num}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? s.color : 'rgba(255,255,255,0.05)',
                      border: isActive ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: isActive ? `0 0 24px ${s.color}66` : 'none',
                    }}
                  >
                    <Icon size={18} color={isActive ? '#fff' : '#555'} />
                  </div>

                  {/* Title + animated description */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-display font-bold text-base md:text-lg leading-tight transition-colors duration-300"
                      style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}
                    >
                      {s.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="text-brand-muted text-sm leading-relaxed overflow-hidden"
                        >
                          {s.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right side — step tag + arrow */}
                  <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                    <span
                      className="font-display text-[10px] uppercase tracking-widest transition-colors duration-300"
                      style={{ color: isActive ? s.color : 'rgba(255,255,255,0.12)' }}
                    >
                      Step {s.num}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isActive ? s.color : 'rgba(255,255,255,0.08)',
                        background: isActive ? s.color : 'transparent',
                        transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    >
                      <FiArrowRight size={13} color={isActive ? '#fff' : '#444'} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing divider */}
        <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

      </div>
    </section>
  );
}


