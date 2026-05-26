'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-fetch';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';

interface DayData { date: string; quotes: number }

export default function AnalyticsPage() {
  const [dailyData, setDailyData] = useState<DayData[]>([]);
  const [shipmentTypes, setShipmentTypes] = useState<{ name: string; value: number }[]>([]);
  const [monthlyLoads, setMonthlyLoads] = useState<{ month: string; loads: number }[]>([]);

  useEffect(() => {
    adminFetch('/api/admin/analytics')
      .then((r) => r.json())
      .then(({ quotes, loads }) => {
        const thirtyDaysAgo = subDays(new Date(), 29);
        const days = eachDayOfInterval({ start: thirtyDaysAgo, end: new Date() });

        const dayMap: Record<string, number> = {};
        const typeMap: Record<string, number> = {};
        (quotes || []).forEach((q: { created_at: string; shipment_type: string }) => {
          const day = format(new Date(q.created_at), 'MM/dd');
          dayMap[day] = (dayMap[day] || 0) + 1;
          typeMap[q.shipment_type] = (typeMap[q.shipment_type] || 0) + 1;
        });

        setDailyData(days.map((d) => ({ date: format(d, 'MM/dd'), quotes: dayMap[format(d, 'MM/dd')] || 0 })));
        setShipmentTypes(Object.entries(typeMap).map(([name, value]) => ({ name, value })));

        const monthMap: Record<string, number> = {};
        (loads || []).forEach((l: { created_at: string }) => {
          const month = format(new Date(l.created_at), 'MMM yyyy');
          monthMap[month] = (monthMap[month] || 0) + 1;
        });
        setMonthlyLoads(Object.entries(monthMap).map(([month, loads]) => ({ month, loads })));
      })
      .catch(console.error);
  }, []);

  const COLORS = ['#0A6EBD', '#1E88E5', '#42A5F5', '#90CAF9', '#BBDEFB', '#64B5F6'];

  return (
    <>
      <AdminHeader title="Analytics" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Daily Quote Requests (Last 30 Days)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="quotes" stroke="#0A6EBD" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Quote Shipment Types</h2>
              {shipmentTypes.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={shipmentTypes} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {shipmentTypes.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Monthly Loads Posted</h2>
              {monthlyLoads.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyLoads}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="loads" fill="#0A6EBD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
