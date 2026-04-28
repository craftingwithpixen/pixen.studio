import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiStar, FiCommand } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function Hero() {
   const { scrollY } = useScroll();
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   // Responsive scatter values
   const sc_x1 = isMobile ? [-20, 0] : [-60, 0];
   const sc_x2 = isMobile ? [-15, 0] : [-50, 0];
   const sc_x3 = isMobile ? [15, 0] : [50, 0];
   const sc_x4 = isMobile ? [20, 0] : [60, 0];

   const sc_y1 = isMobile ? [20, 0] : [40, 0];
   const sc_y2 = isMobile ? [-15, 0] : [-30, 0];
   const sc_y3 = isMobile ? [10, 0] : [20, 0];
   const sc_y4 = isMobile ? [-60, 0] : [-120, 0];

   // Randomly scattered positions that settle to 0 rotation/translation as the user scrolls
   const x1 = useTransform(scrollY, [0, 250], sc_x1);
   const y1 = useTransform(scrollY, [0, 250], sc_y1);
   const r1 = useTransform(scrollY, [0, 250], [-18, 0]);

   const x2 = useTransform(scrollY, [0, 250], sc_x2);
   const y2 = useTransform(scrollY, [0, 250], sc_y2);
   const r2 = useTransform(scrollY, [0, 250], [14, 0]);

   const x3 = useTransform(scrollY, [0, 250], sc_x3);
   const y3 = useTransform(scrollY, [0, 250], sc_y3);
   const r3 = useTransform(scrollY, [0, 250], [-22, 0]);

   const x4 = useTransform(scrollY, [0, 250], sc_x4);
   const y4 = useTransform(scrollY, [0, 250], sc_y4);
   const r4 = useTransform(scrollY, [0, 250], [18, 0]);
   return (
      <section id="home" className="bg-white w-full pt-6 md:pt-10 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 overflow-hidden relative">
         <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-[1380px] mx-auto"
         >


            {/* INLINE NAVBAR */}
            <Navbar />

            {/* TOP HEADER SECTION */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 lg:gap-14 relative z-10 w-full mb-10 sm:mb-14 lg:mb-20">
               <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="text-[34px] sm:text-[42px] md:text-[64px] lg:text-[76px] xl:text-[84px] font-sans font-light leading-[0.98] tracking-[-0.03em] text-black max-w-[850px]"
               >
                  Crafting <span className="font-medium text-[#6A1DB5]">bold</span> ideas<br className="hidden sm:block" /> into digital products
               </motion.h1>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                  className="w-full max-w-[420px] lg:max-w-[320px] flex flex-col gap-4 sm:gap-5 pt-0 lg:pt-0"
               >
                  <p className="text-[16px] text-black/70 font-sans leading-[1.5] font-medium">
                     Pixen turns bold concepts into powerful platforms. Achieve your goals with our state-of-the-art solutions.
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                     <div className="flex -space-x-3">
                        <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                        <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                        <img src="https://i.pravatar.cc/100?img=44" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="team" />
                     </div>
                     <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-black/50 sm:pl-2">Join our clients</span>
                  </div>
               </motion.div>


            </div>

            {/* BENTO GRID */}
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
               className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 relative"
            >
               {/* Left Column */}
               <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-5">
                  {/* Vivid Violet Card */}
                  <motion.div style={{ x: x1, y: y1, rotate: r1 }} className="min-h-[260px] sm:h-[280px] bg-[#6A1DB5] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden group shadow-[0_10px_30px_rgba(106,29,181,0.2)]">
                     {/* Subtle background rings */}
                     <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="150" fill="none" stroke="white" strokeWidth="30" />
                        <circle cx="350" cy="350" r="200" fill="none" stroke="white" strokeWidth="40" />
                     </svg>

                     <div className="flex justify-between items-start relative z-10 w-full">
                        <div className="flex flex-wrap gap-2">
                           <span className="bg-[#A178FA] text-white px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide">Web Development</span>
                           <span className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide border border-black/10">SaaS UI</span>
                        </div>
                        <div className="w-10 h-10 bg-[#6A1DB5] text-white rounded-full flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 cursor-pointer">
                           <FiArrowUpRight size={20} strokeWidth={2} />
                        </div>
                     </div>

                     <div className="relative z-10 flex justify-between items-end w-full">
                        <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-sans font-medium leading-[1.05] tracking-tight">Flexible, tailored<br />tech solutions</h3>
                        <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-white/20 shadow-lg flex-shrink-0 bg-white">
                           <img src="https://i.pravatar.cc/100?img=47" alt="avatar" className="w-full h-full object-cover" />
                        </div>
                     </div>
                  </motion.div>

                  {/* Ink Black Quote Card */}
                  <motion.div style={{ x: x2, y: y2, rotate: r2 }} className="hidden md:flex min-h-[220px] bg-[#0D0D0D] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 text-white relative flex-col justify-center shadow-lg">
                     <span className="text-[110px] font-serif text-white/8 absolute -top-4 left-4 leading-none block select-none">"</span>
                     <p className="text-white/75 text-[14px] leading-[1.65] font-sans relative z-10 pr-6 mt-4 mb-6 font-medium">
                        Our cutting-edge technology adapts to your needs and provides a tailored platform that helps you succeed.
                     </p>
                     <div className="flex items-center gap-3 relative z-10">
                        <img src="https://i.pravatar.cc/100?img=33" className="w-11 h-11 rounded-full object-cover" alt="Tutor" />
                        <div>
                           <p className="text-[14px] font-bold font-sans text-white">Pixen Team</p>
                           <p className="text-[12px] text-white/40 font-sans font-medium">Innovators</p>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Middle Column */}
               <div className="hidden md:flex md:col-span-6 lg:col-span-3 flex-col justify-end">
                  <motion.div style={{ x: x3, y: y3, rotate: r3 }} className="min-h-[240px] lg:h-[280px] bg-[#C8F139] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 pb-8 sm:pb-10 text-black relative flex flex-col justify-end text-center mt-8 sm:mt-10 lg:mt-0 shadow-[0_10px_30px_rgba(200,241,57,0.2)]">
                     {/* Floating top badge */}
                     <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center">
                        <div className="relative flex flex-col items-center gap-0.5 opacity-80">
                           <div className="w-2.5 h-2.5 bg-black rounded-full" />
                           <div className="w-5 h-2.5 bg-black rounded-full" />
                        </div>
                     </div>

                     {/* Background wave doodle */}
                     <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200">
                        <path fill="none" stroke="black" strokeWidth="8" d="M10,120 Q50,40 100,120 T190,120" />
                        <path fill="none" stroke="black" strokeWidth="8" d="M30,160 Q80,80 130,160" />
                     </svg>

                     <p className="text-[12px] font-bold opacity-70 mb-2 font-sans tracking-wide uppercase">Proven track record</p>
                     <h3 className="text-[22px] sm:text-[24px] md:text-[26px] font-sans font-bold tracking-tight leading-[1.0]">158+ successful<br />projects!</h3>
                  </motion.div>
               </div>

               {/* Right Column */}
               <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end gap-4 sm:gap-5 relative">

                  {/* Faint Purple CTA Card */}
                  <motion.div style={{ x: x4, y: y4, rotate: r4 }} className="min-h-[300px] lg:h-[340px] bg-[#E0F7F5] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 text-black relative flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,194,168,0.12)]">
                     <div className="relative z-10">
                        <h4 className="text-[22px] sm:text-[24px] font-sans font-bold mb-2 sm:mb-3 tracking-tight">Need a custom app?</h4>
                        <p className="text-[14px] text-black/60 leading-[1.5] mb-4 sm:mb-5 font-sans font-medium sm:pr-6">
                           Enjoy priority development and support from our expert team. Experience the future of web tech.
                        </p>

                        <div className="inline-flex bg-black/10 text-black border border-black/10 text-[10px] font-bold uppercase tracking-[0.1em] px-5 py-2.5 rounded-full w-fit mb-auto">
                           Start project
                        </div>
                     </div>


                     <div className="absolute -right-4 sm:-right-2 bottom-14 sm:bottom-16 w-28 h-28 sm:w-32 sm:h-32 bg-black/10 rounded-full blur-2xl pointer-events-none" />

                     {/* Bottom buttons */}
                     <div className="flex gap-3 items-center mt-3 relative z-10 w-full pt-4">
                        <Link to="/contact" className="flex-1 bg-black hover:bg-black/80 text-white py-3.5 rounded-full text-center text-[13px] font-bold transition-colors">
                           Get started
                        </Link>
                        <div className="w-[46px] h-[46px] bg-white/20 rounded-full flex items-center justify-center text-black shadow-sm border border-black/10 flex-shrink-0 cursor-pointer hover:bg-white/30 transition-colors">
                           <FiStar size={18} strokeWidth={1.5} />
                        </div>
                     </div>
                  </motion.div>

               </div>

            </motion.div>
         </motion.div>
      </section>
   );
}
