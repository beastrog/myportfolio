
const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++"],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Web & Full-Stack",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"],
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "Machine Learning",
      skills: ["TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "Pandas", "NumPy"],
      gradient: "from-green-400 to-cyan-500"
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions"],
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Technical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 cursor-hover"
            >
              <h3 className={`text-xl font-semibold mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="p-3 rounded-lg bg-background/50 border border-cyan-500/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 text-center group-hover:scale-105 transform"
                  >
                    <span className="text-foreground/80 text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Certifications & Achievements</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-foreground/80">
              <div>HackerRank: Problem Solving (5★)</div>
              <div>HackerRank: Python (5★)</div>
              <div>HackerRank: SQL (4★)</div>
              <div>8 Kaggle Micro-courses</div>
              <div>TensorFlow & Keras Certified</div>
              <div>Full Stack Web Development</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
