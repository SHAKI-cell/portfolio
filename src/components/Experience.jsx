import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';
import { experience } from '../data/portfolio';
import { fadeInLeft, fadeInRight, fadeInUp } from '../utils/animations';

const TimelineCard = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start mb-12 last:mb-0">
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ring-4 ring-cyan-400/20 shadow-lg shadow-cyan-500/30" />
      </div>

      {/* Card */}
      <motion.div
        variants={isEven ? fadeInRight : fadeInLeft}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
          isEven ? 'md:ml-auto md:pl-0' : 'md:mr-auto md:pr-0'
        }`}
      >
        <div className="glass glass-hover p-6 relative">
          {/* Connector line stub (desktop) */}
          <div
            className={`hidden md:block absolute top-5 w-8 h-px bg-gradient-to-r ${
              isEven
                ? 'right-full from-transparent to-cyan-500/40'
                : 'left-full from-cyan-500/40 to-transparent'
            }`}
          />

          {/* Period Badge */}
          <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full inline-block mb-3 border border-cyan-400/10">
            {item.period}
          </span>

          {/* Role */}
          <h3 className="text-xl font-bold text-white">{item.role}</h3>

          {/* Company */}
          <p className="text-cyan-400 text-sm mt-1 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            {item.company}
          </p>

          {/* Description Bullets */}
          <ul className="mt-4 space-y-2">
            {item.description.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.04]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section-padding">
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey building impactful software and contributing
            to innovative teams across various domains.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[1.3rem] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

          {/* Experience Items */}
          {experience.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
