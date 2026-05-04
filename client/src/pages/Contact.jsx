import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowUpRight, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

/* ─── Contact info items ──────────────────────────────────── */
const CONTACT_ITEMS = [
  { icon: <FiMail size={16} />, label: 'Email us', val: 'craftiingwithpixen@gmail.com', link: 'mailto:craftiingwithpixen@gmail.com' },
  { icon: <FiPhone size={16} />, label: 'Call us', val: '+91 98765 43210', link: 'tel:+919876543210' },
  { icon: <FiMapPin size={16} />, label: 'Studio', val: 'Pune, Maharashtra, India', link: '#' },
];

/* ─── Form field ──────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 font-sans">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-white/[0.05] border border-white/[0.09] rounded-2xl px-5 py-3.5 text-white placeholder:text-white/25 text-[14px] font-sans font-medium focus:outline-none focus:border-[#6A1DB5]/60 focus:bg-white/[0.08] transition-all duration-200';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero strip (white, matches Home hero style) ─────── */}
      <section className="w-full pt-[110px] md:pt-[136px] lg:pt-[148px] pb-16 md:pb-20 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto">

          {/* eyebrow + heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            

            <h1 className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-sans font-normal leading-[1.0] tracking-[-0.02em] text-black">
              Let's build<br />
              <span className="font-semibold text-[#6A1DB5]">something</span> great
            </h1>

            <p className="mt-6 text-[16px] text-black/55 font-sans font-medium leading-[1.6] max-w-xl">
              Have a project in mind? We turn bold ideas into high-performance digital products. Tell us what you're building.
            </p>
          </motion.div>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            {[['158+', 'Projects delivered'], ['42+', 'Happy clients'], ['< 24h', 'Response time']].map(([v, l]) => (
              <div key={l} className="flex items-center gap-3 bg-black/[0.03] border border-black/[0.07] rounded-2xl px-5 py-3">
                <span className="text-[20px] font-sans font-semibold text-black leading-none">{v}</span>
                <span className="text-[11px] uppercase tracking-widest text-black/40 font-bold font-sans">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main panel (Ink Black, matches Services dark card) ── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 pb-20 md:pb-28">
        <div className="max-w-[1380px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0D0D0D] rounded-[32px] sm:rounded-[48px] lg:rounded-[64px] border border-white/[0.06] overflow-hidden relative"
          >
            {/* inner ambient glow */}
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.08]"
              style={{ background: 'radial-gradient(circle, #6A1DB5 0%, transparent 70%)' }} />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.05]"
              style={{ background: 'radial-gradient(circle, #C8F139 0%, transparent 70%)' }} />

            {/* subtle grid texture */}
            <svg aria-hidden className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
              <defs>
                <pattern id="cgrid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cgrid)" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* ── Left info panel ──────────── */}
              <div className="lg:col-span-4 p-8 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/[0.07] flex flex-col justify-between gap-10">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-5 font-sans">Contact us</p>
                  <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-sans font-normal leading-[1.0] tracking-[-0.02em] text-white mb-4">
                    Get in<br /><span className="font-semibold text-[#6A1DB5]">touch</span>
                  </h2>
                  <p className="text-[14px] text-white/45 font-sans leading-[1.65] font-medium max-w-[280px]">
                    We respond within 24 hours. Let's talk about how Pixen can help you grow.
                  </p>
                </div>
                {/* contact items */}
                <div className="flex flex-col gap-5">
                  {CONTACT_ITEMS.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#6A1DB5] group-hover:bg-[#6A1DB5] group-hover:text-white group-hover:border-[#6A1DB5] transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans mb-0.5">{item.label}</p>
                        <p className="text-[14px] font-bold text-white/80 font-sans group-hover:text-white transition-colors duration-200">{item.val}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* bottom lime badge */}
                <div className="inline-flex items-center gap-2 bg-[#C8F139]/10 border border-[#C8F139]/20 rounded-full px-4 py-2.5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#C8F139] inline-block" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#C8F139]/80 font-sans">Available for new projects</span>
                </div>
              </div>

              {/* ── Right form ─────────────────────────────────── */}
              <div className="lg:col-span-8 p-8 sm:p-10 lg:p-14">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email Address">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Subject">
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tell us what you're thinking"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Message">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, goals, and timeline…"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {/* service selector chips */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 font-sans">I'm interested in</label>
                    <div className="flex flex-wrap gap-2">
                      {['Web Development', 'SaaS Product', 'AI Agent', 'SEO & Growth', 'Cloud DevOps'].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={(e) => {
                            e.currentTarget.classList.toggle('!border-[#6A1DB5]');
                            e.currentTarget.classList.toggle('!text-white');
                            e.currentTarget.classList.toggle('!bg-[#6A1DB5]/20');
                          }}
                          className="px-4 py-2 rounded-full text-[12px] font-bold font-sans border border-white/[0.09] text-white/40 bg-white/[0.03] hover:border-white/20 hover:text-white/70 transition-all duration-200 cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-[#6A1DB5] hover:bg-[#4A1285] text-white font-bold text-[13px] font-sans px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(106,29,181,0.4)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <span className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center">
                            <FiArrowUpRight size={14} strokeWidth={2.5} />
                          </span>
                        </>
                      )}
                    </button>

                    <p className="text-[12px] text-white/25 font-sans hidden sm:block">
                      We'll reply within <span className="text-white/50 font-bold">24 hours</span>
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
