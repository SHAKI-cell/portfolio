import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2500; // total loading time in ms
    const interval = 25; // update every 25ms
    const increment = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        // Short delay before triggering exit animation
        setTimeout(() => {
          setIsComplete(true);
        }, 400);
        // Callback after exit animation completes
        setTimeout(() => {
          onComplete?.();
        }, 1000);
      }
      setProgress(Math.min(Math.round(current), 100));
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#030712' }}
          exit={{
            scale: 1.1,
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Subtle radial glow behind logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
          </div>

          {/* Animated SK Logo */}
          <motion.div
            className="relative z-10 mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="text-7xl md:text-8xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent select-none"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                opacity: [1, 0.7, 1],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              SK
            </motion.h1>

            {/* Glow effect under logo */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{
                opacity: [0.5, 1, 0.5],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div
            className="relative z-10 w-64 md:w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Track */}
            <div className="h-[2px] w-full rounded-full bg-white/[0.08] overflow-hidden">
              {/* Fill */}
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>

            {/* Glow line under progress */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />

            {/* Percentage Text */}
            <motion.p
              className="mt-4 text-center text-sm font-mono tracking-widest text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-slate-400">{progress}</span>
              <span className="text-slate-600">%</span>
            </motion.p>
          </motion.div>

          {/* Bottom decorative text */}
          <motion.p
            className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase text-slate-700 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
