import React from 'react';

interface QueryErrorProps {
  error: string;
}

export const QueryError: React.FC<QueryErrorProps> = ({ error }) => {
  return (
    <div className="p-4 bg-red-50 border-t border-red-200">
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
};