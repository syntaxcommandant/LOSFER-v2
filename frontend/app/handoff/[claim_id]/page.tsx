'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  QrCodeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  SmartphoneIcon,
  ArrowLeftIcon,
  CheckCheckIcon,
  DownloadIcon,
  LockIcon,
  ClockIcon,
  MapPinIcon,
} from '../../../components/icons';

export default function ClaimHandoffPassPage() {
  const params = useParams();
  const claimId = params.claim_id ? String(params.claim_id) : '1042';

  const [handshakeCompleted, setHandshakeCompleted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(86400); // 24 hours countdown
  const [certificateId] = useState(`CERT-CAMPUS-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setHandshakeCompleted(true);
    }, 1800);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Link
        href="/handoff"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to QR Protocols</span>
      </Link>

      {/* Main Glass Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl space-y-8">
        {!handshakeCompleted ? (
          /* =============================================================== */
          /* ACTIVE RECLAIM PASS VIEW                                        */
          /* =============================================================== */
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: QR Pass Code Box */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950/90 border border-cyan-500/30 space-y-4 shadow-xl text-center">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Official Campus Recovery Pass
              </span>

              {/* High Tech QR Code Box */}
              <div className="relative p-5 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                <QrCodeIcon className="w-48 h-48 text-slate-950" />
                <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-2xl pointer-events-none" />
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-slate-200">
                  TOKEN: RECLAIM-TX-{claimId}-VERIFIED
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-mono">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>Valid for: {formatTimer(timerSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Right: Pass Details & Scanning Action */}
            <div className="md:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-0.5 text-xs font-bold text-emerald-300">
                  <ShieldCheckIcon className="w-3.5 h-3.5" />
                  <span>Claim #{claimId} Approved</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Present Pass at Security Desk
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Both parties meet safely at Campus Security Desk or designated student union desk. The finder scans this code to confirm physical handoff.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Authorized Desk:</span>
                  <span className="text-white font-medium">Campus Main Security Booth</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Ownership Status:</span>
                  <span className="text-emerald-400 font-medium">Verified &ge;60% Keyword Pass</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Dual Confirmation:</span>
                  <span className="text-cyan-300 font-medium">Required for Lock</span>
                </div>
              </div>

              {/* Simulation CTA for presentation */}
              <div className="pt-2">
                <button
                  onClick={handleSimulateScan}
                  disabled={scanning}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 active:scale-98 transition-all"
                >
                  {scanning ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Validating Dual Signatures...</span>
                    </>
                  ) : (
                    <>
                      <SmartphoneIcon className="w-4 h-4" />
                      <span>Simulate Campus Desk QR Scan</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] text-slate-500 block text-center mt-2">
                  (Click above to simulate the desk officer scanning this pass during presentation)
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* =============================================================== */
          /* RECLAIMED SUCCESS CERTIFICATE VIEW                              */
          /* =============================================================== */
          <div className="space-y-8 text-center py-4">
            <div className="h-16 w-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/25">
              <CheckCheckIcon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Mutual Handshake Confirmed
              </span>
              <h2 className="text-3xl font-black text-white">
                Item Successfully Reclaimed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                The transaction is finalized. Both parties have verified physical return. An immutable record has been issued.
              </p>
            </div>

            {/* Official Digital Certificate */}
            <div className="rounded-3xl border-2 border-cyan-500/30 bg-slate-950/90 p-8 max-w-xl mx-auto space-y-6 text-left shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-black text-white">LOSFER RECOVERY CERTIFICATE</h3>
                  <span className="text-[10px] font-mono text-cyan-400">{certificateId}</span>
                </div>
                <div className="rounded-full bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 text-[10px] font-bold text-emerald-300">
                  ✓ VERIFIED
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Claim Reference:</span>
                  <span className="text-slate-200 font-bold">#{claimId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Timestamp:</span>
                  <span className="text-slate-200 font-bold">{new Date().toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Security Station:</span>
                  <span className="text-slate-200 font-bold">North Gate Desk #2</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Cryptographic Status:</span>
                  <span className="text-emerald-400 font-bold">Sealed &amp; Completed</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>LOSFER Campus Lost &amp; Found Platform</span>
                <span className="font-mono text-cyan-400">Zero-Fraud Protocol</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/items"
                className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Browse Other Items
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
