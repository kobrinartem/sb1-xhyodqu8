import { Effect } from '../types/article';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface EffectConfig {
  icon: LucideIcon;
  label: string;
  className: string;
}

export function getEffectConfig(effect: Effect): EffectConfig {
  switch (effect) {
    case 'positive':
      return {
        icon: TrendingUp,
        label: 'Positive',
        className: 'text-green-600 bg-green-50 border-green-200'
      };
    case 'negative':
      return {
        icon: TrendingDown,
        label: 'Negative',
        className: 'text-red-600 bg-red-50 border-red-200'
      };
    case 'neutral':
      return {
        icon: Minus,
        label: 'Neutral',
        className: 'text-gray-600 bg-gray-50 border-gray-200'
      };
    default:
      return {
        icon: Minus,
        label: 'Not Specified',
        className: 'text-gray-600 bg-gray-50 border-gray-200'
      };
  }
}