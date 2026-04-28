import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, GraduationCap, Code2, Users2, GitBranch, FileText, MousePointer2 } from 'lucide-react';

export default function Contributors() {
  const team = [
    {
      name: 'Krushna Sandip Surase',
      role: 'Project Lead & Front-End Developer',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOCgOIFVM8113Z1DAb2ayqjGlEtU7xhPhNi2WzmtKJu2stXt1o7vLVkUMwtnkY1B2pmzKFdo_wnVFFl5tOzvEywamCIeQL_971X7COKlEHQQ5TcBkwViGdWBiEODCaEwMU_iRlQj6aExB8ksMr_lVxPZlZ0pGHX1yxygIyYp-FANPXxpCUS2vH8mm_lSU/s800-rw/kuuu00.jpg',
      bio: '1st Year B.Tech I.T. at PCCOE Pune. Front-end developer with expertise in UI/UX and AI prompting.',
      links: { mail: 'mailto:Krushnasurase060@gmail.com', linkedin: '#' }
    },
    {
      name: 'Aniket Vipul Chougule',
      role: 'Lead Developer',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMYJ3mI9Ggc83uzWwPWn06YM53umgLo2ft1xnJZsgdnWfcposdstOxtPXdRPjfZ5pix3Jlteq8ftgjpvLTo9xTaQd8huepN3iIrIK8Dn_ZNGtW68tZYTXva6JKAU0dVASlH-qxZQ3cMPox8MLW7fVoKkPdZCVwhBeVZt3ptquxuIUkatQgjVH_cheamdo/s800-rw/1000108959.jpg',
      bio: '1st Year B.Tech I.T. at PCCOE Pune. Full-stack developer with expertise in AI prompting and project architecture.',
      links: { github: 'https://github.com/aniketchougule1902', linkedin: '#' }
    },
    {
      name: 'Yash Umesh Shinde',
      role: 'Documentation & Research',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTbdJI-rHEai6nsjfrRrhQpL0bafRJkpgvVRgaIDDwBMVkL8w9tzIUuiLokIufXbHEXvINEQX83LA8y2SMFkyUto-krNFLc13OqU6gLlwwqEsuNb1EfVr90exht4QkosqXisDX1GG4WEvNbZelrZnPuHOmFjDCzfdDPijRPOD2cFU80I4MoB3VV5Y7CbQ/s854-rw/1000108923.jpg',
      bio: '1st Year B.Tech I.T. at PCCOE Pune. Responsible for research, documentation, and content quality.',
      links: { github: '#', linkedin: '#' }
    },
    {
      name: 'Rohit Parasram Gaikwad',
      role: 'Documentation & Front-End Developer',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLiENa2VEXP3TY9embCwxIcxTVNS5slzPlT5VCC6PMkCGtb4Naq1i8fjO-bNLRLGpvYM-dwejNSGQ18vOAZ0UHXd921VUZbap3vuQdLu2gGU99xbje1mAKj_-xEzqIzXtgWzbTIO_hlPT-9wiYc9AEbM_Chd9WUWW0DeKQM8Kn91QiRpyO47kduGLdI50/s600-rw/1000108920.jpg',
      bio: '1st Year B.Tech I.T. at PCCOE Pune. Responsible for research, documentation, and front-end development.',
      links: { github: '#', linkedin: '#' }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-12 px-4 sm:px-6">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">
          <Users2 size={12} /> The Team
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Project Contributors</h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          B.Tech I.T. students at PCCOE Pune, dedicated to interactive engineering and mathematical visualization.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((person, i) => (
          <div 
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
              <img 
                src={person.image} 
                alt={person.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">
                  {person.name}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                  {person.role}
                </p>
              </div>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                {person.bio}
              </p>
              <div className="flex gap-2 pt-4 border-t border-slate-100">
                {person.links.github && (
                  <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <Github size={18} />
                  </a>
                )}
                {person.links.linkedin && (
                  <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </a>
                )}
                {person.links.mail && (
                  <a href={person.links.mail} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <Mail size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        {/* Institution Section */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Institutional Profile</h2>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-black text-slate-900 border-l-4 border-primary pl-4">Pimpri Chinchwad College of Engineering (PCCOE), Pune</h4>
            <div className="grid gap-2">
              {[
                { label: "Department", value: "Information Technology" },
                { label: "Programme", value: "B.Tech First Year" },
                { label: "Project Type", value: "Virtual Lab — Educational Tool" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                  <span className="text-xs font-black text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs font-bold text-slate-500 leading-relaxed italic border-t border-slate-100 pt-4">
            "We are grateful to our faculty and institution for providing the opportunity and resources to develop this tool."
          </p>
        </section>

        {/* GitHub / Get Involved */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-primary">
              <Code2 size={24} />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Open Source</h2>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              This project is open-source. Contributions from educators, developers, and students are welcome.
            </p>
            
            <div className="grid gap-3">
              {[
                { icon: GitBranch, text: "Bugs & Features" },
                { icon: FileText, text: "Documentation" },
                { icon: MousePointer2, text: "Visualizations" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-600">
                  <item.icon size={14} className="text-primary" />
                  {item.text}
                </div>
              ))}
            </div>

            <a 
              href="https://github.com/aniketchougule1902/VirtualLab" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all"
            >
              <Github size={16} />
              GitHub Repository
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
