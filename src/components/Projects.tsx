
const Projects = () => {
  const projects = [
    {
      title: "FaceX - AI Payment Authentication",
      description: "Revolutionary AI-based payment system combining facial recognition with behavioral biometrics for secure transactions. 98% accuracy on validation set.",
      tech: ["Python", "TensorFlow", "Keras", "Flask", "MongoDB", "OpenCV"],
      status: "Present",
      highlight: "SBI Ideathon Finalist",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "HungryAF - Food Delivery App",
      description: "Student-run food delivery platform with real-time tracking, role-based dashboards, and integrated payment system using Razorpay.",
      tech: ["Next.js", "MongoDB", "Clerk", "Supabase", "Razorpay"],
      status: "Live",
      highlight: "College-wide deployment",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      title: "QuantStock - ML Trading Predictor",
      description: "ML-driven stock price predictor with minute-level NSE data analysis, feature engineering, and backtesting capabilities.",
      tech: ["Python", "XGBoost", "Backtrader", "Flask", "PostgreSQL"],
      status: "Active",
      highlight: "Live trading signals",
      gradient: "from-green-400 to-cyan-500"
    },
    {
      title: "Face Recognition Attendance",
      description: "Real-time attendance monitoring system using facial recognition technology with Firebase backend and React Native mobile app.",
      tech: ["Python", "OpenCV", "Firebase", "React Native"],
      status: "Complete",
      highlight: "Production ready",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 cursor-hover hover:scale-105 transform"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                  {project.title}
                </h3>
                <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                  {project.status}
                </span>
              </div>

              {project.highlight && (
                <div className="mb-3">
                  <span className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full">
                    🏆 {project.highlight}
                  </span>
                </div>
              )}

              <p className="text-foreground/70 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-background/50 border border-cyan-500/20 rounded text-foreground/80 hover:border-cyan-500/40 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 text-sm font-medium cursor-hover">
                    View Details
                  </button>
                  <button className="flex-1 py-2 px-4 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 text-sm font-medium cursor-hover">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/60 mb-6">
            More projects available on GitHub (repositories will be made public soon)
          </p>
          <a
            href="https://github.com/beastrog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 cursor-hover glow-effect"
          >
            View All Projects →
          </a>
        </div>
      </div>

      <style jsx>{`
        .glow-effect {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }
        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.6);
        }
      `}</style>
    </section>
  );
};

export default Projects;
