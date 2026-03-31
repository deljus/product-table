import { SearchInput } from "@/components/search-input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { products } from "@/libs/services";

type Filters = {
  search?: string;
  limit?: string;
  skip?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

const initFilters = {};

export function DashboardPage() {
  const [filters, setFilters] = useState<Filters>(initFilters);

  const { isLoading, data } = useQuery({
    queryKey: [filters],
    queryFn: () => products.get(filters),
  });

  const handleSearch = (search: string) => setFilters({ ...filters, search });

  const handleOrder = (field: string, order: 'asc' | 'desc') =>  setFilters({ ...filters, sortBy: field, order });



  return (
    <div>
      <div>
        <h1>Товары</h1>
        <SearchInput onSearch={handleSearch} />
      </div>

      <div></div>
    </div>
  );
}
