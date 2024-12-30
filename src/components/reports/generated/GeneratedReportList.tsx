import React from 'react';
import { Download, Clock, Zap } from 'lucide-react';
import type { GeneratedReport } from '../../../types/report';
import { generateExcelFile } from '../../../utils/excel';
import { getReportArticles } from '../../../services/reports/articleService';

interface GeneratedReportListProps {
  reports: GeneratedReport[];
  onViewReport: (report: GeneratedReport) => void;
}

export const GeneratedReportList: React.FC<GeneratedReportListProps> = ({
  reports,
  onViewReport
}) => {
  const handleExcelDownload = async (report: GeneratedReport, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const articles = await getReportArticles(report.id);
      const filename = `${report.report_category}-report-${new Date().toISOString().split('T')[0]}`;
      generateExcelFile(articles, filename);
    } catch (error) {
      console.error('Failed to download Excel:', error);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No generated reports</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Frame</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reports.map((report) => (
            <tr 
              key={report.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onViewReport(report)}
            >
              <td className="px-4 py-3 text-sm text-gray-900">{report.devices?.name}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.report_category === 'pmcf' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {report.report_category.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 capitalize">{report.time_frame}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {report.schedule_id ? (
                    <>
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-900">Scheduled</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-900">On Demand</span>
                    </>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Date(report.generated_at || report.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={(e) => handleExcelDownload(report, e)}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Excel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};