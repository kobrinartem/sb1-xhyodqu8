import React, { useState } from 'react';
import { FileBarChart, Plus } from 'lucide-react';
import { useCompany } from '../contexts/CompanyContext';
import { GenerateReportModal } from '../components/reports';
import { ReportDetail } from '../components/reports/detail/ReportDetail';
import { ReportTabs } from '../components/reports/tabs/ReportTabs';
import { TabContent } from '../components/reports/tabs/TabContent';
import { useGeneratedReports } from '../hooks/useGeneratedReports';
import { useReportFilters } from '../hooks/useReportFilters';
import type { GeneratedReport, ReportFilters } from '../types/report';

export const ReportsPage: React.FC = () => {
  const { selectedCompany } = useCompany();
  const [isGenerateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null);
  const [filters, setFilters] = useState<ReportFilters>({
    search: '',
    timeFrame: 'all'
  });
  
  const { 
    reports: generatedReports, 
    loading: reportsLoading,
    error: reportsError,
    refreshReports 
  } = useGeneratedReports();

  const filteredReports = useReportFilters(generatedReports, filters);

  if (!selectedCompany) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <FileBarChart className="w-12 h-12 text-gray-400 mb-4" />
        <div className="text-gray-500">
          Please select a company to view reports
        </div>
      </div>
    );
  }

  if (reportsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (reportsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {reportsError}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
          <p className="mt-1 text-sm text-gray-600">
            Generate and manage device literature reports
          </p>
        </div>
        <button
          onClick={() => setGenerateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <ReportTabs 
          activeTab="generated" 
          onTabChange={() => {}} 
        />

        <TabContent
          activeTab="generated"
          filteredReports={filteredReports}
          filters={filters}
          onFiltersChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
          onViewReport={setSelectedReport}
        />
      </div>

      {isGenerateModalOpen && (
        <GenerateReportModal
          companyId={selectedCompany.id}
          onClose={() => setGenerateModalOpen(false)}
          onReportGenerated={() => {
            setGenerateModalOpen(false);
            refreshReports();
          }}
        />
      )}

      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};