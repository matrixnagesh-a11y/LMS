'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTenant } from '@/components/providers/tenant-provider';
import { INITIAL_COLLEGES } from '@/lib/tenant-store';
import AttendancePage from '@/app/attendance/page';
import AssessmentsPage from '@/app/assessments/page';
import CertificatesPage from '@/app/certificates/page';
import ReportsPage from '@/app/reports/page';
import CalendarPage from '@/app/calendar/page';
import ProgrammesPage from '@/app/programmes/page';
import QuestionBanksPage from '@/app/question-banks/page';
import SubscriptionPage from '@/app/subscription/page';
import SettingsPage from '@/app/settings/page';
import LearnPage from '@/app/learn/page';
import StandaloneCoursesPage from '../courses/page';
import StandaloneUsersPage from '../users/page';
import StandaloneBrandingPage from '../branding/page';

export default function DynamicStandaloneModulePage() {
  const params = useParams();
  const slug = (params.tenantSlug as string) || 'meridian';
  const moduleSlug = (params.moduleSlug as string) || 'dashboard';
  const { selectCollegeTenant } = useTenant();

  useEffect(() => {
    const knownCollege = INITIAL_COLLEGES[slug];
    if (knownCollege) {
      selectCollegeTenant(knownCollege.name, knownCollege.primaryColor, knownCollege.secondaryColor);
    } else {
      const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      selectCollegeTenant(formattedName, '#0284C7', '#0D9488');
    }
  }, [slug, selectCollegeTenant]);

  switch (moduleSlug) {
    case 'courses':
      return <StandaloneCoursesPage />;
    case 'users':
      return <StandaloneUsersPage />;
    case 'branding':
      return <StandaloneBrandingPage />;
    case 'attendance':
      return <AttendancePage />;
    case 'assessments':
      return <AssessmentsPage />;
    case 'certificates':
      return <CertificatesPage />;
    case 'reports':
      return <ReportsPage />;
    case 'calendar':
      return <CalendarPage />;
    case 'programmes':
      return <ProgrammesPage />;
    case 'question-banks':
      return <QuestionBanksPage />;
    case 'subscription':
      return <SubscriptionPage />;
    case 'settings':
      return <SettingsPage />;
    case 'learn':
      return <LearnPage />;
    default:
      return <AttendancePage />;
  }
}
