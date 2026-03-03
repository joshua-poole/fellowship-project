import * as z from 'zod';
export const ColumnCreateManyResultSchema = z.object({
  count: z.number()
});