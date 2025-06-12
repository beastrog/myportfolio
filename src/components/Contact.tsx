
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { api } from '@/lib/api';

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
      delayChildren: 0.1
    }
  }
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        resume: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.sendContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'New message from portfolio contact form',
        message: formData.message,
      });

      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully!',
        variant: 'default',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        resume: null,
      });
      // Reset file input
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        title: 'Error Sending Message',
        description: error instanceof Error 
          ? error.message 
          : 'There was an error sending your message. Please try again later or contact me directly at deyaniruddha_goat@yahoo.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 relative overflow-hidden">
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
            Get In Touch
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-6">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Info */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-8 p-8 rounded-2xl bg-gradient-to-br from-foreground/5 to-background border border-foreground/10 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent inline-flex items-center">
                  Let's Connect
                  <span className="ml-2 w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 block flex-1"></span>
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  I'm currently seeking summer internship opportunities (remote or on-site) in 
                  software development, machine learning, or quantitative research. Let's discuss 
                  how we can work together to build innovative solutions!
                </p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-foreground/5 to-background border border-foreground/10 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/70">Email</h4>
                    <a href="mailto:deyaniruddha_goat@yahoo.com" className="text-foreground font-medium hover:text-cyan-400 transition-colors">
                      deyaniruddha_goat@yahoo.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-foreground/5 to-background border border-foreground/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/70">Phone</h4>
                    <a href="tel:+918780916515" className="text-foreground font-medium hover:text-purple-400 transition-colors">
                      +91 8780916515
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-foreground/5 to-background border border-foreground/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground/70">Location</h4>
                    <p className="text-foreground font-medium">Vadodara, India</p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                variants={fadeInUp}
                className="pt-6 border-t border-foreground/10 mt-8"
              >
                <h4 className="text-sm font-medium text-foreground/70 mb-4">Connect with me</h4>
                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://linkedin.com/in/aniruddha-dey-887b26312"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-foreground/10 hover:border-cyan-500/30 transition-all duration-300 group flex-1 flex flex-col items-center"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/beastrog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-foreground/10 hover:border-purple-500/30 transition-all duration-300 group flex-1 flex flex-col items-center"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5 text-purple-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://aniruddhadey.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-foreground/10 hover:border-blue-500/30 transition-all duration-300 group flex-1 flex flex-col items-center"
                    aria-label="Personal Website"
                  >
                    <Globe className="w-5 h-5 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Website</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div 
            variants={fadeInUp}
            className="p-8 rounded-2xl bg-gradient-to-br from-foreground/5 to-background border border-foreground/10 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-flex items-center">
                Send Me a Message
                <span className="ml-2 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 block flex-1"></span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={fadeInUp}>
                      <div className="relative group">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2 group-focus-within:text-cyan-400 transition-colors">
                          Name *
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-foreground/10 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 hover:border-cyan-400/30 placeholder-foreground/30"
                            placeholder="Your name"
                          />
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp}>
                      <div className="relative group">
                        <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2 group-focus-within:text-cyan-400 transition-colors">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-5 h-5 text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-foreground/10 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 hover:border-cyan-400/30 placeholder-foreground/30"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={fadeInUp}>
                    <div className="relative group">
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2 group-focus-within:text-purple-400 transition-colors">
                        Subject *
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-5 h-5 text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-background/50 border border-foreground/10 rounded-xl focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all duration-300 hover:border-purple-400/30 placeholder-foreground/30"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <div className="relative group">
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2 group-focus-within:text-pink-400 transition-colors">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-5 h-5 text-foreground/30 absolute left-3 top-4 group-focus-within:text-pink-400 transition-colors" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full pl-10 pr-4 py-3 bg-background/50 border border-foreground/10 rounded-xl focus:outline-none focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/20 transition-all duration-300 resize-none hover:border-pink-400/30 placeholder-foreground/30"
                          placeholder="Tell me about your project, opportunity, or just say hello!"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <div className="relative group">
                      <label htmlFor="resume" className="block text-sm font-medium text-foreground/70 mb-2 group-focus-within:text-blue-400 transition-colors">
                        Attach Resume/Portfolio (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center pointer-events-none px-3">
                          <svg className="w-5 h-5 text-foreground/30 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </div>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="w-full pl-10 pr-4 py-3 bg-background/50 border border-foreground/10 rounded-xl focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 transition-all duration-300 file:hidden cursor-pointer hover:border-blue-400/30"
                        />
                        {formData.resume && (
                          <div className="mt-2 text-sm text-foreground/60">
                            Selected: {formData.resume.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
