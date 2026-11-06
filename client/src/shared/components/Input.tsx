import React, { forwardRef, useId } from 'react';
import './Input.scss';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: InputType;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'medium',
      label,
      error,
      helperText,
      leftAdornment,
      rightAdornment,
      fullWidth = false,
      disabled,
      required,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(error);

    const containerClasses = [
      'input-container',
      fullWidth && 'input-container--full-width',
      disabled && 'input-container--disabled',
      hasError && 'input-container--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'input',
      `input--${size}`,
      leftAdornment && 'input--with-left-adornment',
      rightAdornment && 'input--with-right-adornment',
      hasError && 'input--error',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && <span className="input-label__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="input-wrapper">
          {leftAdornment && <span className="input-adornment input-adornment--left">{leftAdornment}</span>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={helperText || error ? helperId : undefined}
            {...props}
          />
          {rightAdornment && <span className="input-adornment input-adornment--right">{rightAdornment}</span>}
        </div>
        {(error || helperText) && (
          <span
            id={helperId}
            className={`input-helper ${error ? 'input-helper--error' : ''}`}
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;