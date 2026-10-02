'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button, PropertyCard, Tabs } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../lib/mockData';

export default function SavedItemsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('properties');
  const [savedProps, setSavedProps] = useState(DEMO_PROPERTIES.slice(0, 4));

  const savedSearches = [
    {
      id: 'search-1',
      title: '3 BHK Apartments in Kondapur under ₹1.5 Cr',
      filters: 'Buy • Kondapur • 3 BHK • Max ₹1.5 Cr',
      frequency: 'Daily Email Alerts',
      createdDate: '12-Aug-2026',
    },
    {
      id: 'search-2',
      title: 'Luxury Triplex Villas in Gachibowli',
      filters: 'Buy • Gachibowli • Villa • 4+ BHK',
      frequency: 'Instant Alert',
      createdDate: '18-Aug-2026',
    },
  ];

  const handleRemoveSaved = (id: string) => {
    setSavedProps((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ❤️ User Favorites Hub
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Saved Properties & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Custom Search Alerts</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Track your bookmarked listings, receive price-drop notifications, and manage automated email alerts for new market arrivals.
          </p>
        </div>
      </section>

      {/* SAVED HUB CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: 'properties', label: `❤️ Saved Properties (${savedProps.length})` },
              { id: 'searches', label: `🔔 Saved Search Alerts (${savedSearches.length})` },
            ]}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id)}
          />

          <Button variant="outline" size="sm" className="font-bold border-slate-300 text-xs" onClick={() => router.push('/search')}>
            + Find More Properties
          </Button>
        </div>

        {/* SAVED PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div>
            {savedProps.length === 0 ? (
              <Card className="p-12 text-center text-slate-500">
                <p className="text-base font-bold text-slate-800">You haven't saved any properties yet.</p>
                <p className="text-xs mt-1 mb-4">Click the heart icon on any property card to save it for quick access.</p>
                <Button variant="primary" size="sm" className="font-bold" onClick={() => router.push('/search')}>
                  Browse Property Search →
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProps.map((prop) => (
                  <div key={prop.id} className="relative group">
                    <PropertyCard property={prop} />
                    <button
                      onClick={() => handleRemoveSaved(prop.id)}
                      className="absolute top-3 right-3 z-20 bg-rose-600 text-white rounded-full p-2 text-xs shadow-lg hover:bg-rose-700 transition-colors font-bold"
                      title="Remove from saved"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED SEARCH ALERTS TAB */}
        {activeTab === 'searches' && (
          <div className="space-y-4">
            {savedSearches.map((s) => (
              <Card key={s.id} className="p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{s.title}</h3>
                    <Badge variant="emerald" className="text-[10px]">{s.frequency}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{s.filters}</p>
                  <p className="text-[11px] text-slate-400">Alert Created on: {s.createdDate}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-bold text-xs" onClick={() => router.push('/search?locality=Kondapur')}>
                    Execute Search →
                  </Button>
                  <Button variant="ghost" size="sm" className="text-rose-600 text-xs font-bold" onClick={() => alert('Search alert removed!')}>
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
