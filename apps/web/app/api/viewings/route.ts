import { NextResponse } from 'next/server';
import { BookViewingSchema } from '@estateflow/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parseResult = BookViewingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid viewing request payload',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const viewingData = parseResult.data;
    const viewingRecord = {
      id: `viewing-${Date.now()}`,
      ...viewingData,
      status: 'CONFIRMED',
      confirmationCode: `EF-VIEW-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Property viewing slot confirmed successfully.',
        data: viewingRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error booking viewing' },
      { status: 500 }
    );
  }
}
