import React from 'react';
import { Search, Calendar } from 'lucide-react';
import type { ReportFilters } from '../../../types/report';

interface ReportFilterBarProps {
  filters: ReportFilters;
  onFiltersChange: (filters: Partial<ReportFilters>) => void;
}

export const ReportFilterBar: React.FC<ReportFilterBarProps> = ({
  filters,
  onFiltersChange,
}) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search reports..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Time Frame Filter */}
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-500" />
        <select
          value={filters.timeFrame}
          onChange={(e) => onFiltersChange({ timeFrame: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>
  );
};