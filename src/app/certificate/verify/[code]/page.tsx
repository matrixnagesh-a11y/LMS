'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, CheckCircle2, ShieldCheck, Calendar, Building } from 'lucide-react';

export default function CertificateVerifyPage({ params }: { params: { code: string } }) {
  const certificateCode = params.code || 'MC-CERT-88912';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full border-slate-200 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-b from-blue-50/50 to-white pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8" />
          </div>
          <Badge variant="success" className="mx-auto flex items-center w-max mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Authentic Certificate
          </Badge>
          <CardTitle className="text-xl font-bold text-slate-900">
            Certificate of Academic Achievement
          </CardTitle>
          <CardDescription className="text-xs text-slate-500 font-mono mt-1">
            Verification Code: {certificateCode}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">This certifies that</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Sarah Lee</h2>
            <p className="text-sm text-slate-600">has successfully completed all requirements for</p>
            <p className="text-lg font-bold text-primary">Introduction to Software Architecture (CS101)</p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl text-xs">
            <div>
              <span className="text-slate-400 flex items-center mb-1">
                <Building className="w-3.5 h-3.5 mr-1 text-slate-500" /> Issuing Institution
              </span>
              <p className="font-bold text-slate-900">Meridian College</p>
            </div>
            <div>
              <span className="text-slate-400 flex items-center mb-1">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" /> Issue Date
              </span>
              <p className="font-bold text-slate-900">August 03, 2026</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" /> CollegeLMS Cloud Verification Engine
            </span>
            <span className="font-mono">Status: Active</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
