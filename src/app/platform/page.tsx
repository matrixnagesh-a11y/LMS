'use client';

import React, { useState } from 'react';
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
  Activity,
  Lock,
  Search,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function PlatformAdminPage() {
  const [supportSessionActive, setSupportSessionActive] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Super Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-slate-900">Platform Super Administrator Portal</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Global management of college tenants, custom domain provisioning, subscription limits, and audit logs.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Provision New College Tenant</span>
        </Button>
      </div>

      {/* Support Access Session Status Banner */}
      {supportSessionActive && (
        <div className="bg-amber-500 text-white p-4 rounded-xl shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6" />
            <div>
              <p className="font-bold text-sm">Controlled Support Access Session Active</p>
              <p className="text-xs text-amber-100">Session ID: sup_89f1a23b | Access Reason: "Resolving DNS record verification" | Expires in 45m</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-amber-900 hover:bg-amber-50" onClick={() => setSupportSessionActive(false)}>
            Terminate Session
          </Button>
        </div>
      )}

      {/* Platform Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active College Tenants</CardTitle>
            <Building className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">100% operational status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total SaaS Users</CardTitle>
            <Users className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1,248</div>
            <p className="text-xs text-slate-500 mt-1">Across all registered tenants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Global Storage Consumption</CardTitle>
            <Database className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">84.6 GB</div>
            <p className="text-xs text-slate-500 mt-1">Supabase Storage buckets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Custom College Domains</CardTitle>
            <Globe className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">2 Active</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">SSL certificates active</p>
          </CardContent>
        </Card>
      </div>

      {/* College Tenants Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Registered College Tenants</CardTitle>
            <CardDescription>Managed enterprise instances and custom domain configurations</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filter tenants..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">College Name</th>
                  <th className="px-4 py-3">Subdomain & Domain</th>
                  <th className="px-4 py-3">Subscription</th>
                  <th className="px-4 py-3">Learners</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900">Meridian College</div>
                    <div className="text-xs text-slate-400">Code: MC01 | Malaysia</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs font-mono text-primary font-semibold">meridian.collegelms.com</div>
                    <div className="text-xs text-slate-500 flex items-center mt-0.5">
                      <Globe className="w-3 h-3 mr-1 text-emerald-600" /> learning.meridian.edu.my
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="default">Professional</Badge>
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-slate-700">482 / 1,000</td>
                  <td className="px-4 py-4"><Badge variant="success">Active</Badge></td>
                  <td className="px-4 py-4 text-right space-x-2">
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

                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-4">
                    <div className="font-bold text-slate-900">Horizon Training Institute</div>
                    <div className="text-xs text-slate-400">Code: HTI01 | Malaysia</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs font-mono text-purple-700 font-semibold">horizon.collegelms.com</div>
                    <div className="text-xs text-slate-500 flex items-center mt-0.5">
                      <Globe className="w-3 h-3 mr-1 text-emerald-600" /> lms.horizon.edu.my
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="secondary">Enterprise</Badge>
                  </td>
                  <td className="px-4 py-4 text-xs font-semibold text-slate-700">766 / 10,000</td>
                  <td className="px-4 py-4"><Badge variant="success">Active</Badge></td>
                  <td className="px-4 py-4 text-right space-x-2">
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
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
