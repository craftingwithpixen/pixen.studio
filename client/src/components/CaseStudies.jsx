import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowLeft, FiArrowRight, FiBookOpen, FiAward, FiHeart, FiZap } from 'react-icons/fi';

import imgReferme   from '../assets/referme.png';
import imgCollex    from '../assets/collex.png';
import imgCodeOrbit from '../assets/codeorbit.png';
import imgDabbaWala from '../assets/dabbawala.png';
import imgEggro     from '../assets/eggro.png';
import imgFitFind   from '../assets/fitfind.png';
import imgFashionC  from '../assets/fashionc.png';
import imgClean     from '../assets/clean.png';

const CASES = [
  {
    title: 'Connecting Students with Better Study Resources',
    project: 'Referme',
    tag: 'EdTech · Platform',
    desc: 'An educational platform delivering high-quality engineering notes and study materials to thousands of students, simplifying exam preparation and resource discovery.',
    img: imgReferme,
    link: 'https://referme.tech/',
  },
  {
    title: 'A Campus Marketplace for Students to Buy & Sell',
    project: 'Collex',
    tag: 'Marketplace · MERN',
    desc: 'A campus-focused peer-to-peer marketplace where students list, discover, and trade second-hand goods in a secure, community-driven environment.',
    img: imgCollex,
    link: 'https://www.collex.app/',
    bg: '#F5F3FF',
    textColor: 'text-black'
  },
  {
    title: 'Simplifying Final-Year Engineering Projects',
    project: 'Code Orbit',
    tag: 'EdTech · Platform',
    desc: 'A curated hub for final-year engineering projects, bridging the gap between academic theory and real-world implementation.',
    img: imgCodeOrbit,
    link: 'https://codeorbit.info/',
    bg: '#6A1DB5',
    textColor: 'text-white'
  },
  {
    title: 'Home-Style Tiffin Services, Digitized',
    project: 'Dabba Wala',
    tag: 'Food Tech · Next.js',
    desc: 'An online tiffin subscription platform connecting home cooks with hungry customers.',
    img: imgDabbaWala,
    link: 'https://online-dabba-service-8see.vercel.app/',
    bg: '#C8F139',
    textColor: 'text-black'
  },
  {
    title: 'Fitness Discovery Made Effortless',
    project: 'FitFind',
    tag: 'HealthTech · MERN',
    desc: 'A fitness discovery platform helping users find, book, and manage gym memberships.',
    img: imgFitFind,
    link: 'https://gym-two-olive.vercel.app/',
    bg: '#0D0D0D',
    textColor: 'text-white'
  }
];

export default function CaseStudies() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const featured = CASES[0];
  const smallCards = CASES.slice(1);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden border-t border-black/5">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16">

          {/* Left Column */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col justify-between">

            {/* Featured Card */}
            <div className="bg-[#F5F3FF] rounded-[32px] p-6 sm:p-8 md:p-10 relative flex-1 flex flex-col overflow-hidden min-h-[460px] sm:min-h-[480px] border border-[#6A1DB5]/10">
              <div className="flex justify-between items-start mb-6">
                <div className="max-w-[100%] sm:max-w-[85%] z-10 relative mt-2">
                  <h3 className="text-[24px] md:text-[28px] font-sans font-medium leading-[1.1] text-black mb-3 tracking-tight pb-[220px] sm:pb-0">
                    <span className="font-bold">{featured.project}:</span><br/>
                    {featured.title}
                  </h3>
                  <p className="text-[14px] text-black/60 leading-[1.65] font-medium sm:max-w-[85%] hidden sm:block">
                    {featured.desc}
                  </p>
                </div>
                <a href={featured.link} target="_blank" rel="noreferrer" className="bg-white hover:bg-[#F5F3FF] shrink-0 w-10 h-10 rounded-full hidden sm:flex items-center justify-center shadow-sm z-10 transition-transform hover:-translate-x-1 border border-[#6A1DB5]/10">
                  <FiArrowLeft className="text-[#6A1DB5]" size={16} strokeWidth={1.5} />
                </a>
              </div>

              {/* Bottom Tags */}
              <div className="flex items-center gap-3 z-10 mt-auto pt-10">
                <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm text-[13px] font-bold text-gray-700 border border-black/5">
                  3k <FiBookOpen className="text-gray-400" size={16} strokeWidth={1.5} />
                </div>
                <div className="bg-white w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-sm text-[#6A1DB5] border border-black/5">
                  <FiAward size={18} strokeWidth={1.5} />
                </div>
                <div className="bg-white w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-sm text-[#6A1DB5] border border-black/5">
                  <FiHeart size={18} strokeWidth={1.5} />
                </div>
              </div>

              {/* Featured Image */}
              <div className="absolute -bottom-10 sm:-bottom-10 right-[-10px] sm:-right-10 w-[85%] sm:w-[60%] lg:w-[65%] origin-bottom-right rotate-[-5deg]">
                <div className="rounded-[24px] overflow-hidden shadow-2xl border-[6px] border-white/60">
                  <img src={featured.img} alt={featured.project} className="w-full h-auto object-cover object-top aspect-[4/5]" />
                </div>
              </div>
            </div>

            {/* Scroll Controls */}
            <div className="flex items-center gap-3 mt-10">
              <button onClick={() => scroll('left')} className="w-11 h-11 rounded-full bg-[#F5F3FF] hover:bg-[#EDE8FF] transition-colors flex items-center justify-center text-[#6A1DB5] border border-[#6A1DB5]/15">
                <FiArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button onClick={() => scroll('right')} className="w-11 h-11 rounded-full bg-[#F5F3FF] hover:bg-[#EDE8FF] transition-colors flex items-center justify-center text-[#6A1DB5] border border-[#6A1DB5]/15">
                <FiArrowRight size={18} strokeWidth={1.5} />
              </button>
              <div className="h-[2px] bg-gray-100 flex-1 ml-6 relative rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[#6A1DB5] w-[20%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 md:col-span-12 lg:col-span-7 flex flex-col relative justify-center lg:pl-10">

            {/* Heading */}
            <div className="mb-10 lg:mb-16">
             
              <h2 className="text-[48px] md:text-[64px] font-sans font-medium tracking-tight text-black leading-[1.0]">
                Explore Our Work
              </h2>
            </div>

            {/* Small Cards Slider */}
            <div className="relative pt-2">
              <div className="absolute top-1/2 left-[-24px] md:left-[-32px] -translate-y-1/2 z-20 w-[60px] md:w-[70px] h-[60px] md:h-[70px] bg-white/80 backdrop-blur-md hidden sm:flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%, 0 0)' }}>
                <FiArrowRight className="text-gray-400 ml-[-8px] opacity-70" size={18} strokeWidth={1.5} />
              </div>

              <div className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar shrink-0 pb-4 relative z-10" ref={trackRef} style={{ scrollbarWidth: 'none' }}>
                {smallCards.map((sc, i) => (
                  <div key={i} className="rounded-[28px] p-6 lg:p-7 min-w-[260px] max-w-[260px] min-h-[260px] max-h-[260px] relative overflow-hidden flex flex-col justify-between group" style={{ background: sc.bg }}>
                    <h4 className={`font-sans font-bold text-[18px] md:text-[19px] leading-[1.25] z-10 ${sc.textColor} w-[90%] tracking-tight`}>
                      {sc.project}:<br/>
                      {sc.title.split(' ').slice(0, 5).join(' ')}...
                    </h4>

                    <a href={sc.link} target="_blank" rel="noreferrer" className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center shadow-sm z-10 mt-auto transition-transform hover:translate-x-1">
                      <FiArrowRight className="text-[#6A1DB5]" size={15} strokeWidth={1.5} />
                    </a>

                    {/* Decorative Image */}
                    {i === 0 ? (
                      <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full overflow-hidden border-[6px] border-white/30 shadow-sm z-0">
                        <img src={sc.img} className="w-full h-full object-cover object-top" alt={sc.project} />
                      </div>
                    ) : (
                      <div className="absolute top-0 right-[-10%] w-[120%] h-[120%] opacity-30 mix-blend-multiply z-0 rounded-full blur-[2px] transition-transform duration-700 group-hover:scale-110">
                        <img src={sc.img} className="w-full h-full object-cover" alt={sc.project} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Paragraph */}
            <div className="mt-8 md:mt-12 pl-2 lg:pl-10 md:w-[90%] lg:w-[85%]">
              <p className="text-black/60 font-sans text-[14.5px] leading-[1.7] mb-6">
                Discover a treasure trove of success stories and insightful case studies that illuminate the journey of innovation and entrepreneurship. From groundbreaking startups to industry-disrupting strategies, dive into real-world examples that inspire, inform, and guide.
              </p>
              <Link to="/our-work" className="inline-flex items-center gap-2 text-[#6A1DB5] font-sans font-bold text-[14px] border-b-2 border-[#6A1DB5]/60 pb-1 hover:gap-3 transition-all tracking-tight">
                Explore In Details <FiArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
