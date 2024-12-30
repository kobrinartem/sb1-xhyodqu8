import React, { useState } from 'react';
import { Article } from '../types/article';
import { FilterOptions } from '../types/filters';
import { ArticlesTable } from '../components/table';
import { FilterBar } from '../components/filters/FilterBar';
import { useSort } from '../hooks';
import { useArticles } from '../hooks/useArticles';
import { useSearch } from '../hooks/useSearch';
import { useCompany } from '../contexts/CompanyContext';

export const ArticlesPage: React.FC = () => {
  const { selectedCompany } = useCompany();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { search, debouncedSearch, handleSearch } = useSearch();
  const [filters, setFilters] = useState<FilterOptions>({
    timeFrame: 'all',
    reportType: 'all',
    search: ''
  });

  // Update filters when debounced search changes
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: debouncedSearch
    }));
  }, [debouncedSearch]);

  const { articles, loading, error } = useArticles({
    ...filters,
    companyId: selectedCompany?.id
  });
  const { items: sortedArticles, sortConfig, requestSort } = useSort(articles);

  const handleFiltersChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  if (!selectedCompany) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-gray-500 mb-4">
          Please select a company to view articles
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
    <div className="space-y-6">
      <FilterBar 
        filters={filters}
        search={search}
        onSearchChange={handleSearch}
        onFiltersChange={handleFiltersChange}
      />
      
      <ArticlesTable
        articles={sortedArticles}
        onArticleClick={setSelectedArticle}
        sortConfig={sortConfig}
        onSort={requestSort}
        selectedArticle={selectedArticle}
        onCloseDetail={() => setSelectedArticle(null)}
      />
    </div>
  );
};