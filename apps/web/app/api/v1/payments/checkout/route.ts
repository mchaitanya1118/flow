import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, purpose, planId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 });
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        entity: 'order',
        amount: amount * 100, // Razorpay works in paise
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        status: 'created',
        purpose: purpose || 'SUBSCRIPTION',
        planId: planId || 'PROFESSIONAL',
      },
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_EstateFlow12345',
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Payment order creation failed' }, { status: 500 });
  }
}
