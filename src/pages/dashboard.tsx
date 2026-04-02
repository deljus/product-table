import { SearchInput } from "@/components/search-input";
import { useCallback, useState } from "react";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/libs/services";
import { Checkbox } from "@/components/form-fields/checkbox";
import { Pagination } from "@/components/pagination";
import { Table } from "@/components/table";
import PlusIcon from "@/assets/plus.svg?react";
import ElipsisIcon from "@/assets/elipsis-circle.svg?react";
import PlusCircleIcon from "@/assets/plus-circle.svg?react";
import ArrowPathIcon from "@/assets/arrow-path.svg?react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types";
import type { Column, OrderField } from "@/components/table";

type Filters = {
  search?: string;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

const columns: Column<Product>[] = [
  {
    className: "w-[5%]",
    title: <Checkbox />,
    render: () => <Checkbox />,
  },
  {
    title: "Наименование",
    className: "w-[45%]",
    render: (item) => (
      <div className="flex flex-row space-x-2 w-full">
        <img src={item.images[0]} className="w-12 h-12 rounded-lg" />
        <div>
          <div className="font-semibold text-lg text-black">{item.title}</div>
          <div className="text-gray-400">{item.category}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Вендор",
    className: "w-[10%]",
    dataKey: "brand",
    render: ({ brand }) => brand,
  },
  {
    title: "Артикул",
    className: "w-[10%]",
    dataKey: "sku",
    render: ({ sku }) => sku,
  },
  {
    title: "Оценка",
    className: "w-[10%]",
    render: ({ rating }) => (
      <div>
        <span className={cn(rating < 3.5 && "text-red-500")}>
          {rating.toFixed(1)}
        </span>{" "}
        / 5
      </div>
    ),
  },
  {
    title: "Цена, ₽",
    className: "w-[10%]",
    dataKey: "price",
    sortable: true,
    render: ({ price }) => price,
  },
  {
    title: "",
    className: "w-[10%]",
    render: () => (
      <div className="flex items-center space-x-2">
        <button type="button" className="btn btn-primary rounded-2xl py-0 px-2">
          <PlusIcon className="w-5 h-5 " />
        </button>
        <button type="button">
          <ElipsisIcon className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];

const initFilters = {
  limit: 5,
};

export function DashboardPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(initFilters);

  const productQuery = useQuery({
    queryKey: [filters],
    queryFn: () => productsService.get(filters),
    placeholderData: (prev) => prev,
  });

  const handleSearch = (search: string) => setFilters({ ...filters, search });

  const handleOrder = ({ field, order }: OrderField<Product>) => {
    setFilters({ ...filters, sortBy: field, order });
  };

  const handlePginate = useCallback(
    (skip: number) => setFilters((prev) => ({ ...prev, skip })),
    [],
  );

  const { products, skip, total } = productQuery.data?.data || {};

  return (
    <div className="bg-base">
      <div className="relative p-7 bg-white mt-5 mb-8 flex flex-row justify-center">
        <h1 className="relative xl:absolute md:left-7 font-semibold text-4xl text-black mr-10 inline">
          Товары
        </h1>
        <SearchInput onSearch={handleSearch} className="max-w-4xl w-full" />
      </div>

      <div className="bg-white p-7">
        <div className="flex justify-end space-x-2 mb-10">
          <button
            type="button"
            className="btn"
            onClick={() => productQuery.refetch()}
          >
            <ArrowPathIcon className="w-5.5 h-5.5" />
          </button>
          <button
            type="button"
            className="btn btn-primary px-3 py-2"
            onClick={() => navigate("/create")}
          >
            <PlusCircleIcon className="w-5.5 h-5.5 mr-2 inline-block" />
            Добавить
          </button>
        </div>

        <Table<Product>
          className="mb-10"
          data={products}
          columns={columns}
          onOrder={handleOrder}
          isLoading={productQuery.isFetching}
          order={filters.order}
        />

        <Pagination
          skip={skip}
          total={total}
          limit={filters.limit}
          onPaginate={handlePginate}
          pageCount={5}
        />
      </div>
    </div>
  );
}
