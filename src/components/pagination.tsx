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

function generatePages(start: number, end: number) {
  const buffer = [];

  for (let i = start; i <= end; i++) buffer.push(i);
  return buffer;
}

export function Pagination({
  total = 0,
  skip = 0,
  limit = 0,
  onPaginate,
  pageCount,
}: Props) {
  if (!total || !limit) {
    return null;
  }

  const pages = Math.ceil(total / limit);
  const selectedPage = Math.ceil(skip / limit);

  const isNextBtnDisabled = skip + limit >= total;
  const isPrevBtnDisabled = skip - limit < 0;

  const startIndex =
    selectedPage - pageCount < 0 ? 0 : selectedPage - pageCount;
  const endIndex =
    startIndex + pageCount > pages ? pages - 1 : startIndex + pageCount;

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
        {skip + 1} - {skip + limit} <span className="text-gray-400">из</span>{" "}
        {total}
      </div>
      <div className="flex flex-row space-x-2 text-sm">
        <button
          onClick={handlePrev}
          className="w-8 h-8  rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={isPrevBtnDisabled}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {generatePages(startIndex, endIndex).map((pageNum) => (
          <button
            onClick={() => onPaginate(limit * pageNum)}
            disabled={selectedPage === pageNum}
            className={cn(
              "btn w-8 h-8 p-1 text-sm font-normal rounded-sm",
              selectedPage === pageNum && "btn-primary",
            )}
          >
            {pageNum + 1}
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
}
