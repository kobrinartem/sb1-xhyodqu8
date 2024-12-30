import React from 'react';
import { useDevices } from '../../../hooks/useDevices';

export const DeviceSelect: React.FC = () => {
  const { devices } = useDevices();

  return (
    <div>
      <label htmlFor="device_id" className="block text-sm font-medium text-gray-700">
        Device
      </label>
      <select
        id="device_id"
        name="device_id"
        required
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select a device</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
    </div>
  );
};