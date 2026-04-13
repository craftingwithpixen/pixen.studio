import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/our-work', isPage: true },
  { label: 'Contacts', href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Styling based on current page
  const textClass = isHome ? 'text-[#111]' : 'text-white';
  const mutedClass = isHome ? 'text-[#666]' : 'text-brand-muted';
  const bgClass = isHome ? 'bg-transparent' : 'bg-transparent';
  const scrolledBgClass = isHome ? 'bg-[#f4f4f4]/95 border-[#ddd]' : 'bg-brand-bg/95 border-white/[.06]';

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

  const scrollToSection = (href) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
         window.location.href = href;
      } else {
         const element = document.getElementById(id);
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
      }
    }
  };

  return (
    <>
      <header className="w-full relative z-50 mb-10 lg:mb-16">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="logo.png" alt="Logo" className="h-[40px] lg:h-[48px] w-auto" />
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              l.isPage ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-[14px] font-sans font-semibold text-[#111] hover:text-[#6A1DB5] transition-colors uppercase tracking-wide"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.label}
                  onClick={() => scrollToSection(l.href)}
                  className="text-[14px] font-sans font-semibold text-[#111] hover:text-[#6A1DB5] transition-colors uppercase tracking-wide"
                >
                  {l.label}
                </button>
              )
            ))}
          </div>

          {/* Header Right */}
          <div className="hidden lg:flex items-center gap-3">
            <button
               onClick={() => scrollToSection('/#contact')}
               className="font-medium font-sans text-[13px] px-8 py-3.5 rounded-full transition-all duration-300 bg-black text-white hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              Start Project <FiArrowUpRight size={18}/>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] cursor-pointer"
              aria-label="Open menu"
            >
              <span className="w-8 h-[2px] block bg-black rounded-full" />
              <span className="w-8 h-[2px] block bg-black rounded-full" />
              <span className="w-6 h-[2px] block bg-black rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
           <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.2 }}
           className={`fixed inset-0 z-[100] flex flex-col ${isHome ? 'bg-[#f4f4f4]' : 'bg-brand-bg'}`}
         >
           {/* Top bar */}
           <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between w-full">
               <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                  <img src="logo.png" alt="Logo" className="h-10 w-auto" />
               </Link>
             <button
               onClick={() => setOpen(false)}
               className={`font-display text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${mutedClass} hover:${textClass}`}
             >
               Close ✕
             </button>
           </div>
           
           {/* Mobile nav links */}
           <nav className="flex-1 flex flex-col justify-center max-w-[1400px] mx-auto px-6 w-full">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 + i * 0.06 }}
                >
                  {l.isPage ? (
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between py-5 border-b last:border-0 ${isHome ? 'border-black/5' : 'border-white/[.06]'}`}
                    >
                      <span className={`font-display font-black uppercase transition-colors duration-200 ${textClass} group-hover:text-brand-purple`} style={{ fontSize: 'clamp(24px, 4.2vw, 48px)', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        {l.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(l.href)}
                      className={`w-full text-left group flex items-center justify-between py-5 border-b last:border-0 cursor-pointer ${isHome ? 'border-black/5' : 'border-white/[.06]'}`}
                    >
                      <span className={`font-display font-black uppercase transition-colors duration-200 ${textClass} group-hover:text-brand-purple`} style={{ fontSize: 'clamp(24px, 4.2vw, 48px)', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        {l.label}
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}
           </nav>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
