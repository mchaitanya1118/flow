'use client';

import React, { useState } from 'react';
import { ProjectCard, Badge, Button, Tabs, Modal, Input, Card } from '@estateflow/ui';
import { DEMO_PROJECTS } from '../../lib/mockData';

export default function BuilderProjectsPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedBrochureProject, setSelectedBrochureProject] = useState<any | null>(null);

  const filteredProjects = DEMO_PROJECTS.filter((proj) => {
    if (activeTab === 'READY' && proj.status !== 'Ready to Move') return false;
    if (activeTab === 'UNDER_CONSTRUCTION' && proj.status !== 'Under Construction') return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
            🏢 Verified Builder Townships
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            New Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Master Developments</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Explore RERA-approved high-rise towers, luxury gated villa communities, and mega township developments by tier-1 builders in Hyderabad.
          </p>

          {/* STATUS FILTER PILLS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Filter Status:</span>
            {[
              { id: 'ALL', label: 'All Developments' },
              { id: 'UNDER_CONSTRUCTION', label: '🏗️ Under Construction' },
              { id: 'READY', label: '🔑 Ready to Move' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full font-bold transition-all border ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-900/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS CATALOG CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* HEADER BAR */}
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 sm:p-6 shadow-xl backdrop-blur-md flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="emerald" className="font-bold">✓ TS-RERA Verified</Badge>
            <span className="text-xs font-semibold text-slate-500">Official Builder Direct Pricing</span>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredProjects.length} Projects Listed
          </span>
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <p className="text-base font-bold text-slate-800">No projects match the selected filter.</p>
            <p className="text-xs mt-1">Try selecting "All Developments".</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <ProjectCard project={proj} />
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">RERA:</span>
                    <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border">P02400007892</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="font-bold shadow"
                    onClick={() => setSelectedBrochureProject(proj)}
                  >
                    📥 Download PDF Brochure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BROCHURE DOWNLOAD MODAL */}
      <Modal
        isOpen={!!selectedBrochureProject}
        onClose={() => setSelectedBrochureProject(null)}
        title={`Download Master Plan — ${selectedBrochureProject?.title || ''}`}
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <p className="font-bold text-sm">📥 Instant Digital Package</p>
            <p className="text-[11px] mt-0.5">Includes master floor plans, pricing sheet, unit availability matrix, and bank approval letters for <strong>{selectedBrochureProject?.title}</strong>.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert(`PDF Brochure sent to your email!`); setSelectedBrochureProject(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Email Address" type="email" placeholder="john@example.com" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Send PDF Brochure to Email →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
