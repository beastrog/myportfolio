import { motion } from 'framer-motion';
import { Code, Cpu, Database, Cloud, Award, Star, Zap } from 'lucide-react';

const skillIcons: Record<string, JSX.Element> = {
  'Python': <Code className="w-5 h-5 text-blue-500" />,
  'JavaScript': <Code className="w-5 h-5 text-yellow-400" />,
  'TypeScript': <Code className="w-5 h-5 text-blue-600" />,
  'Java': <Code className="w-5 h-5 text-red-500" />,
  'C/C++': <Code className="w-5 h-5 text-blue-400" />,
  'React.js': <div className="w-5 h-5 text-cyan-400">⚛️</div>,
  'Next.js': <div className="w-5 h-5 text-foreground">⏭️</div>,
  'Node.js': <div className="w-5 h-5 text-green-500">⬢</div>,
  'Express.js': <div className="w-5 h-5 text-green-600">E</div>,
  'MongoDB': <Database className="w-5 h-5 text-green-600" />,
  'PostgreSQL': <Database className="w-5 h-5 text-blue-600" />,
  'TensorFlow': <Cpu className="w-5 h-5 text-orange-500" />,
  'Keras': <Cpu className="w-5 h-5 text-red-500" />,
  'Scikit-Learn': <Cpu className="w-5 h-5 text-yellow-500" />,
  'OpenCV': <div className="w-5 h-5 text-blue-600">👁️</div>,
  'Pandas': <div className="w-5 h-5 text-purple-500">🐼</div>,
  'NumPy': <div className="w-5 h-5 text-blue-700">#</div>,
  'AWS': <Cloud className="w-5 h-5 text-yellow-500" />,
  'Azure': <Cloud className="w-5 h-5 text-blue-500" />,
  'Docker': <div className="w-5 h-5 text-blue-400">🐳</div>,
  'Kubernetes': <div className="w-5 h-5 text-blue-500">☸️</div>,
  'GitHub Actions': <div className="w-5 h-5">⚙️</div>,
};

const skillLevels: Record<string, number> = {
  'Python': 95, 'JavaScript': 90, 'TypeScript': 85, 'Java': 80, 'C/C++': 75,
  'React.js': 90, 'Next.js': 85, 'Node.js': 88, 'Express.js': 85, 'MongoDB': 82, 'PostgreSQL': 80,
  'TensorFlow': 85, 'Keras': 83, 'Scikit-Learn': 88, 'OpenCV': 80, 'Pandas': 90, 'NumPy': 92,
  'AWS': 85, 'Azure': 80, 'Docker': 88, 'Kubernetes': 82, 'GitHub Actions': 85
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++"],
      gradient: "from-cyan-400 to-blue-500",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Web & Full-Stack",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"],
      gradient: "from-purple-400 to-pink-500",
      icon: <div className="w-6 h-6">🌐</div>
    },
    {
      title: "Machine Learning",
      skills: ["TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "Pandas", "NumPy"],
      gradient: "from-green-400 to-cyan-500",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions"],
      gradient: "from-orange-400 to-red-500",
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  const certifications = [
    { name: "Problem Solving", platform: "HackerRank", level: 5 },
    { name: "Python", platform: "HackerRank", level: 5 },
    { name: "SQL", platform: "HackerRank", level: 4 },
    { name: "Kaggle Micro-courses", platform: "Kaggle", count: 8 },
    { name: "TensorFlow & Keras", platform: "Google" },
    { name: "Full Stack Web Development", platform: "Udemy" }
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
    <section id="skills" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Here are the technologies and tools I work with on a regular basis.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-6 rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.gradient} text-background`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const level = skillLevels[skill] || 80;
                  return (
                    <div key={skillIndex} className="group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {skillIcons[skill] || <Code className="w-4 h-4" />}
                          <span className="text-sm font-medium text-foreground/90">{skill}</span>
                        </div>
                        <span className="text-xs font-mono text-foreground/50">{level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 lg:mt-20"
        >
          <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-background">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Certifications & Achievements
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-background/50 border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground/90">{cert.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-foreground/60">{cert.platform}</span>
                        {cert.level && (
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < (cert.level || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} 
                              />
                            ))}
                          </div>
                        )}
                        {cert.count && (
                          <span className="text-xs bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded-full">
                            {cert.count}+ courses
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
