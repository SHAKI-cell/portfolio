import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronUp, Heart } from 'lucide-react';
import { navLinks, socialLinks } from '../data/portfolio';

const socialIconMap = {
  Github,
  Linkedin,
  Mail,
  Phone,
};

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-white/[0.06]">
        <div className="py-12 px-6 md:px-20">
          {/* Top Row: Logo + Nav Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="gradient-text text-2xl font-bold">SK</span>
              <span className="text-slate-400">Shakib Khan</span>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Middle Row: Social Icons */}
          <div className="flex justify-center gap-4 py-8 border-y border-white/[0.04] mt-8">
            {socialLinks.map((social) => {
              const IconComponent = socialIconMap[social.icon];
              if (!IconComponent) return null;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-sm w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Bottom Row: Copyright */}
          <div className="text-center pt-8">
            <p className="text-sm text-slate-500">
              © 2026 Shakib Khan. Crafted with{' '}
              <Heart className="w-4 h-4 inline-block text-red-400 fill-red-400 -mt-0.5" />{' '}
              and React.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 glass w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
