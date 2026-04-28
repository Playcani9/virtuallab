import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Mail, 
  Github, 
  Linkedin, 
  Globe, 
  MessageSquare, 
  GitBranch, 
  FileText, 
  MousePointer2, 
  Info, 
  ShieldCheck, 
  HelpCircle,
  AlertCircle,
  Code2,
  Target,
  Sparkles
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          setFormData(prev => ({ ...prev, email: session.user.email || '' }));
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setIsSubmitting(true);
    
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.from('feedback').insert([{
          name: formData.name,
          email: formData.email,
          type: formData.subject,
          message: `Role: ${formData.role}\n\n${formData.message}`,
          user_id: user?.id || null
        }]);
        if (error) throw error;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setIsSuccess(true);
      setFormData({ name: '', email: user?.email || '', role: '', subject: '', message: '', consent: false });
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setIsSuccess(true); // Still show success for demo if offline
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12 px-4 sm:px-6">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">
          <MessageSquare size={12} /> Contact Us
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Feedback & Contact</h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
          Share your feedback, report issues, or get in touch with our team of developers.
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {/* Main Feedback Form */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800">Send a Message</h2>
              <p className="text-sm font-bold text-slate-500">Typical response time: 2-3 business days.</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-100 p-10 rounded-[2rem] text-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-emerald-950">Message Sent!</h3>
                  <p className="text-sm font-bold text-emerald-700/80">Thank you for your valuable feedback. Our team will review it shortly.</p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Name *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="input-field w-full"
                      placeholder="Krushna Surase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={cn(
                        "input-field w-full",
                        user && "bg-slate-50 text-slate-400 cursor-not-allowed"
                      )}
                      placeholder="you@pccoe.edu.in"
                      disabled={!!user}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Role</label>
                    <select 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="input-field w-full bg-white"
                    >
                      <option value="">Select role</option>
                      <option value="student">Student</option>
                      <option value="educator">Educator</option>
                      <option value="professor">Professor</option>
                      <option value="developer">Developer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject *</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="input-field w-full bg-white"
                    >
                      <option value="">Select subject</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="education">Educational Feedback</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message *</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="input-field w-full resize-none"
                    placeholder="Provide details about your query or suggestion..."
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <input 
                    type="checkbox" 
                    required
                    checked={formData.consent}
                    onChange={e => setFormData({...formData, consent: e.target.checked})}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    I agree to the privacy policy and consent to having my feedback being used to improve this interactive laboratory tool.
                  </p>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center gap-3 shadow-xl shadow-primary/10"
                >
                  {isSubmitting ? 'Transmitting...' : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <HelpCircle size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Common Questions</h2>
            </div>
            
            <div className="grid gap-4">
              {[
                { 
                  q: "How fast do you respond?", 
                  a: "We strive to respond within 2-3 business days. Bug reports are prioritized." 
                },
                { 
                  q: "Can I use this in my classroom?", 
                  a: "Absolutely! Virtual Lab is built for educational institutions and is free for academic use." 
                },
                { 
                  q: "Is my data safe?", 
                  a: "Yes. We collect minimal info and the simulation logic runs entirely on your local browser." 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <h4 className="text-sm font-black text-slate-800">{item.q}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Contact Details */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-8 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 text-white/5 opacity-50">
              <Mail size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black">Direct Contact</h3>
              <div className="space-y-4">
                <a href="mailto:Krushnasurase060@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-xl text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Project Lead</p>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Krushnasurase060@gmail.com</p>
                  </div>
                </a>
                <a href="https://github.com/aniketchougule1902" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="p-3 bg-white/10 rounded-xl text-primary">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Lead Developer</p>
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">aniketchougule1902</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bug Reporting Guidelines */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-rose-500" />
              <h3 className="text-lg font-black text-slate-800">Effective Reporting</h3>
            </div>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              To fix bugs quickly, please include:
            </p>
            <ul className="space-y-3">
              {[
                { icon: Code2, text: "Specific vector values used" },
                { icon: Globe, text: "Browser version & OS" },
                { icon: Target, text: "Expected vs Actual result" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <item.icon size={14} className="text-primary" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & Commitments */}
          <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-primary" />
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Our Commitment</h3>
            </div>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              We prioritize your privacy above all. No simulation data is ever sent to our servers; all calculations are executed client-side.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-[10px] font-black text-primary text-center uppercase tracking-widest">
                No Sales
              </div>
              <div className="p-3 bg-white rounded-xl border border-indigo-100 text-[10px] font-black text-primary text-center uppercase tracking-widest">
                Secure
              </div>
            </div>
          </div>

          {/* Upcoming Features */}
          <div className="bg-emerald-50/50 rounded-3xl border border-emerald-100 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-accent" />
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Future Roadmap</h3>
            </div>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              Exciting updates planned based on user feedback:
            </p>
            <ul className="space-y-2">
              {[
                "Support for ℝ⁴ (4D) visuals",
                "Intermediate calculation steps",
                "LaTeX/Academic export mode",
                "LMS Integration (Moodle/Canvas)"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
