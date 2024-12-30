import { Article } from '../../types/article';
import { CostSettings, ArticleCosts } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from './constants';

export function calculateArticleCosts(
  articles: Article[],
  settings: CostSettings = DEFAULT_COST_SETTINGS
): ArticleCosts {
  const fullTextCount = articles.filter(a => a.analysis_part === 'FT').length;
  const abstractCount = articles.filter(a => a.analysis_part === 'A&I').length;
  
  const fullTextCost = fullTextCount * settings.articleCosts.fullText;
  const abstractCost = abstractCount * settings.articleCosts.abstract;
  
  return {
    fullTextCount,
    abstractCount,
    totalCost: fullTextCost + abstractCost
  };
}