'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Select } from '@estateflow/ui';

export default function AnalyticsPage() {
  const [selectedLocality, setSelectedLocality] = useState('Kondapur');

  const analyticsData: Record<string, any> = {
    Kondapur: {
      currentAvgPrice: '₹9,850 / sq.ft',
      yoyAppreciation: '+14.2% YoY',
      rentalYield: '4.2% Annual Yield',
      avgQuarterlyGrowth: '+3.5%',
      topDemandBhk: '3 BHK Apartments',
      priceHistory: [
        { year: '2022', price: '₹7,200/sq.ft' },
        { year: '2023', price: '₹8,100/sq.ft' },
        { year: '2024', price: '₹8,900/sq.ft' },
        { year: '2025', price: '₹9,450/sq.ft' },
        { year: '2026', price: '₹9,850/sq.ft' },
      ],
      infraProjects: [
        'Kondapur Flyover Extension (Operational)',
        'Outer Ring Road Connectivity Ramp (Completed)',
        'Proposed Metro Line Phase II Station (Under Construction)',
      ],
    },
    Gachibowli: {
      currentAvgPrice: '₹11,500 / sq.ft',
      yoyAppreciation: '+16.8% YoY',
      rentalYield: '4.8% Annual Yield',
      avgQuarterlyGrowth: '+4.1%',
      topDemandBhk: '4 BHK Luxury Villas',
      priceHistory: [
        { year: '2022', price: '₹8,400/sq.ft' },
        { year: '2023', price: '₹9,200/sq.ft' },
        { year: '2024', price: '₹10,100/sq.ft' },
        { year: '2025', price: '₹10,900/sq.ft' },
        { year: '2026', price: '₹11,500/sq.ft' },
      ],
      infraProjects: [
        'US Consulate Expressway Corridor',
        'Biodiversity Park Underpass',
        'Gachibowli IT Financial Hub Extension',
      ],
    },
  };

  const current = analyticsData[selectedLocality] || analyticsData.Kondapur;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📊 Locality Price Intelligence
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Market Analytics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Price Trends</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Track historical price appreciation rates, rental yield benchmarks, and infrastructure developments across Hyderabad's prime localities.
          </p>

          {/* LOCALITY SELECTOR */}
          <div className="max-w-xs mx-auto pt-2">
            <Select
              value={selectedLocality}
              onChange={(e: any) => setSelectedLocality(e.target.value)}
              className="bg-white text-slate-900 font-bold text-xs shadow-lg"
              options={[
                { label: 'Kondapur, Hyderabad', value: 'Kondapur' },
                { label: 'Gachibowli, Hyderabad', value: 'Gachibowli' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ANALYTICS BODY */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* STATS MATRIX */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-md">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Average Rate</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">{current.currentAvgPrice}</span>
          </Card>

          <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-md">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Annual Growth</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600">{current.yoyAppreciation}</span>
          </Card>

          <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-md">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Gross Rental Yield</span>
            <span className="text-xl sm:text-2xl font-black text-amber-600">{current.rentalYield}</span>
          </Card>

          <Card className="p-5 space-y-1 bg-white border-slate-200 shadow-md">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Highest Demand</span>
            <span className="text-sm font-extrabold text-slate-800">{current.topDemandBhk}</span>
          </Card>
        </div>

        {/* 5-YEAR HISTORICAL PRICE PROGRESSION */}
        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          <div className="border-b border-slate-100 pb-4 flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">5-Year Price Appreciation Trajectory — {selectedLocality}</h3>
              <p className="text-xs text-slate-500">Historical sq.ft rate growth from 2022 to 2026</p>
            </div>
            <Badge variant="emerald" className="font-bold">✓ Verified Market Index</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {current.priceHistory.map((h: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <span className="text-xs font-bold text-slate-400 block">{h.year}</span>
                <span className="text-base font-black text-slate-900 block">{h.price}</span>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${60 + idx * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* INFRASTRUCTURE DEVELOPMENTS */}
        <Card className="p-6 sm:p-8 space-y-4 shadow-xl border-slate-200 bg-slate-900 text-white">
          <h3 className="font-extrabold text-white text-lg border-b border-slate-800 pb-3">Infrastructure Catalyst Driver Projects</h3>
          <div className="space-y-3 text-xs">
            {current.infraProjects.map((proj: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700/80">
                <span className="text-emerald-400 font-bold text-base">🏗️</span>
                <span className="font-bold text-slate-200">{proj}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
