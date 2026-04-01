import { ErrorContainer } from "./containers";
import type { FieldProps } from "./types";

export function NumberField({ error, className, ...rest }: FieldProps) {
  return (
    <ErrorContainer error={error} className={className}>
      <input
        type="number"
        className="flex-1 border-none outline-0 px-2 -my-4"
        {...rest}
      />
    </ErrorContainer>
  );
}
