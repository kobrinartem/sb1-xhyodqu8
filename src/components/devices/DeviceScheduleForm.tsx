import React, { useState } from 'react';
import type { DeviceSchedule, ScheduleType, ReportType } from '../../types/device';
import { getNextRunDate } from '../../utils/schedule';

interface DeviceScheduleFormProps {
  schedule?: DeviceSchedule;
  onSubmit: (schedule: DeviceSchedule) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export const DeviceScheduleForm: React.FC<DeviceScheduleFormProps> = ({
  schedule,
  onSubmit,
  onCancel,
  isSubmitting,
  error
}) => {
  const [formData, setFormData] = useState<DeviceSchedule>(() => ({
    type: schedule?.type || 'none',
    reportType: schedule?.reportType || 'vigilance',
    nextRun: schedule?.nextRun,
    isActive: schedule?.isActive || false
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleTypeChange = (type: ScheduleType) => {
    setFormData(prev => ({
      ...prev,
      type,
      isActive: type !== 'none',
      nextRun: type !== 'none' ? getNextRunDate(type) : undefined
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
        <select
          value={formData.type}
          onChange={(e) => handleTypeChange(e.target.value as ScheduleType)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="none">No Schedule</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {formData.type !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Report Type</label>
          <select
            value={formData.reportType}
            onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value as ReportType }))}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="vigilance">Vigilance</option>
            <option value="pmcf">PMCF</option>
          </select>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Schedule'}
        </button>
      </div>
    </form>
  );
};