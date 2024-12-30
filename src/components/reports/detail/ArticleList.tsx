import React from 'react';
import { FileText, FileSearch, Calendar, ExternalLink } from 'lucide-react';
import type { Article } from '../../../types/article';
import { RelevanceBadge } from '../../shared/badges/RelevanceBadge';
import { StatusBadge } from '../../shared/badges/StatusBadge';

interface ArticleListProps {
  articles: Article[];
  reportCategory: 'pmcf' | 'vigilance';
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles, reportCategory }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No articles found for this report.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                {article.analysis_part === 'FT' ? (
                  <FileText className="w-5 h-5 text-blue-500" />
                ) : (
                  <FileSearch className="w-5 h-5 text-purple-500" />
                )}
                <span className="text-sm font-medium text-gray-500">
                  {article.analysis_part === 'FT' ? 'Full Text' : 'Abstract'}
                </span>
                <RelevanceBadge relevantTo={article.relevant_to} size="sm" />
                <StatusBadge status={article.status} size="sm" />
                {reportCategory === 'pmcf' && article.relevant_to === 'vigilance' && (
                  <span className="text-xs text-gray-500">
                    (Included for comprehensive PMCF analysis)
                  </span>
                )}
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Source:</span>
                  <span className="ml-2 text-gray-900">{article.source}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Publication:</span>
                  <span className="ml-2 text-gray-900">{article.publication_name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Authors:</span>
                  <span className="ml-2 text-gray-900">{article.authors.join(', ')}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {new Date(article.received_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Findings</h5>
                <p className="text-gray-600">{article.findings}</p>
              </div>
            </div>

            {article.doi && (
              <a
                href={`https://doi.org/${article.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">DOI</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};