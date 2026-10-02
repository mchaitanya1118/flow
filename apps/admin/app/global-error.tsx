'use client';

import React from 'react';

export default function AdminGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl border border-slate-800 bg-slate-900 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 font-bold text-xl mx-auto">
            ⚡
          </div>
          <h2 className="text-2xl font-black text-white">Global Admin Error</h2>
          <p className="text-xs text-slate-400 font-medium">
            {error.message || 'System encountered a global layout error.'}
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
          >
            Reload Admin Portal
          </button>
        </div>
      </body>
    </html>
  );
}
