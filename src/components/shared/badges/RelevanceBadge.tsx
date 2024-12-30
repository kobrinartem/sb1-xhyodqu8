import React from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import type { RelevantTo } from '../../../types/article';

interface RelevanceBadgeProps {
  relevantTo: RelevantTo;
  size?: 'sm' | 'md';
}

const BADGE_CONFIG = {
  vigilance: {
    icon: CheckCircle,
    label: 'Vigilance',
    className: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  pmcf: {
    icon: CheckCircle,
    label: 'PMCF',
    className: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  not_relevant: {
    icon: XCircle,
    label: 'Not Relevant',
    className: 'text-gray-600 bg-gray-50 border-gray-200'
  }
} as const;

export const RelevanceBadge: React.FC<RelevanceBadgeProps> = ({ relevantTo, size = 'md' }) => {
  const config = BADGE_CONFIG[relevantTo] || {
    icon: HelpCircle,
    label: 'Not Specified',
    className: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm';

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border ${config.className} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span>{config.label}</span>
    </div>
  );
};