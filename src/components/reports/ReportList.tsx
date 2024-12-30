import React, { useState } from 'react';
import { Report } from '../../types/report';
import { FileText, Download } from 'lucide-react';
import { ReportDetail } from './ReportDetail';
import { useReportArticles } from '../../hooks/useReportArticles';

interface ReportListProps {
  reports: Report[];
}

export const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { articles, loading } = useReportArticles(selectedReport?.id);

  if (reports.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No reports generated yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Frame</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr 
                  key={report.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{report.devices.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{report.report_type}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{report.time_frame}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {new Date(report.generated_at || report.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle Excel download
                      }}
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
      </div>

      {selectedReport && !loading && (
        <ReportDetail
          report={selectedReport}
          articles={articles}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};