'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { INITIAL_COLLEGES } from '@/lib/tenant-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Layers, CheckCircle2, Sparkles } from 'lucide-react';

export default function DynamicStandaloneModulePage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const moduleSlug = (params.moduleSlug as string) || 'dashboard';
  const { tenantName, selectCollegeTenant } = useTenant();

  useEffect(() => {
    const knownCollege = INITIAL_COLLEGES[slug];
    if (knownCollege) {
      selectCollegeTenant(knownCollege.name, knownCollege.primaryColor, knownCollege.secondaryColor);
    }
  }, [slug]);

  const moduleTitle = moduleSlug.charAt(0).toUpperCase() + moduleSlug.slice(1).replace('-', ' ');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="outline" className="mb-1 text-primary font-bold">{tenantName}</Badge>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <Layers className="w-6 h-6 mr-2 text-primary" /> {moduleTitle} Workspace
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Dedicated {moduleTitle} management for {tenantName}. Isolated data and student records.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Sparkles className="w-4 h-4 text-primary mr-2" /> Active Standalone {moduleTitle} Module
          </CardTitle>
          <CardDescription>Operating under dedicated client URL: /c/{slug}/{moduleSlug}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-700">
            <p className="font-semibold text-slate-900 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Isolated College Environment Verified
            </p>
            <p>
              This module operates exclusively for <strong>{tenantName}</strong>. Zero platform noise, zero cross-tenant leakage, and fully white-labeled for your customer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
