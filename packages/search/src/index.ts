import { PropertySummary, SearchFilterState } from '@estateflow/types';

export interface SearchResult {
  items: PropertySummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: {
    propertyTypes: Record<string, number>;
    cities: Record<string, number>;
    localities: Record<string, number>;
  };
}

export function parseNaturalLanguageQuery(query: string): Partial<SearchFilterState> {
  const result: Partial<SearchFilterState> = {};
  const lower = query.toLowerCase();

  // BHK / Bedroom parsing (e.g. "3 BHK", "2 bedroom")
  const bhkMatch = lower.match(/(\d+)\s*(bhk|bedroom|bed)/);
  if (bhkMatch) {
    result.bedrooms = [parseInt(bhkMatch[1], 10)];
  }

  // Property type parsing
  if (lower.includes('apartment') || fontMatch(lower, ['flat', 'apartments'])) {
    result.propertyTypes = ['APARTMENT'];
  } else if (lower.includes('villa') || lower.includes('house')) {
    result.propertyTypes = ['VILLA', 'HOUSE'];
  } else if (lower.includes('plot') || lower.includes('land')) {
    result.propertyTypes = ['PLOT', 'LAND'];
  } else if (lower.includes('office') || lower.includes('commercial')) {
    result.propertyTypes = ['OFFICE', 'SHOP'];
  }

  // Transaction type
  if (lower.includes('rent') || lower.includes('lease')) {
    result.transactionType = 'RENT';
  } else if (lower.includes('buy') || lower.includes('sale')) {
    result.transactionType = 'BUY';
  }

  return result;
}

function fontMatch(str: string, words: string[]): boolean {
  return words.some((w) => str.includes(w));
}

export function calculateQualityScore(listing: {
  hasPhotos: boolean;
  photoCount: number;
  hasFloorPlan: boolean;
  hasVideo: boolean;
  descriptionLength: number;
  isVerified: boolean;
}): number {
  let score = 40; // Base score

  if (listing.hasPhotos) score += 15;
  if (listing.photoCount >= 5) score += 10;
  if (listing.hasFloorPlan) score += 10;
  if (listing.hasVideo) score += 5;
  if (listing.descriptionLength > 150) score += 10;
  if (listing.isVerified) score += 10;

  return Math.min(100, score);
}
