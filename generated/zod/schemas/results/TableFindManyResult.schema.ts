import * as z from 'zod';
export const TableFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});