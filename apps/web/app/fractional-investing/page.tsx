'use client';

import React, { useState } from 'react';
import { Badge, Button, Card, Input } from '@estateflow/ui';
import { formatNumber } from '@estateflow/ui';
import { TrendingUp, Building2, ShieldCheck, DollarSign, PieChart, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface FractionalAsset {
  id: string;
  title: string;
  location: string;
  category: 'Grade-A Office' | 'Warehousing & Logistics' | 'Retail Hub';
  tenant: string;
  totalAssetValue: number; // in INR
  minInvestment: number;
  expectedYield: number; // %
  projectedIrr: number; // %
  occupancyRate: number; // %
  waltYears: number; // Weighted Average Lease Expiry
  image: string;
  fundedPercentage: number;
}

const DEMO_FRACTIONAL_ASSETS: FractionalAsset[] = [
  {
    id: 'frac-01',
    title: 'Cyber Towers Grade-A Tech Park (Tower B)',
    location: 'Hitec City, Hyderabad',
    category: 'Grade-A Office',
    tenant: 'Fortune 500 Tech MNC (15-yr Lease)',
    totalAssetValue: 450000000,
    minInvestment: 10000,
    expectedYield: 8.8,
    projectedIrr: 14.5,
    occupancyRate: 100,
    waltYears: 8.2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    fundedPercentage: 84,
  },
  {
    id: 'frac-02',
    title: 'Neopolis Fulfillment & Logistics Park',
    location: 'Kokapet - ORR Exit 1, Hyderabad',
    category: 'Warehousing & Logistics',
    tenant: 'Top E-Commerce Logistics Giant',
    totalAssetValue: 280000000,
    minInvestment: 25000,
    expectedYield: 9.4,
    projectedIrr: 16.2,
    occupancyRate: 98,
    waltYears: 6.5,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    fundedPercentage: 62,
  },
  {
    id: 'frac-03',
    title: 'Financial District High Street Retail Plaza',
    location: 'Financial District, Nanakramguda',
    category: 'Retail Hub',
    tenant: 'Starbucks, McDonald\'s & Premium Banks',
    totalAssetValue: 320000000,
    minInvestment: 50000,
    expectedYield: 8.2,
    projectedIrr: 13.8,
    occupancyRate: 100,
    waltYears: 9.0,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    fundedPercentage: 91,
  },
];

export default function FractionalInvestingPage() {
  const [investmentAmount, setInvestmentAmount] = useState<number>(50000);
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [selectedAsset, setSelectedAsset] = useState<FractionalAsset>(DEMO_FRACTIONAL_ASSETS[0]);
  const [investorCount, setInvestorCount] = useState<number>(1420);

  // ROI Calculations
  const annualYieldEarned = Math.round((investmentAmount * selectedAsset.expectedYield) / 100);
  const monthlyPayout = Math.round(annualYieldEarned / 12);
  const totalYieldOverTerm = annualYieldEarned * holdingYears;
  
  // Capital appreciation estimated at ~6% per annum
  const estimatedAppreciation = Math.round(investmentAmount * (Math.pow(1.06, holdingYears) - 1));
  const totalEstimatedReturns = totalYieldOverTerm + estimatedAppreciation;
  const netMaturityValue = investmentAmount + totalEstimatedReturns;

  const handleWhatsAppInvest = (asset: FractionalAsset) => {
    const text = `Hi EstateFlow Institutional Team! I want to invest ₹${formatNumber(investmentAmount)} in fractional asset *${asset.title}* (${asset.category}) with expected ${asset.expectedYield}% annual yield. Please share SPV agreement & prospectus.`;
    const url = buildWhatsAppLink({ customMessage: text });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 border-b border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="emerald" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              ⚡ SEBI Regulated SPV Framework
            </Badge>
            <Badge variant="amber" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/30">
              💎 Grade-A Institutional Commercial Assets
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Fractional Real Estate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
              Invest from ₹10,000 & Earn 8-10% Yield
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Co-own pre-leased IT tech parks, fulfillment warehouses, and high-street retail plazas leased to Fortune 500 tenants. Receive monthly rental distributions directly into your bank account.
          </p>

          {/* KEY METRICS BANNER */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Rental Yield</span>
              <p className="text-2xl font-black text-emerald-400">8.2% - 9.5% p.a.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Target Net IRR</span>
              <p className="text-2xl font-black text-teal-300">14.0% - 16.5%</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payout Frequency</span>
              <p className="text-2xl font-black text-amber-300">Monthly Direct</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Investors</span>
              <p className="text-2xl font-black text-white">{formatNumber(investorCount)}+</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SECTION: ASSET SHOWCASE & CALCULATOR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* INTERACTIVE ROI CALCULATOR SECTION */}
        <Card className="p-8 bg-slate-950 border-slate-800 rounded-3xl shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Returns Simulator
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Calculate Your Passive Rental Income & IRR</h2>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Asset Selected: <span className="font-bold text-white">{selectedAsset.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SLIDERS COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              {/* INVESTMENT AMOUNT SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label className="text-slate-300">Your Investment Capital</label>
                  <span className="text-xl font-black text-emerald-400">₹{formatNumber(investmentAmount)}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={2500000}
                  step={10000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>Min ₹10,000</span>
                  <span>₹5 Lakh</span>
                  <span>₹25 Lakh</span>
                </div>
              </div>

              {/* HOLDING YEARS SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <label className="text-slate-300">Target Holding Period</label>
                  <span className="text-xl font-black text-amber-300">{holdingYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* ASSET SELECTOR CHIPS */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Select Pre-Leased Commercial Property</label>
                <div className="space-y-2">
                  {DEMO_FRACTIONAL_ASSETS.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                        selectedAsset.id === asset.id
                          ? 'bg-slate-800 border-emerald-500/60 shadow-lg text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-white text-xs">{asset.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{asset.tenant} • {asset.expectedYield}% Yield</p>
                      </div>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                        {asset.expectedYield}% p.a.
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RETURNS SUMMARY CARD */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>

                <div className="space-y-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Passive Cash Flow</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-emerald-400">₹{formatNumber(monthlyPayout)}</span>
                    <span className="text-xs text-slate-400 font-bold">/ month</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Deposited on 1st of every month via ECS/ACH</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Rental Payout ({holdingYears} yrs)</span>
                    <span className="text-lg font-black text-white">₹{formatNumber(totalYieldOverTerm)}</span>
                  </div>
                  <div className="space-y-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">Est. Asset Appreciation</span>
                    <span className="text-lg font-black text-teal-300">₹{formatNumber(estimatedAppreciation)}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-300 block uppercase">Net Projected Maturity Value</span>
                    <span className="text-2xl font-black text-white">₹{formatNumber(netMaturityValue)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 block">+{((totalEstimatedReturns / investmentAmount) * 100).toFixed(1)}% ROI</span>
                    <span className="text-[10px] text-slate-400 font-bold">Total Gain</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full font-black text-xs py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl shadow-emerald-900/40"
                  onClick={() => handleWhatsAppInvest(selectedAsset)}
                >
                  💬 Inquire & Reserve Tokens via WhatsApp →
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* LIVE ASSET SHOWCASE GRID */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-black text-white">Institutional Grade-A Opportunities</h3>
              <p className="text-xs text-slate-400">100% Verified, Pre-leased Commercial Properties with Institutional Tenants</p>
            </div>
            <Badge variant="emerald" className="font-bold">✓ Full Legal & Title Due Diligence Completed</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_FRACTIONAL_ASSETS.map((asset) => (
              <Card key={asset.id} className="bg-slate-950 border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                    <img src={asset.image} alt={asset.title} className="h-full w-full object-cover" />
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-white border border-slate-700 uppercase tracking-wider">
                      {asset.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-black shadow-md">
                      {asset.expectedYield}% Yield
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-black text-white text-base line-clamp-1">{asset.title}</h4>
                      <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <span className="text-emerald-400">📍</span> {asset.location}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Tenant Profile</span>
                      <span className="font-extrabold text-teal-300 block leading-tight">{asset.tenant}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Occupancy</span>
                        <span className="text-white font-black">{asset.occupancyRate}%</span>
                      </div>
                      <div className="border-l border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Lease WALT</span>
                        <span className="text-amber-300 font-black">{asset.waltYears} Yrs</span>
                      </div>
                    </div>

                    {/* FUNDING PROGRESS BAR */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Subscription Funded</span>
                        <span className="text-emerald-400">{asset.fundedPercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${asset.fundedPercentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    variant="primary"
                    className="w-full font-bold text-xs py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    onClick={() => handleWhatsAppInvest(asset)}
                  >
                    View SPV Prospectus & Invest →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
