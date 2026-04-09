import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-violet flex items-center justify-center">
            <span className="font-display font-black text-white text-xs">P</span>
          </div>
          <span className="font-display font-black text-white text-sm tracking-widest uppercase">
            Pixen Admin
          </span>
        </div>

        <h1 className="text-3xl font-display font-black text-white mb-1">Welcome back</h1>
        <p className="text-brand-muted text-sm mb-8">Sign in to manage your content</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-brand-muted uppercase tracking-widest font-semibold mb-1.5">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-purple/60 focus:bg-white/[0.06] transition-all"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-brand-muted uppercase tracking-widest font-semibold mb-1.5">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-purple/60 focus:bg-white/[0.06] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-purple hover:bg-brand-violet text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_#6B35D940] text-sm mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
