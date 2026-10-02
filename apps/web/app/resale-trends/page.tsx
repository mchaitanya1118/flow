'use client';

import React from 'react';
import { Card, Badge, Button } from '@estateflow/ui';
import { useRouter } from 'next/navigation';

export default function ResaleTrendsPage() {
  const router = useRouter();

  const microMarkets = [
    {
      locality: 'Gachibowli',
      cagr: '12.4% p.a.',
      avgRate: '₹9,800 / sq.ft',
      yield: '3.8% Rental Yield',
      catalysts: 'Metro Line Extension, Financial District Expansion',
    },
    {
      locality: 'Kokapet (Golden Mile)',
      cagr: '18.2% p.a.',
      avgRate: '₹10,500 / sq.ft',
      yield: '4.1% Rental Yield',
      catalysts: 'Neopolis SEZ Towers, Trump Tower Hyderabad',
    },
    {
      locality: 'Jubilee Hills',
      cagr: '8.6% p.a.',
      avgRate: '₹16,500 / sq.ft',
      yield: '2.9% Rental Yield',
      catalysts: 'Established Prime Luxury Belt, Zero Open Land Supply',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📈 10-Year Price Appreciation Predictor
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Resale Trends & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Micro-Market CAGR</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Data-backed historical appreciation trajectories and infrastructure growth catalysts across Hyderabad prime sectors.
          </p>
        </div>
      </section>

      {/* MICRO-MARKET MATRIX */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="space-y-6">
          {microMarkets.map((m, idx) => (
            <Card key={idx} className="p-6 sm:p-8 space-y-4 shadow-md hover:shadow-xl transition-all border-slate-200 bg-white">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{m.locality}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Average Current Rate: <strong>{m.avgRate}</strong></p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="emerald" className="font-extrabold text-xs">{m.cagr} 5-Yr CAGR</Badge>
                  <Badge variant="amber" className="font-extrabold text-xs">{m.yield}</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex justify-between items-center">
                <span>🚀 Growth Catalysts: <strong>{m.catalysts}</strong></span>
                <Button variant="primary" size="sm" className="font-bold text-xs" onClick={() => router.push('/search')}>
                  View Properties →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
