
import { useEffect, useState } from 'react';
import { Github, Linkedin, Globe, Trophy } from 'lucide-react';

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
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10">
      <div className="text-center max-w-4xl mx-auto">
        {/* Professional Photo */}
        <div className="mb-8 animate-fade-in">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <img 
                src="/placeholder.svg" 
                alt="Aniruddha Dey - Software Engineer"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
                AD
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 animate-pulse"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-scale-in">
            ANIRUDDHA DEY
          </h1>
          <div className="text-xl md:text-2xl text-foreground/80 h-8 mb-8">
            {text}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </div>
        </div>

        <div className="mb-12 animate-fade-in">
          <p className="text-lg md:text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed mb-6">
            B.Tech Computer Science student at VIT with a passion for transforming innovative ideas into reality. 
            Specializing in full-stack development, machine learning, and quantitative trading strategies.
          </p>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Co-founder of multiple startups with VC-backed funding, competitive programming enthusiast with 
            <span className="text-cyan-400 font-semibold"> CodeSignal GCA 500/600</span>, and experienced in 
            building scalable solutions from concept to deployment. Currently exploring the intersection of 
            AI and financial markets while contributing to open-source projects.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in mb-12">
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

        <div className="flex justify-center space-x-6">
          <a
            href="https://linkedin.com/in/aniruddha-dey-887b26312"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-full border border-cyan-500/30 hover:border-cyan-500 text-foreground/60 hover:text-cyan-400 transition-all duration-300 cursor-hover hover:scale-110 transform hover:bg-cyan-500/10"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/beastrog"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-full border border-cyan-500/30 hover:border-cyan-500 text-foreground/60 hover:text-cyan-400 transition-all duration-300 cursor-hover hover:scale-110 transform hover:bg-cyan-500/10"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://aniruddhadey.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-full border border-cyan-500/30 hover:border-cyan-500 text-foreground/60 hover:text-cyan-400 transition-all duration-300 cursor-hover hover:scale-110 transform hover:bg-cyan-500/10"
          >
            <Globe className="w-6 h-6" />
          </a>
          <a
            href="https://kaggle.com/aniruddhadey"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-full border border-cyan-500/30 hover:border-cyan-500 text-foreground/60 hover:text-cyan-400 transition-all duration-300 cursor-hover hover:scale-110 transform hover:bg-cyan-500/10"
          >
            <Trophy className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
