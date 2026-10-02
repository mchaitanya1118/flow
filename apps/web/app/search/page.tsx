'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertyCard, Input, Badge, Button } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../lib/mockData';
import { PropertySummary } from '@estateflow/types';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTransaction = searchParams.get('transactionType') || 'BUY';
  const initialLocality = searchParams.get('locality') || '';

  const [transactionType, setTransactionType] = useState(initialTransaction);
  const [locality, setLocality] = useState(initialLocality);
  const [propertyType, setPropertyType] = useState('ALL');
  const [bedrooms, setBedrooms] = useState('ANY');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [selectedPin, setSelectedPin] = useState<PropertySummary | null>(null);

  // Filter listings dynamically
  const filteredListings = useMemo(() => {
    return DEMO_PROPERTIES.filter((prop) => {
      if (transactionType && prop.transactionType !== transactionType) return false;
      if (propertyType !== 'ALL' && prop.propertyType !== propertyType) return false;
      if (
        locality &&
        !prop.location.locality.toLowerCase().includes(locality.toLowerCase()) &&
        !prop.location.city.toLowerCase().includes(locality.toLowerCase())
      ) {
        return false;
      }
      if (bedrooms !== 'ANY' && prop.bedrooms !== Number(bedrooms)) return false;
      if (verifiedOnly && !prop.verified) return false;
      return true;
    });
  }, [transactionType, locality, propertyType, bedrooms, verifiedOnly]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* DARK SEARCH & FILTER HEADER */}
      <section className="bg-slate-900 border-b border-slate-800 text-white px-4 py-6 shadow-xl z-20">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-white">Search Real-Estate Inventory</h1>
              <p className="text-xs text-slate-400 font-medium">Discover RERA-verified luxury villas, apartments, and commercial projects</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
              {(['split', 'list', 'map'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase transition-all ${
                    viewMode === mode
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* FILTER CONTROLS */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="BUY">BUY</option>
              <option value="RENT">RENT</option>
              <option value="NEW_PROJECT">NEW PROJECTS</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
            </select>

            <Input
              placeholder="Search locality, city..."
              value={locality}
              onChange={(e: any) => setLocality(e.target.value)}
              className="max-w-xs text-xs bg-slate-900 text-white border-slate-800 placeholder-slate-500"
            />

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-white"
            >
              <option value="ANY">ANY BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer px-2">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              ✓ Verified Only
            </label>

            <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800/50">
              {filteredListings.length} Properties Match
            </span>
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS BODY */}
      <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
            <span className="text-4xl block">🔍</span>
            <h3 className="text-lg font-extrabold text-slate-900">No properties matched your search parameters</h3>
            <p className="text-xs text-slate-500">Try adjusting your locality or BHK filters to view available inventory.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((prop) => (
              <div key={prop.id} onClick={() => router.push(`/property/${prop.slug}`)} className="cursor-pointer">
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold">Loading Property Search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
