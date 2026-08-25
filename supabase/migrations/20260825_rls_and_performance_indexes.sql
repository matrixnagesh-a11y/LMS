-- Supplemental Migration: Performance Indexes & Production RLS Write Policies
-- Date: 2026-08-25

-- 1. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_code ON public.tenants(code);
CREATE INDEX IF NOT EXISTS idx_tenant_memberships_tenant_user ON public.tenant_memberships(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_courses_tenant_status ON public.courses(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_enrolments_tenant_user_course ON public.enrolments(tenant_id, user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_assessments_tenant_course ON public.assessments(tenant_id, course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(verification_code);
CREATE INDEX IF NOT EXISTS idx_attendance_records_session_learner ON public.attendance_records(session_id, learner_id);

-- 2. Enhanced RLS Write Policies

-- Profiles Policies
CREATE POLICY IF NOT EXISTS profiles_select ON public.profiles FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS profiles_update ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Tenant Insert/Update (Superadmin or College Owner)
CREATE POLICY IF NOT EXISTS tenant_insert_policy ON public.tenants FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS tenant_update_policy ON public.tenants FOR UPDATE USING (public.is_member_of(id));

-- Tenant Branding Insert/Update
CREATE POLICY IF NOT EXISTS tenant_branding_insert_policy ON public.tenant_branding FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS tenant_branding_update_policy ON public.tenant_branding FOR UPDATE USING (public.is_member_of(tenant_id));

-- Courses Write Policy
CREATE POLICY IF NOT EXISTS courses_insert_policy ON public.courses FOR INSERT WITH CHECK (public.is_member_of(tenant_id));
CREATE POLICY IF NOT EXISTS courses_update_policy ON public.courses FOR UPDATE USING (public.is_member_of(tenant_id));

-- Enrolments Write Policy
CREATE POLICY IF NOT EXISTS enrolments_insert_policy ON public.enrolments FOR INSERT WITH CHECK (public.is_member_of(tenant_id));

-- Attendance Record Write Policy
CREATE POLICY IF NOT EXISTS attendance_insert_policy ON public.attendance_records FOR INSERT WITH CHECK (public.is_member_of(tenant_id));
CREATE POLICY IF NOT EXISTS attendance_update_policy ON public.attendance_records FOR UPDATE USING (public.is_member_of(tenant_id));

-- Certificates Write Policy
CREATE POLICY IF NOT EXISTS certificates_select_public ON public.certificates FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS certificates_insert_policy ON public.certificates FOR INSERT WITH CHECK (public.is_member_of(tenant_id));
