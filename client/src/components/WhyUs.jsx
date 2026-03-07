import { motion } from 'framer-motion';
import { FiLayers, FiShield, FiZap, FiMessageCircle, FiHeadphones, FiArrowRight } from 'react-icons/fi';

const features = [
  {
    icon: <FiLayers size={22} />,
    title: 'Full-Cycle Expertise',
    desc: "We handle the MERN stack, Next.js frontend, cloud deployment, and security hardening — end to end.",
  },
  {
    icon: <FiShield size={22} />,
    title: 'Security First',
    desc: 'In a world of data breaches, we prioritize security from day one. We build fortresses, not just features.',
  },
  {
    icon: <FiZap size={22} />,
    title: 'Performance Obsessed',
    desc: 'We optimize for Core Web Vitals. Your site loads fast, ranks high, and keeps users engaged.',
  },
  {
    icon: <FiMessageCircle size={22} />,
    title: 'Transparent Communication',
    desc: 'No confusing jargon. We speak your language and keep you in the loop at every stage.',
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: '#6B35D9', top: '10%', right: '-10%' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="badge mb-3 block">Why Choose Us</span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="section-heading max-w-2xl">
              More than just developers. We are your{' '}
              <span className="gradient-text">technical co-pilots.</span>
            </h2>
            <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
              We bring deep technical expertise, transparent processes, and a genuine obsession with quality.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-purple/40 via-brand-light/20 to-transparent" />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_340px]">

          {/* 4 feature cards */}
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-brand-card border border-white/[.06] rounded-2xl p-7 hover:border-brand-purple/40 transition-all duration-300 relative overflow-hidden"
              style={{
                gridColumn: undefined,
                gridRow: undefined,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/[.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                <div className="w-11 h-11 bg-brand-purple/10 text-brand-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-purple/20 transition-colors duration-300">
                  {f.icon}
                </div>
                <h4 className="text-white font-medium text-[15px] mb-2">{f.title}</h4>
                <p className="text-brand-muted text-[13px] leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* ── SPOTLIGHT CARD — right column spanning 2 rows ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden md:col-span-2 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-3"
            style={{
              background: 'linear-gradient(145deg, #5a28c4 0%, #3d1a8f 100%)',
              border: '1px solid rgba(107,53,217,0.4)',
            }}
          >
            {/* Decorative glow inside */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                <FiHeadphones size={24} />
              </div>
              <h3 className="font-display font-semibold text-white text-[1.3rem] leading-snug mb-4">
                Post-Launch<br />Support
              </h3>
              <p className="text-white/65 text-[13px] leading-relaxed mb-3">
                Our relationship doesn't end at launch. We offer ongoing maintenance, SEO adjustments, and scaling support to ensure your product stays ahead of the curve.
              </p>
              <p className="text-white/65 text-[13px] leading-relaxed">
                Whether you need a quick fix or a major update, we're always just a message away.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 bg-white text-[#3d1a8f] font-medium text-sm px-6 py-2.5 rounded-full hover:bg-brand-light hover:text-white transition-colors duration-300 w-fit"
            >
              Start Your Project <FiArrowRight size={15} />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
