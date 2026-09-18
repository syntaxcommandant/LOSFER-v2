'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SearchIcon,
  FilterIcon,
  MapPinIcon,
  ClockIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TagIcon,
  ArrowRightIcon,
  PlusIcon,
  RefreshCwIcon,
} from '../../components/icons';
import { fetchFoundItems, API_BASE_URL } from '../../lib/api';
import { Item } from '../../lib/types';

const categories = [
  'All',
  'Electronics',
  'Documents',
  'Accessories',
  'Bags',
  'Keys',
  'Clothing',
  'Books',
  'Other',
];

export default function BrowseItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const loadItems = async (cat?: string) => {
    setLoading(true);
    try {
      const data = await fetchFoundItems(cat === 'All' ? undefined : cat);
      setItems(data);
    } catch (err) {
      console.error('Failed to load items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(selectedCategory);
  }, [selectedCategory]);

  // Filter items locally by search query and color
  const filteredItems = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColor =
        selectedColor === 'All' || item.color.toLowerCase() === selectedColor.toLowerCase();
      return matchesSearch && matchesColor;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
            <SearchIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Campus Item Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Browse Found Items
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search verified items found across campus. Submit an ownership verification challenge to claim.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadItems(selectedCategory)}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition"
            title="Refresh Catalog"
          >
            <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/report?type=lost"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Report Lost Item</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search input */}
          <div className="md:col-span-8 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by item name, description, or campus building (e.g. 'Casio', 'Library', 'Earbuds')..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>

          {/* Color filter */}
          <div className="md:col-span-2">
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="All">All Colors</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Brown">Brown</option>
              <option value="Grey">Grey</option>
            </select>
          </div>

          {/* Sort order */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-200 outline-none focus:border-cyan-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl border border-slate-800 bg-slate-950/40 animate-pulse"
            />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-950/40 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 mx-auto">
            <SearchIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No items match your criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or category filters, or submit a lost item report so the AI engine alerts you when it is found.
          </p>
          <Link
            href="/report?type=lost"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            <span>Report Lost Belonging</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasImage = Boolean(item.image_url);
            const imageSrc = item.image_url
              ? item.image_url.startsWith('http')
                ? item.image_url
                : `${API_BASE_URL}/${item.image_url}`
              : null;

            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Visual Header / Photo Preview */}
                  <div className="relative h-44 w-full bg-slate-950/80 flex items-center justify-center border-b border-slate-800 overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // fallback if image fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-slate-600">
                        <TagIcon className="w-10 h-10 text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors" />
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          Verified Campus Photo on File
                        </span>
                      </div>
                    )}

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 uppercase">
                        {item.category}
                      </span>
                      <span className="rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                        {item.color}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300">
                        <ClockIcon className="w-3 h-3 text-cyan-400" />
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
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
                </div>

                {/* Card Actions */}
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-2">
                  <Link
                    href={`/verify/${item.id}`}
                    className="flex-1 text-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-xs font-bold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
                  >
                    Claim Item
                  </Link>
                  <Link
                    href={`/matches?item_id=${item.id}`}
                    className="flex-1 text-center rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                  >
                    AI Matches
                  </Link>
                  <Link
                    href={`/items/${item.id}`}
                    className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                    title="View Details"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
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
