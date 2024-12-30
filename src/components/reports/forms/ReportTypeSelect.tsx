import React from 'react';

export const ReportTypeSelect: React.FC = () => {
  return (
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
  );
};