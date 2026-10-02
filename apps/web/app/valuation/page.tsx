'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, formatNumber } from '@estateflow/ui';

export default function ValuationPage() {
  const [locality, setLocality] = useState('Gachibowli');
  const [areaSqFt, setAreaSqFt] = useState(2400);
  const [propertyAge, setPropertyAge] = useState(2);
  const [bedrooms, setBedrooms] = useState(3);
  const [isCalculated, setIsCalculated] = useState(false);

  const baseRatePerSqFt: Record<string, number> = {
    Gachibowli: 9800,
    JubileeHills: 16500,
    Kondapur: 9200,
    BanjaraHills: 17200,
    Kokapet: 10500,
  };

  const currentRate = baseRatePerSqFt[locality] || 9800;
  const estimatedTotal = Math.round(areaSqFt * currentRate * (1 - propertyAge * 0.015));
  const estimatedRent = Math.round(estimatedTotal * 0.0032);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
            📊 AI Market Valuation Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Instant Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Valuation & Rent Estimate</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Get instant algorithmic market valuations based on recent registry transactions and micro-market appreciation trends.
          </p>
        </div>
      </section>

      {/* VALUATION ENGINE CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Property Parameters</h3>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Locality</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                >
                  <option value="Gachibowli">Gachibowli (Avg ₹9,800/sq.ft)</option>
                  <option value="JubileeHills">Jubilee Hills (Avg ₹16,500/sq.ft)</option>
                  <option value="Kondapur">Kondapur (Avg ₹9,200/sq.ft)</option>
                  <option value="BanjaraHills">Banjara Hills (Avg ₹17,200/sq.ft)</option>
                  <option value="Kokapet">Kokapet (Avg ₹10,500/sq.ft)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Super Built-up Area (Sq.Ft)</label>
                <input
                  type="range"
                  min={800}
                  max={6000}
                  step={100}
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-sm font-black text-slate-900">{formatNumber(areaSqFt)} sq.ft</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">Property Age (Years)</label>
                  <input
                    type="number"
                    value={propertyAge}
                    onChange={(e) => setPropertyAge(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 uppercase tracking-wider mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              <Button variant="primary" className="w-full font-bold py-3 text-xs shadow-md" onClick={() => setIsCalculated(true)}>
                Calculate AI Valuation →
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white space-y-4 text-center">
            <Badge variant="amber" className="font-bold">Algorithmic Valuation Output</Badge>
            
            <div className="space-y-1 pt-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Fair Market Price</span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                ₹{(estimatedTotal / 10000000).toFixed(2)} Crore
              </span>
              <p className="text-xs text-slate-300 font-medium">Rate: ₹{formatNumber(Math.round(estimatedTotal / areaSqFt))}/sq.ft</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
              <span className="font-bold block text-white">Estimated Rental Yield Benchmark</span>
              <span className="text-emerald-400 font-extrabold text-sm">₹{formatNumber(estimatedRent)} / month</span>
            </div>

            {isCalculated && (
              <Button variant="primary" className="w-full font-bold text-xs py-3 shadow-lg" onClick={() => alert('Official Certified Valuation Audit Report downloaded!')}>
                📥 Download Certified Audit PDF →
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
