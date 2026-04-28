import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-8 text-center space-y-6 border-accent-warm/20 bg-accent-warm/5"
        >
          <div className="p-4 bg-accent-warm/10 text-accent-warm rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-accent-warm">Access Restricted</h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              You must be signed in with your official @pccoepune.org email to access this tool.
            </p>
          </div>
          
          <div className="p-4 bg-white/50 rounded-2xl border border-accent-warm/10 flex gap-4 text-left">
            <div className="p-2 bg-accent-warm text-white rounded-xl shrink-0 h-fit">
              <AlertCircle size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-gray-800 text-sm">Sign In Required</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Tools and tests are restricted to verified students to ensure academic integrity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/signin')}
              className="py-3 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:opacity-90 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="py-3 bg-white text-primary border-2 border-primary rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/5 transition-all"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
