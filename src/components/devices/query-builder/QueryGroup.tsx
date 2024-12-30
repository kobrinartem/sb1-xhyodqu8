import React from 'react';
import { X } from 'lucide-react';

interface QueryGroupProps {
  term: string;
  operator: 'OR' | 'AND';
  showOperator: boolean;
  onTermChange: (value: string) => void;
  onOperatorChange: (value: 'OR' | 'AND') => void;
  onRemove: () => void;
}

export const QueryGroup: React.FC<QueryGroupProps> = ({
  term,
  operator,
  showOperator,
  onTermChange,
  onOperatorChange,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-2">
      {showOperator && (
        <select
          value={operator}
          onChange={(e) => onOperatorChange(e.target.value as 'OR' | 'AND')}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="OR">OR</option>
          <option value="AND">AND</option>
        </select>
      )}

      <input
        type="text"
        value={term}
        onChange={(e) => onTermChange(e.target.value)}
        placeholder="Enter search term..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 focus:border-blue-500 focus:ring-blue-500"
      />

      {showOperator && (
        <button
          onClick={onRemove}
          className="p-1.5 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};