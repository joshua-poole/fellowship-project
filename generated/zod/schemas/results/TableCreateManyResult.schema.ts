import * as z from 'zod';
export const TableCreateManyResultSchema = z.object({
  count: z.number()
});