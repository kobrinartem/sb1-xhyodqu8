import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { QueryTermGroup } from './QueryTermGroup';

interface QueryFormProps {
  onSave: (query: string) => Promise<void>;
}

interface Term {
  id: string;
  value: string;
}

interface TermGroup {
  id: string;
  terms: Term[];
}

export const QueryForm: React.FC<QueryFormProps> = ({ onSave }) => {
  const [termGroups, setTermGroups] = useState<TermGroup[]>([{
    id: crypto.randomUUID(),
    terms: [{ id: crypto.randomUUID(), value: '' }]
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTermGroup = () => {
    setTermGroups([...termGroups, {
      id: crypto.randomUUID(),
      terms: [{ id: crypto.randomUUID(), value: '' }]
    }]);
  };

  const updateTermGroup = (groupId: string, terms: Term[]) => {
    setTermGroups(termGroups.map(group => 
      group.id === groupId ? { ...group, terms } : group
    ));
  };

  const removeTermGroup = (groupId: string) => {
    if (termGroups.length > 1) {
      setTermGroups(termGroups.filter(group => group.id !== groupId));
    }
  };

  const generateQuery = (): string => {
    return termGroups
      .map(group => {
        const terms = group.terms
          .filter(term => term.value.trim())
          .map(term => term.value.trim());
        
        if (terms.length === 0) return '';
        if (terms.length === 1) return terms[0];
        return `(${terms.join(' OR ')})`;
      })
      .filter(Boolean)
      .join(' OR ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = generateQuery();
    if (!query) return;

    try {
      setIsSubmitting(true);
      await onSave(query);
      setTermGroups([{
        id: crypto.randomUUID(),
        terms: [{ id: crypto.randomUUID(), value: '' }]
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {termGroups.map((group, index) => (
          <QueryTermGroup
            key={group.id}
            terms={group.terms}
            showRemove={termGroups.length > 1}
            onTermsChange={(terms) => updateTermGroup(group.id, terms)}
            onRemove={() => removeTermGroup(group.id)}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={addTermGroup}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add OR Group
        </button>

        <button
          type="submit"
          disabled={isSubmitting || !generateQuery()}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Query'}
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
        <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-700">
          {generateQuery() || 'No query generated yet'}
        </div>
      </div>
    </form>
  );
};