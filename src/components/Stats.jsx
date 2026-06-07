import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stats } from "../data/portfolio";
import { fadeInUp, staggerContainer } from "../utils/animations";

/**
 * Animated counter hook — counts from 0 to target using requestAnimationFrame
 * with a smooth ease-out deceleration curve.
 */
function useCountUp(target, shouldStart, duration = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const easeOutQuart = useCallback((t) => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  useEffect(() => {
    if (!shouldStart) return;

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldStart, target, duration, easeOutQuart]);

  return count;
}

/** Individual stat item with its own count-up animation */
function StatItem({ label, value, suffix }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const count = useCountUp(value, inView, 2000);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="text-center relative group"
    >
      {/* Subtle glow behind the number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-20 h-20 rounded-full bg-cyan-500/10 blur-2xl" />
      </div>

      <div className="relative">
        <span className="gradient-text text-4xl md:text-5xl font-bold tabular-nums">
          {count}
          {suffix}
        </span>
        <p className="text-slate-400 text-sm mt-2 tracking-wide uppercase">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const [containerRef, containerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={containerInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-white/[0.02] border-y border-white/[0.06] py-16 px-6 md:px-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  );
}
