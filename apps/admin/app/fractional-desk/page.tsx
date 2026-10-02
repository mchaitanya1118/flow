'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Coins,
  TrendingUp,
  Users,
  Building,
  CheckCircle,
  Plus,
  Percent,
} from 'lucide-react';

export default function FractionalTokensPage() {
  const [tokens] = useState([
    {
      id: 'tok-1',
      propertyName: 'Financial District Grade-A Tech Suite (Floor 8)',
      assetValuation: '₹18.5 Cr',
      ticketSize: '₹10.0 Lakhs',
      annualYield: '8.8% p.a.',
      fundedPercent: 82,
      investorsCount: 148,
      status: 'FUNDING_OPEN',
    },
    {
      id: 'tok-2',
      propertyName: 'Kokapet Commercial Retail Hub (Anchor Lease)',
      assetValuation: '₹12.0 Cr',
      ticketSize: '₹5.0 Lakhs',
      annualYield: '9.2% p.a.',
      fundedPercent: 100,
      investorsCount: 240,
      status: 'FULLY_FUNDED',
    },
    {
      id: 'tok-3',
      propertyName: 'Jubilee Hills Luxury Penthouse Co-ownership',
      assetValuation: '₹8.5 Cr',
      ticketSize: '₹15.0 Lakhs',
      annualYield: '7.5% p.a.',
      fundedPercent: 45,
      investorsCount: 32,
      status: 'FUNDING_OPEN',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Tokenized Commercial Yield Desk</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Fractional Real Estate Tokens & Yields</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Manage fractional commercial ownership pools, minimum token entry tickets, and quarterly rental yield distributions.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => alert('Launch Tokenized Fractional Property Pool...')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Fractional Pool</span>
        </Button>
      </div>

      {/* TOKENS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tokens.map((tok) => (
          <div key={tok.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant={tok.status === 'FULLY_FUNDED' ? 'emerald' : 'amber'}>
                  {tok.status}
                </Badge>
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> {tok.annualYield}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{tok.propertyName}</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Asset Valuation: <strong className="text-white">{tok.assetValuation}</strong></p>
              </div>

              {/* FUNDED PROGRESS */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400">Pool Funded</span>
                  <span className="text-emerald-400 font-black">{tok.fundedPercent}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${tok.fundedPercent}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs font-bold">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Min Ticket</span>
                <span className="text-base font-black text-white">{tok.ticketSize}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase">Investors</span>
                <span className="text-base font-black text-teal-300">{tok.investorsCount} HNWs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
