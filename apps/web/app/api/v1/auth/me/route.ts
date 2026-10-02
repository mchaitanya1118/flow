import { NextResponse } from 'next/server';
import { verifyToken } from '@estateflow/auth';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'estateflow-super-secret-jwt-key-2026';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('estateflow_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = verifyToken(token, JWT_SECRET);
    if (!payload) {
      return NextResponse.json({ authenticated: false, error: 'Invalid or expired token' }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        fullName: payload.email.split('@')[0].toUpperCase(),
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
