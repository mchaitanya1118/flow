import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HUGE BRAND TYPOGRAPHY WATERMARK */}
        <div className="border-b border-slate-800/80 pb-8 text-center sm:text-left">
          <h1 className="text-[14vw] sm:text-[11vw] font-black tracking-tighter text-slate-800 leading-none select-none uppercase">
            ESTATEFLOW
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white text-lg font-black tracking-wider">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xs font-black">E</span>
              <span>ESTATEFLOW</span>
            </div>
            <p className="leading-relaxed">
              India's leading next-generation real-estate marketplace platform built with Next.js, Prisma, OpenSearch & Tailwind CSS.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Explore Hubs</h4>
            <ul className="space-y-2">
              <li><Link href="/search?transactionType=BUY" className="hover:text-emerald-400 transition-colors">Buy Residential Properties</Link></li>
              <li><Link href="/search?transactionType=RENT" className="hover:text-emerald-400 transition-colors">Flats for Rent</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">New Builder Projects</Link></li>
              <li><Link href="/search?transactionType=COMMERCIAL" className="hover:text-emerald-400 transition-colors">Commercial Spaces</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Services & Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/mortgage-calculator" className="hover:text-emerald-400 transition-colors">Mortgage EMI Calculator</Link></li>
              <li><Link href="/interiors" className="hover:text-emerald-400 transition-colors">Turnkey Interior Studio</Link></li>
              <li><Link href="/resale-trends" className="hover:text-emerald-400 transition-colors">10-Yr Resale Price Trends</Link></li>
              <li><Link href="/rent-agreement" className="hover:text-emerald-400 transition-colors">Online Rent Agreement Desk</Link></li>
              <li><Link href="/valuation" className="hover:text-emerald-400 transition-colors">Instant AI Valuation Engine</Link></li>
              <li><Link href="/stamp-duty" className="hover:text-emerald-400 transition-colors">Stamp Duty & Fee Calculator</Link></li>
              <li><Link href="/nri-desk" className="hover:text-emerald-400 transition-colors">NRI Investment & Tax Desk</Link></li>
              <li><Link href="/home-loans" className="hover:text-emerald-400 transition-colors">Home Loan Eligibility</Link></li>
              <li><Link href="/rera-advice" className="hover:text-emerald-400 transition-colors">RERA Buyer Rights Guide</Link></li>
              <li><Link href="/analytics" className="hover:text-emerald-400 transition-colors">Locality Market Analytics</Link></li>
              <li><Link href="/agencies" className="hover:text-emerald-400 transition-colors">Agencies & Brokerages</Link></li>
              <li><Link href="/legal-advisory" className="hover:text-emerald-400 transition-colors">Legal Title Audit Desk</Link></li>
              <li><Link href="/inventory" className="hover:text-emerald-400 transition-colors">Builder Unit Matrix</Link></li>
              <li><Link href="/bookings" className="hover:text-emerald-400 transition-colors">My Viewing Bookings</Link></li>
              <li><Link href="/agents" className="hover:text-emerald-400 transition-colors">Verified Agents Directory</Link></li>
              <li><Link href="/developers" className="hover:text-emerald-400 transition-colors">Master Builder Hub</Link></li>
              <li><Link href="/rera-check" className="hover:text-emerald-400 transition-colors">RERA Title Clearance</Link></li>
              <li><Link href="/compare" className="hover:text-emerald-400 transition-colors">Compare Properties</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Legal & Support</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About EstateFlow</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Customer Care & Support</Link></li>
              <li><Link href="/saved" className="hover:text-emerald-400 transition-colors">Saved Properties & Alerts</Link></li>
              <li><Link href="/guides" className="hover:text-emerald-400 transition-colors">Buyer & Seller Guides</Link></li>
              <li><Link href="/post-property" className="hover:text-emerald-400 transition-colors">Post Free Property Listing</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-medium">
          <p>© 2026 EstateFlow Platform Inc. All rights reserved.</p>
          <p>Designed with state-of-the-art UI/UX architecture</p>
        </div>
      </div>
    </footer>
  );
};
