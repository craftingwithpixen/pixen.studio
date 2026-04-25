import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiLayout, FiCode, FiShield, FiZap, FiTrendingUp } from 'react-icons/fi';

// All colors from brand palette only — no off-brand hues
const timelineData = [
  { type: 'node', label: 'JAN', step: { title: 'Discovery', desc: 'Dive deep into your business goals, target audience, and requirements.', icon: FiSearch }, color: '#6A1DB5', textColor: '#FFFFFF', drop: 'long' },
  { type: 'dot', label: 'FEB' },
  { type: 'node', label: 'MAR', step: { title: 'Architecture', desc: 'Craft the UX/UI and design system while our architects set up.', icon: FiLayout }, color: '#C8F139', textColor: '#000000', drop: 'short' },
  { type: 'dot', label: 'APR' },
  { type: 'node', label: 'MAY', step: { title: 'Development', desc: 'Build the product using the MERN stack with rigorous QA testing.', icon: FiCode }, color: '#A178FA', textColor: '#000000', drop: 'long' },
  { type: 'dot', label: 'JUN' },
  { type: 'node', label: 'JUL', step: { title: 'Security Audit', desc: 'Comprehensive security scans and tests to lock down your app.', icon: FiShield }, color: '#00C2A8', textColor: '#000000', drop: 'short' },
  { type: 'dot', label: 'AUG' },
  { type: 'node', label: 'SEP', step: { title: 'Deployment', desc: 'Deploy to production and monitor real-time performance metrics.', icon: FiZap }, color: '#F5F3FF', textColor: '#000000', drop: 'long' },
  { type: 'dot', label: 'OCT' },
  { type: 'node', label: 'NOV', step: { title: 'Training & Scale', desc: 'Post-launch support and optimization so your product scales.', icon: FiTrendingUp }, color: '#F5A623', textColor: '#000000', drop: 'short' },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const timelineNodes = timelineData.filter((x) => x.type === 'node');

  return (
    <section
      id="process"
      className="bg-white py-16 sm:py-24 md:py-32 relative z-10 font-sans text-black border-t border-white/5"
      style={{ color: '#000' }}
    >
      <div className="overflow-hidden relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1300px] mx-auto px-4 sm:px-6"
        >

          {/* ── HEADER ── */}
          <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col items-center text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-heading text-black"
            >
              How we turn ideas<br />
              <span className="text-[#6A1DB5]">into reality.</span>
            </motion.h2>
          </div>

          {/* ── HORIZONTAL TIMELINE (DESKTOP) ── */}
          <div className="relative hidden xl:block mt-20 w-full h-[550px]">

            {/* Main horizontal line */}
            <div className="absolute left-[2%] right-[8%] top-[60px] h-[1px] bg-black/10 z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, ease: 'easeOut', transformOrigin: 'left' }}
                className="h-full w-full bg-black/30"
              />
            </div>

            {/* Nodes Container */}
            <div className="absolute left-[2%] right-[8%] top-[60px] flex justify-between items-center -translate-y-1/2 z-10 w-auto">
              {timelineData.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center">

                  {item.type === 'dot' ? (
                    <div className="w-[6px] h-[6px] rounded-full bg-white/30 z-10" />
                  ) : (
                    <>
                      {/* Circle node */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.1, type: 'spring' }}
                        className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative z-20"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 20px ${item.color}44`,
                        }}
                      >
                        <item.step.icon size={20} color={item.textColor} strokeWidth={1.5} />
                      </motion.div>

                      {/* Curved drop line */}
                      <div
                        className="absolute left-[50%] top-[50%] z-0 pointer-events-none overflow-visible"
                        style={{ height: item.drop === 'long' ? '300px' : '150px', width: '200px' }}
                      >
                        <motion.div
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.7, delay: i * 0.1 + 0.3 }}
                          className="w-full h-full"
                        >
                          <svg width="200" height={item.drop === 'long' ? 280 : 130} fill="none" className="overflow-visible">
                            <path
                              d={`M 0 0 L 0 ${item.drop === 'long' ? 260 : 110} Q 0 ${item.drop === 'long' ? 275 : 125} 15 ${item.drop === 'long' ? 275 : 125} L 60 ${item.drop === 'long' ? 275 : 125}`}
                              stroke="rgba(0,0,0,0.50)"
                              strokeWidth="1.5"
                              fill="transparent"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Content text */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.1 + 0.6 }}
                        className="absolute text-left"
                        style={{
                          left: 'calc(50% + 15px)',
                          top: `calc(50% + ${item.drop === 'long' ? 275 : 125}px + 10px)`,
                          width: '180px'
                        }}
                      >
                        <h3
                          className="font-sans font-bold text-[15px] mb-2 text-black"
                          style={{ color: '#000' }}
                        >
                          {item.step.title}
                        </h3>
                        <p className="text-black text-[12px] leading-[1.6]">
                          {item.step.desc}
                        </p>
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── MOBILE VERTICAL TIMELINE ── */}
          <div className="xl:hidden relative mt-10 sm:mt-14">
            <div className="absolute left-[17px] sm:left-[19px] top-3 bottom-3 w-px bg-white/10" />

            <div className="flex flex-col gap-8 sm:gap-10">
              {timelineNodes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-4 sm:gap-6"
                >
                  <div className="flex flex-col items-center gap-2 mt-0.5">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center z-10 shrink-0"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 16px ${item.color}44`,
                      }}
                    >
                      <item.step.icon size={15} color={item.textColor} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0 pr-1">
                    <h3 className="font-sans font-bold text-[16px] sm:text-[18px] mb-2 text-black" style={{ color: '#000' }}>
                      {item.step.title}
                    </h3>
                    <p className="text-black text-[13px] sm:text-[14px] leading-[1.6] max-w-[34ch]">
                      {item.step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* White scoop arch — transitions to light section */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white"
        style={{
          height: 'clamp(52px, 10vw, 80px)',
          borderTopLeftRadius: 'clamp(52px, 10vw, 80px)',
          borderTopRightRadius: 'clamp(52px, 10vw, 80px)',
        }}
      />
    </section>
  );
}
