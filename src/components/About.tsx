
const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg text-foreground/80">
              <p>
                I'm a highly motivated B.Tech Computer Science & Engineering student at Vellore Institute of Technology 
                with a passion for building scalable systems and AI-powered applications.
              </p>
              
              <p>
                Recognized as an <strong className="text-cyan-400">SBI Ideathon Finalist</strong>, I'm actively engaged 
                in competitive programming and preparing for ICPC. I've interviewed at prestigious firms like 
                <strong className="text-purple-400"> Hudson River Trading</strong> and received trading day invitations 
                from <strong className="text-cyan-400">Susquehanna Group</strong>.
              </p>

              <p>
                Currently co-founding multiple startups through our university incubation center with VC-backed seed funding, 
                focusing on the Indian market with cutting-edge AI/ML integration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold mb-2">Location</h3>
                <p className="text-foreground/80">Vadodara, India</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold mb-2">Education</h3>
                <p className="text-foreground/80">VIT (2024-2028)</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold mb-2">CodeSignal GCA</h3>
                <p className="text-foreground/80">500/600</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold mb-2">Focus</h3>
                <p className="text-foreground/80">Full-Stack & ML</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
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
                  Active Kaggle Competitor & Leetcoder
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Interests</h3>
              <div className="grid grid-cols-2 gap-3">
                <span className="px-3 py-2 text-sm bg-purple-500/10 rounded-full text-center">Competitive Programming</span>
                <span className="px-3 py-2 text-sm bg-cyan-500/10 rounded-full text-center">Ethical Hacking</span>
                <span className="px-3 py-2 text-sm bg-purple-500/10 rounded-full text-center">GATE Preparation</span>
                <span className="px-3 py-2 text-sm bg-cyan-500/10 rounded-full text-center">Algorithmic Trading</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
