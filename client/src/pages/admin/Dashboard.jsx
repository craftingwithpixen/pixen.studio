import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiLogOut } from 'react-icons/fi';
import ProjectManager from './ProjectManager';
import TestimonialManager from './TestimonialManager';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white text-black pt-20 sm:pt-24 md:pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 font-sans relative overflow-hidden">
      {/* Background Decor - Subtle gradient circles matching home */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#6A1DB5]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#C8F139]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16 sm:mb-20"
        >
          <div>
            <h1 className="text-[34px] sm:text-[42px] md:text-[64px] font-sans font-light leading-[0.98] tracking-[-0.03em] text-black">
              Control <span className="font-medium text-[#6A1DB5]">Center</span>
            </h1>
            <p className="text-black/60 mt-3 sm:mt-4 font-sans text-[14px] sm:text-[16px] leading-[1.6] max-w-[500px]">
              Manage your creative portfolio and client testimonials with style.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all font-bold text-[11px] sm:text-[12px] tracking-widest uppercase shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
          >
            <FiLogOut size={16} />
            Logout
          </motion.button>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-6 sm:gap-12 mb-12 sm:mb-16 border-b border-black/[0.06]"
        >
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-1 transition-all font-sans font-bold text-[16px] sm:text-[18px] relative group ${
              activeTab === 'projects'
                ? 'text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            Projects
            {activeTab === 'projects' && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6A1DB5] rounded-full"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`pb-4 px-1 transition-all font-sans font-bold text-[16px] sm:text-[18px] relative group ${
              activeTab === 'testimonials'
                ? 'text-black'
                : 'text-black/40 hover:text-black/60'
            }`}
          >
            Testimonials
            {activeTab === 'testimonials' && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6A1DB5] rounded-full"
              />
            )}
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {activeTab === 'projects' ? <ProjectManager /> : <TestimonialManager />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
