import React from 'react';
import { ArticleStatus } from '../../../types/article';
import { StatusBadge } from '../../shared/badges/StatusBadge';

interface StatusCellProps {
  value: ArticleStatus;
}

export const StatusCell: React.FC<StatusCellProps> = ({ value }) => {
  return <StatusBadge status={value} size="sm" />;
};