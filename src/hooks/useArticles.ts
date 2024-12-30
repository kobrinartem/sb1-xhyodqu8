import { useState, useEffect } from 'react';
import { Article } from '../types/article';
import { FilterOptions } from '../types/filters';
import { getArticles } from '../services/articleService';

export function useArticles(filters: FilterOptions) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchArticles = async () => {
      if (!filters.companyId) {
        setArticles([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getArticles(filters);
        
        if (mounted) {
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch articles');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    return () => {
      mounted = false;
    };
  }, [filters.companyId, filters.timeFrame, filters.reportType, filters.search]);

  return { articles, loading, error };
}