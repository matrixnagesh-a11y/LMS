'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building,
  Plus,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Globe,
  Lock,
  Copy,
  Check
} from 'lucide-react';

export default function SuperadminLandingPage() {
  const [colleges, setColleges] = useState([
    {
      name: 'Meridian College',
      slug: 'meridian',
      url: '/c/meridian',
      primaryColor: '#2563EB',
      customDomain: 'learning.meridian.edu.my',
      createdDate: 'Aug 03, 2026',
    },
    {
      name: 'Horizon Training Institute',
      slug: 'horizon',
      url: '/c/horizon',
      primaryColor: '#7C3AED',
      customDomain: 'lms.horizon.edu.my',
      createdDate: 'Aug 04, 2026',
    },
  ]);

  const [collegeNameInput, setCollegeNameInput] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const handleCreateCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeNameInput.trim()) return;

    const name = collegeNameInput.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueUrl = `/c/${slug}`;

    const newCollege = {
      name,
      slug,
      url: uniqueUrl,
      primaryColor: '#0284C7',
      customDomain: `${slug}.edu.my`,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    setColleges([newCollege, ...colleges]);
    setCollegeNameInput('');
  };

  const copyUrlToClipboard = (slug: string, url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Superadmin SaaS Host Header */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <Badge className="bg-blue-600 text-white text-xs uppercase tracking-wider font-bold">
              Superadmin Host Portal
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">SaaS College Onboarding Portal</h1>
          <p className="text-sm text-slate-300">
            Superadmin: <span className="font-mono font-bold text-white">matrixnagesh@gmail.com</span> • Provision standalone LMS workspaces with dedicated unique URLs.
          </p>
        </div>

        <Link href="/platform/login">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700 text-xs font-bold">
            <Lock className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Superuser Security Login
          </Button>
        </Link>
      </div>

      {/* Onboard New College Form (Just College Name!) */}
      <Card className="border-2 border-blue-600/30 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl font-bold text-slate-900">Provision New College LMS Instance</CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-600">
            Enter the college name. The system will instantly generate a dedicated, isolated white-label LMS URL for that customer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCollege} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="e.g. Apex Institute of Technology"
              value={collegeNameInput}
              onChange={(e) => setCollegeNameInput(e.target.value)}
              className="flex-1 px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium shadow-xs"
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Unique College LMS</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Onboarded Colleges List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600" /> Onboarded Standalone College Workspaces ({colleges.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">Click any college to enter its isolated LMS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colleges.map((college) => (
            <Card key={college.slug} className="hover:border-blue-500 transition-all border-2 border-slate-200 shadow-sm flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: college.primaryColor }}></div>
                    <Badge variant="success">Active LMS</Badge>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Onboarded {college.createdDate}</span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{college.name}</CardTitle>
                <CardDescription className="text-xs font-mono text-blue-600 font-semibold mt-1">
                  Unique URL: {college.url}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Customer Unique Link:</span>
                    <button
                      onClick={() => copyUrlToClipboard(college.slug, college.url)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 text-[11px]"
                    >
                      {copiedSlug === college.slug ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSlug === college.slug ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-xs text-slate-800 font-bold bg-white p-2 rounded border border-slate-200 truncate">
                    {typeof window !== 'undefined' ? window.location.origin : ''}{college.url}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Link href={college.url} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 flex items-center justify-center space-x-1">
                      <span>Launch Standalone LMS ({college.name})</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
