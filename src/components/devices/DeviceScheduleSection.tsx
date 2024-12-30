import React, { useState } from 'react';
import { Clock, Edit2 } from 'lucide-react';
import type { Device } from '../../types/device';
import { updateDeviceSchedule } from '../../services/database/schedule';
import { DeviceScheduleForm } from './DeviceScheduleForm';

interface DeviceScheduleSectionProps {
  device: Device;
  onScheduleUpdated: () => void;
}

export const DeviceScheduleSection: React.FC<DeviceScheduleSectionProps> = ({ 
  device,
  onScheduleUpdated
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (schedule: DeviceSchedule) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateDeviceSchedule(device.id, schedule);
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
        <DeviceScheduleForm
          schedule={device.schedule}
          onSubmit={handleSave}
          onCancel={() => setIsEditing(false)}
          isSubmitting={isSubmitting}
          error={error}
        />
      ) : (
        <div className="space-y-4">
          {device.schedule ? (
            <>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${device.schedule.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm text-gray-600">
                  {device.schedule.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                Type: {device.schedule.type === 'daily' ? 'Daily' :
                      device.schedule.type === 'weekly' ? 'Weekly' :
                      device.schedule.type === 'monthly' ? 'Monthly' : 'None'}
              </div>

              <div className="text-sm text-gray-600">
                Report Type: {device.schedule.reportType === 'pmcf' ? 'PMCF' : 'Vigilance'}
              </div>

              {device.schedule.nextRun && (
                <div className="text-sm text-gray-600">
                  Next Run: {new Date(device.schedule.nextRun).toLocaleString()}
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-500">
              No schedule configured
            </div>
          )}
        </div>
      )}
    </div>
  );
};