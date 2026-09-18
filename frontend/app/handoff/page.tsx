'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCodeIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  KeyIcon,
  CheckCheckIcon,
  DownloadIcon,
} from '../../components/icons';

export default function HandoffIndexPage() {
  const [testClaimId, setTestClaimId] = useState('1042');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          <QrCodeIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dual-Scan Handshake Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Secure Campus QR Handoff
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The final link in the recovery journey. Once ownership is verified, an encrypted digital token allows safe, tamper-proof return of items at designated campus desks.
        </p>
      </div>

      {/* Quick Launch Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl max-w-xl mx-auto text-center space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/20">
          <QrCodeIcon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            Access or Generate a Reclaim Pass
          </h2>
          <p className="text-xs text-slate-400">
            Enter your approved Claim ID to open your live recovery QR pass.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={testClaimId}
            onChange={(e) => setTestClaimId(e.target.value)}
            placeholder="Enter Claim ID (e.g. 1042)"
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-xs sm:text-sm text-slate-200 outline-none focus:border-cyan-400"
          />
          <Link
            href={`/handoff/${testClaimId || '1042'}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <span>Open Pass</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-2">
          <Link
            href="/items"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Don&apos;t have an approved claim yet? Browse found items to submit one &rarr;
          </Link>
        </div>
      </div>

      {/* 3-Step Protocol Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded">
            Stage 1
          </span>
          <h3 className="text-base font-bold text-white">
            Generate Reclaim Pass
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The claimant passes secret keyword verification. The backend authorizes an encrypted single-use QR token tied to their student ID.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded">
            Stage 2
          </span>
          <h3 className="text-base font-bold text-white">
            Physical Campus Meeting
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Both parties meet at Campus Security or designated student desks. The finder or desk officer scans the claimant&apos;s QR code.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded">
            Stage 3
          </span>
          <h3 className="text-base font-bold text-white">
            Mutual Digital Handshake
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upon scanning, the database locks the item as &quot;Reclaimed&quot; and generates a cryptographic proof certificate for both parties.
          </p>
        </div>
      </div>
    </div>
  );
}
