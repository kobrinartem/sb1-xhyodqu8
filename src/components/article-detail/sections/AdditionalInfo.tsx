import React from 'react';
import { AlertCircle, DollarSign, FileWarning } from 'lucide-react';
import { Article } from '../../../types/article';

interface AdditionalInfoProps {
  article: Article;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ article }) => {
  const hasAdditionalInfo = article.funding_info?.length || 
    article.conflict_of_interest || 
    article.retracted || 
    article.correction_notice;

  if (!hasAdditionalInfo) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Additional Information</h4>
      <div className="space-y-4 bg-gray-50 rounded-lg p-4">
        {article.funding_info?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Funding Information</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {article.funding_info.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}

        {article.conflict_of_interest && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Conflict of Interest</span>
            </div>
            <p className="text-gray-700">{article.conflict_of_interest}</p>
          </div>
        )}

        {(article.retracted || article.correction_notice) && (
          <div className={`rounded-lg p-3 ${article.retracted ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <FileWarning className={`w-4 h-4 ${article.retracted ? 'text-red-500' : 'text-yellow-500'}`} />
              <span className={`text-sm font-medium ${article.retracted ? 'text-red-700' : 'text-yellow-700'}`}>
                {article.retracted ? 'Retraction Notice' : 'Correction Notice'}
              </span>
            </div>
            <p className={article.retracted ? 'text-red-700' : 'text-yellow-700'}>
              {article.retracted ? article.retraction_notice : article.correction_notice}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};