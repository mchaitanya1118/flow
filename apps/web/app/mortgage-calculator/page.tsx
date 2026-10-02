'use client';

import React, { useState, useMemo } from 'react';
import { Card, Badge, Button, Input, formatNumber } from '@estateflow/ui';

export default function MortgageCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(15000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [extraPaymentPerYear, setExtraPaymentPerYear] = useState(0);

  const calc = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    let emi = 0;
    if (loanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
      emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalRepayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalRepayment - loanAmount);

    // Amortization Schedule (Yearly Summary)
    const schedule = [];
    let balance = loanAmount;

    for (let year = 1; year <= Math.min(30, tenureYears); year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = Math.min(balance, emi - interestForMonth);
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      schedule.push({
        year,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        remainingBalance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      downPayment,
      loanAmount,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      principalPercentage: loanAmount > 0 ? Math.round((loanAmount / totalRepayment) * 100) : 0,
      schedule,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION WITH GRADIENT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚡ Precision Financial Simulator
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Smart Home Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">EMI & Amortization</span> Engine
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Simulate monthly repayments, compare down-payment scenarios, compute total interest savings under Section 24 IT Act, and view your complete 30-year repayment schedule.
          </p>

          {/* PRESET QUICK BUTTONS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Quick Amounts:</span>
            {[
              { label: '₹50 Lakhs', val: 5000000 },
              { label: '₹1 Crore', val: 10000000 },
              { label: '₹1.5 Crores', val: 15000000 },
              { label: '₹2.5 Crores', val: 25000000 },
              { label: '₹5 Crores', val: 50000000 },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setPropertyPrice(p.val)}
                className={`px-3 py-1 rounded-full font-bold transition-all border ${
                  propertyPrice === p.val
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT PANEL: SLIDERS & INPUT CONTROLS */}
          <Card className="lg:col-span-2 space-y-6 shadow-xl border-slate-200 bg-white/95 backdrop-blur-md p-6 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Loan Calculator Controls</h3>
                <p className="text-xs text-slate-500">Adjust sliders to model customized financing scenarios</p>
              </div>
              <Badge variant="emerald" className="font-bold">2026 Interest Rate Index</Badge>
            </div>

            {/* Property Price Slider */}
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">Total Property Value</label>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-sm">
                  <span className="text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="w-28 text-right font-black text-slate-900 text-sm focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min={1000000}
                max={100000000}
                step={500000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>₹10 L</span>
                <span>₹1 Cr</span>
                <span>₹5 Cr</span>
                <span>₹10 Cr</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="font-black text-slate-900 text-sm bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-700">
                  ₹{formatNumber(calc.downPayment)}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>40%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Interest Rate & Tenure inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Interest Rate (% p.a.)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e: any) => setInterestRate(Number(e.target.value))}
                  className="bg-white font-bold"
                />
                <p className="text-[11px] text-slate-400">Current repo-linked home loan rates range 8.3% – 9.2%</p>
              </div>

              <div className="space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Loan Tenure</label>
                <div className="flex gap-2 mb-2">
                  {[10, 15, 20, 25, 30].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`flex-1 py-1 rounded-md text-xs font-bold transition-all border ${
                        tenureYears === yr
                          ? 'bg-slate-900 text-white border-slate-900 shadow'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {yr}Y
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  value={tenureYears}
                  onChange={(e: any) => setTenureYears(Number(e.target.value))}
                  className="bg-white font-bold"
                />
              </div>
            </div>

            {/* AMORTIZATION SCHEDULE TABLE */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">30-Year Amortization Schedule</h4>
                <span className="text-xs text-emerald-600 font-bold">Principal vs Interest Breakdown</span>
              </div>

              <div className="overflow-x-auto max-h-72 overflow-y-auto rounded-xl border border-slate-200 shadow-inner bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-white sticky top-0 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3">Tenure Year</th>
                      <th className="p-3">Principal Paid</th>
                      <th className="p-3">Interest Paid</th>
                      <th className="p-3">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {calc.schedule.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">Year {row.year}</td>
                        <td className="p-3 font-bold text-emerald-600">₹{formatNumber(row.principalPaid)}</td>
                        <td className="p-3 font-bold text-amber-600">₹{formatNumber(row.interestPaid)}</td>
                        <td className="p-3 font-semibold text-slate-800">₹{formatNumber(row.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* RIGHT PANEL: EMI SUMMARY CARD & TAX BENEFIT HIGHLIGHTS */}
          <div className="space-y-6 sticky top-20">
            {/* DARK THEMED EMI RESULTS */}
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 shadow-2xl border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Monthly Home EMI</span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    ₹{formatNumber(calc.emi)}
                    <span className="text-xs text-slate-400 font-normal">/month</span>
                  </div>
                </div>
                <Badge variant="emerald" className="shadow-lg">Calculated</Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Principal Loan Amount</span>
                  <span className="font-extrabold text-white text-sm">₹{formatNumber(calc.loanAmount)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Total Interest Payable</span>
                  <span className="font-extrabold text-amber-400 text-sm">₹{formatNumber(calc.totalInterest)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Total Amount Payable</span>
                  <span className="font-extrabold text-white text-sm">₹{formatNumber(calc.totalRepayment)}</span>
                </div>
              </div>

              {/* DYNAMIC PROGRESS BAR */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Repayment Distribution</span>
                <div className="h-4 w-full rounded-full bg-amber-500 overflow-hidden flex shadow-inner border border-slate-800">
                  <div
                    style={{ width: `${calc.principalPercentage}%` }}
                    className="h-full bg-emerald-500 transition-all duration-500"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-extrabold pt-1">
                  <span className="text-emerald-400">● Principal ({calc.principalPercentage}%)</span>
                  <span className="text-amber-400">● Interest ({100 - calc.principalPercentage}%)</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full py-3.5 shadow-lg shadow-emerald-600/30 font-bold text-sm"
                onClick={() => alert('Home loan pre-approval request submitted! An advisor will reach out to you.')}
              >
                Apply for Home Loan Approval →
              </Button>
            </div>

            {/* TAX SAVINGS INFORMATIONAL CARD */}
            <Card className="p-5 space-y-3 bg-white border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span>🛡️</span> Income Tax Exemptions (Section 24 & 80C)
              </h4>
              <ul className="text-xs space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Section 24(b):</strong> Claim up to ₹2 Lakhs tax deduction on home loan interest paid annually.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Section 80C:</strong> Claim up to ₹1.5 Lakhs tax deduction on principal repayment.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
