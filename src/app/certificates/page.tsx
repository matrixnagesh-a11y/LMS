'use client';

import React from 'react';
import Link from 'next/link';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Plus, CheckCircle2, ExternalLink, ShieldCheck, Download } from 'lucide-react';

export default function CertificatesPage() {
  const { isDemoMode } = useDemoMode();

  const demoCertificates = [
    {
      id: 'cert1',
      code: 'MC-CERT-88912',
      learner: 'Sarah Lee',
      course: 'Introduction to Software Architecture (CS101)',
      issuedAt: 'Aug 03, 2026',
      status: 'Valid',
    },
    {
      id: 'cert2',
      code: 'MC-CERT-99401',
      learner: 'Ahmad Razak',
      course: 'Cybersecurity Fundamentals (SEC201)',
      issuedAt: 'Jul 28, 2026',
      status: 'Valid',
    },
  ];

  const certs = isDemoMode ? demoCertificates : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Award className="w-6 h-6 mr-2 text-primary" /> Certificate Engine & Public Verification
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate branded PDF certificates with signatories, custom backgrounds, and public QR verification codes.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
          <Plus className="w-4 h-4" />
          <span>Issue New Certificate</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Issued Academic Certificates</CardTitle>
            <CardDescription>{certs.length} certificates issued</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Verification Code</th>
                  <th className="px-4 py-3">Learner Name</th>
                  <th className="px-4 py-3">Course Title</th>
                  <th className="px-4 py-3">Issue Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certs.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5 font-mono font-bold text-primary">{c.code}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{c.learner}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-700">{c.course}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{c.issuedAt}</td>
                    <td className="px-4 py-3.5"><Badge variant="success">{c.status}</Badge></td>
                    <td className="px-4 py-3.5 text-right space-x-2">
                      <Link href={`/certificate/verify/${c.code}`} target="_blank">
                        <Button size="sm" variant="outline" className="text-xs">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> Public Link
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {certs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                      No certificates issued. Enable Demo Data or issue a certificate.
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
