import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../types/device';
import { DeviceCard } from './DeviceCard';

interface DeviceListProps {
  devices: Device[];
}

export const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onClick={() => navigate(`/devices/${device.id}`)}
        />
      ))}
    </div>
  );
};