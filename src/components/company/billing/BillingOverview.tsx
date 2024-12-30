import React from 'react';
import { Euro, Clock } from 'lucide-react';
import { CompanyCosts } from '../../../types/cost';
import { formatCurrency } from '../../../utils/billing';

interface BillingOverviewProps {
  costs: CompanyCosts;
}

export const BillingOverview: React.FC<BillingOverviewProps> = ({ costs }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Euro className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Cost Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">Device Fees</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(costs.totalDeviceFees)}</p>
          <p className="text-sm text-gray-500 mt-1">Based on device categories</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-600">Article Processing</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(costs.totalArticleCosts)}</p>
          <p className="text-sm text-gray-500 mt-1">Based on processed articles</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-medium text-blue-600">Total Monthly Cost</p>
          </div>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(costs.totalMonthlyCost)}</p>
        </div>
      </div>
    </div>
  );
};