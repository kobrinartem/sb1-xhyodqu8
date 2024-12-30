import { useState, useEffect, useCallback } from 'react';
import { Device } from '../types/device';
import { getDevice } from '../services/deviceService';

export function useDevice(id: string) {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevice = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDevice(id);
      setDevice(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch device');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDevice();
  }, [fetchDevice]);

  return {
    device,
    loading,
    error,
    refreshDevice: fetchDevice
  };
}