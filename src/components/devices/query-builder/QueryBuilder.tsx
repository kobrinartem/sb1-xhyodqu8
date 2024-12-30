import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { QueryTabs } from './QueryTabs';
import { QueryForm } from './QueryForm';
import { QueryList } from './QueryList';
import { QueryEditModal } from './QueryEditModal';
import { useDeviceQueries } from '../../../hooks/useDeviceQueries';
import { createDeviceQuery, deleteDeviceQuery } from '../../../services/device/queryService';
import type { DeviceQuery, QueryType } from '../../../types/device';

interface QueryBuilderProps {
  deviceId: string;
}

export const QueryBuilder: React.FC<QueryBuilderProps> = ({ deviceId }) => {
  const [activeTab, setActiveTab] = useState<QueryType>('vigilance');
  const { queries, loading, error, refreshQueries } = useDeviceQueries(deviceId);
  const [editingQuery, setEditingQuery] = useState<DeviceQuery | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Filter queries based on active tab
  const filteredQueries = queries.filter(q => q.query_type === activeTab);

  const handleSaveQuery = async (queryText: string) => {
    try {
      setSaveError(null);
      await createDeviceQuery(deviceId, queryText, activeTab);
      await refreshQueries();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save query');
      console.error('Failed to save query:', err);
    }
  };

  const handleDeleteQuery = async (queryId: string) => {
    try {
      setSaveError(null);
      await deleteDeviceQuery(queryId);
      await refreshQueries();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to delete query');
      console.error('Failed to delete query:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Literature Query Builder</h3>
        </div>
        <QueryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="p-4 space-y-4">
        <QueryForm onSave={handleSaveQuery} />
        
        {(error || saveError) && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error || saveError}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
          </div>
        ) : (
          <QueryList 
            queries={filteredQueries}
            onEdit={setEditingQuery}
            onDelete={handleDeleteQuery}
          />
        )}
      </div>

      {editingQuery && (
        <QueryEditModal
          query={editingQuery}
          onClose={() => setEditingQuery(null)}
          onQueryUpdated={refreshQueries}
        />
      )}
    </div>
  );
};