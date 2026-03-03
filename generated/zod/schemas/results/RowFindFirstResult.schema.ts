import * as z from 'zod';
export const RowFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tableId: z.string(),
  table: z.unknown(),
  values: z.unknown()
}));