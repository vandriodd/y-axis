import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends Omit<React.ComponentProps<"input">, "prefix"> {
  label?: string;
  prefix?: React.ReactNode;
}

function Input({ className, type, label, prefix, ...props }: InputProps) {
  return (
    <label>
      {label && (
        <span className="text-sm text-gold uppercase tracking-widest block mb-2">
          {label}
        </span>
      )}

      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {prefix}
          </div>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-accent/30 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            prefix && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    </label>
  );
}

export { Input };
