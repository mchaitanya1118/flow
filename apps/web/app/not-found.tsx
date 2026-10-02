'use client';

import React from 'react';
import Link from 'next/link';

export default function WebNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-5 text-center p-6 bg-slate-950 text-white">
      <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-black text-3xl shadow-xl">
        404
      </div>
      <h1 className="text-3xl font-black text-white">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md font-medium leading-relaxed">
        The page or listing you are searching for might have been sold, archived, or is temporarily unavailable.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
        >
          Return to Marketplace Home
        </Link>
        <a
          href="http://localhost:3001/cms"
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs transition"
        >
          Go to Admin CMS Suite
        </a>
      </div>
    </div>
  );
}
