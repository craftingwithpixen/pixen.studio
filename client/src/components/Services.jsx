import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowUpRight, FiCode, FiBox, FiCpu, FiSearch, FiCloud } from 'react-icons/fi';

/* ─── Data ──────────────────────────────────────────────────── */
const services = [
  {
    num: '01', title: 'Web Development',
    desc: 'Modern, responsive websites and web apps built for ultimate performance, SEO, and rapid business growth.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    Icon: FiCode,
    accent: '#C8F139',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072'
  },
  {
    num: '02', title: 'SaaS Products',
    desc: 'End-to-end SaaS platforms with auth, billing, dashboards, and team management — designed to scale from day one.',
    tags: ['Stripe', 'Auth', 'Dashboards', 'APIs'],
    Icon: FiBox,
    accent: '#A178FA',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015'
  },
  {
    num: '03', title: 'AI Agents',
    desc: 'Custom AI agents that automate complex workflows, handle repetitive tasks, and deliver smarter decisions at scale.',
    tags: ['OpenAI', 'LangChain', 'Automation', 'n8n'],
    Icon: FiCpu,
    accent: '#38E8FF',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070'
  },
  {
    num: '04', title: 'SEO & Search',
    desc: 'Technical SEO audits, on-page strategies, and content frameworks that push your platform straight to the top.',
    tags: ['On-page', 'Core Web Vitals', 'Analytics'],
    Icon: FiSearch,
    accent: '#FF8A65',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?auto=format&fit=crop&q=80&w=2074'
  },
  {
    num: '05', title: 'Cloud & DevOps',
    desc: 'Managed cloud deployments, CI/CD pipelines, and infrastructure automation for rock-solid 99.9% uptime.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Terraform'],
    Icon: FiCloud,
    accent: '#6A1DB5',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072'
  },
];

/* ─── Card Component ────────────────────────────────────────── */
function ServiceCard({ service, index }) {
   const container = useRef(null);
   const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start end', 'start start']
   });

   const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
   const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

   return (
      <div 
         ref={container}
         className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 md:px-10"
      >
         <motion.div 
            style={{ scale, opacity }}
            className="relative w-full max-w-7xl h-[80vh] md:h-[75vh] bg-white rounded-[40px] md:rounded-[64px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-black/[0.03] flex flex-col lg:flex-row"
         >
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-between relative z-10 bg-white">
               <div>
                  <div className="flex items-center gap-4 mb-10 md:mb-16">
                     <span className="text-3xl md:text-4xl font-display font-bold text-black/10">0{index + 1}</span>
                     <div className="h-px w-12 bg-black/10" />
                     <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/5 text-brand-purple text-[10px] font-bold uppercase tracking-widest">
                        <service.Icon size={14} />
                        Expertise
                     </div>
                  </div>

                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter text-black mb-8">
                     {service.title.split(' ').map((word, i) => (
                        <span key={i} className={i === 1 ? 'text-brand-purple italic block' : 'block'}>
                           {word}
                        </span>
                     ))}
                  </h3>

                  <p className="text-lg md:text-xl text-black/50 font-sans font-medium max-w-md leading-relaxed mb-12">
                     {service.desc}
                  </p>
               </div>

               <div className="flex flex-wrap gap-3">
                  {service.tags.map(tag => (
                     <span key={tag} className="px-5 py-2.5 rounded-full bg-[#f8f8f8] text-[10px] font-bold uppercase tracking-widest text-black/40 border border-black/[0.03]">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 relative h-full overflow-hidden bg-gray-100">
               <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
               
               <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16">
                  <div 
                     className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white shadow-2xl text-black hover:bg-brand-purple hover:text-white transition-all duration-300 cursor-pointer group"
                  >
                     <FiArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
   );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function Services() {
   return (
      <section id="services" className="relative bg-white pt-32 md:pt-48">
         <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-20 md:mb-32">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-4xl"
            >
               <p className="text-brand-purple font-bold uppercase tracking-[0.25em] text-xs mb-8">What we do</p>
               <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tighter text-black">
                  Elite solutions for <br />
                  <span className="text-brand-purple italic">digital</span> leaders.
               </h2>
            </motion.div>
         </div>

         <div className="relative">
            {services.map((s, i) => (
               <ServiceCard key={s.num} service={s} index={i} />
            ))}
         </div>

         {/* Bottom Spacer/CTA area */}
         <div className="h-[20vh] bg-white" />
      </section>
   );
}


