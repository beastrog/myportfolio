'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function FuturisticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [cursorColor, setCursorColor] = useState<'cyan' | 'purple' | 'pink'>('cyan');
  const cursorSize = isHovered ? 40 : 20;
  const trailLength = 10;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - cursorSize / 2,
        y: e.clientY - cursorSize / 2
      });
      setIsVisible(true);
      setTrail(prev => {
        const next = [...prev, { x: e.clientX - cursorSize / 2, y: e.clientY - cursorSize / 2 }];
        return next.length > trailLength ? next.slice(-trailLength) : next;
      });
    };

    const handleHover = () => {
      const clickableElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], [role="link"]'
      );
      const handleMouseEnter = (e: Event) => {
        setIsHovered(true);
        // Color change based on element type or data attribute
        const el = e.target as HTMLElement;
        if (el.closest('.bg-gradient-to-r.from-cyan-400')) setCursorColor('cyan');
        else if (el.closest('.bg-gradient-to-r.from-purple-400')) setCursorColor('purple');
        else if (el.closest('.bg-gradient-to-r.from-pink-400')) setCursorColor('pink');
        else setCursorColor('cyan');
      };
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

  // Color map for gradients
  const colorMap = {
    cyan: 'from-cyan-400 to-blue-400',
    purple: 'from-purple-400 to-pink-400',
    pink: 'from-pink-400 to-cyan-400',
  };

  return (
    <>
      {/* Trailing effect */}
      {trail.map((t, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ width: cursorSize / 2, height: cursorSize / 2 }}
          animate={{
            x: t.x + (cursorSize / 4),
            y: t.y + (cursorSize / 4),
            opacity: (i + 1) / trail.length * 0.3,
            scale: 1 - i * 0.07,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorMap[cursorColor]} blur-md`} />
        </motion.div>
      ))}
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
            className={`absolute inset-0 rounded-full blur-lg opacity-60 bg-gradient-to-br ${colorMap[cursorColor]}`}
            animate={{ scale: isHovered ? 1.7 : 1.2 }}
            transition={{ duration: 0.3 }}
          />
          {/* Inner cursor */}
          <motion.div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorMap[cursorColor]}`}
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
    </>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
