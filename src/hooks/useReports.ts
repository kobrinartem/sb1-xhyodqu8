import { useState, useEffect, useCallback } from 'react';
import { Report } from '../types/report';
import { getReports } from '../services/reportService';
import { useCompany } from '../contexts/CompanyContext';

export function useReports() {
  const { selectedCompany } = useCompany();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    if (!selectedCompany) {
      setReports([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getReports(selectedCompany.id);
      setReports(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, [selectedCompany]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    loading,
    error,
    refreshReports: fetchReports
  };
}