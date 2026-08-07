'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Upload, Search, Mail, Shield } from 'lucide-react';

export default function StandaloneUsersPage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const { tenantName } = useTenant();

  const users = [
    { id: 'u1', name: 'Academic Director', email: `admin@${slug}.edu.my`, role: 'College Admin', department: 'Executive', status: 'Active' },
    { id: 'u2', name: 'Dr. Tan Keng Beng', email: `dr.tan@${slug}.edu.my`, role: 'Instructor', department: 'Computer Science', status: 'Active' },
    { id: 'u3', name: 'Sarah Lee', email: `sarah@${slug}.edu.my`, role: 'Learner', department: 'Software Engineering', status: 'Active' },
    { id: 'u4', name: 'Ahmad Razak', email: `ahmad@${slug}.edu.my`, role: 'Learner', department: 'Software Engineering', status: 'Active' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="outline" className="mb-1 text-primary font-bold">{tenantName}</Badge>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" /> Student & Faculty Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage learners, instructors, and staff roles for {tenantName}.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-xs">
            <Upload className="w-4 h-4 mr-1 text-slate-500" /> Bulk CSV Import
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white text-xs">
            <UserPlus className="w-4 h-4 mr-1" /> Invite User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tenantName} Registered Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Full Name & Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-400 flex items-center mt-0.5">
                        <Mail className="w-3 h-3 mr-1 text-slate-400" /> {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant="outline" className="font-semibold text-primary border-primary/20">
                        <Shield className="w-3 h-3 mr-1 text-primary" /> {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600">{user.department}</td>
                    <td className="px-4 py-3.5"><Badge variant="success">{user.status}</Badge></td>
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
