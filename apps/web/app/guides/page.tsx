'use client';

import React from 'react';
import Link from 'next/link';
import { Badge, Card, Button } from '@estateflow/ui';

export default function GuidesPage() {
  const articles = [
    {
      slug: 'first-time-home-buyer-guide-hyderabad',
      title: 'Complete First-Time Homebuyer Guide for Hyderabad (2026)',
      category: 'BUYING GUIDE',
      readTime: '6 min read',
      summary: 'Learn about property registration fees, stamp duty, RERA verification checklist, and choosing between Kondapur, Gachibowli, and Tellapur.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'understanding-rera-approval-process',
      title: 'How to Verify Builder RERA Registration & Project Clearances',
      category: 'LEGAL & RERA',
      readTime: '8 min read',
      summary: 'Essential legal documentation checks, occupancy certificate (OC), commencement certificate (CC), and how RERA protects homebuyers.',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'commercial-real-estate-investment-tips',
      title: 'Maximizing Rental Yields in Commercial Office & Retail Spaces',
      category: 'INVESTMENT',
      readTime: '5 min read',
      summary: 'Analyzing Grade-A commercial office space leases, maintenance charges, and capital appreciation trends in Financial District.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="emerald">EstateFlow Knowledge Hub</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Property Buyer & Seller Guides</h1>
        <p className="text-sm text-slate-500">
          Expert insights, legal RERA advice, financial planning tips, and market analysis written by PropTech specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/guides/${article.slug}`}>
            <Card hoverable className="h-full flex flex-col overflow-hidden p-0">
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600 mb-2">
                  <span>{article.category}</span>
                  <span className="text-slate-400 font-normal">{article.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3">{article.summary}</p>
                <Button variant="outline" size="sm" className="mt-auto w-full">
                  Read Full Article →
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
