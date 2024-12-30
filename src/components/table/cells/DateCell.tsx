import React from 'react';

interface DateCellProps {
  value: string;
}

export const DateCell: React.FC<DateCellProps> = ({ value }) => {
  const date = new Date(value);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  return <span className="text-gray-700">{formattedDate}</span>;
};