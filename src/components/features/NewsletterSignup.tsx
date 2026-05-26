'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to subscribe');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-emerald-400">
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">You&apos;re subscribed! We&apos;ll keep you updated on load availability.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/15 rounded-lg p-2 flex-shrink-0 mt-0.5">
          <Mail className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Get load alerts</p>
          <p className="text-xs text-gray-400">Be notified when new loads are posted.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address for load alerts"
          className="flex-1 sm:w-56 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-red-400 sm:absolute sm:mt-12">{errorMsg}</p>
      )}
    </div>
  );
}
