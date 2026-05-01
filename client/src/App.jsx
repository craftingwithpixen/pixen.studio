import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudiesPage from './pages/CaseStudies';
import CaseStudyDetailPage from './pages/CaseStudyDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

import { Toaster } from 'react-hot-toast';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className={`min-h-screen relative ${isAdminPath ? 'bg-[#F8F7FF]' : 'bg-white'}`}>
        <ScrollToTop />
        <Toaster position="top-right" />
        {!isAdminPath && <Navbar />}
        <div className={isAdminPath ? '' : 'pt-0'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-work" element={<CaseStudiesPage />} />
            <Route path="/our-work/case-study/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </div>
        {!isAdminPath && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

