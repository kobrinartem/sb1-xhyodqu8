import React from 'react';
import { Article } from '../../types/article';
import { TableCell } from './TableCell';
import { TABLE_COLUMNS } from './TableColumns';

interface TableRowProps {
  article: Article;
  onClick: (article: Article) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ article, onClick }) => {
  return (
    <tr
      onClick={() => onClick(article)}
      className="hover:bg-gray-50 cursor-pointer"
    >
      {TABLE_COLUMNS.map(({ key, width }) => (
        <td 
          key={key} 
          className={`${width} px-3 py-2 text-sm text-gray-900 whitespace-normal`}
        >
          <TableCell type={key} value={article[key]} />
        </td>
      ))}
    </tr>
  );
};