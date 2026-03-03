import * as z from 'zod';
export const ColumnDeleteManyResultSchema = z.object({
  count: z.number()
});