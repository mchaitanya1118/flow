import React from 'react';
import type { Metadata } from 'next';
import { DEMO_PROPERTIES } from '../../../lib/mockData';
import { PropertyDetailClient } from './PropertyDetailClient';
import { PropertyJsonLd, BreadcrumbJsonLd } from '../../../components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = DEMO_PROPERTIES.find((p) => p.slug === slug) || DEMO_PROPERTIES[0];
  const locationText = `${property.location.locality}, ${property.location.city}`;

  const priceText =
    property.transactionType === 'RENT'
      ? `₹${property.price.toLocaleString('en-IN')}/month`
      : `₹${(property.price / 10000000).toFixed(2)} Cr`;

  const title = `${property.title} in ${locationText} - ${priceText}`;
  const description = `${property.bedrooms} BHK ${property.propertyType} for ${property.transactionType.toLowerCase()} in ${locationText}. ${property.areaSqFt} sq.ft, TS-RERA verified title.`;

  return {
    title,
    description,
    keywords: [
      property.title,
      `${property.bedrooms} BHK ${property.location.locality}`,
      `Property in ${property.location.city}`,
      property.transactionType,
      'TS-RERA verified',
    ],
    alternates: {
      canonical: `https://estateflow.io/property/${property.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://estateflow.io/property/${property.slug}`,
      siteName: 'EstateFlow Marketplace',
      type: 'article',
      images: [
        {
          url: property.mainImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.mainImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = DEMO_PROPERTIES.find((p) => p.slug === slug) || DEMO_PROPERTIES[0];

  const breadcrumbs = [
    { name: 'Home', item: 'https://estateflow.io' },
    { name: 'Search Properties', item: 'https://estateflow.io/search' },
    { name: property.title, item: `https://estateflow.io/property/${property.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <PropertyJsonLd
        title={property.title}
        description={`${property.bedrooms} BHK ${property.propertyType} in ${property.location.locality}, ${property.location.city}`}
        url={`https://estateflow.io/property/${property.slug}`}
        mainImage={property.mainImage}
        price={property.price}
        currency={property.currency}
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        areaSqFt={property.areaSqFt}
        locality={property.location.locality}
        city={property.location.city}
        state={property.location.state}
        country={property.location.country}
        verified={property.verified}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
