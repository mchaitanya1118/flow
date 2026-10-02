'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  CalendarCheck,
  Phone,
  Mail,
  Building,
  User,
  Search,
  MessageSquare,
  Clock,
} from 'lucide-react';

export default function LeadsOverseerPage() {
  const [search, setSearch] = useState('');

  const [leadsList, setLeadsList] = useState([
    {
      id: 'ld-101',
      name: 'Dr. Ananya Reddy',
      phone: '+91 9000072227',
      email: 'ananya.r@apollo.org',
      property: 'Prestigio Sky Villa Phase 2 (3 BHK)',
      agentAssigned: 'Vikram Malhotra (Apex Prime)',
      requestedDate: '2026-10-04 at 11:00 AM',
      intentScore: '🔥 HOT (94/100)',
      status: 'SCHEDULED',
    },
    {
      id: 'ld-102',
      name: 'Rohan Sharma',
      phone: '+91 98765 22334',
      email: 'rohan.sharma@techcorp.io',
      property: 'Aparna Gated Community Villa #42',
      agentAssigned: 'Prestigio Luxury Infra',
      requestedDate: '2026-10-05 at 03:30 PM',
      intentScore: '🔥 HOT (91/100)',
      status: 'CONFIRMED',
    },
    {
      id: 'ld-103',
      name: 'Kavita Menon',
      phone: '+91 98765 66778',
      email: 'kavita.m@gmail.com',
      property: 'High-Rise Office Suite 402',
      agentAssigned: 'Unassigned (General Pool)',
      requestedDate: '2026-10-03 at 10:00 AM',
      intentScore: '⚡ WARM (72/100)',
      status: 'PENDING_AGENT',
    },
  ]);

  const handleAssignAgent = (id: string) => {
    setLeadsList(
      leadsList.map((l) => (l.id === id ? { ...l, agentAssigned: 'Vikram Malhotra (Assigned by Admin)', status: 'CONFIRMED' } : l))
    );
  };

  const filtered = leadsList.filter((l) => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.property.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Centralized Lead & Viewing Desk</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Buyer Inquiries & Viewing Slots</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Oversee inbound site-visit bookings, assign unallocated leads to top certified agents, and track conversion SLAs.</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-white max-w-md w-full">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search buyer name, property title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs w-full text-white placeholder-slate-500 font-medium"
          />
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Buyer Lead Info</th>
                <th className="p-4">Target Property</th>
                <th className="p-4">Intent Score</th>
                <th className="p-4">Viewing Schedule</th>
                <th className="p-4">Assigned Agent Desk</th>
                <th className="p-4 text-right">Admin SLA Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850 transition">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{item.name}</div>
                    <div className="text-[11px] text-slate-400 font-semibold">{item.phone} • {item.email}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-300">{item.property}</td>
                  <td className="p-4 font-black text-amber-400 text-xs">{item.intentScore}</td>
                  <td className="p-4 font-bold text-slate-300 flex items-center gap-1.5 pt-6">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> {item.requestedDate}
                  </td>
                  <td className="p-4 font-semibold text-slate-400">{item.agentAssigned}</td>
                  <td className="p-4 text-right space-x-2">
                    {item.status === 'PENDING_AGENT' && (
                      <button
                        onClick={() => handleAssignAgent(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                      >
                        Assign Top Agent
                      </button>
                    )}
                    <a
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${item.name}, confirming your viewing request for ${item.property}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-bold text-xs inline-block"
                    >
                      WhatsApp Buyer
                    </a>
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
