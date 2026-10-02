'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input, formatNumber } from '@estateflow/ui';

export default function InventoryMatrixPage() {
  const [selectedTower, setSelectedTower] = useState('TOWER_A');
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);

  const towers = [
    { id: 'TOWER_A', name: 'Tower A — Sapphire Suites (36 Floors)' },
    { id: 'TOWER_B', name: 'Tower B — Emerald Residence (32 Floors)' },
    { id: 'TOWER_C', name: 'Tower C — Diamond Penthouses (40 Floors)' },
  ];

  const unitMatrix = [
    { number: '1401', bhk: '3 BHK', areaSqFt: 2150, facing: 'East Facing', price: 21200000, status: 'AVAILABLE' },
    { number: '1402', bhk: '3 BHK', areaSqFt: 2150, facing: 'West Facing', price: 21200000, status: 'BOOKED' },
    { number: '1403', bhk: '4 BHK', areaSqFt: 2850, facing: 'North Facing', price: 28100000, status: 'AVAILABLE' },
    { number: '1404', bhk: '4 BHK', areaSqFt: 2850, facing: 'East Facing', price: 28500000, status: 'RESERVED' },
    { number: '1501', bhk: '3 BHK', areaSqFt: 2150, facing: 'East Facing', price: 21300000, status: 'AVAILABLE' },
    { number: '1502', bhk: '3 BHK', areaSqFt: 2150, facing: 'West Facing', price: 21300000, status: 'AVAILABLE' },
    { number: '1503', bhk: '4 BHK', areaSqFt: 2850, facing: 'North Facing', price: 28300000, status: 'BOOKED' },
    { number: '1504', bhk: '4 BHK', areaSqFt: 2850, facing: 'East Facing', price: 28700000, status: 'AVAILABLE' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
            🏢 Builder Unit Matrix Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Live Township <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Unit Availability Matrix</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Select towers, inspect floor plans, verify unit facing direction, and lock booking advances in real-time.
          </p>
        </div>
      </section>

      {/* INVENTORY CONTAINER */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* TOWER SELECTOR */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {towers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTower(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedTower === t.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Reserved</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-400"></span> Booked</span>
          </div>
        </div>

        {/* UNIT MATRIX GRID */}
        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-lg">Unit Matrix & Pricing breakdown</h3>
            <Badge variant="emerald" className="font-bold">Realtime Builder Inventory API</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {unitMatrix.map((u) => (
              <div
                key={u.number}
                onClick={() => u.status === 'AVAILABLE' && setSelectedUnit(u)}
                className={`p-5 rounded-2xl border transition-all space-y-2 cursor-pointer ${
                  u.status === 'AVAILABLE'
                    ? 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-500 hover:shadow-lg'
                    : u.status === 'RESERVED'
                    ? 'border-amber-200 bg-amber-50/40 cursor-not-allowed'
                    : 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-black text-slate-900 text-base">Unit #{u.number}</span>
                  <Badge
                    variant={u.status === 'AVAILABLE' ? 'emerald' : u.status === 'RESERVED' ? 'amber' : 'slate'}
                    className="text-[10px] font-bold"
                  >
                    {u.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 font-semibold">{u.bhk} • {formatNumber(u.areaSqFt)} sq.ft</p>
                <p className="text-[11px] text-slate-500 font-medium">📍 {u.facing}</p>

                <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
                  <span className="font-extrabold text-slate-900 text-xs">₹{(u.price / 10000000).toFixed(2)} Cr</span>
                  {u.status === 'AVAILABLE' && (
                    <span className="text-emerald-600 font-bold text-xs hover:underline">Lock Unit →</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* UNIT TOKEN ADVANCE MODAL */}
      <Modal isOpen={!!selectedUnit} onClose={() => setSelectedUnit(null)} title={`Lock Booking Advance — Unit #${selectedUnit?.number}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Reserve <strong>Unit #{selectedUnit?.number} ({selectedUnit?.bhk})</strong> with an initial token advance of <strong>₹1,00,000</strong>.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Unit #${selectedUnit?.number} reserved successfully! Booking reference EF-UNIT-992.`); setSelectedUnit(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="PAN Card Number" placeholder="ABCDE1234F" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Pay Token Advance ₹1,00,000 →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
