import * as z from 'zod';
export const RowUpdateManyResultSchema = z.object({
  count: z.number()
});