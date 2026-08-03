'use client';

import React from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Calendar, Layers, Users, BookOpen } from 'lucide-react';

export default function ProgrammesPage() {
  const { isDemoMode } = useDemoMode();

  const demoProgrammes = [
    {
      id: 'p1',
      code: 'DSE01',
      title: 'Diploma in Software Engineering',
      department: 'School of Computer Science',
      duration: '24 Months',
      creditHours: 90,
      activeCohorts: 3,
      enrolledLearners: 184,
    },
    {
      id: 'p2',
      code: 'BCS02',
      title: 'Bachelor of Computer Science (Cybersecurity)',
      department: 'School of IT & Security',
      duration: '36 Months',
      creditHours: 120,
      activeCohorts: 2,
      enrolledLearners: 142,
    },
    {
      id: 'p3',
      code: 'MBA03',
      title: 'Master of Business Analytics',
      department: 'Faculty of Business',
      duration: '18 Months',
      creditHours: 45,
      activeCohorts: 1,
      enrolledLearners: 65,
    },
  ];

  const programmes = isDemoMode ? demoProgrammes : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-primary" /> Programmes, Intakes & Cohorts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Academic structure hierarchy: Programme → Academic Term → Intake → Cohort → Course.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Add Academic Programme</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programmes.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow border-slate-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="font-mono font-bold text-primary">{p.code}</Badge>
                <Badge variant="success">Active</Badge>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 leading-snug">{p.title}</CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-1">{p.department}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400">Duration:</span>
                  <p className="font-bold text-slate-900">{p.duration}</p>
                </div>
                <div>
                  <span className="text-slate-400">Credits:</span>
                  <p className="font-bold text-slate-900">{p.creditHours} Hours</p>
                </div>
                <div>
                  <span className="text-slate-400">Cohorts:</span>
                  <p className="font-bold text-slate-900">{p.activeCohorts} Active</p>
                </div>
                <div>
                  <span className="text-slate-400">Learners:</span>
                  <p className="font-bold text-slate-900">{p.enrolledLearners}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Manage Cohorts & Intakes
              </Button>
            </CardContent>
          </Card>
        ))}
        {programmes.length === 0 && (
          <div className="col-span-3 py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No academic programmes available. Enable Demo Data or add a programme.
          </div>
        )}
      </div>
    </div>
  );
}
