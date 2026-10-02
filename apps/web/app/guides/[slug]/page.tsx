'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge, Card, Button } from '@estateflow/ui';

export default function SingleGuidePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
      <div className="space-y-3">
        <button onClick={() => router.push('/guides')} className="text-xs font-bold text-emerald-600 hover:underline">
          ← Back to Guides
        </button>
        <Badge variant="emerald">Buying Guide & RERA Compliance</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          Complete First-Time Homebuyer Guide for Hyderabad (2026)
        </h1>
        <p className="text-xs text-slate-400">Published on August 18, 2026 • 6 min read • By EstateFlow Editorial</p>
      </div>

      <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
          alt="Guide Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="prose max-w-none text-slate-700 space-y-4 text-sm leading-relaxed">
        <p className="font-semibold text-base text-slate-900">
          Buying a home is one of the most significant financial decisions in a lifetime. Understanding property laws, RERA verification, mortgage terms, and location dynamics in Hyderabad ensures a smooth transaction.
        </p>

        <h3 className="text-lg font-bold text-slate-900 pt-2 border-t">1. Verifying TS-RERA Registration</h3>
        <p>
          Always cross-check the builder’s RERA registration number on the official Telangana RERA portal. Ensure that the project timeline, approved floor plans, land ownership title deeds, and commencement certificates (CC) match the builder’s declarations.
        </p>

        <h3 className="text-lg font-bold text-slate-900 pt-2 border-t">2. Stamp Duty & Registration Fees</h3>
        <p>
          In Telangana, property registration charges typically amount to approximately 7.5% of the total property value (including 5.5% stamp duty, 1.5% transfer duty, and 0.5% registration fees).
        </p>

        <h3 className="text-lg font-bold text-slate-900 pt-2 border-t">3. Evaluating Micro-Markets</h3>
        <p>
          Locations like Kondapur, Gachibowli, and Financial District offer strong capital appreciation due to continuous expansion of IT hubs and metro transit corridors.
        </p>
      </Card>
    </div>
  );
}
