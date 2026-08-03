'use client';

import React from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function QuestionBanksPage() {
  const { isDemoMode } = useDemoMode();

  const demoBanks = [
    {
      id: 'qb1',
      title: 'CS101 - Software Architecture & RLS Question Bank',
      questionsCount: 42,
      categories: ['Multi-Tenancy', 'Row Level Security', 'REST APIs'],
      difficulty: 'Medium to Hard',
    },
    {
      id: 'qb2',
      title: 'SEC201 - OWASP ASVS & Security Protocols',
      questionsCount: 38,
      categories: ['ASVS Level 2', 'Session Security', 'MFA Protocols'],
      difficulty: 'Hard',
    },
  ];

  const banks = isDemoMode ? demoBanks : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-primary" /> Question Banks Repository
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Question repository (MCQ, Fill in blank, True/False, Essay) with category tags & random pool selection.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Create Question Bank</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banks.map((qb) => (
          <Card key={qb.id} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline" className="font-semibold text-primary">{qb.questionsCount} Questions</Badge>
                <Badge variant="secondary">{qb.difficulty}</Badge>
              </div>
              <CardTitle className="text-base font-bold text-slate-900">{qb.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {qb.categories.map((c) => (
                  <Badge key={c} variant="outline" className="text-[11px] bg-slate-50">{c}</Badge>
                ))}
              </div>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Manage Questions & Pools
              </Button>
            </CardContent>
          </Card>
        ))}
        {banks.length === 0 && (
          <div className="col-span-2 py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No question banks created. Enable Demo Data or create a bank.
          </div>
        )}
      </div>
    </div>
  );
}
