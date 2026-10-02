'use client';

import React, { useState } from 'react';
import { PropertySummary } from '@estateflow/types';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { cn, formatNumber } from '../utils';
import {
  ShieldCheck,
  Star,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  MessageSquare,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export interface PropertyCardProps {
  property: PropertySummary;
  onFavouriteToggle?: (id: string, isFav: boolean) => void;
  isFavouritedInitial?: boolean;
  className?: string;
  href?: string;
}

export function PropertyCard({
  property,
  onFavouriteToggle,
  isFavouritedInitial = false,
  className,
  href,
}: PropertyCardProps): any {
  const router = useRouter();
  const [isFav, setIsFav] = useState(isFavouritedInitial);

  const targetHref = href || `/property/${property.slug}`;

  const formatPrice = (val: number, trans: string, curr: string) => {
    const symbol = curr === 'INR' ? '₹' : '$';
    if (trans === 'RENT') {
      return `${symbol}${formatNumber(val)}/mo`;
    }
    if (val >= 10000000) {
      return `${symbol}${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `${symbol}${(val / 100000).toFixed(2)} Lakh`;
    }
    return `${symbol}${formatNumber(val)}`;
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !isFav;
    setIsFav(next);
    if (onFavouriteToggle) onFavouriteToggle(property.id, next);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const phone = property.agent?.phone || '919000072227';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const target = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = encodeURIComponent(
      `Hi ${property.agent?.name || 'Agent'}, I am interested in *${property.title}* (${property.location.locality}, ${property.location.city}) listed on EstateFlow. Please share details & floor plan.`
    );
    window.open(`https://wa.me/${target}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (router) {
      router.push(targetHref);
    } else if (typeof window !== 'undefined') {
      window.location.href = targetHref;
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-500/50 cursor-pointer block text-left no-underline relative',
        className
      )}
    >
      {/* CARD IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={property.mainImage}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

        {/* TOP BADGES */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 items-center z-10">
          {property.verified && (
            <Badge variant="emerald" className="shadow-sm bg-white text-emerald-800 font-black text-[10px] px-2.5 py-1 border border-emerald-200 tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              TS-RERA VERIFIED
            </Badge>
          )}
          {property.qualityScore && (
            <Badge variant="amber" className="shadow-sm bg-amber-500 text-white font-black text-[10px] px-2.5 py-1 border border-amber-300 flex items-center gap-1">
              <Star className="w-3 h-3 fill-current text-white" />
              {property.qualityScore}/100
            </Badge>
          )}
        </div>

        {/* FAVORITE BUTTON & QUICK LAUNCH */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleFavClick}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-800 backdrop-blur-md border border-slate-200 transition-all hover:bg-white hover:text-rose-500 hover:scale-110 shadow-md"
            title={isFav ? 'Remove from Saved' : 'Save Property'}
          >
            <Heart className={cn('w-4 h-4 transition-transform', isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-600')} />
          </button>
        </div>

        {/* PRICE & TRANSACTION OVERLAY PILL */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
          <div className="px-4 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-slate-900">
            <span className="text-lg font-black text-slate-900">
              {formatPrice(property.price, property.transactionType, property.currency)}
            </span>
          </div>

          <span className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
            {property.transactionType}
          </span>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4 bg-white">
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {property.title}
          </h3>
          <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{property.location.locality}, {property.location.city}</span>
          </p>
        </div>

        {/* SPECS GRID PILLS */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
          <div className="space-y-0.5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
              <Bed className="w-3 h-3 text-slate-500" /> Beds
            </span>
            <span className="font-black text-slate-900 text-xs">{property.bedrooms} BHK</span>
          </div>
          <div className="space-y-0.5 flex flex-col items-center border-x border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
              <Bath className="w-3 h-3 text-slate-500" /> Baths
            </span>
            <span className="font-black text-slate-900 text-xs">{property.bathrooms} Baths</span>
          </div>
          <div className="space-y-0.5 flex flex-col items-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-slate-500" /> Area
            </span>
            <span className="font-black text-slate-900 text-xs">{formatNumber(property.areaSqFt)} sq.ft</span>
          </div>
        </div>

        {/* AGENT FOOTER & WHATSAPP / VIEW DETAILS */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2.5">
            {property.agent ? (
              <>
                <Avatar src={property.agent.avatar} name={property.agent.name} size="sm" />
                <div>
                  <span className="font-extrabold text-slate-900 block leading-tight">{property.agent.name}</span>
                  <span className="text-[10px] text-slate-400 font-bold block">{property.agent.agencyName || 'Verified Agent'}</span>
                </div>
              </>
            ) : (
              <span className="font-extrabold text-slate-800">EstateFlow Verified</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
