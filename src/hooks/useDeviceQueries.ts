import { useState, useEffect, useCallback } from 'react';
import { DeviceQuery } from '../types/device';
import { getDeviceQueries } from '../services/device/queryService';

export function useDeviceQueries(deviceId: string) {
  const [queries, setQueries] = useState<DeviceQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDeviceQueries(deviceId);
      setQueries(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch device queries');
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return {
    queries,
    loading,
    error,
    refreshQueries: fetchQueries
  };
}