import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from './ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/beastrog',
    icon: Github,
    className: 'hover:text-gray-800 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/aniruddhadey',
    icon: Linkedin,
    className: 'hover:text-blue-500',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/aniruddhadey',
    icon: Twitter,
    className: 'hover:text-sky-500',
  },
  {
    name: 'Email',
    href: 'mailto:aniruddhadey@example.com',
    icon: Mail,
    className: 'hover:text-red-500',
  },
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed] = useState(100);

  const roles = [
    'Quantitative Researcher',
    'Software Engineer',
    'Machine Learning Engineer'
  ];

  const typeWriter = useCallback(() => {
    const currentRole = roles[currentRoleIndex];
    
    setCurrentText(prevText => {
      if (isDeleting) {
        // Delete text
        if (prevText.length > 0) return prevText.substring(0, prevText.length - 1);
        
        // Switch to next role when deletion is complete
        setIsDeleting(false);
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        return prevText;
      } else {
        // Type text
        if (prevText.length < currentRole.length) return currentRole.substring(0, prevText.length + 1);
        
        // Pause at the end of typing before deleting
        setIsDeleting(true);
        return prevText;
      }
    });
  }, [currentRoleIndex, isDeleting, roles]);

  useEffect(() => {
    const timer = setTimeout(() => {
      typeWriter();
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typeWriter, typingSpeed]);

  const photoUrl = '/profile-photo.jpg'; // Make sure to add your photo to the public folder

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side - Content - Moves below on mobile */}
          <motion.div 
            className="w-full md:w-1/2 mt-8 md:mt-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 sm:mb-6"
              variants={item}
            >
              Hi, I'm Aniruddha Dey
            </motion.h1>

            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/90 mb-4 sm:mb-6 h-10 sm:h-12"
              variants={item}
            >
              <span className="inline-block min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 sm:mb-8" variants={item}>
              Building intelligent systems and solving complex problems through code and algorithms.
              Currently pursuing B.Tech in Computer Science at VIT, Co-founder of multiple startups.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={item}>
              <Button 
                variant="outline" 
                className="group rounded-full px-6 h-12 text-base border-2 border-cyan-400/30 hover:border-cyan-400/60 bg-transparent hover:bg-cyan-500/10 transition-all duration-300"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get in Touch
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>

            <motion.div className="mt-8 sm:mt-10 md:mt-12 flex justify-center md:justify-start space-x-3 sm:space-x-4" variants={item}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${link.className}`}
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Photo - Always at top on mobile */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img 
                src={photoUrl} 
                alt="Aniruddha Dey" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://ui-avatars.com/api/?name=Aniruddha+Dey&background=0D1117&color=06B6D4&size=512';
                }}
              />
              <div className="absolute inset-0 border-2 border-white/10 rounded-full m-1 group-hover:m-0 transition-all duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
