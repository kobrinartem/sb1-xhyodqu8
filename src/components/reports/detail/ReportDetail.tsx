import React, { useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useReportArticles } from '../../../hooks/useReportArticles';
import { useDeviceQueries } from '../../../hooks/useDeviceQueries';
import { generateExcelFile } from '../../../utils/excel';
import type { GeneratedReport } from '../../../types/report';
import { ArticleList } from './ArticleList';
import { ReportHeader } from './ReportHeader';
import { ReportInfo } from './ReportInfo';
import { ReportQueries } from './ReportQueries';

interface ReportDetailProps {
  report: GeneratedReport;
  onClose: () => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { articles, loading: articlesLoading, error: articlesError } = useReportArticles(report.id);
  const { queries, loading: queriesLoading, error: queriesError } = useDeviceQueries(report.device_id);
  
  useClickOutside(modalRef, onClose);

  const handleExcelDownload = () => {
    if (!articles) return;
    const filename = `${report.report_category}-report-${new Date().toISOString().split('T')[0]}`;
    generateExcelFile(articles, filename);
  };

  // Show loading state
  if (articlesLoading || queriesLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-6xl p-6">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (articlesError || queriesError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-6xl p-6">
          <div className="text-red-600 text-center py-8">
            {articlesError || queriesError}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
      <div ref={modalRef} className="relative bg-white rounded-lg w-full max-w-6xl mx-4 my-4 max-h-[calc(100vh-2rem)] flex flex-col">
        <ReportHeader report={report} onClose={onClose} />

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <ReportInfo report={report} />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Search Queries
            </h3>
            <ReportQueries queries={queries || []} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Articles
              </h3>
              <button
                onClick={handleExcelDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Download Excel
              </button>
            </div>
            
            <ArticleList 
              articles={articles || []}
              reportCategory={report.report_category}
            />
          </div>
        </div>
      </div>
    </div>
  );
};