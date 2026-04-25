import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

// Brand palette only — no off-brand hues
const ACCENT_COLORS = ['#6A1DB5', '#C8F139', '#A178FA', '#00C2A8'];

// Dark accents get white text, light/bright accents get black text
const textOnAccent = (accent) => accent === '#6A1DB5' ? '#ffffff' : '#000000';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Abhijeet Chavan',
    title: 'Founder',
    company: 'Cogitare Labs',
    quote: 'Pixen delivered an excellent plant detection ML model. Accurate, reliable, and built with real professionalism.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    title: 'CTO',
    company: 'NovaByte',
    quote: 'Outstanding MERN stack expertise. Delivered every sprint on time with exceptional quality.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=700&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Rahul Menon',
    title: 'CEO',
    company: 'Archon Digital',
    quote: 'Our site went from slow and dated to a blazing-fast masterpiece with Core Web Vitals we never thought possible.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=700&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    title: 'Product Lead',
    company: 'Helium Works',
    quote: 'Clear communication throughout. Pixen turned rough wireframes into an elegant, scalable product.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=700&fit=crop&crop=face',
  },
];

export default function Testimonials() {
  const [hovered, setHovered] = useState(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const handleMobileScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidthEstimate = window.innerWidth * 0.85 + 16; // rough estimate based on w-[85vw] + gap-4
    const index = Math.round(scrollLeft / cardWidthEstimate);
    if (index !== activeMobileIdx && index >= 0 && index < TESTIMONIALS.length) {
      setActiveMobileIdx(index);
    }
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #6A1DB5 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 w-full">

          {/* ── RIGHT: TEXT (Moved to top of DOM for mobile logic) ── */}
          <div
            className="lg:order-2 lg:w-[320px] shrink-0 lg:pt-6 flex flex-col justify-center w-full"
          >
            <h2 className="section-heading mb-5">
              Hear it from<br/>
              <span className="text-[#6A1DB5]">our clients.</span>
            </h2>

            <p className="text-black/55 font-sans text-[16px] leading-[1.6] mb-8">
              Real words from real founders who trusted us with their most important work.
            </p>

            {/* Client list (Desktop only) */}
            <div className="hidden lg:flex flex-col gap-3">
              {TESTIMONIALS.map((t, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <motion.div
                    key={t.id}
                    onMouseEnter={() => setHovered(t.id)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      x: hovered === t.id ? 6 : 0,
                      opacity: hovered !== null && hovered !== t.id ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: hovered === t.id ? accent : '#d1d5db',
                        transform: hovered === t.id ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                    <span className="font-sans text-[12px] text-gray-500 group-hover:text-black transition-colors duration-200">
                      {t.name}
                      <span className="text-gray-300 ml-1">· {t.company}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE: PREMIUM SWIPEABLE CARDS ── */}
          <div className="flex flex-col items-center lg:hidden w-full mt-4 pb-8">
            <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
            
            {/* Scroll Gallery */}
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 w-full px-6 pb-4 hide-scroll" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={handleMobileScroll}
            >
              {TESTIMONIALS.map((t, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                const onAccent = textOnAccent(accent);
                
                return (
                  <div 
                    key={t.id} 
                    className="snap-center shrink-0 w-[85vw] max-w-[340px] rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between" 
                    style={{ background: accent, boxShadow: `0 14px 40px ${accent}30` }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1.5 mb-6" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)' }}>
                      {[...Array(5)].map((_, idx) => <FiStar key={idx} size={15} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    
                    {/* Quote */}
                    <p className="font-sans text-[17px] leading-[1.6] mb-8 font-medium" style={{ color: onAccent }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    
                    {/* Profile */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-[3px]" style={{ borderColor: onAccent === '#000000' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
                        <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-[14px]" style={{ color: onAccent }}>{t.name}</p>
                        <p className="font-sans text-[11px] font-bold uppercase tracking-wider mt-0.5" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)' }}>
                          {t.title} · {t.company}
                        </p>
                      </div>
                    </div>

                    {/* Faint Deco Graphic */}
                    <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full pointer-events-none" style={{ background: onAccent === '#000000' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }} />
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 md:gap-2.5 mt-2">
              {TESTIMONIALS.map((t, idx) => {
                const isActive = activeMobileIdx === idx;
                const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <div 
                    key={`dot-${t.id}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '24px' : '8px',
                      background: isActive ? accent : '#E5E7EB'
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* ── DESKTOP: ACCORDION IMAGE CARDS ── */}
          <div
            className="hidden lg:flex lg:order-1 gap-3 h-[460px] flex-1 min-w-0 w-full"
          >
            {TESTIMONIALS.map((t, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const onAccent = textOnAccent(accent);
              const isHovered = hovered === t.id;
              const isCollapsed = hovered !== null && !isHovered;

              return (
                <motion.div
                  key={t.id}
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ flex: isHovered ? 2.2 : isCollapsed ? 0.95 : 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative rounded-[24px] overflow-hidden cursor-pointer"
                  style={{ minWidth: 0 }}
                >
                  {/* Photo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${t.img})`,
                      backgroundSize: 'auto 100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center top',
                    }}
                  />

                  {/* Gradient overlay for legibility */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    }}
                  />

                  {/* COLLAPSED: initials chip */}
                  <AnimatePresence>
                    {!isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1.5"
                      >
                        <div className="flex gap-0.5" style={{ color: accent }}>
                          {[...Array(5)].map((_, idx) => (
                            <FiStar key={idx} size={7} fill="currentColor" strokeWidth={0} />
                          ))}
                        </div>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold font-sans border border-white/20"
                          style={{ background: `${accent}60`, color: onAccent }}
                        >
                          {t.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* EXPANDED: floating info card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.32, delay: 0.06 }}
                        className="absolute bottom-4 left-3 right-3 rounded-[18px] p-5"
                        style={{
                          background: accent,
                          boxShadow: `0 8px 32px ${accent}55`,
                        }}
                      >
                        {/* Stars */}
                        <div className="flex gap-1 mb-2.5" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)' }}>
                          {[...Array(5)].map((_, idx) => (
                            <FiStar key={idx} size={11} fill="currentColor" strokeWidth={0} />
                          ))}
                        </div>

                        {/* Quote */}
                        <p
                          className="font-sans text-[12.5px] leading-[1.65] mb-4 line-clamp-3"
                          style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)' }}
                        >
                          &ldquo;{t.quote}&rdquo;
                        </p>

                        {/* Divider */}
                        <div
                          className="w-8 h-[2px] mb-3 rounded-full"
                          style={{ background: onAccent === '#000000' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }}
                        />

                        {/* Name & role */}
                        <p className="font-sans font-bold text-[13px] leading-tight" style={{ color: onAccent }}>
                          {t.name}
                        </p>
                        <p
                          className="font-sans text-[11px] mt-0.5"
                          style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.65)' }}
                        >
                          {t.title} · {t.company}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
