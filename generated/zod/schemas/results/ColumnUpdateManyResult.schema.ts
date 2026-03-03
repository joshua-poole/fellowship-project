import * as z from 'zod';
export const ColumnUpdateManyResultSchema = z.object({
  count: z.number()
});