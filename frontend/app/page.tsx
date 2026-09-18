'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SparklesIcon,
  ShieldCheckIcon,
  QrCodeIcon,
  SearchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LockIcon,
  CameraIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  CpuIcon,
  PlusIcon,
  CheckIcon,
  RefreshCwIcon,
} from '../components/icons';
import { fetchFoundItems } from '../lib/api';
import { Item } from '../lib/types';

export default function HomePage() {
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  // Hero interactive journey stage selector
  const [activeStep, setActiveStep] = useState<number>(1);

  // Interactive AI Match Sandbox State
  const [demoDescription, setDemoDescription] = useState('Lost black HP laptop charger with USB-C cable in Central Library 2nd floor');
  const [demoCategory, setDemoCategory] = useState('Electronics');
  const [demoMatchScore, setDemoMatchScore] = useState<{
    total: number;
    category: number;
    color: number;
    location: number;
    time: number;
    ai: number;
  }>({
    total: 92,
    category: 30,
    color: 15,
    location: 15,
    time: 15,
    ai: 17,
  });

  // Interactive Secret Answer Challenge Simulator State
  const [storedSecretAnswer] = useState('engraved initials PK 2024 on back cover');
  const [testClaimantAnswer, setTestClaimantAnswer] = useState('It has initials PK 2024 engraved on the back');
  const [testScoreResult, setTestScoreResult] = useState<{
    verified: boolean;
    ratio: number;
    matchedWords: string[];
  }>({
    verified: true,
    ratio: 83.3,
    matchedWords: ['initials', 'pk', '2024', 'back'],
  });

  // Load Recent Items from Backend / API
  useEffect(() => {
    async function loadCatalog() {
      try {
        const items = await fetchFoundItems();
        setRecentItems(items.slice(0, 6));
      } catch (err) {
        console.error('Failed to load recent items', err);
      } finally {
        setLoadingItems(false);
      }
    }
    loadCatalog();
  }, []);

  // Recalculate Demo Match Sandbox
  const runDemoMatchCalculation = () => {
    const text = demoDescription.toLowerCase();
    let catScore = 30;
    let colScore = text.includes('black') ? 15 : 10;
    let locScore = text.includes('library') ? 15 : 8;
    let timeScore = 15;
    let aiScore = Math.min(25, Math.round(18 + Math.random() * 6));
    let total = catScore + colScore + locScore + timeScore + aiScore;

    setDemoMatchScore({
      total: Math.min(100, total),
      category: catScore,
      color: colScore,
      location: locScore,
      time: timeScore,
      ai: aiScore,
    });
  };

  // Test Secret Answer Simulation
  const evaluateTestSecretAnswer = () => {
    const ignore = new Set(['the', 'a', 'an', 'is', 'are', 'there', 'it', 'has', 'on', 'of', 'in']);
    const storedWords = storedSecretAnswer
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => !ignore.has(w) && w.length > 0);
    const givenWords = new Set(
      testClaimantAnswer
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !ignore.has(w) && w.length > 0)
    );

    const matches = storedWords.filter((w) => givenWords.has(w));
    const ratio = storedWords.length > 0 ? (matches.length / storedWords.length) * 100 : 0;
    const isVerified = ratio >= 60;

    setTestScoreResult({
      verified: isVerified,
      ratio: Math.round(ratio * 10) / 10,
      matchedWords: matches,
    });
  };

  return (
    <div className="relative">
      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Campus Innovation Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Smart Campus Ecosystem</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Next-Gen Recovery</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white uppercase">
                LOSFER
              </h1>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Search. Match. Reclaim.
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              An intelligent campus lost &amp; found platform that helps students report, match, verify and securely recover their belongings.
            </p>

            {/* Primary Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/report?type=lost"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 active:scale-98 transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Report Lost Item</span>
              </Link>
              <Link
                href="/report?type=found"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-6 py-3.5 text-sm font-bold text-cyan-300 hover:bg-cyan-950/60 hover:border-cyan-500/60 active:scale-98 transition-all"
              >
                <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                <span>Report Found Item</span>
              </Link>
              <Link
                href="/items"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-500 active:scale-98 transition-all"
              >
                <SearchIcon className="w-4 h-4" />
                <span>Browse Found Items</span>
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE HERO JOURNEY VISUALIZATION:                                    */}
          {/* Lost Item  ──>  AI Match  ──>  Verified  ──>  Reclaimed                   */}
          {/* ========================================================================= */}
          <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                The Recovery Journey
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-200 mt-1">
                How an Item Goes from Lost to Reclaimed
              </h2>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { step: 1, label: 'Lost Item', desc: 'Detailed Report & Question' },
                { step: 2, label: 'AI Match', desc: 'TF-IDF Vector + Proximity' },
                { step: 3, label: 'Verified', desc: 'Secret Answer Challenge' },
                { step: 4, label: 'Reclaimed', desc: 'Dual-Scan Campus QR' },
              ].map((item) => (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`relative p-4 rounded-2xl text-left border transition-all duration-300 ${
                    activeStep === item.step
                      ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/70 to-slate-900/80 shadow-lg shadow-cyan-500/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        activeStep === item.step
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      0{item.step}
                    </span>
                    {activeStep > item.step && (
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <h3
                    className={`font-bold text-sm ${
                      activeStep === item.step ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* Interactive Step Showcase Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-950/50">
              <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-10">
                <CpuIcon className="w-48 h-48 text-cyan-400" />
              </div>

              {activeStep === 1 && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <span>Step 1 • Smart Reporting</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      A Student Reports a Lost Item
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Instead of posting vague notices, students record category, color, precise campus coordinates (e.g. <em>Central Library 2nd Floor</em>), and a <strong>private secret verification answer</strong> that only the true owner knows.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-400">
                      <li className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                        <span>Precise building, floor, and room geolocation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                        <span>Private secret question created to protect against false claims</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-cyan-400" />
                        <span>Optional photo attachment for reference</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 space-y-3 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-cyan-400 font-bold">REPORT #1042 — LOST</span>
                      <span className="text-[10px] text-slate-500">Just now</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Item: </span>
                      <span className="text-white font-semibold">Casio FX-991CW Calculator</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Location: </span>
                      <span className="text-slate-200">Room 204, Block B (Near Row 4)</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Secret Hint: </span>
                      <span className="text-cyan-300">Scratch pattern on the slide battery cover</span>
                    </div>
                    <div className="pt-2">
                      <span className="inline-block rounded bg-cyan-950/60 border border-cyan-500/30 px-2 py-1 text-[10px] text-cyan-400">
                        Status: Broadcasted to AI Match Pipeline
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <span>Step 2 • Multi-Factor AI Engine</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Intelligent Heuristic &amp; NLP Matching
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      LOSFER runs TF-IDF vector cosine similarity on item descriptions coupled with four campus heuristic factors: Category match (+30%), Color match (+15%), Location match (+15%), and Time proximity (+15%).
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">TF-IDF Text Score</span>
                        <span className="text-cyan-400 font-bold text-sm">25.0 / 25.0</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Campus Location</span>
                        <span className="text-cyan-400 font-bold text-sm">15.0 / 15.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-cyan-400 font-bold">MATCH DISCOVERED</span>
                      <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] text-emerald-300 font-bold">
                        92.5% High Confidence
                      </span>
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Category (Electronics)</span>
                        <span className="text-cyan-300">+30%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full w-full" />
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Proximity (Block B, Room 204)</span>
                        <span className="text-cyan-300">+15%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full w-full" />
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">TF-IDF Vector Cosine Sim</span>
                        <span className="text-cyan-300">+22.5%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-400 h-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <span>Step 3 • Zero-Knowledge Verification</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Private Secret Answer Verification
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      No student can falsely claim an item just by looking at a photo. Claimants must submit a detail only the rightful owner would know. Our backend validates the keyword ratio (&ge;60%) without ever revealing the secret answer publicly.
                    </p>
                    <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-xs text-emerald-300">
                      <span className="font-bold">Backend Verification Gate: </span>
                      Passing score triggers claim approval and generates the cryptographic handoff token.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-emerald-400 font-bold">VERIFICATION RESULT</span>
                      <span className="text-emerald-300 font-bold">PASS (&ge; 60%)</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-slate-500 block text-[10px]">Claimant Response:</span>
                      <span className="text-slate-200 text-xs">&quot;Scratch on the back battery cover with initials PK&quot;</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span className="text-slate-400">Keyword Match Ratio:</span>
                      <span className="text-emerald-400 font-bold text-sm">83.3%</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Status: Ownership verified. Authorized for QR handoff.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <span>Step 4 • Safe Campus Handshake</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      Secure QR Handoff &amp; Item Reclaimed
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      The verified owner presents an encrypted, time-limited campus recovery QR code. The finder or campus security desk scans the QR code to confirm delivery, update the database, and issue an immutable Reclaim Certificate.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        href="/handoff"
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                      >
                        <span>Explore the QR Handoff Flow</span>
                        <ArrowRightIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-cyan-500/30 bg-slate-950/90 p-6 space-y-3 text-center">
                    <div className="h-32 w-32 rounded-xl bg-white p-2.5 shadow-xl flex items-center justify-center">
                      <QrCodeIcon className="w-24 h-24 text-slate-950" />
                    </div>
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      RECLAIM-TOKEN-TX-8829
                    </span>
                    <span className="rounded-full bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-300">
                      ✓ Recovery Complete • Item Reclaimed
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE FEATURES HIGHLIGHT                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-cyan-500/10 bg-[#060a12]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Platform Innovations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              Engineered Specifically for Campus Security
            </h2>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed">
              Traditional noticeboards fail because anyone can falsely claim an item or waste hours searching. LOSFER solves this with 5 core technological pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                title: '1. AI Smart Matching',
                desc: 'TF-IDF vector text similarity, category filters, and campus location proximity heuristics.',
                icon: CpuIcon,
                tag: 'NLP + Proximity',
              },
              {
                title: '2. Secret Verification',
                desc: 'Zero-knowledge verification challenge with a 60% keyword match threshold to prevent wrongful claims.',
                icon: ShieldCheckIcon,
                tag: 'Privacy Gate',
              },
              {
                title: '3. Secure QR Handoff',
                desc: 'Dual-confirmation campus reclaim token scanned at security desks or between students.',
                icon: QrCodeIcon,
                tag: 'Handshake Protocol',
              },
              {
                title: '4. Image Safety Scanning',
                desc: 'Automated NudeNet computer vision checks to filter inappropriate uploads before publication.',
                icon: CameraIcon,
                tag: 'Content Guard',
              },
              {
                title: '5. Lost & Found Hub',
                desc: 'Structured metadata with university building mapping, timestamp tracking, and real-time alerts.',
                icon: TagIcon,
                tag: 'Campus Grid',
              },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/40"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE SHOWCASES (AI MATCHING + SECRET ANSWER VERIFICATION + QR)     */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-cyan-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Interactive Demonstrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              Test LOSFER Intelligence in Real Time
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Try the AI Matching algorithm, simulate the secret verification challenge, and inspect how the QR handshake protocol operates.
            </p>
          </div>

          {/* Showcase 1: AI Match Sandbox */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/20 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
                  <SparklesIcon className="w-4 h-4" />
                  <span>Interactive Showcase 1</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Multi-Factor AI Matching Engine
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Simulate entering an item to see how the backend weighs TF-IDF text vectors, category, color, location, and time.
                </p>
              </div>
              <button
                onClick={runDemoMatchCalculation}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all"
              >
                <RefreshCwIcon className="w-3.5 h-3.5" />
                <span>Recalculate Score</span>
              </button>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Lost Item Description (Simulated Input):
                  </label>
                  <textarea
                    rows={3}
                    value={demoDescription}
                    onChange={(e) => setDemoDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-200 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Category
                    </label>
                    <select
                      value={demoCategory}
                      onChange={(e) => setDemoCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-400"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Bags">Bags</option>
                      <option value="Documents">Documents</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Candidate Found Item
                    </label>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs text-slate-300 truncate">
                      HP Laptop Adapter (Central Library)
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Score Results Card */}
              <div className="md:col-span-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Similarity Confidence</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                      {demoMatchScore.total}%
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-950/70 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300">
                    High Confidence (&ge;70%)
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Category Alignment</span>
                      <span className="text-cyan-400">+{demoMatchScore.category}% / 30%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${(demoMatchScore.category / 30) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Location Proximity</span>
                      <span className="text-cyan-400">+{demoMatchScore.location}% / 15%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${(demoMatchScore.location / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Color Match</span>
                      <span className="text-cyan-400">+{demoMatchScore.color}% / 15%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${(demoMatchScore.color / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>TF-IDF Vector Cosine Sim (NLP)</span>
                      <span className="text-blue-400">+{demoMatchScore.ai}% / 25%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-400 h-full transition-all duration-500"
                        style={{ width: `${(demoMatchScore.ai / 25) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase 2: Zero-Knowledge Verification Challenge */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/20 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>Interactive Showcase 2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Zero-Knowledge Ownership Verification
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Test the backend keyword verification logic. The stored secret answer is never revealed publicly on the item page.
                </p>
              </div>
              <button
                onClick={evaluateTestSecretAnswer}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all"
              >
                <CheckCircleIcon className="w-3.5 h-3.5" />
                <span>Verify Answer</span>
              </button>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs">
                  <span className="text-slate-400 block text-[11px] mb-1 font-semibold">
                    Simulated Item Secret Record (Hidden in DB):
                  </span>
                  <div className="font-mono text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-cyan-500/20">
                    &quot;{storedSecretAnswer}&quot;
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    Common filler words (the, a, an, on, in, is, of, it) are stripped, and a 60% keyword match threshold is applied.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Claimant Submitted Answer (Editable):
                  </label>
                  <input
                    type="text"
                    value={testClaimantAnswer}
                    onChange={(e) => setTestClaimantAnswer(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-200 outline-none focus:border-cyan-400"
                    placeholder="Enter what you know about the item..."
                  />
                </div>
              </div>

              <div className="md:col-span-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Keyword Match Score</span>
                    <span
                      className={`text-3xl font-black font-mono ${
                        testScoreResult.verified ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {testScoreResult.ratio}%
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold border ${
                      testScoreResult.verified
                        ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/70 border-red-500/40 text-red-300'
                    }`}
                  >
                    {testScoreResult.verified ? '✓ Ownership Verified' : '✕ Match Insufficient'}
                  </span>
                </div>

                <div className="text-xs space-y-2">
                  <span className="text-slate-400 block">Matched Significant Keywords:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {testScoreResult.matchedWords.map((word, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 font-mono text-[11px] text-cyan-300"
                      >
                        ✓ {word}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
                    {testScoreResult.verified
                      ? 'Score satisfies the 60% requirement. The system issues a cryptographic claim token.'
                      : 'Match ratio is below 60%. Manual campus desk review required.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* RECENT FOUND ITEMS ON CAMPUS (LIVE BACKEND DATA)                           */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-cyan-500/10 bg-[#060a12]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                Live Feed
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white mt-1">
                Recently Found Belongings
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Items submitted by fellow students and campus security awaiting claim.
              </p>
            </div>
            <Link
              href="/items"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              <span>View Full Campus Catalog</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 uppercase">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <ClockIcon className="w-3 h-3 text-cyan-400" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-300 pt-1">
                    <MapPinIcon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-2">
                  <Link
                    href={`/verify/${item.id}`}
                    className="flex-1 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-xs font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    Claim Item
                  </Link>
                  <Link
                    href={`/matches?item_id=${item.id}`}
                    className="flex-1 text-center rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                  >
                    Find Matches
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4-STEP "HOW LOSFER WORKS" SECTION                                         */}
      {/* ========================================================================= */}
      <section className="py-20 border-t border-cyan-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Simple 4-Step Recovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-2">
              Designed for Speed and Peace of Mind
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Report with Secret Hint',
                desc: 'File details, photo, and campus coordinates. Add a private secret answer that only the true owner knows.',
              },
              {
                step: '02',
                title: 'AI Multi-Factor Matching',
                desc: 'Our engine instantly evaluates TF-IDF description similarity, location proximity, and timestamps.',
              },
              {
                step: '03',
                title: 'Ownership Verification',
                desc: 'The claimant tests their knowledge against the secret answer without exposing sensitive details.',
              },
              {
                step: '04',
                title: 'QR Campus Handshake',
                desc: 'Meet safely at campus security or designated desk. Scan the encrypted QR code to complete recovery.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="relative glass-card rounded-2xl p-6 border border-slate-800 space-y-3"
              >
                <span className="text-3xl font-black font-mono text-cyan-400/40">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CALL TO ACTION BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="py-16 border-t border-cyan-500/10 bg-gradient-to-b from-[#070b14] to-[#04060c]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-blue-950/60 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                Ready to Recover?
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Reclaim Your Belongings Today.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Whether you lost a laptop charger in the library or found a watch on the sports ground, LOSFER makes the recovery fast, verified, and secure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/report"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Submit a Report Now</span>
              </Link>
              <Link
                href="/items"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-all"
              >
                <span>Browse Found Items</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}