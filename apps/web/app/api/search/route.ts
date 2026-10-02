import { NextResponse } from 'next/server';
import { parseNaturalLanguageQuery } from '@estateflow/search';
import { DEMO_PROPERTIES } from '../../../lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (q) {
    const parsed = parseNaturalLanguageQuery(q);
    let items = [...DEMO_PROPERTIES];
    if (parsed.bedrooms?.length) {
      items = items.filter((p) => parsed.bedrooms!.includes(p.bedrooms));
    }
    if (parsed.transactionType) {
      items = items.filter((p) => p.transactionType === parsed.transactionType);
    }
    return NextResponse.json({ success: true, parsedQuery: parsed, data: items });
  }

  return NextResponse.json({ success: true, data: DEMO_PROPERTIES });
}
