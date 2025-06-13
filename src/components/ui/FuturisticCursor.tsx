'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FuturisticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const cursorSize = isHovered ? 40 : 20;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - cursorSize / 2,
        y: e.clientY - cursorSize / 2
      });
      setIsVisible(true);
    };

    const handleHover = () => {
      const clickableElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], [role="link"]'
      );
      
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      clickableElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        clickableElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    window.addEventListener('mousemove', moveCursor);
    const cleanup = handleHover();

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cleanup();
    };
  }, [cursorSize]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        width: cursorSize,
        height: cursorSize,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 700,
        mass: 0.5
      }}
    >
      <div className="relative w-full h-full">
        {/* Outer glow */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-cyan-400/20 backdrop-blur-sm"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Inner cursor */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500"
          animate={{ scale: isHovered ? 0.75 : 1 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Center dot */}
        <motion.div 
          className="absolute inset-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: isHovered ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
