import React from 'react';
import { Badge } from './Badge';
import { formatNumber } from '../utils';

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    developerName: string;
    location: string;
    startingPrice: number;
    completionDate?: string;
    status: string;
    totalUnits: number;
    availableUnits: number;
    mainImage: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps): React.ReactElement {
  const formatPrice = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${formatNumber(val)}`;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={project.mainImage}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant="emerald" size="sm" className="absolute top-3 left-3 shadow-sm font-semibold">
          {project.status}
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          {project.developerName}
        </span>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 mb-3">{project.location}</p>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Starting From</span>
            <span className="text-sm font-extrabold text-slate-900">{formatPrice(project.startingPrice)}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Available</span>
            <span className="text-xs font-bold text-emerald-700">{project.availableUnits} / {project.totalUnits} Units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
