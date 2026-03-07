import { FiInstagram, FiTwitter, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: <FiInstagram size={16} />, href: '#', label: 'Instagram' },
  { icon: <FiTwitter size={16} />, href: '#', label: 'Twitter' },
  { icon: <FiLinkedin size={16} />, href: '#', label: 'LinkedIn' },
  { icon: <FiGithub size={16} />, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-bg pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Logo + tagline */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-3">
              <div
                className="w-[22px] h-[22px] bg-brand-purple rounded-[4px] grid place-items-center text-white"
                style={{ fontSize: 11 }}
              >
                ⊞
              </div>
              <span className="font-display font-bold text-white text-sm tracking-tight">
                PIXEN.STUDIO
              </span>
            </a>
            <p className="text-brand-muted text-[13px] max-w-xs leading-relaxed">
              Crafting high-performance digital products that scale with your ambitions.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-brand-muted hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
              >
                {l.label}
                <FiArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-px"
                />
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/[.04] border border-white/[.06] flex items-center justify-center text-brand-muted hover:bg-brand-purple hover:text-white hover:border-brand-purple/50 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[.06] to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-[10px] uppercase tracking-widest text-brand-muted">
            © {new Date().getFullYear()} Pixen Studio. All rights reserved.
          </p>
          <p className="text-brand-muted text-xs">
            Designed & Built by{' '}
            <span className="gradient-text font-medium">Pixen Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
