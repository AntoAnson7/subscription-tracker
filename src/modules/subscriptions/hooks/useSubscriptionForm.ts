import { useState } from 'react';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import { SubscriptionCategory } from '@/modules/subscriptions/types/subscription.types';

const BRAND_PRESETS: Record<
  string,
  {
    category: SubscriptionCategory;
    brandColor: string;
    iconSlug: string;
    cancellationUrl: string;
  }
> = {
  netflix: {
    category: 'Entertainment',
    brandColor: '#E50914',
    iconSlug: 'netflix',
    cancellationUrl: 'https://netflix.com/youraccount',
  },
  spotify: {
    category: 'Entertainment',
    brandColor: '#1DB954',
    iconSlug: 'spotify',
    cancellationUrl: 'https://spotify.com/account/subscription',
  },
  chatgpt: {
    category: 'Productivity & AI',
    brandColor: '#10A37F',
    iconSlug: 'openai',
    cancellationUrl: 'https://chatgpt.com/#settings/Account',
  },
  github: {
    category: 'Developer Tools',
    brandColor: '#24292E',
    iconSlug: 'github',
    cancellationUrl: 'https://github.com/settings/billing',
  },
  figma: {
    category: 'Design & Craft',
    brandColor: '#F24E1E',
    iconSlug: 'figma',
    cancellationUrl: 'https://figma.com/settings',
  },
  apple: {
    category: 'Bundled Services',
    brandColor: '#000000',
    iconSlug: 'apple',
    cancellationUrl: 'https://support.apple.com/billing',
  },
};

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

  const handleNameChange = (name: string) => {
    const key = name.toLowerCase().replace(/[^a-z]/g, '');
    const preset = Object.entries(BRAND_PRESETS).find(([brand]) => key.includes(brand))?.[1];

    if (preset) {
      setFormData((prev) => ({
        ...prev,
        name,
        category: preset.category,
        brandColor: preset.brandColor,
        iconSlug: preset.iconSlug,
        cancellationUrl: preset.cancellationUrl,
      }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  const updateField = <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setFormData(INITIAL_FORM);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
  };

  return {
    formData,
    isSubmitting,
    handleNameChange,
    updateField,
    handleSubmit,
    resetForm,
  };
}
