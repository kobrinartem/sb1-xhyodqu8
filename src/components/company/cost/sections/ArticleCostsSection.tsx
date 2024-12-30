import React from 'react';
import { FileText } from 'lucide-react';

interface ArticleCosts {
  fullText: number;
  abstract: number;
}

interface ArticleCostsSectionProps {
  costs: ArticleCosts;
  onChange: (costs: ArticleCosts) => void;
  disabled?: boolean;
}

export const ArticleCostsSection: React.FC<ArticleCostsSectionProps> = ({
  costs,
  onChange,
  disabled = false
}) => {
  const handleCostChange = (type: keyof ArticleCosts, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onChange({
        ...costs,
        [type]: numValue
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-500" />
        <h4 className="text-lg font-semibold text-gray-900">Article Processing Costs</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Text Article Cost (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={costs.fullText.toString()}
            onChange={(e) => handleCostChange('fullText', e.target.value)}
            disabled={disabled}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Cost per full text article analysis
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Abstract Article Cost (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={costs.abstract.toString()}
            onChange={(e) => handleCostChange('abstract', e.target.value)}
            disabled={disabled}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Cost per abstract-only article analysis
          </p>
        </div>
      </div>
    </div>
  );
};