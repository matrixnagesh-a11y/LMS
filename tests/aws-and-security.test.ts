import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

test('Zero Vercel & Zero Supabase Artifacts Audit', () => {
  assert.equal(fs.existsSync(path.join(process.cwd(), '.vercel')), false, '.vercel folder must not exist');
  assert.equal(fs.existsSync(path.join(process.cwd(), 'vercel.json')), false, 'vercel.json must not exist');
  assert.equal(fs.existsSync(path.join(process.cwd(), 'src/lib/supabase')), false, 'src/lib/supabase must not exist');
  assert.equal(fs.existsSync(path.join(process.cwd(), 'supabase')), false, 'supabase folder must not exist');
});

test('AWS Amplify Configuration Gate', () => {
  const amplifyPath = path.join(process.cwd(), 'amplify.yml');
  assert.equal(fs.existsSync(amplifyPath), true, 'amplify.yml must exist');
  const content = fs.readFileSync(amplifyPath, 'utf8');
  assert.ok(content.includes('npm run build'), 'amplify.yml must define build command');
  assert.ok(content.includes('.next'), 'amplify.yml must target .next directory');
});

test('Environment Configuration Audit', () => {
  const envExamplePath = path.join(process.cwd(), '.env.example');
  assert.equal(fs.existsSync(envExamplePath), true, '.env.example must exist');
  const content = fs.readFileSync(envExamplePath, 'utf8');
  assert.ok(content.includes('AWS_REGION'), '.env.example must define AWS_REGION');
  assert.ok(content.includes('AWS_S3_BUCKET_NAME'), '.env.example must define AWS_S3_BUCKET_NAME');
  assert.equal(content.includes('SUPABASE'), false, '.env.example must not contain Supabase variables');
});
