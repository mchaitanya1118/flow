'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal } from '@estateflow/ui';

export default function NriDeskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nriPillars = [
    {
      title: 'FEMA Bank Account Routing (NRE / NRO)',
      description: 'FEMA guidelines mandate that all property purchase funds must originate from inward remittance via NRE/NRO rupee bank accounts.',
    },
    {
      title: 'Section 195 TDS Tax Withholding Audit',
      description: 'Property purchases from NRIs attract 20% + surcharge TDS tax withholding under Section 195. EstateFlow manages Lower Tax Deduction Certificates (LTDC).',
    },
    {
      title: 'Power of Attorney (POA) Registration',
      description: 'Complete remote property acquisition via Indian Embassy legalized Special Power of Attorney (SPOA) registered at the local Telangana SRO office.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            🌐 Dedicated NRI Investment Portal
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Non-Resident Indian <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">(NRI) Property Desk</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            End-to-end legal, FEMA compliance, tax advisory, and remote property acquisition services for NRIs in USA, UK, UAE & Singapore.
          </p>
        </div>
      </section>

      {/* NRI ADVISORY CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nriPillars.map((p, idx) => (
            <Card key={idx} className="p-6 space-y-3 shadow-md border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                🌐
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{p.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 space-y-6 shadow-xl border-slate-200 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-bold">24/7 Global Time-Zone Desk</Badge>
            <h3 className="text-2xl font-black text-white">Schedule Private NRI Advisory Call</h3>
            <p className="text-xs text-slate-300 font-medium">Connect via Zoom / WhatsApp Video with senior NRI legal & tax consultants.</p>
          </div>

          <Button variant="primary" size="lg" className="font-bold text-xs py-3.5 px-6 shadow-lg whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
            Schedule Advisory Call →
          </Button>
        </Card>
      </div>

      {/* ADVISORY MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Private NRI Advisory Call">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Select your country of residence to assign a time-zone compatible NRI advisor.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('NRI Callback scheduled! An advisor will reach out via WhatsApp/Zoom.'); setIsModalOpen(false); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Email Address" type="email" placeholder="john@example.com" required />
            <Input label="WhatsApp Number (with country code)" placeholder="+1 (555) 000-0000" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Confirm Callback Request →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
