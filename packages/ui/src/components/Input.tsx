'use client';

import React from 'react';
import { cn } from '../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: any = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label ? <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">{label}</label> : null}
        <div className="relative flex items-center">
          {leftIcon ? <div className="absolute left-3 text-slate-400 pointer-events-none">{leftIcon}</div> : null}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-50 disabled:text-slate-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
          {rightIcon ? <div className="absolute right-3 text-slate-400">{rightIcon}</div> : null}
        </div>
        {error ? <p className="text-xs text-rose-600 font-medium">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
