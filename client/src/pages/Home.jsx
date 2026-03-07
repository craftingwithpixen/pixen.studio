import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import WhyUs from '../components/WhyUs';
import Technologies from '../components/Technologies';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Technologies />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}
