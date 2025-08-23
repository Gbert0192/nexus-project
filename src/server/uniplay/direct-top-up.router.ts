import { getDirectTopUpController } from "@/server/uniplay/controller/get-direct-top-up.controller";
import { createTRPCRouter } from "@/trpc/trpc";
import type { inferRouterOutputs } from "@trpc/server";

export const uniplayRouter = createTRPCRouter({
  directTopUp: getDirectTopUpController,
});

export type UniplayRouterOutputs = inferRouterOutputs<typeof uniplayRouter>;
