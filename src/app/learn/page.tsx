'use client';

import React from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  GraduationCap,
  PlayCircle,
  FileCheck,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function LearnerDashboardPage() {
  const { tenantName } = useTenant();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Learner Welcome Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-2">Learner Portal</Badge>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back, Sarah!</h1>
          <p className="text-sm text-slate-500 mt-1">
            Enrolled at {tenantName} • 2 Courses in Progress
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
          <PlayCircle className="w-4 h-4" />
          <span>Resume Next Lesson</span>
        </Button>
      </div>

      {/* Main Enrolled Courses Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-primary" /> Enrolled Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline">CS101</Badge>
                <Badge variant="success">78% Progress</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-2">
                Introduction to Software Architecture
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Instructor: Dr. Tan Keng Beng
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Module 3 of 5</span>
                  <span>14 / 18 Lessons Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Next due activity */}
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-slate-900 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Next Activity: Quiz 2 - RLS Policies
                </span>
                <p className="text-slate-500">Due: Tomorrow at 11:59 PM</p>
              </div>

              <Button className="w-full bg-primary text-white text-xs h-9">
                Continue Learning <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline">SEC201</Badge>
                <Badge variant="secondary">45% Progress</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-2">
                Cybersecurity Fundamentals & OWASP ASVS
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Instructor: Dr. Tan Keng Beng
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Module 2 of 4</span>
                  <span>6 / 14 Lessons Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-slate-900 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-600" /> Next Activity: Assignment 1 Submission
                </span>
                <p className="text-slate-500">Due: Aug 10, 2026</p>
              </div>

              <Button className="w-full bg-secondary text-white text-xs h-9">
                Continue Learning <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
