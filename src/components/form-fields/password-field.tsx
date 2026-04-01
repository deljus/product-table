import { useState } from "react";
import LockIcon from "@/assets/lock.svg?react";
import EyeOffIcon from "@/assets/eye-off.svg?react";
import EyeIcon from "@/assets/eye.svg?react";
import { ErrorContainer } from "./containers";
import type { FieldProps } from "./types";

export function PasswordField({ className, error, ...rest }: FieldProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <ErrorContainer className={className} error={error}>
      <LockIcon />
      <input
        type={isShow ? "text" : "password"}
        {...rest}
        className="flex-1 border-none outline-0 px-2 -my-4"
        {...rest}
      />
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </ErrorContainer>
  );
}
