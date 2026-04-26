import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/', isPage: true },
  { label: 'About us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/our-work', isPage: true },
  { label: 'Contacts', href: '/contact', isPage: true },
];

export default function Navbar({ theme = 'auto' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const lightPaths = ['/', '/contact', '/privacy-policy', '/terms-of-service', '/cookie-policy'];
  const isLightPage = lightPaths.includes(location.pathname) || location.pathname.startsWith('/our-work');
  const isDark = theme === 'dark' || (theme === 'auto' && !isLightPage);

  const textClass = isDark ? 'text-white' : 'text-[#111]';
  const mutedClass = isDark ? 'text-brand-muted' : 'text-[#666]';
  const linkClass = isDark
    ? 'text-[14px] font-sans font-semibold text-white hover:text-brand-green transition-colors uppercase tracking-wide'
    : 'text-[14px] font-sans font-semibold text-[#111] hover:text-[#6A1DB5] transition-colors uppercase tracking-wide';
  const ctaClass = isDark
    ? 'font-medium font-sans text-[13px] px-8 py-3.5 rounded-full transition-all duration-300 bg-brand-purple text-white hover:scale-105 hover:shadow-[0_10px_30px_rgba(106,29,181,0.45)] flex items-center gap-2'
    : 'font-medium font-sans text-[13px] px-8 py-3.5 rounded-full transition-all duration-300 bg-black text-white hover:scale-105 hover:shadow-lg flex items-center gap-2';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? `py-4 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-white/10' : 'border-black/5'} shadow-sm` 
            : 'py-6 md:py-10 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="logo.png" alt="Logo" className="h-[36px] lg:h-[42px] w-auto" />
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              l.isPage ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className={linkClass}
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.label}
                  onClick={() => scrollToSection(l.href)}
                  className={linkClass}
                >
                  {l.label}
                </button>
              )
            ))}
          </div>

          {/* Header Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
               to="/contact"
               className={ctaClass}
            >
              Start Project <FiArrowUpRight size={18}/>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] cursor-pointer"
              aria-label="Open menu"
            >
              <span className={`w-8 h-[2px] block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
              <span className={`w-8 h-[2px] block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
              <span className={`w-6 h-[2px] block rounded-full transition-colors ${isDark ? 'bg-white' : 'bg-black'}`} />
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
           className={`fixed inset-0 z-[110] flex flex-col ${isDark ? 'bg-brand-bg' : 'bg-[#f4f4f4]'}`}
         >
           {/* Top bar */}
           <div className="container mx-auto px-6 py-6 flex items-center justify-between w-full">
               <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                  <img src="logo.png" alt="Logo" className="h-10 w-auto" />
               </Link>
             <button
               onClick={() => setOpen(false)}
               className={`font-display text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${mutedClass} ${isDark ? 'hover:text-white' : 'hover:text-[#111]'}`}
             >
               Close ✕
             </button>
           </div>
           
           {/* Mobile nav links */}
           <nav className="flex-1 flex flex-col justify-center container mx-auto px-6 w-full">
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
                      className={`group flex items-center justify-between py-5 border-b last:border-0 ${isDark ? 'border-white/[.06]' : 'border-black/5'}`}
                    >
                      <span className={`font-display font-black uppercase transition-colors duration-200 ${textClass} group-hover:text-brand-purple`} style={{ fontSize: 'clamp(24px, 4.2vw, 48px)', letterSpacing: '-1px', lineHeight: 1.1 }}>
                        {l.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(l.href)}
                      className={`w-full text-left group flex items-center justify-between py-5 border-b last:border-0 cursor-pointer ${isDark ? 'border-white/[.06]' : 'border-black/5'}`}
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
