'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TenantBranding } from '@/lib/types/database';
import { hexToHsl } from '@/lib/tenant';
import { INITIAL_COLLEGES } from '@/lib/tenant-store';

interface TenantContextType {
  branding: TenantBranding;
  tenantName: string;
  setBranding: (branding: TenantBranding) => void;
  setTenantName: (name: string) => void;
  selectCollegeTenant: (name: string, primaryColor?: string, secondaryColor?: string) => void;
}

const DEFAULT_FULL_BRANDING: TenantBranding = {
  id: 'default',
  tenant_id: 'default',
  primary_color: '#2563EB',
  secondary_color: '#0F766E',
  accent_color: '#F59E0B',
  welcome_message: 'Welcome to your Learning Management System',
  introduction: 'Providing high quality higher education, professional diplomas, and academic excellence.',
  privacy_policy: 'This institution is committed to protecting student data privacy under international guidelines.',
  terms_of_use: 'Students and staff must adhere to academic integrity guidelines.',
  college_abbreviation: 'LMS',
  logo_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
  login_bg_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
};

const resolveTenantFromPath = (pathname: string | null) => {
  if (pathname && pathname.startsWith('/c/')) {
    const parts = pathname.split('/');
    const slug = parts[2];
    if (slug) {
      const known = INITIAL_COLLEGES[slug];
      if (known) {
        return {
          name: known.name,
          branding: {
            ...DEFAULT_FULL_BRANDING,
            primary_color: known.primaryColor,
            secondary_color: known.secondaryColor,
            logo_url: known.logoUrl || DEFAULT_FULL_BRANDING.logo_url,
            login_bg_url: known.bgUrl || DEFAULT_FULL_BRANDING.login_bg_url,
            welcome_message: known.welcomeMessage,
            introduction: known.introduction,
            privacy_policy: known.privacyPolicy,
            terms_of_use: known.termsOfUse,
            college_abbreviation: known.code || 'LMS',
          }
        };
      } else {
        const formattedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return {
          name: formattedName,
          branding: {
            ...DEFAULT_FULL_BRANDING,
            primary_color: '#0284C7',
            secondary_color: '#0D9488',
            welcome_message: `Welcome to ${formattedName} LMS Portal`,
            college_abbreviation: slug.substring(0, 3).toUpperCase(),
          }
        };
      }
    }
  }
  return {
    name: 'Meridian College',
    branding: DEFAULT_FULL_BRANDING
  };
};

const TenantContext = createContext<TenantContextType>({
  branding: DEFAULT_FULL_BRANDING,
  tenantName: 'Meridian College',
  setBranding: () => {},
  setTenantName: () => {},
  selectCollegeTenant: () => {},
});

export function TenantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const initial = resolveTenantFromPath(pathname);

  const [tenantName, setTenantName] = useState<string>(initial.name);
  const [branding, setBranding] = useState<TenantBranding>(initial.branding);

  // Sync state whenever pathname changes (SSR and Client)
  useEffect(() => {
    const current = resolveTenantFromPath(pathname);
    setTenantName(current.name);
    setBranding(current.branding);
  }, [pathname]);

  useEffect(() => {
    if (branding.primary_color) {
      document.documentElement.style.setProperty('--primary', hexToHsl(branding.primary_color));
    }
    if (branding.secondary_color) {
      document.documentElement.style.setProperty('--secondary', hexToHsl(branding.secondary_color));
    }
    if (branding.accent_color) {
      document.documentElement.style.setProperty('--accent', hexToHsl(branding.accent_color));
    }
  }, [branding]);

  const selectCollegeTenant = (name: string, primaryColor?: string, secondaryColor?: string) => {
    setTenantName(name);
    const abbr = name.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
    setBranding(prev => ({
      ...prev,
      primary_color: primaryColor || '#2563EB',
      secondary_color: secondaryColor || '#0F766E',
      college_abbreviation: abbr,
      welcome_message: `Welcome to ${name} LMS Portal`,
    }));
  };

  return (
    <TenantContext.Provider value={{ branding, tenantName, setBranding, setTenantName, selectCollegeTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
