import { NextRequest, NextResponse } from 'next/server';
import { fetchTenantsFromDb, createTenantInDb } from '@/lib/db';

export async function GET() {
  const tenants = await fetchTenantsFromDb();
  return NextResponse.json({ success: true, data: tenants });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'College name is required' }, { status: 400 });
    }
    const result = await createTenantInDb(body.name);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
