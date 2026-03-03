import * as z from 'zod';
export const ColumnFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  type: z.unknown(),
  description: z.string().optional(),
  default: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tableId: z.string(),
  table: z.unknown()
}));