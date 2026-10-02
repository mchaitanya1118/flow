'use client';

import React from 'react';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Button } from './Button';

export interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    phone?: string;
    agencyName?: string;
    experienceYears: number;
    rating: number;
    totalReviews: number;
    isVerified: boolean;
    areasServed: string[];
  };
  onContactClick?: (agentId: string) => void;
  onWhatsAppClick?: (agent: any) => void;
}

export function AgentCard({ agent, onContactClick, onWhatsAppClick }: AgentCardProps): React.ReactElement {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWhatsAppClick) {
      onWhatsAppClick(agent);
    } else {
      const phone = (agent.phone || '919876543210').replace(/[^0-9]/g, '');
      const targetPhone = phone.length === 10 ? `91${phone}` : phone;
      const msg = encodeURIComponent(`Hi ${agent.name}, I am contacting you via EstateFlow regarding property listings in ${agent.areasServed[0] || 'Hyderabad'}.`);
      window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <Avatar src={agent.avatar} name={agent.name} size="xl" className="mb-3" />
      <div className="flex items-center gap-1.5 justify-center mb-1">
        <h4 className="font-bold text-slate-900 text-base">{agent.name}</h4>
        {agent.isVerified && <Badge variant="emerald" size="sm">✓ Verified</Badge>}
      </div>
      <p className="text-xs text-slate-500 mb-2">{agent.agencyName || 'Independent Real Estate Specialist'}</p>

      <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg mb-3 border border-slate-100">
        <span>⭐ {agent.rating.toFixed(1)} ({agent.totalReviews})</span>
        <span>•</span>
        <span>{agent.experienceYears} Yrs Exp.</span>
      </div>

      <p className="text-xs text-slate-500 line-clamp-1 mb-4">
        Areas: {agent.areasServed.join(', ')}
      </p>

      <div className="flex items-center gap-2 w-full">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 font-semibold text-xs text-slate-700 hover:bg-slate-50"
          onClick={() => onContactClick?.(agent.id)}
        >
          Contact Agent
        </Button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
          title={`Chat with ${agent.name} on WhatsApp`}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.097-4.148l.437.26c1.552.921 3.327 1.408 5.143 1.409 5.426 0 9.839-4.414 9.84-9.84.001-2.628-1.02-5.1-2.876-6.958-1.857-1.856-4.33-2.877-6.957-2.877-5.427 0-9.84 4.414-9.84 9.84 0 1.897.545 3.734 1.574 5.334l.286.444-1.043 3.809 3.901-1.023z"/>
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
