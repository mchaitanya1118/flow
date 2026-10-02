'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Bot,
  Sparkles,
  Save,
  CheckCircle2,
  TrendingUp,
  Cpu,
  MapPin,
  RefreshCw,
} from 'lucide-react';

export default function AiEngineTuningPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [modelActive, setModelActive] = useState('v3.4-HYD-RERA-ML');

  // Model Coefficients
  const [floorHeightWeight, setFloorHeightWeight] = useState('1.025'); // +2.5% per 10 floors
  const [reraClearanceMultiplier, setReraClearanceMultiplier] = useState('1.12'); // +12% premium for verified title
  const [appreciationFactor, setAppreciationFactor] = useState('12.5'); // 12.5% YoY projected

  // Micro-market rates
  const [kokapetRate, setKokapetRate] = useState('10800');
  const [jubileeRate, setJubileeRate] = useState('14500');
  const [financialRate, setFinancialRate] = useState('9600');
  const [kondapurRate, setKondapurRate] = useState('8200');

  const handleDeployModel = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Machine Learning Control</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">AI Valuation Engine Model Tuning</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Fine-tune automated property valuation algorithms, RERA premium weights, and micro-market rate baselines powering the entry website.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            AI Valuation Model deployed to OpenSearch inference pipeline!
          </span>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-500 hover:text-white">✕</button>
        </div>
      )}

      <form onSubmit={handleDeployModel} className="space-y-8">
        {/* MODEL METRICS & VERSION STATUS */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Bot className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-black text-white text-base">Active Valuation Model Configuration</h3>
                <p className="text-xs text-slate-400 font-medium">Trained on 45,000+ historical Telangana land & apartment transactions</p>
              </div>
            </div>
            <Badge variant="emerald" className="font-mono text-xs font-bold px-3 py-1">
              MODEL: {modelActive}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-bold">
            <div className="space-y-2">
              <label className="text-slate-400 block font-bold">RERA Title Premium Weight</label>
              <input
                type="text"
                value={reraClearanceMultiplier}
                onChange={(e) => setReraClearanceMultiplier(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-emerald-400 font-black text-sm"
              />
              <span className="text-[11px] text-slate-500 font-normal">Adds +12% value boost for 100% verified TS-RERA title clearance.</span>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 block font-bold">Floor Rise Multiplier (per 10 floors)</label>
              <input
                type="text"
                value={floorHeightWeight}
                onChange={(e) => setFloorHeightWeight(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-teal-400 font-black text-sm"
              />
              <span className="text-[11px] text-slate-500 font-normal">Premium per floor elevation in high-rise towers.</span>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 block font-bold">Projected YoY Appreciation (% p.a.)</label>
              <input
                type="text"
                value={appreciationFactor}
                onChange={(e) => setAppreciationFactor(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-amber-400 font-black text-sm"
              />
              <span className="text-[11px] text-slate-500 font-normal">Default 1-Year growth projection for buyer estimates.</span>
            </div>
          </div>
        </div>

        {/* MICRO-MARKET BASE RATES */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h3 className="font-black text-white text-base">Micro-Market Baseline Rates (₹/sq.ft Super Built-up)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Kokapet Neopolis</span>
              <input
                type="text"
                value={kokapetRate}
                onChange={(e) => setKokapetRate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white font-black text-sm"
              />
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Jubilee Hills</span>
              <input
                type="text"
                value={jubileeRate}
                onChange={(e) => setJubileeRate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white font-black text-sm"
              />
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Financial District</span>
              <input
                type="text"
                value={financialRate}
                onChange={(e) => setFinancialRate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white font-black text-sm"
              />
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Kondapur IT Corridor</span>
              <input
                type="text"
                value={kondapurRate}
                onChange={(e) => setKondapurRate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white font-black text-sm"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-8 rounded-xl text-xs shadow-xl flex items-center gap-2"
        >
          <Cpu className="w-4 h-4" />
          <span>Deploy Model Weights to Live Valuation API</span>
        </Button>
      </form>
    </div>
  );
}
