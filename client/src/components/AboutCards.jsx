import { motion } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiFigma } from 'react-icons/si';

export default function AboutCards() {
  return (
    <section className="bg-brand-bg pb-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_320px] gap-5 items-start">

          {/* ── About card (left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="card flex gap-5 items-start"
          >
            <div className="flex-1 min-w-0">
              <p className="badge mb-3">About us</p>
              <h3 className="text-white font-display font-bold text-xl md:text-2xl leading-tight mb-3">
                HI, My Name<br />Pixen Studio ✌
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Pixen Studio, a visionary digital agency with a passion for crafting immersive digital journeys. With a background in innovative web development, we bring creativity and expertise to every project.
              </p>
            </div>

            {/* Photo / avatar placeholder */}
            <div className="hidden sm:flex flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden border border-brand-border items-center justify-center bg-gradient-to-br from-brand-purple/20 to-brand-dark">
              <span className="text-5xl">👨‍💻</span>
            </div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">

            {/* Mastered Language card (purple) */}
            <motion.a
              href="#technologies"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="block bg-brand-purple hover:bg-brand-violet transition-colors duration-300 rounded-2xl p-5 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <SiReact size={20} className="text-white/80" />
                <SiNodedotjs size={20} className="text-white/80" />
                <SiMongodb size={20} className="text-white/80" />
                <SiTailwindcss size={20} className="text-white/80" />
                <SiFigma size={20} className="text-white/80" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Mastered Language</span>
                <FiArrowRight className="text-white" size={16} />
              </div>
            </motion.a>

            {/* Send email + Hire us row */}
            <div className="flex items-stretch gap-4">
              {/* Email card */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="card flex-1 flex flex-col justify-between min-h-[100px] hover:border-brand-purple/50 transition-colors duration-300 cursor-pointer"
              >
                <p className="text-gray-300 text-sm font-medium leading-[1.6]">
                  send<br />your<br />email
                </p>
                <FiMail className="text-white mt-3 flex-shrink-0" size={20} />
              </motion.a>

              {/* Hire us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="flex-1 flex items-center justify-center"
              >
                <a
                  href="#contact"
                  className="text-white font-semibold text-sm flex items-center gap-1.5 hover:text-brand-light transition-colors duration-200"
                >
                  Hire us <FiArrowRight size={14} />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
