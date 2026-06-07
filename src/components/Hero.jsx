import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from './ParticleBackground';
import { personalInfo, socialLinks } from '../data/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';

// Map icon names from data to actual components
const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const roles = personalInfo.roles;

  // Typewriter effect
  const typeWriter = useCallback(() => {
    const currentRole = roles[currentRoleIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
      } else {
        // Pause at end of word before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, [displayText, isDeleting, isPaused, currentRoleIndex, roles]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(typeWriter, speed);
    return () => clearTimeout(timer);
  }, [typeWriter, isDeleting]);

  // Social icon rendering helper
  const getSocialIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Particle Background */}
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Secondary gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 60%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)',
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          ref={ref}
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Availability Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="glass-sm inline-flex items-center gap-2.5 px-4 py-2 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <span className="text-sm text-slate-300 font-medium">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 mb-3 font-light"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Typewriter Role */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-1 mb-8 h-12"
          >
            <span className="text-xl md:text-2xl text-slate-300 font-light">
              {displayText}
            </span>
            <motion.span
              className="text-xl md:text-2xl text-cyan-400 font-light"
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'steps(2)',
              }}
            >
              |
            </motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mb-10"
          >
            {personalInfo.about.substring(0, 150)}...
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary group flex items-center gap-2 px-6 py-3 text-sm font-medium"
            >
              View My Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 px-6 py-3 text-sm font-medium"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3"
          >
            {socialLinks
              .filter((link) => ['Github', 'Linkedin', 'Mail'].includes(link.icon))
              .map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="glass-sm w-11 h-11 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {getSocialIcon(link.icon)}
                </motion.a>
              ))}

            {/* Decorative line after social icons */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-white/20 to-transparent ml-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-light">
          Scroll
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/[0.15] flex items-start justify-center p-1.5"
          animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
