
const About = () => {
  return (
    <section id="about" className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Photo Section */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative group">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="prose prose-lg text-foreground/80 space-y-4">
              <p>
                I'm <strong className="text-cyan-400">Aniruddha Dey</strong>, a highly motivated B.Tech Computer Science & Engineering 
                student at <strong className="text-purple-400">Vellore Institute of Technology</strong> with a passion for building 
                scalable systems and AI-powered applications. Currently pursuing my degree from 2024-2028, I maintain an excellent 
                academic record while actively engaging in competitive programming and real-world projects.
              </p>
              
              <p>
                Recognized as an <strong className="text-cyan-400">SBI Ideathon Finalist</strong> for my innovative FaceX AI Payment System, 
                I've demonstrated my ability to create cutting-edge solutions that bridge technology and practical applications. 
                I'm actively preparing for <strong className="text-purple-400">ICPC</strong> and have achieved a remarkable 
                <strong className="text-cyan-400"> CodeSignal GCA score of 500/600</strong>, showcasing my strong algorithmic 
                thinking and problem-solving capabilities.
              </p>

              <p>
                My professional journey includes interviews at prestigious firms like 
                <strong className="text-purple-400"> Hudson River Trading</strong> for Quantitative Engineer positions and receiving 
                trading day invitations from <strong className="text-cyan-400">Susquehanna Group</strong>. These experiences have 
                refined my analytical thinking and exposed me to high-frequency trading and quantitative finance domains.
              </p>

              <p>
                Currently, I'm co-founding multiple startups through our university incubation center with VC-backed seed funding, 
                focusing on the Indian market with cutting-edge AI/ML integration. My entrepreneurial ventures combine technical 
                innovation with market understanding, aiming to solve real-world problems through technology.
              </p>

              <p>
                As an active <strong className="text-cyan-400">Kaggle competitor</strong> and dedicated 
                <strong className="text-purple-400"> LeetCoder</strong>, I continuously hone my skills in machine learning and 
                algorithmic problem-solving. My interests span competitive programming, ethical hacking, GATE preparation, 
                and algorithmic trading, reflecting my diverse technical curiosity.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                <h3 className="text-cyan-400 font-semibold mb-1">Location</h3>
                <p className="text-foreground/80 text-sm">Vadodara, India</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                <h3 className="text-cyan-400 font-semibold mb-1">Education</h3>
                <p className="text-foreground/80 text-sm">VIT (2024-2028)</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                <h3 className="text-cyan-400 font-semibold mb-1">CodeSignal</h3>
                <p className="text-foreground/80 text-sm">500/600 GCA</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-center">
                <h3 className="text-cyan-400 font-semibold mb-1">Focus</h3>
                <p className="text-foreground/80 text-sm">Full-Stack & ML</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Interests */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Key Achievements</h3>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></span>
                SBI Ideathon Finalist - FaceX AI Payment System
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0"></span>
                Hudson River Trading Interview (Quantitative Engineer)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></span>
                Susquehanna Group Trading Day Invitation
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0"></span>
                Multiple Startup Co-founder with VC Funding
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"></span>
                Active Kaggle Competitor & CodeSignal 500/600
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Technical Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              <span className="px-3 py-2 text-sm bg-purple-500/10 rounded-full text-center">Competitive Programming</span>
              <span className="px-3 py-2 text-sm bg-cyan-500/10 rounded-full text-center">Machine Learning</span>
              <span className="px-3 py-2 text-sm bg-purple-500/10 rounded-full text-center">Ethical Hacking</span>
              <span className="px-3 py-2 text-sm bg-cyan-500/10 rounded-full text-center">Algorithmic Trading</span>
              <span className="px-3 py-2 text-sm bg-purple-500/10 rounded-full text-center">GATE Preparation</span>
              <span className="px-3 py-2 text-sm bg-cyan-500/10 rounded-full text-center">Quantitative Finance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
