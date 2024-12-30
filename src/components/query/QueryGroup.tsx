import React from 'react';
import { Plus, X } from 'lucide-react';
import { QueryGroup, QueryTerm } from '../../types/query';
import { QueryTermComponent } from './QueryTerm';

interface QueryGroupProps {
  group: QueryGroup;
  onChange: (group: QueryGroup) => void;
  onRemove: () => void;
}

export const QueryGroupComponent: React.FC<QueryGroupProps> = ({
  group,
  onChange,
  onRemove
}) => {
  const addTerm = () => {
    onChange({
      ...group,
      terms: [
        ...group.terms,
        { id: crypto.randomUUID(), value: '', operator: group.operator }
      ]
    });
  };

  const updateTerm = (termId: string, term: QueryTerm) => {
    onChange({
      ...group,
      terms: group.terms.map(t => t.id === termId ? term : t)
    });
  };

  const removeTerm = (termId: string) => {
    onChange({
      ...group,
      terms: group.terms.filter(t => t.id !== termId)
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <select
            value={group.operator}
            onChange={(e) => onChange({ ...group, operator: e.target.value as 'AND' | 'OR' })}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
          <span className="text-sm text-gray-600">
            Connect terms with {group.operator}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {group.terms.map(term => (
          <QueryTermComponent
            key={term.id}
            term={term}
            onChange={(updated) => updateTerm(term.id, updated)}
            onRemove={() => removeTerm(term.id)}
          />
        ))}

        <button
          onClick={addTerm}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Term
        </button>
      </div>
    </div>
  );
};