import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const services = [
  {
    id: '01',
    title: 'Web Dev',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    desc: 'Pixen creates modern, responsive websites built for ultimate performance and rapid business growth.',
    accent: '#6A1DB5',
    tags: ['React', 'Next.js', 'Webflow'],
  },
  {
    id: '02',
    title: 'SaaS Products',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    desc: 'Robust, subscription-based platforms designed for high scalability and seamless payment flows.',
    accent: '#C8F139',
    tags: ['Stripe', 'Auth', 'Dashboards'],
  },
  {
    id: '03',
    title: 'AI Agents',
    category: 'Intelligence',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    desc: 'Build AI agents that automate complex workflows, handle repetitive tasks, and deliver faster decisions.',
    accent: '#A178FA',
    tags: ['LLMs', 'Automation', 'RAG'],
  },
  {
    id: '04',
    title: 'SEO & Search',
    category: 'Growth',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=900&q=80',
    desc: 'Technical SEO strategies to ensure your digital platform ranks at the top and drives consistent organic traffic.',
    accent: '#00C2A8',
    tags: ['Analytics', 'On-page', 'Performance'],
  },
  {
    id: '05',
    title: 'Cloud DevOps',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    desc: 'Cloud deployments and infrastructure management for highly reliable applications with 99.9% uptime.',
    accent: '#ffffff',
    tags: ['AWS', 'Docker', 'CI/CD'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const activeService = hoveredIndex !== null ? services[hoveredIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={handleMouseMove}
      className="relative bg-[#0D0D0D] mx-4 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-20 rounded-[28px] sm:rounded-[40px] lg:rounded-[64px] -mt-10 sm:-mt-12 z-20 overflow-hidden border border-white/[0.07] shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
    >
      {/* ── Dynamic ambient glow that follows the cursor ─────────── */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none z-0"
            style={{
              left: mousePos.x - 300,
              top: mousePos.y - 300,
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeService.accent}22 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Floating image card that follows mouse ───────────────── */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key={`preview-${hoveredIndex}`}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute pointer-events-none z-50 hidden lg:block"
            style={{
              left: mousePos.x + 30,
              top: mousePos.y - 120,
              width: 260,
              height: 180,
            }}
          >
            <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
              <img
                src={services[hoveredIndex].image}
                alt={services[hoveredIndex].title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${services[hoveredIndex].accent}55 0%, transparent 60%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-[11px] font-bold tracking-widest uppercase opacity-80">
                  {services[hoveredIndex].category}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-4 font-sans">
            What we do
          </p>
          <h2 className="text-[38px] sm:text-[52px] lg:text-[64px] font-sans font-medium leading-[1.0] tracking-tight text-white">
            Our <span className="text-[#6A1DB5]">services</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#666] text-[14px] sm:text-[15px] leading-[1.65] font-sans max-w-[340px] pb-1"
        >
          We craft digital experiences across every layer of the stack — from design to deployment.
        </motion.p>
      </div>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="h-px bg-white/[0.07] mx-6 sm:mx-10 lg:mx-16"
      />

      {/* ── Service rows ─────────────────────────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
        {services.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            index={index}
            isInView={isInView}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* ── Bottom CTA bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-6 sm:mx-10 lg:mx-16 mb-12 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-t border-white/[0.07]"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {['11', '33', '44'].map((n) => (
              <img
                key={n}
                src={`https://i.pravatar.cc/100?img=${n}`}
                className="w-9 h-9 rounded-full border-2 border-[#0D0D0D] object-cover"
                alt="client"
              />
            ))}
          </div>
          <span className="text-white/40 text-[12px] font-sans font-medium">
            158+ projects delivered globally
          </span>
        </div>

        <a
          href="#contact"
          className="group flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full text-[13px] font-bold font-sans hover:bg-[#C8F139] transition-colors duration-300"
        >
          Start a project
          <span className="w-6 h-6 bg-black/10 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <FiArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </a>
      </motion.div>
    </section>
  );
}

/* ── Individual service row ──────────────────────────────────── */
function ServiceRow({ service, index, isInView, onHover, onLeave }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnter = () => {
    setIsHovered(true);
    onHover();
  };
  const handleLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative cursor-pointer"
    >
      {/* Hover background fill */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{ background: `${service.accent}0D` }}
      />

      <div className="relative flex items-center gap-4 sm:gap-8 lg:gap-12 py-6 sm:py-7 border-b border-white/[0.07]">

        {/* Ghost number */}
        <motion.span
          animate={{ opacity: isHovered ? 0.12 : 0.04, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          className="font-sans font-bold text-[52px] sm:text-[64px] lg:text-[80px] leading-none text-white select-none w-[72px] sm:w-[88px] lg:w-[108px] shrink-0 text-center"
        >
          {service.id}
        </motion.span>

        {/* Title & category */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <motion.span
              animate={{
                color: isHovered ? service.accent : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-bold tracking-[0.2em] uppercase font-sans"
            >
              {service.category}
            </motion.span>
          </div>

          <motion.h3
            animate={{ x: isHovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[22px] sm:text-[28px] lg:text-[36px] font-sans font-medium leading-[1.05] tracking-tight text-white"
          >
            {service.title}
          </motion.h3>

          {/* Description — slides in on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#888] text-[14px] sm:text-[15px] leading-[1.6] font-sans max-w-[600px] overflow-hidden"
              >
                {service.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Tags — visible on hover (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <AnimatePresence>
            {isHovered &&
              service.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 8 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold font-sans border"
                  style={{
                    borderColor: `${service.accent}40`,
                    color: service.accent === '#ffffff' ? '#ffffff' : service.accent,
                    background: `${service.accent}10`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        {/* Arrow CTA */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 0 : -45,
            backgroundColor: isHovered ? service.accent : 'rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shrink-0"
        >
          <FiArrowUpRight
            size={18}
            strokeWidth={2}
            style={{ color: isHovered && service.accent !== '#ffffff' ? (service.accent === '#C8F139' ? '#000' : '#fff') : '#fff' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
