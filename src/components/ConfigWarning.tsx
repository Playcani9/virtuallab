import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ConfigWarning() {
  if (isSupabaseConfigured) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 p-4 sticky top-0 z-[60] flex items-center justify-center gap-4 text-amber-800">
      <AlertTriangle size={20} className="shrink-0" />
      <p className="text-sm font-medium">
        Supabase is not configured. Some features like authentication, feedback, and quiz saving will not work.
      </p>
      <div className="flex gap-4">
        <a 
          href="https://supabase.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-bold underline flex items-center gap-1 hover:text-amber-900"
        >
          Get Keys <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
