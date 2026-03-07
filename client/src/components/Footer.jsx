import { FiInstagram, FiTwitter, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  { icon: <FiInstagram size={16} />, href: '#', label: 'Instagram' },
  { icon: <FiTwitter size={16} />, href: '#', label: 'Twitter' },
  { icon: <FiLinkedin size={16} />, href: '#', label: 'LinkedIn' },
  { icon: <FiGithub size={16} />, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-bg pt-20 pb-8 relative overflow-hidden border-t border-white/[.02]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-purple/5 opacity-40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Top row / 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 inline-flex relative group">
              <div
                className="w-[28px] h-[28px] bg-brand-purple/10 border border-brand-purple/20 rounded-[8px] grid place-items-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all duration-300"
                style={{ fontSize: 14 }}
              >
                ⊞
              </div>
              <span className="font-display font-semibold text-white text-base tracking-tight">
                PIXEN.STUDIO
              </span>
            </Link>
            <p className="text-brand-muted text-[13px] max-w-[260px] leading-[1.7] font-light">
              Crafting high-performance digital products that scale with your ambitions.
            </p>
          </div>

         
   

        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[.06] to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-[10px] uppercase tracking-widest text-brand-muted/70">
            © {new Date().getFullYear()} Pixen Studio. All rights reserved.
          </p>
          <p className="text-brand-muted text-[11px] uppercase tracking-widest font-display">
            Designed & Built by{' '}
            <span className="gradient-text font-semibold ml-1">Pixen Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
