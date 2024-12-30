import React from 'react';

interface TextCellProps {
  value: string | undefined | null;
  maxLength?: number;
}

export const TextCell: React.FC<TextCellProps> = ({ value = '', maxLength = 100 }) => {
  if (!value) return <span className="text-gray-400">-</span>;

  const displayText = maxLength && value.length > maxLength
    ? `${value.substring(0, maxLength)}...`
    : value;

  return (
    <div className="overflow-hidden">
      <div className="line-clamp-2" title={value}>
        {displayText}
      </div>
    </div>
  );
};