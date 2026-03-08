import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-bg/95 backdrop-blur-md border-b border-white/[.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Pixen Studio" className="h-10 w-auto" />
          </Link>

          {/* Header Right */}
          <div className="flex items-center gap-6 sm:gap-8">
              <Link
              to="/our-work"
              className="font-display text-[10px] uppercase tracking-widest text-brand-muted hover:text-white transition-colors duration-200"
            >
              Our Work
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] text-brand-muted hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white block" />
              <span className="w-5 h-[1.5px] bg-white block" />
              <span className="w-3 h-[1.5px] bg-white block" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-brand-bg flex flex-col"
          >
            {/* Top bar */}
            <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between w-full">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                <img src="/logo.png" alt="Pixen Studio" className="h-10 w-auto" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="font-display text-[10px] uppercase tracking-widest text-brand-muted hover:text-white transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center max-w-[1200px] mx-auto px-6 w-full">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 + i * 0.06 }}
                >
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-5 border-b border-white/[.06] last:border-0"
                  >
                    <span
                      className="font-display font-black uppercase text-white group-hover:text-brand-purple transition-colors duration-200"
                      style={{ fontSize: 'clamp(24px, 4.2vw, 48px)', letterSpacing: '-1px', lineHeight: 1.1 }}
                    >
                      {l.label}
                    </span>
                    <FiArrowUpRight
                      size={24}
                      className="text-brand-muted group-hover:text-brand-purple transition-colors opacity-0 group-hover:opacity-100"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom bar */}
            <div className="max-w-[1200px] mx-auto px-6 py-3 w-full border-t border-white/[.06] flex items-center justify-between">
              <p className="text-brand-muted font-display text-[10px] uppercase tracking-widest">
                © {new Date().getFullYear()} PIXEN.STUDIO
              </p>
              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="bg-brand-purple hover:bg-brand-violet text-white font-semibold text-xs px-6 py-3 rounded-full transition-colors duration-200"
              >
                Hire us →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

