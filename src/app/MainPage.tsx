"use client";

import { Carousel } from "@/components/Individual/Carousel";
import { ProductCard, type Product } from "@/components/Individual/ProductCard";
import { api } from "@/trpc/react";
import React, { useState, useMemo, type FC, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const SkeletonCard: FC = () => (
  <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-slate-200/20" />
);

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

const MainPage: React.FC<PageProps> = ({ searchParams }) => {
  const { data, isLoading, isError } = api.uniplay.directTopUp.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  );

  const [limit, setLimit] = useState(21);
  const [isAnimating, setIsAnimating] = useState(false);

  const search = searchParams.search?.toLowerCase() ?? "";

  const filteredData = useMemo(() => {
    return data?.list_dtu?.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [data, search]);

  const handleSeeMore = () => {
    const increment = 21;
    setLimit((prev) => prev + increment);

    // Animasi hanya untuk item baru
    setTimeout(() => {
      setIsAnimating(false);
    }, increment * 200); // delay 200ms per item baru
  };

  const handleSeeLess = () => {
    setIsAnimating(true);
    setLimit((prev) => Math.max(21, prev - 21));
    setTimeout(() => setIsAnimating(false), 150);
  };

  const renderContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 14 }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    }

    if (isError) {
      return (
        <p className="col-span-full text-center text-3xl text-white">
          Error while Loading Data, Please Try Again Later.
        </p>
      );
    }

    if (!data || data.list_dtu.length === 0) {
      return (
        <p className="col-span-full text-center text-gray-400">
          No Game Was Found.
        </p>
      );
    }

    return (
      <>
        {filteredData?.slice(0, limit).map((item: Product, i: number) => {
          const isNew = i >= limit - 21;
          const delay = isNew ? `${(i - (limit - 21)) * 60}ms` : "0ms";

          return (
            <div
              key={item.id}
              className={`animate-pop opacity-0 ${!isNew || isAnimating ? "animate-none opacity-100" : ""}`}
              style={{ animationDelay: delay }}
            >
              <ProductCard product={item} />
            </div>
          );
        })}

        <div className="relative col-span-full mt-6 flex h-20 items-center justify-center gap-4">
          {search === "" && limit < (data?.list_dtu.length ?? 0) && (
            <div className="absolute inset-0 grid grid-cols-7 gap-6 overflow-hidden blur-md">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonCard key={`bg-${i}`} />
              ))}
            </div>
          )}

          {limit > 21 && (
            <Button
              onClick={handleSeeLess}
              disabled={isAnimating}
              className="relative z-10 border border-orange-400 bg-transparent text-orange-400 backdrop-blur-md transition-all hover:bg-orange-400/10"
            >
              {isAnimating ? "Loading..." : "See Less"}
            </Button>
          )}

          {/* See More (kanan) */}
          {search === "" && limit < (data?.list_dtu.length ?? 0) && (
            <Button
              onClick={handleSeeMore}
              disabled={isAnimating}
              className="relative z-10 border border-orange-400 bg-transparent text-orange-400 backdrop-blur-md transition-all hover:bg-orange-400/10"
            >
              {isAnimating ? "Loading..." : "See More"}
            </Button>
          )}
        </div>
      </>
    );
  };

  const images = ["/img/gusion.jpg", "/img/claude.jpg", "/img/car3.jpeg"];

  return (
    <div className="min-h-screen w-full px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <Carousel images={images} />
        </div>
        <section>
          <h2 className="mb-6 border-b border-white pb-2 text-2xl font-semibold text-white">
            Products
          </h2>
          <main className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 md:gap-6 lg:grid-cols-7">
            {renderContent()}
          </main>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
