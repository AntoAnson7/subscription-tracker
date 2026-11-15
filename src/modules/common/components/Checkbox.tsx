import { ReactNode, useState } from 'react';
import { Check } from 'lucide-react';
import { checkboxStyles } from '@/modules/common/recipes/checkbox.recipe';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  ariaLabel,
}: CheckboxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const classes = checkboxStyles({ isChecked: checked, isFocused });

  return (
    <label className={classes.root} style={{ opacity: disabled ? 0.5 : 1 }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classes.input}
        aria-label={ariaLabel}
      />
      <span aria-hidden="true" className={classes.control}>
        {checked && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
      </span>
      {label && <span className={classes.label}>{label}</span>}
    </label>
  );
}
