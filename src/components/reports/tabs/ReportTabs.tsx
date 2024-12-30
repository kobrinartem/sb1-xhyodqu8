import React from 'react';

interface ReportTabsProps {
  activeTab: 'generated';
  onTabChange: (tab: 'generated') => void;
}

export const ReportTabs: React.FC<ReportTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange('generated')}
        className={`px-6 py-3 text-sm font-medium border-b-2 ${
          activeTab === 'generated'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Generated Reports
      </button>
    </nav>
  );
};