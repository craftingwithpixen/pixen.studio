import { FiInstagram, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SOCIALS = [
  { icon: <FiTwitter size={18} strokeWidth={1.5} />, href: '#', label: 'Twitter' },
  { icon: <FiInstagram size={18} strokeWidth={1.5} />, href: 'https://www.instagram.com/craftingwithpixen', label: 'Instagram' },
  { icon: <FiLinkedin size={18} strokeWidth={1.5} />, href: 'https://www.linkedin.com/company/crafting-with-pixen', label: 'LinkedIn' },
  { icon: <FiGithub size={18} strokeWidth={1.5} />, href: 'https://github.com/craftingwithpixen', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative bg-white pt-16 px-4 md:px-6 pb-0 overflow-hidden flex flex-col items-center">

      {/* Inner Footer Card */}
      <div className="w-full max-w-[1340px] bg-[#0D0D0D] rounded-[36px] border border-white/[0.06] p-8 md:p-12 lg:p-16 relative z-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16 lg:mb-20">

          {/* Left: Brand & Socials */}
          <div className="max-w-[400px]">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img src="/logo-white.png" className="h-[40px] md:h-[48px] object-contain hover:scale-105 transition-transform duration-300" alt="Pixen Logo" />
            </Link>
            <p className="text-white/40 text-[14px] leading-[1.6] mb-8 font-sans">
              Pixen empowers brands to transform raw ideas into bold, compelling digital platforms — making your vision easier to scale, understand, and launch.
            </p>
            <div className="flex items-center gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-white/40 hover:text-[#C8F139] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-20 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-sans font-semibold text-[15px] mb-3">Product</h4>
              <a href="#services" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Features</a>
              <a href="#pricing" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Pricing</a>
              <a href="#integrations" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Integrations</a>
              <a href="#changelog" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Changelog</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-sans font-semibold text-[15px] mb-3">Resources</h4>
              <a href="#docs" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Documentation</a>
              <a href="#tutorials" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Tutorials</a>
              <a href="#blog" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Blog</a>
              <a href="#support" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Support</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-sans font-semibold text-[15px] mb-3">Company</h4>
              <a href="#about" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">About</a>
              <a href="#careers" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Careers</a>
              <Link to="/contact" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Contact</Link>
              <a href="#partners" className="text-white/40 text-[13px] font-sans hover:text-[#C8F139] transition-colors">Partners</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.06] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/35 text-[13px] font-sans">
            © {new Date().getFullYear()} Pixen. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="/privacy-policy" className="text-white/35 text-[13px] font-sans underline hover:text-white transition-colors underline-offset-4">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white/35 text-[13px] font-sans underline hover:text-white transition-colors underline-offset-4">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-white/35 text-[13px] font-sans underline hover:text-white transition-colors underline-offset-4">Cookies Settings</Link>
          </div>
        </div>
      </div>

      {/* Giant background text */}
      <div className="w-full flex justify-center items-end overflow-hidden relative z-0 -mt-[10px] md:-mt-[30px] lg:-mt-[50px] pointer-events-none pt-4 lg:pt-8 bg-transparent">
        <h1
          className="font-sans font-black leading-[0.7] tracking-tighter select-none text-center"
          style={{
            fontSize: '28vw',
            color: 'rgba(0, 0, 0, 0.03)',
            transform: 'translateY(18%)',
            whiteSpace: 'nowrap'
          }}
        >
          PIXEN
        </h1>
      </div>
    </footer>
  );
}
