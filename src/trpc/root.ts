import { midtransRouter } from "@/server/midtrans/midtrans.router";
import { uniplayRouter } from "@/server/uniplay/direct-top-up.router";
import { createCallerFactory, createTRPCRouter } from "@/trpc/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  uniplay: uniplayRouter,
  midtrans: midtransRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
