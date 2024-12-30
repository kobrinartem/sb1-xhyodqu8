import React from 'react';
import { Tag } from 'lucide-react';
import { DEVICE_CATEGORIES } from '../../../../utils/device';

interface CategoryMultipliers {
  III: number;
  IIb: number;
  IIa: number;
  I: number;
  NotBod: number;
}

interface DeviceCategorySectionProps {
  multipliers: CategoryMultipliers;
  onChange: (multipliers: CategoryMultipliers) => void;
  disabled?: boolean;
}

export const DeviceCategorySection: React.FC<DeviceCategorySectionProps> = ({
  multipliers,
  onChange,
  disabled = false
}) => {
  const handleMultiplierChange = (category: keyof CategoryMultipliers, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange({
        ...multipliers,
        [category]: numValue
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-blue-500" />
        <h4 className="text-lg font-semibold text-gray-900">Device Category Multipliers</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEVICE_CATEGORIES.map(({ value, label }) => (
          <div key={value}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="mt-1 relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={multipliers[value].toString()}
                onChange={(e) => handleMultiplierChange(value, e.target.value)}
                disabled={disabled}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">×</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {multipliers[value]}× base price
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};