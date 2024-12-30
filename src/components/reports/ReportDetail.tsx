import React, { useRef } from 'react';
import { Report } from '../../types/report';
import { Article } from '../../types/article';
import { ArticlesTable } from '../table/ArticlesTable';
import { useSort } from '../../hooks/useSort';
import { useClickOutside } from '../../hooks/useClickOutside';

interface ReportDetailProps {
  report: Report;
  articles: Article[];
  onClose: () => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, articles, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const { items: sortedArticles, sortConfig, requestSort } = useSort(articles);

  useClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {report.report_type.toUpperCase()} Report - {report.devices.name}
            </h2>
            <p className="text-sm text-gray-600">
              Time Frame: {report.time_frame} | Generated: {new Date(report.generated_at || '').toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
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
    </div>
  );
};