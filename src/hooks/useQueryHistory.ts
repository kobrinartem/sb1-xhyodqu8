import { useState, useEffect } from 'react';
import { getQueryHistory } from '../services/queryService';

interface QueryHistoryItem {
  id: string;
  query_text: string;
  created_at: string;
  last_run: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result_count: number;
}

export function useQueryHistory() {
  const [queries, setQueries] = useState<QueryHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchQueries = async () => {
      try {
        setLoading(true);
        const data = await getQueryHistory();
        
        if (mounted) {
          setQueries(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch query history');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchQueries();

    return () => {
      mounted = false;
    };
  }, []);

  return { queries, loading, error };
}