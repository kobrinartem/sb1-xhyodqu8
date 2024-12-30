import { useState, useMemo } from 'react';
import { Article } from '../types/article';

export type SortConfig = {
  key: keyof Article;
  direction: 'asc' | 'desc';
};

export function useSort(items: Article[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedItems = useMemo(() => {
    if (!sortConfig) return items;

    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      if (sortConfig.direction === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [items, sortConfig]);

  const requestSort = (key: keyof Article) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  return { items: sortedItems, sortConfig, requestSort };
}