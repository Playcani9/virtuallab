import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Target, 
  BookOpen, 
  FlaskConical, 
  ClipboardCheck, 
  Users, 
  MessageSquare, 
  Phone, 
  Menu, 
  X,
  ChevronRight,
  LogOut,
  Github
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Aim', path: '/aim', icon: Target },
  { name: 'Theory', path: '/theory', icon: BookOpen },
  { name: 'Simulink', path: '/simulator', icon: FlaskConical },
  { name: 'Pretest', path: '/pretest', icon: ClipboardCheck },
  { name: 'Posttest', path: '/posttest', icon: ClipboardCheck },
  { name: 'References', path: '/references', icon: BookOpen },
  { name: 'Contributors', path: '/contributors', icon: Users },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r z-50 hidden lg:block"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20">V</div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Virtual<span className="text-primary">Lab</span></h1>
          </div>
          
          <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:bg-accent-cool/20 hover:text-primary"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="ml-auto"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t bg-white">
            {user ? (
              <div className="space-y-4">
                <Link 
                  to="/account"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold truncate text-gray-800">{user.email?.split('@')[0]}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">Manage Account</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 text-red-500 bg-red-50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/signin"
                  className="flex items-center justify-center py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center py-3 bg-white text-primary border-2 border-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b z-50 flex items-center justify-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black">V</div>
          <span className="font-bold text-slate-900 text-xl tracking-tight">Virtual<span className="text-primary">Lab</span></span>
        </div>
      </div>
    </>
  );
}
