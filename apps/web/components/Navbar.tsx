'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Modal, Input, Badge } from '@estateflow/ui';
import { VoiceAdvisorModal } from './VoiceAdvisorModal';
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
  MapPin,
  Check,
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
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isVoiceAdvisorOpen, setIsVoiceAdvisorOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState('Hyderabad');

  useEffect(() => {
    const savedCity = localStorage.getItem('estateflow_city');
    if (savedCity && (savedCity === 'Hyderabad' || savedCity === 'Bengaluru')) {
      setSelectedCity(savedCity);
    }

    const handleStorageChange = () => {
      const current = localStorage.getItem('estateflow_city');
      if (current) setSelectedCity(current);
    };

    window.addEventListener('estateflow_city_change', handleStorageChange);
    return () => window.removeEventListener('estateflow_city_change', handleStorageChange);
  }, []);

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
    localStorage.setItem('estateflow_city', newCity);
    window.dispatchEvent(new Event('estateflow_city_change'));
  };

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
      <header className="sticky top-0 z-[100] w-full border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur-xl shadow-sm" suppressHydrationWarning>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
            {/* LOGO & MULTI CITY SELECTOR */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-lg shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  EF
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                    Estate<span className="text-emerald-600">Flow</span>
                  </span>
                  <span className="font-label-caps text-[9px] uppercase tracking-widest text-slate-400 font-extrabold mt-0.5">
                    Private Client Exchange
                  </span>
                </div>
              </Link>

              {/* MULTI CITY SELECTOR POPOVER */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-xs hover:border-slate-300"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{selectedCity}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCityDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-[110] text-slate-900 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setIsCityDropdownOpen(false)}
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                      Select City Market
                    </div>
                    {[
                      { name: 'Hyderabad', state: 'Telangana' },
                      { name: 'Bengaluru', state: 'Karnataka' },
                    ].map((city) => (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => {
                          handleCityChange(city.name);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                          selectedCity === city.name
                            ? 'bg-emerald-50 text-emerald-900 font-extrabold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>📍 {city.name}</span>
                          <span className="text-[9px] font-medium text-slate-400">{city.state}</span>
                        </div>
                        {selectedCity === city.name && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden items-center gap-1 md:flex">
              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}

              {/* MEGA DROPDOWN MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    isMoreDropdownOpen
                      ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>Tools & Desks</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>

                {isMoreDropdownOpen && (
                  <div
                    className="absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 mt-3 w-[760px] lg:w-[880px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl z-[100] text-slate-900 backdrop-blur-2xl ring-1 ring-slate-100"
                    onMouseLeave={() => setIsMoreDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {megaMenuColumns.map((col, idx) => {
                        const IconComp = col.icon;
                        return (
                          <div key={idx} className="space-y-3">
                            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 border-b border-slate-200 pb-2.5 flex items-center gap-2">
                              <IconComp className="w-4 h-4 text-emerald-600" />
                              <span>{col.title}</span>
                            </div>
                            <div className="space-y-1">
                              {col.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setIsMoreDropdownOpen(false)}
                                  className="block rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 hover:translate-x-1 border border-transparent hover:border-slate-200"
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
          <div className="hidden items-center gap-2 md:flex">
            {/* VOICE ADVISOR CALL BUTTON */}
            <button
              type="button"
              onClick={() => setIsVoiceAdvisorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 text-amber-900 font-extrabold text-xs border border-amber-300/80 transition-all shadow-xs active:scale-95 group"
              title="Call Ava — AI Home Advisor"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <Phone className="w-3.5 h-3.5 text-amber-700 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-950">Voice Advisor</span>
            </button>

            {/* POST PROPERTY CTA */}
            <Link
              href="/post-property"
              className="bg-slate-900 hover:bg-black text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95 border border-slate-800"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
              <span>Post Property</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">Free</span>
            </Link>

            {currentUser ? (
              /* LOGGED IN USER DROPDOWN */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-200 border border-slate-200 transition-all shadow-xs"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                    {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[90px] truncate font-extrabold">{currentUser.fullName || currentUser.email}</span>
                  <Badge variant="emerald" className="text-[9px] px-1.5 py-0 font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {currentUser.role}
                  </Badge>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl z-[100] text-slate-900"
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="p-2 border-b border-slate-200 text-xs">
                      <p className="font-black text-slate-900 truncate">{currentUser.fullName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1 space-y-0.5 text-xs font-semibold">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        href="/bookings"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>My Viewings</span>
                      </Link>
                      <Link
                        href="/saved"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Saved Properties</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50 text-left"
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
              <button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xs hover:shadow-md rounded-full px-4 py-1.5 flex items-center gap-1.5 transition-all active:scale-95"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError(null);
                  setIsAuthOpen(true);
                }}
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 border border-slate-200 md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white p-4 md:hidden space-y-4 max-h-[80vh] overflow-y-auto z-[100] text-slate-900">
            <div className="space-y-1">
              <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-2 mb-1">Navigation Menu</div>
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <Link
                href="/post-property"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center rounded-xl px-4 py-2.5 text-xs font-extrabold border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200"
              >
                + Post Property (Free)
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

      {/* VOICE ADVISOR CALL MODAL */}
      <VoiceAdvisorModal
        isOpen={isVoiceAdvisorOpen}
        onClose={() => setIsVoiceAdvisorOpen(false)}
        selectedCity={selectedCity}
      />
    </>
  );
};
