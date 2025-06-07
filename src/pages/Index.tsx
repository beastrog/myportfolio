
import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import CustomCursor from '../components/CustomCursor';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scrolling behavior
    const handleScroll = (e: Event) => {
      if (e.target instanceof HTMLAnchorElement && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <ParticleBackground />
      
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
