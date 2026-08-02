import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Target, GitBranch, PenTool } from 'lucide-react';
import { achievements } from '../data/portfolio';
import { fadeInUp, staggerContainer } from '../utils/animations';

const iconMap = {
  Trophy,
  Target,
  GitBranch,
  PenTool,
};

const AchievementCard = ({ achievement, index, darkMode }) => {
  const IconComponent = iconMap[achievement.icon] || Trophy;

  return (
    <motion.div
      variants={fadeInUp}
      className="glass glass-hover p-6 flex items-start gap-4 group relative overflow-hidden"
    >
      {/* Subtle left border glow on hover */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon container */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 ${darkMode ? 'from-cyan-500/20 to-blue-500/20' : 'from-cyan-100 to-blue-100'}`}>
        <IconComponent className={`w-6 h-6 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
      </div>

      {/* Content */}
      <div>
        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>{achievement.title}</h3>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{achievement.description}</p>
      </div>
    </motion.div>
  );
};

const Achievements = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="achievements" className="section-padding">
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
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Milestones and accomplishments that define my journey
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              achievement={achievement}
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
