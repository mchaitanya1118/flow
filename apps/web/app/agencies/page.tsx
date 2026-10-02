'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@estateflow/ui';

export default function AgenciesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<any | null>(null);

  const agencies = [
    {
      id: 'agency-1',
      name: 'Prestige Prime Realty Partners',
      logo: '🏛️',
      verifiedAgents: 28,
      activeListings: 142,
      rating: '4.9 / 5.0 (180+ Reviews)',
      locality: 'Gachibowli & Financial District',
      address: 'Level 4, Synergy Towers, Financial District, Nanakramguda, Gachibowli, Hyderabad',
      description: 'Specializing in ultra-luxury high-rise penthouses, gated villa communities, and commercial office leasing across Financial District.',
      phone: '+91 40 4567 8900',
    },
    {
      id: 'agency-2',
      name: 'Landmark Estate Advisors',
      logo: '🏙️',
      verifiedAgents: 35,
      activeListings: 210,
      rating: '4.8 / 5.0 (240+ Reviews)',
      locality: 'Kondapur & Hitec City',
      address: 'Suite 201, Landmark Chambers, Hitec City Main Road, Kondapur, Hyderabad',
      description: 'Premier advisory firm handling builder project pre-launches, resale luxury flats, and commercial investment portfolios.',
      phone: '+91 40 4567 9911',
    },
  ];

  const filteredAgencies = agencies.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.locality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            🏛️ Certified Agency Directory
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Top Real-Estate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Agencies & Brokerages</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Partner with RERA-licensed real estate agencies, multi-agent brokerages, and corporate property advisors in Hyderabad.
          </p>
        </div>
      </section>

      {/* AGENCIES CONTAINER */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* SEARCH BAR */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md flex flex-wrap gap-4 items-center justify-between">
          <Input
            placeholder="Search agency by name or locality (e.g. Prestige, Kondapur)..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-xl text-xs bg-slate-50"
          />
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredAgencies.length} Agencies Verified
          </span>
        </div>

        {/* AGENCY CARDS */}
        <div className="space-y-6">
          {filteredAgencies.map((agency) => (
            <Card key={agency.id} className="p-6 sm:p-8 space-y-6 shadow-md hover:shadow-xl transition-all border-slate-200 bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl shadow-sm text-white">
                    {agency.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{agency.name}</h3>
                      <Badge variant="emerald">✓ TS-RERA Licensed Agency</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">📍 Focus: {agency.locality}</p>
                  </div>
                </div>

                <Button variant="primary" size="md" className="font-bold shadow" onClick={() => setSelectedAgency(agency)}>
                  Contact Agency Desk →
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {agency.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Active Listings</span>
                  <span className="font-extrabold text-slate-900 text-sm">{agency.activeListings} Properties</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Verified Agents</span>
                  <span className="font-extrabold text-emerald-600 text-sm">{agency.verifiedAgents} Agents</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Client Rating</span>
                  <span className="font-extrabold text-amber-600 text-sm">⭐ {agency.rating}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Direct Helpline</span>
                  <span className="font-bold text-slate-800">{agency.phone}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CONTACT AGENCY MODAL */}
      <Modal isOpen={!!selectedAgency} onClose={() => setSelectedAgency(null)} title={`Contact ${selectedAgency?.name || ''}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Submit your property requirement directly to <strong>{selectedAgency?.name}</strong> senior brokerage desk.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Inquiry submitted to ${selectedAgency?.name}!`); setSelectedAgency(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Email Address" type="email" placeholder="john@example.com" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Submit Agency Inquiry →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
