import React from 'react';
import { Article } from '../../types/article';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableLayout } from './TableLayout';
import { ArticleDetail } from '../ArticleDetail';
import { Pagination } from '../pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';

interface ArticlesTableProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  sortConfig: { key: keyof Article; direction: 'asc' | 'desc' } | null;
  onSort: (key: keyof Article) => void;
  selectedArticle: Article | null;
  onCloseDetail: () => void;
}

export const ArticlesTable: React.FC<ArticlesTableProps> = ({
  articles,
  onArticleClick,
  sortConfig,
  onSort,
  selectedArticle,
  onCloseDetail,
}) => {
  const [page, setPage] = React.useState(1);
  const { paginatedItems, currentPage, totalPages, goToPage } = usePagination(
    articles,
    page,
    10,
    setPage
  );

  return (
    <div className="space-y-4">
      <TableLayout>
        <TableHeader onSort={onSort} sortConfig={sortConfig} />
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedItems.map((article) => (
            <TableRow
              key={article.id}
              article={article}
              onClick={onArticleClick}
            />
          ))}
        </tbody>
      </TableLayout>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={onCloseDetail}
        />
      )}
    </div>
  );
};