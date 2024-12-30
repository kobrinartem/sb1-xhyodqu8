import React from 'react';
import { DeviceCategory } from '../../types/device';
import { DEVICE_CATEGORIES } from '../../utils/device';

interface DeviceCategorySelectProps {
  value?: DeviceCategory;
  onChange: (value: DeviceCategory) => void;
  required?: boolean;
}

export const DeviceCategorySelect: React.FC<DeviceCategorySelectProps> = ({
  value,
  onChange,
  required = false
}) => {
  return (
    <div>
      <label htmlFor="device_category" className="block text-sm font-medium text-gray-700">
        Device Category
      </label>
      <select
        id="device_category"
        name="device_category"
        value={value || ''}
        onChange={(e) => onChange(e.target.value as DeviceCategory)}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select category</option>
        {DEVICE_CATEGORIES.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};