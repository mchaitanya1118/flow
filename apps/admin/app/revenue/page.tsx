'use client';

import React from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Download,
  Building2,
  CheckCircle,
} from 'lucide-react';

export default function RevenueDeskPage() {
  const transactions = [
    {
      id: 'tx-901',
      agency: 'Prestigio Luxury Infra',
      plan: 'Builder Master Launch Package',
      amount: '₹2,50,000',
      date: '2026-10-01',
      status: 'SUCCESS',
      invoice: 'INV-2026-0941',
    },
    {
      id: 'tx-902',
      agency: 'Apex Prime Realty Gachibowli',
      plan: 'Certified Agent Monthly Pro',
      amount: '₹24,999',
      date: '2026-09-28',
      status: 'SUCCESS',
      invoice: 'INV-2026-0912',
    },
    {
      id: 'tx-903',
      agency: 'Aparna Heritage Infra',
      plan: 'Featured Corridor Banner (Kokapet)',
      amount: '₹1,20,000',
      date: '2026-09-25',
      status: 'SUCCESS',
      invoice: 'INV-2026-0899',
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Monetization & Billing Engine</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Payments, Subscriptions & Revenue Ledger</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Track platform subscription revenues, builder sponsorship upgrades, and automated tax invoices.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => alert('Exporting complete GST financial ledger...')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export GST Financial Ledger</span>
        </Button>
      </div>

      {/* REVENUE SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Monthly Recurring Revenue (MRR)</span>
          <div className="text-3xl font-black text-white">₹48,60,000</div>
          <span className="text-[11px] font-extrabold text-emerald-400 block">+18.4% vs last month</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Active Paid Agency Subscriptions</span>
          <div className="text-3xl font-black text-teal-400">142 Agencies</div>
          <span className="text-[11px] font-extrabold text-emerald-400 block">100% On-time Renewals</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Builder Featured Spotlights</span>
          <div className="text-3xl font-black text-amber-400">28 Active Towers</div>
          <span className="text-[11px] font-extrabold text-amber-300 block">Avg ₹1.8L per spotlight</span>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-extrabold text-white text-base">Recent Platform Transaction Stream</h3>
          <Badge variant="emerald" className="font-extrabold">RAZORPAY & STRIPE VERIFIED</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Customer Agency / Builder</th>
                <th className="p-4">Package / Upgrade</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850 transition">
                  <td className="p-4 font-extrabold text-white text-sm">{tx.agency}</td>
                  <td className="p-4 font-bold text-slate-300">{tx.plan}</td>
                  <td className="p-4 font-black text-emerald-400 text-sm">{tx.amount}</td>
                  <td className="p-4 font-semibold text-slate-400">{tx.date}</td>
                  <td className="p-4">
                    <Badge variant="emerald" className="font-extrabold flex items-center gap-1 w-fit">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> {tx.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Downloading Invoice ${tx.invoice}...`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
                    >
                      📄 {tx.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
