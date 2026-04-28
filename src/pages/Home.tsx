import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FlaskConical, 
  ClipboardCheck, 
  BookOpen, 
  Sparkles, 
  Layout, 
  Zap, 
  ShieldCheck,
  Search,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Structural Grid Background */}
      <div className="absolute inset-x-0 top-0 h-screen pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8fafc] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-32">
        {/* Modern Split Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                The Standard in Linear Learning
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight"
              >
                Geometry <br />
                Meets <span className="text-primary italic">Algebra.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed"
              >
                Scale your mathematical intuition with high-fidelity vector simulations and automated row-reduction proofs.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/simulator" className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                Enter Simulation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/theory" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 hover:shadow-lg transition-all active:scale-95">
                Read Abstract
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <div className="pt-10 flex gap-12 border-t border-slate-200">
              <div>
                <div className="text-2xl font-black text-slate-900">500+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculations/day</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interactive</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">24/7</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lab Access</div>
              </div>
            </div>
          </div>

          {/* Abstract Geometric Visual (Dashboard Preview Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="hidden lg:block relative"
          >
            <div className="relative bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden group">
              <div className="h-12 border-b border-slate-100 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-100" />
                <div className="w-3 h-3 rounded-full bg-slate-100" />
                <div className="w-3 h-3 rounded-full bg-slate-100" />
                <div className="flex-1" />
                <div className="w-32 h-6 bg-slate-50 rounded-full" />
              </div>
              <div className="p-8 aspect-[4/3] bg-slate-50/30 flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-32 bg-white rounded-xl border border-slate-100 shadow-sm" />
                  ))}
                </div>
                <div className="flex-1 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                  {/* Decorative Spark Lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[80%] h-[1px] bg-slate-100 rotate-45 transform scale-150" />
                    <div className="w-[80%] h-[1px] bg-slate-100 -rotate-45 transform scale-150" />
                    <div className="w-16 h-16 rounded-full border border-primary/20 bg-primary/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-4 bg-primary text-white rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <Zap size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Real-time Viz</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-tight">
                Verified<br/>Results
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Value Propositions - Clean Minimal Grid */}
        <section className="mt-32 border-t border-slate-200 pt-32">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-indigo-50 text-primary rounded-xl flex items-center justify-center">
                <Layout size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Virtual Simulation</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Manipulate vectors in a high-performance 3D engine built for mathematical accuracy.
                </p>
                <Link to="/simulator" className="group text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  Try it now <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Step-by-Step Theory</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Bridge the gap between notation and visual intuition with curated interactive notes.
                </p>
                <Link to="/theory" className="group text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <ClipboardCheck size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">Assessment Suite</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Validate your progress with pre and post-tests designed to measure conceptual mastery.
                </p>
                <Link to="/pretest" className="group text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  Take test <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Teaser - High End Image Section */}
        <section className="mt-48">
          <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden">
            <div className="px-12 py-24 sm:px-24 flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white">
                <Sparkles size={14} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">Scalable Mathematics</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white max-w-2xl leading-tight">
                Everything you need to <span className="italic text-primary">Master Linear Algebra.</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-xl">
                Ready to transform your understanding of vector spaces? Join hundreds of engineering students exploring the lab daily.
              </p>
              <div className="pt-6">
                <Link to="/simulator" className="inline-flex items-center gap-4 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-primary hover:text-white transition-all">
                  Get Started for Free
                </Link>
              </div>
            </div>
            
            {/* Decorative background grid in the CTA */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

