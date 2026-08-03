'use client';

import React from 'react';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Check, UserCheck, HardDrive, ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionPage() {
  const { tenantName } = useTenant();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Building2 className="w-6 h-6 mr-2 text-primary" /> College Subscription Plan & Entitlements
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Database-driven feature entitlements, usage quotas, renewal dates, and plan tier upgrades for {tenantName}.
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">
          Professional Plan Active
        </Badge>
      </div>

      {/* Quotas & Capacity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase font-semibold text-slate-400">Learners Quota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">482 / 1,000</div>
            <p className="text-xs text-slate-500 mt-1">48.2% of plan capacity used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase font-semibold text-slate-400">Instructors Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12 / 50</div>
            <p className="text-xs text-slate-500 mt-1">38 instructor slots remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase font-semibold text-slate-400">Storage Allowance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">34.2 GB / 100 GB</div>
            <p className="text-xs text-slate-500 mt-1">Supabase Storage buckets</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Tiers Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Starter Plan</CardTitle>
            <CardDescription>Up to 100 learners & core courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600">
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Max 100 Learners</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 20 GB Storage</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Platform Subdomain</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary bg-primary/5 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold text-primary">Professional Plan</CardTitle>
              <Badge variant="default">Current Plan</Badge>
            </div>
            <CardDescription>Up to 1,000 learners & custom domain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-700 font-medium">
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Max 1,000 Learners</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 100 GB Storage</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Custom College Domain</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Custom Branding & Colors</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Enterprise Plan</CardTitle>
            <CardDescription>Up to 10,000+ learners & SSO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600">
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Max 10,000 Learners</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 1 TB Storage</p>
            <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Institutional Single Sign-On</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
