import React from 'react';
import { Plus, X } from 'lucide-react';

interface Term {
  id: string;
  value: string;
}

interface QueryTermGroupProps {
  terms: Term[];
  showRemove: boolean;
  onTermsChange: (terms: Term[]) => void;
  onRemove: () => void;
}

export const QueryTermGroup: React.FC<QueryTermGroupProps> = ({
  terms,
  showRemove,
  onTermsChange,
  onRemove,
}) => {
  const addTerm = () => {
    onTermsChange([...terms, { id: crypto.randomUUID(), value: '' }]);
  };

  const updateTerm = (id: string, value: string) => {
    onTermsChange(terms.map(term => 
      term.id === id ? { ...term, value } : term
    ));
  };

  const removeTerm = (id: string) => {
    if (terms.length > 1) {
      onTermsChange(terms.filter(term => term.id !== id));
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          Terms in this group are combined with OR
        </span>
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {terms.map((term, index) => (
          <div key={term.id} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-sm text-gray-500">OR</span>
            )}
            <input
              type="text"
              value={term.value}
              onChange={(e) => updateTerm(term.id, e.target.value)}
              placeholder="Enter search term..."
              className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 focus:border-blue-500 focus:ring-blue-500"
            />
            {terms.length > 1 && (
              <button
                type="button"
                onClick={() => removeTerm(term.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addTerm}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-3 h-3" />
          Add Term
        </button>
      </div>
    </div>
  );
};