
import { FileDown, ExternalLink } from 'lucide-react';

const Resume = () => {
  const handleDownloadResume = () => {
    // This would typically download a PDF file
    // For now, we'll create a placeholder action
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You'll need to add this file to the public folder
    link.download = 'Aniruddha_Dey_Resume.pdf';
    link.click();
  };

  const handleViewResume = () => {
    // Open resume in new tab
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Resume
        </h2>
        
        <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-2xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Get My Latest Resume</h3>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Download my comprehensive resume showcasing my technical skills, achievements, 
              project experience, and academic background. Updated with my latest accomplishments 
              and ongoing projects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            >
              <FileDown className="w-5 h-5" />
              Download Resume
            </button>
            
            <button
              onClick={handleViewResume}
              className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              View Online
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h4 className="text-cyan-400 font-semibold mb-2">Technical Skills</h4>
              <p className="text-foreground/70 text-sm">Full-stack development, ML/AI, competitive programming</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h4 className="text-cyan-400 font-semibold mb-2">Experience</h4>
              <p className="text-foreground/70 text-sm">Startup co-founder, trading interviews, hackathon finalist</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <h4 className="text-cyan-400 font-semibold mb-2">Education</h4>
              <p className="text-foreground/70 text-sm">B.Tech CSE at VIT, CodeSignal GCA 500/600</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
