import { useMemo } from 'react';
import { Article } from '../types/article';
import { FilterOptions } from '../types/filters';
import { isWithinTimeFrame } from '../utils/dateUtils';

export function useFilters(articles: Article[], filters: FilterOptions) {
  return useMemo(() => {
    return articles.filter(article => {
      // Time frame filter
      if (filters.timeFrame !== 'all' && !isWithinTimeFrame(article.receivedDate, filters.timeFrame)) {
        return false;
      }

      // Report type filter
      if (filters.reportType !== 'all' && article.reportType !== filters.reportType) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          article.title.toLowerCase().includes(searchLower) ||
          article.findings.toLowerCase().includes(searchLower) ||
          article.publicationName.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [articles, filters]);
}