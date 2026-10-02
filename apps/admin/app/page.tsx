'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Activity,
  Users,
  Building,
  TrendingUp,
  ShieldAlert,
  RotateCw,
  Zap,
  CheckCircle,
  Database,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncStatus('Indexing 4,500+ properties into OpenSearch cluster...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('✓ OpenSearch Index 100% Synced (Latency: 12ms)');
    }, 1500);
  };

  const metrics = [
    { title: 'Total Registered Users', value: '14,820', change: '+14% this month', icon: Users, color: 'text-emerald-400' },
    { title: 'Published & Verified Listings', value: '4,520', change: '+9% this month', icon: Building, color: 'text-teal-400' },
    { title: 'Total Transacted GMV', value: '₹8,420 Cr', change: '+24% YoY Growth', icon: TrendingUp, color: 'text-amber-400' },
    { title: 'Platform Subscription ARR', value: '₹48.6 Lakh', change: '+18% this month', icon: Zap, color: 'text-purple-400' },
  ];

  const systemAlerts = [
    {
      id: 'alt-1',
      type: 'FRAUD_DETECTION',
      title: 'High Risk Listing Flagged',
      details: 'Duplicate floor plan images detected across 2 unverified agent accounts (Risk Score: 88/100).',
      time: '4 mins ago',
      severity: 'HIGH',
    },
    {
      id: 'alt-2',
      type: 'RERA_VERIFICATION',
      title: 'Title Clearance Pending Audit',
      details: 'Prestigio Sky Tower Phase 3 uploaded legal title documentation for TS-RERA approval.',
      time: '18 mins ago',
      severity: 'MEDIUM',
    },
    {
      id: 'alt-3',
      type: 'OPENSEARCH_INDEX',
      title: 'Search Index Re-sync Complete',
      details: 'Automated 6-hour delta sync updated 142 modified property attributes.',
      time: '1 hour ago',
      severity: 'LOW',
    },
  ];

  return (
    <div className="space-y-8">
      {/* PAGE TITLE & TOP ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="font-bold">Platform Control Center</Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Ops Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Executive Control & System Audit</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Real-time marketplace telemetry, OpenSearch index management, and moderation controls.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            disabled={isSyncing}
            onClick={handleTriggerSync}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <RotateCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Cluster...' : 'Sync OpenSearch Index'}</span>
          </Button>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Preview Entry Website</span>
          </a>
        </div>
      </div>

      {syncStatus && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-md">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            {syncStatus}
          </span>
          <button onClick={() => setSyncStatus(null)} className="text-emerald-500 hover:text-white">✕</button>
        </div>
      )}

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => {
          const IconComp = m.icon;
          return (
            <div key={m.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">{m.title}</span>
                <IconComp className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="text-3xl font-black text-white tracking-tight">{m.value}</div>
              <span className="text-[11px] font-extrabold text-emerald-400 block">{m.change}</span>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMN GRID: SYSTEM ACTION HUB & AUDIT STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT 7 COLUMNS: RECENT SYSTEM AUDIT & FRAUD QUEUE */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-5 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-white text-base">Security & Compliance Alerts</h3>
              </div>
              <Badge variant="amber" className="text-[10px] font-extrabold">3 ACTION REQUIRED</Badge>
            </div>

            <div className="space-y-3">
              {systemAlerts.map((alt) => (
                <div key={alt.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-white text-sm flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${alt.severity === 'HIGH' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`}></span>
                      {alt.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{alt.time}</span>
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">{alt.details}</p>
                  <div className="pt-1 flex items-center gap-2">
                    <a href="/moderation" className="text-[11px] font-black text-emerald-400 hover:underline">Review in Moderation Queue →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: INFRASTRUCTURE & OPENSEARCH MONITOR */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-teal-400" />
                <h3 className="font-black text-white text-base">Search Cluster Telemetry</h3>
              </div>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">GREEN</span>
            </div>

            <div className="space-y-4 text-xs font-bold">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">OpenSearch Cluster Node</span>
                <span className="text-white font-mono text-[11px]">opensearch-node-1.us-east</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Active Document Index</span>
                <span className="text-emerald-400 font-mono text-[11px]">estateflow_properties_v3</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Average Search Latency</span>
                <span className="text-amber-400 font-mono text-[11px]">14.2 ms</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">PostgreSQL Primary Sync</span>
                <span className="text-teal-400 font-mono text-[11px]">Prisma Client Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
