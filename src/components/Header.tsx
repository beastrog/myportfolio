
import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleResumeClick = () => {
    window.open('/aniruddha-dey-resume.pdf', '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ANIRUDDHA DEY
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-cyan-400 transition-colors duration-300 relative group cursor-hover"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={handleResumeClick}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <FileText size={16} />
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground cursor-hover"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-cyan-500/20">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-cyan-400 transition-colors duration-300 cursor-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                handleResumeClick();
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <FileText size={16} />
              Resume
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
