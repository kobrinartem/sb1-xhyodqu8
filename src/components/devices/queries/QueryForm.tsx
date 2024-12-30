import React from 'react';
import { Plus } from 'lucide-react';

interface QueryFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const QueryForm: React.FC<QueryFormProps> = ({
  value,
  onChange,
  onSubmit,
  isSubmitting
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter search query..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !value.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Query
        </button>
      </div>
    </form>
  );
};