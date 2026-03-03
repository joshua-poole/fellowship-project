import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const BaseCreateManyInputObjectSchema: z.ZodType<Prisma.BaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.BaseCreateManyInput>;
export const BaseCreateManyInputObjectZodSchema = makeSchema();
