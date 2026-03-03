import * as z from 'zod';
export const BaseUpdateManyResultSchema = z.object({
  count: z.number()
});