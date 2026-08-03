'use client';

import React, { useState } from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Plus, AlertTriangle, Users } from 'lucide-react';

export default function CalendarPage() {
  const { isDemoMode } = useDemoMode();
  const [viewMode, setViewMode] = useState<'weekly' | 'daily' | 'agenda'>('weekly');

  const demoEvents = [
    {
      id: 'e1',
      title: 'CS101 - Software Architecture Lecture',
      type: 'Physical Classroom',
      time: '09:00 AM - 11:00 AM',
      date: 'Today',
      venue: 'Block A, Hall 302',
      instructor: 'Dr. Tan Keng Beng',
      cohort: 'Cohort 2026-A',
      meetingUrl: null,
      conflict: false,
    },
    {
      id: 'e2',
      title: 'SEC201 - OWASP Security Live Session',
      type: 'Online Live Class',
      time: '02:00 PM - 04:00 PM',
      date: 'Today',
      venue: 'Online Session',
      instructor: 'Dr. Tan Keng Beng',
      cohort: 'Cohort 2026-B',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      conflict: false,
    },
    {
      id: 'e3',
      title: 'BUS301 - Business Analytics Examination',
      type: 'Examination',
      time: '10:00 AM - 01:00 PM',
      date: 'Tomorrow',
      venue: 'Exam Hall 1',
      instructor: 'Prof. David Lee',
      cohort: 'Cohort 2025-C',
      meetingUrl: null,
      conflict: true, // Conflict warning example
    },
  ];

  const events = isDemoMode ? demoEvents : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <CalendarIcon className="w-6 h-6 mr-2 text-primary" /> Academic Schedule & Timetable
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Schedule physical classes, laboratories, online sessions (Meet/Teams/Zoom), and exams.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-md font-semibold ${viewMode === 'weekly' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 rounded-md font-semibold ${viewMode === 'daily' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1.5 rounded-md font-semibold ${viewMode === 'agenda' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
            >
              Agenda
            </button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
            <Plus className="w-4 h-4" />
            <span>Schedule Session</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" /> Scheduled Classes & Events
          </h2>

          {events.map((evt) => (
            <Card key={evt.id} className={`hover:shadow-md transition-shadow border-slate-200 ${evt.conflict ? 'border-amber-300 bg-amber-50/30' : ''}`}>
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-primary">{evt.date} • {evt.time}</span>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5">{evt.title}</h3>
                  </div>
                  <Badge variant={evt.type.includes('Online') ? 'secondary' : 'default'}>
                    {evt.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>Venue: {evt.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>Instructor: {evt.instructor}</span>
                  </div>
                </div>

                {evt.meetingUrl && (
                  <div className="p-2 bg-blue-50 border border-blue-100 rounded text-xs flex justify-between items-center text-blue-900">
                    <span className="flex items-center font-mono"><Video className="w-3.5 h-3.5 mr-1 text-blue-600" /> {evt.meetingUrl}</span>
                    <Button size="sm" className="h-6 text-[10px] bg-blue-600 text-white">Join Meeting</Button>
                  </div>
                )}

                {evt.conflict && (
                  <div className="p-2 bg-amber-100 text-amber-900 rounded text-xs flex items-center font-semibold">
                    <AlertTriangle className="w-4 h-4 mr-1 text-amber-600" /> Venue conflict detected with Exam Hall 1 schedule!
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {events.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
              No calendar events scheduled. Enable Demo Data or schedule a session.
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conflict Detection Guard</CardTitle>
              <CardDescription>Automatic room, instructor, and cohort overlap validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-900">Venue Capacity & Double-Booking</span>
                <p className="text-slate-500 mt-1">Prevents assigning two instructors or cohorts to the same venue simultaneously.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
