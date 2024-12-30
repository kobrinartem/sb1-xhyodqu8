import React from 'react';
import { FileText, FileSearch } from 'lucide-react';
import { AnalysisPart } from '../../../types/article';

interface AnalysisPartCellProps {
  value: AnalysisPart;
}

export const AnalysisPartCell: React.FC<AnalysisPartCellProps> = ({ value }) => {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
      value === 'FT' 
        ? 'text-blue-600 bg-blue-50 border border-blue-200' 
        : 'text-purple-600 bg-purple-50 border border-purple-200'
    }`}>
      {value === 'FT' ? (
        <>
          <FileText className="w-4 h-4" />
          <span>Full Text</span>
        </>
      ) : (
        <>
          <FileSearch className="w-4 h-4" />
          <span>Abstract</span>
        </>
      )}
    </div>
  );
};