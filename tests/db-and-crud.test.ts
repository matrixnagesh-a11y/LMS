import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readDb,
  fetchTenantsFromDb,
  fetchTenantBySlug,
  createTenantInDb,
  getCoursesByTenant,
  createCourse,
  updateCourse,
  deleteCourse,
  getUsersByTenant,
  createUser,
  deleteUser,
} from '../src/lib/db/index';

test('Database Initialization & Schema Verification', async () => {
  const db = readDb();
  assert.ok(db.tenants, 'Database must have tenants collection');
  assert.ok(db.courses, 'Database must have courses collection');
  assert.ok(db.users, 'Database must have users collection');
  assert.ok(db.tenants['meridian'], 'Meridian tenant must exist');
  assert.ok(db.tenants['horizon'], 'Horizon tenant must exist');
});

test('Real CRUD - Tenant Creation & Retrieval', async () => {
  const testName = 'Apex Technology Institute';
  const result = await createTenantInDb(testName);
  assert.equal(result.success, true);
  assert.ok(result.slug);

  const fetched = await fetchTenantBySlug(result.slug);
  assert.ok(fetched, 'Created tenant must be readable');
  assert.equal(fetched.display_name, testName);
  assert.equal(fetched.custom_domain_status, 'active');
});

test('Real CRUD - Course Lifecycle (Create, Read, Update, Delete)', async () => {
  const slug = 'meridian';

  // 1. CREATE
  const newCourse = await createCourse(slug, {
    code: 'TEST999',
    title: 'Cloud Verification Engineering',
    mode: 'Online',
    status: 'Published',
    credits: 4,
    modulesCount: 6,
    lessonsCount: 20,
    enrolled: 15,
  });
  assert.ok(newCourse.id, 'Created course must have an ID');
  assert.equal(newCourse.code, 'TEST999');

  // 2. READ
  const coursesAfterCreate = await getCoursesByTenant(slug);
  const found = coursesAfterCreate.find(c => c.id === newCourse.id);
  assert.ok(found, 'Course must be present in tenant course list');
  assert.equal(found.title, 'Cloud Verification Engineering');

  // 3. UPDATE
  const updated = await updateCourse(slug, newCourse.id, {
    title: 'Cloud Verification Engineering (Updated)',
    enrolled: 42,
  });
  assert.ok(updated);
  assert.equal(updated.title, 'Cloud Verification Engineering (Updated)');
  assert.equal(updated.enrolled, 42);

  // 4. DELETE
  const deleted = await deleteCourse(slug, newCourse.id);
  assert.equal(deleted, true);

  const coursesAfterDelete = await getCoursesByTenant(slug);
  assert.equal(coursesAfterDelete.some(c => c.id === newCourse.id), false, 'Deleted course must not exist');
});

test('Real CRUD - User Management (Create, Read, Delete)', async () => {
  const slug = 'horizon';

  // 1. CREATE
  const newUser = await createUser(slug, {
    name: 'Audit Inspector',
    email: 'inspector@horizon.edu.my',
    role: 'Instructor',
    department: 'Cloud Quality Assurance',
    status: 'Active',
  });
  assert.ok(newUser.id);
  assert.equal(newUser.email, 'inspector@horizon.edu.my');

  // 2. READ
  const users = await getUsersByTenant(slug);
  assert.ok(users.some(u => u.id === newUser.id));

  // 3. DELETE
  const deleted = await deleteUser(slug, newUser.id);
  assert.equal(deleted, true);

  const usersAfterDelete = await getUsersByTenant(slug);
  assert.equal(usersAfterDelete.some(u => u.id === newUser.id), false);
});

test('Multi-Tenant Data Isolation Gate', async () => {
  const meridianCourses = await getCoursesByTenant('meridian');
  const horizonCourses = await getCoursesByTenant('horizon');

  // Verify that course IDs in Meridian do not overlap with Horizon
  const meridianIds = new Set(meridianCourses.map(c => c.id));
  for (const hCourse of horizonCourses) {
    assert.equal(meridianIds.has(hCourse.id), false, 'Tenant data must be isolated');
  }
});
