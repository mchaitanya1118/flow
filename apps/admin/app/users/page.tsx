'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@estateflow/ui';
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
  Mail,
  Phone,
  Building,
} from 'lucide-react';

export default function UserRbacPage() {
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const [usersList, setUsersList] = useState([
    {
      id: 'usr-1',
      fullName: 'Vikram Malhotra',
      email: 'vikram.malhotra@apexrealty.com',
      phone: '+91 9000072227',
      role: 'AGENT',
      verifiedAgent: true,
      agency: 'Apex Prime Realty Gachibowli',
      listingsCount: 14,
      status: 'ACTIVE',
    },
    {
      id: 'usr-2',
      fullName: 'Prestigio Builders Lead Desk',
      email: 'sales@prestigio.in',
      phone: '+91 98765 11223',
      role: 'DEVELOPER',
      verifiedAgent: true,
      agency: 'Prestigio Luxury Infra',
      listingsCount: 42,
      status: 'ACTIVE',
    },
    {
      id: 'usr-3',
      fullName: 'Meera Deshmukh',
      email: 'meera.d@gmail.com',
      phone: '+91 98765 33445',
      role: 'USER',
      verifiedAgent: false,
      agency: 'Individual Buyer',
      listingsCount: 0,
      status: 'ACTIVE',
    },
    {
      id: 'usr-4',
      fullName: 'Unverified Broker X',
      email: 'spam.broker@unverified.org',
      phone: '+91 98765 99000',
      role: 'AGENT',
      verifiedAgent: false,
      agency: 'Unknown Entity',
      listingsCount: 2,
      status: 'SUSPENDED',
    },
  ]);

  const handleToggleRole = (id: string, newRole: string) => {
    setUsersList(
      usersList.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleToggleStatus = (id: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u
      )
    );
  };

  const filtered = usersList.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search && !u.fullName.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Badge variant="emerald" className="mb-1 font-bold">Identity & Access Management</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">User & Role RBAC Control</h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">Manage user permissions, assign Certified Agent Badges, and moderate platform accounts.</p>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-white max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search name, email, agency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs w-full text-white placeholder-slate-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'USER', 'OWNER', 'AGENT', 'DEVELOPER', 'ADMIN'].map((rl) => (
            <button
              key={rl}
              onClick={() => setRoleFilter(rl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                roleFilter === rl
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {rl}
            </button>
          ))}
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">User Details</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Active Listings</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">RBAC Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium text-slate-200">
              {filtered.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-850 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-extrabold text-white text-sm">
                      <span>{usr.fullName}</span>
                      {usr.verifiedAgent && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-semibold">{usr.agency}</div>
                  </td>
                  <td className="p-4 space-y-0.5 text-[11px]">
                    <div className="text-slate-300 font-bold flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" /> {usr.email}
                    </div>
                    <div className="text-slate-400 font-semibold flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-500" /> {usr.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={usr.role}
                      onChange={(e) => handleToggleRole(usr.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-emerald-400 font-extrabold px-2.5 py-1.5 rounded-xl text-xs cursor-pointer focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="USER">USER</option>
                      <option value="OWNER">OWNER</option>
                      <option value="AGENT">AGENT</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-4 font-black text-white text-sm">{usr.listingsCount} Listings</td>
                  <td className="p-4">
                    <Badge variant={usr.status === 'ACTIVE' ? 'emerald' : 'rose'}>
                      {usr.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(usr.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs shadow-sm transition ${
                        usr.status === 'ACTIVE'
                          ? 'bg-slate-800 hover:bg-rose-950 text-rose-300 border border-rose-900/50'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {usr.status === 'ACTIVE' ? 'Suspend Account' : 'Reactivate Account'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
