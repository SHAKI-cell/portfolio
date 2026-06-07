import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, FolderGit2, GitCommit, Star, ExternalLink } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { fadeInUp, staggerContainer } from "../utils/animations";

// Generate contribution heatmap data (52 weeks x 7 days)
function generateHeatmapData() {
  const opacityLevels = [0.05, 0.05, 0.05, 0.15, 0.15, 0.3, 0.5];
  return Array(52)
    .fill(0)
    .map(() =>
      Array(7)
        .fill(0)
        .map(() => opacityLevels[Math.floor(Math.random() * opacityLevels.length)])
    );
}

const githubStatCards = [
  {
    icon: FolderGit2,
    label: "Public Repos",
    value: "25+",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: GitCommit,
    label: "Contributions",
    value: "200+",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Star,
    label: "Stars Earned",
    value: "50+",
    color: "from-amber-400 to-orange-500",
  },
];

export default function GitHubStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Memoize heatmap data so it doesn't regenerate on every render
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="glass p-8 rounded-2xl"
        >
          {/* Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-2.5 border border-cyan-500/20">
              <Github className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-white text-xl font-semibold">
              GitHub Activity
            </h3>
          </div>

          {/* Stat Cards Grid */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {githubStatCards.map((card, index) => {
              const IconComponent = card.icon;

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="glass-sm p-4 rounded-xl flex items-center gap-4 group hover:bg-white/[0.07] transition-colors duration-300"
                >
                  <div className="rounded-lg bg-white/[0.05] p-2 group-hover:bg-white/[0.08] transition-colors duration-300">
                    <IconComponent className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="text-white font-bold text-lg">{card.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contribution Heatmap */}
          <div className="mb-6">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">
              Contribution Graph
            </p>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-[3px]" style={{ minWidth: "fit-content" }}>
                {heatmapData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((opacity, dayIndex) => (
                      <motion.div
                        key={dayIndex}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: `rgba(34, 211, 238, ${opacity})`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          inView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + weekIndex * 0.01 + dayIndex * 0.01,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GitHub Profile Link */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
