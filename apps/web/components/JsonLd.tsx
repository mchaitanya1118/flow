import React from 'react';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'EstateFlow',
    url: 'https://estateflow.io',
    logo: 'https://estateflow.io/logo.png',
    description: 'Enterprise Real Estate Marketplace for buying, renting, and investing in verified properties.',
    telephone: '+91-9000072227',
    email: 'support@estateflow.io',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'HITEC City, Knowledge City',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500081',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://twitter.com/estateflow',
      'https://facebook.com/estateflow',
      'https://linkedin.com/company/estateflow',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EstateFlow',
    url: 'https://estateflow.io',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://estateflow.io/search?locality={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface PropertyJsonLdProps {
  title: string;
  description: string;
  url: string;
  mainImage: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  locality: string;
  city: string;
  state: string;
  country: string;
  verified: boolean;
}

export function PropertyJsonLd({
  title,
  description,
  url,
  mainImage,
  price,
  currency,
  bedrooms,
  bathrooms,
  areaSqFt,
  locality,
  city,
  state,
  country,
}: PropertyJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: title,
    description: description,
    url: url,
    image: [mainImage],
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01T00:00:00.000Z',
    },
    about: {
      '@type': 'SingleFamilyResidence',
      name: title,
      numberOfBedrooms: bedrooms,
      numberOfBathroomsTotal: bathrooms,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: areaSqFt,
        unitCode: 'FTK',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: locality,
        addressRegion: city,
        addressCountry: country,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
