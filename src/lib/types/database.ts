export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';
export type TenantStatus = 'active' | 'suspended' | 'trial' | 'cancelled';
export type CustomDomainStatus = 'requested' | 'awaiting_dns' | 'verifying' | 'ssl_provisioning' | 'active' | 'failed' | 'suspended';
export type CourseStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'unpublished' | 'archived';
export type DeliveryMode = 'online' | 'classroom' | 'blended' | 'self_paced';
export type ScheduleType = 'classroom' | 'online_live' | 'laboratory' | 'practical' | 'tutorial' | 'assessment' | 'examination' | 'workshop' | 'field';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'medical' | 'pending';
export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer' | 'essay' | 'matching' | 'ordering' | 'numeric' | 'file_upload';
export type AssessmentType = 'quiz' | 'assignment' | 'examination' | 'practical' | 'oral' | 'observation' | 'project' | 'portfolio' | 'survey';
export type InterventionStatus = 'pending' | 'in_progress' | 'resolved' | 'escalated';

export interface TenantBranding {
  id: string;
  tenant_id: string;
  logo_url?: string;
  secondary_logo_url?: string;
  favicon_url?: string;
  login_bg_url?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  welcome_message: string;
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
  country: string;
  timezone: string;
  default_language: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  primary_contact_phone?: string;
  status: TenantStatus;
  created_at: string;
  branding?: TenantBranding;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  is_platform_super_admin: boolean;
  is_platform_support_admin: boolean;
  created_at: string;
}

export interface Course {
  id: string;
  tenant_id: string;
  title: string;
  code: string;
  short_description?: string;
  full_description?: string;
  delivery_mode: DeliveryMode;
  status: CourseStatus;
  credit_hours: number;
  image_url?: string;
  created_at: string;
}

export interface Enrolment {
  id: string;
  tenant_id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  status: string;
  course?: Course;
}

export interface ScheduleEvent {
  id: string;
  tenant_id: string;
  course_id?: string;
  title: string;
  event_type: ScheduleType;
  starts_at: string;
  ends_at: string;
  meeting_url?: string;
  course?: Course;
}

export interface Assessment {
  id: string;
  tenant_id: string;
  course_id: string;
  title: string;
  assessment_type: AssessmentType;
  total_marks: number;
  passing_score: number;
  time_limit_minutes?: number;
  max_attempts: number;
  opens_at?: string;
  closes_at?: string;
}

export interface Certificate {
  id: string;
  tenant_id: string;
  certificate_number: string;
  learner_id: string;
  course_id: string;
  issued_at: string;
  verification_code: string;
  is_revoked: boolean;
  learner?: Profile;
  course?: Course;
}
