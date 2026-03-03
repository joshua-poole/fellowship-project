import * as z from 'zod';
export const BaseCreateManyResultSchema = z.object({
  count: z.number()
});