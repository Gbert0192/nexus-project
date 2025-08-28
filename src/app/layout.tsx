import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Nexus Top up",
  description: "Best Topup Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#0c0a09",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="text-white">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

// style={{ backgroundImage: "url('/img/background.jpeg')" }}
// className="bg-gradient-to-r from-red-950 via-black to-red-950a"
// className="bg-stone text-white"
// className="bg-gradient-to-b from-stone-950 to-black text-white"
