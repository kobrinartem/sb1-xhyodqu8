import React from 'react';
import { X } from 'lucide-react';
import { QueryTerm } from '../../types/query';

interface QueryTermProps {
  term: QueryTerm;
  onChange: (term: QueryTerm) => void;
  onRemove: () => void;
}

export const QueryTermComponent: React.FC<QueryTermProps> = ({
  term,
  onChange,
  onRemove
}) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={term.operator}
        onChange={(e) => onChange({ ...term, operator: e.target.value as 'AND' | 'OR' | 'NOT' })}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value="OR">OR</option>
        <option value="AND">AND</option>
        <option value="NOT">NOT</option>
      </select>
      
      <input
        type="text"
        value={term.value}
        onChange={(e) => onChange({ ...term, value: e.target.value })}
        placeholder="Enter search term..."
        className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};