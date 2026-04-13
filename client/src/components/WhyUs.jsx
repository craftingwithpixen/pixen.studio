import { motion } from 'framer-motion';
import { FiPlay, FiSettings, FiTrendingUp, FiFileText, FiTarget, FiZap } from 'react-icons/fi';

export default function WhyUs() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden font-sans">
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

          {/* ── Column 1 ── */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Card 1: Full-Cycle Expertise */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#F5F3FF] rounded-[32px] p-6 relative overflow-hidden h-[240px] border border-[#6A1DB5]/10 flex flex-col justify-start"
            >
              <h3 className="text-[26px] font-sans font-medium leading-[1.1] text-black mt-2">Full-Cycle<br/>Expertise</h3>
              <p className="text-black/50 text-[12px] font-medium mt-3 leading-relaxed max-w-[200px]">We handle the MERN stack, Next.js, cloud deployment, and security — end to end.</p>

              {/* Faint rings */}
              <div className="absolute right-[-60px] top-[60%] -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-[#6A1DB5]/10 pointer-events-none" />
              <div className="absolute right-[0px] top-[60%] -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-[#6A1DB5]/10 pointer-events-none" />

              {/* Avatars */}
              <img src="https://i.pravatar.cc/100?img=11" className="absolute w-9 h-9 rounded-full border-2 border-white top-[45px] right-[110px]" alt="expert"/>
              <img src="https://i.pravatar.cc/100?img=32" className="absolute w-7 h-7 rounded-full border-2 border-white top-[110px] right-[40px]" alt="expert"/>
              <img src="https://i.pravatar.cc/100?img=43" className="absolute w-10 h-10 rounded-full border-2 border-white bottom-[30px] right-[80px]" alt="expert"/>

              <div className="absolute bottom-4 left-6 text-[#6A1DB5]/20 text-xl font-light">+</div>
            </motion.div>

            {/* Card 2: Security First — Vivid Violet solid */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#6A1DB5] rounded-[32px] p-6 relative overflow-hidden h-[180px] flex flex-col justify-end"
            >
              {/* Subtle wavy deco */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,50 Q25,30 50,60 T100,50 L100,100 L0,100 Z" fill="white"/>
              </svg>

              <h3 className="text-[36px] font-sans font-medium leading-[1.1] text-white mb-2 relative z-10">Security<br/>First</h3>
              <p className="text-white/60 text-[13px] font-medium leading-snug relative z-10">We build fortresses,<br/>not just features.</p>
            </motion.div>
          </div>

          {/* ── Column 2 ── */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:-mt-4">

            {/* Card 3: Performance — Photo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-[32px] relative overflow-hidden h-[260px] bg-gray-200"
            >
              <img src="https://images.unsplash.com/photo-1581404917879-53e19259fdda?w=500&auto=format&fit=crop&q=80" alt="Convenient App" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
                <h3 className="text-white text-[20px] md:text-[22px] font-medium drop-shadow-md">Performance Obsessed</h3>
                <p className="text-white/75 text-[13px] font-light mt-1 max-w-[280px]">We optimize for Core Web Vitals. Your site loads fast and ranks high.</p>
              </div>
            </motion.div>

            {/* Card 4: Communication — Ink Black solid */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#0D0D0D] rounded-[32px] p-6 relative overflow-hidden h-[300px] flex flex-col items-center justify-end pb-10"
            >
              <div className="flex gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 border border-white/10">
                  <FiFileText size={18} strokeWidth={1.5}/>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#6A1DB5] flex items-center justify-center text-white shadow-xl -translate-y-3 border border-[#6A1DB5]">
                  <FiTarget size={26} strokeWidth={1.5}/>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 border border-white/10">
                  <FiZap size={18} strokeWidth={1.5}/>
                </div>
              </div>

              <h3 className="text-white text-[20px] font-medium text-center leading-[1.2] relative z-10">Transparent<br/>Communication</h3>
              <p className="text-white/50 text-center text-[13px] mt-3 leading-relaxed px-4 relative z-10">No confusing jargon. We speak your language and keep you in the loop at every stage.</p>
            </motion.div>
          </div>

          {/* ── Column 3 ── */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col gap-5">

            {/* Heading */}
            <div className="h-auto lg:h-[130px] flex flex-col items-start md:items-end justify-end lg:pr-6 mb-2 mt-8 lg:mt-0">
              <h2 className="text-[48px] md:text-[64px] font-sans font-medium tracking-tight text-black leading-none">Why Us?</h2>
            </div>

            {/* Row: In-House stat + Circle button */}
            <div className="flex gap-5 h-[120px]">

              {/* Card 5: 100% In-House — Volt Green solid */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#C8F139] rounded-[32px] p-6 relative overflow-hidden flex-1 flex items-center justify-between"
              >
                <h3 className="text-[44px] font-sans font-medium leading-none text-black relative z-10">100%</h3>
                <p className="text-black/60 text-[11px] font-bold leading-[1.3] text-right relative z-10 w-20 uppercase tracking-wide">In-House<br/>Development</p>
              </motion.div>

              {/* Circle Explore Button */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="rounded-full relative flex-shrink-0 w-[120px] h-[120px] bg-[#F5F3FF] flex items-center justify-center border border-[#6A1DB5]/15 cursor-pointer"
              >
                <FiPlay size={20} className="text-[#6A1DB5] ml-1" strokeWidth={1.5} />
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="text-[10px] uppercase font-bold tracking-[0.2em] fill-[#6A1DB5]">
                    <textPath href="#circlePath" startOffset="0%">explore our process •</textPath>
                  </text>
                </svg>
              </motion.div>
            </div>

            {/* Card 6: Post-Launch Support */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#F5F3FF] rounded-[32px] p-6 lg:p-10 relative overflow-hidden flex-1 min-h-[260px] border border-[#6A1DB5]/10 flex flex-col sm:flex-row"
            >
              <div className="relative z-10 flex flex-col justify-center sm:w-[55%] pb-[180px] sm:pb-0">
                <div className="flex items-center gap-2 mb-4 sm:mb-6 text-[#6A1DB5]">
                  <div className="p-1.5 bg-white rounded-full shadow-sm border border-[#6A1DB5]/10">
                    <FiSettings size={14} className="text-[#6A1DB5]" strokeWidth={1.5}/>
                  </div>
                  <div className="p-1.5 bg-white rounded-full shadow-sm border border-[#6A1DB5]/10">
                    <FiTrendingUp size={14} className="text-[#6A1DB5]" strokeWidth={1.5}/>
                  </div>
                </div>
                <span className="text-[#6A1DB5] text-[10px] uppercase tracking-[0.15em] font-bold mb-2 sm:mb-3 block">Always within reach</span>
                <h3 className="text-black text-[24px] sm:text-[26px] lg:text-[28px] font-sans font-medium leading-[1.15]">
                  Post-Launch Support & Maintenance
                </h3>
                <p className="text-black/50 text-[13px] leading-relaxed mt-3 max-w-[280px]">Our relationship doesn't end at launch. We offer ongoing maintenance, SEO adjustments, and scaling support.</p>
              </div>

              {/* Phone Mockup */}
              <div className="absolute right-4 bottom-0 w-[160px] sm:w-[200px] lg:w-[220px] h-[200px] sm:h-[85%]">
                <div className="w-full h-full bg-white rounded-t-[24px] sm:rounded-t-[32px] shadow-[0_10px_40px_rgba(106,29,181,0.12)] border-[4px] sm:border-[6px] border-[#0D0D0D] border-b-0 overflow-hidden relative pt-6 px-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0D0D0D] rounded-b-[14px]" />

                  <div className="flex justify-between items-center mt-3 mb-6">
                    <h4 className="text-[18px] font-medium leading-none">Support</h4>
                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 border-2 border-gray-300 rounded-full" />
                    </div>
                  </div>

                  {/* Mock UI element — solid brand color */}
                  <div className="w-full h-[120px] rounded-[24px] p-4 relative overflow-hidden flex flex-col justify-end bg-[#6A1DB5]">
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20" />
                    <div className="w-3/4 h-2 bg-white/40 rounded-full mb-2" />
                    <div className="w-1/2 h-2 bg-white/25 rounded-full" />
                    <div className="absolute top-4 right-4 bg-white/15 rounded-full px-2 py-1 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8F139]" />
                      <div className="w-4 h-1.5 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
