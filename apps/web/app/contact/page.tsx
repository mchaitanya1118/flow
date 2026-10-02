'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '@estateflow/ui';

export default function ContactSupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('BUYER_HELP');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📞 Customer Care & Legal Helpdesk
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Assist You</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Have questions about a property listing, TS-RERA title clearance, agent verification, or home loan pre-approvals? Reach our PropTech support team 24/7.
          </p>
        </div>
      </section>

      {/* SUPPORT FORM & CONTACT CARDS */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CONTACT FORM */}
        <Card className="lg:col-span-7 p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 bg-white">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Send Support Inquiry</h3>
            <p className="text-xs text-slate-500">Fill in the details below and an EstateFlow advisor will get back to you in under 15 minutes.</p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold mx-auto">
                ✓
              </div>
              <h4 className="font-extrabold text-slate-900 text-lg">Support Ticket Created!</h4>
              <p className="text-xs text-slate-600">
                Ticket #EF-8942 has been generated. An advisor will contact you at <strong>{phone}</strong> or <strong>{email}</strong> shortly.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" value={name} onChange={(e: any) => setName(e.target.value)} required />
                <Input label="Email Address" type="email" placeholder="john@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Phone Number" placeholder="+91 98765 00000" value={phone} onChange={(e: any) => setPhone(e.target.value)} required />
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Inquiry Topic</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold focus:border-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="BUYER_HELP">Homebuyer Assistance</option>
                    <option value="RERA_LEGAL">RERA Title & Legal Clearance</option>
                    <option value="LOAN_HELP">Home Loan Pre-Approval</option>
                    <option value="AGENT_DEVELOPER">Agent / Developer Portal Help</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Detailed Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about how we can assist you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-3 text-xs focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-lg py-3">
                Submit Support Ticket →
              </Button>
            </form>
          )}
        </Card>

        {/* DIRECT HELPLINES */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 bg-slate-900 text-white space-y-6 shadow-xl border-slate-800">
            <h3 className="font-extrabold text-white text-lg border-b border-slate-800 pb-3">Direct Support Helplines</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xl">📞</span>
                <div>
                  <span className="font-bold text-white block">Toll-Free Customer Care</span>
                  <span className="text-emerald-400 font-extrabold text-sm">+91 1800 200 4567</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Mon – Sun: 8:00 AM – 10:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xl">💬</span>
                <div>
                  <span className="font-bold text-white block">WhatsApp Business Desk</span>
                  <span className="text-emerald-400 font-extrabold text-sm">+91 98765 43210</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Instant Automated Assistance</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xl">📍</span>
                <div>
                  <span className="font-bold text-white block">Corporate Headquarters</span>
                  <span className="text-slate-300 font-semibold">EstateFlow Tech Towers, Level 8, Financial District, Gachibowli, Hyderabad, Telangana 500032</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
