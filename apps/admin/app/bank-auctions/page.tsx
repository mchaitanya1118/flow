'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Landmark,
  ShieldCheck,
  Plus,
  Search,
  Calendar,
  DollarSign,
  Gavel,
  CheckCircle,
} from 'lucide-react';

export default function BankAuctionsPage() {
  const [auctions, setAuctions] = useState([
    {
      id: 'auc-1',
      title: '3 BHK Luxury Apartment (Bank Foreclosure)',
      bankName: 'State Bank of India (SARFAESI Desk)',
      locality: 'Financial District, Gachibowli',
      reservePrice: '₹1.85 Cr',
      marketValuation: '₹2.65 Cr',
      discountPercent: '30% BELOW MARKET',
      auctionDate: '2026-10-14 at 11:00 AM',
      registeredBidders: 18,
      status: 'REGISTRATION_OPEN',
    },
    {
      id: 'auc-2',
      title: 'Independent Triplex Gated Villa',
      bankName: 'HDFC Bank Asset Recovery',
      locality: 'Jubilee Hills',
      reservePrice: '₹4.90 Cr',
      marketValuation: '₹7.20 Cr',
      discountPercent: '32% BELOW MARKET',
      auctionDate: '2026-10-18 at 02:00 PM',
      registeredBidders: 24,
      status: 'REGISTRATION_OPEN',
    },
    {
      id: 'auc-3',
      title: 'Grade-A Commercial Office Floor (2,400 sqft)',
      bankName: 'ICICI Bank Stressed Asset Vault',
      locality: 'Kokapet Neopolis',
      reservePrice: '₹2.10 Cr',
      marketValuation: '₹3.10 Cr',
      discountPercent: '32% BELOW MARKET',
      auctionDate: '2026-09-29 at 10:00 AM',
      registeredBidders: 32,
      status: 'AUCTION_COMPLETED',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="amber" className="mb-1 font-bold">SARFAESI E-Auction Management</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Bank E-Auctions & SARFAESI Desk</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Manage SBI, HDFC, and ICICI bank foreclosed property auctions, reserve price limits, and registered bidder pools.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => alert('Add New Bank Foreclosure Listing...')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bank E-Auction</span>
        </Button>
      </div>

      {/* AUCTION TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Auction Asset & Locality</th>
                <th className="p-4">Institution Bank</th>
                <th className="p-4">Reserve Price</th>
                <th className="p-4">Discount vs Market</th>
                <th className="p-4">E-Auction Schedule</th>
                <th className="p-4">Registered Bidders</th>
                <th className="p-4 text-right">Desk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {auctions.map((auc) => (
                <tr key={auc.id} className="hover:bg-slate-850 transition">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{auc.title}</div>
                    <div className="text-[11px] text-slate-400 font-semibold">{auc.locality}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-300 flex items-center gap-1.5 pt-6">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" /> {auc.bankName}
                  </td>
                  <td className="p-4 font-black text-emerald-400 text-sm">{auc.reservePrice}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-black">
                      {auc.discountPercent}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-300 flex items-center gap-1 pt-6">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {auc.auctionDate}
                  </td>
                  <td className="p-4 font-black text-white text-sm">{auc.registeredBidders} Bidders</td>
                  <td className="p-4 text-right">
                    <Badge variant={auc.status === 'REGISTRATION_OPEN' ? 'emerald' : 'slate'}>
                      {auc.status}
                    </Badge>
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
