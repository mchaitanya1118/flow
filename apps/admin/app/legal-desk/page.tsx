'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Scale,
  FileCheck,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export default function LegalDeskPage() {
  const [legalAudits] = useState([
    {
      id: 'leg-1',
      title: 'Triplex Villa Title & 30-Yr EC Clearance',
      applicant: 'Mr. Arvind Rao',
      sroOffice: 'SRO Gachibowli (Slot #402)',
      stampDuty: '₹5,13,750 (7.5% TS Rate)',
      status: 'TITLE_CLEARED',
      date: '2026-10-03',
    },
    {
      id: 'leg-2',
      title: 'Online Rent Agreement & E-Stamp Dispatch',
      applicant: 'Pooja Verma (Tenant)',
      sroOffice: 'Digital E-Stamp Vault',
      stampDuty: '₹1,200',
      status: 'E_STAMP_ISSUED',
      date: '2026-10-01',
    },
    {
      id: 'leg-3',
      title: 'Commercial Office Space EC Title Verification',
      applicant: 'Kiran Enterprises LLP',
      sroOffice: 'SRO Jubilee Hills',
      stampDuty: '₹14,25,000',
      status: 'AUDIT_IN_PROGRESS',
      date: '2026-10-02',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">TS-RERA & Sub-Registrar Legal Audit</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Legal, Title & SRO Booking Desk</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Oversee 30-Year Encumbrance Certificate (EC) audits, Sub-Registrar Office (SRO) slot bookings, and digital E-Stamp rental agreements.</p>
        </div>
      </div>

      {/* LEGAL AUDITS TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Legal Audit Audit / Document</th>
                <th className="p-4">Applicant / Buyer</th>
                <th className="p-4">SRO Sub-Registrar Office</th>
                <th className="p-4">Calculated Stamp Duty</th>
                <th className="p-4">Audit Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {legalAudits.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850 transition">
                  <td className="p-4">
                    <div className="font-extrabold text-white text-sm">{item.title}</div>
                    <div className="text-[11px] text-slate-400 font-semibold">{item.date}</div>
                  </td>
                  <td className="p-4 font-bold text-slate-300 flex items-center gap-1.5 pt-6">
                    <User className="w-3.5 h-3.5 text-emerald-400" /> {item.applicant}
                  </td>
                  <td className="p-4 font-bold text-slate-300">{item.sroOffice}</td>
                  <td className="p-4 font-black text-amber-400 text-sm">{item.stampDuty}</td>
                  <td className="p-4">
                    <Badge variant={item.status === 'TITLE_CLEARED' ? 'emerald' : item.status === 'E_STAMP_ISSUED' ? 'blue' : 'amber'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Downloading Legal Certificate for ${item.title}...`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-bold text-xs"
                    >
                      📄 Issue Title Seal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
