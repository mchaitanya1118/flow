'use client';

import React from 'react';
import { Card, Badge, Button } from '@estateflow/ui';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="relative mx-auto max-w-5xl px-4 text-center space-y-4">
          <Badge variant="emerald" className="px-3 py-1 text-xs uppercase tracking-widest font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            ⚡ About EstateFlow PropTech
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Redefining Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-white">Discovery & Transparency</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            EstateFlow is India's next-generation multi-sided real estate marketplace platform built with Next.js 14, OpenSearch geospatial engines, Zod validation, and verified RERA title clearance logic.
          </p>
        </div>
      </section>

      {/* BRAND VALUES & TECH STACK */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 space-y-12">
        {/* STATS HIGHLIGHT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xl text-center">
          <div className="p-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">₹5,000+ Cr</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Gross Merchandise Volume</span>
          </div>
          <div className="p-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">12,500+</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verified Listings</span>
          </div>
          <div className="p-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">99.4%</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Title Accuracy Audit</span>
          </div>
          <div className="p-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">35+</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Prisma Domain Models</span>
          </div>
        </div>

        {/* CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-3 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-2xl flex items-center justify-center">
              🔍
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Intelligent Geospatial Search</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Powered by OpenSearch indexers, spatial coordinate bounding boxes, and natural language query parsing for precise locality matching.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-2xl flex items-center justify-center">
              🛡️
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Verified Title Clearance</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Automated RERA license audits, litigation status checks, and builder escrow verification to eliminate fraud.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-2xl flex items-center justify-center">
              ⚡
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Unified Agent & Builder CRM</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Lead scoring (HOT/WARM/COLD), tower unit inventory matrices, and encrypted realtime WebSockets messaging.
            </p>
          </Card>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl text-center space-y-4">
          <Badge variant="emerald" className="font-bold uppercase tracking-widest text-xs">Ready to Find Your Home?</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Join Thousands of Satisfied Homebuyers</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Explore verified properties across Kondapur, Gachibowli, Tellapur, and Financial District today.
          </p>
          <Button variant="primary" size="lg" className="font-extrabold shadow-lg" onClick={() => router.push('/search')}>
            Start Exploring Properties →
          </Button>
        </div>
      </div>
    </div>
  );
}
