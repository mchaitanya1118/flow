'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input, Modal, formatNumber } from '@estateflow/ui';

export default function InteriorsPage() {
  const [areaSqFt, setAreaSqFt] = useState(1800);
  const [packageType, setPackageType] = useState('LUXURY');
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const packageRates: Record<string, number> = {
    ESSENTIAL: 1200,
    PREMIUM: 1850,
    LUXURY: 2600,
  };

  const estimatedCost = Math.round(areaSqFt * (packageRates[packageType] || 1850));

  const interiorServices = [
    {
      id: 'srv-1',
      title: 'Modular German Kitchens',
      price: 'From ₹3.5 Lakhs',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      description: 'Custom soft-close tandem drawers, quartz countertops, built-in Bosch appliances, and 10-year warranty.',
    },
    {
      id: 'srv-2',
      title: 'Italian Marble & Flooring',
      price: 'From ₹4.2 Lakhs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      description: 'Imported Statuario marble flooring, custom epoxy grouting, mirror polishing, and waterproof underlayment.',
    },
    {
      id: 'srv-3',
      title: 'Smart Home Automation',
      price: 'From ₹1.8 Lakhs',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      description: 'App-controlled mood lighting, motorized curtains, smart biometric locks, and Alexa integration.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="amber" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-amber-500/30 bg-amber-500/10 text-amber-300">
            🛋️ Turnkey Interior Design Studio
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Bespoke Luxury <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Home Interiors & Fitout</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Transform raw builder apartments and villas into move-in ready architectural masterpieces with 45-day guaranteed execution.
          </p>
        </div>
      </section>

      {/* INTERIOR COST CALCULATOR */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 shadow-xl border-slate-200 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">Interior Cost Calculator</h3>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Carpet Area (Sq.Ft)</label>
                <input
                  type="range"
                  min={800}
                  max={5000}
                  step={100}
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <span className="text-sm font-black text-slate-900">{formatNumber(areaSqFt)} sq.ft</span>
              </div>

              <div>
                <label className="block text-slate-700 uppercase tracking-wider mb-1">Finish Package</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ESSENTIAL', label: 'Essential (₹1,200/sq.ft)' },
                    { id: 'PREMIUM', label: 'Premium (₹1,850/sq.ft)' },
                    { id: 'LUXURY', label: 'Ultra Luxury (₹2,600/sq.ft)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPackageType(p.id)}
                      className={`p-2.5 rounded-xl border text-[11px] font-black transition-all ${
                        packageType === p.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white space-y-4 text-center">
            <Badge variant="amber" className="font-bold">Turnkey Execution Estimate</Badge>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Fitout Cost</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              ₹{(estimatedCost / 100000).toFixed(2)} Lakhs
            </span>
            <p className="text-xs text-slate-300 font-medium">Includes 3D VR renders, material sourcing, and 10-year warranty.</p>

            <Button variant="primary" size="lg" className="w-full font-bold text-xs py-3 shadow-lg" onClick={() => alert('Interior consultation request submitted!')}>
              Book Free 3D Design Session →
            </Button>
          </div>
        </Card>

        {/* SERVICES GALLERY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interiorServices.map((srv) => (
            <Card key={srv.id} className="p-4 space-y-3 shadow-md border-slate-200 bg-white">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border">
                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 text-base">{srv.title}</h4>
                  <Badge variant="emerald">{srv.price}</Badge>
                </div>
                <p className="text-xs text-slate-600 font-medium">{srv.description}</p>
              </div>

              <Button variant="outline" size="sm" className="w-full font-bold text-xs" onClick={() => setSelectedService(srv)}>
                Enquire Package →
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} title={`Enquire — ${selectedService?.title}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Schedule an on-site interior measurement visit for <strong>{selectedService?.title}</strong>.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert(`Inquiry submitted for ${selectedService?.title}! An interior architect will contact you.`); setSelectedService(null); }} className="space-y-3">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Phone Number" placeholder="+91 98765 00000" required />
            <Input label="Property Name / Locality" placeholder="e.g. Skyline Villa, Gachibowli" required />
            <Button type="submit" variant="primary" className="w-full font-bold py-2.5">
              Submit Design Consultation Request →
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
