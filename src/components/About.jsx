import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Brain, Lightbulb } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "../utils/animations";

// Map icon name strings from data to actual Lucide components
const iconMap = {
  Code2: Code2,
  Brain: Brain,
  Lightbulb: Lightbulb,
};

const miniStats = [
  { value: "15+", label: "Projects" },
  { value: "500+", label: "Problems" },
  { value: "8", label: "Certifications" },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know me, my passions, and what drives me to build
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN — About Text */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInLeft}
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {personalInfo.about}
            </p>

            <p className="italic text-slate-400 leading-relaxed mb-8">
              "{personalInfo.objectives}"
            </p>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {miniStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass glass-hover p-4 text-center rounded-xl"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN — About Cards */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col gap-5"
          >
            {personalInfo.aboutCards.map((card, index) => {
              const IconComponent = iconMap[card.icon] || Code2;

              return (
                <motion.div
                  key={index}
                  variants={fadeInRight}
                  className="glass glass-hover p-6 rounded-2xl flex items-start gap-5 group"
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-3 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-cyan-400" />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
