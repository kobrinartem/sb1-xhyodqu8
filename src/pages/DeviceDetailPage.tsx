// src/pages/DeviceDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import { useCompany } from '../contexts/CompanyContext';
import { DeviceInfo } from '../components/devices/DeviceInfo';
import { QueryBuilder } from '../components/devices/query-builder/QueryBuilder';
import { ScheduleSection } from '../components/devices/schedule/ScheduleSection';

export const DeviceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedCompany } = useCompany();
  const { device, loading, error, refreshDevice } = useDevice(id!);

  // Add this effect to watch for company changes
  useEffect(() => {
    if (device && selectedCompany && device.company_id !== selectedCompany.id) {
      // If the device belongs to a different company, navigate to devices list
      navigate('/devices');
    }
  }, [selectedCompany, device, navigate]);

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

  if (!device) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Device not found</h3>
        <button
          onClick={() => navigate('/devices')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Devices
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DeviceInfo device={device} />
      <ScheduleSection 
        device={device} 
        onScheduleUpdated={refreshDevice} 
      />
      <QueryBuilder deviceId={device.id} />
    </div>
  );
};
