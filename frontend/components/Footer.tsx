import React from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, SparklesIcon, QrCodeIcon, LockIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#050810] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#070b14]">
                  <span className="font-mono text-lg font-black text-cyan-400">L</span>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">LOSFER</span>
            </div>
            <p className="text-xs text-cyan-400 font-medium tracking-wide">
              Search. Match. Reclaim.
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              An intelligent campus lost &amp; found platform that helps students report, match, verify and securely recover their belongings.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-2.5 py-1 text-[11px] text-cyan-300">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Campus Project Innovation</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/items" className="hover:text-cyan-400 transition-colors">
                  Browse Found Catalog
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-cyan-400 transition-colors">
                  AI Match Engine
                </Link>
              </li>
              <li>
                <Link href="/report?type=lost" className="hover:text-cyan-400 transition-colors">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link href="/report?type=found" className="hover:text-cyan-400 transition-colors">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link href="/handoff" className="hover:text-cyan-400 transition-colors">
                  Secure QR Handoff
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Technologies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              AI &amp; Security Specs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>TF-IDF Vector Cosine Matcher</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Zero-Knowledge Secret Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Dual-Scan Campus QR Handshake</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>NudeNet Automated Image Safety</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>Time &amp; Location Proximity Heuristics</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Safety Commitment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Privacy-First Protection
            </h4>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <ShieldCheckIcon className="w-4 h-4" />
                <span>Private Ownership Guard</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Secret answers are never shown publicly in catalog listings. Only verified claimants scoring &ge;60% keyword match can unlock the recovery handoff.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; 2026 LOSFER. College Project Presentation Platform.</p>
          <p className="text-[11px]">
            Engineered with Next.js 16 Turbopack &amp; FastAPI Backend Engine.
          </p>
        </div>
      </div>
    </footer>
  );
};
