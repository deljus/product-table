import cn from "classnames";
import MagnifyingGlassIcon from "@/assets/magnifying-glass.svg?react";

type Props = {
  onSearch: (value: string) => void;
  className?: string;
};

export function SearchInput({ onSearch, className }: Props) {
  return (
    <div
      className={cn(
        "border border-coral-200 rounded-md flex flex-row p-3 bg-base",
        className,
      )}
    >
      <MagnifyingGlassIcon />
      <input
        type="text"
        name="search"
        id="search"
        onChange={({ target }) => onSearch(target.value)}
        className="flex-1 border-none outline-0 px-2 -my-3"
      />
    </div>
  );
}
