import { useEffect, useRef, useState } from "react";

/* ── tech data with categories & accent colours ── */
const techs = [
  { name: "React",        logo: "https://cdn.simpleicons.org/react",        cat: "Frontend",   accent: "#61DAFB" },
  { name: "Angular",      logo: "https://cdn.simpleicons.org/angular/white",      cat: "Frontend",   accent: "#DD0031" },
  { name: "Next.js",      logo: "https://cdn.simpleicons.org/nextdotjs/white", cat: "Frontend",   accent: "#ffffff" },
  { name: "JavaScript",   logo: "https://cdn.simpleicons.org/javascript",   cat: "Language",   accent: "#F7DF1E" },
  { name: "HTML",          logo: "https://cdn.simpleicons.org/html5",        cat: "Markup",     accent: "#E34F26" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss",  cat: "Styling",    accent: "#06B6D4" },
  { name: "Bootstrap",    logo: "https://cdn.simpleicons.org/bootstrap",    cat: "Styling",    accent: "#7952B3" },
  { name: "Node.js",      logo: "https://cdn.simpleicons.org/nodedotjs",    cat: "Backend",    accent: "#339933" },
  { name: "Express.js",   logo: "https://cdn.simpleicons.org/express/white",cat: "Backend",    accent: "#ffffff" },
  { name: "MongoDB",      logo: "https://cdn.simpleicons.org/mongodb",      cat: "Database",   accent: "#47A248" },
  { name: "MySQL",        logo: "https://cdn.simpleicons.org/mysql",        cat: "Database",   accent: "#4479A1" },
  { name: "Git",           logo: "https://cdn.simpleicons.org/git",          cat: "DevOps",     accent: "#F05032" },
  { name: "GitHub",        logo: "https://cdn.simpleicons.org/github/white", cat: "DevOps",     accent: "#ffffff" },
  { name: "Figma",         logo: "https://cdn.simpleicons.org/figma",        cat: "Design",     accent: "#F24E1E" },
  { name: "WordPress",    logo: "https://cdn.simpleicons.org/wordpress",    cat: "CMS",        accent: "#21759B" },
];

/* ── bento layout: rows × cols span for each cell ── */
const bentoLayout = [
  // Row 1  (6 cols: 2 + 1 + 1 + 2)
  { colSpan: 2, rowSpan: 2, size: "lg" },   // React — hero card
  { colSpan: 1, rowSpan: 2, size: "tall" }, // Angular — tall card
  { colSpan: 1, rowSpan: 1, size: "sm" },   // Next.js
  { colSpan: 2, rowSpan: 1, size: "wide" }, // JavaScript
  // Row 2  (cols 4-5-6 remain from above spans, 2 new)
  { colSpan: 1, rowSpan: 1, size: "sm" },   // HTML
  { colSpan: 2, rowSpan: 1, size: "wide" }, // Tailwind CSS
  // Row 3  (6 cols: 1 + 1 + 2 + 1 + 1)
  { colSpan: 1, rowSpan: 1, size: "sm" },   // Bootstrap
  { colSpan: 1, rowSpan: 1, size: "sm" },   // Node.js
  { colSpan: 2, rowSpan: 1, size: "wide" }, // Express.js
  { colSpan: 1, rowSpan: 1, size: "sm" },   // MongoDB
  { colSpan: 1, rowSpan: 1, size: "sm" },   // MySQL
  // Row 4  (6 cols: 2 + 1 + 1 + 2)
  { colSpan: 2, rowSpan: 1, size: "wide" }, // Git
  { colSpan: 1, rowSpan: 1, size: "sm" },   // GitHub
  { colSpan: 1, rowSpan: 1, size: "sm" },   // Figma
  { colSpan: 2, rowSpan: 1, size: "wide" }, // WordPress
];

/* ── Scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return { ref, visible };
}

/* ── Bento Card ── */
function BentoCard({ tech, layout, index }) {
  const { ref, visible } = useReveal(index * 80);
  const { size } = layout;

  const isLg   = size === "lg";
  const isTall = size === "tall";
  const isWide = size === "wide";

  const getSpans = () => {
    switch (size) {
      case "lg": return "col-span-2 row-span-2"; // Full width on mobile, 1/3 on desktop
      case "tall": return "col-span-1 lg:row-span-2"; // Half width on mobile
      case "wide": return "col-span-1 lg:col-span-2"; // NOW: Half width on mobile, Double on desktop
      default: return "col-span-1"; // Next.js, HTML, etc.
    }
  };

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl border border-white/[.06] transition-all duration-700 ease-out bg-[#141414] ${getSpans()}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.96)",
      }}
    >
      {/* Gradient glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${tech.accent}18, transparent 60%)`,
        }}
      />

      {/* Accent dot */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-12 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20"
        style={{ background: tech.accent }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full gap-3 p-6 ${
          isLg ? "p-8" : ""
        }`}
      >
        {/* Category tag (only on big / wide cards) */}
        {(isLg || isWide) && (
          <span
            className="text-[9px] uppercase tracking-[0.2em] mb-1 font-medium"
            style={{ color: tech.accent }}
          >
            {tech.cat}
          </span>
        )}

        {/* Logo */}
        <img
          src={tech.logo}
          alt={tech.name}
          className="transition-transform duration-500 group-hover:scale-110"
          style={{
            width: isLg ? 64 : isTall ? 48 : 40,
            height: isLg ? 64 : isTall ? 48 : 40,
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(107,53,217,.15))",
          }}
        />

        {/* Name */}
        <span
          className={`font-semibold text-white/90 tracking-tight text-center transition-colors duration-300 group-hover:text-white ${
            isLg ? "text-lg mt-1" : isTall ? "text-sm" : "text-xs"
          }`}
        >
          {tech.name}
        </span>

        {/* Accent bar on large card */}
        {isLg && (
          <div className="flex gap-1.5 mt-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-[3px] rounded-full"
                style={{
                  background:
                    i === 0
                      ? tech.accent
                      : i === 1
                      ? `${tech.accent}66`
                      : `${tech.accent}22`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Corner particle */}
      <div
        className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:translate-y-[-4px]"
        style={{ background: tech.accent }}
      />
    </div>
  );
}

/* ── Floating orbs background ── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
        style={{ background: "#6B35D9", top: "10%", left: "-10%" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
        style={{ background: "#9B6BFF", bottom: "5%", right: "-8%" }}
      />
    </div>
  );
}

/* ── Main Section ── */
export default function Technologies() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeaderVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-brand-bg py-24 px-5 sm:px-10 lg:px-16 overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible
              ? "translateY(0)"
              : "translateY(30px)",
          }}
        >
          <span className="badge mb-3 block">Mastered&nbsp;Languages</span>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="section-heading">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-brand-muted text-sm max-w-sm leading-relaxed">
              Tools and languages I've mastered to build exceptional digital
              products from end to end.
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-brand-purple/40 via-brand-light/20 to-transparent" />
        </div>

        {/* ── Bento Grid ── */}
        <div
          className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 grid-rows-[repeat(auto-fill,minmax(120px,auto))]"
        >
          {techs.map((tech, i) => (
            <BentoCard
              key={tech.name}
              tech={tech}
              layout={bentoLayout[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
