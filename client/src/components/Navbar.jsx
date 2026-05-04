import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/', isPage: true },
  { label: 'About us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/our-work', isPage: true },
  { label: 'Contact us', href: '/contact', isPage: true },
];

/* ── Animated hamburger icon ────────────────────────────── */
function HamburgerIcon({ open, color = '#111' }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between cursor-pointer" aria-hidden>
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block w-full h-[2px] rounded-full origin-center"
        style={{ background: color }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-3/4 h-[2px] rounded-full"
        style={{ background: color }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block w-full h-[2px] rounded-full origin-center"
        style={{ background: color }}
      />
    </div>
  );
}

export default function Navbar({ theme = 'auto' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const lightPaths = ['/', '/contact', '/privacy-policy', '/terms-of-service', '/cookie-policy'];
  const isLightPage = lightPaths.includes(location.pathname) || location.pathname.startsWith('/our-work');
  const isDark = theme === 'dark' || (theme === 'auto' && !isLightPage);

  const linkClass = isDark
    ? 'text-[13px] font-sans font-semibold text-white hover:text-[#C8F139] transition-colors uppercase tracking-[0.1em]'
    : 'text-[13px] font-sans font-semibold text-[#111] hover:text-[#6A1DB5] transition-colors uppercase tracking-[0.1em]';

  const ctaClass = isDark
    ? 'font-sans font-semibold text-[13px] px-7 py-3 rounded-full transition-all duration-300 bg-[#6A1DB5] text-white hover:bg-[#4A1285] hover:shadow-[0_8px_24px_rgba(106,29,181,0.4)] flex items-center gap-2'
    : 'font-sans font-semibold text-[13px] px-7 py-3 rounded-full transition-all duration-300 bg-black text-white hover:bg-[#1a1a1a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] flex items-center gap-2';

  // hamburger icon color
  const iconColor = open ? '#ffffff' : (isDark ? '#ffffff' : '#111111');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const scrollToSection = (href) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* ── Fixed header bar ────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? `py-4 ${isDark ? 'bg-[#0D0D0D]/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-white/[0.07]' : 'border-black/[0.06]'} shadow-sm`
            : 'py-6 md:py-9 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center z-[120] relative">
            <img src="logo.png" alt="Logo" className="h-[34px] lg:h-[40px] w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) =>
              l.isPage ? (
                <Link key={l.label} to={l.href} className={linkClass}>{l.label}</Link>
              ) : (
                <button key={l.label} onClick={() => scrollToSection(l.href)} className={linkClass}>{l.label}</button>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className={ctaClass}>
              Start Project <FiArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl relative z-[120]"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon open={open} color={iconColor} />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] bg-[#0D0D0D] flex flex-col overflow-hidden"
          >
            {/* Grid texture */}
            <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
              <defs>
                <pattern id="mnav-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mnav-grid)" />
            </svg>

            {/* Purple ambient glow */}
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(106,29,181,0.15) 0%, transparent 70%)' }}
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(200,241,57,0.06) 0%, transparent 70%)' }}
            />

            {/* Top bar — logo + close */}
            <div className="relative z-10 flex items-center justify-between px-6 py-6 border-b border-white/[0.06]">
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="logo.png" alt="Logo" className="h-9 w-auto brightness-0 invert" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[11px] font-sans font-bold uppercase tracking-[0.18em] cursor-pointer"
              >
                Close
                <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[13px]">✕</span>
              </button>
            </div>

            {/* Nav links */}
            <nav className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 gap-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.isPage ? (
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 border-b border-white/[0.06] last:border-0"
                    >
                      <span
                        className="font-sans font-normal text-white/70 group-hover:text-white transition-colors duration-200 leading-none"
                        style={{ fontSize: 'clamp(28px, 7vw, 52px)', letterSpacing: '-0.02em' }}
                      >
                        {l.label}
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="w-10 h-10 rounded-full bg-[#6A1DB5]/20 border border-[#6A1DB5]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <FiArrowUpRight size={16} className="text-[#6A1DB5]" />
                      </motion.div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(l.href)}
                      className="w-full group flex items-center justify-between py-5 border-b border-white/[0.06] last:border-0 cursor-pointer text-left"
                    >
                      <span
                        className="font-sans font-normal text-white/70 group-hover:text-white transition-colors duration-200 leading-none"
                        style={{ fontSize: 'clamp(28px, 7vw, 52px)', letterSpacing: '-0.02em' }}
                      >
                        {l.label}
                      </span>
                      <motion.div className="w-10 h-10 rounded-full bg-[#6A1DB5]/20 border border-[#6A1DB5]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <FiArrowUpRight size={16} className="text-[#6A1DB5]" />
                      </motion.div>
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Bottom bar — CTA + socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 px-6 sm:px-10 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
            >
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 bg-[#6A1DB5] hover:bg-[#4A1285] text-white font-sans font-semibold text-[13px] px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_8px_28px_rgba(106,29,181,0.4)]"
              >
                Start a project
                <span className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center">
                  <FiArrowUpRight size={13} strokeWidth={2.5} />
                </span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8F139] inline-block" />
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-white/30">Available for new projects</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
