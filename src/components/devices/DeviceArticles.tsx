import React from 'react';
import { Article } from '../../types/article';
import { useDeviceArticles } from '../../hooks/useDeviceArticles';
import { ArticlesTable } from '../table/ArticlesTable';
import { useSort } from '../../hooks/useSort';

interface DeviceArticlesProps {
  deviceId: string;
}

export const DeviceArticles: React.FC<DeviceArticlesProps> = ({ deviceId }) => {
  const { articles, loading, error } = useDeviceArticles(deviceId);
  const { items: sortedArticles, sortConfig, requestSort } = useSort(articles);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
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
        <h3 className="text-lg font-semibold text-gray-900">Related Articles</h3>
        <p className="mt-1 text-sm text-gray-600">
          Articles found based on the device's search queries
        </p>
      </div>

      <div className="p-4">
        <ArticlesTable
          articles={sortedArticles}
          onArticleClick={setSelectedArticle}
          sortConfig={sortConfig}
          onSort={requestSort}
          selectedArticle={selectedArticle}
          onCloseDetail={() => setSelectedArticle(null)}
        />
      </div>
    </div>
  );
};