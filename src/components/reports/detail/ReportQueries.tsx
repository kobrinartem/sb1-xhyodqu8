import React from 'react';
import type { DeviceQuery } from '../../../types/device';

interface ReportQueriesProps {
  queries: DeviceQuery[];
}

export const ReportQueries: React.FC<ReportQueriesProps> = ({ queries }) => {
  if (queries.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-gray-500">
        No search queries configured for this device.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {queries.map((query) => (
        <div key={query.id} className="bg-gray-50 rounded-lg p-4">
          <div className="font-mono text-sm text-gray-800">{query.query_text}</div>
          <div className="mt-2 text-xs text-gray-500">
            Added on {new Date(query.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};