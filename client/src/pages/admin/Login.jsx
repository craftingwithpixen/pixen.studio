import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('pixen_admin_token', res.data.token);
      toast.success('Access Granted');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #6A1DB5 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="max-w-md w-full relative z-10 px-6">
        <div className="bg-white p-10 rounded-[40px] border border-brand-purple/5 shadow-[0_32px_64px_-16px_rgba(106,29,181,0.1)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold text-black tracking-tight">
              Admin <span className="text-brand-purple italic">Portal</span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm font-medium">Authorized personnel only</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Username</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand-purple/5 focus:border-brand-purple transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-brand-purple text-white font-bold rounded-2xl hover:bg-brand-purple/90 transform active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_20px_40px_-10px_rgba(106,29,181,0.3)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
