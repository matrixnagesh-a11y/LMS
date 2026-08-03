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
  Clock,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const { tenantName, branding } = useTenant();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              {branding.college_abbreviation || 'College'} Admin Dashboard
            </span>
            <span className="bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
              Professional Plan Active
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">{branding.welcome_message}</h1>
          <p className="text-slate-100 text-sm max-w-2xl">
            Managing academic programs, learner progress, assessment submissions, and staff allocation for {tenantName}.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Enrolled Learners</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">482</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Courses</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
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
            <CardTitle className="text-sm font-medium text-slate-500">Course Completion Rate</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">86.4%</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +4.2% higher than average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Plan Limits & At-Risk Intervention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Subscription Usage & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Subscription Plan Usage & Capacity</span>
                <Badge variant="outline">Professional Plan</Badge>
              </CardTitle>
              <CardDescription>Usage tracking against database-enforced SaaS quotas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700 flex items-center">
                    <UserCheck className="w-4 h-4 mr-2 text-primary" /> Active Learners Quota
                  </span>
                  <span className="text-slate-900 font-bold">482 / 1,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '48.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-1.5">
                  <span className="text-slate-700 flex items-center">
                    <HardDrive className="w-4 h-4 mr-2 text-secondary" /> Storage Allowance
                  </span>
                  <span className="text-slate-900 font-bold">34.2 GB / 100 GB</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: '34.2%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Courses Preview Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Published Courses</CardTitle>
                <CardDescription>Latest academic offerings and active enrolments</CardDescription>
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

        {/* Right Col: At-Risk Intervention Feed */}
        <div className="space-y-6">
          <Card className="border-amber-200 bg-gradient-to-b from-amber-50/40 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                At-Risk Learners Requiring Action
              </CardTitle>
              <CardDescription>Automated detection based on attendance & scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white border border-amber-200 rounded-lg shadow-2xs space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-900 text-sm">Ahmad Razak</span>
                  <Badge variant="warning">No Login 14 Days</Badge>
                </div>
                <p className="text-xs text-slate-600">Course: CS101 Software Architecture</p>
                <div className="pt-2 flex justify-end space-x-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Contact</Button>
                  <Button size="sm" className="text-xs h-7 bg-amber-600 hover:bg-amber-700 text-white">Log Intervention</Button>
                </div>
              </div>

              <div className="p-3 bg-white border border-amber-200 rounded-lg shadow-2xs space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-slate-900 text-sm">Devan Nair</span>
                  <Badge variant="destructive">Failed Assessment</Badge>
                </div>
                <p className="text-xs text-slate-600">Course: SEC201 Cybersecurity</p>
                <div className="pt-2 flex justify-end space-x-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Contact</Button>
                  <Button size="sm" className="text-xs h-7 bg-amber-600 hover:bg-amber-700 text-white">Log Intervention</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
