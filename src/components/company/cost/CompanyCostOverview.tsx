import React from 'react';
import { Euro } from 'lucide-react';
import { CompanyCosts } from '../../../types/cost';

interface CompanyCostOverviewProps {
  costs: CompanyCosts;
}

export const CompanyCostOverview: React.FC<CompanyCostOverviewProps> = ({ costs }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Euro className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Monthly Cost Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600">Device Fees</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            €{costs.totalDeviceFees.toFixed(2)}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600">Article Processing</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            €{costs.totalArticleCosts.toFixed(2)}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-600">Total Monthly Cost</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            €{costs.totalMonthlyCost.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};