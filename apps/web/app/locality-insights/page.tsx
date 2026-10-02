'use client';

import React, { useState } from 'react';
import { Badge, Button, Card } from '@estateflow/ui';
import { formatNumber } from '@estateflow/ui';
import { MapPin, TrendingUp, Compass, Award, Building, Shield, ChevronRight } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface LocalityDetail {
  name: string;
  avgSqFtPrice: number;
  fiveYearCagr: number;
  rentalYield: number;
  liveProjectsCount: number;
  upcomingInfrastructure: string[];
  schoolHospitalScore: number;
  livabilityIndex: number;
  topBuilders: string[];
  description: string;
}

const LOCALITY_DATA: Record<string, LocalityDetail> = {
  'Neopolis - Kokapet': {
    name: 'Neopolis (Kokapet)',
    avgSqFtPrice: 11800,
    fiveYearCagr: 14.8,
    rentalYield: 4.2,
    liveProjectsCount: 18,
    upcomingInfrastructure: ['Trumpet Interchange to ORR Exit 1', 'Neopolis 100ft Masterplan Expressways', 'Upcoming Multi-Specialty Health City'],
    schoolHospitalScore: 9.5,
    livabilityIndex: 9.6,
    topBuilders: ['My Home Group', 'Rajapushpa Properties', 'Prestige Group'],
    description: 'Neopolis is Hyderabad’s prime ultra-luxury high-density financial & residential skyscraper district featuring 45 to 55-floor landmark towers.',
  },
  'Financial District': {
    name: 'Financial District (Nanakramguda)',
    avgSqFtPrice: 10500,
    fiveYearCagr: 12.4,
    rentalYield: 4.8,
    liveProjectsCount: 24,
    upcomingInfrastructure: ['Phase 2 Metro Extension to Airport', 'Link Road 10 to Waverock', 'Underground Utility Duct Network'],
    schoolHospitalScore: 9.2,
    livabilityIndex: 9.4,
    topBuilders: ['Aaparana Constructions', 'Sumadhura Group', 'Incor Infrastructure'],
    description: 'Home to tech giants Microsoft, Amazon, Wipro, and WaveRock tech parks. Highest rental demand from IT professionals.',
  },
  'Kondapur': {
    name: 'Kondapur & Botanical Garden',
    avgSqFtPrice: 8900,
    fiveYearCagr: 11.2,
    rentalYield: 4.5,
    liveProjectsCount: 32,
    upcomingInfrastructure: ['Kothaguda Flyover Expansion', 'Botanical Garden Eco-Park Trail', 'Heritage Food Street & High Street Malls'],
    schoolHospitalScore: 9.4,
    livabilityIndex: 9.3,
    topBuilders: ['Candeur Developers', 'SBR Group', 'Vasavi Group'],
    description: 'Vibrant, established residential hub situated between Hitec City and Gachibowli with premier schools, hospitals, and dining.',
  },
  'Tellapur': {
    name: 'Tellapur & Kollur SEZ',
    avgSqFtPrice: 7400,
    fiveYearCagr: 16.2,
    rentalYield: 3.9,
    liveProjectsCount: 29,
    upcomingInfrastructure: ['Radial Road 7 Widening to 150ft', 'Tellapur Technoport SEZ Park', 'ORR Exit 2 Direct Ramp'],
    schoolHospitalScore: 8.8,
    livabilityIndex: 8.9,
    topBuilders: ['Aliens Space Station', 'Fortune Green Homes', 'My Home Sayuk'],
    description: 'Fastest growing villa & gated community corridor offering high capital appreciation and expansive green townships.',
  },
};

export default function LocalityInsightsPage() {
  const [selectedLocalityKey, setSelectedLocalityKey] = useState<string>('Neopolis - Kokapet');
  const loc = LOCALITY_DATA[selectedLocalityKey];

  const handleWhatsAppLocalityReport = () => {
    const text = `Hi EstateFlow Advisory! Please share the 2026 Locality Price Trends & Investment Advisory PDF for *${loc.name}*.`;
    const url = buildWhatsAppLink({ customMessage: text });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 border-b border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <Badge variant="emerald" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            📊 Micro-Market Data & Price CAGR Intelligence
          </Badge>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Locality Infrastructure & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
              5-Year Price Growth Heatmap
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Data-backed investment insights for Hyderabad’s highest-growth micro-markets. Compare capital appreciation, rental yield, upcoming infrastructure, and livability scores.
          </p>

          {/* LOCALITY SELECTOR CHIPS */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2 text-xs font-bold">
            {Object.keys(LOCALITY_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedLocalityKey(key)}
                className={`px-4 py-2 rounded-2xl transition-all border ${
                  selectedLocalityKey === key
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                📍 {key}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALITY DETAILS & METRICS */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* METRICS HEADER CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-5 bg-slate-950 border-slate-800 rounded-3xl text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Price / sq.ft</span>
            <p className="text-2xl font-black text-emerald-400">₹{formatNumber(loc.avgSqFtPrice)}</p>
            <span className="text-[10px] text-slate-500 font-semibold block">Super Built-up Rate</span>
          </Card>

          <Card className="p-5 bg-slate-950 border-slate-800 rounded-3xl text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">5-Year CAGR Price Growth</span>
            <p className="text-2xl font-black text-amber-300">+{loc.fiveYearCagr}% p.a.</p>
            <span className="text-[10px] text-slate-500 font-semibold block">Historical Trend</span>
          </Card>

          <Card className="p-5 bg-slate-950 border-slate-800 rounded-3xl text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gross Rental Yield</span>
            <p className="text-2xl font-black text-teal-300">{loc.rentalYield}% p.a.</p>
            <span className="text-[10px] text-slate-500 font-semibold block">Annual Rental Income</span>
          </Card>

          <Card className="p-5 bg-slate-950 border-slate-800 rounded-3xl text-center space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Livability Index</span>
            <p className="text-2xl font-black text-white">{loc.livabilityIndex} / 10</p>
            <span className="text-[10px] text-slate-500 font-semibold block">Infra & Amenities Score</span>
          </Card>
        </div>

        {/* DETAILED CONTENT MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: DESCRIPTION & UPCOMING INFRA */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-7 bg-slate-950 border-slate-800 rounded-3xl space-y-5">
              <h3 className="text-xl font-black text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>{loc.name} Micro-Market Profile</span>
                <Badge variant="emerald" className="font-bold text-xs">{loc.liveProjectsCount} Active Gated Communities</Badge>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {loc.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest">🚀 Upcoming Infrastructure Projects</h4>
                <div className="space-y-2">
                  {loc.upcomingInfrastructure.map((infra, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                      <span className="text-emerald-400">⚡</span>
                      <span>{infra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: TOP DEVELOPERS & WHATSAPP REPORT ACTION */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-7 bg-slate-950 border-slate-800 rounded-3xl space-y-5">
              <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3">Top Grade-A Developers in Area</h3>

              <div className="space-y-2">
                {loc.topBuilders.map((builder, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-extrabold text-teal-300 flex items-center justify-between">
                    <span>🏢 {builder}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">RERA Approved</span>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                className="w-full font-black text-xs py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl"
                onClick={handleWhatsAppLocalityReport}
              >
                💬 Get Full {loc.name} Investment Report via WhatsApp →
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
