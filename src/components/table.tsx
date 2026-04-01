import { useId } from "react";
import cn from "classnames";
import InboxIcon from "@/assets/inbox.svg?react";
import ArrowDownIcon from "@/assets/arrow-down.svg?react";
import type { ReactNode } from "react";

type ColumnText<Data> = {
  title: string;
  dataKey: keyof Data;
  sortable?: boolean;
};

type ColumnComponent<Data> = {
  title: string | ReactNode;
  render: (item: Data) => ReactNode;
};

export type Column<Data> = ColumnText<Data> | ColumnComponent<Data>;

export type Props<Data> = {
  data?: Data[];
  columns: Array<Column<Data>>;
  sortedKey?: string;
  order?: "asc" | "desc";
  isLoading?: boolean;
  onOrder: (field: keyof Data, order: "asc" | "desc") => void;
  className?: string;
};

export function TableBody<Data>({
  data = [],
  columns,
}: Omit<Props<Data>, "onOrder" | "sortedKey">) {
  const uid = useId();

  if (data.length) {
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={`${uid}-${index}`} className="border-b border-b-gray-200">
            {columns.map((column, colIndex) => (
              <td key={`${uid}-${index}-${colIndex}`} className=" p-2">
                {"dataKey" in column
                  ? (item[column.dataKey] as string)
                  : column.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <tbody>
      <tr className="h-[300px]">
        <td colSpan={7} className="text-center">
          <InboxIcon className="inline w-6 h-6" />
        </td>
      </tr>
    </tbody>
  );
}

export function Table<Data extends object>({
  onOrder,
  columns,
  isLoading,
  className,
  data,
  sortedKey,
  order,
}: Props<Data>) {
  const uid = useId();

  return (
    <div className="relative flex w-full h-full">
      {isLoading ? (
        <div className="absolute w-full h-full left-0 top-0 flex bg-white/90 items-center justify-center z-10">
          <div className="text-black">Загрузка...</div>
        </div>
      ) : null}

      <table className={cn("table-auto w-full text-left", className)}>
        <thead>
          <tr className="border-b border-b-gray-200">
            {columns.map((column, index) => (
              <th key={`${uid}-${index}`} className="px-2 py-4">
                <div className="flex flex-row space-x-4">
                  <div>{column.title}</div>
                  {"dataKey" in column && column.sortable ? (
                    <button
                      type="button"
                      className="cursor-pointer p-1 border border-gray-300 rounded"
                      onClick={() =>
                        onOrder(
                          column.dataKey,
                          order === "asc" ? "desc" : "asc",
                        )
                      }
                    >
                      <ArrowDownIcon
                        className={cn(
                          "w-4 h-4",
                          sortedKey === column.dataKey && order === "asc"
                            ? "rotate-180"
                            : "rotate-0",
                        )}
                      />
                    </button>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <TableBody isLoading={isLoading} data={data} columns={columns} />
      </table>
    </div>
  );
}
