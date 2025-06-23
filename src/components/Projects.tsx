import { motion } from 'framer-motion';
import { Github, ExternalLink, Code as CodeIcon, Zap, Award } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "FaceX - AI Payment Authentication",
      description: "Revolutionary AI-based payment system combining facial recognition with behavioral biometrics for secure transactions. 98% accuracy on validation set.",
      tech: ["Python", "TensorFlow", "Keras", "Flask", "MongoDB", "OpenCV"],
      status: "Present",
      highlight: "SBI Ideathon Finalist",
      gradient: "from-cyan-400 to-blue-500",
      icon: <CodeIcon className="w-5 h-5" />
    },
    {
      title: "HungryAF - Food Delivery App",
      description: "Student-run food delivery platform with real-time tracking, role-based dashboards, and integrated payment system using Razorpay.",
      tech: ["Next.js", "MongoDB", "Clerk", "Supabase", "Razorpay"],
      status: "Live",
      highlight: "College-wide deployment",
      gradient: "from-purple-400 to-pink-500",
      icon: <div className="w-5 h-5">🍔</div>
    },
    {
      title: "QuantStock - ML Trading Predictor",
      description: "ML-driven stock price predictor with minute-level NSE data analysis, feature engineering, and backtesting capabilities.",
      tech: ["Python", "XGBoost", "Backtrader", "Flask", "PostgreSQL"],
      status: "Active",
      highlight: "Live trading signals",
      gradient: "from-green-400 to-cyan-500",
      icon: <div className="w-5 h-5">📈</div>
    },
    {
      title: "Face Recognition Attendance",
      description: "Real-time attendance monitoring system using facial recognition technology with Firebase backend and React Native mobile app.",
      tech: ["Python", "OpenCV", "Firebase", "React Native"],
      status: "Complete",
      highlight: "Production ready",
      gradient: "from-orange-400 to-red-500",
      icon: <div className="w-5 h-5">👁️</div>
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/5">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A collection of my recent work and contributions to the tech community
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.04, boxShadow: '0 0 32px 0 #06b6d4aa', borderColor: '#06b6d4' }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-cyan-500/10 hover:border-cyan-400 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/10 overflow-hidden animate-gradient-border"
            >
              <div className="absolute top-0 right-0 p-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${project.gradient.split(' ')[1].split('-')[1]}-500/10 text-${project.gradient.split(' ')[1].split('-')[1]}-400`}>
                  {project.status}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient} text-background`}>
                  {project.icon}
                </div>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
              </div>

              {project.highlight && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-300">
                    <Award className="w-3.5 h-3.5 mr-1.5" />
                    {project.highlight}
                  </span>
                </div>
              )}

              <p className="text-foreground/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 text-xs font-medium bg-background/50 border border-cyan-500/10 rounded-full text-foreground/80 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.a
                    whileHover={{ scale: 1.08, boxShadow: '0 0 16px 0 #a21caf88' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 rounded-lg hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 text-sm font-medium"
                  >
                    <CodeIcon className="w-4 h-4" />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.08, boxShadow: '0 0 16px 0 #06b6d488' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 border border-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/60 mb-6">
            More projects available on GitHub (repositories will be made public soon)
          </p>
          <motion.a
            href="https://github.com/beastrog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5" />
            <span>View All Projects</span>
            <span className="ml-1">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
