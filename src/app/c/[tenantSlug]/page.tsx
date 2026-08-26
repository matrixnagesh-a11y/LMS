'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { INITIAL_COLLEGES } from '@/lib/tenant-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  GraduationCap,
  FileCheck,
  ArrowUpRight,
  Building,
  Plus,
  Palette,
  ShieldCheck
} from 'lucide-react';

export default function StandaloneCollegeDashboardPage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const { tenantName, branding, selectCollegeTenant } = useTenant();

  // Load college workspace by URL slug
  useEffect(() => {
    const knownCollege = INITIAL_COLLEGES[slug];
    if (knownCollege) {
      selectCollegeTenant(knownCollege.name, knownCollege.primaryColor, knownCollege.secondaryColor);
    } else {
      // Dynamic fallback for newly onboarded colleges
      const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      selectCollegeTenant(formattedName, '#0284C7', '#0D9488');
    }
  }, [slug, selectCollegeTenant]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Standalone Custom College Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <div className="absolute inset-0 z-0">
          <img
            src={branding.login_bg_url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80'}
            alt="College Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/40 backdrop-xs"></div>
        </div>

        <div className="relative z-10 p-6 md:p-8 text-white space-y-3">
          <div className="flex items-center space-x-3">
            {branding.logo_url ? (
              <img src={branding.logo_url} alt="Logo" className="w-12 h-12 object-contain rounded-xl bg-white p-1 shadow-md" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-white shadow-md text-lg">
                {branding.college_abbreviation || 'LMS'}
              </div>
            )}
            <div>
              <h2 className="text-sm uppercase tracking-wider font-bold text-slate-300">{tenantName}</h2>
              <p className="text-xs text-emerald-400 font-semibold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Dedicated Standalone LMS
              </p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold">{branding.welcome_message}</h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-2xl leading-relaxed">
            {branding.introduction || 'Providing high quality higher education, academic excellence, and student success.'}
          </p>

          <div className="pt-2 flex items-center space-x-3">
            <a href={`/c/${slug}/branding`}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold text-xs">
                <Palette className="w-3.5 h-3.5 mr-1.5" /> Customize Logo & Branding
              </Button>
            </a>
            <a href={`/c/${slug}/courses`}>
              <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Manage Courses
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Enrolled Students</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">482</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% active learners
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Courses</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24</div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="success">18 Published</Badge>
              <Badge variant="outline">6 Draft</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Assessment Submissions</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">142</div>
            <p className="text-xs text-slate-500 mt-1">18 submissions awaiting marking</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Completion Rate</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">86.4%</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> High student retention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Courses Table & Institutional Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Published Academic Courses</CardTitle>
                <CardDescription>Configured course modules, materials, and student rosters</CardDescription>
              </div>
              <a href={`/c/${slug}/courses`}>
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add New Course
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Course Title</th>
                      <th className="px-4 py-3">Enrolled</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">CS101</td>
                      <td className="px-4 py-3">Introduction to Software Architecture</td>
                      <td className="px-4 py-3">128 Students</td>
                      <td className="px-4 py-3"><Badge variant="success">Published</Badge></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">SEC201</td>
                      <td className="px-4 py-3">Cybersecurity Fundamentals & Security Audits</td>
                      <td className="px-4 py-3">94 Students</td>
                      <td className="px-4 py-3"><Badge variant="success">Published</Badge></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">BUS301</td>
                      <td className="px-4 py-3">Enterprise Business Intelligence Strategy</td>
                      <td className="px-4 py-3">65 Students</td>
                      <td className="px-4 py-3"><Badge variant="outline">Draft</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-primary flex items-center">
                <Building className="w-4 h-4 mr-2" /> Institutional Policy & Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">College Privacy Statement:</p>
              <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                {branding.privacy_policy || 'This institution complies with data protection standards to safeguard student and faculty records.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
