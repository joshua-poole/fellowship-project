import * as z from 'zod';
export const RowUpsertResultSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tableId: z.string(),
  table: z.unknown(),
  values: z.unknown()
});