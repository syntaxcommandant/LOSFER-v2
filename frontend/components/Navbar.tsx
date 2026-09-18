'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SparklesIcon,
  ShieldCheckIcon,
  SearchIcon,
  PlusIcon,
  UserIcon,
  QrCodeIcon,
  CpuIcon,
  LayersIcon,
} from './icons';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('losfer_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserEmail(parsed.email || 'student@univ.edu');
        } catch {}
      }
    }
  }, []);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/items', label: 'Browse Catalog' },
    { href: '/matches', label: 'AI Matcher' },
    { href: '/report', label: 'Report Item' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/handoff', label: 'QR Handoff' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-[#070b14]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#070b14]">
              <span className="font-mono text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                L
              </span>
            </div>
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LOSFER
              </span>
              <span className="rounded-md border border-cyan-500/30 bg-cyan-950/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase text-cyan-300">
                AI Powered
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">
              Search. Match. Reclaim.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/50 p-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Campus Live Indicator */}
        <div className="flex items-center gap-3">
          {/* Live Campus Node Pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/30 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Campus Node Online</span>
          </div>

          {/* Report CTA */}
          <Link
            href="/report"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 active:scale-95 transition-all duration-200"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            <span>Report Item</span>
          </Link>

          {/* User Sign In / Profile */}
          <Link
            href="/auth"
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-white transition-all"
            title={userEmail ? `Signed in as ${userEmail}` : 'Sign In'}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline max-w-[110px] truncate">
              {userEmail ? userEmail.split('@')[0] : 'Sign In'}
            </span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/10 bg-[#070b14]/95 px-4 py-4 space-y-2 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition ${
                pathname === link.href
                  ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/report"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 mt-3"
          >
            <PlusIcon className="w-4 h-4" />
            Report Lost or Found
          </Link>
        </div>
      )}
    </header>
  );
};
