import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Globe, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/50 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xl">
                V
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">
                Virtual<span className="text-primary">Lab</span>
              </h4>
            </div>
            <p className="text-sm font-bold text-slate-500 leading-relaxed">
              An interactive educational tool for Linear Algebra. Analyze and visualize vectors in multiple dimensions with instant AI-powered insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Theory', path: '/theory' },
                { name: 'Simulink', path: '/simulator' },
                { name: 'Contact', path: '/feedback' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-xs font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-primary transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Contact Info</h4>
            <div className="space-y-3">
              <a href="mailto:krushnasurase060@gmail.com" className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-primary transition-all">
                <Mail size={16} className="text-slate-400" />
                krushnasurase060@gmail.com
              </a>
              <a href="https://aniketchougule1902.github.io/VirtualLab/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-primary transition-all">
                <Globe size={16} className="text-slate-400" />
                aniketchougule1902.github.io/VirtualLab
              </a>
              <div className="flex gap-4 pt-4">
                <a href="https://github.com/aniketchougule1902/VirtualLab" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  <Github size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            &copy; 2026 Virtual Lab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              LINEAR ALGEBRA VECTOR CHECKER
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
