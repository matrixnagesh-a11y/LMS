'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TenantBranding } from '@/lib/types/database';
import { DEFAULT_BRANDING, hexToHsl } from '@/lib/tenant';

interface TenantContextType {
  branding: TenantBranding;
  tenantName: string;
  setBranding: (branding: TenantBranding) => void;
}

const TenantContext = createContext<TenantContextType>({
  branding: DEFAULT_BRANDING,
  tenantName: 'CollegeLMS Cloud',
  setBranding: () => {},
});

export function TenantProvider({
  children,
  initialBranding = DEFAULT_BRANDING,
  initialTenantName = 'CollegeLMS Cloud',
}: {
  children: React.ReactNode;
  initialBranding?: TenantBranding;
  initialTenantName?: string;
}) {
  const [branding, setBranding] = useState<TenantBranding>(initialBranding);

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

  return (
    <TenantContext.Provider value={{ branding, tenantName: initialTenantName, setBranding }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
