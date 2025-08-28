"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/useUpdateParams/useDebounce";
import { useUpdateParams } from "@/lib/useUpdateParams/useUpdateParams";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const { updateParams } = useUpdateParams();

  const val = useDebounce(search, 400);

  useEffect(() => {
    updateParams({ search: val || null });
  }, [val, updateParams]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-10 w-[60vw]">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-full w-full rounded-2xl border border-gray-700 bg-black/30 pr-4 pl-10 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </div>
    </div>
  );
}
