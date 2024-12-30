import React from 'react';
import { GeneratedReportList } from '../generated/GeneratedReportList';
import { ReportFilterBar } from '../filters/ReportFilterBar';
import type { GeneratedReport, ReportFilters } from '../../../types/report';

interface TabContentProps {
  activeTab: 'generated';
  filteredReports: GeneratedReport[];
  filters: ReportFilters;
  onFiltersChange: (filters: Partial<ReportFilters>) => void;
  onViewReport: (report: GeneratedReport) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  filteredReports,
  filters,
  onFiltersChange,
  onViewReport,
}) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <ReportFilterBar
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
        <GeneratedReportList
          reports={filteredReports}
          onViewReport={onViewReport}
        />
      </div>
    </div>
  );
};