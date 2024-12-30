import React from 'react';
import { CompanyCostOverview } from './CompanyCostOverview';
import { DeviceCostList } from './DeviceCostList';
import { useDevices } from '../../../hooks/useDevices';
import { useArticles } from '../../../hooks/useArticles';
import { calculateCompanyCosts } from '../../../utils/cost/calculator';
import { useCostSettings } from '../../../hooks/useCostSettings';

interface CompanyCostSectionProps {
  companyId: string;
}

export const CompanyCostSection: React.FC<CompanyCostSectionProps> = ({ companyId }) => {
  const { devices, loading: devicesLoading } = useDevices();
  const { articles, loading: articlesLoading } = useArticles({ companyId });
  const { settings, loading: settingsLoading } = useCostSettings(companyId);

  if (devicesLoading || articlesLoading || settingsLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-60 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  // Filter devices to only include those belonging to this company
  const companyDevices = devices.filter(device => device.company_id === companyId);

  // Group articles by device
  const articlesByDevice = articles.reduce((acc, article) => {
    if (article.device_id) {
      acc[article.device_id] = acc[article.device_id] || [];
      acc[article.device_id].push(article);
    }
    return acc;
  }, {} as Record<string, typeof articles>);

  const costs = calculateCompanyCosts(companyDevices, articlesByDevice, settings);

  return (
    <div className="space-y-6">
      <CompanyCostOverview costs={costs} />
      <DeviceCostList devices={costs.devices} />
    </div>
  );
};