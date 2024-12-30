import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { TimeFrame, ReportType, FilterOptions } from '../../types/filters';

interface FilterBarProps {
  filters: FilterOptions;
  search: string;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  search,
  onSearchChange,
  onFiltersChange
}) => {
  return (
    <div className="bg-white shadow-sm mb-6 rounded-lg">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Time Frame */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={filters.timeFrame}
              onChange={(e) => onFiltersChange({ timeFrame: e.target.value as TimeFrame })}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="daily">Last 24 Hours</option>
              <option value="weekly">Last 7 Days</option>
              <option value="monthly">Last 30 Days</option>
            </select>
          </div>

          {/* Report Type */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filters.reportType}
              onChange={(e) => onFiltersChange({ reportType: e.target.value as ReportType })}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Reports</option>
              <option value="vigilance">Vigilance</option>
              <option value="pmcf">PMCF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};