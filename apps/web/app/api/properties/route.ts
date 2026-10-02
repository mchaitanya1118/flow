import { NextResponse } from 'next/server';
import { PropertyWizardSchema } from '@estateflow/validation';
import { calculateQualityScore } from '@estateflow/search';
import { DEMO_PROPERTIES } from '../../../lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionType = searchParams.get('transactionType');
    const locality = searchParams.get('locality');
    const propertyType = searchParams.get('propertyType');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : null;
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';

    let results = [...DEMO_PROPERTIES];

    if (transactionType && transactionType !== 'ALL') {
      results = results.filter((p) => p.transactionType === transactionType);
    }

    if (locality) {
      const query = locality.toLowerCase();
      results = results.filter(
        (p) =>
          p.location.locality.toLowerCase().includes(query) ||
          p.location.city.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query)
      );
    }

    if (propertyType && propertyType !== 'ALL') {
      results = results.filter((p) => p.propertyType === propertyType);
    }

    if (minPrice !== null) {
      results = results.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== null) {
      results = results.filter((p) => p.price <= maxPrice);
    }

    if (bedrooms !== null) {
      results = results.filter((p) => p.bedrooms >= bedrooms);
    }

    if (verifiedOnly) {
      results = results.filter((p) => p.verified);
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      data: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload against Zod Schema
    const parseResult = PropertyWizardSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Calculate listing quality score via search service
    const qualityScore = calculateQualityScore({
      hasPhotos: data.images.length > 0,
      photoCount: data.images.length,
      hasFloorPlan: true,
      hasVideo: false,
      descriptionLength: data.description.length,
      isVerified: true,
    });

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: data.title,
      slug: `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
      transactionType: data.transactionType,
      propertyType: data.propertyType,
      price: data.price,
      currency: 'INR',
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      areaSqFt: data.areaSqFt,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        locality: data.locality,
        state: data.state,
        country: 'India',
        postalCode: data.postalCode,
        address: data.address,
      },
      mainImage: data.images[0],
      galleryImages: data.images,
      verified: true,
      qualityScore,
      status: 'PUBLISHED',
      updatedAt: new Date().toISOString(),
      agent: {
        id: 'agent-verified-01',
        name: 'EstateFlow Verified Desk',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        phone: '+919876543210',
        agencyName: 'EstateFlow Official Marketplace',
        isVerified: true,
        rating: 4.9,
      },
    };

    // Add to in-memory demo array so search/view reflects the new property immediately
    DEMO_PROPERTIES.unshift(newProperty as any);

    return NextResponse.json(
      {
        success: true,
        message: 'Property listing created and published successfully',
        data: newProperty,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
