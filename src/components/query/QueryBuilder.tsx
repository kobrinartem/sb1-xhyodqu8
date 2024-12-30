import React from 'react';
import { Plus } from 'lucide-react';
import { QueryConfig } from '../../types/query';
import { QueryGroupComponent } from './QueryGroup';
import { QueryForm } from './QueryForm';
import { QueryPreview } from './QueryPreview';
import { QueryError } from './QueryError';
import { QueryHeader } from './QueryHeader';
import { useQueryBuilder } from '../../hooks/useQueryBuilder';

const initialConfig: QueryConfig = {
  query_text: '',
  groups: [{
    id: crypto.randomUUID(),
    terms: [{ id: crypto.randomUUID(), value: '', operator: 'OR' }],
    operator: 'OR'
  }]
};

export const QueryBuilder: React.FC = () => {
  const {
    config,
    isSaving,
    error,
    addGroup,
    updateGroup,
    removeGroup,
    handleSave
  } = useQueryBuilder(initialConfig);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <QueryHeader />
          <QueryForm isSaving={isSaving} onSave={handleSave} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {config.groups.map(group => (
          <QueryGroupComponent
            key={group.id}
            group={group}
            onChange={(updated) => updateGroup(group.id, updated)}
            onRemove={() => removeGroup(group.id)}
          />
        ))}

        <button
          onClick={addGroup}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Query Group
        </button>
      </div>

      {error && <QueryError error={error} />}
      <QueryPreview config={config} />
    </div>
  );
};