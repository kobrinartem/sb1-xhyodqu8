import { useState, useEffect, useCallback } from 'react';
import { Device } from '../types/device';
import { getDevices } from '../services/deviceService';
import { useCompany } from '../contexts/CompanyContext';

export function useDevices() {
  const { selectedCompany } = useCompany();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = useCallback(async () => {
    if (!selectedCompany) {
      setDevices([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getDevices(selectedCompany.id);
      setDevices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }, [selectedCompany]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices,
    loading,
    error,
    refreshDevices: fetchDevices
  };
}