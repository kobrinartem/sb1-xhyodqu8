import React from 'react';
import { FileText, FileSearch } from 'lucide-react';
import { useCompanyStats } from '../../hooks/useCompanyStats';

interface CompanyStatsProps {
  companyId: string;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({ companyId }) => {
  const { stats, loading, error } = useCompanyStats(companyId);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Full Text Articles</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.fullTextCount}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileSearch className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Abstract Articles</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900">{stats.abstractCount}</p>
      </div>
    </div>
  );
};