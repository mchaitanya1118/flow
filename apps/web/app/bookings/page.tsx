'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from '@estateflow/ui';
import { useRouter } from 'next/navigation';

export default function ViewingBookingsPage() {
  const router = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const bookings = [
    {
      id: 'bk-101',
      propertyTitle: 'The Skyline Triplex Villa',
      location: 'Gachibowli, Hyderabad',
      date: '26-Aug-2026',
      time: '11:00 AM IST',
      agentName: 'Vikram Sharma',
      agentPhone: '+91 98765 11111',
      status: 'CONFIRMED',
      meetingType: 'In-Person Site Visit',
      meetingPoint: 'Skyline Sales Experience Center, Gachibowli',
    },
    {
      id: 'bk-102',
      propertyTitle: 'Royal Heritage Golf County Villa',
      location: 'Tellapur, Hyderabad',
      date: '28-Aug-2026',
      time: '03:30 PM IST',
      agentName: 'Priya Reddy',
      agentPhone: '+91 98765 22222',
      status: 'PENDING AGENT CONFIRMATION',
      meetingType: 'Virtual 3D Walkthrough Guided Call',
      meetingPoint: 'EstateFlow Video Call Link (Sent to Email)',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            📅 Viewing Schedule Manager
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            My Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Viewing Appointments</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300">
            Track site visit bookings, communicate with assigned agents, sync schedules to Google Calendar, and reschedule appointments seamlessly.
          </p>
        </div>
      </section>

      {/* BOOKINGS CONTAINER */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xl">
          <h3 className="font-extrabold text-slate-900 text-lg">Scheduled Site Visits ({bookings.length})</h3>
          <Button variant="primary" size="sm" className="font-bold text-xs" onClick={() => router.push('/search')}>
            + Book New Site Visit
          </Button>
        </div>

        <div className="space-y-4">
          {bookings.map((bk) => (
            <Card key={bk.id} className="p-6 space-y-4 shadow-md border-slate-200 bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-lg">{bk.propertyTitle}</h3>
                    <Badge variant={bk.status === 'CONFIRMED' ? 'emerald' : 'amber'} className="font-bold text-xs">
                      {bk.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">📍 {bk.location}</p>
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">ID: {bk.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Date & Time</span>
                  <span className="font-extrabold text-slate-900 text-sm">{bk.date} • {bk.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Meeting Type</span>
                  <span className="font-bold text-slate-800">{bk.meetingType}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-0.5">Assigned Agent</span>
                  <span className="font-bold text-emerald-600">{bk.agentName} ({bk.agentPhone})</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
                <span className="text-xs text-slate-500 font-medium">Meeting Point: <strong>{bk.meetingPoint}</strong></span>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-bold text-xs" onClick={() => alert('Synced to Google Calendar!')}>
                    📅 Add to Calendar
                  </Button>
                  <Button variant="secondary" size="sm" className="font-bold text-xs text-rose-600" onClick={() => setSelectedBooking(bk)}>
                    Cancel Visit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CANCELLATION MODAL */}
      <Modal isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} title="Cancel Site Visit">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Are you sure you want to cancel your scheduled visit for <strong>{selectedBooking?.propertyTitle}</strong> on {selectedBooking?.date}?
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="w-full bg-rose-600 hover:bg-rose-700 font-bold" onClick={() => { alert('Site visit cancelled!'); setSelectedBooking(null); }}>
              Confirm Cancellation
            </Button>
            <Button variant="outline" className="w-full font-bold" onClick={() => setSelectedBooking(null)}>
              Keep Appointment
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
