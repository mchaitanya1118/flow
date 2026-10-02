'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Input,
  Badge,
  Card,
  PropertyCard,
  formatNumber,
} from '@estateflow/ui';
import { DEMO_PROPERTIES, DEMO_PROJECTS } from '../lib/mockData';
import {
  TrendingUp,
  Zap,
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
  Crown,
  Calculator,
  Percent,
  ArrowRight,
  X,
  FileText,
  BarChart3,
  PhoneCall,
  Mail,
  CheckCircle2,
  Award,
  Coins,
  Layers,
  Star,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee 100% reliable autoplay across all browsers (Chrome, Safari, iOS, Firefox)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Force native DOM muted attributes required by browser autoplay security policies (Safari/iOS/Chrome)
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

    // Interaction fallback for strict browser autoplay policies
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

  // Inventory Filter State
  const [inventoryTab, setInventoryTab] = useState<'ALL' | 'VILLA' | 'PENTHOUSE' | 'COMMERCIAL' | 'RENT'>('ALL');

  // Property Comparison State
  const [comparedProperties, setComparedProperties] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // AI Price Estimator Widget State
  const [aiLocality, setAiLocality] = useState('Kokapet Neopolis');
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
    aiLocality === 'Jubilee Hills' ? 14500 :
    aiLocality === 'Kokapet Neopolis' ? 10800 :
    aiLocality === 'Financial District' ? 9600 : 8200;

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

  const developersList = [
    {
      id: 'dev-1',
      name: 'Prestigio Luxury Builders',
      reraId: 'P02400003891',
      rating: 4.9,
      deliveredProjects: 42,
      activeProjects: 6,
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80',
      highlights: 'Pioneer in Ultra-High-Rise Sky Villas & Platinum LEED Green Certified Enclaves.',
    },
    {
      id: 'dev-2',
      name: 'Aparna Heritage Infrastructure',
      reraId: 'P02400004102',
      rating: 4.8,
      deliveredProjects: 68,
      activeProjects: 9,
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
      highlights: 'Telangana’s Most Trusted Developer with 100% On-Time Delivery Record for 20 Years.',
    },
    {
      id: 'dev-3',
      name: 'My Home Real Estate Group',
      reraId: 'P02400002954',
      rating: 4.9,
      deliveredProjects: 55,
      activeProjects: 8,
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      highlights: 'Integrated Mega-Townships & Grade-A Commercial Towers in Financial District.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white" suppressHydrationWarning>
      
      {/* 1. LIVE MARKET TICKER BAR WITH LUCIDE ICONS */}
      <div className="bg-slate-100 text-slate-800 text-xs py-2.5 overflow-hidden sticky top-0 z-40 shadow-sm border-b border-slate-200 font-medium">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <strong className="text-emerald-700">DEMAND SPIKE:</strong> Kokapet Neopolis 3 BHK prices +14.2% YoY (Avg ₹10,800/sq.ft)
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 font-bold">JUST TRANSACTED:</span> Triplex Villa in Jubilee Hills closed for ₹6.85 Cr
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 font-bold">NEW RERA APPROVAL:</span> Prestigio Sky Tower Phase 2 (RERA #P0240000512)
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-bold">ACTIVE BUYERS:</span> 1,480+ HNW Investors actively bidding in Financial District
          </span>
        </div>
      </div>

      {/* 2. HERO SECTION WITH LOCAL HERO VIDEO BACKGROUND */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-10 pb-20 border-b border-slate-800">
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
            onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
            onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            className="h-full w-full object-cover object-center transform scale-105 pointer-events-none"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* HIGH-CONTRAST VIGNETTE OVERLAY TO GUARANTEE 100% TEXT READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/45 to-slate-950/20 pointer-events-none z-0"></div>

        {/* AMBIENT GLOW ACCENT */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-emerald-500/20 blur-[130px] rounded-full pointer-events-none z-0"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO LEFT COLUMN - HIGH CONTRAST LIGHT TYPOGRAPHY */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-slate-950/80 px-4 py-2 text-xs font-bold text-emerald-400 backdrop-blur-md shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="uppercase tracking-widest text-[11px] font-black">INDIA'S PREMIER LUXURY REAL ESTATE MARKETPLACE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
                Architectural Mastery <br />
                <span className="text-emerald-400 underline decoration-emerald-500/60">
                  Meets Capital Growth
                </span>
              </h1>

              <p className="text-slate-200 text-sm sm:text-base font-medium max-w-2xl leading-relaxed drop-shadow-sm">
                Discover Telangana’s finest collection of 100% RERA-cleared luxury villas, high-rise penthouses, and commercial yields across Kokapet, Jubilee Hills, and Gachibowli with instant AI valuation guarantees.
              </p>

              {/* STATS PILL BAR */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/80 max-w-2xl">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">₹8,400+ Cr</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block whitespace-nowrap">Transacted GMV</span>
                </div>
                <div className="space-y-1 border-x border-slate-700/80 px-4">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight drop-shadow-sm">99.4%</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block whitespace-nowrap">Verified Titles</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Building className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-xl sm:text-3xl font-black text-amber-400 tracking-tight drop-shadow-sm">14,200+</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest block whitespace-nowrap">Luxury Homes</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT COLUMN: AI PROPERTY PRICE ESTIMATOR WIDGET */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel-light-glow rounded-3xl p-6 sm:p-8 space-y-6 text-slate-900 border border-slate-200 shadow-2xl relative overflow-hidden bg-white/95 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900">AI Valuation Engine</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Instant Real-Time Market Valuation & Yield Forecast</p>
                    </div>
                  </div>
                  <Badge variant="emerald" className="text-[10px] font-black px-2.5 py-1 uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                    LIVE ML V3
                  </Badge>
                </div>

                {/* ESTIMATOR INPUT FORM */}
                <div className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-600 uppercase tracking-wider text-[10px] block mb-1.5 font-black flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Select Target Micro-Market
                    </label>
                    <select
                      value={aiLocality}
                      onChange={(e) => setAiLocality(e.target.value)}
                      className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-bold shadow-xs cursor-pointer"
                    >
                      <option value="Kokapet Neopolis">Kokapet Neopolis (Golden Mile)</option>
                      <option value="Financial District">Financial District (Gachibowli)</option>
                      <option value="Jubilee Hills">Jubilee Hills (Luxury Ridge)</option>
                      <option value="Kondapur">Kondapur (IT Hub)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 uppercase tracking-wider text-[10px] block mb-1.5 font-black flex items-center gap-1">
                        <Home className="w-3.5 h-3.5 text-slate-500" /> BHK Layout
                      </label>
                      <select
                        value={aiBhk}
                        onChange={(e) => setAiBhk(Number(e.target.value))}
                        className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-bold shadow-xs cursor-pointer"
                      >
                        <option value={2}>2 BHK Suite</option>
                        <option value={3}>3 BHK Luxury</option>
                        <option value={4}>4 BHK Sky Villa</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 uppercase tracking-wider text-[10px] block mb-1.5 font-black flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-500" /> Area (Sq.Ft)
                      </label>
                      <input
                        type="number"
                        value={aiSqft}
                        onChange={(e) => setAiSqft(Number(e.target.value))}
                        className="w-full rounded-xl bg-white border border-slate-200 px-3.5 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 font-bold shadow-xs"
                      />
                    </div>
                  </div>

                  {/* ESTIMATED RESULT BOX WITH VALID PADDING */}
                  <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-slate-900 space-y-3 shadow-sm">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-slate-600 text-xs font-semibold">Estimated Fair Value:</span>
                      <span className="text-2xl font-black text-emerald-800 tracking-tight">
                        ₹{(estimatedValue / 10000000).toFixed(2)} Crore
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-200/80 text-[11px]">
                      <div>
                        <span className="text-slate-500 block font-medium">1-Yr Appreciation:</span>
                        <span className="font-black text-amber-700">+₹{(projected1YrAppreciation / 100000).toFixed(1)} Lakhs (+12.5%)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block font-medium">Est. Monthly Rent:</span>
                        <span className="font-black text-slate-900">₹{formatNumber(estimatedMonthlyRent)}/mo</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowAiModal(true)}
                    variant="primary"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs"
                  >
                    <span>Generate Detailed Valuation Audit Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FLOATING CRISP WHITE SEARCH CARD */}
      <section className="-mt-14 relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel-light-glow p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 bg-white text-left">
          
          {/* SEARCH TABS */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {[
              { id: 'BUY', label: 'Buy Property', icon: Home },
              { id: 'RENT', label: 'Luxury Rent', icon: Key },
              { id: 'NEW_PROJECT', label: 'New Launches', icon: Building2 },
              { id: 'COMMERCIAL', label: 'Commercial Yield', icon: Briefcase },
              { id: 'FRACTIONAL', label: 'Fractional Tokens', icon: Coins },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* SEARCH FORM CONTROLS */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-4 space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> Locality or Corridor
              </label>
              <Input
                placeholder="e.g. Kondapur, Gachibowli, Kokapet Neopolis..."
                value={searchLocation}
                onChange={(e: any) => setSearchLocation(e.target.value)}
                className="bg-slate-50 text-slate-900 border-slate-200 focus:border-slate-400 text-xs font-bold rounded-xl"
              />
            </div>

            <div className="lg:col-span-3 space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-500" /> Asset Category
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-slate-400"
              >
                <option value="ALL">All Asset Types</option>
                <option value="APARTMENT">High-Rise Apartments</option>
                <option value="VILLA">Luxury Gated Villas</option>
                <option value="PENTHOUSE">Sky Penthouses</option>
                <option value="OFFICE">Commercial Office</option>
              </select>
            </div>

            <div className="lg:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Home className="w-3 h-3 text-slate-500" /> BHK Layout
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-slate-400"
              >
                <option value="ANY">Any BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full font-black text-xs py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg rounded-xl flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore 4,500+ Verified Homes</span>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. INTERACTIVE PROPERTY COMPARISON CAROUSEL & FAST FILTERS */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 w-full">
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-slate-200 pb-6 text-left">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-bold text-[11px] px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> RERA AUDITED INVENTORY
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Featured Verified Listings & Comparison
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Select up to 3 listings to compare title scores, floor plans, and pricing metrics.
            </p>
          </div>

          {/* INVENTORY FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            {[
              { id: 'ALL', label: 'All Inventory' },
              { id: 'VILLA', label: 'Luxury Villas' },
              { id: 'PENTHOUSE', label: 'Penthouses' },
              { id: 'COMMERCIAL', label: 'Commercial Yield' },
              { id: 'RENT', label: 'High-End Rent' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInventoryTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  inventoryTab === tab.id
                    ? 'bg-emerald-600 text-white font-black shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
            />
          ))}
        </div>
      </section>

      {/* FLOATING COMPARE BAR DRAWER */}
      {comparedProperties.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel-light-glow px-6 py-4 rounded-3xl border border-slate-300 shadow-2xl flex items-center gap-6 bg-white/95 max-w-2xl w-[90%]">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <span className="text-xs font-black text-slate-900 block">
                {comparedProperties.length} Properties Selected for Comparison
              </span>
              <span className="text-[10px] text-slate-500">Compare pricing, sq.ft rate & RERA compliance</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              onClick={() => setComparedProperties([])}
              variant="outline"
              size="sm"
              className="text-xs font-bold border-slate-300 text-slate-600 hover:text-slate-900"
            >
              Clear
            </Button>
            <Button
              onClick={() => setShowCompareModal(true)}
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4"
            >
              Compare Now →
            </Button>
          </div>
        </div>
      )}

      {/* 5. INSTANT MORTGAGE & ROI YIELD CALCULATOR */}
      <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 w-full">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge variant="emerald" className="font-bold text-[11px] px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit mx-auto">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" /> FINANCIAL CONCIERGE WIDGET
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Instant Mortgage EMI & Annual Yield Calculator
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Simulate loan installments, tax benefits under Sec 24, and net capitalization rates before investing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* CALCULATOR INPUT CONTROL SLIDERS */}
            <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6 text-left shadow-sm">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-600">Property Acquisition Cost</span>
                  <span className="text-emerald-700">₹{(calcPropertyPrice / 10000000).toFixed(2)} Cr</span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={100000000}
                  step={1000000}
                  value={calcPropertyPrice}
                  onChange={(e) => setCalcPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-600">Down Payment ({calcDownPaymentPercent}%)</span>
                    <span className="text-slate-900">₹{(downPaymentAmount / 100000).toFixed(1)} L</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={calcDownPaymentPercent}
                    onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-600">Interest Rate ({calcInterestRate}%)</span>
                    <span className="text-slate-900">HDFC / SBI Rate</span>
                  </div>
                  <input
                    type="range"
                    min={7.5}
                    max={12.0}
                    step={0.1}
                    value={calcInterestRate}
                    onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-600">Loan Tenure ({calcTenureYears} Years)</span>
                    <span className="text-slate-900">{calcTenureYears * 12} Months</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={calcTenureYears}
                    onChange={(e) => setCalcTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-600">Est. Monthly Rental Income</span>
                    <span className="text-emerald-700">₹{formatNumber(calcMonthlyRent)}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={300000}
                    step={5000}
                    value={calcMonthlyRent}
                    onChange={(e) => setCalcMonthlyRent(Number(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 rounded-lg h-2"
                  />
                </div>
              </div>
            </div>

            {/* CALCULATOR OUTPUT SUMMARY CARD */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 space-y-6 text-left text-slate-900 shadow-xl">
              <h3 className="font-black text-xl text-slate-900 border-b border-slate-100 pb-4">
                Financial Yield Summary
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-slate-500 text-xs block font-medium">Estimated Monthly EMI</span>
                    <span className="text-2xl font-black text-emerald-700">₹{formatNumber(calculatedEmi)}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">Principal: ₹{(loanPrincipal / 100000).toFixed(1)} L</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase block font-extrabold flex items-center gap-1">
                      <Percent className="w-3 h-3 text-emerald-600" /> Gross Rental Yield
                    </span>
                    <span className="text-xl font-black text-emerald-800">{rentalYieldPercent}% p.a.</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-slate-500 text-[10px] uppercase block font-extrabold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-600" /> Sec 24 Tax Benefit
                    </span>
                    <span className="text-xl font-black text-amber-700">Up to ₹2.0 L/yr</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs text-slate-700 space-y-1">
                  <span className="font-black text-emerald-800 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Banking Concierge Available
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    EstateFlow buyers get pre-approved home loan rates starting at 8.35% p.a. with zero bank processing fee via SBI, HDFC, and ICICI.
                  </p>
                </div>

                <Button
                  onClick={() => router.push('/home-loans')}
                  variant="primary"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <span>Apply for Instant Pre-Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FEATURED DEVELOPER SPOTLIGHTS & RERA VERIFIED SEALS */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 w-full">
        <div className="flex flex-wrap justify-between items-end gap-6 border-b border-slate-200 pb-6 text-left">
          <div className="space-y-2">
            <Badge variant="emerald" className="font-bold text-[11px] px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> TRUST & COMPLIANCE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Tier-1 RERA Verified Master Developers
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Direct partnership with Hyderabad’s top builders with zero brokerage guarantees.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {developersList.map((dev) => (
            <div
              key={dev.id}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-500/50 glass-card-hover-light space-y-6 flex flex-col justify-between text-left shadow-md"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <img src={dev.logo} alt={dev.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> RERA VERIFIED
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{dev.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">RERA Reg: <strong className="text-slate-800">{dev.reraId}</strong></p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {dev.highlights}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs font-bold">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Delivered</span>
                    <span className="text-base font-black text-slate-900">{dev.deliveredProjects} Projects</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Active Inventory</span>
                    <span className="text-base font-black text-emerald-700">{dev.activeProjects} Enclaves</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setSelectedDeveloper(dev)}
                variant="outline"
                className="w-full border-slate-300 text-slate-900 hover:bg-emerald-600 hover:text-white font-black text-xs py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Connect Developer Concierge</span>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BENTO GRID MICRO-MARKET EXPLORER */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 w-full">
          <div className="text-center space-y-2">
            <Badge variant="emerald" className="font-bold text-[11px] px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit mx-auto">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> PRIME CORRIDORS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Explore Top Telangana Growth Corridors</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">Micro-market analytics, capital growth velocity, and active listing counts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              onClick={() => router.push('/search?locality=Gachibowli')}
              className="md:col-span-2 relative aspect-[16/9] rounded-3xl overflow-hidden cursor-pointer border border-slate-200 group glass-card-hover-light shadow-xl text-left"
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                alt="Gachibowli Financial District"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit">
                  <Building2 className="w-3 h-3" /> Financial District SEZ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">Gachibowli & Nanakramguda</h3>
                <p className="text-xs text-slate-200 font-medium">Avg Rate: ₹9,800/sq.ft • 3,450 Active Verified Listings • 12% YoY Capital Appreciation</p>
              </div>
            </div>

            <div
              onClick={() => router.push('/search?locality=Kokapet')}
              className="relative aspect-[16/9] md:aspect-auto rounded-3xl overflow-hidden cursor-pointer border border-slate-200 group glass-card-hover-light shadow-xl text-left"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Kokapet Neopolis"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 w-fit">
                  <Crown className="w-3 h-3" /> Golden Mile High-Rise
                </span>
                <h3 className="text-2xl font-black text-white">Kokapet Neopolis</h3>
                <p className="text-xs text-slate-200 font-medium">Avg Rate: ₹10,800/sq.ft • 1,820 Active Listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VIP INVESTOR CIRCLE SUBSCRIPTION */}
      <section className="py-24 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-8 sm:p-14 rounded-3xl border border-emerald-100 text-center space-y-6 relative overflow-hidden shadow-xl">
          <Badge variant="emerald" className="font-bold text-[11px] px-4 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 w-fit mx-auto">
            <Mail className="w-3.5 h-3.5 text-emerald-600" /> OFF-MARKET VIP CONCIERGE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Join the EstateFlow Private Investor Circle
          </h2>
          <p className="mx-auto max-w-xl text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Receive priority pre-launch builder allocations, distressed resale price alerts, and private high-net-worth property drops directly to your inbox.
          </p>

          {subscribedMessage ? (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Welcome to EstateFlow VIP Investor Circle! We have dispatched your private market intelligence report.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribedMessage(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your VIP work email address..."
                value={newsletterEmail}
                onChange={(e: any) => setNewsletterEmail(e.target.value)}
                className="bg-white text-slate-900 border-slate-200 text-xs flex-1 rounded-xl p-3.5"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="font-black text-xs py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white whitespace-nowrap shadow-md rounded-xl flex items-center justify-center gap-2"
              >
                <span>Join VIP Circle</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* MODAL 1: AI VALUATION REPORT MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white max-w-lg w-full p-8 rounded-3xl border border-slate-200 space-y-6 text-left relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-600" /> AI Valuation Appraisal
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-900 text-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs font-medium text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Property Profile</span>
                <span className="text-sm font-black text-slate-900 block">{aiBhk} BHK • {aiSqft} Sq.Ft in {aiLocality}</span>
                <span className="text-emerald-700 font-bold block">Estimated Value: ₹{(estimatedValue / 10000000).toFixed(2)} Crore</span>
              </div>

              <p className="text-slate-500 text-[11px] leading-relaxed">
                This appraisal report incorporates 14,000+ historic registration records from Telangana Registration & Stamps Dept, RERA disclosures, and real-time transaction velocity in {aiLocality}.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button onClick={() => setShowAiModal(false)} variant="outline" className="border-slate-300 text-slate-700 font-bold text-xs">
                Close
              </Button>
              <Button onClick={() => { alert('Appraisal PDF downloaded!'); setShowAiModal(false); }} variant="primary" className="bg-emerald-600 text-white font-black text-xs flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Download PDF Audit</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PROPERTY COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white max-w-4xl w-full p-8 rounded-3xl border border-slate-200 space-y-6 text-left relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" /> Side-by-Side Property Comparison
                </h3>
                <p className="text-xs text-slate-500 font-medium">Comparing selected verified assets</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-slate-900 text-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedProperties.map((id) => {
                const item = DEMO_PROPERTIES.find((p) => p.id === id);
                if (!item) return null;
                return (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <img src={item.mainImage} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                    <h4 className="font-black text-sm text-slate-900 line-clamp-1">{item.title}</h4>
                    <div className="space-y-2 text-xs text-slate-700 font-bold border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Price:</span>
                        <span className="text-emerald-700">₹{(item.price / 10000000).toFixed(2)} Cr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Location:</span>
                        <span>{item.location.locality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sq.Ft Rate:</span>
                        <span>₹{Math.round(item.price / item.areaSqFt)}/sqft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">RERA Score:</span>
                        <span className="text-amber-600">{item.qualityScore}/100</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={() => setShowCompareModal(false)} variant="primary" className="bg-emerald-600 text-white font-black text-xs">
                Close Comparison
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DEVELOPER CONCIERGE MODAL */}
      {selectedDeveloper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-slate-200 space-y-6 text-left relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-600" /> Developer Concierge
              </h3>
              <button onClick={() => setSelectedDeveloper(null)} className="text-slate-400 hover:text-slate-900 text-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-3">
                <img src={selectedDeveloper.logo} alt={selectedDeveloper.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">{selectedDeveloper.name}</h4>
                  <span className="text-[10px] text-emerald-700 font-bold">Verified RERA: {selectedDeveloper.reraId}</span>
                </div>
              </div>

              <p className="text-slate-500 text-[11px] leading-relaxed">
                Connect directly with the developer's official sales team for pre-launch discounts, floor plan customization, and site visits.
              </p>

              <div className="space-y-3 pt-2">
                <Input placeholder="Your Full Name" className="bg-slate-50 text-slate-900 border-slate-200 text-xs" />
                <Input placeholder="Your Phone Number" className="bg-slate-50 text-slate-900 border-slate-200 text-xs" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button onClick={() => setSelectedDeveloper(null)} variant="outline" className="border-slate-300 text-slate-700 font-bold text-xs">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert(`Request submitted to ${selectedDeveloper.name} Concierge!`);
                  setSelectedDeveloper(null);
                }}
                variant="primary"
                className="bg-emerald-600 text-white font-black text-xs"
              >
                Request Call Back →
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
