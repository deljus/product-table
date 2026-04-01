import UserIcon from "@/assets/user.svg?react";
import XIcon from "@/assets/x.svg?react";
import { ErrorContainer } from "./containers";
import type { FieldProps } from "./types";

export function UserField({
  className,
  error,
  onClear,
  ...rest
}: FieldProps & { onClear: () => void }) {
  return (
    <ErrorContainer className={className} error={error}>
      <UserIcon />
      <input className="flex-1 border-none outline-0 px-2 -my-4" {...rest} />
      <button type="button" className="cursor-pointer" onClick={onClear}>
        <XIcon />
      </button>
    </ErrorContainer>
  );
}
