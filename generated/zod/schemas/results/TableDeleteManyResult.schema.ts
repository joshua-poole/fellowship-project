import * as z from 'zod';
export const TableDeleteManyResultSchema = z.object({
  count: z.number()
});