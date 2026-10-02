import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, message, propertyId, recipientType = 'AGENT' } = body;

    if (!phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Phone number and message content are required.' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.length === 10 ? `+91${cleanPhone}` : `+${cleanPhone}`;

    // Simulate WhatsApp Cloud API dispatch payload
    const mockMessageId = `wamid.HBgL${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      provider: 'Meta WhatsApp Business API',
      status: 'DELIVERED',
      messageId: mockMessageId,
      payload: {
        to: formattedPhone,
        type: 'text',
        text: { body: message },
        timestamp: new Date().toISOString(),
        propertyRef: propertyId || 'GENERAL_INQUIRY',
        recipientType,
      },
      message: `WhatsApp notification successfully queued for ${formattedPhone}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
