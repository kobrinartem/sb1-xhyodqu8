import { useState, useEffect } from 'react';
import { GeneratedReport } from '../types/report';
import { getGeneratedReports } from '../services/reportService';
import { useCompany } from '../contexts/CompanyContext';

export function useGeneratedReports() {
  const { selectedCompany } = useCompany();
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    if (!selectedCompany) {
      setReports([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getGeneratedReports(selectedCompany.id);
      setReports(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch generated reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedCompany]);

  return {
    reports,
    loading,
    error,
    refreshReports: fetchReports
  };
}