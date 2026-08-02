import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Sun, Moon, Wifi, WifiOff } from 'lucide-react';
import { navLinks } from '../data/portfolio';

const Navbar = ({ activeSection, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Track scroll position for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (href) => {
    const section = href.replace('#', '');
    return activeSection === section;
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: {
      x: '100%',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? (darkMode ? 'bg-dark-950/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20' : 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg shadow-black/5')
            : (darkMode ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100')
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SK
              </span>
              <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
              <span className={`text-sm font-light hidden sm:inline-block transition-colors ${darkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-600'}`}>
                Shakib Khan
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive(link.href)
                      ? (darkMode ? 'text-cyan-400' : 'text-cyan-600')
                      : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      layoutId="activeSection"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}

              {/* Network Status */}
              <div className={`ml-2 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${isOnline ? (darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-600 border-green-200') : (darkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200')}`}>
                {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
                <span className="hidden lg:inline">{isOnline ? 'Online' : 'Offline'}</span>
              </div>

              {/* Resume Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline ml-3 text-sm px-4 py-2 flex items-center gap-2"
              >
                <Download size={14} />
                Resume
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`ml-3 p-2 rounded-xl transition-all duration-300 ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden relative z-50 p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className={`fixed top-0 right-0 z-40 h-full w-[280px] backdrop-blur-2xl border-l md:hidden ${darkMode ? 'bg-dark-950/95 border-white/[0.08]' : 'bg-white/95 border-gray-200'}`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col justify-center h-full px-8 py-20">
                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      custom={index}
                      variants={mobileNavItemVariants}
                      initial="hidden"
                      animate="visible"
                      className={`relative py-3 px-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                        isActive(link.href)
                          ? (darkMode ? 'text-cyan-400 bg-cyan-400/[0.08]' : 'text-cyan-600 bg-cyan-50')
                          : (darkMode ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive(link.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Resume Button (Mobile) */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline mt-8 text-center flex items-center justify-center gap-2 py-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Download size={16} />
                  Download Resume
                </motion.a>

                {/* Bottom decorative line */}
                <motion.div
                  className={`mt-auto pt-8 border-t ${darkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className={`text-xs tracking-wider uppercase ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Shakib Khan — Portfolio
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
