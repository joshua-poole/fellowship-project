import * as z from 'zod';
export const BaseDeleteManyResultSchema = z.object({
  count: z.number()
});