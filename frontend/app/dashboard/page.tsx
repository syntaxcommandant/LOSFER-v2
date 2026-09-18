'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TagIcon,
  SparklesIcon,
  ShieldCheckIcon,
  QrCodeIcon,
  PlusIcon,
  SearchIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  UserIcon,
  CpuIcon,
} from '../../components/icons';
import { fetchFoundItems } from '../../lib/api';
import { Item } from '../../lib/types';

export default function DashboardPage() {
  const [userName, setUserName] = useState('Campus Student');
  const [userRole, setUserRole] = useState('student');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my_items' | 'matches' | 'reclaims'>('my_items');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('losfer_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUserName(parsed.name || parsed.email?.split('@')[0] || 'Campus Student');
          setUserRole(parsed.role || 'student');
        } catch {}
      }
    }

    async function load() {
      try {
        const data = await fetchFoundItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to load items in dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/25 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-900/40 px-3 py-0.5 text-[11px] font-semibold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Campus Node Session Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {userName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor reported belongings, review automated AI matches, and process verified QR handoffs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/report?type=lost"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Report Lost Item</span>
          </Link>
          <Link
            href="/report?type=found"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-xs font-bold text-cyan-300 hover:bg-cyan-900/40 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Report Found Item</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Lost Reports', value: '4', note: 'Campus-wide search', color: 'text-amber-400' },
          { label: 'Found Items in Hub', value: String(items.length || 18), note: 'Ready for verification', color: 'text-cyan-400' },
          { label: 'AI Matches Discovered', value: '3', note: '≥70% confidence', color: 'text-blue-400' },
          { label: 'Items Reclaimed', value: '12', note: 'Verified via QR', color: 'text-emerald-400' },
        ].map((m, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1 shadow-lg"
          >
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              {m.label}
            </span>
            <div className={`text-3xl font-black font-mono ${m.color}`}>
              {m.value}
            </div>
            <span className="text-[10px] text-slate-500 block">{m.note}</span>
          </div>
        ))}
      </div>

      {/* Main Tabs Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('my_items')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'my_items'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Reported Belongings ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'matches'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Match Alerts</span>
            <span className="rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] px-2 py-0.2">
              New
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reclaims')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'reclaims'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            QR Recovery Certificates
          </button>
        </div>

        {/* Tab 1: Reported Belongings */}
        {activeTab === 'my_items' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 space-y-3 hover:border-cyan-500/40 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-300 uppercase">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        #{item.id}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <MapPinIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                    <Link
                      href={`/verify/${item.id}`}
                      className="flex-1 text-center rounded-lg bg-cyan-500/20 border border-cyan-500/40 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
                    >
                      Verify Claim
                    </Link>
                    <Link
                      href={`/matches?item_id=${item.id}`}
                      className="flex-1 text-center rounded-lg bg-slate-900 border border-slate-800 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition"
                    >
                      AI Match
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: AI Match Alerts */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            {[
              {
                lostTitle: 'Casio Scientific Calculator fx-991CW',
                foundTitle: 'Scientific Calculator fx-991 in Room 204 Block B',
                score: 92.5,
                candidateId: 101,
              },
              {
                lostTitle: 'Silver Wrist Watch with Leather Strap',
                foundTitle: 'Silver Analog Watch found on Sports Ground',
                score: 87.0,
                candidateId: 102,
              },
            ].map((match, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-950 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      ★ High Confidence ({match.score}%)
                    </span>
                    <span className="text-xs text-slate-400">
                      Cross-Matched by AI TF-IDF Engine
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {match.lostTitle}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Matched against candidate: <em>{match.foundTitle}</em>
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    href={`/verify/${match.candidateId}`}
                    className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white text-center shadow-md shadow-cyan-500/20"
                  >
                    Start Ownership Verification
                  </Link>
                  <Link
                    href={`/matches?item_id=${match.candidateId}`}
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:text-white"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reclaims & Certificates */}
        {activeTab === 'reclaims' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  CERT-CAMPUS-991204 • Reclaimed
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  Casio fx-991CW Calculator
                </h4>
                <p className="text-xs text-slate-400">
                  Completed at North Security Booth via Dual-Scan QR Handshake
                </p>
              </div>
              <Link
                href="/handoff/101"
                className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/40 transition"
              >
                View Certificate
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Campus System Engine Monitor */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
            <CpuIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">LOSFER Engine Health</span>
            <span className="text-[11px] text-slate-400">
              FastAPI Core • TF-IDF Cosine Engine • NudeNet Content Filter
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-emerald-300 font-mono text-[11px]">
            FastAPI: Online
          </span>
          <span className="rounded-lg bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-emerald-300 font-mono text-[11px]">
            AI NLP: Active
          </span>
          <span className="rounded-lg bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 text-cyan-300 font-mono text-[11px]">
            QR Protocol: Ready
          </span>
        </div>
      </div>
    </div>
  );
}
