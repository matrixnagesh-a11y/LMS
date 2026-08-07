'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TenantBranding } from '@/lib/types/database';
import { DEFAULT_BRANDING, hexToHsl } from '@/lib/tenant';

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
  const [branding, setBranding] = useState<TenantBranding>(DEFAULT_FULL_BRANDING);
  const [tenantName, setTenantName] = useState<string>('Meridian College');

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
    setBranding({
      ...branding,
      primary_color: primaryColor || '#2563EB',
      secondary_color: secondaryColor || '#0F766E',
      college_abbreviation: abbr,
      welcome_message: `Welcome to ${name} LMS Portal`,
    });
  };

  return (
    <TenantContext.Provider value={{ branding, tenantName, setBranding, setTenantName, selectCollegeTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
