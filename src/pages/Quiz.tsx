import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, AlertCircle, Timer, Info } from 'lucide-react';
import { PRETEST_QUESTIONS, POSTTEST_QUESTIONS } from '../constants';
import { cn } from '../lib/utils';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface QuizProps {
  type: 'pretest' | 'posttest';
}

export default function Quiz({ type }: QuizProps) {
  const questions = type === 'pretest' ? PRETEST_QUESTIONS : POSTTEST_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const score = Object.entries(answers).reduce((acc, [idx, ans]) => {
      return acc + (ans === questions[parseInt(idx)].correctAnswer ? 1 : 0);
    }, 0);

    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('test_results').insert({
          user_id: session.user.id,
          score,
          total: questions.length,
          type,
          date: new Date().toISOString()
        });
      }
    }
  };

  const score = Object.entries(answers).reduce((acc, [idx, ans]) => {
    return acc + (ans === questions[parseInt(idx)].correctAnswer ? 1 : 0);
  }, 0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 py-12 px-4 sm:px-6">
        <header className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary/10 animate-pulse">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Assessment Completed</h2>
            <p className="text-slate-500 font-medium">Review your performance in the {type}.</p>
          </div>
        </header>

        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Score</p>
                <p className="text-4xl font-black text-slate-900">{score} <span className="text-slate-300 text-2xl">/ {questions.length}</span></p>
              </div>
              <div className="w-16 h-16 bg-white rounded-full border border-slate-100 flex items-center justify-center text-primary font-black shadow-sm">
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary w-full shadow-xl shadow-primary/10"
            >
              Retake Assessment
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
              "Continuous testing is key to mastering the complex relationships of vector spaces. Keep practicing to improve your intuition."
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg underline decoration-2 cursor-pointer">View Solutions &#8595;</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight ml-2">Solution Review</h3>
          {questions.map((q, i) => (
            <div key={q.id} className={cn(
              "bg-white p-6 sm:p-10 rounded-3xl border shadow-sm relative overflow-hidden transition-all duration-500",
              answers[i] === q.correctAnswer ? "border-emerald-100" : "border-rose-100"
            )}>
              <div className={cn(
                "absolute top-0 left-0 w-1.5 h-full",
                answers[i] === q.correctAnswer ? "bg-emerald-500" : "bg-rose-500"
              )} />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-sm",
                    answers[i] === q.correctAnswer ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  )}>
                    {i + 1}
                  </div>
                  <p className="text-lg font-bold text-slate-800 leading-snug">{q.question}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className={cn(
                      "p-4 rounded-2xl border text-sm font-bold transition-all",
                      optIdx === q.correctAnswer ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm" : 
                      optIdx === answers[i] ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-slate-50 border-slate-100 text-slate-400"
                    )}>
                      {opt}
                    </div>
                  ))}
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex gap-4">
                  <div className="p-2.5 bg-white rounded-xl text-primary border border-indigo-100 h-fit">
                    <Info size={18} />
                  </div>
                  <p className="text-sm text-indigo-900 font-bold leading-relaxed">
                    <span className="uppercase text-[10px] tracking-widest block mb-1">Explanation</span>
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-12 px-4 sm:px-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">{type}</h1>
          <p className="text-slate-500 font-bold">Analysis of Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <Timer size={20} className="text-primary" />
          <span className="font-mono font-black text-lg text-slate-700">{formatTime(timeLeft)}</span>
        </div>
      </header>

      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-100">
        <motion.div 
          className="bg-primary h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          transition={{ type: "spring", damping: 20 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10"
        >
          <div className="space-y-4">
             <div className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 w-fit px-3 py-1 rounded-lg">Question {currentIdx + 1}</div>
             <h2 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">
               {questions[currentIdx].question}
             </h2>
          </div>

          <div className="grid gap-4">
            {questions[currentIdx].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={cn(
                  "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group",
                  answers[currentIdx] === i 
                    ? "border-primary bg-primary/5 text-primary shadow-lg shadow-primary/5" 
                    : "border-slate-100 hover:border-primary/30 hover:bg-slate-50 text-slate-600"
                )}
              >
                <span className="font-black text-sm tracking-tight">{option}</span>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  answers[currentIdx] === i ? "border-primary bg-primary" : "border-slate-200 group-hover:border-primary/30 bg-white"
                )}>
                  {answers[currentIdx] === i && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={16}/> Previous
        </button>
        
        {currentIdx === questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            className="btn-primary px-10 shadow-xl shadow-primary/20"
          >
            Finish & Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
            className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:opacity-80 transition-all"
          >
            Next <ChevronRight size={16}/>
          </button>
        )}
      </div>
    </div>
  );
}
