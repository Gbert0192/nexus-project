import { tokenPayloadSchema } from "@/schema/midtrans.schema";
import { generatePaymentTokenUseCase } from "@/server/midtrans/use-cases/generate-payment-token.use-case";
import { publicProcedure } from "@/trpc/trpc";

export const generatePaymentTokenController = publicProcedure
  .input(tokenPayloadSchema)
  .mutation(async ({ input }) => {
    const token = await generatePaymentTokenUseCase(input);
    return token;
  });
