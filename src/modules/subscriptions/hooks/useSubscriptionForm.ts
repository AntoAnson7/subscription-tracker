import { useState } from 'react';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { BrandPreset, findMatchingBrands } from '@/modules/subscriptions/utils/brandPresets.utils';

const INITIAL_FORM: SubscriptionFormData = {
  name: '',
  category: 'Entertainment',
  cost: 9.99,
  currency: 'USD',
  cycle: 'monthly',
  startDate: new Date().toISOString().split('T')[0],
  renewalDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  status: 'active',
  brandColor: '#1D1D1F',
  iconSlug: null,
  cancellationUrl: null,
  websiteUrl: null,
  notes: null,
};

export function useSubscriptionForm(
  onSubmit: (data: SubscriptionFormData) => Promise<void> | void
) {
  const [formData, setFormData] = useState<SubscriptionFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<BrandPreset[]>([]);

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    const matches = findMatchingBrands(name);
    setSuggestions(matches);
  };

  const applyPreset = (preset: BrandPreset) => {
    setFormData((prev) => ({
      ...prev,
      name: preset.name,
      category: preset.category,
      cost: preset.defaultCost ?? prev.cost,
      brandColor: preset.brandColor,
      iconSlug: preset.iconSlug,
      websiteUrl: preset.websiteUrl,
      cancellationUrl: preset.cancellationUrl,
    }));
    setSuggestions([]);
  };

  const updateField = <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData(INITIAL_FORM);
    setSuggestions([]);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setSuggestions([]);
  };

  return {
    formData,
    isSubmitting,
    suggestions,
    handleNameChange,
    applyPreset,
    clearSuggestions: () => setSuggestions([]),
    updateField,
    handleSubmit,
    resetForm,
  };
}
