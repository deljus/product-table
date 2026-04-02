import { useId } from "react";
import cn from "classnames";
import InboxIcon from "@/assets/inbox.svg?react";
import { OrderBtn } from "@/components/order-btn";
import type { ReactNode } from "react";

type ColumnComponent<Data> = {
  className?: string;
  title: string | ReactNode;
  dataKey?: keyof Data;
  sortable?: boolean;
  render: (item: Data) => ReactNode;
};

export type Column<Data> = ColumnComponent<Data>;

export type OrderField<Data> = { order?: "asc" | "desc"; field?: keyof Data };

export type Props<Data> = {
  data?: Data[];
  columns: Array<Column<Data>>;
  order?: "asc" | "desc";
  isLoading?: boolean;
  onOrder: (item: OrderField<Data>) => void;
  className?: string;
};

export function TableBody<Data>({
  data = [],
  columns,
  isLoading,
}: Omit<Props<Data>, "onOrder" | "sortedKey">) {
  const uid = useId();

  if (data.length) {
    return (
      <div className="table-row-group relative">
        {isLoading ? (
          <div className="absolute w-full h-full left-0 top-0 flex bg-white/90 items-center justify-center z-10">
            <div className="text-black">Загрузка...</div>
          </div>
        ) : null}
        {data.map((item, index) => (
          <div key={`${uid}-${index}`} className="table-row">
            {columns.map((column, colIndex) => (
              <div
                key={`${uid}-${index}-${colIndex}`}
                className="table-cell p-4 border-b border-gray-200 align-middle"
              >
                {column.render(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="table-row-group relative w-full h-[350px]">
      <div className="absolute flex justify-center items-center w-full h-full left-0 top-0">
        <InboxIcon className="inline w-6 h-6" />
      </div>
    </div>
  );
}

export function Table<Data extends object>({
  onOrder,
  columns,
  isLoading,
  className,
  data,
  order,
}: Props<Data>) {
  const uid = useId();

  return (
    <div className={cn("table w-full", className)}>
      <div className="table-header-group">
        <div className="table-row font-semibold">
          {columns.map((column, index) => (
            <div
              key={`${uid}-${index}`}
              className={cn(
                "table-cell text-left p-4 border-b border-gray-200",
                column.className,
              )}
            >
              <div className="flex flex-row space-x-4">
                <div>{column.title}</div>
                {column.sortable ? (
                  <OrderBtn
                    order={order}
                    onClick={(order) =>
                      onOrder({ order, field: column.dataKey })
                    }
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TableBody isLoading={isLoading} columns={columns} data={data} />
    </div>
  );
}
