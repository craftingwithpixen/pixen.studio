import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiArrowUpRight, FiCode, FiBox, FiCpu, FiSearch, FiCloud } from 'react-icons/fi';

/* ─── Data ──────────────────────────────────────────────────── */
const services = [
  {
    num: '01', title: 'Web Development', short: 'Websites & Web Apps',
    desc: 'Modern, responsive websites and web apps built for ultimate performance, SEO, and rapid business growth.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    Icon: FiCode,
    accent: '#C8F139',
    accentText: '#000',
  },
  {
    num: '02', title: 'SaaS Products', short: 'Scalable Platforms',
    desc: 'End-to-end SaaS platforms with auth, billing, dashboards, and team management — designed to scale from day one.',
    tags: ['Stripe', 'Auth', 'Dashboards', 'APIs'],
    Icon: FiBox,
    accent: '#A178FA',
    accentText: '#000',
  },
  {
    num: '03', title: 'AI Agents', short: 'Automation & Intelligence',
    desc: 'Custom AI agents that automate complex workflows, handle repetitive tasks, and deliver smarter decisions at scale.',
    tags: ['OpenAI', 'LangChain', 'Automation', 'n8n'],
    Icon: FiCpu,
    accent: '#38E8FF',
    accentText: '#000',
  },
  {
    num: '04', title: 'SEO & Search', short: 'Organic Growth',
    desc: 'Technical SEO audits, on-page strategies, and content frameworks that push your platform straight to the top.',
    tags: ['On-page', 'Core Web Vitals', 'Analytics'],
    Icon: FiSearch,
    accent: '#FF8A65',
    accentText: '#000',
  },
  {
    num: '05', title: 'Cloud & DevOps', short: 'Infrastructure & Reliability',
    desc: 'Managed cloud deployments, CI/CD pipelines, and infrastructure automation for rock-solid 99.9% uptime.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Terraform'],
    Icon: FiCloud,
    accent: '#6A1DB5',
    accentText: '#fff',
  },
];

/* ─── Main Component ────────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null);
  const [scrollIdx, setScrollIdx] = useState(0);

  const handleSelectService = (index) => setScrollIdx(index);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollIdx(Math.min(Math.floor(v * services.length), services.length - 1));
  });

  const active = scrollIdx;
  const s = services[active];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-white rounded-[28px] sm:rounded-[40px] lg:rounded-[64px] -mt-10 sm:-mt-12 relative z-20 overflow-hidden shadow-[0_-12px_48px_rgba(0,0,0,0.07)]"
      style={{ height: `${services.length * 85 + 20}vh`, position: 'relative' }}
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* ══════════════════════════════════════════
            LEFT — animated detail panel (dark)
        ══════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] shrink-0 flex-col bg-[#0D0D0D] relative overflow-hidden">

          {/* accent glow blob — tracks active service */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(ellipse 80% 60% at 30% 60%, ${s.accent}22 0%, transparent 65%)`,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ghost number watermark */}
          <motion.span
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-6 right-8 font-sans font-black leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(100px, 14vw, 180px)', color: `${s.accent}08` }}
          >
            {s.num}
          </motion.span>

          {/* content */}
          <div className="relative z-10 flex flex-col justify-between h-full px-10 xl:px-14 pt-16 pb-10">

            {/* top — badge + heading */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-sans font-medium mb-8">
                Our Services
              </p>
              <h2
                className="font-sans font-light leading-[1.0] tracking-[-0.03em] text-white"
                style={{ fontSize: 'clamp(36px, 3.5vw, 58px)' }}
              >
                What<br />
                <span className="font-medium" style={{ color: s.accent }}>we do</span>
              </h2>
            </div>

            {/* middle — active service detail card */}
            <div className="flex-1 flex flex-col justify-center py-8">
              {/* large icon */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.num + '-icon'}
                  initial={{ opacity: 0, scale: 0.85, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${s.accent}18`,
                    boxShadow: `0 0 40px ${s.accent}30`,
                    border: `1px solid ${s.accent}30`,
                  }}
                >
                  <s.Icon size={28} color={s.accent} strokeWidth={1.5} />
                </motion.div>
              </AnimatePresence>

              {/* active service number + short label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.num + '-label'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] font-medium mb-2" style={{ color: s.accent }}>
                    {s.num} — {s.short}
                  </p>
                  <h3
                    className="font-sans font-light leading-[1.1] tracking-[-0.025em] text-white mb-4"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 36px)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.8] text-white/40 font-light max-w-[300px]">
                    {s.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* tags */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.num + '-tags'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex flex-wrap gap-2 mt-5"
                >
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border"
                      style={{
                        color: s.accent,
                        borderColor: `${s.accent}35`,
                        backgroundColor: `${s.accent}10`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* bottom — dots + counter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {services.map((svc, i) => (
                  <motion.button
                    key={svc.num}
                    onClick={() => handleSelectService(i)}
                    animate={{
                      width: i === active ? 28 : 7,
                      backgroundColor: i === active ? svc.accent : 'rgba(255,255,255,0.15)',
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-[6px] rounded-full cursor-pointer border-0 p-0"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.14em] font-sans">
                  Scroll to explore
                </p>
                <span className="text-[12px] font-bold tabular-nums" style={{ color: `${s.accent}99` }}>
                  {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT — white accordion index list
        ══════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 bg-white flex flex-col justify-center">

          {/* mobile header */}
          <div className="lg:hidden px-6 sm:px-8 pt-20 pb-6 border-b border-black/[0.06]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-black/30 font-sans font-medium mb-2">Our Services</p>
            <h2 className="section-heading text-black">What we do</h2>
          </div>

          {/* accordion list */}
          <div className="flex-1 flex flex-col justify-center divide-y divide-black/[0.06] px-6 sm:px-10 lg:px-12 xl:px-16 py-6 lg:py-0">
            {services.map((item, i) => {
              const isActive = i === active;
              return (
                <div key={item.num} className="relative">

                  {/* active left accent bar */}
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full pointer-events-none"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      backgroundColor: item.accent,
                      scaleY: isActive ? 1 : 0.4,
                    }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* row hover bg */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-lg"
                    animate={{ opacity: isActive ? 1 : 0, backgroundColor: `${item.accent}08` }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* row */}
                  <div
                    className="relative flex items-center gap-4 sm:gap-6 pl-5 pr-2 py-5 sm:py-6 lg:py-7 cursor-pointer group"
                    onMouseEnter={() => handleSelectService(i)}
                    onClick={() => handleSelectService(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelectService(i); }
                    }}
                  >
                    {/* number */}
                    <motion.span
                      animate={{ color: isActive ? item.accent : 'rgba(0,0,0,0.18)' }}
                      transition={{ duration: 0.3 }}
                      className="text-[10px] font-black tracking-[0.18em] w-6 shrink-0 font-sans"
                    >
                      {item.num}
                    </motion.span>

                    {/* icon bubble */}
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? item.accent : 'rgba(0,0,0,0.05)',
                        color: isActive ? item.accentText : 'rgba(0,0,0,0.3)',
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive ? `0 0 22px ${item.accent}44` : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                    >
                      <item.Icon size={16} strokeWidth={2} />
                    </motion.div>

                    {/* title */}
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        animate={{ color: isActive ? '#000' : 'rgba(0,0,0,0.3)' }}
                        transition={{ duration: 0.3 }}
                        className="font-sans font-light leading-none tracking-[-0.03em] truncate"
                        style={{ fontSize: 'clamp(22px, 3vw, 54px)' }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>

                    {/* short label — desktop, inactive */}
                    <AnimatePresence>
                      {!isActive && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="hidden xl:block text-[11px] text-black/30 font-light tracking-wide shrink-0"
                        >
                          {item.short}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* arrow */}
                    <motion.div
                      animate={{
                        rotate: isActive ? 45 : 0,
                        backgroundColor: isActive ? item.accent : 'rgba(0,0,0,0.05)',
                        color: isActive ? item.accentText : 'rgba(0,0,0,0.25)',
                        boxShadow: isActive ? `0 4px 18px ${item.accent}44` : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0"
                    >
                      <FiArrowUpRight size={16} strokeWidth={2.2} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
            <div />
          </div>

          {/* mobile dots + counter */}
          <div className="lg:hidden flex items-center justify-between px-6 sm:px-8 py-5 border-t border-black/[0.06]">
            <div className="flex items-center gap-2">
              {services.map((svc, i) => (
                <motion.button
                  key={svc.num}
                  onClick={() => handleSelectService(i)}
                  animate={{
                    width: i === active ? 24 : 6,
                    backgroundColor: i === active ? svc.accent : 'rgba(0,0,0,0.15)',
                  }}
                  transition={{ duration: 0.35 }}
                  className="h-[5px] rounded-full cursor-pointer border-0 p-0"
                />
              ))}
            </div>
            <span className="text-[12px] font-bold tabular-nums" style={{ color: s.accent }}>
              {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
