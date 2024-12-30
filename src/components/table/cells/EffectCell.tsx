import React from 'react';
import { Effect } from '../../../types/article';
import { EffectBadge } from '../../shared/badges/EffectBadge';

interface EffectCellProps {
  value: Effect;
}

export const EffectCell: React.FC<EffectCellProps> = ({ value }) => {
  return <EffectBadge effect={value} size="sm" />;
};