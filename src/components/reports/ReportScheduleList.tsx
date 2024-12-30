import React from 'react';
import { Report } from '../../types/report';
import { Clock, Calendar, FileText } from 'lucide-react';

interface ReportScheduleListProps {
  reports: Report[];
  onRefresh: () => void;
}

export const ReportScheduleList: React.FC<ReportScheduleListProps> = ({ reports, onRefresh }) => {
  if (reports.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No scheduled reports</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <div
          key={report.id}
          className="bg-white rounded-lg border border-gray-200 p-4 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-gray-900">{report.devices.name}</h4>
                <p className="text-sm text-gray-500 capitalize">{report.report_type} Report</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Time Frame: {report.time_frame}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Frequency: {report.schedule_frequency}</span>
            </div>
          </div>

          {report.next_run && (
            <div className="text-sm text-gray-500">
              Next Run: {new Date(report.next_run).toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};