'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@estateflow/ui';
import { DEMO_PROJECTS } from '../../lib/mockData';

export default function DevelopersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState<any | null>(null);

  const developers = [
    {
      id: 'dev-1',
      name: 'Skyline Infrastructures',
      logo: '🏢',
      experienceYears: 18,
      completedProjects: 42,
      ongoingProjects: 6,
      totalSqFtDelivered: '15.5 Million sq.ft',
      reraRating: '5.0 / 5.0 (A+ Grade)',
      headquarters: 'Hyderabad, Telangana',
      description: 'Pioneering luxury high-rise gated communities and sustainable commercial office parks across Kondapur, Gachibowli, and Financial District.',
      activeTownships: DEMO_PROJECTS.slice(0, 2),
    },
    {
      id: 'dev-2',
      name: 'Royal Heritage Developers',
      logo: '🏰',
      experienceYears: 24,
      completedProjects: 68,
      ongoingProjects: 9,
      totalSqFtDelivered: '28.0 Million sq.ft',
      reraRating: '4.9 / 5.0 (A+ Grade)',
      headquarters: 'Hyderabad, Telangana',
      description: 'Architectural benchmarks in ultra-luxury triplex villas, golf county estates, and eco-friendly green townships in Tellapur and Jubilee Hills.',
      activeTownships: DEMO_PROJECTS.slice(1, 3),
    },
  ];

  const filteredDevelopers = developers.filter((dev) =>
    dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
            🏗️ Master Builder Directory
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            India's Most Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Real-Estate Developers</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Explore verified builder profiles, track delivered square footage, inspect RERA ratings, and discover master township developments.
          </p>
        </div>
      </section>

      {/* DEVELOPERS HUB BODY */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* SEARCH BAR */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md flex flex-wrap gap-4 items-center justify-between">
          <Input
            placeholder="Search developer by name or location (e.g. Skyline, Royal Heritage)..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-xl text-xs bg-slate-50"
          />
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredDevelopers.length} Developers Verified
          </span>
        </div>

        {/* DEVELOPER CARDS */}
        <div className="space-y-6">
          {filteredDevelopers.map((dev) => (
            <Card key={dev.id} className="p-6 sm:p-8 space-y-6 shadow-md hover:shadow-xl transition-all border-slate-200">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl shadow-sm">
                    {dev.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{dev.name}</h3>
                      <Badge variant="emerald">✓ TS-RERA A+ Certified</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">📍 HQ: {dev.headquarters} • Est. {2026 - dev.experienceYears}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="font-bold shadow"
                  onClick={() => setSelectedDeveloper(dev)}
                >
                  Contact Builder Sales Team →
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dev.description}
              </p>

              {/* STATS MATRIX */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Delivered Area</span>
                  <span className="font-extrabold text-slate-900 text-sm">{dev.totalSqFtDelivered}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Completed Projects</span>
                  <span className="font-extrabold text-slate-900 text-sm">{dev.completedProjects} Projects</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Ongoing Townships</span>
                  <span className="font-extrabold text-emerald-600 text-sm">{dev.ongoingProjects} Projects</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">RERA Track Record</span>
                  <span className="font-extrabold text-amber-600 text-sm">{dev.reraRating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CONTACT DEVELOPER MODAL */}
      <Modal
        isOpen={!!selectedDeveloper}
        onClose={() => setSelectedDeveloper(null)}
        title={`Contact Sales Office — ${selectedDeveloper?.name || ''}`}
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Inquire directly with <strong>{selectedDeveloper?.name}</strong> corporate sales department for bulk unit pricing, site viewings, and loan assistance.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Inquiry submitted to ${selectedDeveloper?.name}!`); setSelectedDeveloper(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Email Address" type="email" placeholder="john@example.com" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Inquiry Details</label>
              <textarea
                rows={3}
                placeholder="I am interested in bulk booking / township pre-launch details..."
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Submit Direct Builder Inquiry →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
