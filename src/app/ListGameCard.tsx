"use client";
import { GameTopupCard, type Product } from "@/app/gameCardTopUp";
import { api } from "@/trpc/react";
import React from "react";

// Komponen Skeleton disesuaikan dengan ukuran kartu yang baru (lebih kecil)
const SkeletonCard = () => (
  <div className="h-66 w-55 animate-pulse rounded-xl bg-white/10"></div>
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
          <GameTopupCard key={item.id} product={item} />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Pilih Game Favoritmu
          </h1>
          <p className="mt-3 text-lg text-gray-300">
            Top up instan dan aman untuk ratusan game populer.
          </p>
        </header>

        <main className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ListGameCard;
