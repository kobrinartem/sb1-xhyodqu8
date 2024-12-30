import { useMemo } from 'react';
import type { GeneratedReport, ReportFilters } from '../types/report';

export function useReportFilters(reports: GeneratedReport[], filters: ReportFilters) {
  return useMemo(() => {
    return reports.filter(report => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const deviceName = report.devices?.name.toLowerCase() || '';
        const reportType = report.report_type.toLowerCase();
        
        if (!deviceName.includes(searchLower) && !reportType.includes(searchLower)) {
          return false;
        }
      }

      // Time frame filter
      if (filters.timeFrame !== 'all') {
        const date = new Date(report.generated_at || report.created_at);
        const now = new Date();

        switch (filters.timeFrame) {
          case 'today':
            return date.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return date >= weekAgo;
          case 'month':
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return date >= monthAgo;
          case 'year':
            const yearAgo = new Date();
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            return date >= yearAgo;
        }
      }

      return true;
    });
  }, [reports, filters]);
}