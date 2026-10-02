'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Tabs, Avatar, formatNumber } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../lib/mockData';

export default function UnifiedDashboardPage() {
  const [activeTab, setActiveTab] = useState('leads');

  const leads = [
    {
      id: 'lead-1',
      seekerName: 'Suresh Raina',
      seekerEmail: 'suresh@example.com',
      seekerPhone: '+91 98765 11223',
      propertyTitle: 'Luxury 3 BHK Skyline Apartment',
      scoreCategory: 'HOT',
      scoreValue: 92,
      status: 'QUALIFIED',
      date: '2026-08-18',
    },
    {
      id: 'lead-2',
      seekerName: 'Meenakshi Iyer',
      seekerEmail: 'meenakshi@example.com',
      seekerPhone: '+91 98765 44556',
      propertyTitle: 'Spacious 4 BHK Independent Villa',
      scoreCategory: 'WARM',
      scoreValue: 74,
      status: 'VIEWING_SCHEDULED',
      date: '2026-08-17',
    },
  ];

  const units = [
    { unitNo: 'A-101', tower: 'Tower A', floor: 1, type: '3 BHK', price: '₹1.45 Cr', status: 'AVAILABLE' },
    { unitNo: 'A-102', tower: 'Tower A', floor: 1, type: '2 BHK', price: '₹95 Lakh', status: 'RESERVED' },
    { unitNo: 'A-201', tower: 'Tower A', floor: 2, type: '3 BHK', price: '₹1.48 Cr', status: 'SOLD' },
    { unitNo: 'B-301', tower: 'Tower B', floor: 3, type: '4 BHK Villa', price: '₹3.25 Cr', status: 'AVAILABLE' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="emerald" className="font-bold">✓ Certified Broker & Agent Portal</Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white">Enterprise CRM & Inventory Dashboard</h1>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold">Manage property leads, track site visit requests, and lock unit availability in real-time</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Analytics report exported!')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition shadow-sm"
              >
                📥 Export CSV Report
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/post-property'}
                className="px-4 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition"
              >
                + Add New Property
              </button>
            </div>
          </div>

          {/* ANALYTICS SUMMARY MATRIX */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400 font-bold block mb-0.5">Active Buyer Leads</span>
              <span className="text-2xl font-black text-white">128</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400 font-bold block mb-0.5">Scheduled Site Visits</span>
              <span className="text-2xl font-black text-emerald-400">24</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400 font-bold block mb-0.5">Units Reserved</span>
              <span className="text-2xl font-black text-amber-400">18</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="text-slate-400 font-bold block mb-0.5">Conversion Score</span>
              <span className="text-2xl font-black text-teal-300">94%</span>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD BODY CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 relative z-10 space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <Tabs
            tabs={[
              { id: 'leads', label: '🎯 Lead Management CRM' },
              { id: 'inventory', label: '🏢 Builder Unit Inventory' },
              { id: 'messages', label: '💬 Realtime Messages' },
              { id: 'saved', label: '❤️ Saved Properties' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Inbound Lead Pipeline</h3>
                <Badge variant="emerald" className="font-bold">Realtime OpenSearch CRM</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="p-3">Buyer Seeker</th>
                      <th className="p-3">Interested Property</th>
                      <th className="p-3">Intent Score</th>
                      <th className="p-3">Pipeline Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{lead.seekerName}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{lead.seekerPhone} • {lead.seekerEmail}</div>
                        </td>
                        <td className="p-3 font-medium text-slate-700">{lead.propertyTitle}</td>
                        <td className="p-3">
                          <Badge variant={lead.scoreCategory === 'HOT' ? 'rose' : 'amber'} className="font-extrabold">
                            🔥 {lead.scoreCategory} ({lead.scoreValue}/100)
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="emerald" className="font-bold text-[10px]">{lead.status}</Badge>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="primary" size="sm" className="font-bold text-[11px]" onClick={() => alert(`Connecting call to ${lead.seekerPhone}...`)}>
                            Call Lead →
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Builder Tower Unit Matrix</h3>
                <Badge variant="emerald">Live Availability</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {units.map((u, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-slate-900 text-sm">Unit #{u.unitNo}</span>
                      <Badge variant={u.status === 'AVAILABLE' ? 'emerald' : u.status === 'RESERVED' ? 'amber' : 'slate'} className="text-[10px]">
                        {u.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 font-semibold">{u.tower} • Floor {u.floor} • {u.type}</p>
                    <p className="font-extrabold text-emerald-600 text-sm">{u.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
