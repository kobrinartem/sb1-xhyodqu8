import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { CostSettings } from '../../../types/cost';
import { updateCostSettings } from '../../../services/billingService';
import { DEFAULT_COST_SETTINGS } from '../../../utils/cost/constants';
import {
  BasePriceSection,
  DeviceCategorySection,
  ArticleCostsSection,
  FrequencyMultipliersSection
} from './sections';

interface CostSettingsFormProps {
  companyId: string;
  initialSettings: CostSettings;
  onSettingsUpdated: () => void;
}

export const CostSettingsForm: React.FC<CostSettingsFormProps> = ({
  companyId,
  initialSettings,
  onSettingsUpdated
}) => {
  const [settings, setSettings] = useState<CostSettings>(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      await updateCostSettings(companyId, settings);
      onSettingsUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAll = () => {
    setSettings(DEFAULT_COST_SETTINGS);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Cost Settings</h3>
        <button
          type="button"
          onClick={handleResetAll}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Reset All to Defaults
        </button>
      </div>

      <BasePriceSection
        basePrice={settings.baselineDevicePrice}
        onChange={(baselineDevicePrice) => setSettings(prev => ({ ...prev, baselineDevicePrice }))}
        disabled={isSubmitting}
      />

      <DeviceCategorySection 
        multipliers={settings.multipliers}
        onChange={(multipliers) => setSettings(prev => ({ ...prev, multipliers }))}
        disabled={isSubmitting}
      />

      <FrequencyMultipliersSection
        multipliers={settings.frequencyMultipliers}
        onChange={(frequencyMultipliers) => {
          console.log('Updating frequency multipliers:', frequencyMultipliers);
          setSettings(prev => ({ ...prev, frequencyMultipliers }));
        }}
        disabled={isSubmitting}
      />

      <ArticleCostsSection 
        costs={settings.articleCosts}
        onChange={(articleCosts) => setSettings(prev => ({ ...prev, articleCosts }))}
        disabled={isSubmitting}
      />

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </form>
  );
};