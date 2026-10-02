'use client';

import React from 'react';

export default function WebError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center p-6 bg-white text-slate-900 rounded-3xl border border-slate-200 m-6 shadow-xl">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-xl">
        🏠
      </div>
      <h2 className="text-xl font-black text-slate-900">Something went wrong!</h2>
      <p className="text-xs text-slate-500 max-w-md font-medium leading-relaxed">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition"
      >
        Try Again →
      </button>
    </div>
  );
}
