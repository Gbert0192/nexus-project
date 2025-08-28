"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUpdateParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParams = useCallback(
    (newParams: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams as unknown as string);

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router], // dependency stabil
  );

  const deleteParams = useCallback(
    (...keys: string[]) => {
      const params = new URLSearchParams(searchParams as unknown as string);
      keys.forEach((key) => params.delete(key));
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return { updateParams, deleteParams };
};
