'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
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
  Award,
  Menu,
  X
} from 'lucide-react';

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (open: boolean) => void }) {
  const pathname = usePathname();
  const params = useParams();
  const tenantSlug = params?.tenantSlug as string;
  const { branding, tenantName } = useTenant();

  const basePath = tenantSlug ? `/c/${tenantSlug}` : '';

  const navigation = [
    { name: 'Dashboard', href: tenantSlug ? `${basePath}` : '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: tenantSlug ? `${basePath}/courses` : '/courses', icon: BookOpen },
    { name: 'Programmes', href: tenantSlug ? `${basePath}/programmes` : '/programmes', icon: GraduationCap },
    { name: 'Calendar & Schedule', href: tenantSlug ? `${basePath}/calendar` : '/calendar', icon: Calendar },
    { name: 'Attendance', href: tenantSlug ? `${basePath}/attendance` : '/attendance', icon: ClipboardCheck },
    { name: 'Assessments', href: tenantSlug ? `${basePath}/assessments` : '/assessments', icon: FileCheck },
    { name: 'Question Banks', href: tenantSlug ? `${basePath}/question-banks` : '/question-banks', icon: BookOpen },
    { name: 'Certificates', href: tenantSlug ? `${basePath}/certificates` : '/certificates', icon: Award },
    { name: 'User Management', href: tenantSlug ? `${basePath}/users` : '/users', icon: Users },
    { name: 'Reports & Analytics', href: tenantSlug ? `${basePath}/reports` : '/reports', icon: BarChart3 },
    { name: 'Branding Studio', href: tenantSlug ? `${basePath}/branding` : '/branding', icon: Palette },
    { name: 'Subscription Plan', href: tenantSlug ? `${basePath}/subscription` : '/subscription', icon: Building2 },
    { name: 'Settings', href: tenantSlug ? `${basePath}/settings` : '/settings', icon: Settings },
  ];

  const learnerNav = [
    { name: 'Learner Dashboard', href: tenantSlug ? `${basePath}/learn` : '/learn', icon: LayoutDashboard },
    { name: 'My Enrolled Courses', href: tenantSlug ? `${basePath}/learn/courses` : '/learn/courses', icon: BookOpen },
    { name: 'My Results', href: tenantSlug ? `${basePath}/learn/results` : '/learn/results', icon: FileCheck },
    { name: 'My Certificates', href: tenantSlug ? `${basePath}/learn/certificates` : '/learn/certificates', icon: Award },
  ];

  const closeMobile = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full py-4">
      <div>
        {/* Customer Standalone College LMS Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center space-x-3">
            {branding.logo_url ? (
              <img src={branding.logo_url} alt="College Logo" className="w-10 h-10 object-contain rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-base shadow-sm">
                {branding.college_abbreviation || 'LMS'}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-bold text-slate-900 text-sm truncate max-w-[150px]">{tenantName}</h1>
              <p className="text-[11px] text-slate-500 font-medium">Standalone LMS Portal</p>
            </div>
          </div>
          {setMobileOpen && (
            <button onClick={closeMobile} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">College Portal</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobile}
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

        {/* Learner View */}
        <div className="px-3 py-2 border-t border-slate-100 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Learner View</p>
          {learnerNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobile}
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

      {/* Host Onboarding Link */}
      {!tenantSlug && (
        <div className="p-3 border-t border-slate-100 bg-slate-50">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex items-center space-x-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Superadmin Host Landing</span>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between hidden md:flex">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-xs" onClick={closeMobile} />
          <aside className="relative w-72 max-w-xs bg-white h-full shadow-2xl z-10 overflow-y-auto">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
