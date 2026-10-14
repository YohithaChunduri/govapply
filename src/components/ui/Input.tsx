import React, { useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, id, type = "text", leftIcon, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const reactGeneratedId = useId();
    const inputId = id || reactGeneratedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const isPasswordType = type === "password";
    const actualType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-rose-600 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={actualType}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-150 min-h-[42px] focus-visible:outline-none focus-visible:ring-2 ${
              leftIcon ? "pl-9" : ""
            } ${isPasswordType ? "pr-10" : ""} ${
              error
                ? "border-rose-400 focus-visible:border-rose-500 focus-visible:ring-rose-200"
                : "border-slate-300 hover:border-slate-400 focus-visible:border-[#0B2546] focus-visible:ring-slate-200"
            } ${className}`}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer focus-visible:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-1 text-xs text-rose-600 font-medium">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="mt-1 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
