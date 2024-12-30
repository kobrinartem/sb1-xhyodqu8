import React from 'react';
import { Clock } from 'lucide-react';
import { SCHEDULE_FREQUENCIES } from '../../../../utils/schedule';
import { DEFAULT_COST_SETTINGS } from '../../../../utils/cost/constants';

interface FrequencyMultipliers {
  yearly: number;
  quarterly: number;
  monthly: number;
  weekly: number;
  daily: number;
}

interface FrequencyMultipliersSectionProps {
  multipliers: FrequencyMultipliers;
  onChange: (multipliers: FrequencyMultipliers) => void;
  disabled?: boolean;
}

export const FrequencyMultipliersSection: React.FC<FrequencyMultipliersSectionProps> = ({
  multipliers = DEFAULT_COST_SETTINGS.frequencyMultipliers,
  onChange,
  disabled = false
}) => {
  // Ensure we have valid multipliers by merging with defaults
  const safeMultipliers = {
    ...DEFAULT_COST_SETTINGS.frequencyMultipliers,
    ...multipliers
  };

  const handleMultiplierChange = (frequency: keyof FrequencyMultipliers, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange({
        ...safeMultipliers,
        [frequency]: numValue
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-500" />
        <h4 className="text-lg font-semibold text-gray-900">Report Frequency Multipliers</h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SCHEDULE_FREQUENCIES.map(({ value, label }) => {
          const frequencyKey = value as keyof FrequencyMultipliers;
          return (
            <div key={value}>
              <label className="block text-sm font-medium text-gray-700">
                {label} Reports
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={safeMultipliers[frequencyKey].toString()}
                  onChange={(e) => handleMultiplierChange(frequencyKey, e.target.value)}
                  disabled={disabled}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">×</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {safeMultipliers[frequencyKey]}× base cost
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Multipliers are applied to the base device cost based on report generation frequency
      </p>
    </div>
  );
};