import React from 'react';
import { FileBarChart, AlertTriangle } from 'lucide-react';
import type { QueryType } from '../../../types/device';

interface QueryTabsProps {
  activeTab: QueryType;
  onTabChange: (tab: QueryType) => void;
}

export const QueryTabs: React.FC<QueryTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4" aria-label="Query Types">
        <button
          onClick={() => onTabChange('vigilance')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'vigilance'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Vigilance Query
          </div>
        </button>
        <button
          onClick={() => onTabChange('pmcf')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'pmcf'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileBarChart className="w-4 h-4" />
            PMCF Query
          </div>
        </button>
      </nav>
    </div>
  );
};