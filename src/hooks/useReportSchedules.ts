import { useState, useEffect } from 'react';
import { Device } from '../types/device';
import { getScheduledDevices } from '../services/database/reports';
import { useCompany } from '../contexts/CompanyContext';

export function useReportSchedules() {
  const { selectedCompany } = useCompany();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    if (!selectedCompany) {
      setDevices([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getScheduledDevices(selectedCompany.id);
      setDevices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch scheduled devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedCompany]);

  return {
    schedules: devices.map(device => ({
      id: device.id,
      device_id: device.id,
      company_id: device.company_id,
      report_category: device.schedule!.reportType,
      frequency: device.schedule!.type,
      next_run: device.schedule!.nextRun!,
      is_active: device.schedule!.isActive,
      created_at: device.created_at,
      updated_at: device.updated_at,
      devices: {
        name: device.name
      }
    })),
    loading,
    error,
    refreshSchedules: fetchSchedules
  };
}