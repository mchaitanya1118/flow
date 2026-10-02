'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Cpu,
  Database,
  RefreshCw,
  HardDrive,
  Activity,
  CheckCircle2,
  Terminal,
  Server,
  Zap,
} from 'lucide-react';

export default function SystemHealthDiagnosticsPage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setBackupMessage('Taking PostgreSQL Prisma snapshot & dump file...');
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupMessage('✓ PostgreSQL Backup created: estateflow_backup_20261002_0155.sql.gz (142 MB)');
    }, 2000);
  };

  const logs = [
    '[17:55:02] [OPENSEARCH] Delta index synchronized 14 properties successfully.',
    '[17:54:18] [AUTH] Verified JWT session for agent: vikram.malhotra@apexrealty.com',
    '[17:52:10] [SYSTEM] Garbage collection executed: freed 48MB heap memory.',
    '[17:50:00] [PRISMA] PostgreSQL connection pool healthy: 8 active, 0 queued.',
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Infrastructure Telemetry</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">System Health, Diagnostics & Backups</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Monitor node health, database connection pools, memory footprint, and execute database snapshots.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          disabled={isBackingUp}
          onClick={handleCreateBackup}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
        >
          <HardDrive className={`w-4 h-4 ${isBackingUp ? 'animate-spin' : ''}`} />
          <span>{isBackingUp ? 'Creating Snapshot...' : 'Trigger PostgreSQL Backup'}</span>
        </Button>
      </div>

      {backupMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {backupMessage}
          </span>
          <button onClick={() => setBackupMessage(null)} className="text-emerald-500 hover:text-white">✕</button>
        </div>
      )}

      {/* HEALTH CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">PostgreSQL Primary</span>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">ONLINE</div>
          <span className="text-[11px] font-extrabold text-emerald-400 block">Latency: 2ms • Pool Size: 20</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">OpenSearch Cluster</span>
            <Server className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white">HEALTHY</div>
          <span className="text-[11px] font-extrabold text-teal-300 block">Status: GREEN • 3 Shards</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-[10px]">Node.js Heap Memory</span>
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">148 MB</div>
          <span className="text-[11px] font-extrabold text-slate-400 block">Max Limit: 2048 MB</span>
        </div>
      </div>

      {/* SYSTEM LOG TERMINAL */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl font-mono text-xs">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-300 font-bold">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Real-time System Audit Console Log</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-slate-300 text-[11px]">
          {logs.map((lg, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-slate-500 font-bold">❯</span>
              <span>{lg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
