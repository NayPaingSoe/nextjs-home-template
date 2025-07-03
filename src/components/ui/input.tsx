import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const inputId = props.id || `input-${props.placeholder?.toLowerCase().replace(/\s+/g, "-")}`
  const placeholder = props.placeholder
  const internalPlaceholder = " "

  return (
    <div className="relative">
      <input
        id={inputId}
        type={type}
        placeholder={internalPlaceholder}
        autoComplete="off"
        className={cn(
          "peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 autofill:pt-6 autofill:pb-2 autofill:leading-tight autofill:scale-100 autofill:bg-white",
          "dark:border-gray-600 dark:text-white dark:focus:border-green-400",
          className
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 transition-colors duration-300",
          "peer-focus:text-green-400",
          "dark:text-gray-400 peer-focus:dark:text-green-400"
        )}
      >
        {placeholder}
      </label>
    </div>
  )
}

export { Input }
