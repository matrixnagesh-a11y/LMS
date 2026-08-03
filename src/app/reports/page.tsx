'use client';

import React from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileSpreadsheet, FileText, Filter, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const { isDemoMode } = useDemoMode();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-primary" /> Reports & Academic Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Academic enrolment, progress completion, assessment performance, and SaaS storage consumption reports.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-xs flex items-center space-x-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </Button>
          <Button variant="outline" className="text-xs flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-rose-600" />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Course Enrolment Report</CardTitle>
            <CardDescription>Active vs Completed Learner Metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extrabold text-slate-900">{isDemoMode ? '482' : '0'}</div>
            <p className="text-xs text-slate-500">Total active learner enrolments across 24 courses.</p>
            <Button size="sm" variant="outline" className="w-full text-xs">View Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assessment & Pass Rate Report</CardTitle>
            <CardDescription>Academic Submission & Grade Averages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extrabold text-slate-900">{isDemoMode ? '86.4%' : '0%'}</div>
            <p className="text-xs text-slate-500">Average passing score across quizzes & assignments.</p>
            <Button size="sm" variant="outline" className="w-full text-xs">View Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance Summary Report</CardTitle>
            <CardDescription>Physical & Online Class Attendance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extrabold text-slate-900">{isDemoMode ? '92.1%' : '0%'}</div>
            <p className="text-xs text-slate-500">Learners marked present in scheduled sessions.</p>
            <Button size="sm" variant="outline" className="w-full text-xs">View Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
