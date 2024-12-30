import React from 'react';
import { DeviceQuery } from '../../../types/device';

interface QueryItemProps {
  query: DeviceQuery;
}

export const QueryItem: React.FC<QueryItemProps> = ({ query }) => {
  return (
    <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="text-gray-900 font-medium">{query.query_text}</p>
        <p className="text-sm text-gray-500">
          Added: {new Date(query.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};