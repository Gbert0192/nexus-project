import ListGameCard from "@/app/ListGameCard";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const data = await api.uniplay.directTopUp();
  console.log(JSON.stringify(data, null, 2));
  return (
    <HydrateClient>
      <ListGameCard />
    </HydrateClient>
  );
}
