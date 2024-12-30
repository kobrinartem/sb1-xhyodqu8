import React from 'react';
import type { ScheduleType } from '../../../types/report';

interface ScheduleTypeSelectProps {
  value: ScheduleType;
  onChange: (value: ScheduleType) => void;
}

export const ScheduleTypeSelect: React.FC<ScheduleTypeSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="schedule_type" className="block text-sm font-medium text-gray-700">
        Schedule Type
      </label>
      <select
        id="schedule_type"
        name="schedule_type"
        value={value}
        onChange={(e) => onChange(e.target.value as ScheduleType)}
        required
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="on_demand">On Demand</option>
        <option value="scheduled">Scheduled</option>
      </select>
    </div>
  );
};