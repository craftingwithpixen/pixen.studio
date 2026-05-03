import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">

      {/* Subtle light violet circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F5F3FF] rounded-full pointer-events-none -z-10 opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1300px] mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >

        <h2 className="section-heading text-black mb-8 max-w-[800px]">
          Let's build something<br />
          <span className="text-black/25">extraordinary together.</span>
        </h2>

        <p className="text-black/55 font-sans text-[16px] md:text-[18px] leading-[1.65] max-w-[500px] mb-12 font-medium">
          We're ready to turn your vision into reality. Reach out today and let's discuss your next big idea.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/contact"
            className="group bg-[#6A1DB5] hover:bg-[#4A1285] text-white px-8 md:px-10 py-4 rounded-full text-[14px] md:text-[15px] font-bold transition-all shadow-lg shadow-[#6A1DB5]/20 hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            Start Your Project
            <FiArrowUpRight size={18} className="text-[#C8F139] group-hover:rotate-45 transition-transform" strokeWidth={2} />
          </Link>
          <Link
            to="/our-work"
            className="bg-[#F5F3FF] border border-[#6A1DB5]/15 text-black px-8 md:px-10 py-4 rounded-full text-[14px] md:text-[15px] font-bold transition-all hover:bg-[#EDE8FF] hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            View Our Work
          </Link>
        </div>

      </motion.div>
    </section>
  );
}
