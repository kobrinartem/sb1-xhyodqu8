import React from 'react';
import type { Frequency } from '../../../types/report';

export const FrequencySelect: React.FC = () => {
  return (
    <div>
      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
        Report Frequency
      </label>
      <select
        id="frequency"
        name="frequency"
        required
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="daily">Daily (End of Day)</option>
        <option value="weekly">Weekly (Sunday)</option>
        <option value="monthly">Monthly (Last Day)</option>
      </select>
      <p className="mt-1 text-sm text-gray-500">
        Reports will be automatically generated at the specified interval
      </p>
    </div>
  );
};