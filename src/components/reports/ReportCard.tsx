import React from 'react';
import { FileText, Calendar, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Report } from '../../types/report';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  const getStatusIcon = () => {
    switch (report.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {report.report_type} Report
            </h3>
            <p className="text-sm text-gray-500">
              {report.devices.name}
            </p>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Time Frame: {report.time_frame}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Schedule: {report.schedule_type}</span>
        </div>
      </div>

      {report.generated_at && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Generated: {new Date(report.generated_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};