"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "@/app/search/page";

interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  logoSrc?: string;
  navLinks?: NavLink[];
}

export default function Header({
  logoSrc = "/img/favicon.jpeg",
  navLinks = [
    { label: "Home", href: "/" },
    { label: "Check Transaction", href: "/check-transaction" },
  ],
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-[10dvh] w-full bg-gradient-to-r from-red-950 via-black to-red-950 shadow-md">
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

          <div className="relative h-12 w-12 flex-shrink-0">
            <Image src={logoSrc} alt="logo" fill className="object-contain" />
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
