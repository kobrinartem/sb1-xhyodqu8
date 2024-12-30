import React from 'react';
import { Clock, Loader2, CheckCircle, XCircle } from 'lucide-react';
import type { ArticleStatus } from '../../../types/article';

interface StatusBadgeProps {
  status: ArticleStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    pending: {
      icon: Clock,
      label: 'Pending',
      className: 'text-gray-600 bg-gray-50 border-gray-200'
    },
    processing: {
      icon: Loader2,
      label: 'Processing',
      className: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    processed: {
      icon: CheckCircle,
      label: 'Processed',
      className: 'text-green-600 bg-green-50 border-green-200'
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      className: 'text-red-600 bg-red-50 border-red-200'
    },
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      className: 'text-green-600 bg-green-50 border-green-200'
    }
  };

  // Default config for unknown status
  const statusConfig = config[status as keyof typeof config] || {
    icon: Clock,
    label: status,
    className: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const { icon: Icon, label, className } = statusConfig;
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm';

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border ${className} ${sizeClasses}`}>
      <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} ${status === 'processing' ? 'animate-spin' : ''}`} />
      <span>{label}</span>
    </div>
  );
};