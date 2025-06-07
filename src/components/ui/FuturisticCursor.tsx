'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FuturisticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorSize = isHovered ? 40 : 20;
  
  // Smooth movement with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorSize / 2);
      cursorY.set(e.clientY - cursorSize / 2);
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
  }, [cursorSize, cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x,
        y,
        width: cursorSize,
        height: cursorSize,
        opacity: isVisible ? 1 : 0,
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
      }}
    >
      <div className="relative w-full h-full">
        {/* Outer glow */}
        <div 
          className={cn(
            'absolute inset-0 rounded-full bg-cyan-400/20 backdrop-blur-sm',
            'transition-all duration-300',
            isHovered ? 'scale-150' : 'scale-100'
          )}
        />
        
        {/* Inner cursor */}
        <div 
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500',
            'transition-all duration-200',
            isHovered ? 'scale-75' : 'scale-100'
          )}
        />
        
        {/* Center dot */}
        <div 
          className={cn(
            'absolute inset-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white',
            'transition-transform duration-100',
            isHovered ? 'scale-0' : 'scale-100'
          )}
        />
      </div>
    </motion.div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
