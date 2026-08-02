import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { education, certifications } from '../data/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Education = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [eduRef, eduInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [certRef, certInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="gradient-divider mx-auto mb-6" />
          <h2 className="section-title">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            My academic foundation and continuous learning journey through
            courses, certifications, and self-driven exploration.
          </p>
        </motion.div>

        {/* ─── Academic Journey ─── */}
        <motion.div
          ref={eduRef}
          variants={staggerContainer}
          initial="hidden"
          animate={eduInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          {education.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass glass-hover p-6 md:p-8 relative overflow-hidden"
            >
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-l-2xl" />

              {/* Period */}
              <div className={`flex items-center gap-2 text-sm mb-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                <Calendar className="w-3.5 h-3.5" />
                {item.period}
              </div>

              {/* Degree */}
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.degree}</h3>

              {/* Institution */}
              <p className={`flex items-center gap-2 mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <GraduationCap className="w-4 h-4 text-slate-500" />
                {item.institution}
              </p>

              {/* Description */}
              <p className={`text-sm mt-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-4">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className={`px-3 py-1 text-xs border rounded-full ${darkMode ? 'glass-sm text-cyan-300 border-cyan-400/10' : 'bg-slate-100 text-cyan-700 border-gray-200'}`}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Certifications ─── */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-2xl font-bold mb-8 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}
          >
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center ${darkMode ? 'from-cyan-500/20 to-blue-600/20' : 'from-cyan-100 to-blue-100'}`}>
              <Award className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
            </span>
            Certifications &amp; Courses
          </motion.h3>

          <motion.div
            ref={certRef}
            variants={staggerContainer}
            initial="hidden"
            animate={certInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-sm glass-hover p-4 flex items-start gap-3"
              >
                {/* Award Icon Container */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center border ${darkMode ? 'from-cyan-500/20 to-blue-600/20 border-cyan-400/10' : 'from-cyan-100 to-blue-100 border-cyan-200'}`}>
                  <Award className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                </div>

                {/* Cert Info */}
                <div className="min-w-0">
                  <h4 className={`font-semibold leading-snug ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {cert.name}
                  </h4>
                  <p className={`text-sm mt-0.5 flex items-center gap-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {cert.issuer}
                    <span className="text-slate-600">•</span>
                    {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
