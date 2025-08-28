"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  image: string;
  publisher: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border-none shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-[2deg] hover:ring-3 hover:ring-orange-500">
      <Image
        src={product.image}
        alt={product.name}
        fill
        quality={100}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        className="rounded-xl object-cover ease-out"
      />

      <div className="absolute inset-0 bg-white/5 opacity-0 backdrop-blur-lg transition-opacity duration-500 ease-out group-hover:opacity-100"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-4 text-white">
        <h3 className="-translate-x-10 transform text-center text-lg font-bold tracking-wide opacity-0 drop-shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:text-2xl">
          {product.name}
        </h3>
        <p className="translate-x-10 transform text-xs text-white opacity-0 drop-shadow-md transition-all delay-100 duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:text-base">
          {product.publisher}
        </p>
      </div>
    </Card>
  );
}
