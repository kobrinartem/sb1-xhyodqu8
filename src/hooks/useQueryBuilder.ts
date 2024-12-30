import { useState } from 'react';
import { QueryConfig, QueryGroup } from '../types/query';
import { saveQuery } from '../services/queryService';

export function useQueryBuilder(initialConfig: QueryConfig) {
  const [config, setConfig] = useState(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addGroup = () => {
    setConfig({
      ...config,
      groups: [
        ...config.groups,
        {
          id: crypto.randomUUID(),
          terms: [{ id: crypto.randomUUID(), value: '', operator: 'OR' }],
          operator: 'OR'
        }
      ]
    });
  };

  const updateGroup = (groupId: string, group: QueryGroup) => {
    setConfig({
      ...config,
      groups: config.groups.map(g => g.id === groupId ? group : g)
    });
  };

  const removeGroup = (groupId: string) => {
    setConfig({
      ...config,
      groups: config.groups.filter(g => g.id !== groupId)
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await saveQuery(config);
      setConfig({
        query_text: '',
        groups: [{
          id: crypto.randomUUID(),
          terms: [{ id: crypto.randomUUID(), value: '', operator: 'OR' }],
          operator: 'OR'
        }]
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save query');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    config,
    isSaving,
    error,
    addGroup,
    updateGroup,
    removeGroup,
    handleSave
  };
}