import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowUpRight, FiStar, FiZap, FiCode, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


/* ─── Marquee data ────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  { label: 'Web Development', icon: <FiCode size={13} /> },
  { label: 'SaaS Products', icon: <FiLayers size={13} /> },
  { label: 'AI Agents', icon: <FiZap size={13} /> },
  { label: 'Cloud DevOps', icon: <FiStar size={13} /> },
  { label: 'UI / UX Design', icon: <FiCode size={13} /> },
  { label: 'SEO & Growth', icon: <FiArrowUpRight size={13} /> },
];

/* ─── Stat counter hook ───────────────────────────────────── */
function useCountUp(target, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return value;
}

/* ─── 3-D tilt card hook ──────────────────────────────────── */
function useTilt(intensity = 12) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ─── Marquee strip ───────────────────────────────────────── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]; // double for seamless loop
  return (
    <div className="w-full overflow-hidden py-3 border-y border-black/[0.07] my-8 md:my-10 relative">
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        className="flex gap-0 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-black/40 px-7"
          >
            <span className="text-[#6A1DB5]">{item.icon}</span>
            {item.label}
            <span className="w-1 h-1 rounded-full bg-[#6A1DB5]/40 ml-6 inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger counter animation once hero is visible
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Parallax scatter values for bento cards
  const sc = (m, d) => [isMobile ? m : d, 0];
  const x1 = useTransform(scrollY, [0, 260], sc(-20, -60));
  const y1 = useTransform(scrollY, [0, 260], sc(20, 40));
  const r1 = useTransform(scrollY, [0, 260], [-18, 0]);
  const x2 = useTransform(scrollY, [0, 260], sc(-15, -50));
  const y2 = useTransform(scrollY, [0, 260], sc(-15, -30));
  const r2 = useTransform(scrollY, [0, 260], [14, 0]);
  const x3 = useTransform(scrollY, [0, 260], sc(15, 50));
  const y3 = useTransform(scrollY, [0, 260], sc(10, 20));
  const r3 = useTransform(scrollY, [0, 260], [-22, 0]);
  const x4 = useTransform(scrollY, [0, 260], sc(20, 60));
  const y4 = useTransform(scrollY, [0, 260], sc(-60, -120));
  const r4 = useTransform(scrollY, [0, 260], [18, 0]);



  // 3-D tilt on CTA card
  const tilt = useTilt(10);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="bg-white w-full pt-[88px] md:pt-[120px] lg:pt-[132px] pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden relative"
    >
      {/* ── Ambient noise blob ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #6A1DB5 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #C8F139 0%, transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-[1380px] mx-auto"
      >


        {/* ── Headline row ───────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 lg:gap-14 relative z-10 w-full mt-6 mb-0">
          <div className="flex flex-col gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[34px] sm:text-[44px] md:text-[58px] lg:text-[72px] xl:text-[82px] font-sans font-normal leading-[1.05] tracking-[-0.02em] text-gray-900 max-w-[900px]"
            >
              Crafting{" "}
              <span className="relative inline-block">
                <span className="font-semibold text-[#6A1DB5]">bold</span>
              </span>{" "}
              ideas into
              <br className="hidden sm:block" />
              digital products
            </motion.h1>
          </div>

          {/* Right meta column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full max-w-[400px] lg:max-w-[300px] flex flex-col gap-6 pb-2"
          >
            <p className="text-[15px] text-black/60 font-sans leading-[1.6] font-medium">
              Pixen turns bold concepts into powerful platforms. Achieve your goals with our state-of-the-art solutions.
            </p>




          </motion.div>
        </div>

        {/* ── Marquee ticker ─────────────────────────────────────── */}
        <Marquee />

        {/* ── Bento grid ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 relative"
        >

          {/* ── Left column ──────────────────────────────────────── */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-5">

            {/* Vivid Violet card */}
            <motion.div
              style={{ x: x1, y: y1, rotate: r1 }}
              className="min-h-[270px] sm:h-[290px] bg-[#6A1DB5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 flex flex-col justify-between text-white relative overflow-hidden group shadow-[0_16px_48px_rgba(106,29,181,0.28)]"
            >
              {/* rings */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 400 400" aria-hidden>
                <circle cx="50" cy="50" r="150" fill="none" stroke="white" strokeWidth="30" />
                <circle cx="350" cy="350" r="200" fill="none" stroke="white" strokeWidth="40" />
              </svg>
              {/* gradient shine */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />

              <div className="flex justify-between items-start relative z-10 w-full">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#A178FA] text-white px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide">Web Development</span>
                  <span className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide border border-black/10">SaaS UI</span>
                </div>
                <div className="w-10 h-10 bg-white/10 border border-white/20 text-white rounded-full flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 cursor-pointer">
                  <FiArrowUpRight size={18} strokeWidth={2} />
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end w-full">
                <h3 className="text-[26px] sm:text-[30px] md:text-[36px] font-sans font-semibold leading-[1.05] tracking-tight">
                  Flexible, tailored<br />tech solutions
                </h3>
                
              </div>
            </motion.div>

            {/* Ink Black Quote card */}
            <motion.div
              style={{ x: x2, y: y2, rotate: r2 }}
              className="hidden md:flex min-h-[200px] bg-[#0D0D0D] rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 text-white relative flex-col justify-between shadow-lg overflow-hidden group"
            >
              {/* subtle grid texture */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden>
                <defs>
                  <pattern id="hgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hgrid)" />
              </svg>

              <span className="text-[100px] font-serif text-white/[0.06] absolute -top-3 left-3 leading-none select-none">"</span>

              <p className="text-white/70 text-[14px] leading-[1.7] font-sans relative z-10 max-w-[500px] font-medium mt-2">
                Our cutting-edge technology adapts to your needs and provides a tailored platform that helps you succeed in a competitive market.
              </p>

              <div className="flex items-center justify-between relative z-10 mt-4">
                
                {/* star rating */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={11} className="text-[#C8F139] fill-[#C8F139]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Middle column ────────────────────────────────────── */}
          <div className="hidden md:flex md:col-span-6 lg:col-span-3 flex-col justify-end">
            <motion.div
              style={{ x: x3, y: y3, rotate: r3 }}
              className="min-h-[260px] lg:h-[300px] bg-[#C8F139] rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 pb-9 text-black relative flex flex-col justify-between text-center mt-8 sm:mt-10 lg:mt-0 shadow-[0_16px_48px_rgba(200,241,57,0.25)]"
            >
              {/* Floating badge */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[72px] h-[72px] bg-gradient-to-br from-[#00D9FF] to-[#00B8D4] rounded-full shadow-[0_20px_50px_rgba(0,217,255,0.35)] flex items-center justify-center z-10 border border-[#00E8FF]/50">
                <div className="relative flex flex-col items-center gap-1.5">
                  <FiZap size={24} className="text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* wave doodle */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none rounded-[28px] sm:rounded-[36px]" viewBox="0 0 200 200" aria-hidden>
                <path fill="none" stroke="black" strokeWidth="7" d="M10,120 Q50,40 100,120 T190,120" />
                <path fill="none" stroke="black" strokeWidth="7" d="M30,160 Q80,80 130,160" />
              </svg>

             
                <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-2">
                  <p className="text-[11px] font-bold opacity-60 mb-3 font-sans tracking-[0.15em] uppercase">Innovating daily</p>
                  <h3 className="text-[26px] sm:text-[28px] md:text-[30px] font-sans font-bold tracking-tight leading-[1.0]">
                    Crafting Next-Gen<br />Experiences
                  </h3>
                </div>

              {/* mini stat row */}
              <div className="relative z-10 flex justify-center gap-6 mt-5 pt-4 border-t border-black/10">
                {[['99%', 'Quality'], ['24/7', 'Support']].map(([v, l]) => (
                  <div key={l} className="flex flex-col items-center">
                    <span className="text-[18px] font-bold leading-none">{v}</span>
                    <span className="text-[9px] uppercase tracking-widest opacity-50 font-bold mt-1">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right column (3-D tilt CTA card) ─────────────────── */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end gap-4 sm:gap-5 relative">
            <motion.div
              ref={tilt.ref}
              onMouseMove={tilt.onMove}
              onMouseLeave={tilt.onLeave}
              style={{ x: x4, y: y4, rotate: r4, rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900 }}
              className="min-h-[320px] lg:h-[370px] bg-[#E0F7F5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-9 text-black relative flex flex-col justify-between overflow-hidden shadow-[0_16px_48px_rgba(0,194,168,0.14)] group"
            >
              {/* teal blob */}
              <div className="absolute -right-6 bottom-12 w-36 h-36 bg-[#00C2A8]/20 rounded-full blur-3xl pointer-events-none" />
              {/* top-right decorative ring */}
              <svg className="absolute top-4 right-4 w-24 h-24 opacity-[0.08] pointer-events-none" viewBox="0 0 96 96" aria-hidden>
                <circle cx="48" cy="48" r="44" fill="none" stroke="#00C2A8" strokeWidth="6" />
                <circle cx="48" cy="48" r="28" fill="none" stroke="#00C2A8" strokeWidth="4" />
              </svg>

              <div className="relative z-10">
                {/* "Let's talk" chip */}
                <div className="inline-flex items-center gap-2 bg-white/60 border border-black/[0.08] rounded-full px-3.5 py-1.5 mb-5 text-[11px] font-bold uppercase tracking-[0.1em] text-black/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8] inline-block" />
                  Let's talk
                </div>

                <h4 className="text-[24px] sm:text-[26px] font-sans font-bold mb-3 tracking-tight leading-[1.1]">Need a custom app?</h4>
                <p className="text-[14px] text-black/55 leading-[1.6] font-sans font-medium sm:pr-4">
                  Priority development &amp; dedicated support from our expert team. Experience the future of web tech.
                </p>
              </div>

              {/* Tech stack mini badges */}
              <div className="relative z-10 flex flex-wrap gap-2 my-4">
                {['React', 'Node.js', 'AWS', 'GPT-4'].map((t) => (
                  <span key={t} className="bg-white/70 border border-black/[0.08] text-black/60 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 items-center relative z-10 w-full">
                <Link
                  to="/contact"
                  className="flex-1 bg-black hover:bg-[#6A1DB5] text-white py-3.5 rounded-full text-center text-[13px] font-bold transition-colors duration-300"
                >
                  Get started
                </Link>
                <div className="w-[46px] h-[46px] bg-white/60 rounded-full flex items-center justify-center text-black shadow-sm border border-black/10 flex-shrink-0 cursor-pointer hover:bg-white transition-colors duration-200">
                  <FiStar size={17} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}
