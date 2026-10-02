'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@estateflow/ui';
import {
  Sliders,
  Phone,
  MessageSquare,
  Globe,
  Save,
  CheckCircle2,
  TrendingUp,
  Flame,
  Video,
  Search,
  Percent,
  Share2,
  ExternalLink,
} from 'lucide-react';

export default function EntryCmsWebPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'CONTACT' | 'HERO' | 'TICKER' | 'SEO' | 'CALCULATOR'>('CONTACT');

  // 1. WhatsApp & Support Desk State
  const [whatsappPhone, setWhatsappPhone] = useState('+91 9000072227');
  const [callDeskPhone, setCallDeskPhone] = useState('+91 9000072227');
  const [supportEmail, setSupportEmail] = useState('support@estateflow.io');
  const [officeAddress, setOfficeAddress] = useState('HITEC City, Knowledge City, Hyderabad, 500081');

  // 2. Hero Section Media & Typography State
  const [heroVideoUrl, setHeroVideoUrl] = useState('/herovideo.mp4');
  const [vignetteOpacity, setVignetteOpacity] = useState('65');
  const [heroBadgeText, setHeroBadgeText] = useState("INDIA'S PREMIER LUXURY REAL ESTATE MARKETPLACE");
  const [heroHeading, setHeroHeading] = useState('Architectural Mastery Meets Capital Growth');
  const [heroSubheading, setHeroSubheading] = useState(
    'Discover Telangana’s finest collection of 100% RERA-cleared luxury villas, high-rise penthouses, and commercial yields across Kokapet, Jubilee Hills, and Gachibowli.'
  );

  // 3. Live Ticker Stream State
  const [tickerSpeed, setTickerSpeed] = useState('35');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [tickerMessage, setTickerMessage] = useState(
    'DEMAND SPIKE: Kokapet Neopolis 3 BHK prices +14.2% YoY (Avg ₹10,800/sq.ft) • JUST TRANSACTED: Triplex Villa in Jubilee Hills closed for ₹6.85 Cr • NEW RERA APPROVAL: Prestigio Sky Tower Phase 2 (#P0240000512)'
  );

  // 4. SEO & Social OpenGraph State
  const [metaTitle, setMetaTitle] = useState('EstateFlow — Enterprise Real Estate & Verified Property Marketplace');
  const [metaDescription, setMetaDescription] = useState(
    'Find, buy, rent, and invest in TS-RERA verified properties, new builder projects, luxury villas, and commercial spaces with EstateFlow.'
  );
  const [ogImageUrl, setOgImageUrl] = useState(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  );
  const [twitterHandle, setTwitterHandle] = useState('@estateflow');

  // 5. Calculator & Rates State
  const [baseInterestRate, setBaseInterestRate] = useState('8.5');
  const [stampDutyRate, setStampDutyRate] = useState('7.5');
  const [defaultDownPayment, setDefaultDownPayment] = useState('20');

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 min-h-screen text-slate-100">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Badge variant="emerald" className="mb-2 font-bold">Entry Website CMS Suite</Badge>
          <h1 className="text-3xl font-black text-white">Entry Website Master CMS Control</h1>
          <p className="text-sm text-slate-400 font-medium">Manage real-time live tickers, hero background video streaming, contact desk (+91 9000072227), SEO cards, and calculator presets.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3001/cms"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 transition"
          >
            <span>Open Admin Portal CMS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <Button
            onClick={handleSaveCms}
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Deploy CMS</span>
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Entry Website CMS configuration saved & deployed live across all active user sessions!
          </span>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-500 hover:text-white">✕</button>
        </div>
      )}

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold">
        {[
          { id: 'CONTACT', label: '📞 Contact & WhatsApp Desk', icon: Phone },
          { id: 'HERO', label: '🎬 Hero Video & Typography', icon: Video },
          { id: 'TICKER', label: '🔥 Live Market Ticker', icon: Flame },
          { id: 'SEO', label: '🌐 SEO & Social OpenGraph', icon: Share2 },
          { id: 'CALCULATOR', label: '🧮 Calculator & Pricing Rates', icon: Percent },
        ].map((tb) => {
          return (
            <button
              key={tb.id}
              onClick={() => setActiveTab(tb.id as any)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === tb.id
                  ? 'bg-emerald-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tb.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSaveCms} className="space-y-8">
        {/* TAB 1: CONTACT & WHATSAPP DESK */}
        {activeTab === 'CONTACT' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="font-black text-white text-base">WhatsApp Support & Direct Phone Desk Setup</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bold">
              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">WhatsApp Concierge Phone Number</label>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-emerald-400 font-black text-sm focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 font-normal">Controls floating WhatsApp widget button (+91 9000072227).</span>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Direct Phone Call Desk Line</label>
                <input
                  type="text"
                  value={callDeskPhone}
                  onChange={(e) => setCallDeskPhone(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-black text-sm focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 font-normal">Target number for direct call hover expansion badge.</span>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Customer Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Corporate Office Address</label>
                <input
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO VIDEO & TYPOGRAPHY */}
        {activeTab === 'HERO' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Video className="w-5 h-5 text-teal-400" />
              <h3 className="font-black text-white text-base">Hero Background Video & Typography CMS</h3>
            </div>

            <div className="space-y-6 text-xs font-bold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">Background MP4 Video Stream Path</label>
                  <input
                    type="text"
                    value={heroVideoUrl}
                    onChange={(e) => setHeroVideoUrl(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-mono"
                  />
                  <span className="text-[11px] text-slate-500 font-normal">Default: /herovideo.mp4</span>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">Vignette Darkness Overlay ({vignetteOpacity}%)</label>
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={vignetteOpacity}
                    onChange={(e) => setVignetteOpacity(e.target.value)}
                    className="w-full accent-emerald-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Hero Top Badge Text</label>
                <input
                  type="text"
                  value={heroBadgeText}
                  onChange={(e) => setHeroBadgeText(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-emerald-400 font-black"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Hero Main Heading (H1)</label>
                <input
                  type="text"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-black text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={heroSubheading}
                  onChange={(e) => setHeroSubheading(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-200 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE MARKET TICKER */}
        {activeTab === 'TICKER' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white text-base">Live Ticker Stream Configuration</h3>
            </div>

            <div className="space-y-6 text-xs font-bold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">Marquee Scroll Duration ({tickerSpeed}s)</label>
                  <input
                    type="range"
                    min={15}
                    max={60}
                    value={tickerSpeed}
                    onChange={(e) => setTickerSpeed(e.target.value)}
                    className="w-full accent-emerald-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">Pause Animation on Mouse Hover</label>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setPauseOnHover(!pauseOnHover)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        pauseOnHover ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {pauseOnHover ? '✓ Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Live Ticker Bar Text Content</label>
                <textarea
                  rows={4}
                  value={tickerMessage}
                  onChange={(e) => setTickerMessage(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEO & OPENGRAPH */}
        {activeTab === 'SEO' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Share2 className="w-5 h-5 text-blue-400" />
              <h3 className="font-black text-white text-base">SEO Meta Tags & Social OpenGraph Card CMS</h3>
            </div>

            <div className="space-y-6 text-xs font-bold">
              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Default SEO Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">OpenGraph Social Share Image URL</label>
                  <input
                    type="text"
                    value={ogImageUrl}
                    onChange={(e) => setOgImageUrl(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-400 block font-bold">Twitter Creator Handle</label>
                  <input
                    type="text"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-emerald-400 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CALCULATOR & RATES */}
        {activeTab === 'CALCULATOR' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Percent className="w-5 h-5 text-purple-400" />
              <h3 className="font-black text-white text-base">Financial Concierge & Tax Preset Rules</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-bold">
              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Base Home Loan Interest Rate (% p.a.)</label>
                <input
                  type="text"
                  value={baseInterestRate}
                  onChange={(e) => setBaseInterestRate(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-emerald-400 font-black text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Telangana Stamp Duty Tax Rate (%)</label>
                <input
                  type="text"
                  value={stampDutyRate}
                  onChange={(e) => setStampDutyRate(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-amber-400 font-black text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-400 block font-bold">Default Down Payment (%)</label>
                <input
                  type="text"
                  value={defaultDownPayment}
                  onChange={(e) => setDefaultDownPayment(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-teal-400 font-black text-sm"
                />
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-8 rounded-xl text-xs shadow-xl flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save & Deploy Live Entry Site CMS</span>
        </Button>
      </form>
    </div>
  );
}
