import React from 'react';
import { Euro } from 'lucide-react';

interface BasePriceSectionProps {
  basePrice: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const BasePriceSection: React.FC<BasePriceSectionProps> = ({
  basePrice,
  onChange,
  disabled = false
}) => {
  const handlePriceChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange(numValue);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Euro className="w-5 h-5 text-blue-500" />
        <h4 className="text-lg font-semibold text-gray-900">Base Pricing</h4>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Monthly Base Price per Device (€)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={basePrice.toString()}
          onChange={(e) => handlePriceChange(e.target.value)}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          This is the base price before applying any multipliers
        </p>
      </div>
    </div>
  );
};