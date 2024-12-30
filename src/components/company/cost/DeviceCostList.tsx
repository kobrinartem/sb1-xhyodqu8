import React from 'react';
import { DeviceCost } from '../../../types/cost';
import { formatDeviceCategory } from '../../../utils/device';
import { getScheduleDescription } from '../../../utils/schedule';

interface DeviceCostListProps {
  devices: DeviceCost[];
}

export const DeviceCostList: React.FC<DeviceCostListProps> = ({ devices }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monthly Fee</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Report Frequency</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Full Text Articles</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Abstract Articles</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Article Costs</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devices.map((device) => (
              <tr key={device.deviceId} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{device.deviceName}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatDeviceCategory(device.category)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">€{device.monthlyFee.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center">
                  {device.schedule?.is_active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {getScheduleDescription(device.schedule.time_frame)}
                    </span>
                  ) : (
                    <span className="text-gray-400">No schedule</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">{device.articleCosts.fullTextCount}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">{device.articleCosts.abstractCount}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  €{device.articleCosts.multipliedTotalCost.toFixed(2)}
                  {device.schedule?.is_active && device.articleCosts.totalCost !== device.articleCosts.multipliedTotalCost && (
                    <span className="text-xs text-gray-500 ml-1">
                      (Base: €{device.articleCosts.totalCost.toFixed(2)})
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">€{device.totalCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};