'use client';

import React from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { Bell, Search, User, ShieldAlert } from 'lucide-react';

export function Header() {
  const { branding, tenantName } = useTenant();

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-4">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search courses, learners, assessments..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Support Access Banner Indicator */}
        <div className="hidden lg:flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs text-amber-800 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Tenant Isolated Mode</span>
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* User Profile Menu */}
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-300">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Dr. Aris Meridian</p>
            <p className="text-xs text-slate-500">College Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
