import React, { useState } from 'react';
import { Clock, Edit2 } from 'lucide-react';
import { Device } from '../../../types/device';
import { ScheduleForm } from './ScheduleForm';
import { ScheduleStatus } from './ScheduleStatus';
import { updateDeviceSchedule } from '../../../services/deviceService';
import { getNextRunDate } from '../../../utils/schedule';

interface ScheduleSectionProps {
  device: Device;
  onScheduleUpdated: () => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ device, onScheduleUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState(() => ({
    time_frame: device.schedule?.time_frame || 'daily',
    report_types: device.schedule?.report_types || [],
    literature_sources: device.schedule?.literature_sources || [],
    is_active: device.schedule?.is_active || false,
    next_run: device.schedule?.next_run
  }));

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Calculate next run date if schedule is active
      const next_run = schedule.is_active ? getNextRunDate(schedule.time_frame) : undefined;

      await updateDeviceSchedule(device.id, {
        ...schedule,
        next_run: next_run?.toISOString()
      });

      onScheduleUpdated();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Report Schedule</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Schedule</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <ScheduleForm
            schedule={schedule}
            onScheduleChange={setSchedule}
            isSubmitting={isSubmitting}
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={schedule.is_active}
                onChange={(e) => setSchedule(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Schedule is active
              </span>
            </label>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setSchedule({
                  time_frame: device.schedule?.time_frame || 'daily',
                  report_types: device.schedule?.report_types || [],
                  literature_sources: device.schedule?.literature_sources || [],
                  is_active: device.schedule?.is_active || false,
                  next_run: device.schedule?.next_run
                });
                setIsEditing(false);
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting || schedule.report_types.length === 0 || schedule.literature_sources.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Schedule'}
            </button>
          </div>
        </div>
      ) : (
        <ScheduleStatus schedule={schedule} />
      )}
    </div>
  );
};