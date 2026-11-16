import { ReactNode, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { checkboxStyles } from '@/modules/common/recipes/checkbox.recipe';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  isMultiline?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  ariaLabel,
  isMultiline: explicitMultiline,
}: CheckboxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [detectedMultiline, setDetectedMultiline] = useState(false);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const isMultiline = explicitMultiline ?? detectedMultiline;

  useEffect(() => {
    if (explicitMultiline !== undefined) return;
    const el = labelRef.current;
    if (!el) return;

    const checkMultiline = () => {
      const computed = window.getComputedStyle(el);
      const lh = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.4 || 18;
      const multiline = el.clientHeight > lh * 1.35;
      setDetectedMultiline((prev) => (prev !== multiline ? multiline : prev));
    };

    const rafId = requestAnimationFrame(checkMultiline);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        checkMultiline();
      });
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, [label, explicitMultiline]);

  const classes = checkboxStyles({ isChecked: checked, isFocused, isMultiline });

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
      {label && (
        <span ref={labelRef} className={classes.label}>
          {label}
        </span>
      )}
    </label>
  );
}
