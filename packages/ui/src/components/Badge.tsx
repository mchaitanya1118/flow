import React from 'react';
import { cn } from '../utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'amber' | 'blue' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'emerald',
  size = 'md',
  className,
}: BadgeProps): any {
  const base = 'inline-flex items-center font-medium rounded-full';
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };
  const variants = {
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    blue: 'bg-sky-50 text-sky-700 border border-sky-200',
    rose: 'bg-rose-50 text-rose-700 border border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    outline: 'border border-slate-300 text-slate-700 bg-white',
  };

  return <span className={cn(base, sizes[size], variants[variant], className)}>{children}</span>;
}
