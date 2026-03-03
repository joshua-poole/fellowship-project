import * as z from 'zod';
export const RowCreateManyResultSchema = z.object({
  count: z.number()
});