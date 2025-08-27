"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Image from "next/image";

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
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
}: HeaderProps) {
  return (
    <header className="w-full border-b bg-gradient-to-r from-red-800 via-orange-600 to-red-700 text-white shadow-lg">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:container">
        {/* kiri: burger + logo */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[70vw] p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <XIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="hover:bg-muted rounded-md px-3 py-2 text-base font-medium"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="relative h-8 w-8 flex-shrink-0">
            <Image src={logoSrc} alt="logo" fill className="object-contain" />
          </div>
        </div>

        <div className="w-10" />
      </div>
    </header>
  );
}
