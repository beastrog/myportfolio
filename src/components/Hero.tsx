
import { useEffect, useState } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Software Engineer & AI Enthusiast";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-scale-in">
            ANIRUDDHA DEY
          </h1>
          <div className="text-xl md:text-2xl text-foreground/80 h-8 mb-8">
            {text}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </div>
        </div>

        <div className="mb-12 animate-fade-in">
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            B.Tech Computer Science student at VIT with expertise in full-stack development, 
            machine learning, and quantitative trading. Co-founder of multiple startups with 
            VC-backed funding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 cursor-hover shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
          >
            Get In Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border border-cyan-500 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300 cursor-hover"
          >
            View Projects
          </a>
        </div>

        <div className="mt-16 flex justify-center space-x-8">
          <a
            href="https://linkedin.com/in/aniruddha-dey-887b26312"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover hover:scale-110 transform"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center hover:border-cyan-500">
              LinkedIn
            </div>
          </a>
          <a
            href="https://github.com/beastrog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover hover:scale-110 transform"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 flex items-center justify-center hover:border-cyan-500">
              GitHub
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
