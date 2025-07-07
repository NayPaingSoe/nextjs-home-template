import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, hint, ...props }, ref) => {
    const inputId =
      props.id ||
      `input-${props.placeholder?.toLowerCase().replace(/\s+/g, "-")}`;
    const placeholder = props.placeholder;
    const internalPlaceholder = " ";

    return (
      <div className="relative">
        <input
          id={inputId}
          type={type}
          ref={ref}
          placeholder={internalPlaceholder}
          autoComplete="off"
          className={cn(
            "peer block w-full appearance-none rounded-lg border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0 autofill:pt-6 autofill:pb-2 autofill:leading-tight autofill:scale-100 autofill:bg-white",
            error
              ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
              : "border-gray-300 focus:border-green-400 dark:border-gray-600 dark:focus:border-green-400",
            "dark:text-white",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm transition-colors duration-300",
            error
              ? "text-red-500 peer-focus:text-red-500 dark:text-red-500 dark:peer-focus:text-red-500"
              : "text-gray-500 peer-focus:text-green-400 dark:text-gray-400 dark:peer-focus:dark:text-green-400"
          )}
        >
          {placeholder}
        </label>
        {error && hint && (
          <p
            className={`mt-1.5 text-xs ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
