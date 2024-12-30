import React from 'react';
import { Save } from 'lucide-react';
import { QueryConfig } from '../../types/query';

interface QueryFormProps {
  isSaving: boolean;
  onSave: () => void;
}

export const QueryForm: React.FC<QueryFormProps> = ({ isSaving, onSave }) => {
  return (
    <button
      onClick={onSave}
      disabled={isSaving}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      <Save className="w-4 h-4" />
      {isSaving ? 'Saving...' : 'Save Query'}
    </button>
  );
};