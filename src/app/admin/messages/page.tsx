'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import type { ContactMessage } from '@/types';
import { adminFetch } from '@/lib/admin-fetch';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Mail, MailOpen } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    const res = await adminFetch('/api/admin/messages');
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.is_read) {
      await adminFetch('/api/admin/messages', {
        method: 'PUT',
        body: JSON.stringify({ id: msg.id, is_read: true }),
      });
      fetchMessages();
    }
  };

  return (
    <>
      <AdminHeader title="Contact Messages" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* List */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{messages.filter((m) => !m.is_read).length} unread</p>
            </div>
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-[70vh]">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => markRead(msg)}
                  className={cn(
                    'w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors',
                    selected?.id === msg.id && 'bg-blue-50',
                    !msg.is_read && 'font-medium'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900 flex items-center gap-1.5">
                      {msg.is_read ? <MailOpen className="h-3.5 w-3.5 text-gray-400" /> : <Mail className="h-3.5 w-3.5 text-blue-500" />}
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{msg.subject}</p>
                </button>
              ))}
              {messages.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-10">No messages</p>
              )}
            </div>
          </div>

          {/* Detail */}
          <div className={`lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 ${!selected ? 'hidden lg:flex' : ''}`}>
            {selected ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{selected.subject}</h2>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <span>From: <span className="text-gray-700 font-medium">{selected.name}</span></span>
                  <span>Email: <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a></span>
                  {selected.phone && <span>Phone: {selected.phone}</span>}
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Mail className="h-4 w-4" /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
