import type { TokenPayload } from "@/schema/midtrans.schema";
import { snap } from "@/server/midtrans/midtrans-client";

export const generatePaymentTokenUseCase = async (payload: TokenPayload) => {
  const token = await snap.createTransactionToken(payload);
  return token;
};
