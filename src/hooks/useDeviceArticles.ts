import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { getArticles } from '../services/articleService';

export function useDeviceArticles(deviceId: string) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles({ deviceId });
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch device articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [deviceId]);

  return { articles, loading, error };
}