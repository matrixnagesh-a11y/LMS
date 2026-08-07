'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Search, Layers, ChevronRight } from 'lucide-react';

export default function StandaloneCoursesPage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const { tenantName } = useTenant();

  const courses = [
    {
      id: 'c1',
      code: 'CS101',
      title: 'Introduction to Software Architecture',
      mode: 'Blended',
      status: 'Published',
      credits: 4,
      modulesCount: 5,
      lessonsCount: 18,
      enrolled: 128,
    },
    {
      id: 'c2',
      code: 'SEC201',
      title: 'Cybersecurity Fundamentals & Security Audits',
      mode: 'Online',
      status: 'Published',
      credits: 3,
      modulesCount: 4,
      lessonsCount: 14,
      enrolled: 94,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="outline" className="mb-1 text-primary font-bold">{tenantName}</Badge>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-primary" /> Course Authoring & Catalogue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure multi-tier academic courses, modules, lessons, and learning materials for {tenantName}.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow border-slate-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {course.code}
                </span>
                <Badge variant="success">{course.status}</Badge>
              </div>
              <CardTitle className="text-base text-slate-900 font-bold line-clamp-1">
                {course.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 flex items-center mt-1">
                <Layers className="w-3.5 h-3.5 mr-1" /> {course.mode} • {course.credits} Credits
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-lg text-center text-xs">
                <div>
                  <p className="text-slate-400">Modules</p>
                  <p className="font-bold text-slate-900">{course.modulesCount}</p>
                </div>
                <div>
                  <p className="text-slate-400">Lessons</p>
                  <p className="font-bold text-slate-900">{course.lessonsCount}</p>
                </div>
                <div>
                  <p className="text-slate-400">Enrolled</p>
                  <p className="font-bold text-slate-900">{course.enrolled}</p>
                </div>
              </div>

              <Button size="sm" variant="outline" className="w-full text-xs">
                Manage Course Content <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
