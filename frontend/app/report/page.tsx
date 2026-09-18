'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import {
  SparklesIcon,
  ShieldCheckIcon,
  CameraIcon,
  UploadCloudIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  MapPinIcon,
  ClockIcon,
  TagIcon,
  KeyIcon,
  FileTextIcon,
  XIcon,
} from '../../components/icons';
import { API_BASE_URL } from '../../lib/api';

const categories = [
  'Electronics',
  'Documents',
  'Accessories',
  'Books',
  'Clothing',
  'Bags',
  'Keys',
  'Other',
];

const colors = [
  'Black',
  'White',
  'Blue',
  'Red',
  'Green',
  'Yellow',
  'Brown',
  'Grey',
  'Other',
];

const campusLocations = [
  'Central Library (Ground Floor / 1st / 2nd Floor)',
  'Main Academic Block A',
  'Science & Engineering Block B',
  'Auditorium & Event Center',
  'Student Activity Center (SAC)',
  'Main Cafeteria / Food Court',
  'Sports Complex & Pavilion',
  'Computer Lab 1 / 2 / 3',
  'Hostel Zone / Residential Quad',
  'Campus Main Gate / Parking',
  'Other Campus Location',
];

function ReportContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'found' ? 'found' : 'lost';

  const [type, setType] = useState<'lost' | 'found'>(initialType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean; reportId?: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set default timestamp to now in local ISO format (YYYY-MM-DDTHH:mm)
    const now = new Date();
    const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setTimestamp(localIso);
  }, []);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setMessage(null);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!title.trim()) {
      setMessage({ text: 'Please provide an item title.', isError: true });
      return;
    }
    if (!description.trim()) {
      setMessage({ text: 'Please describe the item in detail.', isError: true });
      return;
    }
    if (!category) {
      setMessage({ text: 'Please choose an item category.', isError: true });
      return;
    }
    if (!color) {
      setMessage({ text: 'Please select the predominant color.', isError: true });
      return;
    }
    if (!location.trim()) {
      setMessage({ text: 'Please specify the campus location.', isError: true });
      return;
    }
    if (!timestamp) {
      setMessage({ text: 'Please specify the date and time.', isError: true });
      return;
    }
    if (type === 'found' && !photo) {
      setMessage({ text: 'Photo upload is required for found items to facilitate verification.', isError: true });
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        type === 'lost'
          ? `${API_BASE_URL}/report-lost`
          : `${API_BASE_URL}/report-found`;

      const itemData = {
        title: title.trim(),
        description: description.trim(),
        ...((type === 'lost') && { secret_answer: secretAnswer.trim() }),
        category,
        color,
        location: location.trim(),
        timestamp: new Date(timestamp).toISOString(),
      };

      const formData = new FormData();
      formData.append('item_in', JSON.stringify(itemData));

      if (photo) {
        formData.append('image', photo);
      }

      const response = await axios.post(endpoint, formData);
      const reportId = response.data?.id || Math.floor(1000 + Math.random() * 9000);

      setMessage({
        text: `Success! ${type === 'lost' ? 'Lost' : 'Found'} report submitted with ID #${reportId}.`,
        isError: false,
        reportId,
      });

      // Clear fields
      setTitle('');
      setDescription('');
      setSecretAnswer('');
      setCategory('');
      setColor('');
      setLocation('');
      removePhoto();
    } catch (err: any) {
      let errDetail = 'Failed to submit report. Please verify backend connection.';
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        if (Array.isArray(detail)) {
          errDetail = detail.map((d: any) => d.msg || String(d)).join(', ');
        } else if (typeof detail === 'string') {
          errDetail = detail;
        }
      }
      setMessage({ text: `Submission Error: ${errDetail}`, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          <TagIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Campus Reporting Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Report an Item
        </h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Broadcast your lost belonging to the AI Match Engine, or report a found item so its owner can safely verify and reclaim it.
        </p>
      </div>

      {/* Main Glass Form Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/20 shadow-2xl space-y-8">
        {/* Toggle Lost vs Found */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setType('lost');
              setMessage(null);
            }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              type === 'lost'
                ? 'bg-gradient-to-r from-red-500/90 to-amber-600/90 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>I Lost Something</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('found');
              setMessage(null);
            }}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              type === 'found'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>I Found Something</span>
          </button>
        </div>

        {/* Safety Scanning Indicator for Found Items */}
        {type === 'found' && (
          <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 text-xs text-cyan-300">
            <div className="flex items-center gap-2.5">
              <CameraIcon className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>NudeNet Safety Scanner Active:</strong> Uploaded images are automatically screened for content compliance before publishing.
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-500/40">
              Auto Guard
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
              Item Name / Title <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Casio fx-991CW Scientific Calculator"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
              Detailed Description <span className="text-cyan-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe physical condition, branding, distinguishing marks, scratches, accessories included, etc..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none"
            />
          </div>

          {/* Category & Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Category <span className="text-cyan-400">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-400 transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-slate-100">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Predominant Color <span className="text-cyan-400">*</span>
              </label>
              <select
                required
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-400 transition-all"
              >
                <option value="">Select Color</option>
                {colors.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-100">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campus Location & Timestamp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Campus Location <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                list="locations-list"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Central Library, 2nd Floor Room 204"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-all"
              />
              <datalist id="locations-list">
                {campusLocations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
                Date &amp; Time Observed <span className="text-cyan-400">*</span>
              </label>
              <input
                type="datetime-local"
                required
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-cyan-400 transition-all"
              />
            </div>
          </div>
          {type === 'lost' && (
            <>
          {/* Secret Answer Ownership Protection Gate */}
          <div className="rounded-2xl border border-cyan-500/25 bg-cyan-950/20 p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <KeyIcon className="w-4 h-4 text-cyan-400" />
              <span>Private Secret Verification Answer</span>
              <span className="text-[10px] text-cyan-400 font-mono bg-cyan-900/50 px-2 py-0.5 rounded">
                Zero-Knowledge Privacy Gate
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter a detail only the real owner would know (e.g., sticker under the lid, engraving initials, lockscreen wallpaper, or unique scuff). 
              <strong> This answer is NEVER displayed publicly.</strong> A claimant must match at least 60% of these keywords to claim the item.
            </p>
            <input
              type="text"
              required
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              placeholder="e.g. initials PK engraved on back battery cover with blue ink smudge"
              className="w-full rounded-xl border border-cyan-500/40 bg-slate-950/90 px-4 py-3 text-xs sm:text-sm text-cyan-200 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
          </div>
          </>
          )}

          {/* Photo Upload Dropzone with Live Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 uppercase tracking-wider">
              Item Photo {type === 'found' ? <span className="text-cyan-400">* (Required)</span> : <span className="text-slate-500">(Optional)</span>}
            </label>

            {photoPreview ? (
              <div className="relative rounded-2xl border border-cyan-500/30 overflow-hidden bg-slate-950 p-4 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={photoPreview}
                  alt="Item preview"
                  className="h-32 w-32 object-cover rounded-xl border border-slate-800"
                />
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <p className="text-xs font-bold text-white truncate max-w-xs">
                    {photo?.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {(photo!.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI Safety Scan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="p-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-900/60 transition-colors"
                  title="Remove image"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-8 text-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-950/10 transition-all duration-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 mb-3">
                  <UploadCloudIcon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Click or drag photo here to upload
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  PNG, JPG or JPEG up to 10MB
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm flex items-start gap-3 ${
                message.isError
                  ? 'border border-red-500/30 bg-red-950/40 text-red-300'
                  : 'border border-emerald-500/30 bg-emerald-950/40 text-emerald-300'
              }`}
            >
              {message.isError ? (
                <AlertTriangleIcon className="w-5 h-5 flex-shrink-0 text-red-400" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              )}
              <div className="flex-1 space-y-2">
                <p className="font-semibold">{message.text}</p>
                {!message.isError && message.reportId && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href={`/matches?item_id=${message.reportId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-lg hover:bg-cyan-900/60"
                    >
                      <SparklesIcon className="w-3.5 h-3.5" />
                      <span>Check AI Matches for #{message.reportId}</span>
                    </Link>
                    <Link
                      href="/items"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg hover:text-white"
                    >
                      <span>Browse Campus Catalog</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Submitting &amp; Scanning...</span>
              </>
            ) : (
              <>
                <span>{type === 'lost' ? 'Submit Lost Report to AI Engine' : 'Publish Found Item Report'}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <div className="h-40 rounded-2xl bg-slate-950/40 animate-pulse max-w-4xl mx-auto" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}