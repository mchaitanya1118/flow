'use client';

import React from 'react';

export default function WebGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl border border-slate-200 bg-white text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xl mx-auto">
            EF
          </div>
          <h2 className="text-2xl font-black text-slate-900">Application Error</h2>
          <p className="text-xs text-slate-500 font-medium">
            {error.message || 'An unexpected application error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
