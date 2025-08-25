import { generatePaymentTokenController } from "@/server/midtrans/controller/generate-payment-token.controller";
import { createTRPCRouter } from "@/trpc/trpc";
import type { inferRouterOutputs } from "@trpc/server";

export const midtransRouter = createTRPCRouter({
  generatePaymentToken: generatePaymentTokenController,
});

export type MidtransRouterOutputs = inferRouterOutputs<typeof midtransRouter>;
