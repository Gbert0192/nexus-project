"use client";
import { Carousel } from "@/app/carousel/Carousel";
import { ProductCard, type Product } from "@/app/ProductCard";
import { api } from "@/trpc/react";
import React from "react";

const SkeletonCard = () => (
  <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-white/10"></div>
);

const ListGameCard = () => {
  const { data, isLoading, isError } = api.uniplay.directTopUp.useQuery();

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 12 }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    }

    if (isError) {
      return (
        <p className="col-span-full text-center text-red-400">
          Gagal memuat data. Coba muat ulang halaman.
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
        {data.list_dtu.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </>
    );
  };
  const images = ["/img/gusion.jpg", "/img/claude.jpg", "/img/car3.jpeg"];

  return (
    <div
      className="min-h-screen w-full px-4 py-8 text-white sm:px-8"
      style={{ backgroundImage: "url('/img/background.jpeg')" }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Pilih Game Favoritmu
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Top up instan dan aman untuk ratusan game populer.
          </p>
          <Carousel images={images} />
        </header>
        <main className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 md:gap-6 lg:grid-cols-7">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ListGameCard;
