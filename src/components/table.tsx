import { useId } from "react";
import cn from "classnames";
import InboxIcon from "@/assets/inbox.svg?react";
import { OrderBtn } from "@/components/order-btn";
import type { ReactNode } from "react";

type ColumnComponent<Data> = {
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
}: Omit<Props<Data>, "onOrder" | "sortedKey">) {
  const uid = useId();

  if (data.length) {
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={`${uid}-${index}`} className="border-b border-b-gray-200">
            {columns.map((column, colIndex) => (
              <td key={`${uid}-${index}-${colIndex}`} className=" p-2">
                {column.render(item)}
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
                  {column.sortable ? (
                    <OrderBtn
                      order={order}
                      onClick={(order) =>
                        onOrder({ order, field: column.dataKey })
                      }
                    />
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
