import React from 'react';
import { CostSettings } from '../../../types/cost';

interface FrequencyMultipliersSectionProps {
  settings: CostSettings;
  onSettingsChange: (settings: CostSettings) => void;
}

export const FrequencyMultipliersSection: React.FC<FrequencyMultipliersSectionProps> = ({
  settings,
  onSettingsChange
}) => {
  const handleMultiplierChange = (frequency: string, value: number) => {
    onSettingsChange({
      ...settings,
      frequencyMultipliers: {
        ...settings.frequencyMultipliers,
        [frequency]: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Report Frequency Multipliers</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(settings.frequencyMultipliers).map(([frequency, value]) => (
          <div key={frequency}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {frequency} Reports
            </label>
            <div className="mt-1 relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={value}
                onChange={(e) => handleMultiplierChange(frequency, parseFloat(e.target.value))}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">×</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {value}× base price
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Multipliers are applied to the base price based on report generation frequency
      </p>
    </div>
  );
}