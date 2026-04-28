import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Target, 
  BookOpen, 
  FlaskConical, 
  MessageSquare,
  MoreHorizontal,
  ClipboardCheck,
  Users,
  LogOut,
  User,
  ExternalLink,
  Github,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const mainNavItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Aim', path: '/aim', icon: Target },
  { name: 'Theory', path: '/theory', icon: BookOpen },
  { name: 'Simulator', path: '/simulator', icon: FlaskConical },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
];

const secondaryNavItems = [
  { name: 'Pretest', path: '/pretest', icon: ClipboardCheck },
  { name: 'Posttest', path: '/posttest', icon: ClipboardCheck },
  { name: 'References', path: '/references', icon: BookOpen },
  { name: 'Contributors', path: '/contributors', icon: Users },
  { name: 'Account', path: '/account', icon: User },
];

const NavItem = React.memo(({ item, isActive }: { item: typeof mainNavItems[0], isActive: boolean }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      className="flex flex-col items-center gap-1 relative py-2 group flex-1 min-w-0"
    >
      <div className={cn(
        "p-2 rounded-2xl transition-all duration-300",
        isActive ? "bg-primary/10 text-primary scale-110 shadow-[0_0_20px_rgba(79,70,229,0.05)]" : "text-slate-400 group-hover:text-slate-600"
      )}>
        <Icon size={18} />
      </div>
      <span className={cn(
        "text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-colors text-center px-1 truncate w-full",
        isActive ? "text-primary" : "text-slate-400"
      )}>
        {item.name}
      </span>
      {isActive && (
        <motion.div
          layoutId="active-dot"
          className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        />
      )}
    </Link>
  );
});

export default function BottomNav({ isMoreOpen, setIsMoreOpen }: { isMoreOpen: boolean, setIsMoreOpen: (open: boolean) => void }) {
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
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-24 bg-white/95 backdrop-blur-2xl border-t border-slate-200 z-[100] px-1 pb-safe">
        <div className="flex items-center justify-around h-full w-full max-w-full overflow-hidden">
          {mainNavItems.map((item) => (
            <NavItem 
              key={item.path} 
              item={item} 
              isActive={location.pathname === item.path} 
            />
          ))}
          
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="flex flex-col items-center gap-1 py-2 group flex-1 min-w-0"
          >
            <div className="p-2 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-900/20 active:scale-95 transition-transform">
              <MoreHorizontal size={18} />
            </div>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400 text-center px-1 truncate w-full">
              More
            </span>
          </button>
        </div>
      </div>

      {/* More Options Overlay */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-[70] lg:hidden px-6 pt-8 pb-12 shadow-2xl overflow-hidden"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore More</h2>
                <button 
                  onClick={() => setIsMoreOpen(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                    >
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.name}</span>
                    </Link>
                  );
                })}
                <Link
                  to="/feedback"
                  onClick={() => setIsMoreOpen(false)}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                >
                  <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                    <MessageSquare size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Feedback</span>
                </Link>
              </div>

              <div className="space-y-4">
                {user ? (
                  <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 tracking-tight">{user.email?.split('@')[0]}</p>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest">Active Member</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-3 bg-white text-rose-500 rounded-xl border border-rose-100 shadow-sm active:scale-90 transition-transform"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/signin"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center justify-center py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-transform"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center justify-center py-4 bg-white text-primary border-2 border-primary rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
                    >
                      Join Lab
                    </Link>
                  </div>
                )}
                
                <div className="pt-4 flex items-center justify-center gap-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
                    <Github size={14} /> Repository
                  </a>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">v1.2.0 Modern Blue</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
