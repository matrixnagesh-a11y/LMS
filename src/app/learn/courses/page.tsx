'use client';

import React from 'react';
import Link from 'next/link';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';

export default function LearnerCoursesPage() {
  const { isDemoMode } = useDemoMode();

  const demoCourses = [
    {
      id: 'c1',
      code: 'CS101',
      title: 'Introduction to Software Architecture',
      instructor: 'Dr. Tan Keng Beng',
      progress: 78,
      completedLessons: 14,
      totalLessons: 18,
    },
    {
      id: 'c2',
      code: 'SEC201',
      title: 'Cybersecurity Fundamentals & OWASP ASVS',
      instructor: 'Dr. Tan Keng Beng',
      progress: 45,
      completedLessons: 6,
      totalLessons: 14,
    },
  ];

  const courses = isDemoMode ? demoCourses : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary" /> My Enrolled Courses
        </h1>
        <p className="text-sm text-slate-500 mt-1">Access course materials, video lectures, and learning modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline">{course.code}</Badge>
                <Badge variant="success">{course.progress}% Complete</Badge>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-2">{course.title}</CardTitle>
              <CardDescription className="text-xs text-slate-500">Instructor: {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Progress</span>
                  <span>{course.completedLessons} / {course.totalLessons} Lessons</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <Link href="/learn">
                <Button className="w-full bg-primary text-white text-xs h-9">
                  <PlayCircle className="w-4 h-4 mr-1.5" /> Launch Course Player
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {courses.length === 0 && (
          <div className="col-span-2 py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No enrolled courses found. Enable Demo Data mode.
          </div>
        )}
      </div>
    </div>
  );
}
