import React from 'react';

interface TableLayoutProps {
  children: React.ReactNode;
}

export const TableLayout: React.FC<TableLayoutProps> = ({ children }) => {
  return (
    <div className="shadow border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    </div>
  );
};