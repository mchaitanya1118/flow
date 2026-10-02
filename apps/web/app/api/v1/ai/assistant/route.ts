import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyType, bedrooms, locality, city, areaSqFt, price, amenities } = body;

    const formattedPrice = price >= 10000000 ? `₹${(price / 10000000).toFixed(2)} Cr` : `₹${(price / 100000).toFixed(2)} Lakhs`;
    const amenitiesList = Array.isArray(amenities) && amenities.length > 0 ? amenities.join(', ') : 'modern amenities';

    const generatedDescription = `Presenting a premium ${bedrooms || 3} BHK ${propertyType || 'Apartment'} situated in the prime residential hub of ${locality || 'Kondapur'}, ${city || 'Hyderabad'}. Spanning a spacious super built-up area of ${areaSqFt || 1650} sq.ft, this property is available at an attractive price of ${formattedPrice}.\n\nKey Highlights & Features:\n- Generous floor plan with ample natural ventilation & natural sunlight\n- Access to ${amenitiesList}\n- Prime connectivity to major IT corridors, schools, and healthcare centers\n\nContact the listing representative to schedule a private viewing today.`;

    return NextResponse.json({
      success: true,
      description: generatedDescription,
      factsUsed: {
        bedrooms,
        locality,
        city,
        areaSqFt,
        price: formattedPrice,
        amenities: amenitiesList,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to generate listing description' }, { status: 500 });
  }
}
