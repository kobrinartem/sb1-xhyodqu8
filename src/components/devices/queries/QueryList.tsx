import React from 'react';
import { DeviceQuery } from '../../../types/device';
import { QueryItem } from './QueryItem';

interface QueryListProps {
  queries: DeviceQuery[];
}

export const QueryList: React.FC<QueryListProps> = ({ queries }) => {
  if (queries.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No queries added yet. Add a query to start monitoring literature.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {queries.map((query) => (
        <QueryItem key={query.id} query={query} />
      ))}
    </div>
  );
};