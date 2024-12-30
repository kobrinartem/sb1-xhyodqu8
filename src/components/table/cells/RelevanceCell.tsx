import React from 'react';
import type { RelevantTo } from '../../../types/article';
import { RelevanceBadge } from '../../shared/badges/RelevanceBadge';

interface RelevanceCellProps {
  value: RelevantTo | null | undefined;
}

export const RelevanceCell: React.FC<RelevanceCellProps> = ({ value }) => {
  // Default to not_relevant if value is null/undefined
  return <RelevanceBadge relevantTo={value || 'not_relevant'} size="sm" />;
};