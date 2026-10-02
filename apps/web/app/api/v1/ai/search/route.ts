import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@estateflow/search';
import { DEMO_PROPERTIES } from '@/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt required' }, { status: 400 });
    }

    const structuredFilters = parseNaturalLanguageQuery(prompt);

    // Extract price constraint from prompt (e.g. "below 1.5 crore", "under 50 lakhs")
    const lower = prompt.toLowerCase();
    const croreMatch = lower.match(/(below|under|<)\s*(\d+(\.\d+)?)\s*(crore|cr)/);
    if (croreMatch) {
      structuredFilters.maxPrice = parseFloat(croreMatch[2]) * 10000000;
    }

    const lakhMatch = lower.match(/(below|under|<)\s*(\d+(\.\d+)?)\s*(lakh|lakhs|l)/);
    if (lakhMatch) {
      structuredFilters.maxPrice = parseFloat(lakhMatch[2]) * 100000;
    }

    let results = [...DEMO_PROPERTIES];
    if (structuredFilters.bedrooms?.length) {
      results = results.filter((p) => structuredFilters.bedrooms!.includes(p.bedrooms));
    }
    if (structuredFilters.transactionType) {
      results = results.filter((p) => p.transactionType === structuredFilters.transactionType);
    }
    if (structuredFilters.maxPrice) {
      results = results.filter((p) => p.price <= structuredFilters.maxPrice!);
    }

    return NextResponse.json({
      success: true,
      query: prompt,
      structuredFilters,
      totalMatched: results.length,
      data: results,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'AI Search failed' }, { status: 500 });
  }
}
