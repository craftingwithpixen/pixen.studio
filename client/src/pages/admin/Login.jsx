import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    }
    setLoading(false);
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#6A1DB5]/10 border-t-[#6A1DB5] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans">
      {/* Background Decor - Matching home page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#6A1DB5]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[#C8F139]/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full relative z-10 px-6"
      >
        <div className="bg-white p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-black/[0.06] shadow-[0_20px_60px_rgba(106,29,181,0.08)]">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[32px] sm:text-4xl font-sans font-light leading-[1.1] tracking-[-0.02em] text-black mb-2">
              Admin <span className="font-medium text-[#6A1DB5]">Access</span>
            </h2>
            <p className="text-black/50 mt-3 text-[14px] sm:text-[15px] font-medium">Authorized personnel only</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Username</label>
                <motion.input
                  type="text"
                  required
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black placeholder-black/30 focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3 ml-1">Password</label>
                <motion.input
                  type="password"
                  required
                  className="w-full bg-white border border-black/[0.08] rounded-[20px] px-5 py-4 text-black placeholder-black/30 focus:outline-none focus:ring-4 focus:ring-[#6A1DB5]/10 focus:border-[#6A1DB5] transition-all text-[15px]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-[#6A1DB5] text-white font-bold rounded-[20px] hover:bg-[#6A1DB5]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_-10px_rgba(106,29,181,0.3)] flex items-center justify-center gap-2 text-[15px] font-sans"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Note */}
          <p className="text-center text-[12px] text-black/40 mt-8 font-medium">
            Default credentials: admin / adminpassword123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
