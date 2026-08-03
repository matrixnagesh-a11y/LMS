'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto py-6">
      <div className="text-center space-y-3">
        <Badge variant="secondary" className="px-3 py-1 text-xs uppercase tracking-wider">
          SaaS Pricing Tiers
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Flexible Subscription Plans for Independent Colleges
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Scale from single-campus institutes to multi-campus universities with dedicated custom domains, isolated database RLS, and assessment engines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-slate-200 shadow-sm flex flex-col justify-between">
          <CardHeader>
            <Badge variant="outline" className="w-max mb-2">Starter</Badge>
            <CardTitle className="text-2xl font-bold text-slate-900">$299 <span className="text-xs font-normal text-slate-500">/ month</span></CardTitle>
            <CardDescription>For small training institutes & academies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Up to 100 Enrolled Learners</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 3 College Administrators</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 20 GB Cloud Storage</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Platform Subdomain</li>
            </ul>
            <Link href="/login" className="block">
              <Button className="w-full text-xs" variant="outline">Start 14-Day Free Trial</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary bg-primary/5 shadow-md flex flex-col justify-between relative">
          <div className="absolute -top-3 right-6 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
            Most Popular
          </div>
          <CardHeader>
            <Badge className="w-max mb-2 bg-primary">Professional</Badge>
            <CardTitle className="text-2xl font-bold text-slate-900">$799 <span className="text-xs font-normal text-slate-500">/ month</span></CardTitle>
            <CardDescription>For growing colleges requiring custom branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Up to 1,000 Enrolled Learners</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 10 Administrators & 50 Instructors</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 100 GB Cloud Storage</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Custom College Domain (Cloudflare SSL)</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Dynamic Branding & Logo Theme</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> QR Code Attendance & Verification</li>
            </ul>
            <Link href="/login" className="block">
              <Button className="w-full text-xs bg-primary text-white hover:bg-primary/90 shadow-sm">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm flex flex-col justify-between">
          <CardHeader>
            <Badge variant="secondary" className="w-max mb-2">Enterprise</Badge>
            <CardTitle className="text-2xl font-bold text-slate-900">Custom <span className="text-xs font-normal text-slate-500">/ annual</span></CardTitle>
            <CardDescription>For large multi-campus college networks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 10,000+ Enrolled Learners</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Unlimited Admins & Staff</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> 1 TB Storage</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Institutional Single Sign-On (SSO)</li>
              <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-600" /> Dedicated SLA & Support Team</li>
            </ul>
            <Link href="/login" className="block">
              <Button className="w-full text-xs" variant="outline">Contact Enterprise Sales</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
