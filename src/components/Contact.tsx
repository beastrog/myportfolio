
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        resume: null
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Let's Connect</h3>
              <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                I'm currently seeking summer internship opportunities (remote or on-site) in 
                software development, machine learning, or quantitative research. Let's discuss 
                how we can work together!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-foreground/70">deyaniruddha_goat@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  📱
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-foreground/70">+91 8780916515</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-foreground/70">Vadodara, India</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <a
                href="https://linkedin.com/in/aniruddha-dey-887b26312"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-hover"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/beastrog"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-hover"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 cursor-hover"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 cursor-hover"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 cursor-hover"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none cursor-hover"
                  placeholder="Tell me about your project, opportunity, or just say hello!"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-foreground/80 mb-2">
                  Attach Resume/Portfolio (Optional)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 bg-background/50 border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 cursor-hover file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 cursor-hover shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
