import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { customInputStyles } from '@/modules/common/recipes/customInput.recipe';

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  leftAdornment?: ReactNode;
  rightAdornment?: ReactNode;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
  { label, error, leftAdornment, rightAdornment, id, className, ...inputProps },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const classes = customInputStyles({ hasError: Boolean(error) });

  return (
    <div className={classes.root}>
      {label && (
        <label htmlFor={inputId} className={classes.label}>
          {label}
        </label>
      )}

      <div className={classes.inputWrapper}>
        {leftAdornment && <span className={classes.leftAdornment}>{leftAdornment}</span>}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${classes.input} ${className || ''}`}
          style={{
            paddingLeft: leftAdornment ? '40px' : undefined,
            paddingRight: rightAdornment ? '40px' : undefined,
          }}
          {...inputProps}
        />

        {rightAdornment && <span className={classes.rightAdornment}>{rightAdornment}</span>}
      </div>

      {error && (
        <span id={`${inputId}-error`} role="alert" className={classes.errorText}>
          {error}
        </span>
      )}
    </div>
  );
});
