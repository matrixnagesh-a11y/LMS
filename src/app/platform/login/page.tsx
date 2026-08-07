'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Mail, Lock, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PlatformSuperUserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('matrixnagesh@gmail.com');
  const [password, setPassword] = useState('lms12345%$#@!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Verify Superuser Credentials
    if (email.trim().toLowerCase() === 'matrixnagesh@gmail.com' && password === 'lms12345%$#@!') {
      setTimeout(() => {
        setLoading(false);
        router.push('/platform');
      }, 600);
    } else {
      setTimeout(() => {
        setLoading(false);
        setError('Invalid Superuser credentials. Use matrixnagesh@gmail.com and configured password.');
      }, 500);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-900/95 rounded-2xl my-4">
      <Card className="max-w-md w-full border-slate-700 bg-slate-900 text-white shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto text-white shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <Badge className="bg-white/20 text-white text-[10px] uppercase tracking-wider">
            Platform Host Superuser Portal
          </Badge>
          <h1 className="text-xl font-bold">CollegeLMS SaaS Super Admin</h1>
          <p className="text-xs text-blue-100">Host, Onboard & Manage Independent College Tenants</p>
        </div>

        <CardContent className="p-6 space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Superuser Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Superuser Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/80 border border-rose-700 text-rose-200 rounded-lg text-xs flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 text-sm shadow-md"
            >
              {loading ? 'Authenticating Superuser...' : 'Login to SaaS Host Portal'}
            </Button>
          </form>

          {/* Quick Demo Credentials Info Box */}
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg text-xs space-y-1">
            <div className="font-semibold text-blue-400 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Configured Platform Superuser:
            </div>
            <p className="text-slate-300 font-mono">Email: matrixnagesh@gmail.com</p>
            <p className="text-slate-300 font-mono">Password: lms12345%$#@!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
