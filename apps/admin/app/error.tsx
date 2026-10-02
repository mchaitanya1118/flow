'use client';

import React from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 m-6">
      <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-bold text-xl">
        ⚠️
      </div>
      <h2 className="text-xl font-black text-white">Admin Operations Error Encountered</h2>
      <p className="text-xs text-slate-400 max-w-md font-medium leading-relaxed">
        {error.message || 'An unexpected operational error occurred while rendering this control panel.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
      >
        🔄 Retry Component Load
      </button>
    </div>
  );
}
