import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useDeviceQueries } from '../../hooks/useDeviceQueries';
import { saveDeviceQuery } from '../../services/deviceService';
import { QueryList } from './queries/QueryList';
import { QueryForm } from './queries/QueryForm';

interface DeviceQueriesProps {
  deviceId: string;
}

export const DeviceQueries: React.FC<DeviceQueriesProps> = ({ deviceId }) => {
  const { queries, loading, error, refreshQueries } = useDeviceQueries(deviceId);
  const [newQuery, setNewQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuery.trim()) return;

    try {
      setIsSubmitting(true);
      await saveDeviceQuery(deviceId, newQuery.trim());
      setNewQuery('');
      refreshQueries();
    } catch (err) {
      console.error('Failed to save query:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Literature Search Queries
        </h3>
      </div>

      <div className="p-4">
        <QueryForm
          value={newQuery}
          onChange={setNewQuery}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {error ? (
          <div className="text-sm text-red-600 mb-4">{error}</div>
        ) : (
          <QueryList queries={queries} />
        )}
      </div>
    </div>
  );
};