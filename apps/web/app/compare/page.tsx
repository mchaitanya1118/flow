'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, formatNumber } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../lib/mockData';

export default function ComparePropertiesPage() {
  const [selectedProperties] = useState(DEMO_PROPERTIES.slice(0, 3));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📊 Side-by-Side Comparison Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Selected Properties</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Compare prices, price per sqft, specifications, amenities, location advantages, and quality audit scores side-by-side.
          </p>
        </div>
      </section>

      {/* COMPARISON MATRIX CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Property Feature Matrix</h3>
            <Badge variant="emerald" className="font-bold">{selectedProperties.length} Properties Selected</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-4 w-48 bg-slate-50 font-bold uppercase text-slate-600 text-[11px]">Feature Specs</th>
                  {selectedProperties.map((p) => (
                    <th key={p.id} className="p-4 min-w-[240px] font-bold text-slate-900">
                      <div className="space-y-2">
                        <img src={p.mainImage} alt={p.title} className="w-full h-32 object-cover rounded-xl border shadow-sm" />
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{p.title}</h4>
                        <Badge variant="emerald">{p.transactionType}</Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Total Price</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-black text-emerald-600 text-sm">
                      ₹{formatNumber(p.price)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Rate / Sq.Ft</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-slate-800">
                      ₹{formatNumber(Math.round(p.price / p.areaSqFt))}/sq.ft
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Location</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-semibold text-slate-800">
                      {p.location.locality}, {p.location.city}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Bedrooms & Baths</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.bedrooms} BHK | {p.bathrooms} Baths
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Super Built-Up Area</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-slate-900">
                      {formatNumber(p.areaSqFt)} sq.ft
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Listing Quality Score</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4 font-black text-emerald-600">
                      ⭐ {p.qualityScore}/100
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Verified Status</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.verified ? <Badge variant="emerald">✓ Verified</Badge> : <Badge variant="slate">Unverified</Badge>}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-4 font-bold text-slate-900 bg-slate-50">Actions</td>
                  {selectedProperties.map((p) => (
                    <td key={p.id} className="p-4">
                      <Link href={`/property/${p.slug}`}>
                        <Button variant="primary" size="sm" className="w-full font-bold shadow">
                          View Details →
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
