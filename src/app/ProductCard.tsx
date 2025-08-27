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
    <Card className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border-none shadow-lg outline-0 outline-transparent transition-all duration-300 ease-in-out hover:outline-2 hover:outline-white">
      <Image
        src={product.image}
        alt={product.name}
        fill
        quality={100}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-500 ease-out group-hover:opacity-100"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-4 text-white">
        <h3 className="-translate-x-10 transform text-center text-xl font-bold tracking-wide opacity-0 drop-shadow-lg transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:text-2xl">
          {product.name}
        </h3>
        <p className="translate-x-10 transform text-sm text-gray-200 opacity-0 drop-shadow-md transition-all delay-100 duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:text-base">
          {product.publisher}
        </p>
      </div>
    </Card>
  );
}
