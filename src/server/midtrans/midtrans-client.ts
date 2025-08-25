import { env } from "@/env";
import { MidtransClient } from "midtrans-node-client";

const createMidtransClient = () =>
  new MidtransClient.Snap({
    isProduction: false,
    serverKey: env.SERVER_KEY,
    clientKey: env.NEXT_PUBLIC_CLIENT_KEY,
  });

const globalForMidtrans = globalThis as unknown as {
  midtrans: ReturnType<typeof createMidtransClient> | undefined;
};

export const snap = globalForMidtrans.midtrans ?? createMidtransClient();

if (env.NODE_ENV !== "production") globalForMidtrans.midtrans = snap;
