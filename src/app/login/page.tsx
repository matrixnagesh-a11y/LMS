'use client';

import React from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Mail, KeyRound, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const { branding, tenantName } = useTenant();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 text-white text-center space-y-2" style={{ backgroundColor: branding.primary_color || '#2563EB' }}>
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto text-xl font-bold">
            {branding.college_abbreviation || 'LMS'}
          </div>
          <h1 className="text-xl font-bold">{tenantName}</h1>
          <p className="text-xs text-white/80">CollegeLMS Cloud Authenticated Portal</p>
        </div>

        <CardContent className="p-6 space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="name@college.edu.my"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 text-sm shadow-md">
            Sign In to College Workspace
          </Button>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1 text-emerald-600" /> MFA Enabled
            </span>
            <a href="#" className="text-primary hover:underline font-semibold">Forgot Password?</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
