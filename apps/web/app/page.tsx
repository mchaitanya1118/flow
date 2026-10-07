'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Badge,
  formatNumber,
} from '@estateflow/ui';
import { DEMO_PROPERTIES, DEMO_PROJECTS } from '../lib/mockData';
import {
  TrendingUp,
  ShieldCheck,
  Users,
  Bot,
  Home,
  Key,
  Building2,
  Briefcase,
  Sparkles,
  MapPin,
  Search,
  Building,
  Calculator,
  Percent,
  ArrowRight,
  X,
  FileText,
  PhoneCall,
  Mail,
  CheckCircle2,
  Coins,
  Layers,
  Star,
  ExternalLink,
  Lock,
  Heart,
  MessageSquare,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee 100% reliable autoplay across all browsers (Chrome, Safari, iOS, Firefox)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', 'true');
    el.setAttribute('autoplay', '');
    el.defaultMuted = true;
    el.muted = true;

    const attemptPlay = () => {
      if (el) {
        el.muted = true;
        const p = el.play();
        if (p !== undefined) {
          p.catch((err) => {
            console.warn('Safari autoplay pending interaction:', err);
          });
        }
      }
    };

    attemptPlay();

    const handleUserInteraction = () => {
      attemptPlay();
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };

    window.addEventListener('pointerdown', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // Search Bar State
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'NEW_PROJECT' | 'COMMERCIAL' | 'FRACTIONAL'>('BUY');
  const [searchLocation, setSearchLocation] = useState('Kondapur, Hyderabad');
  const [propertyType, setPropertyType] = useState('ALL');
  const [bedrooms, setBedrooms] = useState('ANY');
  const [maxPrice, setMaxPrice] = useState('ANY');

  // Inventory Filter Pill State
  const [inventoryTab, setInventoryTab] = useState<'ALL' | 'VILLA' | 'PENTHOUSE' | 'COMMERCIAL' | 'RENT'>('ALL');

  // Property Comparison State
  const [comparedProperties, setComparedProperties] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // AI Price Estimator Widget State
  const [aiLocality, setAiLocality] = useState('kokapet');
  const [aiBhk, setAiBhk] = useState(3);
  const [aiSqft, setAiSqft] = useState(2250);
  const [showAiModal, setShowAiModal] = useState(false);

  // Mortgage & ROI Yield Calculator State
  const [calcPropertyPrice, setCalcPropertyPrice] = useState(25000000); // 2.5 Cr
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState(20);
  const [calcInterestRate, setCalcInterestRate] = useState(8.5);
  const [calcTenureYears, setCalcTenureYears] = useState(20);
  const [calcMonthlyRent, setCalcMonthlyRent] = useState(75000);

  // Developer Contact Modal State
  const [selectedDeveloper, setSelectedDeveloper] = useState<any | null>(null);

  // VIP Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  // AI Valuation Calculations
  const baseRatePerSqft =
    aiLocality === 'jubilee_hills' ? 14500 :
    aiLocality === 'kokapet' ? 10800 :
    aiLocality === 'financial_district' ? 9800 : 7900;

  const estimatedValue = aiSqft * baseRatePerSqft;
  const projected1YrAppreciation = Math.round(estimatedValue * 0.125);
  const estimatedMonthlyRent = Math.round((estimatedValue * 0.038) / 12);

  // Mortgage Calculations
  const downPaymentAmount = (calcPropertyPrice * calcDownPaymentPercent) / 100;
  const loanPrincipal = calcPropertyPrice - downPaymentAmount;
  const monthlyInterestRate = calcInterestRate / 12 / 100;
  const totalMonths = calcTenureYears * 12;

  const calculatedEmi =
    loanPrincipal > 0 && monthlyInterestRate > 0
      ? Math.round(
          (loanPrincipal *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalMonths)) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : 0;

  const grossAnnualRent = calcMonthlyRent * 12;
  const rentalYieldPercent = calcPropertyPrice > 0 ? ((grossAnnualRent / calcPropertyPrice) * 100).toFixed(2) : '0';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('transactionType', activeTab);
    if (searchLocation) params.set('locality', searchLocation);
    if (propertyType !== 'ALL') params.set('propertyType', propertyType);
    if (bedrooms !== 'ANY') params.set('bedrooms', bedrooms);
    if (maxPrice !== 'ANY') params.set('maxPrice', maxPrice);

    router.push(`/search?${params.toString()}`);
  };

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (comparedProperties.includes(id)) {
      setComparedProperties(comparedProperties.filter((item) => item !== id));
    } else {
      if (comparedProperties.length >= 3) {
        alert('You can compare a maximum of 3 properties side-by-side.');
        return;
      }
      setComparedProperties([...comparedProperties, id]);
    }
  };

  const filteredProperties = DEMO_PROPERTIES.filter((p) => {
    if (inventoryTab === 'VILLA' && p.propertyType !== 'VILLA') return false;
    if (inventoryTab === 'PENTHOUSE' && p.propertyType !== 'PENTHOUSE') return false;
    if (inventoryTab === 'COMMERCIAL' && p.transactionType !== 'COMMERCIAL') return false;
    if (inventoryTab === 'RENT' && p.transactionType !== 'RENT') return false;
    return true;
  });

  return (
    <div className="w-full bg-surface-canvas font-body-md text-on-surface antialiased">
      {/* 1. LIVE MARKET TICKER STRIP */}
      <div className="w-full bg-slate-950 text-slate-200 py-2.5 px-4 sm:px-6 overflow-hidden flex items-center justify-between text-[11px] tracking-wide border-b border-slate-800 relative z-30">
        <div className="flex items-center gap-2 shrink-0 pr-4 bg-slate-950 z-10 border-r border-slate-800/80">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="uppercase text-emerald-400 font-extrabold tracking-wider">Live Corridor Pulse</span>
        </div>

        <div className="whitespace-nowrap overflow-hidden flex-1 mx-4">
          <div className="animate-marquee flex items-center gap-8 font-semibold">
            <div className="flex items-center gap-4">
              <strong className="text-amber-400 font-bold">DEMAND SPIKE:</strong>
              <span className="text-slate-200">Kokapet Neopolis 3 BHK prices +14.2% YoY (Avg ₹10,800/sq.ft)</span>
              <span className="text-slate-600">•</span>
              <strong className="text-emerald-400 font-bold">JUST TRANSACTED:</strong>
              <span className="text-slate-200">Triplex Villa in Jubilee Hills closed for ₹6.85 Cr</span>
              <span className="text-slate-600">•</span>
              <strong className="text-amber-400 font-bold">NEW RERA APPROVAL:</strong>
              <span className="text-slate-200">Prestigio Sky Tower Phase 2</span>
              <span className="text-slate-600">•</span>
              <span className="text-teal-400 font-bold">1,480+ Active HNW Buyers</span>
              <span className="text-slate-600">•</span>
            </div>

            {/* DUPLICATE FOR CONTINUOUS 100% INFINITE LOOP */}
            <div className="flex items-center gap-4" aria-hidden="true">
              <strong className="text-amber-400 font-bold">DEMAND SPIKE:</strong>
              <span className="text-slate-200">Kokapet Neopolis 3 BHK prices +14.2% YoY (Avg ₹10,800/sq.ft)</span>
              <span className="text-slate-600">•</span>
              <strong className="text-emerald-400 font-bold">JUST TRANSACTED:</strong>
              <span className="text-slate-200">Triplex Villa in Jubilee Hills closed for ₹6.85 Cr</span>
              <span className="text-slate-600">•</span>
              <strong className="text-amber-400 font-bold">NEW RERA APPROVAL:</strong>
              <span className="text-slate-200">Prestigio Sky Tower Phase 2</span>
              <span className="text-slate-600">•</span>
              <span className="text-teal-400 font-bold">1,480+ Active HNW Buyers</span>
              <span className="text-slate-600">•</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-400 shrink-0 pl-4 bg-slate-950 z-10 border-l border-slate-800/80">
          <span className="font-semibold text-slate-300">INR (₹)</span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span> TS-RERA Monitored
          </span>
        </div>
      </div>

      {/* 2. SOVEREIGN ARCHITECTURAL HERO SECTION WITH BACKGROUND VIDEO */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden pb-28 sm:pb-32 pt-10 sm:pt-14 border-b border-slate-800">
        {/* BACKGROUND LOCAL MP4 VIDEO (/herovideo.mp4) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={videoRef}
            src="/herovideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            suppressHydrationWarning
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            className="h-full w-full object-cover object-center transform scale-105 pointer-events-none opacity-65"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Ambient architectural overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/35 to-slate-950/20 pointer-events-none z-0"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 z-10">
          {/* Grid: Hero Typography & AI Valuation Engine Cockpit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Sovereign Title & Stats */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              {/* Top Tagline Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-emerald-400 shadow-md border border-emerald-500/30 backdrop-blur-xl">
                  <span className="material-symbols-outlined text-[15px] text-emerald-400">verified</span>
                  <span className="font-sans tracking-widest uppercase text-emerald-400 font-extrabold text-[11px]">
                    India's Premier Sovereign Real Estate Marketplace
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-black tracking-tight leading-[1.15] drop-shadow-md">
                Architectural Mastery<br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent italic">
                  Meets Capital Growth
                </span>
              </h1>

              <p className="font-sans text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed font-medium drop-shadow-sm">
                Discover Telangana’s finest collection of 100% RERA-cleared luxury villas, high-rise penthouses, and commercial yields across Kokapet, Jubilee Hills, and Gachibowli with instant AI valuation guarantees.
              </p>

              {/* High-Impact Trust KPI Metrics */}
              <div className="pt-2 grid grid-cols-3 gap-3">
                <div className="bg-slate-900/90 rounded-2xl p-3.5 shadow-xl border border-slate-800/90 flex flex-col backdrop-blur-xl hover:border-emerald-500/40 transition-all">
                  <span className="font-sans text-xl sm:text-2xl text-emerald-400 font-black">₹8,400+ Cr</span>
                  <span className="font-sans text-[11px] text-slate-400 font-semibold mt-0.5">Transacted GMV</span>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-3.5 shadow-xl border border-slate-800/90 flex flex-col backdrop-blur-xl hover:border-amber-400/40 transition-all">
                  <span className="font-sans text-xl sm:text-2xl text-amber-400 font-black">99.4%</span>
                  <span className="font-sans text-[11px] text-slate-400 font-semibold mt-0.5">Verified Titles</span>
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-3.5 shadow-xl border border-slate-800/90 flex flex-col backdrop-blur-xl hover:border-slate-700 transition-all">
                  <span className="font-sans text-xl sm:text-2xl text-white font-black">14,200+</span>
                  <span className="font-sans text-[11px] text-slate-400 font-semibold mt-0.5">Luxury Homes</span>
                </div>
              </div>
            </div>

            {/* Right: AI Valuation Engine Cockpit (Compact Small Variant) */}
            <div className="lg:col-span-5 relative flex justify-end">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden text-slate-900 border border-slate-200 w-full max-w-md">
                {/* Header bar of Cockpit */}
                <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">analytics</span>
                    <div>
                      <h2 className="font-sans text-sm font-extrabold leading-none text-slate-900">AI Valuation Engine</h2>
                      <span className="font-sans text-[11px] text-slate-500 mt-0.5 block">Real-Time Market Valuation & Yield</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-sans text-[9px] font-black tracking-wider uppercase border border-emerald-200">
                    Live ML v3
                  </span>
                </div>

                {/* Cockpit Form Interactive Fields */}
                <div className="p-4 space-y-2.5">
                  {/* Select Micro Market */}
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-emerald-600">pin_drop</span> Target Micro-Market
                    </label>
                    <div className="relative">
                      <select
                        value={aiLocality}
                        onChange={(e) => setAiLocality(e.target.value)}
                        className="w-full bg-slate-50 rounded-lg px-3 py-1.5 font-sans text-xs text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-bold"
                      >
                        <option value="kokapet">Kokapet Neopolis (Golden Mile)</option>
                        <option value="financial_district">Financial District (Gachibowli)</option>
                        <option value="jubilee_hills">Jubilee Hills (Luxury Ridge)</option>
                        <option value="kondapur">Kondapur (IT Hub)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-2 text-slate-400 text-[16px] pointer-events-none">unfold_more</span>
                    </div>
                  </div>

                  {/* Configuration Rows: BHK & Area */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="font-sans text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-amber-500">bed</span> BHK Layout
                      </label>
                      <select
                        value={aiBhk}
                        onChange={(e) => setAiBhk(Number(e.target.value))}
                        className="w-full bg-slate-50 rounded-lg px-2.5 py-1.5 font-sans text-xs text-slate-900 appearance-none focus:outline-none border border-slate-200 font-bold"
                      >
                        <option value={2}>2 BHK Suite</option>
                        <option value={3}>3 BHK Luxury</option>
                        <option value={4}>4 BHK Sky Villa</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] uppercase text-slate-500 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-teal-600">straighten</span> Area (Sq.Ft)
                      </label>
                      <input
                        type="number"
                        value={aiSqft}
                        onChange={(e) => setAiSqft(Number(e.target.value))}
                        className="w-full bg-slate-50 rounded-lg px-2.5 py-1.5 font-sans text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-bold"
                      />
                    </div>
                  </div>

                  {/* Real-time Live Valuation Card output */}
                  <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[11px] text-slate-500 font-medium">Estimated Fair Value</span>
                      <span className="font-sans text-xl text-emerald-600 font-black">
                        ₹{(estimatedValue / 10000000).toFixed(2)} Crore
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <div className="bg-white p-2 rounded-lg flex flex-col border border-slate-200">
                        <span className="font-sans text-[9px] uppercase text-slate-500 font-bold">1-Yr Appreciation</span>
                        <span className="font-sans text-[11px] font-black text-emerald-600 mt-0.5">
                          +₹{(projected1YrAppreciation / 100000).toFixed(1)} L (+12.5%)
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded-lg flex flex-col border border-slate-200">
                        <span className="font-sans text-[9px] uppercase text-slate-500 font-bold">Est. Monthly Rent</span>
                        <span className="font-sans text-[11px] font-black text-slate-900 mt-0.5">
                          ₹{formatNumber(estimatedMonthlyRent)}/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Valuation Report CTA */}
                  <button
                    type="button"
                    onClick={() => setShowAiModal(true)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-sans text-xs font-black py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 border border-emerald-500/30 transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Generate Valuation Audit Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OMNICHANNEL PROPERTY DISCOVERY & FILTER BAR */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-24 z-20 w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-6 border border-slate-200">
          {/* Transaction Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {[
              { id: 'BUY', label: 'Buy Property', icon: 'apartment' },
              { id: 'RENT', label: 'Luxury Rent', icon: 'key' },
              { id: 'NEW_PROJECT', label: 'New Launches', icon: 'domain_add' },
              { id: 'COMMERCIAL', label: 'Commercial Yield', icon: 'trending_up' },
              { id: 'FRACTIONAL', label: 'Fractional Tokens', icon: 'token' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-full font-headline-sm text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-black shadow-lg shadow-emerald-600/25 border border-emerald-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-bold'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Discovery Search Fields Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 items-end">
            <div className="space-y-1.5">
              <label className="font-label-caps text-[11px] uppercase text-secondary font-extrabold">Locality or Corridor</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-secondary text-[18px]">location_on</span>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-surface-canvas rounded-xl pl-10 pr-3.5 py-3 font-body-md text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-semibold"
                  placeholder="Enter locality e.g. Kondapur"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-label-caps text-[11px] uppercase text-secondary font-extrabold">Asset Category</label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-surface-canvas rounded-xl px-3.5 py-3 font-body-md text-xs sm:text-sm text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-semibold"
                >
                  <option value="ALL">All Asset Types</option>
                  <option value="APARTMENT">High-Rise Apartments</option>
                  <option value="VILLA">Luxury Gated Villas</option>
                  <option value="PENTHOUSE">Sky Penthouses</option>
                  <option value="COMMERCIAL">Commercial Office</option>
                </select>
                <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-secondary text-[18px] pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-label-caps text-[11px] uppercase text-secondary font-extrabold">BHK Layout</label>
              <div className="relative">
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-surface-canvas rounded-xl px-3.5 py-3 font-body-md text-xs sm:text-sm text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-semibold"
                >
                  <option value="ANY">Any BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
                <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-secondary text-[18px] pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-headline-sm text-xs sm:text-sm font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 border border-emerald-500/30 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Explore 4,500+ Verified Homes</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. FEATURED RERA-AUDITED VERIFIED LISTINGS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-16 w-full">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary font-label-caps text-xs uppercase font-extrabold tracking-widest mb-2">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>RERA Audited Inventory</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-headline-lg font-bold text-on-surface">
              Featured Verified Listings & Comparison
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-secondary mt-1">
              Select up to 3 listings to compare title scores, floor plans, and pricing metrics side-by-side.
            </p>
          </div>

          {/* Segment Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
            {[
              { id: 'ALL', label: 'All Inventory' },
              { id: 'VILLA', label: 'Luxury Villas' },
              { id: 'PENTHOUSE', label: 'Penthouses' },
              { id: 'COMMERCIAL', label: 'Commercial Yield' },
              { id: 'RENT', label: 'High-End Rent' },
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setInventoryTab(pill.id as any)}
                className={`px-4 py-2 rounded-full font-body-sm text-xs font-bold transition-all ${
                  inventoryTab === pill.id
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-md shadow-emerald-600/25 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 font-bold'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Premium Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-slate-200"
            >
              <div className="relative h-64 w-full overflow-hidden bg-surface-dark">
                <img
                  src={prop.mainImage}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-transparent to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                  <span className="bg-champagne-subtle text-tertiary font-label-caps text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-amber-200">
                    <span className="material-symbols-outlined text-[13px] text-champagne-gold">verified</span> TS-RERA VERIFIED
                  </span>
                  <span className="bg-emerald-subtle text-primary font-label-caps text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm border border-emerald-200">
                    <span className="material-symbols-outlined text-[13px]">star</span> {prop.qualityScore || 94}/100
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleCompare(prop.id, e)}
                  title="Compare property"
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    comparedProperties.includes(prop.id)
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/80 text-on-surface hover:text-error'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {comparedProperties.includes(prop.id) ? 'check' : 'favorite'}
                  </span>
                </button>

                {/* Price Tag floating bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-tertiary">
                  <span className="font-headline-md text-2xl font-black text-white">
                    {prop.transactionType === 'RENT' ? `₹${(prop.price / 1000).toFixed(0)}k/mo` : `₹${(prop.price / 10000000).toFixed(2)} Cr`}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary font-label-caps text-[10px] font-black text-on-primary uppercase tracking-wider">
                    {prop.transactionType}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {prop.title}
                  </h3>
                  <p className="font-body-sm text-xs text-secondary flex items-center gap-1 mt-1.5">
                    <span className="material-symbols-outlined text-[15px] text-outline">location_on</span> {prop.location.locality}, {prop.location.city}
                  </p>
                </div>

                {/* Specs Matrix */}
                <div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-2xl text-center border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Beds</span>
                    <span className="font-body-md text-xs sm:text-sm font-black text-on-surface mt-0.5">{prop.bedrooms} BHK</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Baths</span>
                    <span className="font-body-md text-xs sm:text-sm font-black text-on-surface mt-0.5">{prop.bathrooms} Baths</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Area</span>
                    <span className="font-body-md text-xs sm:text-sm font-black text-on-surface mt-0.5">{formatNumber(prop.areaSqFt)} sq.ft</span>
                  </div>
                </div>

                {/* Agent attribution and WhatsApp action */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-black text-primary text-xs border border-emerald-300">
                      {prop.agent?.name ? prop.agent.name.substring(0, 2).toUpperCase() : 'EF'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-xs font-bold text-on-surface leading-tight">{prop.agent?.name || 'Rajesh Sharma'}</span>
                      <span className="font-label-caps text-[10px] text-secondary font-medium">{prop.agent?.agencyName || 'Apex Prime Realty'}</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919000072227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-body-sm text-xs font-bold hover:from-emerald-500 hover:to-emerald-600 shadow-md shadow-emerald-600/20 border border-emerald-500/30 transition-all active:scale-[0.97]"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compare Floating Bar Trigger */}
        {comparedProperties.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-4 border border-slate-700 animate-fade-in">
            <span className="text-xs font-bold">
              Comparing <strong className="text-emerald-400">{comparedProperties.length}</strong> properties
            </span>
            <button
              type="button"
              onClick={() => setShowCompareModal(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-amber-500/25 border border-amber-400/40 transition active:scale-[0.98]"
            >
              Open Comparison Matrix
            </button>
            <button
              type="button"
              onClick={() => setComparedProperties([])}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕ Clear
            </button>
          </div>
        )}
      </section>

      {/* 5. FINANCIAL CONCIERGE WIDGET: INSTANT MORTGAGE EMI & ANNUAL YIELD CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-subtle text-primary font-label-caps text-xs uppercase font-extrabold tracking-widest mb-3 border border-emerald-200">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Financial Concierge Widget</span>
          </div>
          <h2 className="font-headline-lg text-3xl sm:text-headline-lg font-bold text-on-surface">
            Instant Mortgage EMI & Annual Yield Calculator
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-secondary mt-2">
            Simulate loan installments, tax benefits under Sec 24, and net capitalization rates before investing.
          </p>
        </div>

        {/* Asymmetric 7:5 Ratio Calculator Layout */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200">
          {/* Left: Interactive Sliders & Inputs */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            {/* Property Cost Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-sm font-bold text-on-surface">Property Acquisition Cost</span>
                <span className="font-headline-sm text-xl font-black text-primary">
                  ₹{(calcPropertyPrice / 10000000).toFixed(2)} Cr
                </span>
              </div>
              <input
                type="range"
                min={5000000}
                max={100000000}
                step={1000000}
                value={calcPropertyPrice}
                onChange={(e) => setCalcPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Down Payment Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-sm font-bold text-on-surface">Down Payment ({calcDownPaymentPercent}%)</span>
                <span className="font-headline-sm text-base font-bold text-on-surface">
                  ₹{(downPaymentAmount / 100000).toFixed(1)} L
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={calcDownPaymentPercent}
                onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Loan Tenure & Interest Rate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface-canvas p-4 rounded-2xl space-y-1 border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Interest Rate</span>
                  <span className="font-body-sm text-xs font-bold text-primary">{calcInterestRate}% p.a.</span>
                </div>
                <p className="font-body-sm text-xs text-on-surface font-bold">HDFC / SBI Benchmark Rate</p>
              </div>
              <div className="bg-surface-canvas p-4 rounded-2xl space-y-1 border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Loan Tenure</span>
                  <span className="font-body-sm text-xs font-bold text-on-surface">{calcTenureYears} Years</span>
                </div>
                <p className="font-body-sm text-xs text-secondary font-medium">{calcTenureYears * 12} Months Amortization</p>
              </div>
            </div>

            {/* Est. Monthly Rental Income */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <span className="font-body-md text-sm font-bold text-on-surface">Est. Monthly Rental Income</span>
                <span className="font-headline-sm text-base font-bold text-champagne-gold">
                  ₹{formatNumber(calcMonthlyRent)}
                </span>
              </div>
              <input
                type="range"
                min={20000}
                max={250000}
                step={5000}
                value={calcMonthlyRent}
                onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Right: Financial Yield Summary */}
          <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-10 flex flex-col justify-between space-y-6 border-l border-slate-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Financial Yield Summary</h3>
                <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
              </div>

              {/* Main Estimated EMI Highlight */}
              <div className="bg-white p-5 rounded-2xl shadow-sm space-y-2 my-5 border border-slate-200">
                <span className="font-label-caps text-[10px] uppercase text-secondary font-extrabold">Estimated Monthly EMI</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-numeric-metric text-2xl sm:text-3xl text-primary font-black">
                    ₹{formatNumber(calculatedEmi)}
                  </span>
                  <span className="font-body-sm text-xs text-secondary font-medium">
                    Principal: ₹{(loanPrincipal / 100000).toFixed(1)} L
                  </span>
                </div>
              </div>

              {/* Gross Rental Yield & Tax Benefit Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <span className="font-label-caps text-[10px] uppercase text-secondary font-bold block mb-1">Gross Rental Yield</span>
                  <span className="font-headline-sm text-lg text-primary font-black">{rentalYieldPercent}% p.a.</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <span className="font-label-caps text-[10px] uppercase text-secondary font-bold block mb-1">Sec 24 Tax Benefit</span>
                  <span className="font-headline-sm text-lg text-champagne-gold font-black">Up to ₹2.0 L/yr</span>
                </div>
              </div>

              {/* Banking Concierge Offer Box */}
              <div className="bg-emerald-subtle rounded-2xl p-4 flex gap-3 text-on-surface border border-emerald-200">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0">verified_user</span>
                <div className="space-y-1 text-xs">
                  <span className="font-body-sm font-bold text-primary block leading-tight">Banking Concierge Available</span>
                  <p className="font-body-sm text-on-surface-variant leading-snug">
                    EstateFlow buyers get pre-approved home loan rates starting at 8.35% p.a. with zero bank processing fee via SBI, HDFC, and ICICI.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/home-loans" className="w-full">
              <button
                type="button"
                className="w-full bg-gradient-to-r from-primary to-primary-container hover:opacity-95 text-on-primary font-headline-sm text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Apply for Instant Pre-Approval</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. TRUST & COMPLIANCE: TIER-1 RERA VERIFIED MASTER DEVELOPERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary font-label-caps text-xs uppercase font-extrabold tracking-widest mb-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Trust & Compliance</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-headline-lg font-bold text-on-surface">
              Tier-1 RERA Verified Master Developers
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-secondary mt-1">
              Direct partnership with Hyderabad’s top builders with zero brokerage guarantees.
            </p>
          </div>
        </div>

        {/* 3 Developer Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Prestigio Luxury Builders',
              rera: 'P02400003891',
              desc: 'Pioneer in Ultra-High-Rise Sky Villas & Platinum LEED Green Certified Enclaves.',
              delivered: '42 Projects',
              active: '6 Enclaves',
              icon: 'domain',
            },
            {
              name: 'Aparna Heritage Infrastructure',
              rera: 'P02400004102',
              desc: 'Telangana’s Most Trusted Developer with 100% On-Time Delivery Record for 20 Years.',
              delivered: '68 Projects',
              active: '9 Enclaves',
              icon: 'apartment',
            },
            {
              name: 'My Home Real Estate Group',
              rera: 'P02400002954',
              desc: 'Integrated Mega-Townships & Grade-A Commercial Towers in Financial District.',
              delivered: '55 Projects',
              active: '8 Enclaves',
              icon: 'corporate_fare',
            },
          ].map((dev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all border border-slate-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-surface-dark text-white flex items-center justify-center font-bold text-lg">
                    <span className="material-symbols-outlined text-emerald-glow">{dev.icon}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-champagne-subtle text-tertiary font-label-caps text-[10px] font-extrabold flex items-center gap-1 border border-amber-200">
                    <span className="material-symbols-outlined text-[13px] text-champagne-gold">verified</span> RERA VERIFIED
                  </span>
                </div>

                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">{dev.name}</h3>
                  <span className="font-body-sm text-xs text-secondary block mt-0.5">
                    RERA Reg: <strong className="text-on-surface">{dev.rera}</strong>
                  </span>
                  <p className="font-body-md text-xs text-on-surface-variant mt-2.5 leading-relaxed font-medium">
                    {dev.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-surface-container-low p-3 rounded-2xl text-center border border-slate-100">
                    <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Delivered</span>
                    <span className="font-headline-sm text-sm font-black text-on-surface block mt-0.5">{dev.delivered}</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-2xl text-center border border-slate-100">
                    <span className="font-label-caps text-[10px] uppercase text-secondary font-bold">Active Inventory</span>
                    <span className="font-headline-sm text-sm font-black text-primary block mt-0.5">{dev.active}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDeveloper(dev)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-headline-sm text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 border border-amber-400/40 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span>Connect Developer Concierge</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRIME CORRIDORS: HIGH-FIDELITY VISUAL HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-primary font-label-caps text-xs uppercase font-extrabold tracking-widest mb-2">
              <span className="material-symbols-outlined text-[16px]">explore</span>
              <span>Prime Corridors</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-headline-lg font-bold text-on-surface">
              Explore Top Telangana Growth Corridors
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-secondary mt-1">
              Micro-market analytics, capital growth velocity, and active listing counts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Corridor 1 */}
          <Link
            href="/search?locality=Gachibowli"
            className="group relative rounded-3xl overflow-hidden shadow-lg h-96 flex flex-col justify-end p-8 text-on-tertiary border border-slate-800"
          >
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
              alt="Gachibowli Financial District"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent"></div>
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-emerald-800">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> Financial District SEZ
              </span>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white">
                Gachibowli & Nanakramguda
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-slate-300">
                Avg Rate: ₹9,800/sq.ft • 3,450 Active Verified Listings • 12% YoY Capital Appreciation
              </p>
            </div>
          </Link>

          {/* Corridor 2 */}
          <Link
            href="/search?locality=Kokapet"
            className="group relative rounded-3xl overflow-hidden shadow-lg h-96 flex flex-col justify-end p-8 text-on-tertiary border border-slate-800"
          >
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="Kokapet Neopolis"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent"></div>
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-amber-950/80 backdrop-blur-md text-amber-300 font-label-caps text-[10px] font-bold uppercase tracking-wider border border-amber-800">
                <span className="material-symbols-outlined text-[14px]">workspace_premium</span> Golden Mile High-Rise
              </span>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white">
                Kokapet Neopolis
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-slate-300">
                Avg Rate: ₹10,800/sq.ft • 1,820 Active Verified Listings • 14.2% YoY Capital Growth
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 8. OFF-MARKET VIP CONCIERGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-14 text-center max-w-4xl mx-auto relative overflow-hidden border border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-subtle text-primary font-label-caps text-xs uppercase font-extrabold tracking-widest mb-4 border border-emerald-200">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Off-Market VIP Concierge</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mb-3">
            Join the EstateFlow Private Investor Circle
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            Receive priority pre-launch builder allocations, distressed resale price alerts, and private high-net-worth property drops directly to your inbox.
          </p>

          {/* Email Capture Form */}
          {subscribedMessage ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs max-w-md mx-auto flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">verified</span>
              <span>Welcome to the EstateFlow Private Investor Circle! Concierge will reach out shortly.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribedMessage(true);
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-secondary text-[18px]">mail</span>
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your VIP work email address..."
                  className="w-full bg-surface-canvas rounded-xl pl-10 pr-4 py-3.5 font-body-md text-xs sm:text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 font-semibold"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-headline-sm text-xs sm:text-sm font-black px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 border border-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Join VIP Circle</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* AI VALUATION MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">analytics</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">AI Valuation Audit Report</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-900 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-2 border border-slate-200">
                <div className="flex justify-between font-bold">
                  <span className="text-secondary">Micro-Market:</span>
                  <span className="text-on-surface uppercase">{aiLocality.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-secondary">Selected Configuration:</span>
                  <span className="text-on-surface">{aiBhk} BHK • {formatNumber(aiSqft)} Sq.Ft</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-primary pt-2 border-t border-slate-200">
                  <span>ML Estimated Fair Value:</span>
                  <span>₹{(estimatedValue / 10000000).toFixed(2)} Crore</span>
                </div>
              </div>

              <p className="text-secondary font-medium leading-relaxed">
                This ML v3 valuation report compares 2,400+ recent TS-RERA registration deeds, sub-registrar land rates, and active demand indicators.
              </p>
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs"
            >
              Close Valuation Audit
            </button>
          </div>
        </div>
      )}

      {/* DEVELOPER CONCIERGE MODAL */}
      {selectedDeveloper && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">{selectedDeveloper.name}</h3>
                <span className="text-xs text-secondary font-medium">RERA: {selectedDeveloper.rera}</span>
              </div>
              <button onClick={() => setSelectedDeveloper(null)} className="text-slate-400 hover:text-slate-900 font-bold text-lg">✕</button>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <p className="text-secondary">{selectedDeveloper.desc}</p>
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ Priority Builder Direct Desk Allocation Enabled with Zero Brokerage Guarantee.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919000072227"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl text-xs text-center shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp Desk</span>
              </a>
              <button
                onClick={() => setSelectedDeveloper(null)}
                className="px-4 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
