import React from 'react';
import type { ScheduleType } from '../../../types/device';

interface ScheduleTypeSelectProps {
  value: ScheduleType;
  onChange: (value: ScheduleType) => void;
}

export const ScheduleTypeSelect: React.FC<ScheduleTypeSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ScheduleType)}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="none">No Schedule</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
};