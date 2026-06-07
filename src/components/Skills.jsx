import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Globe,
  Smartphone,
  Brain,
  Database,
  Wrench,
} from "lucide-react";
import { skills } from "../data/portfolio";
import { fadeInUp, staggerContainer } from "../utils/animations";

// Map icon name strings to actual Lucide components
const iconMap = {
  Code2: Code2,
  Globe: Globe,
  Smartphone: Smartphone,
  Brain: Brain,
  Database: Database,
  Wrench: Wrench,
};

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="gradient-divider mx-auto mb-6" />
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass glass-hover p-6 rounded-2xl"
              >
                {/* Card Header: Icon + Category */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="rounded-lg p-2.5 border border-white/10 relative overflow-hidden"
                  >
                    {/* Gradient background at low opacity */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${getCSSGradientColors(skill.color)})`,
                      }}
                    />
                    <IconComponent className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <h3 className="text-white font-semibold text-base">
                    {skill.category}
                  </h3>
                </div>

                {/* Skill Items */}
                <div className="space-y-4">
                  {skill.items.map((item, i) => (
                    <div key={i}>
                      {/* Label + Percentage */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-300 text-sm">
                          {item.name}
                        </span>
                        <span className="text-slate-500 text-xs font-mono">
                          {item.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${getCSSGradientColors(skill.color)})`,
                            width: inView ? `${item.level}%` : "0%",
                          }}
                          initial={{ width: "0%" }}
                          animate={{
                            width: inView ? `${item.level}%` : "0%",
                          }}
                          transition={{
                            duration: 1.2,
                            delay: 0.2 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Converts Tailwind gradient class string like "from-cyan-400 to-blue-500"
 * to actual CSS color values for use in inline styles.
 */
function getCSSGradientColors(colorString) {
  const colorMap = {
    "cyan-400": "#22d3ee",
    "blue-500": "#3b82f6",
    "violet-400": "#a78bfa",
    "purple-500": "#a855f7",
    "emerald-400": "#34d399",
    "teal-500": "#14b8a6",
    "amber-400": "#fbbf24",
    "orange-500": "#f97316",
    "rose-400": "#fb7185",
    "pink-500": "#ec4899",
    "sky-400": "#38bdf8",
    "indigo-500": "#6366f1",
  };

  const fromMatch = colorString.match(/from-([a-z]+-\d+)/);
  const toMatch = colorString.match(/to-([a-z]+-\d+)/);

  const fromColor = fromMatch ? colorMap[fromMatch[1]] || "#22d3ee" : "#22d3ee";
  const toColor = toMatch ? colorMap[toMatch[1]] || "#3b82f6" : "#3b82f6";

  return `${fromColor}, ${toColor}`;
}

