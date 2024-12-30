import { useMemo } from 'react';
import { Article, TimeFrame, ReportType, EquipmentType } from '../types';
import { getDateRange } from '../utils/dateUtils';

interface FilterOptions {
  search: string;
  timeFrame: TimeFrame;
  reportType: ReportType;
  equipmentType: EquipmentType | 'all';
}

export const useArticleFilters = (articles: Article[], options: FilterOptions) => {
  return useMemo(() => {
    const { start, end } = getDateRange(options.timeFrame);
    const searchLower = options.search.toLowerCase();

    return articles.filter((article) => {
      // Date filter
      const articleDate = new Date(article.receivedDate);
      if (articleDate < start || articleDate > end) return false;

      // Report type filter
      if (options.reportType !== 'all' && article.reportType !== options.reportType) return false;

      // Equipment type filter
      if (options.equipmentType !== 'all' && article.equipmentType !== options.equipmentType) return false;

      // Search filter
      if (searchLower) {
        return (
          article.title.toLowerCase().includes(searchLower) ||
          article.findings.toLowerCase().includes(searchLower) ||
          article.abstract.toLowerCase().includes(searchLower) ||
          article.authors.some(author => author.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [articles, options]);
};