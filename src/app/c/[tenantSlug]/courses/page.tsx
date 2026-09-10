'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Layers, ChevronRight, Trash2, X, Check } from 'lucide-react';
import { Course } from '@/lib/db';

export default function StandaloneCoursesPage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const { tenantName } = useTenant();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('3');
  const [mode, setMode] = useState<'Online' | 'Classroom' | 'Blended' | 'Self-Paced'>('Online');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/c/${slug}/courses`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setCourses(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim() || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/c/${slug}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          title: title.trim(),
          credits: Number(credits),
          mode,
          status: 'Published',
          modulesCount: 4,
          lessonsCount: 12,
          enrolled: 0,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCourses(prev => [data.data, ...prev]);
        setShowCreateModal(false);
        setCode('');
        setTitle('');
      }
    } catch {
      // handled
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const res = await fetch(`/api/c/${slug}/courses?id=${courseId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c.id !== courseId));
      }
    } catch {
      // handled
    }
  };

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
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </Button>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add New Course</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CS204"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm text-slate-900 font-mono"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Cloud Systems Engineering"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm text-slate-900"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Credits</label>
                  <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm text-slate-900"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-full border rounded-lg p-2 text-sm text-slate-900 bg-white"
                  >
                    <option value="Online">Online</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Blended">Blended</option>
                    <option value="Self-Paced">Self-Paced</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="bg-primary text-white">
                  {submitting ? 'Creating...' : 'Save Course'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow border-slate-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {course.code}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="success">{course.status}</Badge>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
