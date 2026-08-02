import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import GitHubStats from './components/GitHubStats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Track active section for navbar highlighting
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = [
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'achievements',
      'contact',
    ];

    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Navigation */}
          <Navbar activeSection={activeSection} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Main Sections */}
          <main>
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Stats darkMode={darkMode} />
            <Skills darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Experience darkMode={darkMode} />
            <Education darkMode={darkMode} />
            <Achievements darkMode={darkMode} />
            <GitHubStats darkMode={darkMode} />
            <Testimonials darkMode={darkMode} />
            <Contact darkMode={darkMode} />
          </main>

          {/* Footer */}
          <Footer darkMode={darkMode} />
        </motion.div>
      )}
    </>
  );
};

export default App;
