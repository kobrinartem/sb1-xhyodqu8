import React from 'react';
import type { TimeFrame } from '../../../types/report';

export const TimeFrameSelect: React.FC = () => {
  return (
    <div>
      <label htmlFor="time_frame" className="block text-sm font-medium text-gray-700">
        Time Frame
      </label>
      <select
        id="time_frame"
        name="time_frame"
        required
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="daily">Last 24 Hours</option>
        <option value="weekly">Last 7 Days</option>
        <option value="monthly">Last 30 Days</option>
        <option value="yearly">Last Year</option>
      </select>
    </div>
  );
};