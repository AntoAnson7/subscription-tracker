import { ReactNode, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/modules/common/hooks/useClickOutside';
import { customSelectStyles } from '@/modules/common/recipes/customSelect.recipe';

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  id?: string;
}

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  disabled = false,
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const classes = customSelectStyles({ hasError: Boolean(error) });

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex =
        e.key === 'ArrowDown'
          ? (currentIndex + 1) % options.length
          : (currentIndex - 1 + options.length) % options.length;
      onChange(options[nextIndex].value);
    }
  };

  return (
    <div ref={containerRef} className={classes.root} onKeyDown={handleKeyDown}>
      {label && (
        <label id={`${selectId}-label`} htmlFor={selectId} className={classes.label}>
          {label}
        </label>
      )}

      <button
        type="button"
        id={selectId}
        disabled={disabled}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={classes.trigger}
      >
        <div className={classes.triggerContent}>
          {selectedOption?.icon}
          {selectedOption ? (
            <span className={classes.valueText}>{selectedOption.label}</span>
          ) : (
            <span className={classes.placeholder}>{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={15}
          className={classes.chevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {isOpen && (
        <div className={classes.menu} role="listbox" aria-label={label || placeholder}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={classes.option}
              >
                <div className={classes.optionContent}>
                  {option.icon}
                  <span className={classes.optionText}>{option.label}</span>
                </div>
                {isSelected && <Check size={14} className={classes.checkIcon} />}
              </button>
            );
          })}
        </div>
      )}

      {error && <span className={classes.errorText}>{error}</span>}
    </div>
  );
}
