import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';
import { createReport } from '../../services/reportService';
import { useClickOutside } from '../../hooks/useClickOutside';
import type { ReportType, TimeFrame, ScheduleType, ScheduleFrequency } from '../../types/report';

interface ReportCreateModalProps {
  companyId: string;
  onClose: () => void;
  onReportCreated: () => void;
}

export const ReportCreateModal: React.FC<ReportCreateModalProps> = ({
  companyId,
  onClose,
  onReportCreated
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { devices } = useDevices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduleType, setScheduleType] = useState<ScheduleType>('on_demand');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');

  useClickOutside(modalRef, onClose);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const reportData = {
        company_id: companyId,
        device_id: formData.get('device_id') as string,
        report_type: formData.get('report_type') as ReportType,
        time_frame: timeFrame,
        schedule_type: scheduleType,
        schedule_frequency: scheduleType === 'scheduled' ? timeFrame as ScheduleFrequency : undefined
      };

      await createReport(reportData);
      onReportCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="device_id" className="block text-sm font-medium text-gray-700">
              Device
            </label>
            <select
              id="device_id"
              name="device_id"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a device</option>
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="report_type" className="block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select
              id="report_type"
              name="report_type"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="vigilance">Vigilance</option>
              <option value="pmcf">PMCF</option>
            </select>
          </div>

          <div>
            <label htmlFor="schedule_type" className="block text-sm font-medium text-gray-700">
              Schedule Type
            </label>
            <select
              id="schedule_type"
              name="schedule_type"
              value={scheduleType}
              onChange={(e) => setScheduleType(e.target.value as ScheduleType)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="on_demand">On Demand</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div>
            <label htmlFor="time_frame" className="block text-sm font-medium text-gray-700">
              {scheduleType === 'scheduled' ? 'Schedule Frequency' : 'Time Frame'}
            </label>
            <select
              id="time_frame"
              name="time_frame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value as TimeFrame)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              {scheduleType === 'on_demand' && (
                <option value="yearly">Yearly</option>
              )}
            </select>
            {scheduleType === 'scheduled' && (
              <p className="mt-1 text-sm text-gray-500">
                Report will be generated {timeFrame}
              </p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};