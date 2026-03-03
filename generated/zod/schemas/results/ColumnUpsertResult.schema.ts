import * as z from 'zod';
export const ColumnUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.unknown(),
  order: z.number().int(),
  description: z.string().optional(),
  defaultValue: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tableId: z.string(),
  table: z.unknown()
});