import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiPlay, FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
   const containerRef = useRef(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
   });

   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   // Parallax and scroll-based animations
   const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
   const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
   const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
   const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

   return (
      <section 
         ref={containerRef}
         id="home" 
         className="relative min-h-[110vh] bg-white overflow-hidden pt-6 md:pt-10"
      >
         {/* Background Decorative Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
         </div>

         <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-10">
            {/* Navbar removed — now in App.jsx */}

            <div className="flex flex-col items-center text-center mt-24 md:mt-32 lg:mt-40">
               {/* Animated Badge */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] mb-8"
               >
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple"></span>
                  </span>
                  Crafting the future of digital
               </motion.div>

               {/* Main Headline */}
               <motion.div
                  style={{ y: textY, opacity }}
                  className="max-w-5xl"
               >
                  <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                     className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-medium leading-[0.95] tracking-tight text-black mb-10"
                  >
                     Bold design for <br />
                     <span className="relative">
                        <span className="text-brand-purple italic">ambitious</span>
                        <motion.svg 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 1, delay: 1 }}
                           className="absolute -bottom-2 left-0 w-full h-3 text-brand-green" 
                           viewBox="0 0 300 12" 
                           fill="none" 
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M1 10.5C50 3.5 150 1.5 299 10.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </motion.svg>
                     </span> brands.
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                     className="text-lg md:text-xl lg:text-2xl text-black/60 max-w-2xl mx-auto mb-12 font-sans font-medium"
                  >
                     Pixen is a premium digital studio specializing in high-end UI/UX, 
                     branding, and full-stack development for modern companies.
                  </motion.p>

                   {/* CTA Buttons */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                     className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24"
                  >
                     <Link 
                        to="/contact" 
                        className="group relative px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-black/20"
                     >
                        <span className="relative z-10 flex items-center gap-3 font-bold text-sm">
                           START YOUR PROJECT <FiArrowUpRight className="text-brand-green text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-brand-purple transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                     </Link>
                     <Link 
                        to="/our-work" 
                        className="flex items-center gap-3 px-8 py-5 text-black font-bold hover:text-brand-purple transition-all group"
                     >
                        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white group-hover:border-brand-purple/30 transition-colors">
                           <FiChevronRight size={16} />
                        </div>
                        <span className="text-sm">VIEW OUR WORK</span>
                     </Link>
                  </motion.div>
               </motion.div>
            </div>

            {/* Main Visual Element with Parallax */}
            <motion.div 
               style={{ y: imageY, scale: imageScale }}
               className="relative w-full max-w-7xl mx-auto rounded-[32px] md:rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group"
            >
               <img 
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000" 
                  alt="Modern Digital Studio" 
                  className="w-full h-[450px] md:h-[750px] object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
               
               {/* Overlapping Info Cards */}
               <motion.div 
                  style={{ rotate: badgeRotate }}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="absolute top-10 left-6 md:top-20 md:left-20 hidden sm:block"
               >
                  <div className="backdrop-blur-2xl bg-white/70 p-6 rounded-3xl border border-white/40 shadow-2xl max-w-[280px]">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center text-black shadow-inner">
                           <FiCheckCircle size={24} />
                        </div>
                        <h4 className="font-bold text-black leading-tight">Elite Digital Partner</h4>
                     </div>
                     <p className="text-black/60 text-xs font-medium leading-relaxed">
                        Top 1% rated studio on Clutch with focus on high-performance web solutions.
                     </p>
                  </div>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute bottom-10 right-6 md:bottom-20 md:right-20 hidden sm:block"
               >
                  <div className="backdrop-blur-2xl bg-black/80 p-8 rounded-3xl border border-white/10 shadow-2xl text-white">
                     <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                           <div key={i} className="text-brand-green text-sm">★</div>
                        ))}
                        <span className="ml-2 text-xs font-bold text-white/50">5.0 RATING</span>
                     </div>
                     <h4 className="text-2xl font-display font-medium mb-2">150+</h4>
                     <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Successful Projects Delivered</p>
                     
                     <div className="mt-6 flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                           <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-black object-cover" alt="" />
                        ))}
                        <div className="w-10 h-10 rounded-full bg-brand-purple border-2 border-black flex items-center justify-center text-[10px] font-bold">
                           +2k
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Mobile floating badge */}
               <div className="absolute bottom-6 left-6 block sm:hidden">
                  <div className="bg-brand-green text-black px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg">
                     TOP RATED 2024
                  </div>
               </div>
            </motion.div>

            {/* Bottom Marquee / Clients Section (Optional but adds to modern feel) */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-20 md:mt-32 flex flex-col items-center"
            >
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-10">Trusted by Global Innovators</p>
               <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-2xl font-display font-bold">ADOBE</span>
                  <span className="text-2xl font-display font-bold">STRIPE</span>
                  <span className="text-2xl font-display font-bold">VERCEL</span>
                  <span className="text-2xl font-display font-bold">FRAMER</span>
                  <span className="text-2xl font-display font-bold">NOTION</span>
               </div>
            </motion.div>
         </div>
      </section>
   );
}

