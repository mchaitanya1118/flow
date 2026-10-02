'use client';

import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { Input } from './Input';
import { formatNumber } from '../utils';

export interface MortgageCalculatorWidgetProps {
  initialPrice?: number;
  className?: string;
}

export function MortgageCalculatorWidget({
  initialPrice = 10000000,
  className,
}: MortgageCalculatorWidgetProps): React.ReactElement {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const calc = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = Math.max(0, price - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = years * 12;

    let emi = 0;
    if (loanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
      emi =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalRepayment = emi * totalMonths;
    const totalInterest = Math.max(0, totalRepayment - loanAmount);

    return {
      downPayment,
      loanAmount,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
    };
  }, [price, downPaymentPercent, interestRate, years]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${formatNumber(val)}`;
  };

  return (
    <Card className={className}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 font-bold">🧮</div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Mortgage EMI Calculator</h3>
          <p className="text-xs text-slate-500">Estimate your monthly home loan repayments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          label="Property Price (₹)"
          type="number"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))}
        />
        <Input
          label="Down Payment (%)"
          type="number"
          value={downPaymentPercent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDownPaymentPercent(Number(e.target.value))}
        />
        <Input
          label="Interest Rate (% p.a.)"
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(Number(e.target.value))}
        />
        <Input
          label="Loan Tenure (Years)"
          type="number"
          value={years}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYears(Number(e.target.value))}
        />
      </div>

      <div className="rounded-xl bg-slate-900 text-white p-5 space-y-4">
        <div className="flex justify-between items-baseline border-b border-slate-800 pb-3">
          <span className="text-xs text-slate-400 font-medium">Monthly Home Loan EMI</span>
          <span className="text-2xl font-extrabold text-emerald-400">₹{formatNumber(calc.emi)}/mo</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded bg-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Loan Amount</span>
            <span className="font-bold text-white mt-1 block">{formatCurrency(calc.loanAmount)}</span>
          </div>
          <div className="p-2 rounded bg-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Total Interest</span>
            <span className="font-bold text-amber-400 mt-1 block">{formatCurrency(calc.totalInterest)}</span>
          </div>
          <div className="p-2 rounded bg-slate-800/60">
            <span className="text-slate-400 block text-[11px]">Total Payable</span>
            <span className="font-bold text-white mt-1 block">{formatCurrency(calc.totalRepayment)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
