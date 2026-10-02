'use client';

import React, { useState, useMemo } from 'react';
import { Card, Badge, Button, Input, formatNumber } from '@estateflow/ui';

export default function CommercialYieldModelerPage() {
  const [carpetArea, setCarpetArea] = useState(5000); // 5,000 sq.ft
  const [rentPerSqFt, setRentPerSqFt] = useState(85); // ₹85/sq.ft/mo
  const [assetPurchasePrice, setAssetPurchasePrice] = useState(65000000); // ₹6.5 Cr
  const [escalationPercent, setEscalationPercent] = useState(15); // 15% every 3 yrs
  const [camPerSqFt, setCamPerSqFt] = useState(12); // ₹12 CAM charges
  const [propertyTaxYearly, setPropertyTaxYearly] = useState(150000);

  const model = useMemo(() => {
    const grossMonthlyRent = carpetArea * rentPerSqFt;
    const grossYearlyRent = grossMonthlyRent * 12;
    const yearlyCamOutflow = carpetArea * camPerSqFt * 12;
    const netYearlyIncome = Math.max(0, grossYearlyRent - propertyTaxYearly - yearlyCamOutflow * 0.1);

    const grossYield = assetPurchasePrice > 0 ? (grossYearlyRent / assetPurchasePrice) * 100 : 0;
    const netYield = assetPurchasePrice > 0 ? (netYearlyIncome / assetPurchasePrice) * 100 : 0;

    // 9-Year Projection Table
    const projections = [];
    let currentRentRate = rentPerSqFt;

    for (let year = 1; year <= 9; year++) {
      if (year > 1 && (year - 1) % 3 === 0) {
        currentRentRate = currentRentRate * (1 + escalationPercent / 100);
      }
      const yrGrossRent = carpetArea * currentRentRate * 12;
      projections.push({
        year,
        ratePerSqFt: Math.round(currentRentRate),
        grossYearlyRent: Math.round(yrGrossRent),
        capRateYield: assetPurchasePrice > 0 ? ((yrGrossRent / assetPurchasePrice) * 100).toFixed(2) : '0',
      });
    }

    return {
      grossMonthlyRent: Math.round(grossMonthlyRent),
      grossYearlyRent: Math.round(grossYearlyRent),
      netYearlyIncome: Math.round(netYearlyIncome),
      grossYield: grossYield.toFixed(2),
      netYield: netYield.toFixed(2),
      projections,
    };
  }, [carpetArea, rentPerSqFt, assetPurchasePrice, escalationPercent, camPerSqFt, propertyTaxYearly]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3.5 py-1 text-xs uppercase tracking-widest font-black border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📊 Commercial Asset Yield & Cap-Rate Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Commercial Lease <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">Financial Modeler</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium">
            Model commercial office spaces, retail showrooms, and SEZ corporate leases. Calculate gross vs net cap rates, triennial 15% rent escalations, and 9-year cashflow projections.
          </p>
        </div>
      </section>

      {/* MODELER CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* INPUT CONTROLS */}
          <Card className="lg:col-span-2 p-6 sm:p-8 bg-slate-900 border-slate-800 rounded-3xl shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white">Commercial Asset Inputs</h3>
              <Badge variant="amber">Commercial Grade</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Total Carpet Area (Sq.Ft)</label>
                <Input
                  type="number"
                  value={carpetArea}
                  onChange={(e: any) => setCarpetArea(Number(e.target.value))}
                  className="bg-slate-950 text-white border-slate-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Rental Rate (₹/sq.ft/month)</label>
                <Input
                  type="number"
                  value={rentPerSqFt}
                  onChange={(e: any) => setRentPerSqFt(Number(e.target.value))}
                  className="bg-slate-950 text-white border-slate-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Asset Purchase Price (₹)</label>
                <Input
                  type="number"
                  value={assetPurchasePrice}
                  onChange={(e: any) => setAssetPurchasePrice(Number(e.target.value))}
                  className="bg-slate-950 text-white border-slate-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Escalation Clause (% every 3 yrs)</label>
                <Input
                  type="number"
                  value={escalationPercent}
                  onChange={(e: any) => setEscalationPercent(Number(e.target.value))}
                  className="bg-slate-950 text-white border-slate-800 text-xs font-bold"
                />
              </div>
            </div>

            {/* 9-YEAR PROJECTION TABLE */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-extrabold text-white text-sm">9-Year Triennial Escalation Projection</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-3">Lease Year</th>
                      <th className="p-3">Effective Rent/sq.ft</th>
                      <th className="p-3">Gross Yearly Rent</th>
                      <th className="p-3 text-right">Cap Rate Yield</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-semibold text-slate-300">
                    {model.projections.map((p) => (
                      <tr key={p.year} className="hover:bg-slate-950/60 transition-colors">
                        <td className="p-3 font-black text-white">Year {p.year}</td>
                        <td className="p-3 text-emerald-400">₹{p.ratePerSqFt}/sq.ft</td>
                        <td className="p-3 font-bold text-white">₹{formatNumber(p.grossYearlyRent)}</td>
                        <td className="p-3 text-right text-amber-400 font-black">{p.capRateYield}% p.a.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* FINANCIAL SUMMARY SIDEBAR */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-900 border-slate-800 rounded-3xl shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">Net Yield Benchmark</span>
                <h4 className="text-2xl font-black text-white">{model.netYield}% <span className="text-xs font-normal text-slate-400">p.a.</span></h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-bold">Gross Monthly Rent</span>
                  <span className="font-black text-white">₹{formatNumber(model.grossMonthlyRent)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-bold">Gross Annual Cashflow</span>
                  <span className="font-black text-emerald-400">₹{formatNumber(model.grossYearlyRent)}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-bold">Gross Rental Yield</span>
                  <span className="font-black text-amber-300">{model.grossYield}% p.a.</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full font-black text-xs py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
                onClick={() => alert(`Commercial Investment Prospectus exported for ${carpetArea} sq.ft asset!`)}
              >
                📥 Export Financial Prospectus PDF
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
