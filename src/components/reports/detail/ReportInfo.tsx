import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { GeneratedReport } from '../../../types/report';

interface ReportInfoProps {
  report: GeneratedReport;
}

export const ReportInfo: React.FC<ReportInfoProps> = ({ report }) => {
  const getTimeFrameLabel = () => {
    switch (report.time_frame) {
      case 'daily': return 'Last 24 Hours';
      case 'weekly': return 'Last 7 Days';
      case 'monthly': return 'Last 30 Days';
      case 'yearly': return 'Last Year';
      default: return report.time_frame;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Time Frame</span>
        </div>
        <p className="text-gray-900">{getTimeFrameLabel()}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Tag className="w-5 h-5" />
          <span className="font-medium">Report Type</span>
        </div>
        <p className="text-gray-900">
          {report.report_type === 'pmcf' ? 'PMCF Report' : 'Vigilance Report'}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Generation Source</span>
        </div>
        <p className="text-gray-900">
          {report.schedule_id ? 'Scheduled Report' : 'Generated On Demand'}
        </p>
      </div>
    </div>
  );
};