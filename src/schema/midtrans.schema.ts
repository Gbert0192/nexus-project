import z from "zod";

export const tokenPayloadSchema = z.object({
  transaction_detail: z.object({
    order_id: z.string(),
    gross_amount: z.number().min(1),
  }),
  item_details: z.object({
    product_id: z.string(),
    product_name: z.string(),
    price: z.number().min(1),
  }),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
