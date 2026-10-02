'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 m-6">
      <div className="w-14 h-14 rounded-2xl bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-black text-2xl shadow-xl">
        404
      </div>
      <h2 className="text-2xl font-black text-white">Admin Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-md font-medium leading-relaxed">
        The specified control route or management desk does not exist or has been relocated.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
        >
          Return to Overview Dashboard
        </Link>
        <Link
          href="/cms"
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs transition"
        >
          Open Master CMS Control
        </Link>
      </div>
    </div>
  );
}
