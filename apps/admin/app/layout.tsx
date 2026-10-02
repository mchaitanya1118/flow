import React from 'react';
import Link from 'next/link';
import './globals.css';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Sliders,
  CalendarCheck,
  CreditCard,
  Building,
  ExternalLink,
  Bot,
  Landmark,
  Scale,
  Coins,
  Cpu,
  Building2,
} from 'lucide-react';

export const metadata = {
  title: 'EstateFlow Admin & Operations Control Center',
  description: 'Super Admin, Moderation, CMS, AI Engine, and Business Operations portal for EstateFlow Real Estate Marketplace.',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const primaryNavItems = [
    { href: '/', label: 'Overview Dashboard', icon: LayoutDashboard },
    { href: '/moderation', label: 'Moderation & RERA Queue', icon: ShieldCheck },
    { href: '/users', label: 'User & Agent RBAC', icon: Users },
    { href: '/cms', label: 'Entry Site CMS Control', icon: Sliders },
    { href: '/leads', label: 'Inquiries & Viewing Slots', icon: CalendarCheck },
    { href: '/revenue', label: 'Payments & Revenue', icon: CreditCard },
  ];

  const intelligenceNavItems = [
    { href: '/ai-engine', label: 'AI Valuation Model Tuning', icon: Bot },
    { href: '/projects-mgr', label: 'Master Builders & Catalog', icon: Building2 },
    { href: '/bank-auctions', label: 'SARFAESI Bank E-Auctions', icon: Landmark },
    { href: '/legal-desk', label: 'Legal, Title & SRO Booking', icon: Scale },
    { href: '/fractional-desk', label: 'Fractional Tokens & Yield', icon: Coins },
    { href: '/system', label: 'System Health & Backups', icon: Cpu },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased" suppressHydrationWarning>
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/90 p-5 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-100px)] pr-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div className="flex items-center gap-2 text-lg font-black text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-base shadow-md">
                  EF
                </span>
                <span>
                  Estate<span className="text-emerald-400">Admin</span>
                </span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-800">
                v3.2 PRO
              </span>
            </div>

            {/* CORE OPERATIONS */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 block mb-1">
                Core Operations
              </span>
              <nav className="space-y-1 text-xs font-bold text-slate-400">
                {primaryNavItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors border border-transparent hover:border-slate-700/60"
                    >
                      <IconComp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* AI INTELLIGENCE & DESKS */}
            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-2 block mb-1">
                Engine & Legal Desks
              </span>
              <nav className="space-y-1 text-xs font-bold text-slate-400">
                {intelligenceNavItems.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors border border-transparent hover:border-slate-700/60"
                    >
                      <IconComp className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-800 pt-3 text-xs">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-[11px] font-bold transition"
            >
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400" /> View Marketplace
              </span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <div className="text-[11px] text-slate-500 px-1">
              Logged in: <strong className="text-slate-300 block truncate">superadmin@estateflow.io</strong>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* MOBILE HEADER BAR */}
          <header className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 p-4">
            <div className="flex items-center gap-2 font-black text-white">
              <span className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-xs">EF</span>
              <span>EstateAdmin</span>
            </div>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              Marketplace <ExternalLink className="w-3 h-3" />
            </a>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" suppressHydrationWarning>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
