import { describe, it, expect } from 'vitest';
import { hasPermission } from '@estateflow/auth';
import { parseNaturalLanguageQuery, calculateQualityScore } from '@estateflow/search';

describe('EstateFlow Domain Logic Tests', () => {
  it('should parse natural language queries correctly', () => {
    const res = parseNaturalLanguageQuery('3 BHK villa for rent in Gachibowli');
    expect(res.bedrooms).toEqual([3]);
    expect(res.transactionType).toBe('RENT');
    expect(res.propertyTypes).toContain('VILLA');
  });

  it('should compute listing quality score accurately', () => {
    const score = calculateQualityScore({
      hasPhotos: true,
      photoCount: 6,
      hasFloorPlan: true,
      hasVideo: true,
      descriptionLength: 200,
      isVerified: true,
    });
    expect(score).toBe(100);
  });

  it('should enforce RBAC permissions strictly', () => {
    expect(hasPermission('AGENT', 'property:create')).toBe(true);
    expect(hasPermission('USER', 'property:publish')).toBe(false);
    expect(hasPermission('ADMIN', 'admin:user_suspend')).toBe(true);
    expect(hasPermission('SUPER_ADMIN', 'admin:settings_edit')).toBe(true);
  });
});
