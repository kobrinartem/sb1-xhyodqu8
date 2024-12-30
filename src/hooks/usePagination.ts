import { useMemo } from 'react';

interface PaginationResult<T> {
  paginatedItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function usePagination<T>(
  items: T[],
  page: number,
  itemsPerPage: number,
  setPage: (page: number) => void
): PaginationResult<T> {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, page, itemsPerPage]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    paginatedItems,
    currentPage: page,
    totalPages,
    goToPage,
  };
}