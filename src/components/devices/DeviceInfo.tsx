import React, { useState } from 'react';
import { Device } from '../../types/device';
import { Cpu, Building2, Calendar, Edit2, Tag, Bookmark } from 'lucide-react';
import { DeviceEditModal } from './DeviceEditModal';

interface DeviceInfoProps {
  device: Device;
}

export const DeviceInfo: React.FC<DeviceInfoProps> = ({ device }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{device.name}</h2>
            <p className="text-gray-600">{device.model}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Edit2 className="w-5 h-5" />
              <span>Edit</span>
            </button>
            <Cpu className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {device.description && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">{device.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <span>Manufacturer</span>
            </div>
            <p className="mt-1 text-gray-900">{device.manufacturer}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Added on</span>
            </div>
            <p className="mt-1 text-gray-900">
              {new Date(device.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <Tag className="w-5 h-5" />
              <span>Device Type</span>
            </div>
            <p className="mt-1 text-gray-900">{device.device_type || 'Not specified'}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600">
              <Bookmark className="w-5 h-5" />
              <span>Category</span>
            </div>
            <p className="mt-1 text-gray-900">{device.device_category.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <DeviceEditModal
          device={device}
          onClose={() => setEditModalOpen(false)}
          onDeviceUpdated={() => {
            setEditModalOpen(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
};