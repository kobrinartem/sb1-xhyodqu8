import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Article } from '../../types/article';

interface ArticleIdentifiersProps {
  article: Article;
}

export const ArticleIdentifiers: React.FC<ArticleIdentifiersProps> = ({ article }) => {
  const getPubMedUrl = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
  const getPMCUrl = (pmcid: string) => `https://www.ncbi.nlm.nih.gov/pmc/articles/${pmcid}`;

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
      {article.issn && (
        <div>
          <span className="text-sm font-medium text-gray-500">ISSN:</span>
          <span className="ml-2 text-gray-900">{article.issn}</span>
        </div>
      )}
      {article.e_issn && (
        <div>
          <span className="text-sm font-medium text-gray-500">E-ISSN:</span>
          <span className="ml-2 text-gray-900">{article.e_issn}</span>
        </div>
      )}
      {article.pmid && (
        <div>
          <span className="text-sm font-medium text-gray-500">PMID:</span>
          <a 
            href={getPubMedUrl(article.pmid)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {article.pmid}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
      {article.pmcid && (
        <div>
          <span className="text-sm font-medium text-gray-500">PMCID:</span>
          <a 
            href={getPMCUrl(article.pmcid)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {article.pmcid}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
      {article.doi && (
        <div className="col-span-2">
          <span className="text-sm font-medium text-gray-500">DOI:</span>
          <a 
            href={`https://doi.org/${article.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {article.doi}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};
