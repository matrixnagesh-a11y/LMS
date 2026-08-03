'use client';

import React from 'react';
import Link from 'next/link';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, Download } from 'lucide-react';

export default function LearnerCertificatesPage() {
  const { isDemoMode } = useDemoMode();

  const demoCertificates = [
    {
      id: 'c1',
      code: 'MC-CERT-88912',
      title: 'Introduction to Software Architecture (CS101)',
      issuedAt: 'Aug 03, 2026',
    },
  ];

  const certificates = isDemoMode ? demoCertificates : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <Award className="w-6 h-6 mr-2 text-primary" /> My Academic Certificates
        </h1>
        <p className="text-sm text-slate-500 mt-1">Download official certificates or share public QR verification links.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="font-mono text-primary font-bold">{cert.code}</Badge>
                <Badge variant="success">Verified Authentic</Badge>
              </div>
              <CardTitle className="text-base font-bold text-slate-900 mt-2">{cert.title}</CardTitle>
              <CardDescription className="text-xs text-slate-500">Issued on {cert.issuedAt}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Link href={`/certificate/verify/${cert.code}`} target="_blank" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" /> Public Verification
                  </Button>
                </Link>
                <Button size="sm" className="bg-primary text-white text-xs">
                  <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-2 py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
            No earned certificates found. Enable Demo Data mode.
          </div>
        )}
      </div>
    </div>
  );
}
