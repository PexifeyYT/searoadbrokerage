'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Load } from '@/types';
import { Filter, Package, MapPin, Calendar, Weight, Phone } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatDate } from '@/lib/utils';

const equipmentTypes = [
  { value: '', label: 'All Equipment' },
  { value: 'Dry Van', label: 'Dry Van' },
  { value: 'Flatbed', label: 'Flatbed' },
  { value: 'Refrigerated', label: 'Refrigerated' },
  { value: 'Step Deck', label: 'Step Deck' },
  { value: 'RGN', label: 'RGN' },
  { value: 'Intermodal', label: 'Intermodal' },
  { value: 'Tanker', label: 'Tanker' },
];

export default function LoadBoardClient() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    equipment: '',
    pickupDate: '',
  });

  const fetchLoads = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('loads')
      .select('*')
      .eq('status', 'active')
      .order('pickup_date', { ascending: true });

    if (filters.origin) {
      query = query.ilike('origin_state', `%${filters.origin}%`);
    }
    if (filters.destination) {
      query = query.ilike('destination_state', `%${filters.destination}%`);
    }
    if (filters.equipment) {
      query = query.eq('equipment_type', filters.equipment);
    }
    if (filters.pickupDate) {
      query = query.gte('pickup_date', filters.pickupDate);
    }

    const { data, error } = await query.limit(50);
    if (!error && data) setLoads(data as Load[]);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchLoads();
  }, [fetchLoads]);

  // Realtime: update load list instantly when admin adds/edits/deletes
  useEffect(() => {
    const channel = supabase
      .channel('loads-public-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'loads' },
        () => {
          fetchLoads();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchLoads]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/30">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Available Loads</h1>
          <p className="text-blue-100">Browse available freight and contact us to book.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-4 mb-6">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="h-4 w-4" /> Filter Loads
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Origin state (e.g. CA)"
              value={filters.origin}
              onChange={(e) => setFilters((f) => ({ ...f, origin: e.target.value }))}
            />
            <Input
              placeholder="Destination state (e.g. TX)"
              value={filters.destination}
              onChange={(e) => setFilters((f) => ({ ...f, destination: e.target.value }))}
            />
            <Select
              options={equipmentTypes}
              value={filters.equipment}
              onChange={(e) => setFilters((f) => ({ ...f, equipment: e.target.value }))}
            />
            <Input
              type="date"
              value={filters.pickupDate}
              onChange={(e) => setFilters((f) => ({ ...f, pickupDate: e.target.value }))}
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="py-20"><LoadingSpinner size="lg" /></div>
        ) : loads.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Loads Available</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No active loads match your search. Check back soon or adjust your filters.
            </p>
            <button
              onClick={() => setFilters({ origin: '', destination: '', equipment: '', pickupDate: '' })}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loads.map((load) => (
              <button
                key={load.id}
                onClick={() => setSelectedLoad(load)}
                className="text-left bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                    {load.load_id}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    {load.equipment_type}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    {load.origin_city}, {load.origin_state}
                  </div>
                  <div className="ml-5 my-1 text-gray-400 text-xs">↓</div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                    <MapPin className="h-4 w-4 text-red-500" />
                    {load.destination_city}, {load.destination_state}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(load.pickup_date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Weight className="h-3 w-3" />
                    {load.weight_lbs.toLocaleString()} lbs
                  </div>
                </div>
                {load.rate && (
                  <div className="mt-3 text-sm font-bold text-blue-600 dark:text-blue-400">
                    ${load.rate.toLocaleString()}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Load Detail Modal */}
      <Modal
        isOpen={!!selectedLoad}
        onClose={() => setSelectedLoad(null)}
        title={`Load ${selectedLoad?.load_id}`}
        size="lg"
      >
        {selectedLoad && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Origin</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedLoad.origin_city}, {selectedLoad.origin_state}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Destination</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedLoad.destination_city}, {selectedLoad.destination_state}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Equipment</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedLoad.equipment_type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedLoad.weight_lbs.toLocaleString()} lbs</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pickup Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedLoad.pickup_date)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedLoad.delivery_date)}</p>
              </div>
              {selectedLoad.rate && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rate</p>
                  <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">${selectedLoad.rate.toLocaleString()}</p>
                </div>
              )}
              {selectedLoad.distance_miles && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedLoad.distance_miles.toLocaleString()} miles</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Commodity</p>
              <p className="font-medium text-gray-900 dark:text-white">{selectedLoad.commodity}</p>
            </div>
            {selectedLoad.special_requirements && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Special Requirements</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{selectedLoad.special_requirements}</p>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-dark-border pt-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Contact to Book</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+12099200003" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Phone className="h-4 w-4" /> (209) 920-0003
                </a>
                <a href="mailto:searoadbrokerageinc@gmail.com" className="flex items-center gap-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
