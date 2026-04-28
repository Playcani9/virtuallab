import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { User, Mail, Shield, LogOut, AlertCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManageAccount() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      navigate('/');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/signin');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Manage <span className="text-primary">Account</span></h1>
            <p className="text-gray-500 font-medium mt-2">Manage your profile and security settings</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="glass-card p-8 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <User size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">{user.email?.split('@')[0]}</h3>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <Mail size={14} />
                {user.email}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest">
                <Shield size={12} />
                Verified Student
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input
                  type="text"
                  disabled
                  value={user.email}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-500 font-medium cursor-not-allowed"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Account ID</label>
                <input
                  type="text"
                  disabled
                  value={user.id}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-400 font-mono text-xs cursor-not-allowed"
                />
              </div>
            </div>

            <div className="p-4 bg-accent-cool/10 rounded-2xl border border-accent-cool/20 flex gap-4">
              <div className="p-2 bg-accent-cool text-white rounded-xl shrink-0 h-fit">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-800 text-sm">Official Email Required</h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Your account is linked to your official PCCOE email. Changing your email address is currently disabled to ensure academic integrity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 bg-gray-900 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black">Security Settings</h3>
              <p className="text-gray-400 text-sm font-medium">Manage your password and session</p>
            </div>
            <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
              Update Password
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
