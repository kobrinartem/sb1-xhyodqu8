import { useState, useEffect } from 'react';
import { MonthlyBill } from '../types/billing';
import { getMonthlyBills } from '../services/billingService';

export function useBillingHistory(companyId: string) {
  const [bills, setBills] = useState<MonthlyBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await getMonthlyBills(companyId);
        setBills(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch billing history');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [companyId]);

  return { bills, loading, error };
}