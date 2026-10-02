import { NextResponse } from 'next/server';
import { LoginUserSchema } from '@estateflow/validation';
import { generateToken } from '@estateflow/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'estateflow-super-secret-jwt-key-2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = LoginUserSchema.parse(body);

    // Demo account credentials validation
    const user = {
      id: 'usr-demo-1',
      fullName: 'Demo Agent User',
      email: validated.email,
      role: 'AGENT' as const,
      isVerified: true,
    };

    const token = generateToken(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET
    );

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });

    response.cookies.set('estateflow_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 400 });
  }
}
