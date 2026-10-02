'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button, Input, formatNumber } from '@estateflow/ui';

export default function PropertyAuctionsPage() {
  const router = useRouter();

  const [auctions] = useState([
    {
      id: 'auc-101',
      title: 'Distressed 3 BHK Skyline Apartment - SARFAESI Bank Sale',
      locality: 'Kondapur, Hyderabad',
      reservePrice: 9800000, // 98 Lakhs vs 1.45 Cr Market Price
      marketValue: 14500000,
      emdAmount: 980000, // 10% EMD
      auctionDate: '2026-09-15',
      bankName: 'State Bank of India',
      bidsCount: 14,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'auc-102',
      title: 'Gated Luxury Villa Bank Repossession Auction',
      locality: 'Gachibowli, Hyderabad',
      reservePrice: 22500000, // 2.25 Cr vs 3.25 Cr Market Price
      marketValue: 32500000,
      emdAmount: 2250000,
      auctionDate: '2026-09-18',
      bankName: 'HDFC Bank',
      bidsCount: 22,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    },
  ]);

  const [selectedAuction, setSelectedAuction] = useState<any | null>(null);
  const [bidAmount, setBidAmount] = useState('');

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bid of ₹${formatNumber(Number(bidAmount))} submitted for ${selectedAuction.title}! EMD Verification Confirmed.`);
    setSelectedAuction(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3.5 py-1 text-xs uppercase tracking-widest font-black border border-amber-500/30 bg-amber-500/10 text-amber-300">
            🔨 Bank E-Auction & SARFAESI Distressed Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Distressed Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-200">E-Auction Portal</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium">
            Bid on bank-repossessed residential & commercial assets under the SARFAESI Act at 20-35% below prevailing market valuation.
          </p>
        </div>
      </section>

      {/* AUCTION LISTINGS CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-xl font-black text-white">Active Verified Bank Auctions</h3>
          <Badge variant="emerald" className="font-extrabold">EMD Escrow Protected</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {auctions.map((auc) => (
            <Card key={auc.id} className="p-6 bg-slate-900 border-slate-800 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img src={auc.image} alt={auc.title} className="h-full w-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-lg">
                    🔥 32% Below Market Value
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-950/90 text-slate-300 font-bold text-xs backdrop-blur-md border border-slate-800">
                    🏦 {auc.bankName}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-black text-white">{auc.title}</h4>
                  <p className="text-xs font-bold text-slate-400">📍 {auc.locality}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Reserve Price</span>
                    <span className="font-black text-amber-400 text-sm">₹{formatNumber(auc.reservePrice)}</span>
                  </div>
                  <div className="border-x border-slate-800">
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Market Valuation</span>
                    <span className="font-bold text-slate-400 text-xs line-through">₹{formatNumber(auc.marketValue)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-extrabold uppercase block">10% EMD Token</span>
                    <span className="font-black text-emerald-400 text-xs">₹{formatNumber(auc.emdAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  variant="outline"
                  className="w-full font-bold text-xs border-slate-700 text-slate-200 hover:bg-slate-800"
                  onClick={() => alert(`Downloading Bank E-Auction Notice PDF for ${auc.title}...`)}
                >
                  📄 Download Tender PDF
                </Button>
                <Button
                  variant="primary"
                  className="w-full font-black text-xs py-3 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 shadow-lg"
                  onClick={() => {
                    setSelectedAuction(auc);
                    setBidAmount(String(auc.reservePrice + 100000));
                  }}
                >
                  🔨 Enter Bidding Room →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* BIDDING MODAL */}
      {selectedAuction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <Card className="w-full max-w-lg p-6 bg-slate-900 border-slate-800 rounded-3xl space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-black text-white text-base">Live E-Auction Bidding Room</h4>
              <button onClick={() => setSelectedAuction(null)} className="text-slate-400 font-bold hover:text-white">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-white block">{selectedAuction.title}</span>
              <span className="text-slate-400 block">Reserve Price: ₹{formatNumber(selectedAuction.reservePrice)}</span>
              <span className="text-emerald-400 font-bold block">10% EMD Required: ₹{formatNumber(selectedAuction.emdAmount)}</span>
            </div>

            <form onSubmit={handlePlaceBid} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Your Bid Amount (₹)</label>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e: any) => setBidAmount(e.target.value)}
                  className="bg-slate-950 text-white border-slate-800 text-sm font-black"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full font-black py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg">
                Confirm & Submit EMD Verified Bid →
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
