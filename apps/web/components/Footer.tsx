import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-100 mt-16 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* HUGE BRAND TYPOGRAPHY WATERMARK */}
        <div className="border-b border-slate-800 pb-8 text-center sm:text-left">
          <h1 className="text-[13vw] sm:text-[10vw] font-black tracking-tighter text-slate-900 leading-none select-none uppercase">
            ESTATEFLOW
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow-md">
                EF
              </div>
              <span className="font-headline-md text-2xl tracking-tight text-white font-bold">
                Estate<span className="text-emerald-400">Flow</span>
              </span>
            </div>

            <p className="font-body-md text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-medium">
              India's leading next-generation real-estate marketplace platform built with Next.js, Prisma, OpenSearch & Tailwind CSS. Engineering financial liquidity and verified sovereignty into residential & commercial estates.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 font-body-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>TS-RERA Reg: P02400007890</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-body-sm text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                <span>Institutional Legal Guarantee</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-[#25D366] font-body-sm text-xs font-bold transition-all shadow-md"
                href="https://wa.me/919000072227"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Private Concierge (+91 90000 72227)</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm text-white font-bold uppercase tracking-wider">Explore Hubs</h4>
            <ul className="space-y-2 font-body-sm text-xs text-slate-400 font-medium">
              <li><Link href="/search?transactionType=BUY" className="hover:text-emerald-400 transition-colors">Buy Residential Estates</Link></li>
              <li><Link href="/search?transactionType=RENT" className="hover:text-emerald-400 transition-colors">Flats & Penthouses for Rent</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">New Builder Launch Projects</Link></li>
              <li><Link href="/search?transactionType=COMMERCIAL" className="hover:text-emerald-400 transition-colors">Grade-A Commercial Spaces</Link></li>
              <li><Link href="/search?locality=Kondapur" className="hover:text-emerald-400 transition-colors">Hyderabad IT Corridor Villas</Link></li>
              <li><Link href="/search?locality=Kokapet" className="hover:text-emerald-400 transition-colors">Kokapet Golden Mile High-Rise</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm text-white font-bold uppercase tracking-wider">Services & Tools</h4>
            <ul className="space-y-2 font-body-sm text-xs text-slate-400 font-medium">
              <li><Link href="/mortgage-calculator" className="hover:text-emerald-400 transition-colors">Mortgage EMI Calculator</Link></li>
              <li><Link href="/valuation" className="hover:text-emerald-400 transition-colors">Instant AI Valuation Engine</Link></li>
              <li><Link href="/resale-trends" className="hover:text-emerald-400 transition-colors">10-Yr Resale Price Trends</Link></li>
              <li><Link href="/rent-agreement" className="hover:text-emerald-400 transition-colors">Online Rent Agreement Desk</Link></li>
              <li><Link href="/stamp-duty" className="hover:text-emerald-400 transition-colors">Stamp Duty & Fee Calculator</Link></li>
              <li><Link href="/nri-desk" className="hover:text-emerald-400 transition-colors">NRI Investment & Tax Desk</Link></li>
              <li><Link href="/home-loans" className="hover:text-emerald-400 transition-colors">Home Loan Eligibility Matrix</Link></li>
              <li><Link href="/rera-advice" className="hover:text-emerald-400 transition-colors">RERA Buyer Rights Guide</Link></li>
              <li><Link href="/analytics" className="hover:text-emerald-400 transition-colors">Locality Market Analytics</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline-sm text-sm text-white font-bold uppercase tracking-wider">Legal & Support</h4>
            <ul className="space-y-2 font-body-sm text-xs text-slate-400 font-medium">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About EstateFlow</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Customer Care & Support</Link></li>
              <li><Link href="/saved" className="hover:text-emerald-400 transition-colors">Saved Properties & Alerts</Link></li>
              <li><Link href="/guides" className="hover:text-emerald-400 transition-colors">Buyer & Seller Guides</Link></li>
              <li><Link href="/post-property" className="hover:text-emerald-400 transition-colors">Post Free Property Listing</Link></li>
              <li><Link href="/legal-advisory" className="hover:text-emerald-400 transition-colors">Privacy Policy & Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">domain_verification</span>
            <span>Copyright © 2026 EstateFlow Platform Inc. All rights reserved. Sovereign proptech operations in Mumbai, Hyderabad, Bengaluru, and NCR.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400 font-semibold">TS-RERA Compliance Certified</span>
            <span className="text-slate-400">ISO 27001 Security</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
