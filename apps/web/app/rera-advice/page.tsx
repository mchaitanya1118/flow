'use client';

import React from 'react';
import { Card, Badge, Button } from '@estateflow/ui';
import { useRouter } from 'next/navigation';

export default function ReraAdvicePage() {
  const router = useRouter();

  const buyerRights = [
    {
      title: '70% Builder Escrow Deposit Rule',
      description: 'Under RERA Section 4(2)(l)(D), builders must deposit 70% of buyer funds into a dedicated bank escrow account strictly for land and construction costs.',
    },
    {
      title: '5-Year Structural Defect Liability',
      description: 'Under Section 14(3), builders are legally obligated to rectify structural defects or workmanship flaws free of cost within 5 years of possession.',
    },
    {
      title: 'Mandatory Delay Compensation Interest',
      description: 'Under Section 18, if a builder delays possession beyond the sanctioned RERA date, buyers are entitled to monthly interest at State RERA benchmark rates.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚖️ TS-RERA Buyer Rights Guide
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            RERA Legal Safeguards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Buyer Entitlements</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Know your statutory legal rights under the Real Estate Regulation & Development Act before signing agreement of sale documents.
          </p>
        </div>
      </section>

      {/* RERA RIGHTS CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyerRights.map((r, idx) => (
            <Card key={idx} className="p-6 space-y-3 shadow-md border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                ⚖️
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{r.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{r.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 space-y-6 shadow-xl border-slate-200 bg-slate-900 text-white">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-bold">Need Immediate Legal Representation?</Badge>
            <h3 className="text-2xl font-black text-white">TS-RERA Legal Dispute Resolution</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              EstateFlow partners with senior Telangana High Court real-estate advocates to file RERA complaints for project delay compensation or title defects.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" className="font-bold text-xs shadow" onClick={() => router.push('/legal-advisory')}>
              Book Legal Verification Package →
            </Button>
            <Button variant="outline" size="md" className="font-bold text-xs text-white border-slate-700 hover:bg-slate-800" onClick={() => router.push('/rera-check')}>
              Inspect TS-RERA License →
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
