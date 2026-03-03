import * as z from 'zod';
export const TableUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  baseId: z.string(),
  base: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  user: z.unknown(),
  columns: z.array(z.unknown()),
  rows: z.array(z.unknown())
});