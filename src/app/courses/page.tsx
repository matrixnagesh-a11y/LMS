'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Layers,
  FileText,
  Video,
  CheckCircle,
  Clock,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');

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
      title: 'Cybersecurity Fundamentals & OWASP ASVS',
      mode: 'Online',
      status: 'Published',
      credits: 3,
      modulesCount: 4,
      lessonsCount: 14,
      enrolled: 94,
    },
    {
      id: 'c3',
      code: 'BUS301',
      title: 'Enterprise Business Analytics & BI',
      mode: 'Self-Paced',
      status: 'Draft',
      credits: 3,
      modulesCount: 6,
      lessonsCount: 22,
      enrolled: 0,
    },
  ];

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'published') return c.status === 'Published';
    if (activeTab === 'draft') return c.status === 'Draft';
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-primary" /> Course Authoring & Administration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage multi-tier academic structure: Course → Version → Module → Unit → Lesson → Learning Activity.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'published' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Published (2)
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'draft' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Drafts (1)
          </button>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title or code..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Course List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow border-slate-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {course.code}
                </span>
                <Badge variant={course.status === 'Published' ? 'success' : 'outline'}>
                  {course.status}
                </Badge>
              </div>
              <CardTitle className="text-base text-slate-900 font-bold line-clamp-1">
                {course.title}
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 flex items-center mt-1">
                <Layers className="w-3.5 h-3.5 mr-1" /> Delivery Mode: {course.mode} • {course.credits} Credits
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

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">v1.2 Active</span>
                <Button size="sm" variant="ghost" className="text-xs text-primary font-semibold hover:bg-primary/5">
                  Manage Course Authoring <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
