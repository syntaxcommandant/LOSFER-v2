'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  KeyIcon,
  LockIcon,
  CameraIcon,
  Share2Icon,
  CheckCircleIcon,
} from '../../../components/icons';
import { fetchItemById, API_BASE_URL } from '../../../lib/api';
import { Item } from '../../../lib/types';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = Number(params.id);

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (!itemId) return;
      try {
        const data = await fetchItemById(itemId);
        setItem(data);
      } catch (err) {
        console.error('Failed to load item detail', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [itemId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 max-w-4xl mx-auto text-center">
        <div className="h-64 rounded-3xl border border-slate-800 bg-slate-950/40 animate-pulse" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Item Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested item could not be located in the campus database.
        </p>
        <Link
          href="/items"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const imageSrc = item.image_url
    ? item.image_url.startsWith('http')
      ? item.image_url
      : `${API_BASE_URL}/${item.image_url}`
    : null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/items"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back to Browse Catalog</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition"
        >
          <span>{copied ? '✓ Link Copied!' : 'Share Item'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Card */}
        <div className="md:col-span-5 glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="relative h-72 sm:h-80 w-full bg-slate-950 flex items-center justify-center">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-600">
                <TagIcon className="w-16 h-16 text-cyan-500/20" />
                <span className="text-xs font-mono text-slate-500">
                  Campus Photo on File
                </span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="rounded-md bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 text-[10px] font-bold text-emerald-300 uppercase">
                {item.item_type} Item #{item.id}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Image Status:</span>
              <span className="text-emerald-400 font-mono">Screened &amp; Safe</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Security Gate:</span>
              <span className="text-cyan-300 font-mono">Secret Verification Active</span>
            </div>
          </div>
        </div>

        {/* Right Column: Item Information & Verification Actions */}
        <div className="md:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-cyan-950/60 border border-cyan-500/30 px-3 py-0.5 text-xs font-bold text-cyan-300 uppercase">
                  {item.category}
                </span>
                <span className="rounded-full bg-slate-900 border border-slate-700 px-3 py-0.5 text-xs font-medium text-slate-300">
                  Color: {item.color}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {item.title}
              </h1>
            </div>

            {/* Location & Time details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Found Location</span>
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <MapPinIcon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-slate-500 block">Date &amp; Time Logged</span>
                <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <ClockIcon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Item Description
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
                {item.description}
              </p>
            </div>

            {/* Zero-Knowledge Notice */}
            <div className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-cyan-300">
                <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />
                <span>Protected by Zero-Knowledge Verification</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The secret answer given by the finder is securely stored. You must answer the ownership challenge accurately (&ge;60% match) to prove rightful ownership.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/verify/${item.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <KeyIcon className="w-4 h-4" />
                <span>Claim This Item (Verify Ownership)</span>
              </Link>

              <Link
                href={`/matches?item_id=${item.id}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:border-slate-500 transition-all"
              >
                <SparklesIcon className="w-4 h-4 text-cyan-400" />
                <span>Run AI Cross-Match Against Lost Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
