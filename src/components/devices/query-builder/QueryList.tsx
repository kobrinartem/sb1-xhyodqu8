import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import type { DeviceQuery } from '../../../types/device';

interface QueryListProps {
  queries: DeviceQuery[];
  onEdit: (query: DeviceQuery) => void;
  onDelete: (queryId: string) => void;
}

export const QueryList: React.FC<QueryListProps> = ({ queries, onEdit, onDelete }) => {
  if (queries.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No queries added yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {queries.map((query) => (
        <div 
          key={query.id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="font-mono text-sm text-gray-800">
                {query.query_text}
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  Added {new Date(query.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(query)}
                className="p-1 text-gray-400 hover:text-blue-600"
                title="Edit query"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(query.id)}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Delete query"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};