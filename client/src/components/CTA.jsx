import { motion } from 'framer-motion';
import { FiMail, FiInstagram, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';

const socials = [
  { icon: <FiInstagram size={18} />, href: 'https://www.instagram.com/craftingwithpixen', label: 'Instagram' },
  { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/company/crafting-with-pixen', label: 'LinkedIn' },
  { icon: <FiGithub size={18} />, href: 'https://github.com/craftingwithpixen', label: 'GitHub' },
  { icon: <FiMail size={18} />, href: 'mailto:craftingwithpixen@gmail.com', label: 'Email' },
];

export default function CTA() {
  return (
    <section id="contact" className="py-24 bg-brand-bg relative overflow-hidden">
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
          className="relative"
        >
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
                  Have a project in{' '}
                  <span className="gradient-text">mind?</span>
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
                  <a
                    href="#portfolio"
                    className="bg-transparent border border-white/20 text-white hover:bg-white/10 text-[15px] font-medium px-8 py-3.5 rounded-[12px] transition-all duration-300"
                  >
                    View Our Work
                  </a>
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
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-white/[.06]" />
                  {/* Middle ring */}
                  <div className="absolute inset-8 rounded-full border border-brand-purple/20" />
                  {/* Inner ring */}
                  <div className="absolute inset-16 rounded-full border border-brand-purple/30 bg-brand-purple/[.03]" />
                  {/* Center glow */}
                  <div className="absolute inset-[90px] rounded-full bg-gradient-to-br from-brand-purple to-brand-violet flex items-center justify-center shadow-[0_0_60px_rgba(107,53,217,0.3)]">
                    <FiMail className="text-white w-8 h-8" />
                  </div>

                  {/* Floating orbit dots */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-light/60 animate-pulse" />
                  <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-brand-purple/80 animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-brand-violet/60 animate-pulse" style={{ animationDelay: '1.5s' }} />

                  {/* Labels floating around */}
                  <div className="absolute -top-2 right-8 bg-white/[.04] border border-white/[.08] rounded-full px-4 py-1.5">
                    <span className="text-[11px] text-brand-muted font-medium">Let's Talk →</span>
                  </div>
                  <div className="absolute -bottom-2 left-8 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5">
                    <span className="text-[11px] text-brand-light font-medium">24h Response</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative line */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
      </div>
    </section>
  );
}
