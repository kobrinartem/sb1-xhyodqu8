import React, { useState } from 'react';
import { Clock, Calendar, FileText, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReportSchedule } from '../../../types/report';
import { ScheduleStatusToggle } from './ScheduleStatusToggle';
import { formatNextRunDate, getScheduleDescription } from '../../../utils/dateUtils';
import { deleteDeviceSchedule, toggleScheduleStatus } from '../../../services/database/schedule';

interface ScheduleListProps {
  schedules: ReportSchedule[];
  onScheduleUpdated: () => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ 
  schedules,
  onScheduleUpdated
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(schedules.length / itemsPerPage);
  
  const paginatedSchedules = schedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggleStatus = async (deviceId: string, isActive: boolean) => {
    try {
      setError(null);
      await toggleScheduleStatus(deviceId, isActive);
      onScheduleUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle schedule status');
    }
  };

  const handleDelete = async (deviceId: string) => {
    try {
      setError(null);
      await deleteDeviceSchedule(deviceId);
      onScheduleUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete schedule');
    }
  };

  if (schedules.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500">No scheduled reports</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Run</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedSchedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{schedule.devices?.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900 capitalize">{schedule.report_category}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 capitalize">{schedule.frequency}</span>
                    <span className="text-xs text-gray-500">
                      {getScheduleDescription(schedule.frequency)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {formatNextRunDate(schedule.next_run)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <ScheduleStatusToggle
                    isActive={schedule.is_active}
                    onChange={(isActive) => handleToggleStatus(schedule.device_id, isActive)}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(schedule.device_id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};