import cn from "classnames";
import type { ReactNode } from "react";

export type ErrorContainerProps = {
  error?: string;
  className?: string;
  children: ReactNode;
};

export function ErrorContainer({ error, className, children }: ErrorContainerProps) {
  return (
    <div>
      <div
        className={cn(
          "border border-coral-200 rounded-md flex flex-row p-4",
          className,
          error && "border-red-400 text-red-400",
        )}
      >
        {children}
      </div>
      <div className="text-red-400 h-4 text-sm mb-1">{error}</div>
    </div>
  );
}
