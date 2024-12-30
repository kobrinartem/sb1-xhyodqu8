import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { getReportArticles } from '../services/reports';

export function useReportArticles(reportId: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getReportArticles(reportId);
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch report articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [reportId]);

  return { articles, loading, error };
}