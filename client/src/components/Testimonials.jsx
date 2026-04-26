import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import api from '../utils/api';

// Brand palette only — no off-brand hues
const ACCENT_COLORS = ['#6A1DB5', '#C8F139', '#A178FA', '#00C2A8'];

// Dark accents get white text, light/bright accents get black text
const textOnAccent = (accent) => accent === '#6A1DB5' ? '#ffffff' : '#000000';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleMobileScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const cardWidthEstimate = window.innerWidth * 0.85 + 16;
    const index = Math.round(scrollLeft / cardWidthEstimate);
    if (index !== activeMobileIdx && index >= 0 && index < testimonials.length) {
      setActiveMobileIdx(index);
    }
  };

  if (loading) return null;
  if (testimonials.length === 0) return null;

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

          {/* ── RIGHT: TEXT ── */}
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
              {testimonials.map((t, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <motion.div
                    key={t._id}
                    onMouseEnter={() => setHovered(t._id)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      x: hovered === t._id ? 6 : 0,
                      opacity: hovered !== null && hovered !== t._id ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: hovered === t._id ? accent : '#d1d5db',
                        transform: hovered === t._id ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                    <span className="font-sans text-[12px] text-gray-500 group-hover:text-black transition-colors duration-200">
                      {t.name}
                      <span className="text-gray-300 ml-1">· {t.handle}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── MOBILE: PREMIUM SWIPEABLE CARDS ── */}
          <div className="flex flex-col items-center lg:hidden w-full mt-4 pb-8">
            <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
            
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 w-full px-6 pb-4 hide-scroll" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={handleMobileScroll}
            >
              {testimonials.map((t, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                const onAccent = textOnAccent(accent);
                
                return (
                  <div 
                    key={t._id} 
                    className="snap-center shrink-0 w-[85vw] max-w-[340px] rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between" 
                    style={{ background: accent, boxShadow: `0 14px 40px ${accent}30` }}
                  >
                    <div className="flex gap-1.5 mb-6" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)' }}>
                      {[...Array(5)].map((_, idx) => <FiStar key={idx} size={15} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    
                    <p className="font-sans text-[17px] leading-[1.6] mb-8 font-medium" style={{ color: onAccent }}>
                      &ldquo;{t.message}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-[3px]" style={{ borderColor: onAccent === '#000000' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
                        <img src={t.avatar || 'https://via.placeholder.com/100'} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-[14px]" style={{ color: onAccent }}>{t.name}</p>
                        <p className="font-sans text-[11px] font-bold uppercase tracking-wider mt-0.5" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)' }}>
                          {t.handle} · {t.platform}
                        </p>
                      </div>
                    </div>

                    <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full pointer-events-none" style={{ background: onAccent === '#000000' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }} />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 md:gap-2.5 mt-2">
              {testimonials.map((t, idx) => {
                const isActive = activeMobileIdx === idx;
                const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <div 
                    key={`dot-${t._id}`}
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
            {testimonials.map((t, i) => {
              const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const onAccent = textOnAccent(accent);
              const isHovered = hovered === t._id;
              const isCollapsed = hovered !== null && hovered !== t._id;

              return (
                <motion.div
                  key={t._id}
                  onMouseEnter={() => setHovered(t._id)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{ flex: isHovered ? 2.2 : isCollapsed ? 0.95 : 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative rounded-[24px] overflow-hidden cursor-pointer"
                  style={{ minWidth: 0 }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${t.avatar || 'https://via.placeholder.com/400x700'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    }}
                  />

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
                        <div className="flex gap-1 mb-2.5" style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)' }}>
                          {[...Array(5)].map((_, idx) => (
                            <FiStar key={idx} size={11} fill="currentColor" strokeWidth={0} />
                          ))}
                        </div>

                        <p
                          className="font-sans text-[12.5px] leading-[1.65] mb-4 line-clamp-3"
                          style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)' }}
                        >
                          &ldquo;{t.message}&rdquo;
                        </p>

                        <div
                          className="w-8 h-[2px] mb-3 rounded-full"
                          style={{ background: onAccent === '#000000' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.3)' }}
                        />

                        <p className="font-sans font-bold text-[13px] leading-tight" style={{ color: onAccent }}>
                          {t.name}
                        </p>
                        <p
                          className="font-sans text-[11px] mt-0.5"
                          style={{ color: onAccent === '#000000' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.65)' }}
                        >
                          {t.handle} · {t.platform}
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
