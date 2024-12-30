import type { CostSettings } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from '../../utils/cost/constants';

export function mapDatabaseToCostSettings(data: any): CostSettings {
  return {
    baselineDevicePrice: data.baseline_device_price,
    multipliers: {
      III: data.multiplier_iii,
      IIb: data.multiplier_iib,
      IIa: data.multiplier_iia,
      I: data.multiplier_i,
      NotBod: data.multiplier_notbod
    },
    articleCosts: {
      fullText: data.full_text_cost,
      abstract: data.abstract_cost
    },
    frequencyMultipliers: {
      yearly: data.yearly_frequency_multiplier ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.yearly,
      quarterly: data.quarterly_frequency_multiplier ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.quarterly,
      monthly: data.monthly_frequency_multiplier ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.monthly,
      weekly: data.weekly_frequency_multiplier ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.weekly,
      daily: data.daily_frequency_multiplier ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.daily
    }
  };
}

export function mapSettingsToDatabase(settings: CostSettings) {
  return {
    baseline_device_price: settings.baselineDevicePrice,
    multiplier_iii: settings.multipliers.III,
    multiplier_iib: settings.multipliers.IIb,
    multiplier_iia: settings.multipliers.IIa,
    multiplier_i: settings.multipliers.I,
    multiplier_notbod: settings.multipliers.NotBod,
    full_text_cost: settings.articleCosts.fullText,
    abstract_cost: settings.articleCosts.abstract,
    yearly_frequency_multiplier: settings.frequencyMultipliers?.yearly ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.yearly,
    quarterly_frequency_multiplier: settings.frequencyMultipliers?.quarterly ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.quarterly,
    monthly_frequency_multiplier: settings.frequencyMultipliers?.monthly ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.monthly,
    weekly_frequency_multiplier: settings.frequencyMultipliers?.weekly ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.weekly,
    daily_frequency_multiplier: settings.frequencyMultipliers?.daily ?? DEFAULT_COST_SETTINGS.frequencyMultipliers.daily
  };
}