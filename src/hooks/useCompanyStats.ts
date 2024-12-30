import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface CompanyStats {
  fullTextCount: number;
  abstractCount: number;
}

export function useCompanyStats(companyId: string) {
  const [stats, setStats] = useState<CompanyStats>({ fullTextCount: 0, abstractCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const { data: fullTextData, error: fullTextError } = await supabase
          .from('articles')
          .select('id', { count: 'exact' })
          .eq('company_id', companyId)
          .eq('analysis_part', 'FT');

        const { data: abstractData, error: abstractError } = await supabase
          .from('articles')
          .select('id', { count: 'exact' })
          .eq('company_id', companyId)
          .eq('analysis_part', 'A&I');

        if (fullTextError) throw fullTextError;
        if (abstractError) throw abstractError;

        setStats({
          fullTextCount: fullTextData?.length || 0,
          abstractCount: abstractData?.length || 0
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [companyId]);

  return { stats, loading, error };
}