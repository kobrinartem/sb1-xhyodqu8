import React from 'react';
import { Device } from '../../types/device';
import { Cpu, Calendar, Building2 } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
          <p className="text-sm text-gray-600">{device.model}</p>
        </div>
        <Cpu className="w-5 h-5 text-blue-500" />
      </div>

      {device.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {device.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{device.manufacturer}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(device.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};