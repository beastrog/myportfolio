
import { motion } from 'framer-motion';
import { GraduationCap, Code, Award, Briefcase, MapPin, Target, Brain } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stats data
const stats = [
  { icon: <MapPin className="w-5 h-5" />, title: 'Location', value: 'Vadodara, India' },
  { icon: <GraduationCap className="w-5 h-5" />, title: 'Education', value: 'VIT (2024-2028)' },
  { icon: <Code className="w-5 h-5" />, title: 'CodeSignal', value: '500/600 GCA' },
  { icon: <Target className="w-5 h-5" />, title: 'Focus', value: 'Full-Stack & ML' }
];

// Achievements data
const achievements = [
  { id: 1, content: 'SBI Ideathon Finalist - FaceX AI Payment System' },
  { id: 2, content: 'Hudson River Trading Interview (Quantitative Engineer)' },
  { id: 3, content: 'Susquehanna Group Trading Day Invitation' },
  { id: 4, content: 'Multiple Startup Co-founder with VC Funding' },
  { id: 5, content: 'Active Kaggle Competitor & CodeSignal 500/600' }
];

// Interests data
const interests = [
  'Competitive Programming', 'Machine Learning', 'Ethical Hacking',
  'Algorithmic Trading', 'GATE Preparation', 'Quantitative Finance'
];

const About = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent w-full h-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-12 items-start"
        >
          {/* Photo Section */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative group">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden p-1">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                  <div className="w-full h-full bg-[url('/profile.jpg')] bg-cover bg-center rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-t from-background/90 via-background/30 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">Aniruddha Dey</h3>
                        <p className="text-cyan-200">CS Student & Tech Enthusiast</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div 
              variants={staggerContainer}
              className="prose prose-lg text-foreground/80 space-y-6"
            >
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed mb-6">
                I'm <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Aniruddha Dey</span>, a highly passionate B.Tech Computer Science & Engineering 
                student at <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vellore Institute of Technology</span> with a passion for building 
                scalable systems and AI-powered applications. Currently in my academic journey from 2024-2028, I maintain an excellent 
                academic record while actively engaging in competitive programming and real-world projects.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed mb-6">
                Recognized as an <span className="font-semibold text-cyan-400">SBI Ideathon Finalist</span> for my innovative FaceX AI Payment System, 
                I've demonstrated my ability to create cutting-edge solutions that bridge technology and practical applications. 
                I'm actively preparing for <span className="font-semibold text-purple-400">ICPC</span> and have achieved a remarkable 
                <span className="font-semibold text-cyan-400"> CodeSignal GCA score of 500/600</span>, showcasing my strong algorithmic 
                thinking and problem-solving capabilities.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-lg leading-relaxed">
                My professional journey includes interviews at prestigious firms like 
                <span className="font-semibold text-purple-400"> Hudson River Trading</span> for Quantitative Engineer positions and receiving 
                trading day invitations from <span className="font-semibold text-cyan-400">Susquehanna Group</span>. These experiences have 
                refined my analytical thinking and exposed me to high-frequency trading and quantitative finance domains.
              </motion.p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2 text-cyan-400">
                      {stat.icon}
                    </div>
                    <h3 className="text-sm font-medium text-cyan-300 mb-1">{stat.title}</h3>
                    <p className="text-sm text-foreground/80">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Achievements & Interests */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mt-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-background to-background border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Key Achievements
                </h3>
              </div>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.li 
                    key={achievement.id}
                    variants={fadeInUp}
                    className="flex items-start group/item"
                  >
                    <span className={`w-2 h-2 rounded-full mt-2.5 mr-3 flex-shrink-0 ${index % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`}></span>
                    <span className="text-foreground/90 group-hover/item:text-foreground transition-colors">
                      {achievement.content}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 via-background to-background border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technical Interests
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.span
                    key={index}
                    variants={fadeInUp}
                    className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-foreground/80 hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-foreground transition-all duration-300 cursor-default"
                    whileHover={{ y: -2 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
