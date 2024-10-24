import { z } from 'zod';

const CustomerOpportunitySchema = z.object({
  id: z.number().nullish(),
  status: z.enum(['New', 'ClosedWon', 'ClosedLost']).default('New'),
  name: z.string().min(2, {
    message: 'at least 2 characters.',
  }),
});

export const CustomerSchema = z.object({
  id: z.number().nullish(),
  name: z
    .string()
    .min(2, {
      message: 'at least 2 characters.',
    })
    .default(''),
  email: z.string().email().default(''),
  status: z.enum(['Active', 'NonActive', 'Lead']).default('Active'),
  phone: z
    .string()
    .min(10, {
      message: 'at least 10 characters.',
    })
    .default(''),
  createdAt: z.string().datetime({ offset: true }).nullish(),
  opportunities: z.array(CustomerOpportunitySchema).default([]),
});

export type Customer = z.infer<typeof CustomerSchema>;
