import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { MonthlyBill } from '../../../types/billing';

interface BillingHistoryProps {
  bills: MonthlyBill[];
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({ bills }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Device Fees</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Article Costs</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(bill.period.startDate).toLocaleDateString()} - {new Date(bill.period.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  €{bill.costs.totalDeviceFees.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  €{bill.costs.totalArticleCosts.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                  €{bill.costs.totalMonthlyCost.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {bill.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-green-700 bg-green-50 border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      Paid
                    </span>
                  ) : bill.status === 'overdue' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-red-700 bg-red-50 border border-red-200">
                      <AlertCircle className="w-4 h-4" />
                      Overdue
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-gray-700 bg-gray-50 border border-gray-200">
                      <Clock className="w-4 h-4" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(bill.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};