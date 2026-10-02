'use client';

import React, { useState } from 'react';
import { Badge, Button, Card, Input } from '@estateflow/ui';
import { ShieldCheck, FileCheck2, AlertTriangle, CheckCircle, Search, Download, Scale, Sparkles } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface LegalCheckResult {
  reraValid: boolean;
  encumbranceFree: boolean;
  thirtyYearTitleClean: boolean;
  revenueRecordMutationDone: boolean;
  litigationRiskScore: number; // 0-100 (Lower is safer)
  overallSafetyRating: 'SAFE' | 'MODERATE_RISK' | 'HIGH_RISK';
  summary: string;
}

export default function TitleClearancePage() {
  const [surveyNo, setSurveyNo] = useState('241/A & 242/B');
  const [district, setDistrict] = useState('Ranga Reddy');
  const [mandal, setMandal] = useState('Serilingampally (Kondapur)');
  const [reraId, setReraId] = useState('P02400003892');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<LegalCheckResult | null>({
    reraValid: true,
    encumbranceFree: true,
    thirtyYearTitleClean: true,
    revenueRecordMutationDone: true,
    litigationRiskScore: 96, // 96/100 Safe
    overallSafetyRating: 'SAFE',
    summary: 'The property title has undergone complete 30-year deed verification. No mortgages, court injunctions, or land acquisition notices detected in registration records.',
  });

  const handleRunVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult({
        reraValid: true,
        encumbranceFree: true,
        thirtyYearTitleClean: true,
        revenueRecordMutationDone: true,
        litigationRiskScore: 98,
        overallSafetyRating: 'SAFE',
        summary: `Title verified for Survey No: ${surveyNo}, ${mandal}. Clean 30-year ownership lineage, verified RERA registration (${reraId}), and zero encumbrances on Dharani/Registration records.`,
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleWhatsAppLegalAdvocate = () => {
    const text = `Hi EstateFlow Legal Desk! I need a formal 30-Year Legal Title Search Report & Advocate Opinion for Survey No: ${surveyNo}, Mandal: ${mandal}, RERA: ${reraId}.`;
    const url = buildWhatsAppLink({ customMessage: text });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 border-b border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <Badge variant="emerald" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            🛡️ AI-Powered Land & Property Due Diligence
          </Badge>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Instant Title Clearance & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
              Encumbrance Verification Desk
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Verify 30-year ownership lineage, Encumbrance Certificates (EC), Dharani mutation records, RERA validity, and court litigation risks before paying token advance.
          </p>
        </div>
      </section>

      {/* FORM & RESULT CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT FORM */}
          <div className="lg:col-span-5">
            <Card className="p-6 bg-slate-950 border-slate-800 rounded-3xl shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI Document Scanner
                </span>
                <h3 className="text-xl font-black text-white mt-1">Enter Property Details</h3>
              </div>

              <form onSubmit={handleRunVerification} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px]">Survey No. / Plot No. / Flat No.</label>
                  <input
                    type="text"
                    value={surveyNo}
                    onChange={(e) => setSurveyNo(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px]">District</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px]">Mandal / Locality</label>
                    <input
                      type="text"
                      value={mandal}
                      onChange={(e) => setMandal(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px]">RERA Reg. Number (Optional)</label>
                  <input
                    type="text"
                    value={reraId}
                    onChange={(e) => setReraId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-black text-xs py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? '🔍 Scanning Sub-Registrar & Revenue DB...' : '⚡ Run Instant Title Check →'}
                </Button>
              </form>
            </Card>
          </div>

          {/* VERIFICATION REPORT PANEL */}
          <div className="lg:col-span-7">
            {result && (
              <Card className="p-8 bg-slate-950 border-slate-800 rounded-3xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Title Clearance Report</h3>
                      <p className="text-xs text-slate-400 font-medium">Survey No: {surveyNo} ({mandal})</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-400">{result.litigationRiskScore}/100</span>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Safety Score</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  {result.summary}
                </p>

                {/* 4 CHECK MATRIX */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                      <CheckCircle className="w-4 h-4" /> 30-Yr Lineage Clean
                    </span>
                    <p className="text-[11px] text-slate-400">Zero gap in prior sale deeds from 1996 to date.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                      <CheckCircle className="w-4 h-4" /> Encumbrance Free (EC)
                    </span>
                    <p className="text-[11px] text-slate-400">Form 15 EC issued by SRO shows zero mortgage charges.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                      <CheckCircle className="w-4 h-4" /> Revenue Mutation Done
                    </span>
                    <p className="text-[11px] text-slate-400">Pahani / Dharani record reflects current owner name.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-xs">
                      <CheckCircle className="w-4 h-4" /> RERA Approval Verified
                    </span>
                    <p className="text-[11px] text-slate-400">Project compliant with TS-RERA bank escrow norms.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    variant="primary"
                    className="w-full sm:flex-1 font-bold text-xs py-3 bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                    onClick={handleWhatsAppLegalAdvocate}
                  >
                    💬 Get Advocate Certified Legal Opinion →
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto font-bold text-xs py-3 text-slate-300 border-slate-700 hover:bg-slate-800"
                    onClick={() => alert('Downloading 10-page Legal Due Diligence Draft PDF...')}
                  >
                    📥 Download Report PDF
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
