import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Article } from '../../types/article';
import { TABLE_COLUMNS } from './TableColumns';

interface TableHeaderProps {
  onSort: (key: keyof Article) => void;
  sortConfig: { key: keyof Article; direction: 'asc' | 'desc' } | null;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ onSort, sortConfig }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {TABLE_COLUMNS.map(({ key, label, width }) => (
          <th
            key={key}
            onClick={() => onSort(key)}
            className={`${width} px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100`}
          >
            <div className="flex items-center gap-1">
              {label}
              <ArrowUpDown className={`w-3 h-3 ${
                sortConfig?.key === key ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};