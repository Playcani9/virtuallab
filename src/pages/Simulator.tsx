import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Info, ChevronDown, ChevronUp, BookOpen, Sparkles, Wand2, Target, Beaker, RotateCcw, Shuffle, FileText, Copy, Download, Tag, Dice5 } from 'lucide-react';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';
import { InlineMath, BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { Vector } from '../types';
import { analyzeVectors } from '../services/geminiService';

const COLORS = ['#4f46e5', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'];

import { solveRREF, RrefStep, findBasisVectors, findDependencyRelation } from '../lib/linearAlgebra';
import { useNav } from '../context/NavContext';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function Simulator() {
  const { isMoreOpen } = useNav();
  const [dimension, setDimension] = useState<number>(() => {
    const saved = localStorage.getItem('vlab-dimension');
    return saved ? parseInt(saved) : 3;
  });
  const [vectors, setVectors] = useState<Vector[]>(() => {
    const saved = localStorage.getItem('vlab-vectors');
    return saved ? JSON.parse(saved) : [
      { id: '1', values: Array(10).fill(0).map((_, i) => i === 0 ? 1 : 0), color: COLORS[0] },
      { id: '2', values: Array(10).fill(0).map((_, i) => i === 1 ? 1 : 0), color: COLORS[1] },
      { id: '3', values: Array(10).fill(0).map((_, i) => i === 2 ? 1 : 0), color: COLORS[2] },
    ];
  });

  useEffect(() => {
    localStorage.setItem('vlab-dimension', dimension.toString());
  }, [dimension]);

  useEffect(() => {
    localStorage.setItem('vlab-vectors', JSON.stringify(vectors));
  }, [vectors]);
  const [showSteps, setShowSteps] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'visual' | 'analysis'>('input');

  const clearAll = useCallback(() => {
    const defaultVectors = Array(3).fill(0).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      values: Array(10).fill(0),
      color: COLORS[i % COLORS.length]
    }));
    setVectors(defaultVectors);
    setAiAnalysis(null);
    setAnalysisResults(null);
  }, []);

  const generateRandom = useCallback(() => {
    setVectors(prev => prev.map(v => ({
      ...v,
      values: Array(10).fill(0).map(() => parseFloat((Math.random() * 6 - 3).toFixed(1)))
    })));
    setAiAnalysis(null);
    setAnalysisResults(null);
  }, []);

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    // Artificial delay for professional SaaS feel
    setTimeout(() => {
      try {
        const activeVectors = vectors.map(v => v.values.slice(0, dimension));
        
        const zeroVectorIndex = activeVectors.findIndex(v => v.every(val => val === 0));
        if (zeroVectorIndex !== -1) {
          setAnalysisResults({ 
            error: `Vector ${zeroVectorIndex + 1} is a zero vector. Any set containing the zero vector is linearly dependent.`,
            isIndependent: false,
            rank: 0,
            det: null,
            steps: [],
            rref: null,
            basis: [],
            dependencyRelation: "Set contains a zero vector."
          });
          setIsCalculating(false);
          return;
        }

        let warning = null;
        if (vectors.length > dimension) {
          warning = `Dimension Theorem: In ${dimension}D space, any set with more than ${dimension} vectors (${vectors.length} provided) is guaranteed to be linearly dependent.`;
        }

        const matrixToSolve = math.transpose(activeVectors) as number[][];
        const { result: rrefResult, steps, rank } = solveRREF(matrixToSolve);
        const isIndependent = rank === vectors.length;
        
        const basis = findBasisVectors(matrixToSolve, rrefResult, rank);
        const dependencyRelation = findDependencyRelation(vectors.length, rank);

        let det = null;
        if (dimension === vectors.length) {
          try {
            det = math.det(matrixToSolve);
          } catch (e) {
            det = null;
          }
        }

        setAnalysisResults({ isIndependent, rank, det, steps, error: null, warning, rref: rrefResult, basis, dependencyRelation });
      } catch (e) {
        setAnalysisResults({ 
          error: "An error occurred during calculation. Check your inputs.",
          isIndependent: false,
          rank: 0,
          det: null,
          steps: [],
          rref: null,
          basis: [],
          dependencyRelation: "Error in calculation"
        });
      }
      setIsCalculating(false);
    }, 600);
  }, [vectors, dimension]);

  const exportResults = () => {
    if (!analysisResults) return;
    let text = `Linear Algebra Vector Analysis — Virtual Lab\n`;
    text += `Generated: ${new Date().toLocaleString()}\n\n`;
    text += `Dimension: ${dimension}D\n`;
    text += `Number of vectors: ${vectors.length}\n\n`;
    
    text += `Vectors:\n`;
    vectors.forEach((v, index) => {
      text += `  v${index + 1} = (${v.values.slice(0, dimension).map(x => x.toFixed(2)).join(', ')})\n`;
    });
    
    text += `\nAnalysis Results:\n`;
    text += `  Rank: ${analysisResults.rank} of ${vectors.length}\n`;
    text += `  Linear Dependency: ${analysisResults.isIndependent ? 'Independent' : 'Dependent'}\n`;
    
    if (analysisResults.det !== null) {
      text += `  Determinant: ${analysisResults.det.toFixed(6)}\n`;
    }
    
    if (analysisResults.dependencyRelation) {
      text += `\nDependency Relation:\n  ${analysisResults.dependencyRelation}\n`;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vector-analysis-${dimension}D-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!analysisResults) return;
    let text = `Vectors: ${vectors.map((v, i) => `v${i+1}=(${v.values.slice(0, dimension).map(x => x.toFixed(1)).join(',')})`).join(', ')}\n`;
    text += `Status: ${analysisResults.isIndependent ? 'Linearly Independent' : 'Linearly Dependent'}\n`;
    text += `Rank: ${analysisResults.rank}/${vectors.length}`;
    
    navigator.clipboard.writeText(text);
  };

  const addVector = () => {
    if (vectors.length >= 8) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setVectors([...vectors, { 
      id: newId, 
      values: Array(10).fill(0), 
      color: COLORS[vectors.length % COLORS.length] 
    }]);
  };

  const removeVector = (id?: string) => {
    if (vectors.length <= 1) return;
    if (id) {
      setVectors(vectors.filter(v => v.id !== id));
    } else {
      setVectors(vectors.slice(0, -1));
    }
  };

  const updateVector = (id: string, index: number, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue)) return;

    setVectors(vectors.map(v => {
      if (v.id === id) {
        const newValues = [...v.values];
        newValues[index] = numValue;
        return { ...v, values: newValues };
      }
      return v;
    }));
  };

  const results = analysisResults;

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const analysis = await analyzeVectors(vectors, dimension);
      setAiAnalysis(analysis);
    } catch (error) {
      setAiAnalysis("I'm sorry, I couldn't analyze the vectors right now.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] pb-32 lg:pb-0">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-background-lab/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-slate-900 capitalize tracking-tight">{activeTab}</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Beaker size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Input Controls */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <InputSection />
        </div>

        {/* Right Side: Visualization & Results */}
        <div className="lg:col-span-8 space-y-8">
          <VisualSection />
          <AnalysisSection />
        </div>
      </div>

      {/* Mobile/Tablet Layout - Tabbed Navigation */}
      <div className="lg:hidden space-y-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'input' && <InputSection />}
          {activeTab === 'visual' && <VisualSection />}
          {activeTab === 'analysis' && <AnalysisSection />}
        </motion.div>
      </div>

      {/* Modern Tabbed Bottom Nav (Mobile/Tablet Only) - Repositioned to clear global BottomNav */}
      <AnimatePresence>
        {!isMoreOpen && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="lg:hidden fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
          >
            <div className="glass-card p-2 flex items-center justify-between shadow-2xl border-white/20 bg-white/90 backdrop-blur-3xl">
          <button 
            onClick={() => setActiveTab('input')}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl transition-all",
              activeTab === 'input' ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Plus size={20} />
            <span className="text-[10px] font-black uppercase">Input</span>
          </button>
          <button 
            onClick={() => setActiveTab('visual')}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl transition-all",
              activeTab === 'visual' ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Target size={20} />
            <span className="text-[10px] font-black uppercase">Visual</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('analysis');
              if (!results) calculateResults();
            }}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-2 rounded-2xl transition-all",
              activeTab === 'analysis' ? "bg-primary text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Sparkles size={20} />
            <span className="text-[10px] font-black uppercase">Result</span>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
  );

  function InputSection() {
    return (
      <div className="glass-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-black flex items-center gap-2 text-slate-800">
            <Wand2 size={24} className="text-primary" />
            Config
          </h2>
          <div className="flex w-full sm:w-auto bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
            {[2, 3, 4, 5, 6, 7].map((d) => (
              <button 
                key={d}
                onClick={() => setDimension(d)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0", 
                  dimension === d ? "bg-white shadow-sm text-primary" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {d}D
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {vectors.map((v, i) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-3 p-4 bg-secondary border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-500">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: v.color }} />
                    Vector {i + 1}
                  </span>
                  <button onClick={() => removeVector(v.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                  {Array.from({ length: dimension }).map((_, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400 ml-1">x{idx + 1}</label>
                      <input 
                        type="number"
                        value={v.values[idx]}
                        onChange={(e) => updateVector(v.id, idx, e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-xl px-2 py-2 text-xs font-black text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 items-center gap-3">
          <button 
            onClick={addVector}
            disabled={vectors.length >= 8}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-black text-xs"
          >
            <Plus size={18} /> Add Vector
          </button>
          <button 
            onClick={clearAll}
            className="w-full py-4 bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center gap-2 font-black text-xs rounded-2xl"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
           <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={generateRandom}
              className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 font-black text-xs"
            >
              <Shuffle size={18} /> Randomize
            </button>
            <button 
              onClick={() => {
                calculateResults();
                if (window.innerWidth < 1024) setActiveTab('analysis');
              }}
              disabled={isCalculating}
              className="w-full py-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 font-black text-xs disabled:opacity-50"
            >
              {isCalculating ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Target size={18} /> Solve Now</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const plotData = useMemo(() => {
    return vectors.map((v, i) => ({
      type: dimension === 2 ? ('scatter' as const) : ('scatter3d' as const),
      mode: 'lines+markers' as const,
      x: [0, v.values[0]],
      y: [0, v.values[1]],
      z: dimension === 3 ? [0, v.values[2]] : undefined,
      name: `V${i + 1}`,
      line: { color: v.color, width: 8, shape: 'spline' as const },
      marker: { size: 8, color: v.color, symbol: 'circle' }
    }));
  }, [vectors, dimension]);

  const plotLayout = useMemo(() => ({
    autosize: true,
    margin: { l: 20, r: 20, b: 20, t: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    showlegend: true,
    legend: { 
      x: 0, 
      y: 1, 
      orientation: 'h' as const,
      font: { family: 'Inter', size: 10, color: '#64748b' } 
    },
    scene: {
      xaxis: { range: [-5, 5], gridcolor: '#e2e8f0', zerolinecolor: '#cbd5e1', title: '' },
      yaxis: { range: [-5, 5], gridcolor: '#e2e8f0', zerolinecolor: '#cbd5e1', title: '' },
      zaxis: { range: [-5, 5], gridcolor: '#e2e8f0', zerolinecolor: '#cbd5e1', title: '' },
      camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } }
    },
    xaxis: { range: [-5, 5], gridcolor: '#e2e8f0', zerolinecolor: '#cbd5e1', title: '' },
    yaxis: { range: [-5, 5], gridcolor: '#e2e8f0', zerolinecolor: '#cbd5e1', title: '' },
  }), [dimension]);

  function VisualSection() {
    return (
      <div className="glass-card p-4 h-[450px] lg:h-[600px] relative overflow-hidden group">
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/50 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            {dimension}D Simulation
          </div>
        </div>
        <Plot
          data={plotData}
          layout={plotLayout}
          useResizeHandler={true}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  function AnalysisSection() {
    if (!results) {
      return (
        <div className="glass-card-milky p-12 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-200">
           <div className="w-20 h-20 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-400">
              <Sparkles size={40} />
           </div>
           <h3 className="text-xl font-black text-slate-600">Analysis Pending</h3>
           <p className="text-xs font-bold text-slate-500 max-w-[200px]">Enter vector values and click Solve Now to see mathematical results.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header Banner - High Impact */}
        <div className={cn(
          "p-8 rounded-[2.5rem] border-4 shadow-2xl overflow-hidden relative transition-all",
          results.isIndependent ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
        )}>
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className={cn(
              "p-6 rounded-[2rem] shadow-xl",
              results.isIndependent ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            )}>
              {results.isIndependent ? <Target size={48} /> : <Info size={48} />}
            </div>
            <div className="text-center sm:text-left">
              <h3 className={cn(
                "text-3xl sm:text-4xl font-black mb-1",
                results.isIndependent ? "text-emerald-950" : "text-rose-950"
              )}>
                {results.isIndependent ? 'Linearly Independent' : 'Linearly Dependent'}
              </h3>
              <p className={cn(
                "text-sm font-black uppercase tracking-[0.3em] opacity-80",
                results.isIndependent ? "text-emerald-900" : "text-rose-900"
              )}>
                Mathematical Analysis Completed
              </p>
            </div>
          </div>
          <div className={cn(
            "absolute -right-8 -bottom-8 opacity-5",
            results.isIndependent ? "text-emerald-600" : "text-rose-600"
          )}>
            {results.isIndependent ? <Target size={300} /> : <Info size={300} />}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card-milky p-6 border border-slate-200/50">
             <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">Matrix Rank</p>
             <div className="flex items-baseline gap-2">
               <span className="text-4xl font-black text-slate-800">{results.rank}</span>
               <span className="text-sm font-black text-slate-400">/ {vectors.length}</span>
             </div>
          </div>
          <div className="glass-card-milky p-6 border border-slate-200/50">
             <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2">Determinant</p>
             <span className="text-4xl font-black text-slate-800">
               {results.det !== null ? results.det.toFixed(2) : 'N/A'}
             </span>
          </div>
          <div className="flex gap-3">
            <button onClick={exportResults} className="flex-1 glass-card border-emerald-100 flex flex-col items-center justify-center gap-2 text-emerald-600 hover:bg-emerald-50 transition-colors">
               <Download size={20} />
               <span className="text-[9px] font-black uppercase">Report</span>
            </button>
            <button onClick={copyToClipboard} className="flex-1 glass-card border-blue-100 flex flex-col items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 transition-colors">
               <Copy size={20} />
               <span className="text-[9px] font-black uppercase">Copy</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            {!results.isIndependent && (
              <div className="glass-card p-6 border-l-8 border-l-rose-500 bg-rose-50/20">
                <h4 className="text-xs font-black uppercase text-rose-800 mb-2 flex items-center gap-2">
                  <Dice5 size={16} /> Formal Logic Relation
                </h4>
                <p className="text-sm font-black text-slate-700 italic leading-relaxed">
                  "{results.dependencyRelation}"
                </p>
              </div>
            )}
            
            <div className="glass-card p-6 space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
                <BookOpen size={16} className="text-primary" /> Basis Vectors
              </h4>
              <div className="grid gap-3 max-h-[250px] overflow-y-auto no-scrollbar">
                {results.basis.map((b, idx) => (
                  <div key={idx} className="p-3 bg-slate-100/50 rounded-[1.25rem] border border-slate-200 flex items-center gap-4">
                    <span className="text-[10px] font-black text-primary opacity-60">#{idx+1}</span>
                    <div className="flex gap-2 flex-wrap">
                      {b.map((val, ci) => (
                        <span key={ci} className="text-xs font-mono font-black text-slate-800 px-1.5 py-0.5 bg-white rounded-md border border-slate-200 shadow-sm">
                          {val.toFixed(2)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6 bg-slate-900 text-white">
            <h4 className="text-xs font-black uppercase text-slate-500 flex items-center gap-2">
              <FileText size={18} className="text-emerald-400" /> RREF Resolved Matrix
            </h4>
            <div className="space-y-2 overflow-x-auto no-scrollbar">
              {results.rref?.map((row, ri) => (
                <div key={ri} className="flex gap-2 min-w-max justify-center">
                  {row.map((val, ci) => (
                    <div key={ci} className={cn(
                      "w-12 h-10 sm:w-14 sm:h-12 flex items-center justify-center rounded-[1rem] text-[10px] sm:text-xs font-mono font-black border transition-all",
                      Math.abs(val - 1) < 1e-10 ? "bg-emerald-500 text-white border-emerald-400 shadow-xl shadow-emerald-500/20" : "bg-white/5 border-white/10 text-white/30"
                    )}>
                      {val.toFixed(1)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-[10px] font-black text-center text-emerald-400/30 uppercase tracking-widest pt-4">Calculated via Gaussian Elimination</p>
          </div>
        </div>

        {/* Deep AI Logic */}
        <button 
          onClick={handleAiAnalysis}
          disabled={isAnalyzing}
          className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black flex items-center justify-center gap-4 hover:shadow-2xl hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-50 group overflow-hidden relative"
        >
          {isAnalyzing ? (
            <div className="w-6 h-6 border-3 border-white/20 border-t-emerald-400 rounded-full animate-spin" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <Sparkles size={24} className="text-emerald-400 animate-pulse" /> 
              <span className="text-sm tracking-widest text-emerald-50 uppercase">Invoke Deep AI Intelligence</span>
              <ChevronUp size={20} className="text-slate-500 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>

        {aiAnalysis && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 border-slate-200 bg-white shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8 text-slate-800">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white">
                  <Sparkles size={24} />
               </div>
               <div>
                  <h3 className="text-2xl font-black">Intelligence Report</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Analysis Complete</p>
               </div>
            </div>
            <div className="markdown-body prose prose-slate max-w-none prose-sm sm:prose-base text-slate-700">
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {aiAnalysis}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}

        <div className="glass-card overflow-hidden">
          <button 
            onClick={() => setShowSteps(!showSteps)}
            className="w-full p-8 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary text-white rounded-3xl shrink-0 shadow-lg shadow-primary/20">
                <BookOpen size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black text-slate-800">Proof Engine</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Step-by-Step Reduction</p>
              </div>
            </div>
            <ChevronDown className={cn("text-slate-300 transition-transform", showSteps && "rotate-180")} size={24} />
          </button>
          
          <AnimatePresence>
            {showSteps && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t"
              >
                <div className="p-8 space-y-12 bg-slate-50/50">
                  {results.steps.map((step, i) => (
                    <div key={i} className="relative pl-12 space-y-6">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-primary">
                          {i + 1}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-slate-800">{step.title}</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{step.description}</p>
                      </div>
                      <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-x-auto text-slate-800">
                        <BlockMath math={`\\begin{pmatrix} ${step.matrix.map(row => row.map(val => val.toFixed(1)).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`} />
                      </div>
                    </div>
                  ))}
                  <div className="p-6 bg-primary/5 rounded-3xl text-sm text-primary font-black border border-primary/10 text-center">
                    Final Rank Strategy: The reduction yields rank {results.rank}.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
}
