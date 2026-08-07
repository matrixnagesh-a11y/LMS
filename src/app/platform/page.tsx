'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building,
  Plus,
  Globe,
  Database,
  Users,
  Lock,
  Search,
  ExternalLink,
  ShieldAlert,
  Palette,
  CheckCircle2,
  X
} from 'lucide-react';

export default function PlatformAdminPage() {
  const { setBranding } = useTenant();
  const [supportSessionActive, setSupportSessionActive] = useState(false);
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  // Initial Tenants State
  const [tenants, setTenants] = useState([
    {
      id: 't1',
      name: 'Meridian College',
      code: 'MC01',
      subdomain: 'meridian',
      customDomain: 'learning.meridian.edu.my',
      plan: 'Professional',
      learners: '482 / 1,000',
      status: 'Active',
      primaryColor: '#2563EB',
      secondaryColor: '#0F766E',
      welcome: 'Welcome to Meridian College LMS Portal',
      abbreviation: 'MC',
    },
    {
      id: 't2',
      name: 'Horizon Training Institute',
      code: 'HTI01',
      subdomain: 'horizon',
      customDomain: 'lms.horizon.edu.my',
      plan: 'Enterprise',
      learners: '766 / 10,000',
      status: 'Active',
      primaryColor: '#7C3AED',
      secondaryColor: '#059669',
      welcome: 'Welcome to Horizon Training Institute Cloud',
      abbreviation: 'HTI',
    },
  ]);

  // Provision Form State
  const [newCollegeName, setNewCollegeName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [newCustomDomain, setNewCustomDomain] = useState('');
  const [newPrimaryColor, setNewPrimaryColor] = useState('#0284C7');
  const [newSecondaryColor, setNewSecondaryColor] = useState('#0D9488');
  const [newPlan, setNewPlan] = useState('Professional');
  const [newWelcome, setNewWelcome] = useState('Welcome to our College LMS');

  const handleProvisionCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollegeName || !newSubdomain) return;

    const createdTenant = {
      id: 't_' + Math.random().toString(36).substring(2, 7),
      name: newCollegeName,
      code: newCode || newSubdomain.toUpperCase(),
      subdomain: newSubdomain.toLowerCase(),
      customDomain: newCustomDomain || `${newSubdomain.toLowerCase()}.edu.my`,
      plan: newPlan,
      learners: '1 / 1,000',
      status: 'Active',
      primaryColor: newPrimaryColor,
      secondaryColor: newSecondaryColor,
      welcome: newWelcome,
      abbreviation: newCollegeName.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase(),
    };

    setTenants([createdTenant, ...tenants]);

    // Apply branding context
    setBranding({
      id: createdTenant.id,
      tenant_id: createdTenant.id,
      primary_color: createdTenant.primaryColor,
      secondary_color: createdTenant.secondaryColor,
      accent_color: '#F59E0B',
      welcome_message: createdTenant.welcome,
      college_abbreviation: createdTenant.abbreviation,
    });

    setShowProvisionModal(false);
    // Reset form
    setNewCollegeName('');
    setNewSubdomain('');
    setNewCustomDomain('');
  };

  const switchTenantBranding = (t: typeof tenants[0]) => {
    setBranding({
      id: t.id,
      tenant_id: t.id,
      primary_color: t.primaryColor,
      secondary_color: t.secondaryColor,
      accent_color: '#F59E0B',
      welcome_message: t.welcome,
      college_abbreviation: t.abbreviation,
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Super Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Platform Super Administrator Portal</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Logged in as Superuser: <span className="font-mono font-bold text-slate-800">matrixnagesh@gmail.com</span> • Multi-tenant SaaS Management
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/platform/login">
            <Button variant="outline" className="text-xs">
              Superuser Login
            </Button>
          </Link>
          <Button
            onClick={() => setShowProvisionModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Provision New College Tenant</span>
          </Button>
        </div>
      </div>

      {/* Support Access Banner */}
      {supportSessionActive && (
        <div className="bg-amber-500 text-white p-4 rounded-xl shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6" />
            <div>
              <p className="font-bold text-sm">Controlled Support Access Session Active (Superuser: matrixnagesh@gmail.com)</p>
              <p className="text-xs text-amber-100">Session ID: sup_89f1a23b | Time-bound audit logging active</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-amber-900 hover:bg-amber-50 text-xs" onClick={() => setSupportSessionActive(false)}>
            Terminate Session
          </Button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Onboarded Colleges</CardTitle>
            <Building className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{tenants.length} Tenants</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">100% operational status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total SaaS Users</CardTitle>
            <Users className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1,248</div>
            <p className="text-xs text-slate-500 mt-1">Across all onboarded colleges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Cloud Storage</CardTitle>
            <Database className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">84.6 GB</div>
            <p className="text-xs text-slate-500 mt-1">Supabase Storage buckets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Custom Domains</CardTitle>
            <Globe className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{tenants.length} Active</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">SSL certificates active</p>
          </CardContent>
        </Card>
      </div>

      {/* Provision College Tenant Modal */}
      {showProvisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-white shadow-2xl border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">Onboard New College Tenant</CardTitle>
                <CardDescription className="text-xs">Configure unique branding, subdomain, and plan limits</CardDescription>
              </div>
              <button onClick={() => setShowProvisionModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleProvisionCollege} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">College Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Institute of Technology"
                    value={newCollegeName}
                    onChange={(e) => setNewCollegeName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subdomain</label>
                    <input
                      type="text"
                      required
                      placeholder="apex"
                      value={newSubdomain}
                      onChange={(e) => setNewSubdomain(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Custom Domain</label>
                    <input
                      type="text"
                      placeholder="lms.apex.edu.my"
                      value={newCustomDomain}
                      onChange={(e) => setNewCustomDomain(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={newPrimaryColor}
                        onChange={(e) => setNewPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 p-0 cursor-pointer"
                      />
                      <span className="font-mono text-slate-700 uppercase">{newPrimaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Secondary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={newSecondaryColor}
                        onChange={(e) => setNewSecondaryColor(e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 p-0 cursor-pointer"
                      />
                      <span className="font-mono text-slate-700 uppercase">{newSecondaryColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dashboard Welcome Banner</label>
                  <input
                    type="text"
                    value={newWelcome}
                    onChange={(e) => setNewWelcome(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-md bg-white focus:outline-none"
                  >
                    <option value="Starter">Starter Plan (100 Learners)</option>
                    <option value="Professional">Professional Plan (1,000 Learners)</option>
                    <option value="Enterprise">Enterprise Plan (10,000 Learners)</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end space-x-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowProvisionModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    Onboard & Create Tenant
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* College Tenants Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Onboarded Colleges & Custom Branding Status</CardTitle>
            <CardDescription>Managed enterprise instances with dedicated branding & database isolation</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">College Name & Branding</th>
                  <th className="px-4 py-3">Subdomain & Custom Domain</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Learners</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: tenant.primaryColor }}
                        ></div>
                        <div>
                          <div className="font-bold text-slate-900">{tenant.name}</div>
                          <div className="text-xs text-slate-400">Code: {tenant.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs font-mono text-blue-700 font-semibold">{tenant.subdomain}.collegelms.com</div>
                      <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <Globe className="w-3 h-3 mr-1 text-emerald-600" /> {tenant.customDomain}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={tenant.plan === 'Enterprise' ? 'secondary' : 'default'}>{tenant.plan}</Badge>
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-slate-700">{tenant.learners}</td>
                    <td className="px-4 py-4"><Badge variant="success">{tenant.status}</Badge></td>
                    <td className="px-4 py-4 text-right space-x-2">
                      <Link href="/dashboard" onClick={() => switchTenantBranding(tenant)}>
                        <Button size="sm" className="text-xs bg-primary text-white hover:bg-primary/90">
                          <Palette className="w-3 h-3 mr-1" /> Open Branded Dashboard
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => setSupportSessionActive(true)}
                      >
                        <Lock className="w-3 h-3 mr-1 text-amber-600" /> Support Access
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
