import { useState } from "react";
import LockIcon from "@/assets/lock.svg?react";
import EyeOffIcon from "@/assets/eye-off.svg?react";
import EyeIcon from "@/assets/eye.svg?react";
import type { HTMLAttributes } from "react";
import cn from "classnames";

type Props = {
  error?: string;
} & HTMLAttributes<HTMLInputElement>;

export function PasswordField({ className, error, ...rest }: Props) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <div
        className={cn(
          "border border-coral-200 rounded-md flex flex-row p-4",
          className,
          error && "border-red-400 text-red-400",
        )}
      >
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
      </div>
      <div className="text-red-400 h-4 text-sm mb-1">{error}</div>
    </div>
  );
}
