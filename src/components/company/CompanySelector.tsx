import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, RefreshCw, XCircle } from 'lucide-react';
import { useCompany } from '../../contexts/CompanyContext';
import { useCompanies } from '../../hooks/useCompanies';

export const CompanySelector: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companies, loading, refreshCompanies } = useCompanies();
  const { selectedCompany, setSelectedCompany, clearSelectedCompany } = useCompany();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshCompanies();
    setIsRefreshing(false);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value;
    if (!companyId) {
      clearSelectedCompany();
      return;
    }
    
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      
      // If we're on a company detail page, navigate to the new company's detail page
      if (location.pathname.match(/^\/companies\/[^/]+$/)) {
        navigate(`/companies/${company.id}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse h-10 w-48 bg-gray-100 rounded-lg"></div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Building2 className="w-5 h-5 text-gray-500" />
      <div className="relative">
        <select
          value={selectedCompany?.id || ''}
          onChange={handleCompanyChange}
          className="block w-48 rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-blue-500 appearance-none"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {selectedCompany && (
          <button
            onClick={clearSelectedCompany}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            title="Clear selection"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 rounded-lg hover:bg-gray-100"
        title="Refresh companies list"
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};