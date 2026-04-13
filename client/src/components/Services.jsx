import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';

const services = [
  {
    id: 1,
    title: 'Web Dev',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    desc: 'Pixen creates modern, responsive websites built for ultimate performance and rapid business growth.',
    color: '#6A1DB5',
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    title: 'SaaS Products',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    desc: 'Specialized in building robust, subscription-based platforms designed for high scalability and secure payments.',
    color: '#C8F139',
    textColor: '#000000',
  },
  {
    id: 3,
    title: 'AI Agents',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    desc: 'Build AI agents that automate complex workflows, handle repetitive tasks, and deliver faster decisions.',
    color: '#A178FA',
    textColor: '#000000',
  },
  {
    id: 4,
    title: 'SEO & Search',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    desc: 'Technical SEO strategies to ensure your digital platform ranks at the top and drives consistent organic traffic.',
    color: '#00C2A8',
    textColor: '#000000',
  },
  {
    id: 5,
    title: 'Cloud DevOps',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    desc: 'Cloud deployments and infrastructure management for highly reliable applications with 99.9% uptime.',
    color: '#ffffff',
    textColor: '#000000',
  },
];

export default function Services() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
      <section ref={targetRef} id="services" className="bg-[#0D0D0D] rounded-t-[28px] sm:rounded-t-[40px] lg:rounded-t-[64px] -mt-10 sm:-mt-12 relative z-20 text-white clip-path-section">

         {/* Mobile / Tablet Layout */}
         <div className="lg:hidden w-full max-w-[1300px] mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-16 sm:pb-20">
            <div className="mb-10 sm:mb-12">
               <h2 className="text-[34px] sm:text-[44px] font-sans font-medium leading-[1.02] tracking-tight mb-4 pr-2">
                  What we do
               </h2>
               <p className="text-[#888] text-[15px] sm:text-[16px] leading-[1.6] font-sans max-w-[560px]">
                  Depending on customer satisfaction and access to digital products, our potential target audience can be divided into distinct groups.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
               {services.map((item, index) => (
                  <div key={item.id} className="relative min-h-[360px] sm:min-h-[400px] rounded-[24px] overflow-hidden flex flex-col justify-between group cursor-pointer bg-[#1c1b1b]">
                     <div className="absolute inset-0 w-full h-full">
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0D0D0D] opacity-90"></div>
                     </div>

                     <div className="relative z-10 p-5 sm:p-6">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-black font-sans font-bold text-[13px] sm:text-[14px]">
                           {index + 1}
                        </div>
                     </div>

                     <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full">
                        <p className="text-white text-[15px] sm:text-[16px] leading-[1.5] font-sans font-medium mb-5 sm:mb-6">
                           {item.desc}
                        </p>

                        <div className="flex items-center gap-2">
                           <div
                              className="px-5 sm:px-6 py-3 rounded-full text-[12px] sm:text-[13px] font-bold font-sans transition-all group-hover:pr-8"
                              style={{ backgroundColor: item.color, color: item.textColor }}
                           >
                              {item.title}
                           </div>
                           <div
                              className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] rounded-full flex items-center justify-center transition-all group-hover:scale-110 shrink-0"
                              style={{ backgroundColor: item.color, color: item.textColor }}
                           >
                              <FiArrowRight size={17} strokeWidth={1.5} />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Desktop Layout */}
         <div className="hidden lg:block h-[250vh]">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
               <div className="w-full max-w-[1300px] mx-auto px-6">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8 items-center mt-12 md:mt-0">

              {/* Left Column */}
              <div className="xl:col-span-4 flex flex-col justify-center h-full">
                 <div>
                     
                     <h2 className="text-[48px] md:text-[64px] font-sans font-medium leading-[1.0] tracking-tight mb-6 pr-4">
                        What we do
                     </h2>
                     <p className="text-[#888] text-[16px] md:text-[18px] leading-[1.6] font-sans max-w-sm">
                        Depending on customer satisfaction and access to digital products, our potential target audience can be divided into distinct groups.
                     </p>
                  </div>

                 <div className="hidden xl:block mt-24">
                    <FiArrowUpRight className="text-5xl text-white hover:text-[#C8F139] transition-colors cursor-pointer" strokeWidth={1.5} />
                 </div>
              </div>

              {/* Right Column — Horizontal Scroll Track */}
              <div
                className="xl:col-span-8 overflow-hidden relative w-full h-[600px] flex items-center"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
                }}
              >
                <motion.div style={{ x }} className="flex gap-6 lg:gap-10 w-max px-4">
                  {services.map((item, index) => (
                    <div key={item.id} className="relative w-[85vw] sm:w-[380px] h-[480px] lg:h-[560px] rounded-[32px] overflow-hidden flex flex-col justify-between group cursor-pointer bg-[#1c1b1b] shrink-0">
                          <div className="absolute inset-0 w-full h-full">
                             <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105"
                             />
                             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0D0D0D] opacity-90"></div>
                          </div>

                          <div className="relative z-10 p-6">
                             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-sans font-bold text-[14px]">
                                {index + 1}
                             </div>
                          </div>

                          <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                             <p className="text-white text-[16px] lg:text-[17px] leading-[1.5] font-sans font-medium mb-8">
                                {item.desc}
                             </p>

                             <div className="flex items-center gap-2">
                                <div className="px-6 py-3.5 rounded-full text-[13px] font-bold font-sans transition-all group-hover:pr-8"
                                     style={{ backgroundColor: item.color, color: item.textColor }}>
                                   {item.title}
                                </div>
                                <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center transition-all group-hover:scale-110 shrink-0"
                                     style={{ backgroundColor: item.color, color: item.textColor }}>
                                   <FiArrowRight size={18} strokeWidth={1.5} />
                                </div>
                             </div>
                          </div>
                       </div>
                           ))}
                        </motion.div>
              </div>

                  </div>
               </div>
        </div>
      </div>
    </section>
  );
}
