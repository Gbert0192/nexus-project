"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "@/components/Individual/SearchComponent";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  logoSrc?: string;
  navLinks?: NavLink[];
}

export default function Header({
  logoSrc = "/img/logo.png",
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Check Transaction", href: "/check-transaction" },
  ],
}: HeaderProps) {
  return (
    // <header className="sticky top-0 z-50 h-[10dvh] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md">
    // <header className="sticky top-0 z-50 h-[10dvh] w-full bg-black shadow-md">
    // <header className="sticky top-0 z-50 h-[10dvh] w-full bg-zinc-950 shadow-md">
    // <header className="sticky top-0 z-50 h-[10dvh] w-full bg-gradient-to-r from-black via-yellow-950 to-black shadow-md">
    // <header className="sticky top-0 z-50 h-[10dvh] w-full bg-gradient-to-r from-[#2c200d] via-[#4a3715] to-[#2c200d] shadow-md">
    <header className="sticky top-0 z-50 h-[10dvh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:container">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 text-white"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[70vw] p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-semibold">Menu</span>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="rounded-md px-3 py-2 text-base font-medium text-white transition hover:bg-white/10"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="relative h-24 w-24 flex-shrink-0">
            <Image src={logoSrc} alt="logo" width={600} height={600} />
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
