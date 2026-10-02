'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, Badge, Button } from '@estateflow/ui';
import { DEMO_PROPERTIES } from '../../../lib/mockData';

export default function VirtualTourPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const property = DEMO_PROPERTIES.find((p) => p.slug === slug) || DEMO_PROPERTIES[0];
  const [activeRoom, setActiveRoom] = useState('LIVING');

  const rooms = [
    {
      id: 'LIVING',
      name: 'Main Living Hall',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      description: 'Double-height ceiling living lounge with italian marble flooring and panoramic balcony glass walls.',
    },
    {
      id: 'KITCHEN',
      name: 'Modular Italian Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
      description: 'Custom fitted quartz countertops, Bosch built-in appliances, and pantry storage.',
    },
    {
      id: 'BEDROOM',
      name: 'Master Suite Bedroom',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
      description: 'Hardwood teak flooring with attached walk-in closet and private sunset terrace balcony.',
    },
    {
      id: 'BATHROOM',
      name: 'Spa Bath Suite',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
      description: 'Freestanding Kohler soaking tub, rainfall glass shower, and gold brass fixtures.',
    },
  ];

  const currentRoom = rooms.find((r) => r.id === activeRoom) || rooms[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* VIRTUAL TOUR TOP HEADER */}
      <header className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 relative z-20">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-slate-800" onClick={() => router.back()}>
            ← Exit 3D Tour
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-sm sm:text-base text-white">{property.title}</h2>
              <Badge variant="emerald" className="text-[10px]">360° 4K Virtual Tour</Badge>
            </div>
            <p className="text-xs text-slate-400">📍 {property.location.locality}, {property.location.city}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" className="font-bold text-xs bg-emerald-600 hover:bg-emerald-500" onClick={() => alert('VR Headset Mode Activated!')}>
            🥽 Launch VR Mode
          </Button>
          <Button variant="secondary" size="sm" className="font-bold text-xs" onClick={() => router.push(`/property/${property.slug}`)}>
            Book Viewing →
          </Button>
        </div>
      </header>

      {/* 360 DEGREE INTERACTIVE TOUR CANVAS */}
      <main className="relative flex-1 min-h-[60vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          src={currentRoom.image}
          alt={currentRoom.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40"></div>

        {/* INTERACTIVE HOTSPOTS OVERLAY */}
        <div className="relative z-10 p-6 text-center space-y-3 max-w-lg mx-auto bg-slate-950/80 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl">
          <Badge variant="amber" className="text-[11px] uppercase tracking-widest font-bold">Spatial Inspection</Badge>
          <h3 className="text-xl sm:text-2xl font-black text-white">{currentRoom.name}</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">{currentRoom.description}</p>
          <div className="flex justify-center gap-2 pt-2">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Drag mouse to rotate 360°
            </span>
          </div>
        </div>
      </main>

      {/* ROOM SELECTION TABS BAR */}
      <footer className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 relative z-20">
        <div className="mx-auto max-w-5xl space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">Switch Room Perspective</span>
          <div className="flex flex-wrap justify-center gap-2">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRoom(r.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  activeRoom === r.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
