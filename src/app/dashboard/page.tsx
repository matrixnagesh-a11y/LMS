'use client';

import React from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  GraduationCap,
  FileCheck,
  AlertTriangle,
  ArrowUpRight,
  HardDrive,
  UserCheck,
  Building
} from 'lucide-react';

export default function DashboardPage() {
  const { tenantName, branding } = useTenant();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Standalone Custom College Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200">
        {/* Background Image Overlay */}
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
              <img src={branding.logo_url} alt="Logo" className="w-10 h-10 object-contain rounded-lg bg-white p-1 shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-white shadow-sm">
                {branding.college_abbreviation || 'LMS'}
              </div>
            )}
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-slate-300">{tenantName} LMS Portal</h2>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Standalone LMS Active
              </p>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold">{branding.welcome_message}</h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-2xl leading-relaxed">
            {branding.introduction || 'Providing high quality higher education, professional diplomas, and academic excellence.'}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Enrolled Learners</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">482</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% this term
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
            <CardTitle className="text-sm font-medium text-slate-500">Submissions</CardTitle>
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

      {/* Main Grid: Plan Capacity & At-Risk Intervention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Active Published Courses</CardTitle>
                <CardDescription>Academic programs and student enrolment rosters</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All Courses
              </Button>
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
                      <td className="px-4 py-3">128 Learners</td>
                      <td className="px-4 py-3"><Badge variant="success">Published</Badge></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">SEC201</td>
                      <td className="px-4 py-3">Cybersecurity Fundamentals & OWASP ASVS</td>
                      <td className="px-4 py-3">94 Learners</td>
                      <td className="px-4 py-3"><Badge variant="success">Published</Badge></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">BUS301</td>
                      <td className="px-4 py-3">Enterprise Business Analytics</td>
                      <td className="px-4 py-3">65 Learners</td>
                      <td className="px-4 py-3"><Badge variant="outline">Draft</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Institutional Policy & Quick Actions */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-primary flex items-center">
                <Building className="w-4 h-4 mr-2" /> Institutional Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">Privacy Policy Statement:</p>
              <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 line-clamp-3">
                {branding.privacy_policy || 'This institution complies with data protection standards to safeguard student and faculty records.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
