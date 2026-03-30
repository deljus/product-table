import UserIcon from "@/assets/user.svg?react";
import XIcon from "@/assets/x.svg?react";
import type { HTMLAttributes } from "react";
import cn from "classnames";

type Props = {
  error?: string;
  onClear?: () => void
} & HTMLAttributes<HTMLInputElement>;

export function UserField({ className, error, onClear, ...rest }: Props) {
  return (
    <div>
      <div
        className={cn(
          "border border-coral-200 rounded-md flex flex-row p-4",
          className,
          error && "border-red-400 text-red-400",
        )}
      >
        <UserIcon />
        <input className="flex-1 border-none outline-0 px-2 -my-4" {...rest} />
        <button type="button" className="cursor-pointer" onClick={onClear}>
          <XIcon />
        </button>
      </div>
      <div className="text-red-400 h-4 text-sm mb-1">{error}</div>
    </div>
  );
}
