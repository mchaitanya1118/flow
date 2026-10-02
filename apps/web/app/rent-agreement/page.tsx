'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@estateflow/ui';

export default function RentAgreementPage() {
  const [landlordName, setLandlordName] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [monthlyRent, setMonthlyRent] = useState(35000);
  const [depositAmount, setDepositAmount] = useState(105000);
  const [leaseMonths, setLeaseMonths] = useState(11);
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📄 Instant Legal E-Stamping Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Online Lease & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Rent Agreement Generator</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Draft legally compliant 11-month rental agreements with government e-stamp paper delivery to your doorstep or email.
          </p>
        </div>
      </section>

      {/* AGREEMENT FORM & PREVIEW */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Agreement Details</h3>

            <form onSubmit={(e) => { e.preventDefault(); setIsGenerated(true); }} className="space-y-3 text-xs">
              <Input label="Landlord / Owner Full Name" placeholder="e.g. Rajesh Kumar" value={landlordName} onChange={(e: any) => setLandlordName(e.target.value)} required />
              <Input label="Tenant Full Name" placeholder="e.g. Ananya Sharma" value={tenantName} onChange={(e: any) => setTenantName(e.target.value)} required />

              <div className="grid grid-cols-2 gap-3">
                <Input label="Monthly Rent (₹)" type="number" value={monthlyRent} onChange={(e: any) => setMonthlyRent(Number(e.target.value))} required />
                <Input label="Security Deposit (₹)" type="number" value={depositAmount} onChange={(e: any) => setDepositAmount(Number(e.target.value))} required />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Tenure Period</label>
                <select
                  value={leaseMonths}
                  onChange={(e) => setLeaseMonths(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                >
                  <option value={11}>11 Months Standard</option>
                  <option value={24}>2 Years (24 Months)</option>
                  <option value={36}>3 Years (36 Months)</option>
                </select>
              </div>

              <Button type="submit" variant="primary" className="w-full font-bold py-3 text-xs shadow-md">
                Generate Legal Draft →
              </Button>
            </form>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <h4 className="font-extrabold text-slate-900 text-sm">Agreement Summary</h4>
                <Badge variant={isGenerated ? 'emerald' : 'slate'} className="font-bold">
                  {isGenerated ? '✓ Ready for E-Stamping' : 'Drafting Mode'}
                </Badge>
              </div>

              <div className="space-y-2 text-slate-700">
                <p>Landlord: <strong>{landlordName || '—'}</strong></p>
                <p>Tenant: <strong>{tenantName || '—'}</strong></p>
                <p>Monthly Rent: <strong>₹{monthlyRent.toLocaleString('en-IN')}</strong></p>
                <p>Security Deposit: <strong>₹{depositAmount.toLocaleString('en-IN')}</strong></p>
                <p>Agreement Duration: <strong>{leaseMonths} Months</strong></p>
                <p>E-Stamp Paper Fee: <strong>₹500 Govt Stamp</strong></p>
              </div>
            </div>

            {isGenerated && (
              <Button variant="primary" className="w-full bg-slate-900 hover:bg-slate-800 font-bold py-3 text-xs shadow-lg" onClick={() => alert('PDF E-Stamp Agreement downloaded!')}>
                📥 Download Legal PDF & E-Stamp →
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
