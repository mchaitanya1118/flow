'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@estateflow/ui';

export default function SROBookingPage() {
  const [sroOffice, setSroOffice] = useState('Gachibowli SRO');
  const [bookingDate, setBookingDate] = useState('2026-09-08');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 12:00 PM');
  const [partyType, setPartyType] = useState('BUYER');
  const [partyName, setPartyName] = useState('');
  const [phone, setPhone] = useState('');
  const [documentNo, setDocumentNo] = useState('DRAFT-TS-2026-4821');
  const [confirmedToken, setConfirmedToken] = useState<string | null>(null);

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `TS-SRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedToken(token);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3.5 py-1 text-xs uppercase tracking-widest font-black border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            🏛️ Registration & Stamp Department Desk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Sub-Registrar Office <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">Slot Booking Engine</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium">
            Book official deed execution slots across Telangana SRO offices. Generate Dharani / CARD registration tokens and download biometric verification checklists.
          </p>
        </div>
      </section>

      {/* BOOKING CONTAINER */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 relative z-10 space-y-8">
        <Card className="p-6 sm:p-8 bg-slate-900 border-slate-800 rounded-3xl shadow-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h3 className="text-lg font-black text-white">Select SRO Office & Time Slot</h3>
            <Badge variant="amber" className="font-extrabold">CARD 2.0 Integration</Badge>
          </div>

          {!confirmedToken ? (
            <form onSubmit={handleBookSlot} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Target Sub-Registrar Office</label>
                  <select
                    value={sroOffice}
                    onChange={(e) => setSroOffice(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Gachibowli SRO">Gachibowli SRO (Financial District)</option>
                    <option value="Serilingampally SRO">Serilingampally SRO</option>
                    <option value="Rajendranagar SRO">Rajendranagar SRO</option>
                    <option value="Banjara Hills SRO">Banjara Hills SRO</option>
                    <option value="Kukatpally SRO">Kukatpally SRO</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Execution Date</label>
                  <Input
                    type="date"
                    value={bookingDate}
                    onChange={(e: any) => setBookingDate(e.target.value)}
                    className="bg-slate-950 text-white border-slate-800 text-xs font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">Party Role</label>
                  <select
                    value={partyType}
                    onChange={(e) => setPartyType(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="BUYER">Purchaser / Buyer</option>
                    <option value="SELLER">Owner / Seller</option>
                    <option value="GPA_HOLDER">GPA Holder</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name as per Aadhaar"
                  placeholder="Enter full name..."
                  value={partyName}
                  onChange={(e: any) => setPartyName(e.target.value)}
                  className="bg-slate-950 text-white border-slate-800 text-xs"
                  required
                />
                <Input
                  label="Mobile Number"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  className="bg-slate-950 text-white border-slate-800 text-xs"
                  required
                />
              </div>

              <Input
                label="Public Data Entry / E-Stamp Draft No."
                value={documentNo}
                onChange={(e: any) => setDocumentNo(e.target.value)}
                className="bg-slate-950 text-white border-slate-800 text-xs font-mono"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full font-black text-xs py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
              >
                Generate Official SRO Slot Token →
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl border border-emerald-500/40">
                ✓
              </div>

              <div className="space-y-1">
                <Badge variant="emerald" className="font-extrabold text-xs">Slot Token Confirmed</Badge>
                <h4 className="text-3xl font-black text-white">{confirmedToken}</h4>
                <p className="text-xs text-slate-400 font-medium">Present this token at {sroOffice} entry desk</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-bold">Office:</span>
                  <span className="font-black text-white">{sroOffice}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-bold">Date & Time:</span>
                  <span className="font-black text-emerald-400">{bookingDate} ({timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Party Name:</span>
                  <span className="font-black text-white">{partyName} ({partyType})</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Button variant="outline" className="font-bold text-xs border-slate-700" onClick={() => setConfirmedToken(null)}>
                  ← Book Another Slot
                </Button>
                <Button variant="primary" className="font-bold text-xs bg-emerald-600 hover:bg-emerald-500" onClick={() => alert(`Downloading SRO Appointment Token Slip & Document Checklist PDF for ${confirmedToken}...`)}>
                  📥 Download Token Slip PDF
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
