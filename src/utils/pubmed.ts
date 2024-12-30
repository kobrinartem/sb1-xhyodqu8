// src/utils/pubmed.ts
export function getPubMedAuthorUrl(author: string): string {
  // Replace spaces with + and add [Author] suffix
  const formattedAuthor = author.trim().replace(/\s+/g, '+');
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${formattedAuthor}[Author]`;
}

export function getPubMedArticleUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
}
