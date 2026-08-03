'use client';

import React, { createContext, useContext, useState } from 'react';
import { Database, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  clearDummyData: () => void;
}

const DemoModeContext = createContext<DemoModeContextType>({
  isDemoMode: true,
  toggleDemoMode: () => {},
  clearDummyData: () => {},
});

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [clearedNotice, setClearedNotice] = useState(false);

  const toggleDemoMode = () => {
    setIsDemoMode((prev) => !prev);
  };

  const clearDummyData = () => {
    setIsDemoMode(false);
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 4000);
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode, clearDummyData }}>
      {children}
      {/* Floating Demo Data Controls Widget */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700 text-xs">
        <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="font-semibold">
          {isDemoMode ? 'Demo Data Active' : 'Clean Production Mode'}
        </span>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-[10px] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
          onClick={clearDummyData}
        >
          <Trash2 className="w-3 h-3 mr-1 text-rose-400" />
          Clear Demo Data
        </Button>
      </div>

      {clearedNotice && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>Demo Data Cleared! System reverted to clean production state.</span>
        </div>
      )}
    </DemoModeContext.Provider>
  );
}

export const useDemoMode = () => useContext(DemoModeContext);
