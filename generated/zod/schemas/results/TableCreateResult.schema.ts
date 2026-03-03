import * as z from 'zod';
export const TableCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  baseId: z.string(),
  base: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  columns: z.array(z.unknown()),
  rows: z.array(z.unknown()),
  views: z.array(z.unknown())
});