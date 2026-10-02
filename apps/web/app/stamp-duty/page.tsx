'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, formatNumber } from '@estateflow/ui';

export default function StampDutyPage() {
  const [propertyPrice, setPropertyPrice] = useState(15000000);
  const [buyerGender, setBuyerGender] = useState('MALE');
  const [propertyType, setPropertyType] = useState('APARTMENT');

  // Telangana Registration Rates:
  // Basic Stamp Duty: 4%
  // Transfer Duty: 1.5%
  // Registration Fee: 0.5%
  // Total: 6.0% of property value
  const stampDutyRate = 0.04;
  const transferDutyRate = 0.015;
  const registrationFeeRate = 0.005;

  const stampDutyVal = Math.round(propertyPrice * stampDutyRate);
  const transferDutyVal = Math.round(propertyPrice * transferDutyRate);
  const registrationFeeVal = Math.round(propertyPrice * registrationFeeRate);
  const totalOutlay = stampDutyVal + transferDutyVal + registrationFeeVal;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📜 Telangana Registration Outlay Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Stamp Duty & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Registration Fee Calculator</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Calculate exact government stamp duty, transfer duty, and sub-registrar fees for property registration in Telangana.
          </p>
        </div>
      </section>

      {/* STAMP DUTY CALCULATOR & BREAKDOWN */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* INPUTS */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Property Registration Parameters</h3>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Agreement / Market Value (₹)</label>
                <input
                  type="range"
                  min={2000000}
                  max={100000000}
                  step={1000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-sm font-black text-slate-900">₹{formatNumber(propertyPrice)} (₹{(propertyPrice / 10000000).toFixed(2)} Cr)</span>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Primary Buyer Ownership Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'MALE', label: 'Male Buyer' },
                    { id: 'FEMALE', label: 'Female Buyer' },
                    { id: 'JOINT', label: 'Joint Ownership' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setBuyerGender(g.id)}
                      className={`p-2.5 rounded-xl border text-xs font-black transition-all ${
                        buyerGender === g.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Property Classification</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                >
                  <option value="APARTMENT">Residential Apartment / Villa</option>
                  <option value="PLOT">Open Land Plot / Layout</option>
                  <option value="COMMERCIAL">Commercial Office / Retail Space</option>
                </select>
              </div>
            </div>
          </div>

          {/* OUTLAY SUMMARY */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-extrabold text-white text-base">Government Fee Breakdown</h4>
              <Badge variant="emerald" className="font-bold">6.0% Total Rate</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Basic Stamp Duty (4.0%)</span>
                <span className="font-extrabold text-white">₹{formatNumber(stampDutyVal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Transfer Duty (1.5%)</span>
                <span className="font-extrabold text-white">₹{formatNumber(transferDutyVal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Registration Fee (0.5%)</span>
                <span className="font-extrabold text-white">₹{formatNumber(registrationFeeVal)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Sub-Registrar Fee Outlay</span>
              <span className="text-3xl font-black text-emerald-400">₹{formatNumber(totalOutlay)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
