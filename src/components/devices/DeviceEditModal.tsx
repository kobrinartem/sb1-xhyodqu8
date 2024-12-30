import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Device, DeviceCategory } from '../../types/device';
import { updateDevice } from '../../services/deviceService';
import { useClickOutside } from '../../hooks/useClickOutside';
import { DeviceCategorySelect } from './DeviceCategorySelect';

interface DeviceEditModalProps {
  device: Device;
  onClose: () => void;
  onDeviceUpdated: () => void;
}

export const DeviceEditModal: React.FC<DeviceEditModalProps> = ({ 
  device, 
  onClose, 
  onDeviceUpdated 
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<DeviceCategory>(device.device_category);

  useClickOutside(modalRef, onClose);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateDevice(device.id, {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        manufacturer: formData.get('manufacturer') as string,
        model: formData.get('model') as string,
        device_type: formData.get('device_type') as string,
        device_category: category
      });

      onDeviceUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update device');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Device</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Device Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={device.name}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              defaultValue={device.manufacturer}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              defaultValue={device.model}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="device_type" className="block text-sm font-medium text-gray-700">
              Device Type
            </label>
            <input
              type="text"
              id="device_type"
              name="device_type"
              defaultValue={device.device_type}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <DeviceCategorySelect
            value={category}
            onChange={setCategory}
            required
          />

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={device.description}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};