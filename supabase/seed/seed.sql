-- Seed Data for CollegeLMS Cloud
-- Two Demo Colleges: Meridian College and Horizon Training Institute

-- 1. Subscription Plans
INSERT INTO public.subscription_plans (id, name, tier, max_learners, max_administrators, max_instructors, storage_allowance_gb, custom_domain_allowed, branding_allowed, api_access_allowed)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Starter Plan', 'starter', 100, 3, 10, 20, false, false, false),
  ('22222222-2222-2222-2222-222222222222', 'Professional Plan', 'professional', 1000, 10, 50, 100, true, true, true),
  ('33333333-3333-3333-3333-333333333333', 'Enterprise Plan', 'enterprise', 10000, 50, 250, 1000, true, true, true)
ON CONFLICT (name) DO NOTHING;

-- 2. Tenants
INSERT INTO public.tenants (id, legal_name, display_name, code, subdomain, custom_domain, status)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Meridian College Sdn Bhd', 'Meridian College', 'MC01', 'meridian', 'learning.meridian.edu.my', 'active'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Horizon Training Institute', 'Horizon Institute', 'HTI01', 'horizon', 'lms.horizon.edu.my', 'active')
ON CONFLICT (code) DO NOTHING;

-- 3. Tenant Branding
INSERT INTO public.tenant_branding (id, tenant_id, primary_color, secondary_color, accent_color, welcome_message, college_abbreviation, support_email)
VALUES
  ('a1b2c3d4-0001-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '#2563EB', '#0F766E', '#F59E0B', 'Welcome to Meridian College LMS Portal', 'MC', 'support@meridian.edu.my'),
  ('a1b2c3d4-0002-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '#7C3AED', '#059669', '#E11D48', 'Welcome to Horizon Training Institute Cloud', 'HTI', 'support@horizon.edu.my')
ON CONFLICT (tenant_id) DO NOTHING;

-- 4. Subscriptions
INSERT INTO public.tenant_subscriptions (tenant_id, plan_id, auto_renew, is_active)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', true, true),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '33333333-3333-3333-3333-333333333333', true, true);

-- 5. Profiles
INSERT INTO public.profiles (id, email, full_name, is_platform_super_admin)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'superadmin@collegelms.com', 'System Super Admin', true),
  ('00000000-0000-0000-0000-000000000002', 'admin@meridian.edu.my', 'Dr. Aris Meridian', false),
  ('00000000-0000-0000-0000-000000000003', 'dr.tan@meridian.edu.my', 'Dr. Tan Keng Beng', false),
  ('00000000-0000-0000-0000-000000000004', 'sarah@meridian.edu.my', 'Sarah Lee', false),
  ('00000000-0000-0000-0000-000000000005', 'ahmad@meridian.edu.my', 'Ahmad Razak', false),
  ('00000000-0000-0000-0000-000000000006', 'admin@horizon.edu.my', 'Elena Rostova', false),
  ('00000000-0000-0000-0000-000000000007', 'prof.lee@horizon.edu.my', 'Prof. David Lee', false),
  ('00000000-0000-0000-0000-000000000008', 'devan@horizon.edu.my', 'Devan Nair', false)
ON CONFLICT (id) DO NOTHING;

-- 6. Tenant Memberships
INSERT INTO public.tenant_memberships (id, tenant_id, user_id)
VALUES
  ('m0000001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000002'),
  ('m0000001-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000003'),
  ('m0000001-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000004'),
  ('m0000001-0000-0000-0000-000000000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000005'),
  ('m0000002-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000006'),
  ('m0000002-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000007'),
  ('m0000002-0000-0000-0000-000000000003', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000008')
ON CONFLICT DO NOTHING;

-- 7. Courses for Meridian College
INSERT INTO public.courses (id, tenant_id, title, code, short_description, full_description, status, credit_hours)
VALUES
  ('c0000001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Introduction to Software Architecture', 'CS101', 'Master modern web system design and multi-tenant architectures.', 'Comprehensive course covering RESTful APIs, Next.js App Router, PostgreSQL database optimization, and cloud security.', 'published', 4),
  ('c0000001-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Cybersecurity Fundamentals & OWASP ASVS', 'SEC201', 'Principles of application security, multi-tenancy RLS, and encryption.', 'Explore identity threat detection, rate limiting, bot protection, and standard compliance frameworks.', 'published', 3);

-- 8. Courses for Horizon Institute
INSERT INTO public.courses (id, tenant_id, title, code, short_description, full_description, status, credit_hours)
VALUES
  ('c0000002-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Enterprise Business Analytics & BI', 'BUS301', 'Data-driven decision making using analytical dashboards.', 'Learn advanced analytics, cohort comparison, financial forecasting, and visual metrics.', 'published', 3);

-- 9. Enrolments for Sarah at Meridian
INSERT INTO public.enrolments (tenant_id, user_id, course_id, status)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000001', 'active'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000002', 'active');

-- 10. Enrolments for Devan at Horizon
INSERT INTO public.enrolments (tenant_id, user_id, course_id, status)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000008', 'c0000002-0000-0000-0000-000000000001', 'active');
