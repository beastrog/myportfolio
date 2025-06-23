import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 48 }: LoadingSpinnerProps) => (
  <div className="flex items-center justify-center">
    <motion.div
      className="relative"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a21caf" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - 6}
          stroke="url(#spinner-gradient)"
          strokeWidth="6"
          strokeDasharray={Math.PI * (size - 12)}
          strokeDashoffset={Math.PI * (size - 12) * 0.25}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
      </div>
    </motion.div>
  </div>
);

export default LoadingSpinner;
