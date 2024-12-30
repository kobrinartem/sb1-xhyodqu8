import React from 'react';

interface QueryPreviewProps {
  query: string;
}

export const QueryPreview: React.FC<QueryPreviewProps> = ({ query }) => {
  if (!query.trim()) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Generated Query:</h4>
      <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-700">
        {query}
      </div>
    </div>
  );
};