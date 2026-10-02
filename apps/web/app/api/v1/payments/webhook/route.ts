import { NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_webhook_secret';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ success: false, error: 'Missing Razorpay signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!isValid && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, error: 'Invalid webhook signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    if (payload.event === 'payment.captured') {
      const payment = payload.payload.payment.entity;

      // Server-side database activation log
      console.log(`[Payment Captured] Order ${payment.order_id} verified. Amount: ₹${payment.amount / 100}`);
    }

    return NextResponse.json({ success: true, status: 'PROCESSED' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
