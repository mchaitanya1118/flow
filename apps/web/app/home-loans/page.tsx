'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal, formatNumber } from '@estateflow/ui';

export default function HomeLoansPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [tenureYears, setTenureYears] = useState(20);
  const [selectedBank, setSelectedBank] = useState<any | null>(null);

  // Maximum EMI eligible = 50% of monthly income minus existing EMIs
  const maxEligibleEmi = Math.max(0, monthlyIncome * 0.5 - existingEmi);
  const annualRate = 8.5 / 12 / 100;
  const totalMonths = tenureYears * 12;
  const maxLoanAmount = Math.round(
    (maxEligibleEmi * (Math.pow(1 + annualRate, totalMonths) - 1)) /
      (annualRate * Math.pow(1 + annualRate, totalMonths))
  );

  const bankRates = [
    { name: 'HDFC Bank', rate: '8.40% - 8.90%', maxLtv: '80% LTV', processFee: '0.50% (Max ₹3,000)', logo: '🏦' },
    { name: 'ICICI Bank', rate: '8.50% - 9.00%', maxLtv: '85% LTV', processFee: '0.50% (Max ₹3,500)', logo: '🏛️' },
    { name: 'State Bank of India (SBI)', rate: '8.35% - 8.75%', maxLtv: '90% LTV', processFee: 'Zero Processing Fee', logo: '💳' },
    { name: 'Axis Bank', rate: '8.55% - 9.10%', maxLtv: '80% LTV', processFee: '₹10,000 Flat', logo: '🏢' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            💳 Instant Home Loan Pre-Approval Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Calculate Home Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Eligibility & Bank Rates</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Compare top Indian bank interest rates, estimate maximum loan eligibility, and get pre-approved in under 24 hours.
          </p>
        </div>
      </section>

      {/* LOAN CALCULATOR & BANK RATES */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        {/* ELIGIBILITY WIDGET CARD */}
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Monthly Income & EMI Inputs</h3>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Gross Monthly Income (₹)</label>
                <input
                  type="range"
                  min={30000}
                  max={500000}
                  step={10000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-sm font-black text-slate-900">₹{formatNumber(monthlyIncome)} / month</span>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Existing Monthly EMIs (₹)</label>
                <input
                  type="range"
                  min={0}
                  max={150000}
                  step={5000}
                  value={existingEmi}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-sm font-black text-slate-900">₹{formatNumber(existingEmi)} / month</span>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Loan Tenure (Years)</label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white space-y-4 text-center">
            <Badge variant="emerald" className="font-bold">Estimated Loan Capacity</Badge>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Max Loan Amount Eligible</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              ₹{(maxLoanAmount / 10000000).toFixed(2)} Crore
            </span>
            <p className="text-xs text-slate-300 font-medium">Max Monthly EMI: ₹{formatNumber(Math.round(maxEligibleEmi))}</p>

            <Button variant="primary" size="lg" className="w-full font-bold text-xs py-3 shadow-lg" onClick={() => alert('Pre-approval application initiated!')}>
              Apply Instant Bank Pre-Approval →
            </Button>
          </div>
        </Card>

        {/* BANK INTEREST RATE COMPARISON */}
        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <h3 className="font-extrabold text-slate-900 text-lg">Bank Interest Rate Matrix (August 2026)</h3>
            <Badge variant="emerald" className="font-bold">✓ RBI Repo Rate Synchronized</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bankRates.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{b.logo}</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">{b.name}</h4>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-bold block">Interest Rate</span>
                  <span className="font-black text-emerald-600 text-base">{b.rate}</span>
                </div>

                <div className="text-[11px] text-slate-600 font-semibold space-y-1 pt-1 border-t border-slate-200">
                  <p>LTV Ratio: <strong>{b.maxLtv}</strong></p>
                  <p>Processing: <strong>{b.processFee}</strong></p>
                </div>

                <Button variant="outline" size="sm" className="w-full font-bold text-xs border-slate-300" onClick={() => setSelectedBank(b)}>
                  Select Bank →
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* APPLY BANK PRE-APPROVAL MODAL */}
      <Modal isOpen={!!selectedBank} onClose={() => setSelectedBank(null)} title={`Apply Pre-Approval — ${selectedBank?.name}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Submit your pre-approval application for <strong>{selectedBank?.name}</strong> at interest rates from {selectedBank?.rate}.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Pre-approval submitted to ${selectedBank?.name}! Reference EF-LOAN-881.`); setSelectedBank(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="PAN Card Number" placeholder="ABCDE1234F" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Submit Pre-Approval Application →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
