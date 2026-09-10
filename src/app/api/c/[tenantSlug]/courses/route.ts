import { NextRequest, NextResponse } from 'next/server';
import { getCoursesByTenant, createCourse, updateCourse, deleteCourse } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  const { tenantSlug } = params;
  const courses = await getCoursesByTenant(tenantSlug);
  return NextResponse.json({ success: true, data: courses });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  try {
    const { tenantSlug } = params;
    const body = await req.json();
    if (!body.title || !body.code) {
      return NextResponse.json({ success: false, error: 'Title and code are required' }, { status: 400 });
    }

    const course = await createCourse(tenantSlug, {
      code: body.code,
      title: body.title,
      mode: body.mode || 'Online',
      status: body.status || 'Published',
      credits: Number(body.credits) || 3,
      modulesCount: Number(body.modulesCount) || 1,
      lessonsCount: Number(body.lessonsCount) || 1,
      enrolled: Number(body.enrolled) || 0,
    });

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { tenantSlug: string } }
) {
  try {
    const { tenantSlug } = params;
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const updated = await updateCourse(tenantSlug, body.id, body.updates);
    return NextResponse.json({ success: !!updated, data: updated });
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
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const deleted = await deleteCourse(tenantSlug, id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
