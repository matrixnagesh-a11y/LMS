'use client';

import React from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCheck, Plus, Clock, Award, CheckCircle, FileText, Upload } from 'lucide-react';

export default function AssessmentsPage() {
  const { isDemoMode } = useDemoMode();

  const demoAssessments = [
    {
      id: 'a1',
      title: 'Quiz 1 - Microservices & Multi-Tenancy Architecture',
      course: 'CS101 Software Architecture',
      type: 'Quiz',
      totalMarks: 50,
      passingScore: 35,
      timeLimit: '45 mins',
      attempts: '2 Attempts Allowed',
      status: 'Open',
    },
    {
      id: 'a2',
      title: 'Assignment 1 - OWASP ASVS Security Audit Report',
      course: 'SEC201 Cybersecurity Fundamentals',
      type: 'Assignment',
      totalMarks: 100,
      passingScore: 50,
      timeLimit: 'No Time Limit',
      attempts: 'Single Submission',
      status: 'Awaiting Marking (14)',
    },
    {
      id: 'a3',
      title: 'Final Examination - Enterprise BI Strategy',
      course: 'BUS301 Business Analytics',
      type: 'Examination',
      totalMarks: 100,
      passingScore: 60,
      timeLimit: '120 mins',
      attempts: '1 Attempt Allowed',
      status: 'Scheduled',
    },
  ];

  const assessments = isDemoMode ? demoAssessments : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <FileCheck className="w-6 h-6 mr-2 text-primary" /> Assessments & Assignment Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Quizzes, Assignments, Examinations, Rubric evaluations, and Instructor grade release workflow.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Create New Assessment</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assessments.map((ass) => (
          <Card key={ass.id} className="hover:shadow-md transition-shadow border-slate-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="font-semibold text-primary">{ass.type}</Badge>
                <Badge variant={ass.status.includes('Open') ? 'success' : 'warning'}>{ass.status}</Badge>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 leading-snug">{ass.title}</CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-1">{ass.course}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Marks:</span>
                  <span className="font-bold text-slate-900">{ass.totalMarks} pts (Pass: {ass.passingScore})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Limit:</span>
                  <span className="font-bold text-slate-900">{ass.timeLimit}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Grade Submissions & Rubrics
              </Button>
            </CardContent>
          </Card>
        ))}
        {assessments.length === 0 && (
          <div className="col-span-3 py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No assessments found. Enable Demo Data or create an assessment.
          </div>
        )}
      </div>
    </div>
  );
}
