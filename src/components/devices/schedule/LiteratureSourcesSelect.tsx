import React from 'react';
import { CheckCircle } from 'lucide-react';

interface LiteratureSourcesSelectProps {
  selectedSources: string[];
  onChange: (sources: string[]) => void;
  disabled?: boolean;
}

const LITERATURE_SOURCES = [
  { value: 'pubmed', label: 'PubMed' },
  { value: 'google_scholar', label: 'Google Scholar' }
];

export const LiteratureSourcesSelect: React.FC<LiteratureSourcesSelectProps> = ({
  selectedSources,
  onChange,
  disabled = false
}) => {
  const handleToggle = (source: string) => {
    if (selectedSources.includes(source)) {
      onChange(selectedSources.filter(s => s !== source));
    } else {
      onChange([...selectedSources, source]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Literature Sources
      </label>
      <div className="space-y-2">
        {LITERATURE_SOURCES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => !disabled && handleToggle(value)}
            disabled={disabled}
            className={`w-full flex items-center justify-between p-3 rounded-lg border ${
              selectedSources.includes(value)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span>{label}</span>
            {selectedSources.includes(value) && <CheckCircle className="w-5 h-5" />}
          </button>
        ))}
      </div>
      {selectedSources.length === 0 && (
        <p className="mt-2 text-sm text-red-600">
          Please select at least one literature source
        </p>
      )}
    </div>
  );
}