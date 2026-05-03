import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6A1DB5]/20 border-t-[#6A1DB5] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Securing Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
