import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, ShieldCheck, BookOpen, GraduationCap, ArrowRight, Palette } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="px-3 py-1 text-xs uppercase tracking-wider">
          Multi-College SaaS Platform
        </Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          CollegeLMS Cloud
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Multi-tenant Learning Management System powering independent college campuses with custom branding, Row Level Security, assessment tools, and learner tracking.
        </p>
      </div>

      {/* Select Demo Workspace */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          Explore Demonstration College Workspaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meridian College Demo Card */}
          <Card className="hover:border-primary transition-all border-2 border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-blue-600 text-white">Meridian Tenant</Badge>
                <span className="text-xs font-mono text-slate-400">meridian.collegelms.com</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">Meridian College</CardTitle>
              <CardDescription>Primary Color: #2563EB • Professional Plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-600">
                Includes sample courses (Software Architecture, Cybersecurity), enrolled learners, and active assessments.
              </p>
              <div className="flex space-x-3">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    College Admin Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Horizon Training Institute Demo Card */}
          <Card className="hover:border-purple-600 transition-all border-2 border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-purple-700 text-white">Horizon Tenant</Badge>
                <span className="text-xs font-mono text-slate-400">horizon.collegelms.com</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">Horizon Training Institute</CardTitle>
              <CardDescription>Primary Color: #7C3AED • Enterprise Plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-600">
                Includes Enterprise Business Analytics course, distinct purple theme branding, and separate user isolation.
              </p>
              <div className="flex space-x-3">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white text-xs">
                    College Admin Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Nav Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/platform" className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm text-center space-y-2 block">
          <ShieldCheck className="w-6 h-6 text-primary mx-auto" />
          <p className="text-xs font-bold text-slate-900">Platform Super Admin</p>
        </Link>
        <Link href="/branding" className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm text-center space-y-2 block">
          <Palette className="w-6 h-6 text-secondary mx-auto" />
          <p className="text-xs font-bold text-slate-900">College Branding</p>
        </Link>
        <Link href="/learn" className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm text-center space-y-2 block">
          <GraduationCap className="w-6 h-6 text-amber-500 mx-auto" />
          <p className="text-xs font-bold text-slate-900">Learner Portal</p>
        </Link>
        <Link href="/certificate/verify/MC-CERT-88912" className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm text-center space-y-2 block">
          <BookOpen className="w-6 h-6 text-emerald-600 mx-auto" />
          <p className="text-xs font-bold text-slate-900">Certificate Verification</p>
        </Link>
      </div>
    </div>
  );
}
