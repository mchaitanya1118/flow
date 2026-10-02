'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Eye,
  Building,
  MapPin,
  Star,
  Search,
  Filter,
} from 'lucide-react';

export default function ModerationQueuePage() {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'FLAGGED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [propertiesList, setPropertiesList] = useState([
    {
      id: 'prop-mod-1',
      title: 'Prestigio Sky Villa Phase 2 (3 BHK)',
      locality: 'Kokapet Neopolis',
      city: 'Hyderabad',
      price: '₹3.45 Crore',
      builder: 'Prestigio Luxury Builders',
      reraNo: 'P0240000512',
      qualityScore: 96,
      status: 'PENDING',
      dateUploaded: '2026-10-01',
    },
    {
      id: 'prop-mod-2',
      title: 'Aparna Gated Community Villa #42',
      locality: 'Jubilee Hills',
      city: 'Hyderabad',
      price: '₹6.85 Crore',
      builder: 'Aparna Infrastructure',
      reraNo: 'P02400004102',
      qualityScore: 99,
      status: 'VERIFIED',
      dateUploaded: '2026-09-28',
    },
    {
      id: 'prop-mod-3',
      title: 'High-Rise Office Suite 402',
      locality: 'Financial District',
      city: 'Hyderabad',
      price: '₹1.85 Crore',
      builder: 'Unverified Third Party Agent',
      reraNo: 'UNVERIFIED',
      qualityScore: 42,
      status: 'FLAGGED',
      dateUploaded: '2026-10-01',
    },
    {
      id: 'prop-mod-4',
      title: 'My Home Bhooja Sky Suite',
      locality: 'HITEC City',
      city: 'Hyderabad',
      price: '₹4.20 Crore',
      builder: 'My Home Real Estate Group',
      reraNo: 'P02400002954',
      qualityScore: 98,
      status: 'VERIFIED',
      dateUploaded: '2026-09-25',
    },
  ]);

  const handleApprove = (id: string) => {
    setPropertiesList(
      propertiesList.map((p) => (p.id === id ? { ...p, status: 'VERIFIED', qualityScore: 98 } : p))
    );
  };

  const handleFlag = (id: string) => {
    setPropertiesList(
      propertiesList.map((p) => (p.id === id ? { ...p, status: 'FLAGGED' } : p))
    );
  };

  const filtered = propertiesList.filter((p) => {
    if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">RERA Audit & Verification Desk</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Property Moderation Queue</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Verify TS-RERA title clearances, floor plans, and publisher authenticity before publishing to entry site.</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-white max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search property, builder, RERA ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs w-full text-white placeholder-slate-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'PENDING', 'VERIFIED', 'FLAGGED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === st
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* MODERATION TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Property & Locality</th>
                <th className="p-4">Builder / Publisher</th>
                <th className="p-4">TS-RERA No</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quality Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850 transition">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{item.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-semibold">
                      <MapPin className="w-3 h-3 text-emerald-400" /> {item.locality}, {item.city}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-300">{item.builder}</td>
                  <td className="p-4 font-mono font-bold text-slate-300">{item.reraNo}</td>
                  <td className="p-4 font-black text-emerald-400 text-sm">{item.price}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                      item.qualityScore >= 90
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      ⭐ {item.qualityScore}/100
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={item.status === 'VERIFIED' ? 'emerald' : item.status === 'FLAGGED' ? 'rose' : 'amber'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {item.status !== 'VERIFIED' && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                      >
                        Approve & Publish
                      </button>
                    )}
                    {item.status !== 'FLAGGED' && (
                      <button
                        onClick={() => handleFlag(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm"
                      >
                        Flag Suspicious
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
