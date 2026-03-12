import { motion } from 'framer-motion';
import { FiMail, FiInstagram, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const socials = [
  { icon: <FiInstagram size={18} />, href: 'https://www.instagram.com/craftingwithpixen', label: 'Instagram' },
  { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/company/crafting-with-pixen', label: 'LinkedIn' },
  { icon: <FiGithub size={18} />, href: 'https://github.com/craftingwithpixen', label: 'GitHub' },
  { icon: <FiMail size={18} />, href: 'mailto:craftingwithpixen@gmail.com', label: 'Email' },
];

export default function CTA() {
  return (
    <section id="contact" className="pt-20 pb-10 relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.06]"
          style={{ background: '#6B35D9', top: '20%', left: '-10%' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: '#9B6BFF', bottom: '10%', right: '-5%' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[48px] p-8 md:p-16 lg:p-20 overflow-hidden"
        >
          {/* Decorative glow inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

              {/* Left content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="badge mb-5 block"
                >
                  Get In Touch
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="section-heading mb-6"
                >
                  Have a project <span className="text-brand-light">in mind?</span> <br />
                  <span className="text-white/90">Let's build it together.</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-brand-muted text-[15px] leading-relaxed mb-8 max-w-lg"
                >
                  We'd love to hear about your project. Send us a message and we'll get back to you within 24 hours. Let's build something extraordinary together.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4 mb-10"
                >
                  <a
                    href="mailto:craftingwithpixen@gmail.com"
                    className="bg-brand-purple hover:bg-brand-violet text-white text-[15px] font-medium px-8 py-3.5 rounded-[12px] transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Start Your Project <FiArrowUpRight size={16} />
                  </a>
                  <Link
                    to="/our-work"
                    className="bg-transparent border border-white/20 text-white hover:bg-white/10 text-[15px] font-medium px-8 py-3.5 rounded-[12px] transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                </motion.div>

                
              </div>

              {/* Right — decorative visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-[320px] h-[320px]">
                  {/* Outer ring — slow spin */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-white/[.06]"
                    style={{ borderStyle: 'dashed' }}
                  />
                  {/* Middle ring — counter-spin */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 rounded-full border border-brand-purple/20"
                    style={{ borderStyle: 'dashed' }}
                  />
                  {/* Inner ring — slow pulse scale */}
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-16 rounded-full border border-brand-purple/30 bg-brand-purple/[.03]"
                  />
                  {/* Center glow — breathe */}
                  <motion.div
                    animate={{ boxShadow: [
                      '0 0 40px rgba(107,53,217,0.25)',
                      '0 0 80px rgba(107,53,217,0.5)',
                      '0 0 40px rgba(107,53,217,0.25)',
                    ]}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-[90px] rounded-full bg-gradient-to-br from-brand-purple to-brand-violet flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <FiMail className="text-white w-8 h-8" />
                    </motion.div>
                  </motion.div>

                  {/* Orbiting dot on outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                    style={{ transformOrigin: 'center' }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-light shadow-[0_0_8px_#9B6BFF]" />
                  </motion.div>

                  {/* Orbiting dot on middle ring — opposite direction */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8"
                    style={{ transformOrigin: 'center' }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_6px_#6B35D9]" />
                  </motion.div>

                  {/* Pulsing static dots */}
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/40"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-brand-violet/70"
                  />

                  {/* Labels — float up/down */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-2 right-8 bg-white/[.04] border border-white/[.08] rounded-full px-4 py-1.5"
                  >
                    <span className="text-[11px] text-brand-muted font-medium">Let's Talk →</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    className="absolute -bottom-2 left-8 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5"
                  >
                    <span className="text-[11px] text-brand-light font-medium">24h Response</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
