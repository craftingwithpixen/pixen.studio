import { FiInstagram, FiLinkedin, FiGithub, FiMail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SOCIALS = [
  { icon: <FiInstagram size={15} />, href: 'https://www.instagram.com/craftingwithpixen', label: 'Instagram' },
  { icon: <FiLinkedin  size={15} />, href: 'https://www.linkedin.com/company/crafting-with-pixen', label: 'LinkedIn'  },
  { icon: <FiGithub    size={15} />, href: 'https://github.com/craftingwithpixen', label: 'GitHub'    },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-bg border-t border-white/[.04] overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-brand-purple/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-brand-violet/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">


        {/* ── Brand + Contact ── */}
        <div className="py-14 flex flex-col sm:flex-row items-start justify-between gap-10 border-b border-white/[.05]">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex mb-5">
              <img src="/logo.png" alt="Pixen Studio" className="h-12 w-auto" />
            </Link>
            <p className="text-brand-muted text-[13px] leading-[1.8] mb-6 max-w-[200px]">
              We craft bold digital products — websites, SaaS platforms & AI tools that scale.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[.04] border border-white/[.07] text-brand-muted hover:bg-brand-purple hover:text-white hover:border-brand-purple/50 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-brand-muted/50 font-bold mb-5">Contact</h4>
            <a
              href="mailto:craftingwithpixen@gmail.com"
              className="group flex items-start gap-3 mb-5"
            >
              <div className="mt-0.5 w-8 h-8 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
                <FiMail size={13} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted/40 mb-0.5">Email</p>
                <p className="text-[13px] text-brand-muted group-hover:text-white transition-colors duration-200 break-all leading-snug">
                  craftingwithpixen@gmail.com
                </p>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-xl bg-white/[.04] border border-white/[.07] flex items-center justify-center text-brand-muted shrink-0">
                <FiMapPin size={13} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted/40 mb-0.5">Location</p>
                <p className="text-[13px] text-brand-muted leading-snug">India</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-widest text-brand-muted/40 font-display">
            © {new Date().getFullYear()} Pixen Studio. All rights reserved.
          </p>
          <a
            href="mailto:craftingwithpixen@gmail.com"
            className="flex items-center gap-1.5 text-[11px] text-brand-muted/40 hover:text-brand-purple transition-colors duration-200"
          >
            <FiMail size={11} />
            craftingwithpixen@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
}

