import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectManager from './ProjectManager';
import TestimonialManager from './TestimonialManager';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('pixen_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('pixen_admin_token');
    toast.success('Safe travels!');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-black pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #6A1DB5 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-black">
              Control <span className="text-brand-purple italic">Center</span>
            </h1>
            <p className="text-gray-400 mt-2 font-medium">Manage your creative showcase and social proof.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white text-gray-500 border border-gray-100 rounded-2xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all font-bold text-xs tracking-widest uppercase shadow-sm"
          >
            Logout
          </button>
        </div>

        <div className="flex space-x-8 mb-12 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-5 px-2 transition-all font-display font-bold text-lg relative ${
              activeTab === 'projects'
                ? 'text-brand-purple'
                : 'text-gray-300 hover:text-black'
            }`}
          >
            Projects
            {activeTab === 'projects' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`pb-5 px-2 transition-all font-display font-bold text-lg relative ${
              activeTab === 'testimonials'
                ? 'text-brand-purple'
                : 'text-gray-300 hover:text-black'
            }`}
          >
            Testimonials
            {activeTab === 'testimonials' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-purple rounded-full" />
            )}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'projects' ? <ProjectManager /> : <TestimonialManager />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
