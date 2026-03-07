import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Pixen Studio completely transformed our online presence. The website they built loads in under a second and our conversion rate jumped 40% within the first month. Truly exceptional work.",
    name: 'Sarah Mitchell',
    title: 'CEO of Hummingbird',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    quote: "From day one, the team communicated clearly and delivered on every promise. The SaaS platform they built handles thousands of users without breaking a sweat. Outstanding technical depth.",
    name: 'James Okafor',
    title: 'CTO of Stackly',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    quote: "We hired Pixen for a full redesign and got way more than expected — the UI is stunning, the code is clean, and post-launch support has been incredible. They are the real deal.",
    name: 'Lena Fischer',
    title: 'Product Lead at Veltro',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background orb */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: '#6B35D9', top: '20%', left: '-5%' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <span className="badge mb-3 block">Testimonials</span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="section-heading">
              Trusted by founders<br />
              <span className="gradient-text">and builders.</span>
            </h2>
            <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
              Don't take our word for it — hear from the people we've worked with.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-purple/40 via-brand-light/20 to-transparent" />
        </motion.div>

        {/* TESTIMONIAL CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="bg-brand-card border border-white/[.06] rounded-[32px] p-10 md:p-14 relative overflow-hidden">

            {/* Decorative glows */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

            {/* Big decorative quote mark */}
            <div
              className="absolute top-8 right-10 font-display font-black select-none pointer-events-none opacity-[0.04]"
              style={{ fontSize: 140, lineHeight: 1, color: '#9B6BFF' }}
              aria-hidden="true"
            >
              "
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-400 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className="text-white font-medium leading-relaxed mb-10 max-w-3xl"
                    style={{ fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '-0.2px' }}
                  >
                    "{TESTIMONIALS[active].quote}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={TESTIMONIALS[active].avatar}
                        alt={TESTIMONIALS[active].name}
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-white/10"
                      />
                      <div>
                        <p className="text-white font-medium text-[15px]">{TESTIMONIALS[active].name}</p>
                        <p className="text-brand-muted text-[12px]">{TESTIMONIALS[active].title}</p>
                      </div>
                      <div
                        className="hidden sm:flex text-[10px] font-medium px-3 py-1.5 rounded-full uppercase tracking-wider"
                        style={{ background: 'rgba(107,53,217,0.15)', border: '1px solid rgba(107,53,217,0.3)', color: '#9B6BFF' }}
                      >
                        Verified
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-3">
                      {/* Dots indicator */}
                      <div className="flex gap-1.5">
                        {TESTIMONIALS.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="transition-all duration-300 rounded-full cursor-pointer"
                            style={{
                              width: active === i ? 24 : 6,
                              height: 6,
                              background: active === i ? '#6B35D9' : 'rgba(255,255,255,0.15)',
                            }}
                            aria-label={`Go to testimonial ${i + 1}`}
                          />
                        ))}
                      </div>

                      {/* Arrow buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={prevTestimonial}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full bg-white/[.04] border border-white/[.08] flex items-center justify-center text-white hover:bg-brand-purple hover:border-brand-purple transition-all duration-200 cursor-pointer"
                          aria-label="Previous testimonial"
                        >
                          <FiChevronLeft size={16} />
                        </motion.button>
                        <motion.button
                          onClick={nextTestimonial}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-9 h-9 rounded-full bg-white/[.04] border border-white/[.08] flex items-center justify-center text-white hover:bg-brand-purple hover:border-brand-purple transition-all duration-200 cursor-pointer"
                          aria-label="Next testimonial"
                        >
                          <FiChevronRight size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
