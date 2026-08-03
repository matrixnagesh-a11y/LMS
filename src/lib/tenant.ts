import { Tenant, TenantBranding } from './types/database';

export const DEFAULT_BRANDING: TenantBranding = {
  id: 'default',
  tenant_id: 'default',
  primary_color: '#2563EB',
  secondary_color: '#0F766E',
  accent_color: '#F59E0B',
  welcome_message: 'Welcome to CollegeLMS Cloud',
  college_abbreviation: 'LMS',
};

// Calculate luminance to ensure high-contrast accessible text overlay
export function getReadableTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0F172A' : '#FFFFFF';
}

// Convert Hex to HSL for CSS variable injection
export function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '221.2 83.2% 53.3%';
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Resolve tenant from hostname or fallback demo tenant
export function extractSubdomain(hostname: string): string | null {
  const host = hostname.split(':')[0];
  const platformDomain = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || 'collegelms.com';
  
  if (host === 'localhost' || host === '127.0.0.1' || host === platformDomain || host === `app.${platformDomain}`) {
    return null;
  }
  
  if (host.endsWith(`.${platformDomain}`)) {
    return host.replace(`.${platformDomain}`, '');
  }
  
  return null;
}
