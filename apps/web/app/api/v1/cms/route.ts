import { NextResponse } from 'next/server';

// Default entry site CMS configuration state
let cmsConfig = {
  // 1. WhatsApp & Support Desk
  whatsappPhone: '+91 9000072227',
  callDeskPhone: '+91 9000072227',
  supportEmail: 'support@estateflow.io',
  officeAddress: 'HITEC City, Knowledge City, Hyderabad, 500081',

  // 2. Hero Section Media & Typography
  heroVideoUrl: '/herovideo.mp4',
  vignetteOpacity: '65',
  heroBadgeText: "INDIA'S PREMIER SOVEREIGN REAL ESTATE MARKETPLACE",
  heroHeadingLine1: 'Architectural Mastery',
  heroHeadingLine2: 'Meets Capital Growth',
  heroSubheading:
    'Discover Telangana’s finest collection of 100% RERA-cleared luxury villas, high-rise penthouses, and commercial yields across Kokapet, Jubilee Hills, and Gachibowli with instant AI valuation guarantees.',

  // 3. Live Ticker Stream
  tickerSpeed: '35',
  pauseOnHover: true,
  tickerItems: [
    { type: 'DEMAND SPIKE', text: 'Kokapet Neopolis 3 BHK prices +14.2% YoY (Avg ₹10,800/sq.ft)', color: 'amber' },
    { type: 'JUST TRANSACTED', text: 'Triplex Villa in Jubilee Hills closed for ₹6.85 Cr', color: 'emerald' },
    { type: 'NEW RERA APPROVAL', text: 'Prestigio Sky Tower Phase 2 (#P0240000512)', color: 'amber' },
    { type: 'HNW PULSE', text: '1,480+ Active Verified Buyers online', color: 'teal' },
  ],

  // 4. SEO & Social OpenGraph
  metaTitle: 'EstateFlow — Enterprise Real Estate & Verified Property Marketplace',
  metaDescription:
    'Find, buy, rent, and invest in TS-RERA verified properties, new builder projects, luxury villas, and commercial spaces with EstateFlow.',
  ogImageUrl:
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@estateflow',

  // 5. Calculator & Market Rates
  baseInterestRate: 8.5,
  stampDutyRate: 7.5,
  defaultDownPayment: 20,
  microMarketRates: {
    kokapet: 10800,
    jubilee_hills: 14500,
    financial_district: 11200,
    kondapur: 9200,
  },
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: cmsConfig,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    cmsConfig = {
      ...cmsConfig,
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Entry site CMS configuration updated successfully',
      data: cmsConfig,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update CMS config' },
      { status: 500 }
    );
  }
}
