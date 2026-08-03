'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileCheck,
  BarChart3,
  Users,
  Settings,
  Palette,
  ShieldCheck,
  Building2,
  Bell,
  Award
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { branding, tenantName } = useTenant();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Programmes', href: '/programmes', icon: GraduationCap },
    { name: 'Calendar & Schedule', href: '/calendar', icon: Calendar },
    { name: 'Attendance', href: '/attendance', icon: ClipboardCheck },
    { name: 'Assessments', href: '/assessments', icon: FileCheck },
    { name: 'Question Banks', href: '/question-banks', icon: BookOpen },
    { name: 'Certificates', href: '/certificates', icon: Award },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
    { name: 'College Branding', href: '/branding', icon: Palette },
    { name: 'Subscription Plan', href: '/subscription', icon: Building2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const platformNav = [
    { name: 'Platform SaaS Admin', href: '/platform', icon: ShieldCheck },
  ];

  const learnerNav = [
    { name: 'Learner Dashboard', href: '/learn', icon: LayoutDashboard },
    { name: 'My Enrolled Courses', href: '/learn/courses', icon: BookOpen },
    { name: 'My Results', href: '/learn/results', icon: FileCheck },
    { name: 'My Certificates', href: '/learn/certificates', icon: Award },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between hidden md:flex">
      <div>
        {/* Tenant Header Branding */}
        <div className="p-5 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {branding.college_abbreviation || 'LMS'}
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm truncate max-w-[150px]">{tenantName}</h1>
            <p className="text-xs text-slate-500">CollegeLMS Cloud</p>
          </div>
        </div>

        {/* Main College Admin Nav */}
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">College Portal</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Learner Portal Section */}
        <div className="px-3 py-2 border-t border-slate-100 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Learner View</p>
          {learnerNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-secondary/10 text-secondary font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-secondary' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Platform Admin Link */}
      <div className="p-3 border-t border-slate-100 bg-slate-50">
        {platformNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <item.icon className="w-4 h-4 text-slate-500" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
