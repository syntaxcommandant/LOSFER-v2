'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  LockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '../../components/icons';


export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const endpoint = isSignUp
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;

    const payload = isSignUp
      ? { email: email.trim(), password: password.trim() }
      : { email: email.trim(), password: password.trim() };

    const res = await axios.post(endpoint, payload);

    const userProfile = {
      id: res.data.user_id || res.data.id,
      email: email.trim(),
      name: name.trim() || 'Campus Student',
      studentId: studentId.trim() || 'N/A',
      role: 'student',
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('losfer_user', JSON.stringify(userProfile));
    }

    setLoading(false);
    setSuccessNotice(`Authenticated as ${userProfile.email}! Redirecting...`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  } catch (err) {
    setLoading(false);
    if (axios.isAxiosError(err)) {
      setSuccessNotice(null);
      alert(err.response?.data?.detail || 'Authentication failed');
    }
  }
};

  const handleQuickDemo = (role: 'student' | 'admin') => {
    const demoUser =
      role === 'student'
        ? {
            email: 'arjun.student@university.edu',
            name: 'Arjun Mehta',
            studentId: 'ENG-2024-4102',
            role: 'student',
          }
        : {
            email: 'security.desk@university.edu',
            name: 'Campus Security Station A',
            studentId: 'STAFF-902',
            role: 'admin',
          };

    if (typeof window !== 'undefined') {
      localStorage.setItem('losfer_user', JSON.stringify(demoUser));
    }
    setSuccessNotice(`Logged in as ${demoUser.name} (${demoUser.role})`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-8">
      {/* Brand Icon */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-xl shadow-cyan-500/20">
          <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#070b14]">
            <span className="font-mono text-2xl font-black text-cyan-400">L</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {isSignUp ? 'Create Campus Account' : 'Sign in to LOSFER'}
        </h1>
        <p className="text-xs text-slate-400">
          University Lost &amp; Found Intelligence Platform
        </p>
      </div>

      {/* Main Glass Form */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/20 shadow-2xl space-y-6">
        {/* Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2 rounded-lg transition-all ${
              !isSignUp ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2 rounded-lg transition-all ${
              isSignUp ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              University Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Student ID / Roll Number
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. CS-2024-410"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-cyan-400"
            />
          </div>

          {successNotice && (
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 active:scale-98 transition-all"
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Create Campus Account' : 'Sign In to Campus Node'}
          </button>
        </form>

        {/* Presentation Fast-Login Switcher */}
        <div className="pt-2 border-t border-slate-800 space-y-2 text-center">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Demo Fast-Login (For Presentation)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-[11px] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-[11px] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition"
            >
              Security Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
