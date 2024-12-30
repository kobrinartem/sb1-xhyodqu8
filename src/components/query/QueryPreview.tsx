import React from 'react';
import { QueryConfig } from '../../types/query';
import { generateSearchQuery } from '../../utils/queryUtils';

interface QueryPreviewProps {
  config: QueryConfig;
}

export const QueryPreview: React.FC<QueryPreviewProps> = ({ config }) => {
  return (
    <div className="bg-gray-50 p-4 border-t border-gray-200">
      <h3 className="font-medium text-gray-700 mb-2">Generated Search Query:</h3>
      <div className="bg-white p-3 rounded border border-gray-300 font-mono text-sm">
        {generateSearchQuery(config)}
      </div>
    </div>
  );
};