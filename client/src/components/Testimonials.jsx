import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Pixen delivered an excellent plant detection ML model for our project. The model is accurate, reliable, and works perfectly for our needs. Their team was professional, responsive, and clearly skilled in AI development.",
    name: "Abhijeet Chavan",
    title: "Founder, Cogitare Labs",
    avatar: "👤",
    initials: "AC",
    color: "#6B35D9",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden -skew-y-[2deg] origin-center"
      style={{
        background: 'linear-gradient(145deg, #5a28c4 0%, #3d1a8f 100%)',
      }}
    >
      {/* Background elements (Counter-skewed to stay steady) */}
      <div className="pointer-events-none absolute inset-0 skew-y-[2deg]">
        <motion.div
           animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.1]"
          style={{ background: "#ffffff", top: "-20%", left: "-10%" }}
        />
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 skew-y-[2deg]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <span className="badge !text-white/60 mb-3 block">Testimonials</span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="section-heading">
              Trusted by <span className="text-brand-light">Founders</span>
              <br />
              <span className="text-white/90">and Innovative Builders.</span>
            </h2>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
              Don't take our word for it — hear from the people we've worked
              with.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-white/40 via-white/10 to-transparent origin-left scale-x-105" />
        </motion.div>

        {/* TESTIMONIAL CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-[#0f0426]/40 backdrop-blur-3xl border border-white/[.08] rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Decorative Quotation Marks */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 text-brand-purple opacity-[0.08] pointer-events-none"
            >
              <FaQuoteLeft className="w-24 h-24" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 right-10 text-brand-light opacity-[0.08] pointer-events-none"
            >
              <FaQuoteRight className="w-24 h-24" />
            </motion.div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Left: Text Content */}
                    <div className="flex-1">
                      {/* Stars */}
                      <div className="flex gap-1 text-white mb-8">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={14} fill="currentColor" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p
                        className="text-white font-medium leading-relaxed mb-8 max-w-3xl"
                        style={{
                      fontSize: "clamp(18px, 2.5vw, 24px)",
                      letterSpacing: "-0.2px",
                        }}
                      >
                        "{TESTIMONIALS[active].quote}"
                      </p>

                      {/* Author info & Arrows */}
                      <div className="flex items-center justify-between gap-6 flex-wrap">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-16 h-16 rounded-[24px] flex items-center justify-center relative group/avatar cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] group-hover/avatar:shadow-[6px_6px_0px_rgba(0,0,0,0.25)] transition-all duration-300" />
                            <div className="absolute inset-1 bg-white/20 rounded-[20px] backdrop-blur-sm" />
                            <span className="relative z-10 text-3xl filter drop-shadow-md">
                              {TESTIMONIALS[active].avatar}
                            </span>
                            <div className="absolute top-2 left-3 w-3 h-1.5 bg-white/40 rounded-full rotate-[-15deg] blur-[1px]" />
                          </motion.div>
                          <div>
                            <p className="text-white font-display font-bold text-lg uppercase tracking-tight">
                              {TESTIMONIALS[active].name}
                            </p>
                            <p className="text-white/60 text-[12px] uppercase tracking-widest font-medium">
                              {TESTIMONIALS[active].title}
                            </p>
                          </div>
                        </div>

                        {/* Arrows — only show when multiple testimonials */}
                        {TESTIMONIALS.length > 1 && (
                          <div className="flex gap-2">
                            <button
                              onClick={prevTestimonial}
                              className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
                              aria-label="Previous"
                            >
                              <FiChevronLeft size={18} />
                            </button>
                            <button
                              onClick={nextTestimonial}
                              className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
                              aria-label="Next"
                            >
                              <FiChevronRight size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>


                    {/* Pagination Dots — only show when multiple testimonials */}
                    {TESTIMONIALS.length > 1 && (
                    <div className="flex gap-2 mt-6">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          className="transition-all duration-300 rounded-full cursor-pointer"
                          style={{
                            width: active === i ? 24 : 8,
                            height: 8,
                            background:
                              active === i
                                ? "#fff"
                                : "rgba(255,255,255,0.2)",
                          }}
                          aria-label={`Go to testimonial ${i + 1}`}
                        />
                      ))}
                    </div>
                    )}
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
