'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Modal, Input, Badge } from '@estateflow/ui';
import {
  ChevronDown,
  PlusCircle,
  User,
  Menu,
  X,
  Bot,
  Scale,
  Building,
  LogOut,
  LayoutDashboard,
  Heart,
  Calendar,
  Sparkles,
  ShieldCheck,
  Phone,
} from 'lucide-react';

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export const Navbar: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth Form Inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'OWNER' | 'AGENT' | 'DEVELOPER'>('USER');

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Check active user session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('estateflow_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('estateflow_user');
      }
    }

    // Verify session with server API
    fetch('/api/v1/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          localStorage.setItem('estateflow_user', JSON.stringify(data.user));
        }
      })
      .catch(() => {});
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    const endpoint = authMode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
    const payload =
      authMode === 'login'
        ? { email, password }
        : { fullName, email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || 'Authentication failed');
      }

      setCurrentUser(json.user);
      localStorage.setItem('estateflow_user', JSON.stringify(json.user));
      setIsAuthOpen(false);
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch {}
    setCurrentUser(null);
    localStorage.removeItem('estateflow_user');
    setIsUserDropdownOpen(false);
  };

  const primaryNavLinks = [
    { href: '/search?transactionType=BUY', label: 'Buy' },
    { href: '/search?transactionType=RENT', label: 'Rent' },
    { href: '/projects', label: 'Projects' },
    { href: '/search?transactionType=COMMERCIAL', label: 'Commercial' },
    { href: '/agents', label: 'Agents' },
  ];

  const megaMenuColumns = [
    {
      title: 'AI Intelligence & Calculators',
      icon: Bot,
      links: [
        { href: '/fractional-investing', label: 'Tokenized Fractional Real Estate' },
        { href: '/locality-insights', label: 'Locality Price CAGR & Heatmaps' },
        { href: '/ai-matchmaker', label: 'AI Property Smart Matcher' },
        { href: '/commercial-yield', label: 'Commercial Yield Engine' },
        { href: '/valuation', label: 'Instant AI Valuation' },
        { href: '/stamp-duty', label: 'Stamp Duty & Fee Calculator' },
        { href: '/mortgage-calculator', label: 'Mortgage EMI Calculator' },
        { href: '/resale-trends', label: '10-Yr Resale Price Trends' },
      ],
    },
    {
      title: 'Legal, RERA & Bank Desks',
      icon: Scale,
      links: [
        { href: '/title-clearance', label: 'AI Property Title & EC Audit' },
        { href: '/auctions', label: 'Bank E-Auction & SARFAESI Desk' },
        { href: '/sro-booking', label: 'Sub-Registrar Slot Booking' },
        { href: '/rent-agreement', label: 'Online Rent Agreement & E-Stamp' },
        { href: '/rera-advice', label: 'TS-RERA Buyer Rights Guide' },
        { href: '/rera-check', label: 'RERA Registration Title Check' },
        { href: '/legal-advisory', label: 'Property Legal Title Audit' },
        { href: '/home-loans', label: 'Home Loan Pre-Approval' },
        { href: '/nri-desk', label: 'NRI Investment & Tax Desk' },
      ],
    },
    {
      title: 'Directories & Management',
      icon: Building,
      links: [
        { href: '/co-living', label: 'Managed Co-Living & Tech Suites' },
        { href: '/developers', label: 'Master Developers Hub' },
        { href: '/agencies', label: 'Certified Agencies Directory' },
        { href: '/interiors', label: 'Turnkey Interior Studio' },
        { href: '/inventory', label: 'Builder Unit Availability Matrix' },
        { href: '/bookings', label: 'My Viewing Bookings' },
        { href: '/compare', label: 'Property Matrix Compare' },
        { href: '/analytics', label: 'Locality Market Analytics' },
        { href: '/saved', label: 'Saved Properties & Alerts' },
        { href: '/contact', label: 'Customer Support' },
        { href: '/about', label: 'About EstateFlow' },
      ],
    },
  ];

  const allSecondaryLinks = megaMenuColumns.flatMap((col) => col.links);
  const allNavLinks = [...primaryNavLinks, ...allSecondaryLinks];

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-xl shadow-xl" suppressHydrationWarning>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-lg shadow-md shadow-emerald-950">
              EF
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                Estate<span className="text-emerald-400">Flow</span>
              </span>
              <span className="font-label-caps text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
                Private Client Exchange
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden items-center gap-1.5 md:flex">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:bg-slate-900 hover:text-white border border-transparent hover:border-slate-800"
              >
                {link.label}
              </Link>
            ))}

            {/* MEGA DROPDOWN MENU */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition-all border ${
                  isMoreDropdownOpen
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg'
                    : 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>Tools & Desks</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreDropdownOpen && (
                <div
                  className="absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 mt-3 w-[760px] lg:w-[880px] rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl z-[100] text-slate-100 backdrop-blur-2xl ring-1 ring-slate-800"
                  onMouseLeave={() => setIsMoreDropdownOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {megaMenuColumns.map((col, idx) => {
                      const IconComp = col.icon;
                      return (
                        <div key={idx} className="space-y-3">
                          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2.5 flex items-center gap-2">
                            <IconComp className="w-4 h-4 text-emerald-400" />
                            <span>{col.title}</span>
                          </div>
                          <div className="space-y-1">
                            {col.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMoreDropdownOpen(false)}
                                className="block rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 transition-all hover:bg-slate-900 hover:text-white hover:translate-x-1 border border-transparent hover:border-slate-800"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/post-property">
              <Button variant="amber" size="sm" className="font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
                <span>Post Property</span>
                <span className="text-[9px] bg-slate-950 text-amber-300 font-bold px-1.5 py-0.5 rounded-full uppercase border border-amber-400/40">Free</span>
              </Button>
            </Link>

            {currentUser ? (
              /* LOGGED IN USER DROPDOWN */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-800 border border-slate-800 transition"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-slate-950">
                    {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.fullName || currentUser.email}</span>
                  <Badge variant="emerald" className="text-[9px] px-1.5 py-0 font-extrabold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {currentUser.role}
                  </Badge>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-2xl z-[100] text-slate-200"
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="p-2 border-b border-slate-800 text-xs">
                      <p className="font-black text-white truncate">{currentUser.fullName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1 space-y-0.5 text-xs font-semibold">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/bookings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                      >
                        <Calendar className="w-3.5 h-3.5 text-teal-400" />
                        <span>My Viewings</span>
                      </Link>
                      <Link
                        href="/saved"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>Saved Properties</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-rose-400 hover:bg-rose-950/40 text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* SIGN IN BUTTON */
              <Button
                variant="primary"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg rounded-xl px-4 flex items-center gap-1.5"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError(null);
                  setIsAuthOpen(true);
                }}
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Button>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-xl p-2 text-slate-300 hover:bg-slate-900 border border-slate-800 md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 p-4 md:hidden space-y-4 max-h-[80vh] overflow-y-auto z-[100] text-slate-100">
            <div className="space-y-1">
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-1">Navigation Menu</div>
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <Link href="/post-property" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full text-xs font-bold border-slate-800 bg-slate-900 text-white">
                  + Post Property (Free)
                </Button>
              </Link>
              {currentUser ? (
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-rose-600 text-white font-black text-xs"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Sign Out ({currentUser.fullName || currentUser.email})
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full bg-emerald-600 text-white font-black text-xs shadow-md"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthMode('login');
                    setAuthError(null);
                    setIsAuthOpen(true);
                  }}
                >
                  Sign In / Register
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      <Modal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        title={authMode === 'login' ? 'Sign In to EstateFlow' : 'Create an EstateFlow Account'}
      >
        <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
          {authError && (
            <div className="p-3 rounded-xl bg-rose-950 border border-rose-800 text-rose-300 text-xs font-bold">
              ⚠️ {authError}
            </div>
          )}

          {authMode === 'register' && (
            <>
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e: any) => setFullName(e.target.value)}
                required
              />
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="USER">Property Seeker / Buyer</option>
                  <option value="OWNER">Property Owner</option>
                  <option value="AGENT">Certified Agent</option>
                  <option value="DEVELOPER">Builder / Developer</option>
                </select>
              </div>
            </>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full font-black py-3 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : authMode === 'login'
              ? 'Sign In to Marketplace'
              : 'Register Account'}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setAuthError(null);
              }}
              className="text-xs text-emerald-600 font-bold hover:underline"
            >
              {authMode === 'login'
                ? "Don't have an account? Register Now"
                : 'Already have an account? Sign In'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
