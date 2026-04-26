import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to send message. Please check your connection.");
      console.error("Web3Forms Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-brand-bg font-sans selection:bg-brand-purple/30 selection:text-brand-purple flex flex-col lg:h-screen lg:overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[140px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] opacity-20" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      <div className="flex-1 flex items-center relative z-10 pt-24 pb-12 lg:pt-20 lg:pb-10">
        <div className="container mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* ── Left Side: Contact Info ── */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 border border-brand-purple/10 text-brand-purple text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-ping" />
                  Let's Build Something
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tighter mb-6 text-brand-bg">
                  Let's talk <br className="hidden lg:block" />
                  about your <br className="hidden lg:block" />
                  <span className="text-brand-purple italic">Vision.</span>
                </h1>
                
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-8 lg:mb-10 max-w-md">
                  Have a project in mind? We're here to turn your ideas into a high-performance digital reality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {[
                    { icon: <FiMail />, label: 'Email us', val: 'hello@pixen.studio', link: 'mailto:hello@pixen.studio' },
                    { icon: <FiPhone />, label: 'Call us', val: '+91 98765 43210', link: 'tel:+919876543210' },
                    { icon: <FiMapPin />, label: 'Studio', val: 'Pune, Maharashtra, India', link: '#' }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg text-brand-purple group-hover:bg-brand-purple group-hover:border-brand-purple group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                        <p className="text-sm lg:text-base font-bold text-brand-bg group-hover:text-brand-purple transition-colors">{item.val}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right Side: Contact Form ── */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-100 p-6 md:p-8 lg:p-10 rounded-3xl lg:rounded-[32px] shadow-2xl shadow-brand-purple/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-[60px] group-hover:bg-brand-purple/10 transition-all duration-1000" />
                
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 lg:px-5 py-3 text-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 lg:px-5 py-3 text-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tell us what you're thinking"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 lg:px-5 py-3 text-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you reach your goals?"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 lg:px-5 py-3 text-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all placeholder:text-gray-400 resize-none text-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-purple text-white font-black uppercase tracking-widest text-[10px] lg:text-xs rounded-xl hover:bg-brand-purple/90 transition-all transform active:scale-[0.98] shadow-[0_15px_30px_-10px_rgba(106,29,181,0.3)] flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <FiSend className="text-brand-green" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
