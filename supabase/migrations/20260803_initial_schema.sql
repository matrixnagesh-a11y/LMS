-- Supabase Schema Migration for CollegeLMS Cloud
-- Date: 2026-08-03
-- Multi-Tenant SaaS LMS with strict Row Level Security (RLS)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE subscription_tier AS ENUM ('starter', 'professional', 'enterprise');
CREATE TYPE tenant_status_type AS ENUM ('active', 'suspended', 'trial', 'cancelled');
CREATE TYPE custom_domain_status AS ENUM ('requested', 'awaiting_dns', 'verifying', 'ssl_provisioning', 'active', 'failed', 'suspended');
CREATE TYPE course_status_type AS ENUM ('draft', 'review', 'approved', 'scheduled', 'published', 'unpublished', 'archived');
CREATE TYPE delivery_mode_type AS ENUM ('online', 'classroom', 'blended', 'self_paced');
CREATE TYPE schedule_type_enum AS ENUM ('classroom', 'online_live', 'laboratory', 'practical', 'tutorial', 'assessment', 'examination', 'workshop', 'field');
CREATE TYPE attendance_status_enum AS ENUM ('present', 'absent', 'late', 'excused', 'medical', 'pending');
CREATE TYPE question_type_enum AS ENUM ('single_choice', 'multiple_choice', 'true_false', 'fill_blank', 'short_answer', 'essay', 'matching', 'ordering', 'numeric', 'file_upload');
CREATE TYPE assessment_type_enum AS ENUM ('quiz', 'assignment', 'examination', 'practical', 'oral', 'observation', 'project', 'portfolio', 'survey');
CREATE TYPE intervention_status_enum AS ENUM ('pending', 'in_progress', 'resolved', 'escalated');

----------------------------------------------------
-- PLATFORM TABLES
----------------------------------------------------

CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  tier subscription_tier NOT NULL DEFAULT 'starter',
  max_learners INT NOT NULL DEFAULT 100,
  max_administrators INT NOT NULL DEFAULT 5,
  max_instructors INT NOT NULL DEFAULT 10,
  storage_allowance_gb INT NOT NULL DEFAULT 50,
  custom_domain_allowed BOOLEAN NOT NULL DEFAULT false,
  branding_allowed BOOLEAN NOT NULL DEFAULT false,
  api_access_allowed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  legal_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  subdomain VARCHAR(63) NOT NULL UNIQUE,
  custom_domain VARCHAR(255) UNIQUE,
  custom_domain_status custom_domain_status DEFAULT 'requested',
  country VARCHAR(100) DEFAULT 'Malaysia',
  timezone VARCHAR(100) DEFAULT 'Asia/Kuala_Lumpur',
  default_language VARCHAR(10) DEFAULT 'en',
  primary_contact_name VARCHAR(150),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(50),
  status tenant_status_type NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.tenant_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.tenant_branding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL UNIQUE REFERENCES public.tenants(id) ON DELETE CASCADE,
  logo_url TEXT,
  secondary_logo_url TEXT,
  favicon_url TEXT,
  login_bg_url TEXT,
  primary_color VARCHAR(7) NOT NULL DEFAULT '#2563EB',
  secondary_color VARCHAR(7) NOT NULL DEFAULT '#0F766E',
  accent_color VARCHAR(7) NOT NULL DEFAULT '#F59E0B',
  welcome_message TEXT DEFAULT 'Welcome to CollegeLMS Cloud',
  college_abbreviation VARCHAR(20),
  support_email VARCHAR(255),
  support_phone VARCHAR(50),
  website_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.platform_announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.support_access_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_user_id UUID NOT NULL,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- IDENTITY AND ACCESS TABLES
----------------------------------------------------

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(50),
  is_platform_super_admin BOOLEAN NOT NULL DEFAULT false,
  is_platform_support_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.tenant_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, user_id)
);

CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

INSERT INTO public.roles (name, description) VALUES
  ('college_owner', 'Highest authority within a college tenant'),
  ('college_administrator', 'Manages users, college settings, courses, cohorts and reports'),
  ('academic_administrator', 'Manages programmes, courses, modules and academic calendars'),
  ('department_head', 'Manages department courses, instructors and learners'),
  ('instructor', 'Creates and delivers assigned course content and assessments'),
  ('assessor', 'Evaluates assigned assessments and submissions'),
  ('internal_verifier', 'Reviews assessment decisions'),
  ('compliance_auditor', 'Read-only access to academic and compliance reports'),
  ('learner', 'Accesses enrolled courses, assessments and progress');

CREATE TABLE public.membership_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  membership_id UUID NOT NULL REFERENCES public.tenant_memberships(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(membership_id, role_id)
);

CREATE TABLE public.user_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  invited_by UUID NOT NULL REFERENCES public.profiles(id),
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- ACADEMIC STRUCTURE TABLES
----------------------------------------------------

CREATE TABLE public.campuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  campus_id UUID REFERENCES public.campuses(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  head_user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.programmes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  duration_months INT DEFAULT 12,
  credit_hours INT DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.intakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  programme_id UUID REFERENCES public.programmes(id) ON DELETE CASCADE,
  intake_id UUID REFERENCES public.intakes(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  code VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  programme_id UUID REFERENCES public.programmes(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  short_description TEXT,
  full_description TEXT,
  delivery_mode delivery_mode_type NOT NULL DEFAULT 'blended',
  status course_status_type NOT NULL DEFAULT 'draft',
  credit_hours INT DEFAULT 3,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  sequence_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content_html TEXT,
  video_url TEXT,
  document_url TEXT,
  sequence_order INT NOT NULL DEFAULT 1,
  is_mandatory BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.enrolments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  UNIQUE(tenant_id, user_id, course_id)
);

----------------------------------------------------
-- SCHEDULING AND ATTENDANCE TABLES
----------------------------------------------------

CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  building VARCHAR(100),
  capacity INT DEFAULT 50,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.schedule_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  event_type schedule_type_enum NOT NULL DEFAULT 'classroom',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.attendance_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  schedule_event_id UUID NOT NULL REFERENCES public.schedule_events(id) ON DELETE CASCADE,
  qr_code_token VARCHAR(255) UNIQUE,
  qr_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status attendance_status_enum NOT NULL DEFAULT 'pending',
  marked_by UUID REFERENCES public.profiles(id),
  marked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  UNIQUE(session_id, learner_id)
);

----------------------------------------------------
-- ASSESSMENT AND QUESTION BANK TABLES
----------------------------------------------------

CREATE TABLE public.question_banks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  question_bank_id UUID REFERENCES public.question_banks(id) ON DELETE CASCADE,
  question_type question_type_enum NOT NULL DEFAULT 'single_choice',
  prompt TEXT NOT NULL,
  explanation TEXT,
  marks DECIMAL(5,2) NOT NULL DEFAULT 1.0,
  difficulty VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  sequence_order INT DEFAULT 1
);

CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  assessment_type assessment_type_enum NOT NULL DEFAULT 'quiz',
  total_marks DECIMAL(5,2) NOT NULL DEFAULT 100.0,
  passing_score DECIMAL(5,2) NOT NULL DEFAULT 50.0,
  time_limit_minutes INT,
  max_attempts INT DEFAULT 1,
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  is_passed BOOLEAN,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  max_file_size_mb INT DEFAULT 10,
  allowed_file_types VARCHAR(255) DEFAULT 'pdf,docx,zip',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_url TEXT,
  text_content TEXT,
  grade DECIMAL(5,2),
  feedback TEXT,
  graded_by UUID REFERENCES public.profiles(id),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- TRACKING AND GOVERNANCE TABLES
----------------------------------------------------

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(lesson_id, learner_id)
);

CREATE TABLE public.learner_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status intervention_status_enum NOT NULL DEFAULT 'pending',
  notes TEXT,
  assigned_to UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  certificate_number VARCHAR(100) NOT NULL UNIQUE,
  learner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_code VARCHAR(100) NOT NULL UNIQUE,
  is_revoked BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- ROW LEVEL SECURITY POLICIES (RLS)
----------------------------------------------------

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrolments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper RLS Check Function
CREATE OR REPLACE FUNCTION public.is_member_of(t_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.tenant_memberships
    WHERE tenant_id = t_id
      AND user_id = auth.uid()
      AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Universal Tenant Select Policy for Tenant-Owned Tables
CREATE POLICY tenant_isolation_select_tenants ON public.tenants FOR SELECT USING (true);
CREATE POLICY tenant_isolation_select_branding ON public.tenant_branding FOR SELECT USING (true);

CREATE POLICY tenant_isolation_courses ON public.courses FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_enrolments ON public.enrolments FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_schedule ON public.schedule_events FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_attendance ON public.attendance_records FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_assessments ON public.assessments FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_submissions ON public.submissions FOR SELECT USING (public.is_member_of(tenant_id));
CREATE POLICY tenant_isolation_certificates ON public.certificates FOR SELECT USING (public.is_member_of(tenant_id));
