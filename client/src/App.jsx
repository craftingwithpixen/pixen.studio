import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Technologies from './components/Technologies';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <Hero />
      {/* <Clients /> */}
      <Services />
      {/* <Portfolio /> */}
      <Process />
      <Technologies />
      <WhyUs />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

