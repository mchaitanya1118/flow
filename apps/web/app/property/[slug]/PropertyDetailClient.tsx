'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Avatar,
  Button,
  Card,
  Modal,
  Input,
  formatNumber,
} from '@estateflow/ui';
import { buildWhatsAppLink } from '../../../lib/whatsapp';

export interface PropertyDetailClientProps {
  property: any;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();

  const propAny = property as any;

  const [activeImage, setActiveImage] = useState(property.mainImage);
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [viewingDate, setViewingDate] = useState('2026-09-02');
  const [viewingTime, setViewingTime] = useState('11:00');
  const [visitorName, setVisitorName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const formatPrice = (val: number, trans: string) => {
    if (trans === 'RENT') return `₹${formatNumber(val)}/month`;
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Crore`;
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  const galleryImages = [
    property.mainImage,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
  ];

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Viewing request submitted for ${viewingDate} at ${viewingTime}! The agent will contact ${visitorName}.`);
    setIsViewingModalOpen(false);
  };

  const descriptionText = propAny.description || 'Beautiful luxury home featuring premium modular kitchen, teak wood doors, Statuario Italian marble flooring, and panoramic balcony views of the city.';
  const amenitiesList: string[] = propAny.amenities || ['24/7 Security', 'Swimming Pool', 'Gymnasium', 'EV Charging', 'Clubhouse', 'Power Backup'];
  const addressText = propAny.location?.address || `${property.location.locality}, ${property.location.city}`;
  const agentPhone = propAny.agent?.phone || '+91 98765 43210';

  const handleWhatsAppInquiry = () => {
    const url = buildWhatsAppLink({
      phone: agentPhone,
      propertyTitle: property.title,
      propertyId: property.id,
      propertyPrice: formatPrice(property.price, property.transactionType),
      propertyLocation: addressText,
      agentName: property.agent?.name,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-emerald-500 selection:text-white">
      {/* 1. DARK HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="emerald" className="font-black tracking-wider px-3 py-1">✓ TS-RERA VERIFIED TITLE</Badge>
                <Badge variant="amber" className="font-extrabold px-3 py-1">⭐ {property.qualityScore || 98}/100 Quality Score</Badge>
                <Badge variant="slate" className="font-extrabold uppercase px-3 py-1">{property.transactionType}</Badge>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white">{property.title}</h1>
              <p className="text-xs sm:text-sm text-slate-300 font-bold flex items-center gap-1.5">
                <span className="text-emerald-400">📍</span> {addressText}
              </p>
            </div>

            {/* PRICE TAG & ACTION BUTTONS */}
            <div className="text-right space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300">
                {formatPrice(property.price, property.transactionType)}
              </div>
              <p className="text-xs font-bold text-slate-400">₹{formatNumber(Math.round(property.price / property.areaSqFt))}/sq.ft super built-up</p>
            </div>
          </div>

          {/* ACTION TOOLBAR */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              className="font-black text-xs px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-900/40"
              onClick={() => router.push(`/virtual-tour/${property.slug}`)}
            >
              🥽 Launch 3D 360° Virtual Tour →
            </Button>
            <Button
              variant="secondary"
              className="font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
              onClick={() => setIsViewingModalOpen(true)}
            >
              📅 Schedule Private Viewing
            </Button>
            <Button
              variant="secondary"
              className="font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md"
              onClick={handleWhatsAppInquiry}
            >
              💬 WhatsApp Instant Inquiry
            </Button>
            <Button
              variant="outline"
              className={`font-bold text-xs border-slate-700 ${isSaved ? 'text-rose-400 border-rose-500/50' : 'text-slate-300'}`}
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? '❤️ Saved to Favorites' : '🤍 Save Property'}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. GALLERY & SPECS CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img src={activeImage} alt={property.title} className="h-full w-full object-cover transition-all duration-500" />
            </div>

            {/* THUMBNAILS ROW */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-emerald-500 scale-105 shadow-lg shadow-emerald-900/40' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* AGENT CONTACT SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 space-y-5 bg-slate-900 border-slate-800 rounded-3xl shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="font-black text-white text-sm">Listed by Certified Agent</span>
                <Badge variant="emerald" className="font-bold">✓ Verified Partner</Badge>
              </div>

              {property.agent && (
                <div className="flex items-center gap-3">
                  <Avatar src={property.agent.avatar} name={property.agent.name} size="lg" />
                  <div>
                    <h4 className="font-black text-white text-base">{property.agent.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold">{property.agent.agencyName || 'EstateFlow Luxury Desk'}</p>
                    <p className="text-xs text-amber-400 font-extrabold mt-0.5">⭐ 4.9/5.0 Rating (42 deals)</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  className="w-full font-black text-xs py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white"
                  onClick={() => alert(`Calling agent at ${agentPhone}...`)}
                >
                  📞 Direct Call Agent
                </Button>
                <Button
                  variant="secondary"
                  className="w-full font-bold text-xs py-3 bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-lg"
                  onClick={handleWhatsAppInquiry}
                >
                  💬 Chat on WhatsApp
                </Button>
              </div>
            </Card>

            {/* QUICK PRE-APPROVAL CARD */}
            <Card className="p-6 space-y-3 bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-900/40 rounded-3xl shadow-xl">
              <span className="text-xs font-black text-emerald-400 block uppercase tracking-wider">💳 Bank Financing</span>
              <h4 className="font-black text-white text-sm">Estimated Monthly EMI</h4>
              <p className="text-2xl font-black text-white">₹{formatNumber(Math.round(property.price * 0.0085))}<span className="text-xs text-slate-400 font-normal">/month</span></p>
              <Button variant="outline" className="w-full font-bold text-xs text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/10" onClick={() => router.push('/mortgage-calculator')}>
                Calculate Full Amortization →
              </Button>
            </Card>
          </div>
        </div>

        {/* 3. SPECIFICATION MATRIX */}
        <Card className="p-8 space-y-6 bg-slate-900 border-slate-800 rounded-3xl shadow-xl">
          <h3 className="text-xl font-black text-white border-b border-slate-800 pb-4">Property Specifications & Details</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div className="space-y-1 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Bedrooms</span>
              <span className="text-lg font-black text-white">{property.bedrooms} BHK Suite</span>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Bathrooms</span>
              <span className="text-lg font-black text-white">{property.bathrooms} Baths</span>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Carpet Area</span>
              <span className="text-lg font-black text-emerald-400">{formatNumber(property.areaSqFt)} sq.ft</span>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Facing</span>
              <span className="text-lg font-black text-amber-300">East Facing</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="font-extrabold text-white text-sm">Description & Features</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {descriptionText}
            </p>
          </div>

          {/* AMENITIES BADGES */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="font-extrabold text-white text-sm">Community Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((am: string) => (
                <span key={am} className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-xs font-bold">
                  ✨ {am}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* VIEWING MODAL */}
      <Modal isOpen={isViewingModalOpen} onClose={() => setIsViewingModalOpen(false)} title="Schedule Private Property Viewing">
        <form onSubmit={handleViewingSubmit} className="space-y-4 text-xs">
          <Input label="Your Name" value={visitorName} onChange={(e: any) => setVisitorName(e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Preferred Date" type="date" value={viewingDate} onChange={(e: any) => setViewingDate(e.target.value)} required />
            <Input label="Preferred Time" type="time" value={viewingTime} onChange={(e: any) => setViewingTime(e.target.value)} required />
          </div>
          <Button type="submit" variant="primary" className="w-full font-bold py-3 bg-emerald-600 hover:bg-emerald-500">
            Confirm Viewing Request →
          </Button>
        </form>
      </Modal>
    </div>
  );
}
