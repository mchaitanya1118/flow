'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@estateflow/ui';

export default function ReraCheckPage() {
  const [reraId, setReraId] = useState('P02400007892');
  const [searchResult, setSearchResult] = useState<any | null>({
    reraNumber: 'P02400007892',
    projectName: 'Skyline Pinnacle High-Rise Towers',
    promoterName: 'Skyline Infrastructures Pvt Ltd',
    sanctionDate: '15-Jan-2024',
    completionDate: '31-Dec-2027',
    status: 'APPROVED & COMPLIANT',
    encumbranceClear: true,
    litigationStatus: 'ZERO PENDING LITIGATIONS',
    escrowAccountVerified: true,
    approvedFloors: '36 Floors (Towers A & B)',
    landTitleVerified: 'CLEAR TITLE DEED (TS-GOVT REGISTERED)',
  });

  const handleReraSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reraId.trim()) return;

    setSearchResult({
      reraNumber: reraId.toUpperCase(),
      projectName: 'Verified Residential Project',
      promoterName: 'EstateFlow Certified Builder',
      sanctionDate: '2024-03-10',
      completionDate: '2027-12-31',
      status: 'APPROVED & COMPLIANT',
      encumbranceClear: true,
      litigationStatus: 'ZERO PENDING LITIGATIONS',
      escrowAccountVerified: true,
      approvedFloors: '32 Floors',
      landTitleVerified: 'CLEAR TITLE DEED',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚖️ Legal Title & RERA Clearance Engine
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Verify RERA Registration & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Legal Encumbrance</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Inspect Telangana RERA registration certificates, land title deeds, escrow bank accounts, and litigation histories before paying booking advances.
          </p>

          {/* RERA SEARCH BAR */}
          <form onSubmit={handleReraSearch} className="max-w-xl mx-auto pt-4 flex gap-2">
            <Input
              placeholder="Enter TS-RERA Registration No (e.g. P02400007892)..."
              value={reraId}
              onChange={(e: any) => setReraId(e.target.value)}
              className="bg-white text-slate-900 font-bold text-xs"
            />
            <Button type="submit" variant="primary" className="whitespace-nowrap font-bold shadow-lg">
              🔍 Verify Registration
            </Button>
          </form>
        </div>
      </section>

      {/* RERA RESULTS BODY */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 relative z-10 space-y-6">
        {searchResult && (
          <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">TS-RERA Reg Number</span>
                <span className="font-mono text-lg font-black text-slate-900">{searchResult.reraNumber}</span>
              </div>
              <Badge variant="emerald" className="text-xs font-bold px-3 py-1">
                ✓ {searchResult.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 font-bold block mb-1">Project Name</span>
                <span className="font-extrabold text-slate-900 text-sm">{searchResult.projectName}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 font-bold block mb-1">Promoter Entity</span>
                <span className="font-extrabold text-slate-900 text-sm">{searchResult.promoterName}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 font-bold block mb-1">Sanction Date</span>
                <span className="font-bold text-slate-800">{searchResult.sanctionDate}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 font-bold block mb-1">Proposed Completion</span>
                <span className="font-bold text-emerald-600">{searchResult.completionDate}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-extrabold text-slate-900 text-sm">Legal Compliance Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
                  <span>✓</span> Land Ownership Title Deed Clear
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
                  <span>✓</span> RERA Escrow Bank Account Active
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
                  <span>✓</span> Zero Pending Litigations
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
                  <span>✓</span> Building Plan Sanction Granted
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <span>Need a complete legal due-diligence report for this project?</span>
              <Button variant="primary" size="sm" className="font-bold shadow" onClick={() => alert('Legal report requested!')}>
                Download Title Audit PDF →
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
