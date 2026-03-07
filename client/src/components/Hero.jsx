import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiPenTool } from 'react-icons/fi';

export default function Hero() {
  return (
    <section id="home" className="bg-brand-bg px-6 pt-16 pb-10 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-brand-violet/20 rounded-full blur-[100px] mix-blend-screen animate-pulse pointer-events-none"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-[1200px] mx-auto rounded-[28px]  bg-brand-bg/80 backdrop-blur-sm p-5 sm:p-8 md:p-10 lg:p-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]  items-start">
          <div className="flex flex-col items-start lg:pr-10 min-h-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: 'clamp(48px, 6vw, 76px)' }}
            >
              Crafting Ideas
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light via-brand-purple to-brand-violet animate-gradient-x inline-block mt-2">
                Pixel by <br/> Pixel.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-brand-muted text-[17px] max-w-[500px] mb-8 leading-relaxed font-light"
            >
              Pixen turns bold ideas into powerful digital products. We create high-performance websites, scalable SaaS platforms, and mobile apps that deliver exceptional user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="#contact"
                className="bg-brand-purple hover:bg-brand-violet text-white text-[15px] font-medium px-8 py-3.5 rounded-[12px] transition-all duration-300"
              >
                Start Your Project
              </a>
              <a
                href="#services"
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 text-[15px] font-medium px-8 py-3.5 rounded-[12px] transition-all duration-300"
              >
                Our Services
              </a>
            </motion.div>

            
          </div>

          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {/* ── Card 1: Web & App Development ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-[90%] lg:ml-auto rounded-[24px] p-8 md:p-10 relative overflow-hidden bg-brand-card-2 border border-white/[0.06] min-h-[290px] flex flex-col justify-end"
            >
              {/* Decorative code lines */}
              <div className="absolute top-6 right-6 w-[200px] space-y-2.5 opacity-[0.12]">
                <div className="flex gap-2">
                  <div className="h-2 w-8 bg-brand-purple rounded-full" />
                  <div className="h-2 w-16 bg-white rounded-full" />
                  <div className="h-2 w-10 bg-brand-light rounded-full" />
                </div>
                <div className="flex gap-2 pl-4">
                  <div className="h-2 w-12 bg-brand-light rounded-full" />
                  <div className="h-2 w-20 bg-white rounded-full" />
                </div>
                <div className="flex gap-2 pl-4">
                  <div className="h-2 w-6 bg-white rounded-full" />
                  <div className="h-2 w-14 bg-brand-purple rounded-full" />
                  <div className="h-2 w-8 bg-brand-light rounded-full" />
                </div>
                <div className="flex gap-2 pl-8">
                  <div className="h-2 w-16 bg-brand-purple rounded-full" />
                  <div className="h-2 w-6 bg-white rounded-full" />
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-10 bg-white rounded-full" />
                  <div className="h-2 w-12 bg-brand-light rounded-full" />
                </div>
              </div>

              {/* Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-brand-purple rounded-2xl flex items-center justify-center shadow-[0_4px_30px_rgba(107,53,217,0.4)]">
                <FiCode className="text-white w-7 h-7" />
              </div>

              {/* Concentric rounded-rects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-brand-purple/15 rounded-3xl rotate-6" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-white/[.04] rounded-[40px] -rotate-3" />

              <div className="relative z-10">
                <span className="text-brand-light text-[13px] font-medium mb-1 block">Web & App Development</span>
                <h3 className="text-white text-2xl md:text-[26px] font-display font-medium leading-[1.2]">
                  Custom-built sites
                  <br />
                  that convert & scale
                </h3>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[280px] ">
              {/* ── Card 2: SaaS & Platforms ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-brand-purple rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-end border border-white/[0.06]"
              >
                {/* Abstract layered cards visual */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120px] h-[100px] flex items-center justify-center">
                  <div className="absolute w-[80px] h-[55px] rounded-xl bg-white/10 border border-white/20 -translate-y-3 -translate-x-3 backdrop-blur-md" />
                  <div className="absolute w-[80px] h-[55px] rounded-xl bg-white/15 border border-white/25 translate-y-0 translate-x-0 backdrop-blur-md" />
                  <div className="absolute w-[80px] h-[55px] rounded-xl bg-white/25 border border-white/35 translate-y-3 translate-x-3 backdrop-blur-md shadow-lg z-10 flex items-center justify-center">
                    <FiLayers className="text-white w-6 h-6" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="text-white/80 text-[13px] mb-1 block font-medium">SaaS & Platforms</span>
                  <h3 className="text-white text-xl font-display font-medium leading-[1.2]">
                    Applications
                    <br />
                    built to grow
                  </h3>
                </div>
              </motion.div>

              {/* ── Card 3: UI/UX Design ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-brand-card rounded-[24px] p-8 relative overflow-hidden flex flex-col justify-end border border-white/[0.06]"
              >
                {/* Abstract design grid */}
                <div className="absolute top-5 right-5 grid grid-cols-3 gap-1.5 opacity-20">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-md"
                      style={{
                        width: 18,
                        height: 18,
                        background: i === 4 ? '#6B35D9' : i % 3 === 0 ? '#9B6BFF' : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>

                {/* Pen tool icon */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-xl bg-brand-purple/15 border border-brand-purple/25 flex items-center justify-center">
                  <FiPenTool className="text-brand-light w-5 h-5" />
                </div>

                <div className="relative z-10">
                  <span className="text-brand-muted text-[13px] font-medium mb-1 block">UI / UX Design</span>
                  <h3 className="text-white text-xl font-display font-medium leading-[1.2]">
                    Pixel-perfect
                    <br />
                    interfaces
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
