import { CustomInput } from '@/modules/common/components/CustomInput';
import { CustomSelect } from '@/modules/common/components/CustomSelect';
import { DatePicker } from '@/modules/common/components/DatePicker';
import { BrandAutocomplete } from '@/modules/subscriptions/components/BrandAutocomplete';
import { subscriptionModalStyles } from '@/modules/subscriptions/recipes/subscriptionModal.recipe';
import { SubscriptionFormData } from '@/modules/subscriptions/types/form.types';
import {
  BillingCycle,
  SubscriptionCategory,
} from '@/modules/subscriptions/types/subscription.types';
import { BrandPreset } from '@/modules/subscriptions/utils/brandPresets.utils';
import { CATEGORY_OPTIONS, CYCLE_OPTIONS } from '@/modules/subscriptions/utils/formOptions.utils';

interface SubscriptionFormFieldsProps {
  formData: SubscriptionFormData;
  updateField: <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => void;
  suggestions: BrandPreset[];
  onNameChange: (name: string) => void;
  onSelectPreset: (preset: BrandPreset) => void;
}

export function SubscriptionFormFields({
  formData,
  updateField,
  suggestions,
  onNameChange,
  onSelectPreset,
}: SubscriptionFormFieldsProps) {
  const classes = subscriptionModalStyles();

  return (
    <>
      <BrandAutocomplete
        value={formData.name}
        onChange={onNameChange}
        suggestions={suggestions}
        onSelectPreset={onSelectPreset}
      />

      <div className={classes.grid}>
        <CustomInput
          label="Cost"
          type="number"
          step="0.01"
          min="0"
          required
          value={formData.cost}
          onChange={(e) => updateField('cost', parseFloat(e.target.value) || 0)}
        />
        <CustomSelect
          label="Billing cycle"
          value={formData.cycle}
          onChange={(val) => updateField('cycle', val as BillingCycle)}
          options={CYCLE_OPTIONS}
        />
      </div>

      <div className={classes.grid}>
        <CustomSelect
          label="Category"
          value={formData.category}
          onChange={(val) => updateField('category', val as SubscriptionCategory)}
          options={CATEGORY_OPTIONS}
        />
        <DatePicker
          label="Next renewal date"
          required
          value={formData.renewalDate}
          onChange={(val) => updateField('renewalDate', val)}
        />
      </div>

      <CustomInput
        label="Cancellation URL (optional)"
        type="url"
        placeholder="https://..."
        value={formData.cancellationUrl || ''}
        onChange={(e) => updateField('cancellationUrl', e.target.value || null)}
      />
    </>
  );
}
