import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps): any {
  const sizeClasses = {
    sm: 'h-6 text-lg',
    md: 'h-8 text-xl',
    lg: 'h-10 text-2xl',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';

  return (
    <div className={`inline-flex items-center gap-2 font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
      </div>
      <span className={textColor}>
        Estate<span className="text-emerald-600 font-extrabold">Flow</span>
      </span>
    </div>
  );
}
