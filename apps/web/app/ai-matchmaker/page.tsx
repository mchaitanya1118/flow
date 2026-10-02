'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button, Input, PropertyCard, formatNumber } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../lib/mockData';

export default function AIMatchmakerPage() {
  const router = useRouter();
  const [budget, setBudget] = useState(25000000); // 2.5 Cr
  const [locality, setLocality] = useState('Gachibowli');
  const [bhk, setBhk] = useState('3');
  const [intent, setIntent] = useState('BUY');
  const [possession, setPossession] = useState('READY');
  
  const [activeParams, setActiveParams] = useState({
    budget: 25000000,
    locality: 'Gachibowli',
    bhk: '3',
    intent: 'BUY',
    possession: 'READY',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setActiveParams({ budget, locality, bhk, intent, possession });
      setIsAnalyzing(false);
    }, 600);
  };

  const matchedProperties = useMemo(() => {
    return DEMO_PROPERTIES.map((prop, idx) => {
      let matchScore = 80 + ((idx * 7) % 15);
      if (prop.location.locality.toLowerCase().includes(activeParams.locality.toLowerCase())) matchScore += 8;
      if (prop.bedrooms === Number(activeParams.bhk)) matchScore += 6;
      if (prop.price <= activeParams.budget) matchScore += 5;
      matchScore = Math.min(99, Math.max(74, matchScore));

      return {
        ...prop,
        matchPercentage: matchScore,
        reasons: [
          prop.location.locality.toLowerCase().includes(activeParams.locality.toLowerCase()) ? '📍 100% Locality Match' : '📍 Neighboring Micro-Market',
          prop.bedrooms === Number(activeParams.bhk) ? `🛏️ ${activeParams.bhk} BHK Configuration` : '🛏️ Similar Spatial Layout',
          prop.price <= activeParams.budget ? '💰 Within Budget Cap' : '💰 Premium Asset Grade',
        ],
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [activeParams]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3.5 py-1 text-xs uppercase tracking-widest font-black border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            🤖 AI Algorithmic Property Matcher
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Find Your Ideal Home via <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">AI Neural Engine</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium">
            Specify your ideal home parameters and let EstateFlow's neural AI algorithm rank 12,000+ RERA-verified listings with precision match percentages.
          </p>
        </div>
      </section>

      {/* MATCHMAKER CONTROLS WIZARD */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-10">
        <Card className="p-6 sm:p-8 bg-slate-900 border-slate-800 rounded-3xl shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">Specify Your Home Preferences</h3>
              <p className="text-xs text-slate-400 font-medium">Fine-tune sliders and selectors to adjust neural match scoring</p>
            </div>
            <Badge variant="amber" className="font-extrabold">Instant AI Vector Ranking</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Target Locality */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Target Micro-Market</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Gachibowli">Gachibowli (Financial District)</option>
                <option value="Kokapet">Kokapet (Golden Mile)</option>
                <option value="Kondapur">Kondapur (IT Hub)</option>
                <option value="Jubilee Hills">Jubilee Hills (Luxury Sector)</option>
                <option value="Tellapur">Tellapur (Upcoming Township)</option>
              </select>
            </div>

            {/* BHK Preference */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">BHK Configuration</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="2">2 BHK Suite</option>
                <option value="3">3 BHK Skyline Flat</option>
                <option value="4">4+ BHK Triplex Villa</option>
              </select>
            </div>

            {/* Intent */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Transaction Purpose</label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="BUY">For End-Use Purchase</option>
                <option value="INVEST">For Capital Appreciation</option>
                <option value="RENT">For Monthly Rental</option>
              </select>
            </div>

            {/* Possession */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Possession Timeline</label>
              <select
                value={possession}
                onChange={(e) => setPossession(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="READY">Ready to Move In</option>
                <option value="UNDER_CONSTRUCTION">Under Construction (1-2 Yrs)</option>
              </select>
            </div>
          </div>

          {/* Budget Range Slider */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider text-[11px]">Maximum Budget Cap</span>
              <span className="text-emerald-400 font-black text-sm">₹{(budget / 10000000).toFixed(2)} Crore</span>
            </div>
            <input
              type="range"
              min={5000000}
              max={100000000}
              step={2500000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-extrabold">
              <span>₹50 Lakhs</span>
              <span>₹2.5 Crores</span>
              <span>₹5 Crores</span>
              <span>₹10 Crores</span>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full font-black text-xs py-4 bg-gradient-to-r from-emerald-500 via-teal-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-white shadow-xl shadow-emerald-900/40 rounded-xl flex items-center justify-center gap-2"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin text-base">⚡</span> Analyzing 12,450 RERA titles against neural model...
              </span>
            ) : (
              '⚡ Run Neural AI Match Analysis →'
            )}
          </Button>
        </Card>

        {/* AI MATCH RESULTS CONTAINER */}
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xl font-black text-white">Top AI Recommended Matches</h3>
              <p className="text-xs text-slate-400 font-semibold">Sorted by neural compatibility score for {activeParams.locality}</p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="font-bold text-xs border-slate-700 text-emerald-400 hover:bg-slate-800"
              onClick={() => alert(`AI Match Certificate exported for ${activeParams.locality} ${activeParams.bhk} BHK preference!`)}
            >
              📥 Download AI Match Certificate PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProperties.map((prop) => (
              <div key={prop.id} className="relative group space-y-2">
                {/* MATCH PERCENTAGE OVERLAY BADGE */}
                <div className="flex justify-between items-center px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-black">
                  <span className="text-emerald-400">🎯 {prop.matchPercentage}% AI Compatibility</span>
                  <span className="text-[10px] text-slate-400 font-bold">Top Verified Match</span>
                </div>

                <PropertyCard property={prop} />

                {/* MATCH REASONS PILLS */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-[11px] space-y-2">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Why This Matched:</span>
                  <div className="flex flex-wrap gap-1">
                    {prop.reasons.map((r, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-300 font-bold border border-slate-800 text-[10px]">
                        {r}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border-slate-700 mt-1"
                    onClick={() => router.push(`/property/${prop.slug}`)}
                  >
                    View Details & Floor Plan →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
