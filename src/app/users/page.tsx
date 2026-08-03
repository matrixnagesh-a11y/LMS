'use client';

import React, { useState } from 'react';
import { useDemoMode } from '@/components/providers/demo-mode-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserPlus,
  Upload,
  Search,
  Filter,
  Mail,
  Shield,
  Trash2,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';

export default function UsersPage() {
  const { isDemoMode } = useDemoMode();
  const [roleFilter, setRoleFilter] = useState('all');

  const demoUsers = [
    { id: 'u1', name: 'Dr. Aris Meridian', email: 'admin@meridian.edu.my', role: 'College Owner', department: 'Executive', status: 'Active' },
    { id: 'u2', name: 'Dr. Tan Keng Beng', email: 'dr.tan@meridian.edu.my', role: 'Instructor', department: 'Computer Science', status: 'Active' },
    { id: 'u3', name: 'Sarah Lee', email: 'sarah@meridian.edu.my', role: 'Learner', department: 'Software Engineering', status: 'Active' },
    { id: 'u4', name: 'Ahmad Razak', email: 'ahmad@meridian.edu.my', role: 'Learner', department: 'Software Engineering', status: 'At Risk' },
    { id: 'u5', name: 'Elena Rostova', email: 'elena@meridian.edu.my', role: 'Academic Administrator', department: 'Academic Affairs', status: 'Active' },
  ];

  const users = isDemoMode ? demoUsers : [];
  const filteredUsers = users.filter(u => roleFilter === 'all' || u.role.toLowerCase().includes(roleFilter));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" /> College User & Role Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage learners, instructors, assessors, and administrative staff role permissions.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-xs flex items-center space-x-1.5">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>CSV Bulk Import</span>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white text-xs flex items-center space-x-1.5">
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Registered College Accounts</CardTitle>
            <CardDescription>{filteredUsers.length} total active users</CardDescription>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="owner">College Owner</option>
              <option value="instructor">Instructor</option>
              <option value="learner">Learner</option>
            </select>

            <div className="relative w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search user..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3">Full Name & Email</th>
                  <th className="px-4 py-3">Assigned Role</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
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
                    <td className="px-4 py-3.5">
                      <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <Button size="sm" variant="ghost" className="text-xs text-rose-600 hover:bg-rose-50">
                        Deactivate
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                      No user accounts found. Enable Demo Data or invite a user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
