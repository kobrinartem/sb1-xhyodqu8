import React, { useEffect, useState } from 'react';
import { History, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getQueryHistory } from '../../services/queryService';
import { formatDate } from '../../utils/dateUtils';

interface QueryHistoryItem {
  id: string;
  query_text: string;
  created_at: string;
  last_run: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result_count: number;
}

export const QueryHistory: React.FC = () => {
  const [queries, setQueries] = useState<QueryHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const data = await getQueryHistory();
        setQueries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load query history');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  const getStatusIcon = (status: QueryHistoryItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <History className="w-5 h-5" />
          Query History
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {queries.map((query) => (
          <div key={query.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="font-mono text-sm text-gray-600">
                  {query.query_text}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Created: {formatDate(query.created_at)}</span>
                  <span>Last Run: {formatDate(query.last_run)}</span>
                  <span>Results: {query.result_count}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(query.status)}
                <span className="text-sm capitalize">{query.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};