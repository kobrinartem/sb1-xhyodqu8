import React from 'react';
import { EquipmentType } from '../types';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  search: string;
  setSearch: (search: string) => void;
  selectedType: EquipmentType | 'All';
  setSelectedType: (type: EquipmentType | 'All') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}) => {
  const types: (EquipmentType | 'All')[] = ['All', 'Diagnostic', 'Therapeutic', 'Monitoring', 'Laboratory', 'Other'];

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as EquipmentType | 'All')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};