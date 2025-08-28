import Header from "@/components/Individual/Header";
import MainPage from "@/app/MainPage";
import { HydrateClient } from "@/trpc/server";
import { Footer } from "@/components/Individual/Footer";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <HydrateClient>
      <div className="min-h-screen bg-cover bg-center">
        <Header />
        <MainPage searchParams={params} />
        <Footer />
      </div>
    </HydrateClient>
  );
}
