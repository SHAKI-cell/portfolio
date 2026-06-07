import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';

const slideVariants = {
  enter: { x: 100, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-advance every 5 seconds
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-padding bg-white/[0.01]">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="gradient-divider mx-auto mb-6" />
          <h2 className="section-title">
            What <span className="gradient-text">People Say</span>
          </h2>
          <p className="section-subtitle">
            Feedback and testimonials from mentors, colleagues, and clients
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass p-8 md:p-10 text-center"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-cyan-400/20 mx-auto" />

                {/* Quote Text */}
                <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed mt-4">
                  "{testimonials[activeIndex].text}"
                </p>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto my-6" />

                {/* Name */}
                <h4 className="font-bold text-white">
                  {testimonials[activeIndex].name}
                </h4>

                {/* Role */}
                <p className="text-sm text-cyan-400">
                  {testimonials[activeIndex].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-6 bg-cyan-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
