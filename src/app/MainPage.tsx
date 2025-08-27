"use client";
import { Carousel } from "@/app/carousel/Carousel";
import { ProductCard, type Product } from "@/app/ProductCard";
import { api } from "@/trpc/react";
import React, { useState, useEffect, type FC, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const SkeletonCard: FC = () => (
  <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-slate-200/20"></div>
);

const MainPage: FC = () => {
  const { data, isLoading, isError } = api.uniplay.directTopUp.useQuery();
  const [limit, setLimit] = useState<number>(21);
  const [isShowingMore, setIsShowingMore] = useState<boolean>(false);

  const [isSeeMoreVisible, setIsSeeMoreVisible] = useState<boolean>(false);

  const handleSeeMore = (): void => {
    setIsShowingMore(true);
    setLimit((prev) => prev + 21);

    setTimeout(() => {
      setIsShowingMore(false);
    }, 100);
  };

  useEffect(() => {
    if (isLoading || isShowingMore) {
      setIsSeeMoreVisible(false);
      return;
    }

    if (data && limit <= data.list_dtu.length) {
      const animationDuration = 21 * 60 + 100;

      const timer = setTimeout(() => {
        setIsSeeMoreVisible(true);
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [data, limit, isLoading, isShowingMore]);

  const renderContent = (): ReactNode => {
    if (isLoading) {
      return Array.from({ length: 14 }).map((_: unknown, index: number) => (
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
          Tidak ada game yang tersedia saat ini.
        </p>
      );
    }

    return (
      <>
        {data.list_dtu.slice(0, limit).map((item: Product, i: number) => {
          const isNew = i >= limit - 21;
          const delayIndex = isNew ? i - (limit - 21) : 0;
          return (
            <div
              key={item.id}
              className={`animate-pop opacity-0 ${!isNew || isShowingMore ? "animate-none opacity-100" : ""}`}
              style={
                isNew && !isShowingMore
                  ? { animationDelay: `${delayIndex * 60}ms` }
                  : {}
              }
            >
              <ProductCard product={item} />
            </div>
          );
        })}

        {isSeeMoreVisible && limit < data.list_dtu.length && (
          <div className="animate-pop animation-pop relative col-span-full mt-6 flex h-24 items-center justify-center">
            <div className="absolute inset-0 z-0 grid grid-cols-7 gap-6 overflow-hidden blur-md">
              {Array.from({ length: 7 }).map((_: unknown, index: number) => (
                <SkeletonCard key={`bg-skeleton-${index}`} />
              ))}
            </div>

            <Button
              className="animation-pop relative z-10 border border-orange-400 bg-transparent text-orange-400 backdrop-blur-md transition-all duration-300 hover:bg-orange-400/10 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleSeeMore}
              disabled={isShowingMore}
            >
              {isShowingMore ? "Loading..." : "See More..."}
            </Button>
          </div>
        )}
      </>
    );
  };

  const images: string[] = [
    "/img/gusion.jpg",
    "/img/claude.jpg",
    "/img/car3.jpeg",
  ];

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
