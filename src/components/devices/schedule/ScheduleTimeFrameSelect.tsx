import React from 'react';
import { ScheduleTimeFrame } from '../../../types/device';
import { SCHEDULE_FREQUENCIES, SCHEDULE_DESCRIPTIONS } from '../../../utils/schedule';

interface ScheduleTimeFrameSelectProps {
  value: ScheduleTimeFrame;
  onChange: (value: ScheduleTimeFrame) => void;
  disabled?: boolean;
}

export const ScheduleTimeFrameSelect: React.FC<ScheduleTimeFrameSelectProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div>
      <label htmlFor="time_frame" className="block text-sm font-medium text-gray-700">
        Schedule Time Frame
      </label>
      <select
        id="time_frame"
        value={value}
        onChange={(e) => onChange(e.target.value as ScheduleTimeFrame)}
        disabled={disabled}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {SCHEDULE_FREQUENCIES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <p className="mt-1 text-sm text-gray-500">
        {SCHEDULE_DESCRIPTIONS[value]}
      </p>
    </div>
  );
};