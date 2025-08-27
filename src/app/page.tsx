import { Carousel } from "@/app/carousel/Carousel";
import ListGameCard from "@/app/ListGameCard";
import { Card, CardContent } from "@/components/ui/card";
import { api, HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
  const data = await api.uniplay.directTopUp();
  console.log(JSON.stringify(data, null, 2));

  const items = [
    <Card key="1">
      <CardContent className="w-full justify-center p-6">
        <Image
          src={"/img/carousel1.webp"}
          alt="carousel1"
          width={200}
          height={200}
        />
      </CardContent>
    </Card>,
    <Card key="2" className="overflow-hidden">
      <CardContent className="p-0">
        <Image
          src="/img/carousel1.webp"
          alt="carousel2"
          width={800}
          height={300}
          className="h-48 w-full object-cover"
        />
      </CardContent>
    </Card>,
    <Card key="3">
      <CardContent className="justify-center p-6">
        <Image
          src={"/img/carousel1.webp"}
          alt="carousel1"
          width={200}
          height={200}
        />
      </CardContent>
    </Card>,
  ];

  return (
    <HydrateClient>
      <div className="min-h-screen bg-cover bg-center">
        <Carousel items={items} />
        <ListGameCard />
      </div>
    </HydrateClient>
  );
}
