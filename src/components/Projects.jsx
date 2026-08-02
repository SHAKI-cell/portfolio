import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Folder } from 'lucide-react';
import { projects } from '../data/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'AI', value: 'ai' },
  { label: 'Mobile', value: 'mobile' },
];

const Projects = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="gradient-divider mx-auto mb-6" />
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of projects showcasing my skills in web
            development, artificial intelligence, and mobile applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-sm p-1.5 rounded-xl inline-flex gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeFilter === tab.value
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                className="glass glass-hover group overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className={`relative h-48 flex items-center justify-center overflow-hidden ${darkMode ? 'bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10' : 'bg-slate-100'}`}>
                  <Folder className={`w-12 h-12 transition-transform duration-500 group-hover:scale-125 ${darkMode ? 'text-cyan-400/30' : 'text-cyan-600/30'}`} />

                  {/* Hover overlay shimmer */}
                  <div className={`absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ${darkMode ? 'bg-gradient-to-r from-transparent via-white/[0.03] to-transparent' : 'bg-gradient-to-r from-transparent via-white/50 to-transparent'}`} />

                  {/* Featured Badge */}
                  {project.featured && (
                    <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border ${darkMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`}>
                      Featured
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'}`}>
                    {project.title}
                  </h3>

                  <p className={`text-sm mt-2 line-clamp-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full border ${darkMode ? 'bg-white/[0.06] text-slate-300 border-white/[0.04]' : 'bg-slate-100 text-slate-700 border-gray-200'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className={`mt-4 pt-4 border-t flex gap-4 ${darkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-sm transition-colors duration-300 ${darkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-sm transition-colors duration-300 ${darkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
