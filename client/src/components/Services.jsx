import { useState } from 'react';
import { FiMonitor, FiPackage, FiCpu, FiSearch, FiServer } from 'react-icons/fi';

const services = [
  {
    id: 0,
    title: 'Web Development',
    shortDesc: 'Performance',
    tag: '01',
    icon: <FiMonitor size={28} />,
    desc: 'Pixen creates modern, responsive websites built for performance and growth. Whether it\'s a corporate landing page or a complex web platform, we deliver seamless user experiences that turn visitors into customers.',
    color: '#6B35D9',
    bg: 'linear-gradient(135deg, #3b1fa8 0%, #1e0d5e 100%)',
  },
  {
    id: 1,
    title: 'SaaS Products',
    shortDesc: 'Scalability',
    tag: '02',
    icon: <FiPackage size={28} />,
    desc: 'Pixen specializes in building robust, subscription-based platforms designed for performance and scalability. From multi-tenant architecture to secure payment gateway integrations, we handle the technical foundation so you can focus on growing your subscribers.',
    color: '#059669',
    bg: 'linear-gradient(135deg, #065f46 0%, #022c22 100%)',
  },
  {
    id: 2,
    title: 'AI Agents',
    shortDesc: 'Automation',
    tag: '03',
    icon: <FiCpu size={28} />,
    desc: 'Build AI agents that automate workflows, handle repetitive tasks, and deliver faster decisions. Pixen develops secure, reliable agent systems tailored to your business operations.',
    color: '#ea580c',
    bg: 'linear-gradient(135deg, #9a3412 0%, #431407 100%)',
  },
  {
    id: 3,
    title: 'SEO & Digital Visibility',
    shortDesc: 'Visibility',
    tag: '04',
    icon: <FiSearch size={28} />,
    desc: 'A beautiful product is useless if no one sees it. We implement technical SEO strategies to ensure your platform ranks at the top of search results and drives consistent organic traffic.',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #92400e 0%, #3b1a08 100%)',
  },
  {
    id: 4,
    title: 'Deployment & DevOps',
    shortDesc: 'Reliability',
    tag: '05',
    icon: <FiServer size={28} />,
    desc: 'Take your product from staging to production without friction. Pixen manages cloud deployments and DevOps infrastructure to deliver fast, secure, and highly reliable applications with 99.9% uptime.',
    color: '#db2777',
    bg: 'linear-gradient(135deg, #831843 0%, #3b0a25 100%)',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-24 bg-brand-bg">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── HEADER ── */}
        <div className="mb-16">
          <div className="flex gap-8 items-stretch">
            {/* Left vertical accent */}
            <div className="hidden md:flex flex-col items-center gap-3 shrink-0">
              <div className="w-px h-10 bg-brand-purple/50" />
              <span
                className="font-display font-black text-[9px] uppercase tracking-[0.3em] text-brand-purple/50"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Services
              </span>
              <div className="w-px flex-1 min-h-[40px] bg-white/[.04]" />
            </div>

            {/* Main content */}
            <div className="flex-1">
              <p className="font-display font-semibold text-[11px] uppercase tracking-[0.25em] text-brand-purple mb-4">
                What We Do
              </p>
              <h2
                className="font-display font-black text-white uppercase leading-[0.88] tracking-[-2px]"
                style={{ fontSize: 'clamp(48px, 6.5vw, 88px)' }}
              >
                Digital<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>Solutions</span><br />
                <span className="gradient-text">Built to Scale.</span>
              </h2>
              <p className="text-brand-muted text-[13px] leading-relaxed mt-6 max-w-lg">
                At Pixen, we craft high-performance websites and scalable SaaS platforms built with modern technology to ensure speed, security, and future-ready growth.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE STACK (always expanded) ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {services.map((s) => (
            <div
              key={s.id}
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: s.bg,
                border: `1px solid ${s.color}66`,
                padding: '28px 32px',
                boxShadow: `0 0 40px ${s.color}33`,
              }}
            >
              <span
                className="absolute font-display font-black select-none pointer-events-none leading-none"
                style={{ bottom: -20, right: -10, fontSize: 130, color: '#fff', opacity: 0.04 }}
              >
                {s.tag}
              </span>
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-white"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {s.icon}
                </div>
                <p className="font-display font-bold text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {s.shortDesc}
                </p>
                <h3 className="font-display font-bold text-white text-xl leading-tight mb-4">{s.title}</h3>
                <p className="text-white/75 text-[15px] leading-relaxed">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span className="w-5 h-px inline-block" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  Step {s.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP ACCORDION ── */}
        <div
          className="hidden lg:flex flex-row gap-3 lg:h-[540px]"
        >
          {services.map((s, idx) => {
            const isActive = active === idx;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className="relative overflow-hidden rounded-3xl cursor-pointer flex flex-col"
                style={{
                  background: s.bg,
                  border: isActive ? `1px solid ${s.color}66` : '1px solid rgba(255,255,255,0.06)',
                  flex: isActive ? '3' : '1',
                  transition: 'flex 0.6s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
                  padding: '28px 32px',
                  boxShadow: isActive ? `0 0 40px ${s.color}33` : 'none',
                }}
              >
                {/* Background watermark number */}
                <span
                  className="absolute font-display font-black select-none pointer-events-none leading-none"
                  style={{
                    bottom: -20,
                    right: -10,
                    fontSize: 160,
                    color: '#fff',
                    opacity: 0.04,
                    transition: 'transform 0.6s ease',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {s.tag}
                </span>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">

                  {/* Top */}
                  <div>
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {s.icon}
                    </div>

                    {/* Expanded title */}
                    <div
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(-12px)',
                        transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
                        display: isActive ? 'block' : 'none',
                      }}
                    >
                      <p
                        className="font-display font-bold text-xs uppercase tracking-widest mb-2"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {s.shortDesc}
                      </p>
                      <h3 className="font-display font-bold text-white text-xl leading-tight">
                        {s.title}
                      </h3>
                    </div>

                    {/* Collapsed — vertical title */}
                    <div
                      className="hidden lg:flex items-center justify-center"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: isActive ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    >
                      <h3
                        className="font-display font-bold text-white text-base uppercase tracking-widest whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                      >
                        {s.title}
                      </h3>
                    </div>

                    {/* Mobile always-visible title (hidden when active to avoid duplication) */}
                    {!isActive && (
                      <div className="lg:hidden mt-2">
                        <h3 className="font-display font-semibold text-white text-base">{s.title}</h3>
                      </div>
                    )}
                  </div>

                  {/* Bottom — description, visible when active */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                      transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
                      marginTop: 24,
                    }}
                  >
                    <p className="text-white/75 text-[16px] leading-relaxed" style={{ maxWidth: 420 }}>
                      {s.desc}
                    </p>
                    <div
                      className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                      <span
                        className="w-5 h-px"
                        style={{ background: 'rgba(255,255,255,0.4)', display: 'inline-block' }}
                      />
                      Step {s.tag}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
