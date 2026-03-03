import * as z from 'zod';
export const RowDeleteManyResultSchema = z.object({
  count: z.number()
});