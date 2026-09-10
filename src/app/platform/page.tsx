'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building,
  Plus,
  ArrowRight,
  Palette,
  CheckCircle2,
  X,
  Sparkles,
  Search
} from 'lucide-react';

export default function PlatformAdminPage() {
  const router = useRouter();
  const { selectCollegeTenant } = useTenant();
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // College Tenants List loaded from database
  const [colleges, setColleges] = useState<Array<{ id: string; name: string; primaryColor: string; secondaryColor: string; status: string; createdDate: string; slug?: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Load tenants on mount
  useEffect(() => {
    fetch('/api/tenants')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data)) {
          const mapped = json.data.map((t: any) => ({
            id: t.id,
            name: t.display_name || t.legal_name,
            primaryColor: t.branding?.primary_color || '#2563EB',
            secondaryColor: t.branding?.secondary_color || '#0F766E',
            status: 'Active LMS Workspace',
            createdDate: new Date(t.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            slug: t.subdomain,
          }));
          setColleges(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Ultra-Simple Onboarding Form State: JUST COLLEGE NAME!
  const [collegeNameInput, setCollegeNameInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSimpleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeNameInput.trim() || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: collegeNameInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        const newCol = {
          id: data.tenant.id,
          name: data.tenant.display_name,
          primaryColor: data.tenant.branding?.primary_color || '#2563EB',
          secondaryColor: data.tenant.branding?.secondary_color || '#0F766E',
          status: 'Active LMS Workspace',
          createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          slug: data.slug,
        };
        setColleges(prev => [newCol, ...prev]);
        setShowProvisionModal(false);
        setCollegeNameInput('');
        selectCollegeTenant(newCol.name, newCol.primaryColor, newCol.secondaryColor);
        router.push(`/c/${data.slug}/branding`);
      }
    } catch {
      // handled gracefully
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenCollegeLMS = (college: typeof colleges[0]) => {
    selectCollegeTenant(college.name, college.primaryColor, college.secondaryColor);
    if (college.slug) {
      router.push(`/c/${college.slug}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Superadmin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">SaaS Host Superadmin Onboarding Portal</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Superadmin: <span className="font-mono font-bold text-slate-800">matrixnagesh@gmail.com</span> • Onboard new client colleges with just a name
          </p>
        </div>
        <Button
          onClick={() => setShowProvisionModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 text-xs font-bold px-4 py-2.5 shadow-md"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Onboard New College</span>
        </Button>
      </div>

      {/* Simple Onboarding Modal (JUST COLLEGE NAME!) */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white shadow-2xl border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-900 flex items-center">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-2" /> Onboard New College Customer
                </CardTitle>
                <CardDescription className="text-xs">Enter the college name to create a standalone LMS instance</CardDescription>
              </div>
              <button onClick={() => setShowProvisionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSimpleOnboard} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    College Name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. Apex Institute of Technology"
                    value={collegeNameInput}
                    onChange={(e) => setCollegeNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    The college will receive its own standalone LMS dashboard where they can upload their own logo, background graphics, welcome intro, and policies.
                  </p>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowProvisionModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-4">
                    Create & Open College LMS
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* College List Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center">
          <Building className="w-5 h-5 mr-2 text-blue-600" /> Hosted Standalone College LMS Workspaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colleges.map((college) => (
            <Card
              key={college.id}
              className="hover:border-blue-500 transition-all border-2 border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: college.primaryColor }}
                    ></div>
                    <Badge variant="success">{college.status}</Badge>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Onboarded {college.createdDate}</span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{college.name}</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Fully customizable standalone LMS workspace
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                  Click below to enter <strong>{college.name}</strong> as a standalone LMS where the customer can upload logos, background banners, policies, and colors.
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleOpenCollegeLMS(college)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5"
                  >
                    <span>Launch Standalone College LMS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
