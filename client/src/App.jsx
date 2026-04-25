import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudiesPage from './pages/CaseStudies';
import CaseStudyDetailPage from './pages/CaseStudyDetail';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-work" element={<CaseStudiesPage />} />
        <Route path="/our-work/case-study/:slug" element={<CaseStudyDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

