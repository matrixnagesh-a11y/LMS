import fs from 'fs';
import path from 'path';
import { Tenant, TenantBranding } from '../types/database';
import { INITIAL_COLLEGES, CollegeTenant } from '../tenant-store';

export interface Course {
  id: string;
  tenantSlug: string;
  code: string;
  title: string;
  mode: 'Online' | 'Classroom' | 'Blended' | 'Self-Paced';
  status: 'Published' | 'Draft' | 'Archived';
  credits: number;
  modulesCount: number;
  lessonsCount: number;
  enrolled: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord {
  id: string;
  tenantSlug: string;
  name: string;
  email: string;
  role: 'Student' | 'Instructor' | 'Administrator' | 'Superadmin';
  department: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
}

export interface DatabaseSchema {
  tenants: Record<string, Tenant>;
  courses: Record<string, Course[]>;
  users: Record<string, UserRecord[]>;
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'matrix_lms_db.json');

function ensureDbDirectory(): void {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getInitialData(): DatabaseSchema {
  const tenants: Record<string, Tenant> = {};
  const courses: Record<string, Course[]> = {};
  const users: Record<string, UserRecord[]> = {};

  Object.values(INITIAL_COLLEGES).forEach((col: CollegeTenant, idx: number) => {
    const tenantId = `tenant-${col.slug}`;
    tenants[col.slug] = {
      id: tenantId,
      legal_name: col.name,
      display_name: col.name,
      code: col.code,
      subdomain: col.slug,
      custom_domain: col.customDomain,
      custom_domain_status: 'active',
      status: 'active',
      created_at: new Date('2026-08-01').toISOString(),
      branding: {
        id: `branding-${col.slug}`,
        tenant_id: tenantId,
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
        college_abbreviation: col.code,
      },
    };

    courses[col.slug] = [
      {
        id: `course-${col.slug}-1`,
        tenantSlug: col.slug,
        code: 'CS101',
        title: 'Introduction to Software Architecture',
        mode: 'Blended',
        status: 'Published',
        credits: 4,
        modulesCount: 5,
        lessonsCount: 18,
        enrolled: 128,
        createdAt: new Date('2026-08-01').toISOString(),
        updatedAt: new Date('2026-08-10').toISOString(),
      },
      {
        id: `course-${col.slug}-2`,
        tenantSlug: col.slug,
        code: 'SEC201',
        title: 'Cybersecurity Fundamentals & OWASP ASVS',
        mode: 'Online',
        status: 'Published',
        credits: 3,
        modulesCount: 4,
        lessonsCount: 14,
        enrolled: 94,
        createdAt: new Date('2026-08-05').toISOString(),
        updatedAt: new Date('2026-08-12').toISOString(),
      },
      {
        id: `course-${col.slug}-3`,
        tenantSlug: col.slug,
        code: 'BUS301',
        title: 'Enterprise Business Analytics & BI',
        mode: 'Self-Paced',
        status: 'Draft',
        credits: 3,
        modulesCount: 6,
        lessonsCount: 22,
        enrolled: 0,
        createdAt: new Date('2026-08-08').toISOString(),
        updatedAt: new Date('2026-08-15').toISOString(),
      },
    ];

    users[col.slug] = [
      {
        id: `user-${col.slug}-1`,
        tenantSlug: col.slug,
        name: 'Dr. John Doe',
        email: `john.doe@${col.slug}.edu.my`,
        role: 'Administrator',
        department: 'Computer Science',
        status: 'Active',
        createdAt: new Date('2026-08-01').toISOString(),
      },
      {
        id: `user-${col.slug}-2`,
        tenantSlug: col.slug,
        name: 'Jane Smith',
        email: `jane.smith@${col.slug}.edu.my`,
        role: 'Instructor',
        department: 'Information Security',
        status: 'Active',
        createdAt: new Date('2026-08-02').toISOString(),
      },
      {
        id: `user-${col.slug}-3`,
        tenantSlug: col.slug,
        name: 'Ahmad Faiz',
        email: `ahmad.faiz@student.${col.slug}.edu.my`,
        role: 'Student',
        department: 'Engineering',
        status: 'Active',
        createdAt: new Date('2026-08-10').toISOString(),
      },
    ];
  });

  return { tenants, courses, users };
}

export function readDb(): DatabaseSchema {
  ensureDbDirectory();
  if (!fs.existsSync(DB_FILE_PATH)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const content = fs.readFileSync(DB_FILE_PATH, 'utf8');
    return JSON.parse(content) as DatabaseSchema;
  } catch {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbDirectory();
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// -------------------------------------------------------------
// REAL CRUD FOR TENANTS
// -------------------------------------------------------------

export async function fetchTenantsFromDb(): Promise<Tenant[]> {
  const db = readDb();
  return Object.values(db.tenants);
}

export async function fetchTenantBySlug(slug: string): Promise<Tenant | null> {
  const db = readDb();
  return db.tenants[slug] || null;
}

export async function createTenantInDb(name: string): Promise<{ success: boolean; tenant?: Tenant; slug: string }> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const code = slug.substring(0, 4).toUpperCase() + Math.floor(10 + Math.random() * 89);
  const tenantId = `tenant-${slug}-${Date.now()}`;

  const newTenant: Tenant = {
    id: tenantId,
    legal_name: name,
    display_name: name,
    code,
    subdomain: slug,
    custom_domain: `${slug}.edu.my`,
    custom_domain_status: 'active',
    status: 'active',
    created_at: new Date().toISOString(),
    branding: {
      id: `branding-${tenantId}`,
      tenant_id: tenantId,
      primary_color: '#2563EB',
      secondary_color: '#0F766E',
      accent_color: '#F59E0B',
      welcome_message: `Welcome to ${name} LMS Portal`,
      introduction: 'Providing high quality higher education, professional diplomas, and academic excellence.',
      college_abbreviation: code,
      support_email: `support@${slug}.edu.my`,
    },
  };

  const db = readDb();
  db.tenants[slug] = newTenant;
  if (!db.courses[slug]) db.courses[slug] = [];
  if (!db.users[slug]) db.users[slug] = [];
  writeDb(db);

  return { success: true, tenant: newTenant, slug };
}

export async function fetchTenantBrandingBySlug(slug: string): Promise<TenantBranding | null> {
  const db = readDb();
  const tenant = db.tenants[slug];
  return tenant?.branding || null;
}

export async function updateTenantBrandingInDb(tenantId: string, brandingData: Partial<TenantBranding>): Promise<boolean> {
  const db = readDb();
  for (const slug of Object.keys(db.tenants)) {
    if (db.tenants[slug].id === tenantId && db.tenants[slug].branding) {
      db.tenants[slug].branding = {
        ...db.tenants[slug].branding!,
        ...brandingData,
      };
      writeDb(db);
      return true;
    }
  }
  return false;
}

// -------------------------------------------------------------
// REAL CRUD FOR COURSES (CREATE, READ, UPDATE, DELETE)
// -------------------------------------------------------------

export async function getCoursesByTenant(tenantSlug: string): Promise<Course[]> {
  const db = readDb();
  return db.courses[tenantSlug] || [];
}

export async function createCourse(tenantSlug: string, courseData: Omit<Course, 'id' | 'tenantSlug' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  const db = readDb();
  if (!db.courses[tenantSlug]) db.courses[tenantSlug] = [];
  
  const newCourse: Course = {
    ...courseData,
    id: `course-${tenantSlug}-${Date.now()}`,
    tenantSlug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.courses[tenantSlug].unshift(newCourse);
  writeDb(db);
  return newCourse;
}

export async function updateCourse(tenantSlug: string, courseId: string, updates: Partial<Course>): Promise<Course | null> {
  const db = readDb();
  const list = db.courses[tenantSlug] || [];
  const idx = list.findIndex(c => c.id === courseId);
  if (idx === -1) return null;

  list[idx] = {
    ...list[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.courses[tenantSlug] = list;
  writeDb(db);
  return list[idx];
}

export async function deleteCourse(tenantSlug: string, courseId: string): Promise<boolean> {
  const db = readDb();
  const list = db.courses[tenantSlug] || [];
  const initialLen = list.length;
  db.courses[tenantSlug] = list.filter(c => c.id !== courseId);
  if (db.courses[tenantSlug].length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// REAL CRUD FOR USERS (CREATE, READ, UPDATE, DELETE)
// -------------------------------------------------------------

export async function getUsersByTenant(tenantSlug: string): Promise<UserRecord[]> {
  const db = readDb();
  return db.users[tenantSlug] || [];
}

export async function createUser(tenantSlug: string, userData: Omit<UserRecord, 'id' | 'tenantSlug' | 'createdAt'>): Promise<UserRecord> {
  const db = readDb();
  if (!db.users[tenantSlug]) db.users[tenantSlug] = [];

  const newUser: UserRecord = {
    ...userData,
    id: `user-${tenantSlug}-${Date.now()}`,
    tenantSlug,
    createdAt: new Date().toISOString(),
  };

  db.users[tenantSlug].unshift(newUser);
  writeDb(db);
  return newUser;
}

export async function deleteUser(tenantSlug: string, userId: string): Promise<boolean> {
  const db = readDb();
  const list = db.users[tenantSlug] || [];
  const initialLen = list.length;
  db.users[tenantSlug] = list.filter(u => u.id !== userId);
  if (db.users[tenantSlug].length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}
