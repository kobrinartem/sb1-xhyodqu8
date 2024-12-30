import React from 'react';
import { DeviceSelect } from './DeviceSelect';
import { ReportTypeSelect } from './ReportTypeSelect';
import { ScheduleTypeSelect } from './ScheduleTypeSelect';
import { TimeFrameSelect } from './TimeFrameSelect';
import type { ReportFormData } from '../../../types/report';

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  onCancel: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  onSubmit,
  isSubmitting,
  error,
  onCancel
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await onSubmit({
      device_id: formData.get('device_id') as string,
      report_type: formData.get('report_type') as ReportType,
      schedule_type: formData.get('schedule_type') as ScheduleType,
      time_frame: formData.get('time_frame') as TimeFrame,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DeviceSelect />
      <ReportTypeSelect />
      <ScheduleTypeSelect />
      <TimeFrameSelect />

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
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
  );
};