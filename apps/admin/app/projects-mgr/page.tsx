'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Building2,
  ShieldCheck,
  Plus,
  Search,
  Building,
  CheckCircle,
  Clock,
  Layers,
} from 'lucide-react';

export default function ProjectsManagerPage() {
  const [search, setSearch] = useState('');

  const [projectsList, setProjectsList] = useState([
    {
      id: 'prj-1',
      name: 'Prestigio Sky Tower Phase 2',
      builder: 'Prestigio Luxury Builders',
      reraId: 'P0240000512',
      locality: 'Kokapet Neopolis',
      totalUnits: 340,
      availableUnits: 48,
      completionPercent: 85,
      status: 'UNDER_CONSTRUCTION',
    },
    {
      id: 'prj-2',
      name: 'Aparna Heritage Enclave',
      builder: 'Aparna Infrastructure',
      reraId: 'P02400004102',
      locality: 'Jubilee Hills',
      totalUnits: 120,
      availableUnits: 12,
      completionPercent: 100,
      status: 'READY_TO_MOVE',
    },
    {
      id: 'prj-3',
      name: 'My Home Financial District Hub',
      builder: 'My Home Real Estate Group',
      reraId: 'P02400002954',
      locality: 'Financial District',
      totalUnits: 580,
      availableUnits: 110,
      completionPercent: 60,
      status: 'NEW_LAUNCH',
    },
  ]);

  const filtered = projectsList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.builder.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Master Builder Catalog</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Master Builder Projects & Inventory</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Manage Tier-1 builder township launches, TS-RERA approval seals, and unit availability matrices.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => alert('Launching Add New Builder Project Wizard...')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Builder Launch</span>
        </Button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-white max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search project name, builder..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs w-full text-white placeholder-slate-500 font-medium"
          />
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((prj) => (
          <div key={prj.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant="emerald" className="text-[10px] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> RERA VERIFIED
                </Badge>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
                  {prj.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{prj.name}</h3>
                <p className="text-xs text-slate-400 font-semibold">{prj.builder}</p>
                <p className="text-[11px] text-emerald-400 font-mono mt-0.5">RERA: {prj.reraId}</p>
              </div>

              {/* PROGRESS BAR */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Construction Progress</span>
                  <span className="text-white font-black">{prj.completionPercent}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: `${prj.completionPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs font-bold">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Total Units</span>
                <span className="text-base font-black text-white">{prj.totalUnits} Units</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Available</span>
                <span className="text-base font-black text-emerald-400">{prj.availableUnits} Left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
