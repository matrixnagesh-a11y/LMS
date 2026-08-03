'use client';

import React from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, CheckCircle2 } from 'lucide-react';

export default function LearnerResultsPage() {
  const { isDemoMode } = useDemoMode();

  const demoResults = [
    { id: 'r1', assessment: 'Quiz 1 - Microservices & RLS', course: 'CS101 Software Architecture', score: '46 / 50', grade: 'A', status: 'Passed' },
    { id: 'r2', assessment: 'Assignment 1 - Security Audit', course: 'SEC201 Cybersecurity', score: '88 / 100', grade: 'A', status: 'Passed' },
  ];

  const results = isDemoMode ? demoResults : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <FileCheck className="w-6 h-6 mr-2 text-primary" /> My Assessment Results
        </h1>
        <p className="text-sm text-slate-500 mt-1">Review scores, instructor feedback, and grade release history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Released Grades & Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Assessment Title</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Score Achieved</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 font-bold text-slate-900">{r.assessment}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">{r.course}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-primary">{r.score}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">{r.grade}</td>
                    <td className="px-4 py-3.5"><Badge variant="success">{r.status}</Badge></td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                      No released grades found. Enable Demo Data mode.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
