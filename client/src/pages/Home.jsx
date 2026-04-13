import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import WhyUs from '../components/WhyUs';
import Technologies from '../components/Technologies';
import Testimonials from '../components/Testimonials';
import CaseStudies from '../components/CaseStudies';
import CTA from '../components/CTA';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <Process />
      {/* <Technologies /> */}
      <WhyUs />
      <Testimonials />
      <CaseStudies />
      <CTA />
    </>
  );
}
