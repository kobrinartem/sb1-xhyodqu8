import React from 'react';
import { Article } from '../../types/article';
import { AnalysisPartCell, RelevanceCell, DateCell, TextCell, StatusCell } from './cells';

interface TableCellProps {
  type: keyof Article;
  value: any;
}

export const TableCell: React.FC<TableCellProps> = ({ type, value }) => {
  switch (type) {
    case 'analysis_part':
      return <AnalysisPartCell value={value} />;
    case 'relevant_to':
      return <RelevanceCell value={value} />;
    case 'status':
      return <StatusCell value={value} />;
    case 'received_date':
      return <DateCell value={value} />;
    case 'findings':
      return <TextCell value={value} maxLength={150} />;
    default:
      return <TextCell value={value} />;
  }
};