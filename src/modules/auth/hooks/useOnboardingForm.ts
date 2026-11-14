import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { CreateProfileData } from '@/modules/auth/types/auth.types';

export function useOnboardingForm(
  user: User | null,
  onSubmit: (data: CreateProfileData) => Promise<boolean> | boolean
) {
  const initialName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    '';

  const [formData, setFormData] = useState<CreateProfileData>({
    fullName: initialName,
    preferredCurrency: 'USD',
    trackingFocus: 'Personal',
  });
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof CreateProfileData>(
    field: K,
    value: CreateProfileData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;
    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  return {
    formData,
    submitting,
    updateField,
    handleSubmit,
  };
}
