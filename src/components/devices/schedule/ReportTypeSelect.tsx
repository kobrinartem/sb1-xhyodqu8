import React from 'react';
import { ReportType } from '../../../types/report';
import { CheckCircle } from 'lucide-react';

interface ReportTypeSelectProps {
  selectedTypes: ReportType[];
  onChange: (types: ReportType[]) => void;
  disabled?: boolean;
}

export const ReportTypeSelect: React.FC<ReportTypeSelectProps> = ({
  selectedTypes,
  onChange,
  disabled = false
}) => {
  const handleToggle = (type: ReportType) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  const isSelected = (type: ReportType) => selectedTypes.includes(type);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Report Types
      </label>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => !disabled && handleToggle('vigilance')}
          disabled={disabled}
          className={`w-full flex items-center justify-between p-3 rounded-lg border ${
            isSelected('vigilance')
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span>Vigilance Reports</span>
          {isSelected('vigilance') && <CheckCircle className="w-5 h-5" />}
        </button>

        <button
          type="button"
          onClick={() => !disabled && handleToggle('pmcf')}
          disabled={disabled}
          className={`w-full flex items-center justify-between p-3 rounded-lg border ${
            isSelected('pmcf')
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:bg-gray-50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span>PMCF Reports</span>
          {isSelected('pmcf') && <CheckCircle className="w-5 h-5" />}
        </button>
      </div>
      {selectedTypes.length === 0 && (
        <p className="mt-2 text-sm text-red-600">
          Please select at least one report type
        </p>
      )}
    </div>
  );
};