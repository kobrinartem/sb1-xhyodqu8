import React from 'react';
import { X } from 'lucide-react';
import { GeneratedReport } from '../../../types/report';

interface ReportHeaderProps {
  report: GeneratedReport;
  onClose: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({ report, onClose }) => {
  const reportType = report.report_category === 'pmcf' ? 'PMCF' : 'Vigilance';
  
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-lg p-6 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {reportType} Report - {report.devices?.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Generated on {new Date(report.generated_at || report.created_at).toLocaleString()}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};