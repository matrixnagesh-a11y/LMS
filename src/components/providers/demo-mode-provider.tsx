'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Database, Trash2, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  clearDummyData: () => void;
  loadDemoData: () => void;
}

const DemoModeContext = createContext<DemoModeContextType>({
  isDemoMode: true,
  toggleDemoMode: () => {},
  clearDummyData: () => {},
  loadDemoData: () => {},
});

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('matrix_lms_demo_mode');
      if (saved !== null) {
        setIsDemoMode(saved === 'true');
      }
    }
  }, []);

  const toggleDemoMode = () => {
    const next = !isDemoMode;
    setIsDemoMode(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('matrix_lms_demo_mode', String(next));
    }
  };

  const clearDummyData = () => {
    setIsDemoMode(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('matrix_lms_demo_mode', 'false');
    }
    setNoticeMessage('Demo Data Cleared! System reverted to clean production state.');
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  const loadDemoData = () => {
    setIsDemoMode(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('matrix_lms_demo_mode', 'true');
    }
    setNoticeMessage('Demo Data Loaded! Sample college tenants, courses, users & assessments active.');
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode, clearDummyData, loadDemoData }}>
      {children}
      {/* Floating Demo Data Controls Widget */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl border border-slate-700 text-xs">
        <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="font-semibold">
          {isDemoMode ? 'Demo Data Loaded' : 'Clean Production Mode'}
        </span>

        {isDemoMode ? (
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[10px] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
            onClick={clearDummyData}
            title="Clear all demo data with one click"
          >
            <Trash2 className="w-3 h-3 mr-1 text-rose-400" />
            Clear Demo Data
          </Button>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[10px] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700"
            onClick={loadDemoData}
            title="Reload demo data with one click"
          >
            <RotateCcw className="w-3 h-3 mr-1 text-emerald-400" />
            Load Demo Data
          </Button>
        )}
      </div>

      {noticeMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white p-3 rounded-lg shadow-lg flex items-center space-x-2 text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{noticeMessage}</span>
        </div>
      )}
    </DemoModeContext.Provider>
  );
}

export const useDemoMode = () => useContext(DemoModeContext);
