import type { HTMLAttributes } from "react";
import cn from "classnames";

export function Checkbox({
  className,
  label,
  ...rest
}: HTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <input
        type="checkbox"
        className="appearance-none w-6 h-6 border-2 border-coral-200 rounded
             grid place-content-center
             before:content-[''] before:w-4 before:h-4
             before:scale-0 before:transition-transform before:duration-150
             before:bg-dark-blue
             checked:before:scale-100 checked:border-bg-dark-blue cursor-pointer"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
