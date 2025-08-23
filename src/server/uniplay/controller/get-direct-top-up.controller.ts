import { UniPlayService } from "@/server/uniplay/uniplay.service";
import { publicProcedure } from "@/trpc/trpc";

export const getDirectTopUpController = publicProcedure.query(async () => {
  return await UniPlayService.getDirectTopUp();
});
