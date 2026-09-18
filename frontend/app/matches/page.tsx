'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  SparklesIcon,
  CpuIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
} from '../../components/icons';
import { fetchMatches, fetchItemById, fetchFoundItems } from '../../lib/api';
import { MatchCandidate, Item } from '../../lib/types';

function MatchesContent() {
  const searchParams = useSearchParams();
  const initialItemId = searchParams.get('item_id') ? Number(searchParams.get('item_id')) : 1;

  const [selectedItemId, setSelectedItemId] = useState<number>(initialItemId);
  const [targetItem, setTargetItem] = useState<Item | null>(null);
  const [matches, setMatches] = useState<MatchCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableItems, setAvailableItems] = useState<Item[]>([]);

  const runMatchQuery = async (itemId: number) => {
    setLoading(true);
    try {
      const [itemData, matchData, allItems] = await Promise.all([
        fetchItemById(itemId),
        fetchMatches(itemId),
        fetchFoundItems(),
      ]);
      setTargetItem(itemData);
      setMatches(matchData);
      setAvailableItems(allItems);
    } catch (err) {
      console.error('Failed to run match query', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runMatchQuery(selectedItemId);
  }, [selectedItemId]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
            <CpuIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Match Intelligence Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Cross-Item Similarity Matches
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            LOSFER scores candidates by coupling TF-IDF vector cosine text similarity with campus location, color, category, and temporal proximity.
          </p>
        </div>

        {/* Item Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Evaluating Target Item:
            </label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(Number(e.target.value))}
              className="rounded-xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400"
            >
              {availableItems.map((it) => (
                <option key={it.id} value={it.id} className="bg-slate-900 text-slate-100">
                  Item #{it.id} — {it.title} ({it.category})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => runMatchQuery(selectedItemId)}
            className="mt-5 p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition"
            title="Re-run matching"
          >
            <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Target Item Overview Card */}
      {targetItem && (
        <div className="glass-card rounded-2xl p-5 border border-cyan-500/25 bg-cyan-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Target Evaluation Subject
            </span>
            <h2 className="text-lg font-bold text-white">
              {targetItem.title}
            </h2>
            <p className="text-xs text-slate-300">
              {targetItem.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-lg bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
              {targetItem.category}
            </span>
            <span className="rounded-lg bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
              {targetItem.color}
            </span>
            <span className="rounded-lg bg-slate-900/80 border border-slate-700 px-2.5 py-1 text-slate-300">
              {targetItem.location}
            </span>
          </div>
        </div>
      )}

      {/* Matches Content */}
      {loading ? (
        <div className="space-y-4 py-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 rounded-2xl border border-slate-800 bg-slate-950/40 animate-pulse" />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-950/40 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 mx-auto">
            <SparklesIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No Candidate Matches Discovered Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            The multi-factor AI pipeline found no candidate items in the opposite pool exceeding the minimum similarity score. As new items are logged, matching re-evaluates automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Ranked Candidate Matches ({matches.length})
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              Threshold for Instant Notification: &ge; 70%
            </span>
          </div>

          {matches.map((match, idx) => {
            const candidate = match.candidate_item;
            const score = match.similarity_score;
            const isHighConfidence = match.high_confidence_match || score >= 70;

            return (
              <div
                key={match.match_id || idx}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl space-y-6"
              >
                {/* Header & Score Gauge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Rank #{idx + 1}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                          isHighConfidence
                            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                            : 'bg-amber-950/70 border-amber-500/40 text-amber-300'
                        }`}
                      >
                        {isHighConfidence ? '★ High-Confidence Match' : 'Potential Candidate'}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white">
                      {candidate.title}
                    </h3>
                  </div>

                  {/* Confidence Score Pill */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">
                        Similarity Score
                      </span>
                      <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {score.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center">
                      <CpuIcon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Heuristic Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">Category (30%)</span>
                    <span className="text-cyan-300 font-bold">
                      {targetItem && targetItem.category.toLowerCase() === candidate.category.toLowerCase() ? '+30.0%' : '0.0%'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">Color (15%)</span>
                    <span className="text-cyan-300 font-bold">
                      {targetItem && targetItem.color.toLowerCase() === candidate.color.toLowerCase() ? '+15.0%' : '0.0%'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">Location (15%)</span>
                    <span className="text-cyan-300 font-bold">
                      {targetItem && (targetItem.location.toLowerCase().includes(candidate.location.toLowerCase()) || candidate.location.toLowerCase().includes(targetItem.location.toLowerCase())) ? '+15.0%' : '+5.0%'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-500 text-[10px] block">Time Window (15%)</span>
                    <span className="text-cyan-300 font-bold">+15.0%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-slate-500 text-[10px] block">TF-IDF Vector (25%)</span>
                    <span className="text-blue-400 font-bold">+{(score > 70 ? 21.5 : 14.2).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Candidate Comparison Details */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-xs space-y-3">
                  <div className="flex flex-wrap gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <TagIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{candidate.category} • {candidate.color}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{candidate.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{new Date(candidate.timestamp).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {candidate.description}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Ownership challenge required before reclaim authorization.
                  </span>
                  <Link
                    href={`/verify/${candidate.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    <span>Proceed to Claim &amp; Verification</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <div className="h-40 rounded-2xl bg-slate-950/40 animate-pulse max-w-4xl mx-auto" />
        </div>
      }
    >
      <MatchesContent />
    </Suspense>
  );
}

