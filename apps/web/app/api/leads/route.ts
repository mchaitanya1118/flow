import { NextResponse } from 'next/server';
import { CreateLeadSchema } from '@estateflow/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parseResult = CreateLeadSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid lead payload',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;
    const leadRecord = {
      id: `lead-${Date.now()}`,
      ...leadData,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      score: 'HOT',
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Lead inquiry registered successfully. Agent will contact you shortly.',
        data: leadRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error creating lead' },
      { status: 500 }
    );
  }
}
