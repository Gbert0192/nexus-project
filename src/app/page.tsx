import Header from "@/app/header/page";
import MainPage from "@/app/MainPage";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const data = await api.uniplay.directTopUp();
  console.log(JSON.stringify(data, null, 2));

  return (
    <HydrateClient>
      <div className="min-h-screen bg-cover bg-center">
        <Header />
        <MainPage />
      </div>
    </HydrateClient>
  );
}
