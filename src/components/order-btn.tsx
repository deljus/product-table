import Bars4Icon from "@/assets/bars-4.svg?react";
import BarsArrowDownIconIcon from "@/assets/bars-arrow-down.svg?react";
import BarsArrowArrowIconIcon from "@/assets/bars-arrow-up.svg?react";

type Order = "asc" | "desc";

type Props = {
  order?: Order;
  onClick: (order?: Order) => void;
};

const ICONS = {
  asc: BarsArrowArrowIconIcon,
  desc: BarsArrowDownIconIcon,
};

const getNextOrder = (order?: Order) => {
  if (!order) return "asc";
  if (order === "asc") return "desc";
  return;
};

export function OrderBtn({ order, onClick }: Props) {
  const handleClick = () => {
    onClick(getNextOrder(order));
  };

  const Icon = order ? ICONS[order] : Bars4Icon;

  return (
    <button
      type="button"
      className="cursor-pointer p-1 border border-gray-300 rounded"
      onClick={handleClick}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
