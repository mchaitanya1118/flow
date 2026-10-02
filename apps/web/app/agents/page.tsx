'use client';

import React, { useState } from 'react';
import { AgentCard, Badge, Input, Select, Button, Modal, Card } from '@estateflow/ui';
import { DEMO_AGENTS } from '../../lib/mockData';

export default function AgentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('ALL');
  const [contactAgent, setContactAgent] = useState<any | null>(null);

  const filteredAgents = DEMO_AGENTS.filter((agent) => {
    if (
      searchQuery &&
      !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !agent.agencyName?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedLocality !== 'ALL' && !agent.areasServed.includes(selectedLocality)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚡ EstateFlow Verified Network
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Connect with Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Real-Estate Agents</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Partner with certified brokers, agency teams, and property advisors across Hyderabad to get the best deal on buying, selling, or leasing properties.
          </p>

          {/* QUICK LOCALITY PILLS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Filter Locality:</span>
            {['ALL', 'Kondapur', 'Gachibowli', 'Tellapur', 'Financial District', 'Jubilee Hills'].map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocality(loc)}
                className={`px-3 py-1 rounded-full font-bold transition-all border ${
                  selectedLocality === loc
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {loc === 'ALL' ? 'All Localities' : loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT DIRECTORY BODY */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* SEARCH & CONTROLS CONTAINER */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center flex-1 max-w-2xl">
            <Input
              placeholder="Search agent by name or agency (e.g. Rajesh, Skyline Realty)..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              className="flex-1 text-xs bg-slate-50"
            />
            <Select
              value={selectedLocality}
              onChange={(e: any) => setSelectedLocality(e.target.value)}
              className="text-xs w-48 bg-slate-50 font-semibold"
              options={[
                { label: 'All Localities', value: 'ALL' },
                { label: 'Kondapur', value: 'Kondapur' },
                { label: 'Gachibowli', value: 'Gachibowli' },
                { label: 'Tellapur', value: 'Tellapur' },
                { label: 'Financial District', value: 'Financial District' },
              ]}
            />
          </div>
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredAgents.length} Agents Available
          </div>
        </div>

        {/* AGENT CARDS GRID */}
        {filteredAgents.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <p className="text-base font-bold text-slate-800">No agents match your search criteria.</p>
            <p className="text-xs mt-1">Try resetting locality filters or searching a different name.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onContactClick={() => setContactAgent(agent)}
              />
            ))}
          </div>
        )}

        {/* FEATURED AGENCY SPOTLIGHT */}
        <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="amber">Agency Partnership Program</Badge>
            <h3 className="text-xl sm:text-2xl font-black text-white">Are You a Certified Real-Estate Agency?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Join the EstateFlow Verified Agent Network. List your inventory, manage high-intent lead pipelines, and receive direct inquiries from qualified buyers.
            </p>
          </div>
          <Button variant="primary" size="lg" className="whitespace-nowrap font-bold shadow-lg" onClick={() => alert('Agency application opened!')}>
            Register Agency Team →
          </Button>
        </div>
      </div>

      {/* DIRECT CONTACT MODAL */}
      <Modal
        isOpen={!!contactAgent}
        onClose={() => setContactAgent(null)}
        title={`Contact ${contactAgent?.name || 'Agent'}`}
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <img src={contactAgent?.avatar} alt={contactAgent?.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-300" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{contactAgent?.name}</h4>
              <p className="text-slate-500 font-medium">{contactAgent?.agencyName}</p>
              <p className="text-emerald-600 font-bold mt-0.5">⭐ {contactAgent?.rating} Rating • {contactAgent?.activeListingsCount} Active Listings</p>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Inquiry sent to ${contactAgent?.name}!`); setContactAgent(null); }} className="space-y-3">
            <Input label="Your Name" placeholder="John Doe" required />
            <Input label="Your Phone Number" placeholder="+91 98765 00000" required />
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Property Inquiry Details</label>
              <textarea
                rows={3}
                placeholder="I am looking for a 3 BHK property in Kondapur under ₹1.5 Cr..."
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Send Direct Message →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
