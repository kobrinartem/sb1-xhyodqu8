import { useState, useEffect } from 'react';
import { CostSettings } from '../types/cost';
import { getCostSettings } from '../services/billingService';
import { DEFAULT_COST_SETTINGS } from '../utils/cost/constants';

export function useCostSettings(companyId: string) {
  const [settings, setSettings] = useState<CostSettings>(DEFAULT_COST_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    if (!companyId) {
      setSettings(DEFAULT_COST_SETTINGS);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCostSettings(companyId);
      setSettings(data);
    } catch (err) {
      console.error('Failed to fetch cost settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cost settings');
      // Keep using current settings on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [companyId]);

  return { 
    settings, 
    loading, 
    error,
    refreshSettings: fetchSettings
  };
}