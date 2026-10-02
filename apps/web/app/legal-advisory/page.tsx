'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@estateflow/ui';

export default function LegalAdvisoryPage() {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);

  const packages = [
    {
      id: 'pkg-basic',
      title: 'Basic Title Deed Search',
      price: '₹4,999',
      turnaround: '24 Hours',
      features: [
        '30-Year Encumbrance Certificate (EC) Audit',
        'Govt Land Registry Title Search',
        'Seller Identity & Revenue Records Verification',
        'PDF Title Due-Diligence Summary',
      ],
    },
    {
      id: 'pkg-pro',
      title: 'Comprehensive RERA & Title Clearance',
      price: '₹12,999',
      turnaround: '48 Hours',
      badge: 'MOST POPULAR',
      features: [
        'Everything in Basic Package',
        'TS-RERA Sanctioned Building Plan Audit',
        'RERA Escrow Bank Account Compliance Audit',
        'High Court & Civil Court Litigation Search',
        'Senior High-Court Advocate Opinion Letter',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚖️ Legal Title Due-Diligence Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Property Legal Title & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Encumbrance Audit</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Protect your real-estate investment with high-court advocate title verification, 30-year encumbrance audits, and RERA legal clearance reports.
          </p>
        </div>
      </section>

      {/* PACKAGES CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xl">{pkg.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Turnaround: {pkg.turnaround}</p>
                  </div>
                  {pkg.badge && <Badge variant="emerald" className="font-bold">{pkg.badge}</Badge>}
                </div>

                <div className="text-3xl font-black text-slate-900">{pkg.price}</div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Service Deliverables</span>
                  {pkg.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="text-emerald-600 font-bold">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full font-bold shadow-md text-xs py-3 mt-6" onClick={() => setSelectedPackage(pkg)}>
                Book Legal Verification Package →
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* BOOK PACKAGE MODAL */}
      <Modal isOpen={!!selectedPackage} onClose={() => setSelectedPackage(null)} title={`Book ${selectedPackage?.title}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Enter property details for <strong>{selectedPackage?.title} ({selectedPackage?.price})</strong>. A legal associate will contact you.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Legal audit package booked for ${selectedPackage?.title}! Reference EF-LEGAL-441.`); setSelectedPackage(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Input label="Property Location / RERA Number" placeholder="e.g. Kondapur / TS-RERA P02400007892" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Proceed to Pay {selectedPackage?.price} →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
