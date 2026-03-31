import MagnifyingGlassIcon from "@/assets/magnifying-glass.svg?react";

type Props = {
  onSearch: (value: string) => void;
  className?: string;
};

export function SearchInput({ onSearch }: Props) {
  return (
    <div className="">
      <MagnifyingGlassIcon />
      <input onChange={({ target }) => onSearch(target.value)} />
    </div>
  );
}
