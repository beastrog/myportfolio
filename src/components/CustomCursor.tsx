
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', updatePosition);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        }}
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-80 blur-sm"></div>
      </div>
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate(${position.x - 2}px, ${position.y - 2}px)`,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-white"></div>
      </div>
    </>
  );
};

export default CustomCursor;
