import React from 'react';
import { BookOpen, Info, Sparkles, Binary, Layers, Target, GraduationCap, Code2, Globe } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

export default function Theory() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-24 px-4">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-4 font-sans">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest">
          <BookOpen size={14} />
          Comprehensive Theory
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Linear <span className="text-primary">Algebra</span> Fundamentals
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed px-4">
          Understanding linear dependency, independency, and vector spaces in <InlineMath math="\mathbb{R}^n" /> space.
        </p>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Section 1: Introduction to Vectors */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-primary">
              <Binary size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight text-left">Introduction to Vectors in <InlineMath math="\mathbb{R}^n" /></h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            In linear algebra, a <strong>vector</strong> is an element of a vector space. For <InlineMath math="n" />-dimensional space <InlineMath math="\mathbb{R}^n" />, a vector is represented as an ordered <InlineMath math="n" />-tuple of real numbers.
          </p>
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary mb-4">Definition: n-Dimensional Vector</h4>
            <p className="text-slate-700 font-bold mb-4">A vector in <InlineMath math="\mathbb{R}^n" /> is an ordered <InlineMath math="n" />-tuple of real numbers:</p>
            <div className="py-6 flex justify-center overflow-x-auto custom-scrollbar bg-slate-50 rounded-2xl border border-slate-100">
              <BlockMath math="\mathbf{v} = (v_1, v_2, \dots, v_n) \in \mathbb{R}^n" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-4 italic">
              Where each <InlineMath math="v_i" /> is a real number called a component.
            </p>
          </div>
        </section>

        {/* Section 2: Linear Combination */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-accent">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-accent">
              <Layers size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight text-left">Linear Combination in n-Dimensions</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            A linear combination (LC) of vectors in <InlineMath math="\mathbb{R}^n" /> is constructed by multiplying each vector by a scalar and adding the results.
          </p>
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-accent mb-4">Definition: Linear Combination</h4>
            <p className="text-slate-700 font-bold mb-4">Given vectors <InlineMath math="\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_k" /> and scalars <InlineMath math="c_1, c_2, \dots, c_k" /> in <InlineMath math="\mathbb{R}" />:</p>
            <div className="py-6 flex justify-center overflow-x-auto custom-scrollbar bg-slate-50 rounded-2xl border border-slate-100">
              <BlockMath math="\mathbf{w} = c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k" />
            </div>
          </div>
        </section>

        {/* Section 3: Dependency and Independency */}
        <section className="space-y-10">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
              <Target size={24} className="text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight text-left">Dependency & Independency</h2>
          </div>
          
          <div className="bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-900/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 opacity-50">
              <Binary size={120} />
            </div>
            <div className="relative z-10 space-y-6 text-center">
              <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary mb-4">The core condition</h4>
              <p className="text-slate-300 font-bold">Vectors <InlineMath math="\{\mathbf{v}_1, \dots, \mathbf{v}_k\}" /> are <strong>linearly dependent</strong> if there exist scalars not all zero such that:</p>
              <div className="py-8 flex justify-center overflow-x-auto custom-scrollbar bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <BlockMath math="c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \dots + c_k\mathbf{v}_k = \mathbf{0}" />
              </div>
              <p className="text-sm text-slate-400 font-bold">
                If the only solution is <InlineMath math="c_1 = c_2 = \dots = c_k = 0" />, the vectors are <strong>linearly independent</strong>.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2 text-slate-800 tracking-tight">
              <Sparkles size={20} className="text-amber-500" />
              Geometric Interpretation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "ℝ² (2D)", text: "Dependent if collinear (lie on the same line). Any 3+ vectors are always dependent." },
                { label: "ℝ³ (3D)", text: "Dependent if coplanar (lie on the same plane). Any 4+ vectors are always dependent." },
                { label: "ℝⁿ (nD)", text: "General Rule: Any set of more than n vectors is always linearly dependent." }
              ].map((box, i) => (
                <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary transition-colors group">
                  <h4 className="font-black text-slate-800 mb-2 group-hover:text-primary">{box.label}</h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">{box.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-xl h-fit shadow-lg shadow-indigo-500/20">
              <GraduationCap size={20} />
            </div>
            <div>
              <h4 className="font-black text-indigo-900 tracking-tight">Dimension Theorem</h4>
              <p className="text-indigo-800/80 text-sm font-bold mt-1 leading-relaxed">
                The maximum number of linearly independent vectors in <InlineMath math="\mathbb{R}^n" /> is exactly <InlineMath math="n" />.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Methods for Determination */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
              <Code2 size={24} className="text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-left">Determination Methods</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">1</div>
              <h3 className="font-black text-slate-800">Matrix Rank</h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">For k vectors in ℝⁿ, form a matrix. The vectors are independent if the rank equals k.</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-black text-primary font-mono tracking-wider">
                Independent iff Rank(A) = k
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-black">2</div>
              <h3 className="font-black text-slate-800">Determinant</h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed">For n vectors in ℝⁿ (square matrix), independence is guaranteed if det(A) ≠ 0.</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-black text-accent font-mono tracking-wider">
                Independent iff det(A) ≠ 0
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">3. Reduced Row Echelon Form (RREF)</h3>
            <p className="text-slate-500 leading-relaxed font-bold">RREF is the most versatile method. Count leading 1s (pivots):</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Number of pivots = Rank of matrix",
                "Rank = Number of vectors means Independent",
                "Rank < Number of vectors means Dependent",
                "Pivot columns point to basis vectors"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Real World Applications */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-indigo-900">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-primary">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-left">Real World Applications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "Data Science", icon: "📊" },
              { label: "Quantum Physics", icon: "🌌" },
              { label: "Portfolio Op.", icon: "📈" },
              { label: "3D Graphics", icon: "🎮" },
              { label: "AI & ML", icon: "🤖" },
              { label: "Engineering", icon: "⚙️" },
            ].map((app) => (
              <div key={app.label} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col items-center gap-3 hover:border-primary transition-all text-center group cursor-default">
                <span className="text-3xl filter saturate-0 group-hover:saturate-100 transition-all">{app.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary">{app.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Exercises */}
        <section className="space-y-8 bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 text-white/5 rotate-12">
            <Target size={160} />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Practice Exercises</h2>
              <p className="text-slate-400 font-bold">Test your knowledge of ℝⁿ dimensional theory</p>
            </div>
            
            <div className="grid gap-6">
              <div className="p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary">01. 4D Space Challenge</h4>
                <p className="text-slate-300 font-bold">Determine if the following are independent in ℝ⁴:</p>
                <div className="bg-black/30 p-6 rounded-2xl text-center border border-white/5 shadow-inner">
                  <InlineMath math="\mathbf{v}_1=(1,0,0,1), \mathbf{v}_2=(0,1,0,1), \mathbf{v}_3=(0,0,1,1), \mathbf{v}_4=(1,1,1,3)" />
                </div>
                <p className="text-[10px] text-slate-500 font-black italic uppercase tracking-widest">Method: Form a 4×4 matrix and compute rank.</p>
              </div>

              <div className="p-6 sm:p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-1">02. Fundamental Limit</h4>
                  <p className="text-slate-300 font-bold">Max number of linearly independent vectors in ℝ⁵?</p>
                </div>
                <div className="px-6 py-3 bg-primary text-white font-black rounded-xl text-xl shadow-lg shadow-primary/20">
                  5
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Note Section */}
        <div className="flex gap-4 p-6 rounded-3xl bg-amber-50 border border-amber-100 items-start">
          <div className="p-2 bg-amber-500 text-white rounded-lg">
            <Info size={20} />
          </div>
          <p className="text-sm text-amber-900 font-bold leading-relaxed italic">
            <strong>Visualization Note:</strong> Mathematical principles extend to any dimension. Virtual Lab supports analysis up to ℝ¹⁰, with 3D renderings available for lower dimensional subspaces.
          </p>
        </div>

      </div>
    </div>
  );
}
