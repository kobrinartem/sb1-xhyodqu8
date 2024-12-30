import React, { useState } from 'react';
import { useDevices } from '../hooks/useDevices';
import { DeviceList } from '../components/devices/DeviceList';
import { DeviceCreateButton } from '../components/devices/DeviceCreateButton';
import { DeviceCreateModal } from '../components/devices/DeviceCreateModal';
import { useCompany } from '../contexts/CompanyContext';

export const DevicesPage: React.FC = () => {
  const { selectedCompany } = useCompany();
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);
  const { devices, loading, error, refreshDevices } = useDevices();

  const handleDeviceCreated = () => {
    setCreateModalOpen(false);
    refreshDevices();
  };

  if (!selectedCompany) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-gray-500 mb-4">
          Please select a company to view devices
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Medical Devices</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage medical devices and their literature search queries
          </p>
        </div>
        <DeviceCreateButton onClick={() => setCreateModalOpen(true)} />
      </div>

      <DeviceList devices={devices} />
      
      {isCreateModalOpen && (
        <DeviceCreateModal
          companyId={selectedCompany.id}
          onClose={() => setCreateModalOpen(false)}
          onDeviceCreated={handleDeviceCreated}
        />
      )}
    </div>
  );
};