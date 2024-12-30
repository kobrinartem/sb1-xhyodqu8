import React, { useState } from 'react';
import { QueryConfig } from '../types/query';
import { QueryBuilder } from '../components/query/QueryBuilder';

export const QueryBuilderPage: React.FC = () => {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>({
    query_text: '',
    groups: [
      {
        id: crypto.randomUUID(),
        operator: 'OR',
        terms: [
          { id: crypto.randomUUID(), value: '', operator: 'OR' }
        ]
      }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Literature Query Builder</h2>
        <p className="mt-1 text-sm text-gray-600">
          Build and save search queries for medical device literature analysis.
        </p>
      </div>

      <QueryBuilder 
        config={queryConfig}
        onChange={setQueryConfig}
      />
    </div>
  );
};