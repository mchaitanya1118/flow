'use client';

import React, { useState } from 'react';
import { Badge, Button, Card, Input } from '@estateflow/ui';
import { formatNumber } from '@estateflow/ui';
import { Wifi, Sparkles, Shield, Coffee, Tv, Dumbbell, MapPin, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

interface CoLivingProperty {
  id: string;
  name: string;
  location: string;
  proximityToTechPark: string;
  monthlyRent: number;
  occupancyType: 'Private Suite' | 'Twin Sharing' | 'Executive Studio';
  amenities: string[];
  image: string;
  rating: number;
  availableRooms: number;
}

const DEMO_COLIVING_PROPERTIES: CoLivingProperty[] = [
  {
    id: 'colive-01',
    name: 'EstateFlow Sanctuary Suites (Hitec City)',
    location: 'Near Mindspace IT Park, Hitec City',
    proximityToTechPark: '500m from Mindspace Cybercity',
    monthlyRent: 18500,
    occupancyType: 'Private Suite',
    amenities: ['Daily Housekeeping', 'Chef Prepared Meals', '300 Mbps WiFi', 'Crossfit Gym', 'Power Backup'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    availableRooms: 3,
  },
  {
    id: 'colive-02',
    name: 'EstateFlow Horizon Executive Hub',
    location: 'Financial District, Nanakramguda',
    proximityToTechPark: '1 km from WaveRock & Microsoft',
    monthlyRent: 14000,
    occupancyType: 'Twin Sharing',
    amenities: ['Zero Brokerage', 'Gaming Lounge', 'Laundry Service', '24/7 Security', 'Co-Working Desks'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    availableRooms: 5,
  },
  {
    id: 'colive-03',
    name: 'EstateFlow Botanica Luxury Living',
    location: 'Kondapur Main Road',
    proximityToTechPark: '1.5 km from Hitec Metro Station',
    monthlyRent: 24000,
    occupancyType: 'Executive Studio',
    amenities: ['Private Kitchenette', 'Balcony View', 'Weekly Linen Change', 'Swimming Pool Pass', 'EV Charging'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
    rating: 4.95,
    availableRooms: 2,
  },
];

export default function CoLivingPage() {
  const [selectedProximity, setSelectedProximity] = useState<string>('ALL');

  const handleWhatsAppBookViewing = (colive: CoLivingProperty) => {
    const text = `Hi EstateFlow Co-Living Concierge! I want to schedule a viewing for *${colive.name}* (${colive.occupancyType}) priced at ₹${formatNumber(colive.monthlyRent)}/month.`;
    const url = buildWhatsAppLink({ customMessage: text });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 border-b border-slate-800 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <Badge variant="emerald" className="px-3 py-1 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            🛋️ Zero Brokerage • Fully Serviced Housing
          </Badge>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Managed Co-Living & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
              Executive Tech Suites
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Hassle-free fully furnished suites for tech professionals and executives near Mindspace, Financial District & Hitec City. Includes meals, housekeeping, 300 Mbps WiFi & community workspaces.
          </p>

          {/* AMENITIES PILLS */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 flex items-center gap-1.5">⚡ Zero Deposit Options</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 flex items-center gap-1.5">📶 300 Mbps WiFi</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 flex items-center gap-1.5">🍱 Daily Homestyle Meals</span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 flex items-center gap-1.5">🧹 Daily Room Cleaning</span>
          </div>
        </div>
      </section>

      {/* PROPERTIES LISTING GRID */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">Available Co-Living Hubs</h2>
            <p className="text-xs text-slate-400">Move-in ready with zero brokerage or agent fee</p>
          </div>

          <div className="text-xs font-bold text-slate-300 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
            ⚡ 100% Verified Clean Property Credentials
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_COLIVING_PROPERTIES.map((colive) => (
            <Card key={colive.id} className="bg-slate-950 border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                  <img src={colive.image} alt={colive.name} className="h-full w-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-white border border-slate-700 uppercase tracking-wider">
                    {colive.occupancyType}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-lg">
                    ₹{formatNumber(colive.monthlyRent)}/mo
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-black text-white text-base line-clamp-1">{colive.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <span className="text-emerald-400">📍</span> {colive.location}
                    </p>
                    <p className="text-[11px] text-amber-300 font-bold mt-0.5">
                      ⚡ {colive.proximityToTechPark}
                    </p>
                  </div>

                  {/* AMENITIES BADGES */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {colive.amenities.map((am, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-extrabold">
                        ✨ {am}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold text-[10px] uppercase">Available Units</span>
                    <span className="text-emerald-400 font-black">{colive.availableRooms} Suites Left</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  variant="primary"
                  className="w-full font-bold text-xs py-3 bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                  onClick={() => handleWhatsAppBookViewing(colive)}
                >
                  💬 Schedule WhatsApp Room Tour →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
