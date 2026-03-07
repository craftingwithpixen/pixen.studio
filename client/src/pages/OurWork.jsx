import { motion } from 'framer-motion';

export default function OurWork() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
          <span className="text-[10px] font-display uppercase tracking-widest font-semibold">
            Our Work
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
          Selected Projects
        </h1>
        <p className="text-brand-muted text-lg max-w-2xl mb-16">
          Explore some of our recent work and see how we've helped brands transform their digital presence.
        </p>

        {/* Temporary Placeholder grid for projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
             <div key={item} className="group relative rounded-2xl overflow-hidden bg-brand-dark border border-white/[.04] aspect-[4/3] cursor-pointer">
                <div className="absolute inset-0 bg-[#D9D9D9]/5 group-hover:scale-105 transition-transform duration-700 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Project Name {item}</h3>
                  <p className="text-brand-muted font-light">Web Design & Development</p>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-0"></div>
             </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
