export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';
export type TenantStatus = 'active' | 'suspended' | 'trial' | 'cancelled';
export type CustomDomainStatus = 'requested' | 'awaiting_dns' | 'verifying' | 'ssl_provisioning' | 'active' | 'failed' | 'suspended';

export interface TenantBranding {
  id: string;
  tenant_id: string;
  logo_url?: string;
  secondary_logo_url?: string;
  login_bg_url?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  welcome_message: string;
  introduction?: string;
  privacy_policy?: string;
  terms_of_use?: string;
  college_abbreviation?: string;
  support_email?: string;
  support_phone?: string;
  website_url?: string;
}

export interface Tenant {
  id: string;
  legal_name: string;
  display_name: string;
  code: string;
  subdomain: string;
  custom_domain?: string;
  custom_domain_status: CustomDomainStatus;
  status: TenantStatus;
  created_at: string;
  branding?: TenantBranding;
}
