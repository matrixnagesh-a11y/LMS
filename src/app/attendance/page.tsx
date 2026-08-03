'use client';

import React, { useState } from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, QrCode, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

export default function AttendancePage() {
  const { isDemoMode } = useDemoMode();
  const [qrToken, setQrToken] = useState<string | null>(null);

  const demoLearners = [
    { id: 'l1', name: 'Sarah Lee', code: 'MC2026-001', status: 'present' },
    { id: 'l2', name: 'Ahmad Razak', code: 'MC2026-002', status: 'absent' },
    { id: 'l3', name: 'Devan Nair', code: 'MC2026-003', status: 'late' },
    { id: 'l4', name: 'Tan Mei Ling', code: 'MC2026-004', status: 'excused' },
  ];

  const learners = isDemoMode ? demoLearners : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <ClipboardCheck className="w-6 h-6 mr-2 text-primary" /> Attendance Management & QR Check-in
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Record physical classroom & online live session attendance (Present, Absent, Late, Excused, Medical).
          </p>
        </div>
        <Button
          onClick={() => setQrToken('QR-' + Math.random().toString(36).substring(2, 8).toUpperCase())}
          className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5"
        >
          <QrCode className="w-4 h-4" />
          <span>Generate Attendance QR Code</span>
        </Button>
      </div>

      {qrToken && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3">
          <QrCode className="w-24 h-24 bg-white p-3 rounded-xl text-slate-900 shadow-md" />
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider font-semibold text-blue-200">Active Live QR Check-in Token</p>
            <p className="font-mono text-xl font-bold">{qrToken}</p>
            <p className="text-xs text-blue-100 mt-1">Expires in 15 minutes • Learners scan to self-check-in</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">CS101 Session Attendance Roster</CardTitle>
            <CardDescription>Lecture Session: Aug 03, 2026 (09:00 AM)</CardDescription>
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            Save Attendance Records
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Learner ID & Name</th>
                  <th className="px-4 py-3">Attendance Status</th>
                  <th className="px-4 py-3 text-right">Quick Mark Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {learners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{learner.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{learner.code}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      {learner.status === 'present' && <Badge variant="success">Present</Badge>}
                      {learner.status === 'absent' && <Badge variant="destructive">Absent</Badge>}
                      {learner.status === 'late' && <Badge variant="warning">Late</Badge>}
                      {learner.status === 'excused' && <Badge variant="outline">Excused</Badge>}
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-1">
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100">Present</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-rose-50 text-rose-700 hover:bg-rose-100">Absent</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-amber-50 text-amber-700 hover:bg-amber-100">Late</Button>
                    </td>
                  </tr>
                ))}
                {learners.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-400 text-xs">
                      No attendance session selected. Enable Demo Data.
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
