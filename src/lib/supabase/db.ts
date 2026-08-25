import { createClient } from './client';
import { Tenant, TenantBranding } from '../types/database';
import { INITIAL_COLLEGES, CollegeTenant } from '../tenant-store';

export async function fetchTenantsFromDb(): Promise<Tenant[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tenants')
      .select('*, branding:tenant_branding(*)');

    if (error || !data || data.length === 0) {
      // Fallback to initial colleges
      return Object.values(INITIAL_COLLEGES).map((col: CollegeTenant, idx: number) => ({
        id: `00000000-0000-0000-0000-00000000000${idx + 1}`,
        legal_name: col.name,
        display_name: col.name,
        code: col.code,
        subdomain: col.slug,
        custom_domain: col.customDomain,
        custom_domain_status: 'active',
        status: 'active',
        created_at: new Date().toISOString(),
        branding: {
          id: `b0000000-0000-0000-0000-00000000000${idx + 1}`,
          tenant_id: `00000000-0000-0000-0000-00000000000${idx + 1}`,
          primary_color: col.primaryColor,
          secondary_color: col.secondaryColor,
          accent_color: '#F59E0B',
          welcome_message: col.welcomeMessage,
          introduction: col.introduction,
          privacy_policy: col.privacyPolicy,
          terms_of_use: col.termsOfUse,
          support_email: col.supportEmail,
          logo_url: col.logoUrl,
          login_bg_url: col.bgUrl,
        },
      }));
    }

    return data as Tenant[];
  } catch {
    return [];
  }
}

export async function createTenantInDb(name: string): Promise<{ success: boolean; tenant?: Tenant; slug: string }> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const code = slug.substring(0, 4).toUpperCase() + Math.floor(10 + Math.random() * 89);

  try {
    const supabase = createClient();
    const { data: tenantData, error: tenantErr } = await supabase
      .from('tenants')
      .insert({
        legal_name: name,
        display_name: name,
        code: code,
        subdomain: slug,
        custom_domain: `${slug}.edu.my`,
        status: 'active',
      })
      .select()
      .single();

    if (!tenantErr && tenantData) {
      await supabase.from('tenant_branding').insert({
        tenant_id: tenantData.id,
        primary_color: '#2563EB',
        secondary_color: '#0F766E',
        accent_color: '#F59E0B',
        welcome_message: `Welcome to ${name} LMS Portal`,
        introduction: 'Providing high quality higher education, professional diplomas, and academic excellence.',
      });

      return { success: true, tenant: tenantData as Tenant, slug };
    }
  } catch {
    // Graceful fallback handled in UI
  }

  return { success: false, slug };
}

export async function fetchTenantBrandingBySlug(slug: string): Promise<TenantBranding | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tenants')
      .select('*, branding:tenant_branding(*)')
      .eq('subdomain', slug)
      .single();

    if (!error && data && data.branding && data.branding[0]) {
      return data.branding[0] as TenantBranding;
    }
  } catch {
    // Ignore error and return null
  }
  return null;
}

export async function updateTenantBrandingInDb(tenantId: string, brandingData: Partial<TenantBranding>): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('tenant_branding')
      .upsert({
        tenant_id: tenantId,
        ...brandingData,
        updated_at: new Date().toISOString(),
      });

    return !error;
  } catch {
    return false;
  }
}
