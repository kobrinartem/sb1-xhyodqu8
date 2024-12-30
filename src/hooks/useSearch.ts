import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch(initialValue: string = '') {
  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return {
    search,
    debouncedSearch,
    handleSearch
  };
}