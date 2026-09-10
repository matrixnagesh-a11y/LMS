import { NextRequest, NextResponse } from 'next/server';
import { getUsersByTenant, createUser, deleteUser } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  const { tenantSlug } = params;
  const users = await getUsersByTenant(tenantSlug);
  return NextResponse.json({ success: true, data: users });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  try {
    const { tenantSlug } = params;
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const user = await createUser(tenantSlug, {
      name: body.name,
      email: body.email,
      role: body.role || 'Student',
      department: body.department || 'General Academic',
      status: body.status || 'Active',
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  try {
    const { tenantSlug } = params;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    const deleted = await deleteUser(tenantSlug, id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
