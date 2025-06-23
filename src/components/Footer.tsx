import { Github, Linkedin, Globe, Trophy, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-cyan-500/20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradient-move bg-gradient-to-br from-cyan-950 via-background to-purple-950 opacity-80" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ANIRUDDHA DEY
            </h3>
            <p className="text-foreground/60 mt-2">Software Engineer & AI Enthusiast</p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://linkedin.com/in/aniruddha-dey-887b26312"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover group"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/beastrog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a
              href="https://kaggle.com/adbeast"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover group"
            >
              <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Kaggle</span>
            </a>
            <a
              href="mailto:deyaniruddha_goat@yahoo.com"
              className="flex items-center space-x-2 text-foreground/60 hover:text-cyan-400 transition-colors duration-300 cursor-hover group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-foreground/40 mb-6">
            <span>Currently seeking internship opportunities</span>
            <span>•</span>
            <span>Available for remote & on-site positions</span>
          </div>

          <div className="border-t border-cyan-500/10 pt-6">
            <p className="text-foreground/40 text-sm">
              © 2024 Aniruddha Dey. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
