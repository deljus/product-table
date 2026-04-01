import { useId } from "react";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import ChevronRight from "@/assets/chevron-right.svg?react";
import cn from "classnames";

type Props = {
  total?: number;
  skip?: number;
  limit?: number;
  onPaginate: (skip: number) => void;
  pageCount: number;
};

function generatePages(pages: number, selectedPage: number, pageCount: number) {
  let minPageLimit = Math.floor(selectedPage / pageCount) * pageCount + 1;

  if (selectedPage % pageCount === 0) {
    minPageLimit -= pageCount;
  }

  let maxPageLimit = minPageLimit + pageCount - 1;

  if (maxPageLimit > pages) {
    maxPageLimit = pages;
  }

  const buffer = [];

  for (let i = minPageLimit; i <= maxPageLimit; i++) buffer.push(i);
  return buffer;
}

export const Pagination = ({
  total = 0,
  skip = 0,
  limit = 0,
  onPaginate,
  pageCount,
}: Props) => {
  const uid = useId();

  const pages = Math.ceil(total / limit);
  const selectedPage = Math.ceil(skip / limit) + 1;

  const isNextBtnDisabled = skip + limit >= total;
  const isPrevBtnDisabled = skip - limit < 0;

  const handleNext = () => {
    onPaginate(skip + limit);
  };

  const handlePrev = () => {
    onPaginate(skip - limit);
  };

  return (
    <div className="flex flex-row justify-between py-4">
      <div className="text-black">
        <span className="text-gray-400">Показано </span>
        {skip + 1} - {Math.min(skip + limit, total)}{" "}
        <span className="text-gray-400">из</span> {total}
      </div>
      <div className="flex flex-row space-x-2 text-sm">
        <button
          onClick={handlePrev}
          className="w-8 h-8  rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={isPrevBtnDisabled}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {generatePages(pages, selectedPage, pageCount).map((pageNum) => (
          <button
            key={`${uid}-${pageNum}`}
            onClick={() => onPaginate(limit * (pageNum - 1))}
            disabled={selectedPage === pageNum}
            className={cn(
              "btn w-8 h-8 p-1 text-sm font-normal rounded-sm",
              selectedPage === pageNum && "btn-primary",
            )}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={handleNext}
          className="w-8 h-8  rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={isNextBtnDisabled}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
