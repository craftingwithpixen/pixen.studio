import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurWork from './pages/OurWork';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-work" element={<OurWork />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

