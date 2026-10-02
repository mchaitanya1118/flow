import { NextResponse } from 'next/server';
import { RegisterUserSchema } from '@estateflow/validation';
import { generateToken } from '@estateflow/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'estateflow-super-secret-jwt-key-2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = RegisterUserSchema.parse(body);

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: validated.fullName,
      email: validated.email,
      phone: validated.phone || null,
      role: validated.role,
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
    };

    const token = generateToken(
      { userId: newUser.id, email: newUser.email, role: newUser.role as any },
      JWT_SECRET
    );

    const response = NextResponse.json(
      {
        success: true,
        message: 'Account registered successfully',
        user: newUser,
        token,
      },
      { status: 201 }
    );

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
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
