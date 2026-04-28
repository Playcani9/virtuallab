import React from 'react';
import { motion } from 'framer-motion';

export default function Aim() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 px-4 sm:px-6">
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Project Aim</h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          Defining the core mission and educational objectives of the Virtual Lab initiative.
        </p>
      </header>
      
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10 text-slate-700">
        <div className="space-y-4">
          <p className="text-lg font-medium leading-relaxed">
            The primary aim of the <span className="text-primary font-black">Virtual Lab</span> is to provide an intuitive, web-based educational tool that helps students and educators visualize and understand the concepts of linear dependency and independence in vector spaces across multiple dimensions.
          </p>
        </div>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            Core Mission
          </h2>
          <p className="font-medium leading-relaxed text-slate-600">
            To bridge the gap between abstract mathematical constructs and visual intuition by providing both rigorous analytical methods and clear graphical representations for vector space analysis.
          </p>
        </section>

        <section className="space-y-6 pt-4 border-t border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Educational Objectives</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary">01. Intuition</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                Grasp the fundamental concepts of linear combination and span through active 3D interaction.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary">02. Skills</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                Master matrix operations and determinant calculations within an automated, error-free environment.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary">03. Impact</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                Provide a free, open-source resource that democratizes access to high-quality math visuals globally.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
