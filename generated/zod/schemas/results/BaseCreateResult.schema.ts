import * as z from 'zod';
export const BaseCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  tables: z.array(z.unknown()),
  userId: z.string(),
  user: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
});