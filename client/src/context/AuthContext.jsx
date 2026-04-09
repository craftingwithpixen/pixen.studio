import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.valid) setAdmin({ username: data.username, token });
    } catch {
      localStorage.removeItem('admin_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { verify(); }, [verify]);

  const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('admin_token', data.token);
    setAdmin({ username: data.username, token: data.token });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${admin?.token}` },
  });

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
