import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Effect } from '../../../types/article';
import { getEffectConfig } from '../../../utils/effectUtils';

interface EffectBadgeProps {
  effect: Effect;
  size?: 'sm' | 'md';
}

export const EffectBadge: React.FC<EffectBadgeProps> = ({ effect, size = 'md' }) => {
  const config = getEffectConfig(effect);
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm';

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border ${config.className} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{config.label}</span>
    </div>
  );
};